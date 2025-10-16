import { NextRequest, NextResponse } from "next/server"

type RateRequestBody = {
  destination: {
    postalCode: string
    state?: string
    city?: string
    countryCode?: string
    addressLine1?: string
  }
  // Optional: list of items to estimate weight; if omitted we use defaults
  items?: Array<{ productId: string; quantity: number }>
}

export async function POST(req: NextRequest)
{
  try {
    const body = (await req.json()) as RateRequestBody
    const destPostal = String(body?.destination?.postalCode || "").trim()
    const destState = String(body?.destination?.state || "CA").trim()
    const destCity = String(body?.destination?.city || "").trim()
    const destCountry = String(body?.destination?.countryCode || "US").trim()

    if (!destPostal) {
      return NextResponse.json({ error: "Destination postalCode is required" }, { status: 400 })
    }

    const UPS_ENV = process.env.UPS_ENV || "live" // "test" or "live"
    const UPS_USERNAME = process.env.UPS_USERNAME
    const UPS_PASSWORD = process.env.UPS_PASSWORD
    const UPS_ACCESS_LICENSE = process.env.UPS_ACCESS_LICENSE
    const UPS_SHIPPER_NUMBER = process.env.UPS_SHIPPER_NUMBER

    const ORIGIN_ADDRESS = {
      AddressLine: process.env.UPS_ORIGIN_ADDRESS_LINE || "1171 N West St",
      City: process.env.UPS_ORIGIN_CITY || "Anaheim",
      StateProvinceCode: process.env.UPS_ORIGIN_STATE || "CA",
      PostalCode: process.env.UPS_ORIGIN_POSTAL || "92801",
      CountryCode: process.env.UPS_ORIGIN_COUNTRY || "US",
    }

    if (!UPS_USERNAME || !UPS_PASSWORD || !UPS_ACCESS_LICENSE) {
      return NextResponse.json({ error: "UPS credentials are not configured" }, { status: 500 })
    }

    const endpoint = UPS_ENV === "test"
      ? "https://wwwcie.ups.com/ship/v1/rating/Rate"
      : "https://onlinetools.ups.com/ship/v1/rating/Rate"

    // Very simple weight heuristic: 0.7 lb per item, min 1 lb
    const totalQty = (body.items || []).reduce((sum, i) => sum + Math.max(1, Number(i.quantity) || 1), 0)
    const estWeightLbs = Math.max(1, Math.round((totalQty * 0.7) * 10) / 10) // round to 0.1 lb

    // Basic poly mailer dimensions
    const dims = { Length: "12", Width: "9", Height: "2" }

    const payload = {
      UPSSecurity: {
        UsernameToken: { Username: UPS_USERNAME, Password: UPS_PASSWORD },
        ServiceAccessToken: { AccessLicenseNumber: UPS_ACCESS_LICENSE },
      },
      RateRequest: {
        Request: {
          RequestOption: "Shop", // return all available services
          TransactionReference: { CustomerContext: "UPS Rate Request" },
        },
        Shipment: {
          Shipper: {
            Name: "Set Free Anaheim",
            ShipperNumber: UPS_SHIPPER_NUMBER,
            Address: ORIGIN_ADDRESS,
          },
          ShipFrom: { Name: "Set Free Anaheim", Address: ORIGIN_ADDRESS },
          ShipTo: {
            Name: "Customer",
            Address: {
              AddressLine: body.destination.addressLine1 || "",
              City: destCity,
              StateProvinceCode: destState,
              PostalCode: destPostal,
              CountryCode: destCountry,
            },
          },
          Package: [
            {
              PackagingType: { Code: "02" }, // customer supplied packaging
              Dimensions: {
                UnitOfMeasurement: { Code: "IN" },
                ...dims,
              },
              PackageWeight: {
                UnitOfMeasurement: { Code: "LBS" },
                Weight: String(estWeightLbs),
              },
            },
          ],
        },
      },
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: "UPS rating error", details: data }, { status: 500 })
    }

    const rated = Array.isArray(data?.RateResponse?.RatedShipment)
      ? data.RateResponse.RatedShipment
      : []

    // Map some common UPS service codes to friendly labels
    const serviceName = (code: string): string => {
      switch (code) {
        case "03": return "UPS Ground (1-5 biz days)"
        case "12": return "UPS 3 Day Select"
        case "02": return "UPS 2nd Day Air"
        case "59": return "UPS 2nd Day Air A.M."
        case "13": return "UPS Next Day Air Saver"
        case "01": return "UPS Next Day Air"
        case "14": return "UPS Next Day Air Early"
        default: return `UPS Service ${code}`
      }
    }

    const results = rated.map((r: any) => {
      const code = String(r?.Service?.Code || "")
      const amount = Number(r?.TotalCharges?.MonetaryValue || 0)
      const currency = String(r?.TotalCharges?.CurrencyCode || "USD")
      return {
        carrier: "UPS",
        serviceCode: code,
        serviceName: serviceName(code),
        amountCents: Math.round(amount * 100),
        currency,
      }
    }).sort((a: any, b: any) => a.amountCents - b.amountCents)

    return NextResponse.json({ success: true, rates: results })
  } catch (e) {
    return NextResponse.json({ error: "Error fetching UPS rates" }, { status: 500 })
  }
}



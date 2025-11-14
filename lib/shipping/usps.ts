// lib/usps-client.ts
// Minimal USPS v3 API client for OAuth2 + Domestic Prices
// Works in Node 18+/Next.js (edge or node runtimes). Server-side only.

export type UspsClientOptions = {
    oauthTokenUrl: string;           // e.g. from USPS portal, POST .../token
    domesticPricesUrl: string;       // e.g. POST .../prices/v3/domestic
    uspsLabelsUrl: string;            // e.g. POST .../labels
    clientId: string;                // USPS "Consumer Key"
    clientSecret: string;            // USPS "Consumer Secret"
    userAgent?: string;              // optional UA string for USPS logs
    timeoutMs?: number;              // per-request timeout
};

export type GetRatesInput = {
    fromZip: string;                 // 5-digit ZIP
    toZip: string;                   // 5-digit ZIP
    // weight: supply either ounces or (pounds + ounces)
    weightOz?: number;               // total ounces (will be converted)
    weightLb?: number;               // pounds (optional if using weightOz)
    weightLbOunces?: number;         // ounces component when using weightLb
    // dimensions (inches). Supply for dimensional pricing & to unlock more products.
    lengthIn?: number;
    widthIn?: number;
    heightIn?: number;
    girthIn?: number;                // optional if needed
    // optional knobs:
    priceType?: "Retail" | "Commercial"; // defaults to Retail
    processingCategory?: "Parcel" | "Flat" | "Letter"; // defaults to Parcel
    mailClasses?: string[];          // e.g., ["USPS_GROUND_ADVANTAGE","PRIORITY_MAIL"]
    extraServices?: string[];        // USPS extra service codes, if you need them
};

export type UspsDomesticPrice = {
    productId: string;               // USPS product code (e.g., "USPS_GROUND_ADVANTAGE")
    productName: string;             // Human-friendly name
    rate: number;                    // Total price (USD)
    currency: string;                // "USD"
    deliveryDays?: string | number;  // if provided by API
    breakdown?: Record<string, number>; // base + extras map
    zone?: string | number;
};

type OAuthToken = {
    access_token: string;
    token_type: "Bearer";
    expires_in: number; // seconds
    // some USPS responses also include a public key etc. We only need token & expiry here.
};

export class UspsClient
{
    private oauthTokenUrl: string;
    private domesticPricesUrl: string;
    private uspsLabelsUrl: string;
    private clientId: string;
    private clientSecret: string;
    private userAgent?: string;
    private timeoutMs: number;

    private token?: string;
    private tokenExpiryEpochMs = 0;

    constructor(opts: UspsClientOptions)
    {
        this.oauthTokenUrl = opts.oauthTokenUrl;
        // If caller did not supply prices URL, infer test/prod from token host
        if (opts.domesticPricesUrl) {
            // If caller passed only a base host, normalize to total-rates/search
            try {
                const u = new URL(opts.domesticPricesUrl);
                if (!u.pathname || u.pathname === "/") {
                    const base = `${u.protocol}//${u.host}`;
                    this.domesticPricesUrl = `${base}/prices/v3/total-rates/search`;
                    this.uspsLabelsUrl = `${base}/labels/v3/domestic`;
                } else {
                    this.uspsLabelsUrl = `${opts.uspsLabelsUrl}`;
                    this.domesticPricesUrl = opts.domesticPricesUrl;
                }
            } catch {
                this.domesticPricesUrl = opts.domesticPricesUrl;
                this.uspsLabelsUrl = opts.uspsLabelsUrl;
            }
        } else {
            try {
                const host = new URL(this.oauthTokenUrl).host;
                const base = host.includes("apis-tem.usps.com") ? "https://apis-tem.usps.com" : "https://api.usps.com";
                // Default to full price search endpoint
                this.domesticPricesUrl = `${base}/prices/v3/total-rates/search`;
                this.uspsLabelsUrl = `${base}/labels/v3/domestic`;
            } catch {
                this.domesticPricesUrl = "https://api.usps.com/prices/v3/total-rates/search";
                this.uspsLabelsUrl = "https://api.usps.com/labels/v3/domestic";
            }
        }
        this.clientId = opts.clientId;
        this.clientSecret = opts.clientSecret;
        this.userAgent = opts.userAgent;
        this.timeoutMs = opts.timeoutMs ?? 15_000;
    }

    // Public: get rates by ZIPs
    async getRates (input: GetRatesInput): Promise<UspsDomesticPrice[]>
    {
        const token = await this.getAccessToken();

        // Normalize weights into pounds + ounces, as USPS price APIs expect that split.
        // If weightOz provided, convert to lb/oz pair.
        let pounds = input.weightLb ?? 0;
        let ounces = input.weightLbOunces ?? 0;
        if (typeof input.weightOz === "number") {
            pounds = Math.floor(input.weightOz / 16);
            ounces = Math.round((input.weightOz % 16) * 1000) / 1000; // avoid float noise
        }

        // USPS Domestic Prices v3 (total-rates/search) expects top-level numeric weight
        // and top-level dimensions (length/width/height). Units provided separately.
        const totalOz = Math.max(1, Math.round((pounds * 16) + ounces));
        const body = filterUndefined({
            mailClass: (input.mailClasses && input.mailClasses.length === 1) ? input.mailClasses[0] : "ALL",
            originZIPCode: input.fromZip,
            destinationZIPCode: input.toZip,
            weight: totalOz,
            weightUnitOfMeasurement: "OZ",
            length: input.lengthIn,
            width: input.widthIn,
            height: input.heightIn,
            dimensionUnitOfMeasurement: "IN",
            machinable: true,
            shape: (input.processingCategory || "Parcel").toUpperCase(),
        });

        console.log("USPS prices POST:", this.domesticPricesUrl);
        console.log("USPS prices payload:", JSON.stringify(body));
        const res = await this.fetchJson(this.domesticPricesUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                ...(this.userAgent ? { "User-Agent": this.userAgent } : {}),
            },
            body: JSON.stringify(body),
        });
        console.log(["USPS response:", JSON.stringify(res)])
        // Normalize rateOptions → rates[]
        let items: UspsDomesticPrice[] = []
        if (Array.isArray((res as any)?.rateOptions)) {
            for (const opt of (res as any).rateOptions) {
                const ratesArr = Array.isArray(opt?.rates) ? opt.rates : []
                for (const r of ratesArr) {
                    items.push({
                        productId: r?.SKU ?? r?.productId ?? r?.code ?? r?.mailClass ?? "UNKNOWN",
                        productName: r?.productName ?? r?.description ?? r?.mailClass ?? "USPS Product",
                        rate: Number(r?.total ?? r?.price ?? r?.amount ?? opt?.totalBasePrice ?? 0),
                        currency: r?.currency ?? "USD",
                        deliveryDays: r?.deliveryDays ?? r?.estDeliveryDays ?? r?.commitment,
                        breakdown: r?.breakdown ?? undefined,
                        zone: r?.zone ?? r?.zoneId,
                    })
                }
            }
        }
        if (items.length === 0) {
            const list = (res?.prices ?? res?.eligiblePrices ?? res?.data ?? []) as any[]
            items = list.map((p: any) => ({
                productId: p.productId ?? p.product ?? p.code ?? "UNKNOWN",
                productName: p.productName ?? p.name ?? p.displayName ?? p.productId ?? "USPS Product",
                rate: Number(p.total ?? p.price ?? p.amount ?? 0),
                currency: p.currency ?? "USD",
                deliveryDays: p.deliveryDays ?? p.estDeliveryDays ?? p.commitment,
                breakdown: p.breakdown ?? p.components ?? undefined,
                zone: p.zone ?? p.zoneId,
            }))
        }
        // Prefer envelope-friendly services for 10x14 shirt mailers
        const PREFERRED = [
            "USPS GROUND ADVANTAGE",
            "USPS GROUND ADVANTAGE CUBIC",
            "PRIORITY MAIL FLAT RATE ENVELOPE",
            "PRIORITY MAIL PADDED FLAT RATE ENVELOPE",
            "PRIORITY MAIL LEGAL FLAT RATE ENVELOPE",
            "PRIORITY MAIL CUBIC",
        ]
        const isPreferred = (name: string) =>
        {
            const up = (name || "").toUpperCase()
            return PREFERRED.some((p) => up.includes(p))
        }

        // Dedupe by productId+zone
        const dedupe = (arr: UspsDomesticPrice[]) =>
        {
            const seen = new Set<string>()
            return arr.filter((r) =>
            {
                const key = `${r.productId}-${r.zone ?? ''}`
                if (seen.has(key)) return false
                seen.add(key)
                return true
            })
        }

        items.sort((a, b) => a.rate - b.rate)
        let shortlisted = dedupe(items.filter((r) => isPreferred(r.productName)))
        if (shortlisted.length === 0) shortlisted = dedupe(items)
        const top = shortlisted.slice(0, 6)
        console.log(["USPS prices:", JSON.stringify(top)])
        return top
        
    }

    // ---- internals ----

    private async getAccessToken (): Promise<string>
    {
        const skewMs = 60_000; // refresh 1 min before expiry
        if (this.token && Date.now() < this.tokenExpiryEpochMs - skewMs) {
            return this.token;
        }

        console.log("USPS OAuth token URL:", this.oauthTokenUrl);

        // Attempt 1: RFC6749 client_credentials with Basic auth + x-www-form-urlencoded body
        try {
            const basic = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64")
            const form = new URLSearchParams({ grant_type: "client_credentials" })
            const data1: OAuthToken = await this.fetchJson(this.oauthTokenUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                    Authorization: `Basic ${basic}`,
                    ...(this.userAgent ? { "User-Agent": this.userAgent } : {}),
                },
                body: form as unknown as BodyInit,
            })
            console.log("USPS OAuth (basic/form) keys:", data1 ? Object.keys(data1 as any) : [])
            if (data1?.access_token && data1?.token_type?.toLowerCase() === "bearer") {
                this.token = data1.access_token
                this.tokenExpiryEpochMs = Date.now() + Math.max(60_000, (data1.expires_in ?? 0) * 1000)
                return this.token
            }
        } catch (e: any) {
            console.log("USPS OAuth (basic/form) failed:", e?.message)
        }

        // Attempt 2: JSON body with client_id/client_secret
        try {
            const payload = {
                grant_type: "client_credentials",
                client_id: this.clientId,
                client_secret: this.clientSecret,
            }
            console.log("USPS OAuth payload keys:", Object.keys(payload))
            const data2: OAuthToken = await this.fetchJson(this.oauthTokenUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(this.userAgent ? { "User-Agent": this.userAgent } : {}),
                },
                body: JSON.stringify(payload),
            })
            console.log("USPS OAuth (json) keys:", data2 ? Object.keys(data2 as any) : [])
            if (data2?.access_token && data2?.token_type?.toLowerCase() === "bearer") {
                this.token = data2.access_token
                this.tokenExpiryEpochMs = Date.now() + Math.max(60_000, (data2.expires_in ?? 0) * 1000)
                return this.token
            }
        } catch (e: any) {
            console.log("USPS OAuth (json) failed:", e?.message)
        }

        throw new Error("Failed to obtain USPS OAuth token.")
    }

    private async fetchJson (url: string, init: RequestInit): Promise<any>
    {
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), this.timeoutMs);
        try {
            const res = await fetch(url, { ...init, signal: controller.signal });
            // Try to parse JSON even on non-2xx—USPS often returns error JSON bodies.
            const text = await res.text();
            const json = safeParseJson(text);
            console.log("USPS fetch:", { url, method: (init as any)?.method, status: res.status, ok: res.ok, keys: json && typeof json === 'object' ? Object.keys(json) : [] });
            if (!res.ok) {
                const rawErr = (json && (json.error || json.message)) || res.statusText;
                const msg = typeof rawErr === 'string' ? rawErr : JSON.stringify(rawErr);
                const code = (json && (json.code || json.status)) ?? res.status;
                console.log("USPS error body:", json ?? text);
                throw new Error(`USPS error (${code}): ${msg}`);
            }
            return json ?? {};
        } catch (err: any) {
            // If token expired between call and request, drop token to force refresh next time.
            if (String(err?.message || "").includes("401")) {
                this.token = undefined;
                this.tokenExpiryEpochMs = 0;
            }
            console.log("USPS fetch error:", { url, method: (init as any)?.method, message: err?.message });
            throw err;
        } finally {
            clearTimeout(t);
        }
    }
   async createDomesticLabel(input: {
        // chosen product from your rate step (serviceId / mailClass)
        productId: string; // e.g. "USPS_GROUND_ADVANTAGE"
        from: { name: string; address1: string; address2?: string; city: string; state: string; zip5: string; zip4?: string };
        to:   { name: string; address1: string; address2?: string; city: string; state: string; zip5: string; zip4?: string };
        weight: { pounds: number; ounces: number };
        dimensions?: { length: number; width: number; height: number };
        // Payment mode: PAID vs UNPAID — value depends on your USPS setup
        paymentMethod: "PAID" | "UNPAID"; // confirm exact enum with USPS spec/support
        extraServices?: string[];
        labelFormat?: "PDF" | "ZPL203DPI" | "ZPL300DPI" | "PNG" | "SVG" | "TIFF" | "JPG";
        reference?: string;
      }) {
        const token = await this.getAccessToken();
        const res = await fetch(`${this.uspsLabelsUrl}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            productId: input.productId,
            shipFrom: input.from,
            shipTo: input.to,
            package: {
              weight: input.weight,
              dimensions: input.dimensions
            },
            extraServices: input.extraServices ?? [],
            payment: {
              method: input.paymentMethod // "PAID" (e.g., via your permit/eVS account) or "UNPAID" (no payment record)
            },
            label: {
              format: input.labelFormat ?? "PDF",
              includeImpb: true
            },
            references: { customerRef: input.reference }
          })
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json(); // returns { labelBytes/base64, trackingNumber, ssfId, ... }
      }
}

function safeParseJson (txt: string)
{
    try { return JSON.parse(txt); } catch { return undefined; }
}
function filterUndefined<T extends Record<string, unknown>> (obj: T): Partial<T>
{
    const result: Partial<T> = {};
    for (const [key, value] of Object.entries(obj) as [keyof T, T[keyof T]][]) {
        if (value !== undefined) {
            result[key] = value;
        }
    }
    return result;
}
// export async function createDomesticLabel(input: {
//     // chosen product from your rate step (serviceId / mailClass)
//     productId: string; // e.g. "USPS_GROUND_ADVANTAGE"
//     from: { name: string; address1: string; address2?: string; city: string; state: string; zip5: string; zip4?: string };
//     to:   { name: string; address1: string; address2?: string; city: string; state: string; zip5: string; zip4?: string };
//     weight: { pounds: number; ounces: number };
//     dimensions?: { length: number; width: number; height: number };
//     // Payment mode: PAID vs UNPAID — value depends on your USPS setup
//     paymentMethod: "PAID" | "UNPAID"; // confirm exact enum with USPS spec/support
//     extraServices?: string[];
//     labelFormat?: "PDF" | "ZPL203DPI" | "ZPL300DPI" | "PNG" | "SVG" | "TIFF" | "JPG";
//     reference?: string;
//   }) {
//     const token = await getToken();
//     const res = await fetch(`${USPS_LABELS_URL}/labels`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       body: JSON.stringify({
//         productId: input.productId,
//         shipFrom: input.from,
//         shipTo: input.to,
//         package: {
//           weight: input.weight,
//           dimensions: input.dimensions
//         },
//         extraServices: input.extraServices ?? [],
//         payment: {
//           method: input.paymentMethod // "PAID" (e.g., via your permit/eVS account) or "UNPAID" (no payment record)
//         },
//         label: {
//           format: input.labelFormat ?? "PDF",
//           includeImpb: true
//         },
//         references: { customerRef: input.reference }
//       })
//     });
//     if (!res.ok) throw new Error(await res.text());
//     return res.json(); // returns { labelBytes/base64, trackingNumber, ssfId, ... }
//   }
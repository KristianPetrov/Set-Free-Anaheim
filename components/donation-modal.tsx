"use client"

import { useMemo, useState } from 'react'
import { X } from 'lucide-react'

type DonationModalProps = {
  open: boolean
  onClose: () => void

  // Branding/content
  title?: string
  subtitle?: string
  logoSrc?: string
  scripture?: string
  message?: string

  // Amounts/config
  presetAmounts?: number[]
  initialAmount?: number
  currencySymbol?: string

  // Payment configuration
  paypalMe?: string // e.g. "setfreephil" (PayPal.me handle)
  venmoUser?: string // e.g. "sandra-aguilar-73"
  venmoNote?: string // e.g. "Donation to Set Free Anaheim"
  cashAppTag?: string // e.g. "Setfreephil" (without $)
  zellePhone?: string // e.g. "714-329-1003"
}

export function DonationModal({
  open,
  onClose,
  title = 'Support The Magic House',
  subtitle = 'Help us continue pulling souls outta the gutter with the raw love of Christ',
  logoSrc,
  scripture = '"Freely you received, freely give." - Matthew 10:8',
  message = 'Your donation helps us house, feed, and walk with those who need it most.',
  presetAmounts = [25, 50, 100, 250, 500, 1000],
  initialAmount,
  currencySymbol = '$',
  paypalMe = 'setfreephil',
  venmoUser = 'sandra-aguilar-73',
  venmoNote = 'Donation to Set Free Anaheim',
  cashAppTag = 'Setfreephil',
  zellePhone = '714-329-1003',
}: DonationModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(initialAmount ?? null)
  const [customAmount, setCustomAmount] = useState<string>('')

  const amount = useMemo(() => {
    return selectedAmount ?? (customAmount ? Number(customAmount) : 0)
  }, [selectedAmount, customAmount])

  const hasAmount = amount > 0

  const handlePayPal = () => {
    const url = `https://www.paypal.com/paypalme/${paypalMe}/${hasAmount ? amount : ''}`
    window.open(url, '_blank')
  }

  const handleVenmo = () => {
    const url = `https://venmo.com/u/${venmoUser}?txn=pay${hasAmount ? `&amount=${amount}` : ''}&note=${encodeURIComponent(venmoNote)}`
    window.open(url, '_blank')
  }

  const handleCashApp = () => {
    const url = `https://cash.app/$${cashAppTag}/${hasAmount ? amount : ''}`
    window.open(url, '_blank')
  }

  const handleZelle = async () => {
    try {
      await navigator.clipboard.writeText(zellePhone)
      alert(`Zelle Details Copied!\n\nPhone: ${zellePhone}${hasAmount ? `\nAmount: ${currencySymbol}${amount}` : ''}\n\nOpen your banking app and send to the phone number that's been copied to your clipboard.`)
    } catch {
      alert(`Zelle Payment Details:\n\nPhone: ${zellePhone}${hasAmount ? `\nAmount: ${currencySymbol}${amount}` : ''}\n\nPlease open your banking app and send this amount to the phone number above.`)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="bg-gray-900 border border-red-900/50 rounded-lg shadow-xl">
          <div className="relative p-6">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close donation modal"
            >
              <X className="h-6 w-6" />
            </button>

            {logoSrc ? (
              <div className="flex justify-center mb-4">
                <img
                  src={logoSrc}
                  alt="Logo"
                  className="h-[80px] object-contain"
                />
              </div>
            ) : null}

            <h2 className="text-center text-2xl font-bold text-red-500">{title}</h2>
            {subtitle ? (
              <p className="text-center text-gray-300 mt-2">{subtitle}</p>
            ) : null}
          </div>

          <div className="p-6 pt-0 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Choose an Amount</h3>
              <div className="grid grid-cols-3 gap-3">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    className={`border rounded-md border-red-900/50 font-bold py-3 transition-all duration-300 ${
                      selectedAmount === preset
                        ? 'ring-2 ring-red-500 bg-red-600 text-white border-red-600'
                        : preset > 100
                          ? 'text-yellow-400 hover:bg-yellow-600 hover:border-yellow-600 hover:text-black'
                          : 'text-red-400 hover:bg-red-600 hover:border-red-600 hover:text-white'
                    }`}
                    onClick={() => {
                      setSelectedAmount(preset)
                      setCustomAmount('')
                    }}
                  >
                    {currencySymbol}{preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Custom Amount</h3>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  const num = Number(customAmount)
                  if (!Number.isNaN(num) && num > 0) setSelectedAmount(num)
                }}
              >
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">{currencySymbol}</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setSelectedAmount(null)
                    }}
                    className={`w-full pl-8 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      customAmount ? 'border-red-500 ring-2 ring-red-500/50' : 'border-gray-600 focus:border-red-500'
                    }`}
                  />
                </div>
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 rounded-md">
                  Set
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Payment Methods {hasAmount ? <span className="text-green-400">- Ready for {currencySymbol}{amount}</span> : null}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`border rounded-md font-bold py-3 transition-all duration-300 ${
                    hasAmount
                      ? 'border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-500/50 animate-pulse'
                      : 'border-blue-500/50 text-blue-400 hover:bg-blue-600 hover:text-white'
                  }`}
                  onClick={handlePayPal}
                >
                  PayPal
                </button>
                <button
                  className={`border rounded-md font-bold py-3 transition-all duration-300 ${
                    hasAmount
                      ? 'border-green-500 text-green-400 hover:bg-green-600 hover:text-white shadow-lg shadow-green-500/50 animate-pulse'
                      : 'border-green-500/50 text-green-400 hover:bg-green-600 hover:text-white'
                  }`}
                  onClick={handleVenmo}
                >
                  Venmo
                </button>
                <button
                  className={`border rounded-md font-bold py-3 transition-all duration-300 ${
                    hasAmount
                      ? 'border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white shadow-lg shadow-purple-500/50 animate-pulse'
                      : 'border-purple-500/50 text-purple-400 hover:bg-purple-600 hover:text-white'
                  }`}
                  onClick={handleCashApp}
                >
                  CashApp
                </button>
                <button
                  className={`border rounded-md font-bold py-3 transition-all duration-300 ${
                    hasAmount
                      ? 'border-yellow-500 text-yellow-400 hover:bg-yellow-600 hover:text-white shadow-lg shadow-yellow-500/50 animate-pulse'
                      : 'border-yellow-500/50 text-yellow-400 hover:bg-yellow-600 hover:text-white'
                  }`}
                  onClick={handleZelle}
                >
                  Zelle
                </button>
              </div>
            </div>

            {(scripture || message) && (
              <div className="bg-gray-800/50 rounded-lg p-4 border border-red-900/30">
                {scripture ? (
                  <p className="text-gray-300 text-center italic">{scripture}</p>
                ) : null}
                {message ? (
                  <p className="text-gray-400 text-sm text-center mt-2">{message}</p>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationModal




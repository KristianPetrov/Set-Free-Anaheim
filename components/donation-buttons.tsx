"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { track } from '@vercel/analytics'

const trackDonation = (amount: number) => {
  track('donation_amount', { amount })
}

type DonationAmountsProps = {
  selectedAmount?: number
  onSelect: (amount: number) => void
  amounts?: number[]
}

export function DonationAmounts({ selectedAmount, onSelect, amounts = [25, 50, 100] }: DonationAmountsProps) {
  const [customAmount, setCustomAmount] = useState<string>('')

  useEffect(() => {
    // reflect selected amount (preset or custom) into the input field
    if (selectedAmount != null && !Number.isNaN(Number(selectedAmount))) {
      setCustomAmount(String(selectedAmount))
    } else {
      setCustomAmount('')
    }
  }, [selectedAmount])

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {amounts.map((amount) => (
          <Button
            key={amount}
            variant="outline"
            className={`border-red-900/50 font-bold py-3 transition-all duration-300 ${
              selectedAmount === amount
                ? 'ring-2 ring-red-500 bg-red-600 text-white border-red-600'
                : amount > 100
                  ? 'text-yellow-400 hover:bg-yellow-600 hover:border-yellow-600 hover:text-black'
                  : 'text-red-400 hover:bg-red-600 hover:border-red-600 hover:text-white'
            }`}
            onClick={(e) => {
              e.preventDefault()
              onSelect(amount)
            }}
          >
            ${amount}
          </Button>
        ))}
      </div>
      <div>
        <h4 className="text-sm text-gray-300 mb-2">Custom Amount</h4>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">$</span>
            <input
              type="number"
              min="0"
              step="1"
              value={customAmount}
              onChange={(e) => {
                const val = e.target.value
                setCustomAmount(val)
                const num = Number(val)
                if (!Number.isNaN(num)) onSelect(num)
              }}
              placeholder="Enter amount"
              className={`w-full pl-8 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                customAmount ? 'border-red-500 ring-2 ring-red-500/50' : 'border-gray-600 focus:border-red-500'
              }`}
            />
          </div>
          <Button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6"
            onClick={() => {
              const num = Number(customAmount)
              if (!Number.isNaN(num) && num > 0) onSelect(num)
            }}
          >
            Set
          </Button>
        </div>
      </div>
    </div>
  )
}

type DonationMethodsProps = {
  amount?: number
  onMethodClick?: (method: 'paypal' | 'venmo' | 'cashapp' | 'zelle') => void
}

export function DonationMethods({ amount, onMethodClick }: DonationMethodsProps) {
  const hasAmount = Boolean(amount && amount > 0)

  const handlePayPal = () => {
    onMethodClick?.('paypal')
    const url = `https://www.paypal.com/paypalme/setfreephil/${amount || ''}`
    window.open(url, '_blank')
  }
  const handleVenmo = () => {
    onMethodClick?.('venmo')
    const url = `https://venmo.com/u/sandra-aguilar-73?txn=pay${amount ? `&amount=${amount}` : ''}&note=Love%20Offering%20-%20Prayer`
    window.open(url, '_blank')
  }
  const handleCashApp = () => {
    onMethodClick?.('cashapp')
    const url = `https://cash.app/$Setfreephil/${amount || ''}`
    window.open(url, '_blank')
  }
  const handleZelle = async () => {
    try {
      onMethodClick?.('zelle')
      await navigator.clipboard.writeText('714-329-1003')
      alert(`Zelle Details Copied!\n\nPhone: 714-329-1003${amount ? `\nAmount: $${amount}` : ''}`)
    } catch {
      alert(`Zelle Phone: 714-329-1003${amount ? `\nAmount: $${amount}` : ''}`)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      <Button
        variant="outline"
        className={`font-bold py-3 transition-all duration-300 ${
          hasAmount ? 'border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-500/50 animate-pulse' : 'border-blue-500/50 text-blue-400 hover:bg-blue-600 hover:text-white'
        }`}
        onClick={handlePayPal}
      >
        PayPal
      </Button>
      <Button
        variant="outline"
        className={`font-bold py-3 transition-all duration-300 ${
          hasAmount ? 'border-green-500 text-green-400 hover:bg-green-600 hover:text-white shadow-lg shadow-green-500/50 animate-pulse' : 'border-green-500/50 text-green-400 hover:bg-green-600 hover:text-white'
        }`}
        onClick={handleVenmo}
      >
        Venmo
      </Button>
      <Button
        variant="outline"
        className={`font-bold py-3 transition-all duration-300 ${
          hasAmount ? 'border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white shadow-lg shadow-purple-500/50 animate-pulse' : 'border-purple-500/50 text-purple-400 hover:bg-purple-600 hover:text-white'
        }`}
        onClick={handleCashApp}
      >
        CashApp
      </Button>
      <Button
        variant="outline"
        className={`font-bold py-3 transition-all duration-300 ${
          hasAmount ? 'border-yellow-500 text-yellow-400 hover:bg-yellow-600 hover:text-white shadow-lg shadow-yellow-500/50 animate-pulse' : 'border-yellow-500/50 text-yellow-400 hover:bg-yellow-600 hover:text-white'
        }`}
        onClick={handleZelle}
      >
        Zelle
      </Button>
    </div>
  )
}



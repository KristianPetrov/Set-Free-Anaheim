"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

export default function DonateModal() {
  const router = useRouter()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState<string>('')

  const handleClose = () => {
    router.back()
  }

  const donationAmounts = [25, 50, 100, 250, 500, 1000]

  const getCurrentAmount = () => selectedAmount || parseFloat(customAmount) || 0
  const hasAmount = () => getCurrentAmount() > 0

  const handlePayPalDonation = () => {
    const amount = getCurrentAmount()
    if (amount > 0) {
      const paypalUrl = `https://www.paypal.com/paypalme/setfreephil/${amount}`
      window.open(paypalUrl, '_blank')
    } else {
      alert('Please select or enter a donation amount first')
    }
  }

  const handleVenmoDonation = () => {
    const amount = getCurrentAmount()
    if (amount > 0) {
      const venmoUrl = `https://venmo.com/u/sandra-aguilar-73?txn=pay&amount=${amount}&note=Donation%20to%20Set%20Free%20Anaheim`
      window.open(venmoUrl, '_blank')
    } else {
      alert('Please select or enter a donation amount first')
    }
  }

  const handleCashAppDonation = () => {
    const amount = getCurrentAmount()
    if (amount > 0) {
      const cashAppUrl = `https://cash.app/$Setfreephil/${amount}`
      window.open(cashAppUrl, '_blank')
    } else {
      alert('Please select or enter a donation amount first')
    }
  }

  const handleZelleDonation = () => {
    const amount = getCurrentAmount()
    if (amount > 0) {
      // Copy to clipboard and show instructions
      navigator.clipboard.writeText('714-329-1003').then(() => {
        alert(`Zelle Details Copied!\n\nPhone: 714-329-1003\nAmount: $${amount}\n\nOpen your banking app and send to the phone number that's been copied to your clipboard.`)
      }).catch(() => {
        alert(`Zelle Payment Details:\n\nPhone: 714-329-1003\nAmount: $${amount}\n\nPlease open your banking app and send this amount to the phone number above.`)
      })
    } else {
      alert('Please select or enter a donation amount first')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <Card className="bg-gray-900 border-red-900/50">
          <CardHeader className="relative">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close donation modal"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex justify-center mb-4">
              <Image
                src="/SETFREELOGOWHITE.png"
                alt="Set Free Anaheim Logo"
                width={200}
                height={100}
                className="object-contain"
              />
            </div>
            <CardTitle className="text-center text-2xl font-bold text-red-500">
              Support The Magic House
            </CardTitle>
            <p className="text-center text-gray-300 mt-2">
              Help us continue pulling souls outta the gutter with the raw love of Christ
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Quick Donation Amounts */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Choose an Amount</h3>
              <div className="grid grid-cols-3 gap-3">
                                 {donationAmounts.map((amount) => (
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
                     onClick={() => {
                       setSelectedAmount(amount)
                       setCustomAmount('')
                     }}
                   >
                     ${amount}
                   </Button>
                 ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Custom Amount</h3>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">$</span>
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
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8">
                  Donate
                </Button>
              </div>
            </div>

                        {/* Payment Methods */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Payment Methods {hasAmount() && <span className="text-green-400">- Ready for ${getCurrentAmount()}</span>}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                                <Button
                  variant="outline"
                  className={`font-bold py-3 transition-all duration-300 ${
                    hasAmount()
                      ? 'border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-500/50 animate-pulse'
                      : 'border-blue-500/50 text-blue-400 hover:bg-blue-600 hover:text-white'
                  }`}
                  onClick={handlePayPalDonation}
                >
                  PayPal
                </Button>
                <Button
                  variant="outline"
                  className={`font-bold py-3 transition-all duration-300 ${
                    hasAmount()
                      ? 'border-green-500 text-green-400 hover:bg-green-600 hover:text-white shadow-lg shadow-green-500/50 animate-pulse'
                      : 'border-green-500/50 text-green-400 hover:bg-green-600 hover:text-white'
                  }`}
                  onClick={handleVenmoDonation}
                >
                  Venmo
                </Button>
                <Button
                  variant="outline"
                  className={`font-bold py-3 transition-all duration-300 ${
                    hasAmount()
                      ? 'border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white shadow-lg shadow-purple-500/50 animate-pulse'
                      : 'border-purple-500/50 text-purple-400 hover:bg-purple-600 hover:text-white'
                  }`}
                  onClick={handleCashAppDonation}
                >
                  CashApp
                </Button>
                <Button
                  variant="outline"
                  className={`font-bold py-3 transition-all duration-300 ${
                    hasAmount()
                      ? 'border-yellow-500 text-yellow-400 hover:bg-yellow-600 hover:text-white shadow-lg shadow-yellow-500/50 animate-pulse'
                      : 'border-yellow-500/50 text-yellow-400 hover:bg-yellow-600 hover:text-white'
                  }`}
                  onClick={handleZelleDonation}
                >
                  Zelle
                </Button>
              </div>
            </div>

            {/* Message */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-red-900/30">
              <p className="text-gray-300 text-center italic">
                "Freely you received, freely give." - Matthew 10:8
              </p>
              <p className="text-gray-400 text-sm text-center mt-2">
                Your donation helps us house, feed, and walk with those who need it most.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
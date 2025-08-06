"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState<string>('')

  const donationAmounts = [25, 50, 100, 250, 500, 1000]

  const handleCashAppDonation = () => {
    const amount = selectedAmount || parseFloat(customAmount) || 0
    if (amount > 0) {
      const cashAppUrl = `https://cash.app/$Setfreephil/${amount}`
      window.open(cashAppUrl, '_blank')
    } else {
      alert('Please select or enter a donation amount first')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-red-900/30 bg-black/90 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
          <Image
            src="/SETFREELOGOWHITE.png"
            alt="Set Free Anaheim Logo"
            width={150}
            height={75}
            className="object-contain"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-900 border-red-900/50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-red-500 mb-4">
                Support The Magic House
              </CardTitle>
              <p className="text-gray-300 text-lg">
                Help us continue pulling souls outta the gutter with the raw love of Christ
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Quick Donation Amounts */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Choose an Amount</h3>
                <div className="grid grid-cols-3 gap-4">
                                     {donationAmounts.map((amount) => (
                     <Button
                       key={amount}
                       variant="outline"
                       className={`border-red-900/50 font-bold py-4 text-lg ${
                         amount > 100
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
                <h3 className="text-xl font-semibold text-white mb-6">Custom Amount</h3>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">$</span>
                                         <input
                       type="number"
                       placeholder="Enter amount"
                       value={customAmount}
                       onChange={(e) => {
                         setCustomAmount(e.target.value)
                         setSelectedAmount(null)
                       }}
                       className="w-full pl-10 pr-4 py-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none text-lg"
                     />
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-4 text-lg">
                    Donate
                  </Button>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Payment Methods</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-600 hover:text-white font-bold py-4 text-lg"
                  >
                    PayPal
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-500/50 text-green-400 hover:bg-green-600 hover:text-white font-bold py-4 text-lg"
                  >
                    Venmo
                  </Button>
                                     <Button
                     variant="outline"
                     className="border-purple-500/50 text-purple-400 hover:bg-purple-600 hover:text-white font-bold py-4 text-lg"
                     onClick={handleCashAppDonation}
                   >
                     CashApp
                   </Button>
                  <Button
                    variant="outline"
                    className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-600 hover:text-white font-bold py-4 text-lg"
                  >
                    Zelle
                  </Button>
                </div>
              </div>

              {/* Message */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-red-900/30">
                <p className="text-gray-300 text-center italic text-lg mb-3">
                  "Freely you received, freely give." - Matthew 10:8
                </p>
                <p className="text-gray-400 text-center">
                  Your donation helps us house, feed, and walk with those who need it most. We don't always got room, but we always make room.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
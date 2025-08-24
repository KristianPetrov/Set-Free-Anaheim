"use client"

import { useRouter } from 'next/navigation'
import DonationModal from '@/components/donation-modal'

export default function DonateModalPage() {
  const router = useRouter()

  return (
    <DonationModal
      open
      onClose={() => router.back()}
      title="Support The Magic House"
      subtitle="Help us continue pulling souls outta the gutter with the raw love of Christ"
      logoSrc="/SETFREELOGOWHITE.png"
      scripture='"Freely you received, freely give." - Matthew 10:8'
      message="Your donation helps us house, feed, and walk with those who need it most."
      presetAmounts={[25, 50, 100, 250, 500, 1000]}
      paypalMe="setfreephil"
      venmoUser="sandra-aguilar-73"
      venmoNote="Donation to Set Free Anaheim"
      cashAppTag="Setfreephil"
      zellePhone="714-329-1003"
    />
  )
}
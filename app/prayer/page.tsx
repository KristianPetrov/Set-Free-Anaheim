"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DonationAmounts, DonationMethods } from '@/components/donation-buttons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const schema = z.object({
  name: z.string().max(100).optional().or(z.literal('')),
  email: z.string().email().max(200).optional().or(z.literal('')),
  text: z.string().min(5, 'Please share at least a few words').max(2000),
  isPublic: z.boolean().default(true),
})

type FormValues = z.infer<typeof schema>

type Prayer = {
  id: string
  name?: string
  text: string
  donationAmount?: number
  createdAt: string
}

export default function PrayerPage() {
  const [prayers, setPrayers] = useState<Prayer[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number | undefined>(undefined)
  const [donationMethodClicked, setDonationMethodClicked] = useState<null | 'paypal' | 'venmo' | 'cashapp' | 'zelle'>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { isPublic: true },
  })

  useEffect(() => {
    fetch('/api/prayers')
      .then((r) => r.json())
      .then((data) => setPrayers(data.prayers || []))
      .catch(() => setPrayers([]))
  }, [])

  async function onSubmit(values: FormValues) {
    setSubmitting(true)
    try {
      const donationAmountToSend = donationMethodClicked ? selectedAmount : undefined
      const res = await fetch('/api/prayers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, donationAmount: donationAmountToSend }),
      })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      if (data?.prayer?.isPublic) {
        setPrayers((prev) => [data.prayer, ...prev].slice(0, 200))
      }
      reset({ name: '', email: '', text: '', isPublic: true })
      setSelectedAmount(undefined)
      setDonationMethodClicked(null)
    } catch (_) {
      // no-op
    } finally {
      setSubmitting(false)
    }
  }

  function donationLinks(amount?: number) {
    const amt = amount ?? selectedAmount ?? 0
    return (
      <div className="grid grid-cols-2 gap-3 mt-3">
        <Button variant="outline" onClick={() => window.open(`https://www.paypal.com/paypalme/setfreephil/${amt || ''}`, '_blank')}>PayPal</Button>
        <Button variant="outline" onClick={() => window.open(`https://venmo.com/u/sandra-aguilar-73?txn=pay${amt ? `&amount=${amt}` : ''}&note=Love%20Offering%20-%20Prayer`, '_blank')}>Venmo</Button>
        <Button variant="outline" onClick={() => window.open(`https://cash.app/$Setfreephil/${amt || ''}`, '_blank')}>CashApp</Button>
        <Button variant="outline" onClick={() => { navigator.clipboard.writeText('714-329-1003'); alert('Zelle: 714-329-1003 copied to clipboard') }}>Zelle</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-red-900/30 bg-black/90 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-gray-300 hover:text-red-500 transition-colors">Back to Home</Link>
          <Image src="/SETFREELOGOWHITE.png" alt="Set Free Anaheim Logo" width={150} height={75} className="object-contain" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-10">
          <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[480px] md:h-[480px] animate-slow-glow">
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-red-600/25 blur-3xl opacity-70 animate-candle" />
            <Image
              src="/tristin-upper-room-logo.png"
              alt="Tristin's Upper Room Large Logo"
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(239,68,68,0.55)]"
              priority
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Prayer Wall FIRST */}
          <Card className="bg-black/70 border-red-700/50 ring-1 ring-red-500/40 shadow-[0_0_45px_rgba(239,68,68,0.35)] backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 md:w-24 md:h-24 animate-slow-glow">
                  <div className="pointer-events-none absolute -inset-4 -z-10 rounded-full bg-red-600/25 blur-2xl opacity-70 animate-candle" />
                  <Image src="/tristin-prayer-wall.png" alt="Tristin's Prayer Wall" fill className="object-contain drop-shadow-[0_0_20px_rgba(239,68,68,0.55)]" />
                </div>
                <div>
                  <CardTitle className="text-xl md:text-2xl text-white">Prayer Wall</CardTitle>
                  <p className="text-gray-300 text-sm">Public requests from around the world. Join us and lift these up.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {prayers.length === 0 && (
                  <p className="text-gray-300">No prayers yet. Be the first to share.</p>
                )}
                {prayers.map((p) => (
                  <div
                    key={p.id}
                    className={`rounded p-4 ${p.donationAmount ? 'bg-yellow-900/20 border border-yellow-500/50' : 'bg-gray-900/40 border border-red-900/30'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <strong className={` ${p.donationAmount ? 'text-yellow-300' : 'text-white'}`}>{p.name || 'Anonymous'}</strong>
                      <span className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleString()}</span>
                    </div>
                    <p className={`whitespace-pre-wrap ${p.donationAmount ? 'text-yellow-100' : 'text-gray-200'}`}>{p.text}</p>
                    {p.donationAmount ? (
                      <div className="mt-2 text-right text-yellow-400 font-semibold">{`Love Offering: $${p.donationAmount}`}</div>
                    ) : null}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submission Form SECOND */}
          <Card className="bg-gray-900 border-red-900/50">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 animate-slow-glow">
                  <div className="pointer-events-none absolute -inset-4 -z-10 rounded-full bg-red-600/25 blur-2xl opacity-70 animate-candle" />
                  <Image src="/written-prayer-note.png" alt="Written Prayer Note" fill className="object-contain drop-shadow-[0_0_20px_rgba(239,68,68,0.55)]" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-red-500">Tristin's Upper Room — Prayer Wall</CardTitle>
                  <p className="text-gray-300 text-sm">Send your prayer. We’ll take it up together and cover it in Jesus’ name.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input {...register('name')} placeholder="Name (optional)" className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400" />
                  </div>
                  <div>
                    <input {...register('email')} placeholder="Email (optional)" className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400" />
                  </div>
                </div>
                <div>
                  <textarea {...register('text')} rows={6} placeholder="Share your prayer request..." className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400" />
                  {errors.text && <p className="text-red-400 text-sm mt-1">{errors.text.message}</p>}
                </div>
                <label className="inline-flex items-center gap-2 text-gray-300">
                  <input type="checkbox" defaultChecked {...register('isPublic')} className="h-4 w-4" />
                  Show on the public wall
                </label>
                <Accordion type="single" collapsible className="pt-3">
                  <AccordionItem value="donate">
                    <AccordionTrigger className="text-gray-200">Optional love offering</AccordionTrigger>
                    <AccordionContent>
                      <DonationAmounts selectedAmount={selectedAmount} onSelect={(amt) => setSelectedAmount(amt)} amounts={[25,50,100]} />
                      <DonationMethods amount={selectedAmount} onMethodClick={(m) => setDonationMethodClicked(m)} />
                      {selectedAmount && selectedAmount > 0 && !donationMethodClicked ? (
                        <p className="mt-2 text-yellow-300 text-sm">Select a payment method to confirm your donation.</p>
                      ) : null}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" disabled={submitting} className="bg-red-600 hover:bg-red-700 text-white font-bold">{submitting ? 'Submitting...' : (selectedAmount && selectedAmount > 0 ? 'Submit Prayer & Donate' : 'Submit Prayer')}</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

      </main>
    </div>
  )
}



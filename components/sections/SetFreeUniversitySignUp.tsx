"use client"

import { FormEvent, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type FormData = {
  name: string
  phone: string
  reason: string
}

const initialFormData: FormData = {
  name: "",
  phone: "",
  reason: "",
}

export default function SetFreeUniversitySignUp() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      reason: formData.reason.trim(),
    }

    if (!payload.name || !payload.phone || !payload.reason) {
      setErrorMessage("Please fill in all required fields.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/university-signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data?.error || "Unable to submit at this time.")
      }

      setFormData(initialFormData)
      setSuccessMessage("Thank you! Your Set Free University sign up was received.")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to submit at this time.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="set-free-university" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto rounded-2xl border border-red-900/40 bg-red-950/10 ">
          <div className=" flex justify-center">
            <div className="relative w-[32rem] h-[32rem] md:w-[40rem] md:h-[40rem]">
              <Image
                src="/graphics/set-free-university-logo.png"
                alt="Set Free University Logo"
                fill
                className="object-contain drop-shadow-[0_0_20px_rgba(234,179,8,0.35)]"
              />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-500 neon-text">Set Free University - Sign Up</h2>
          <p className="text-gray-300 mb-6">
            Join Set Free University and take the next step toward earning your Set Free University Certificate.
            Share your name, phone number, and what you are hoping to get out of the program.
          </p>

          <div className="mb-6 rounded-xl border border-yellow-500/30 bg-black/40 p-4">
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">About Our Deep Bible Study</h3>
            <p className="text-gray-200 leading-relaxed">
              This is a focused, Scripture-by-Scripture discipleship journey where we go deep into God&apos;s Word,
              apply biblical truth to everyday life, and grow in spiritual maturity together. Our heart is to help
              each student build a strong foundation in Christ while preparing to complete their Set Free University
              Certificate.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="sfu-name" className="block text-sm font-medium text-gray-200 mb-2">
                Full Name
              </label>
              <Input
                id="sfu-name"
                value={formData.name}
                onChange={(event) => setFormData((previous) => ({ ...previous, name: event.target.value }))}
                placeholder="Your full name"
                required
                maxLength={100}
                className="bg-gray-950/60 border-red-900/40 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="sfu-phone" className="block text-sm font-medium text-gray-200 mb-2">
                Phone Number
              </label>
              <Input
                id="sfu-phone"
                type="tel"
                value={formData.phone}
                onChange={(event) => setFormData((previous) => ({ ...previous, phone: event.target.value }))}
                placeholder="(714) 000-0000"
                required
                maxLength={25}
                className="bg-gray-950/60 border-red-900/40 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="sfu-reason" className="block text-sm font-medium text-gray-200 mb-2">
                What are you trying to get out of it?
              </label>
              <Textarea
                id="sfu-reason"
                value={formData.reason}
                onChange={(event) => setFormData((previous) => ({ ...previous, reason: event.target.value }))}
                placeholder="Tell us why you want to join and earn your Set Free University Certificate..."
                required
                rows={5}
                maxLength={1200}
                className="bg-gray-950/60 border-red-900/40 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                {isSubmitting ? "Submitting..." : "Submit Sign Up"}
              </Button>
            </div>
          </form>

          {errorMessage ? <p className="text-red-400 mt-4">{errorMessage}</p> : null}
          {successMessage ? <p className="text-green-400 mt-4">{successMessage}</p> : null}
        </div>
      </div>
    </section>
  )
}

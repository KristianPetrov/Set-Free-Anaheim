import { Card, CardContent } from "@/components/ui/card"

export default function Testimonies() {
  return (
    <section id="testimonies" className="py-20 bg-gradient-to-r from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-red-500 neon-text">REAL STORIES</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-black/50 border-red-900/30">
            <CardContent className="p-8">
              <p className="text-lg text-gray-300 mb-6 italic">
                "I was running the streets, thought I was too far gone. But Pastor showed me Jesus loves gangsters
                too. Now I'm set free and helping other young cats find their way."
              </p>
              <p className="text-red-400 font-bold">- Marcus, 19</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-red-900/30">
            <CardContent className="p-8">
              <p className="text-lg text-gray-300 mb-6 italic">
                "This church don't judge. They met me in my mess and showed me God's grace. Real family, real love,
                real transformation."
              </p>
              <p className="text-red-400 font-bold">- Sofia, 22</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}



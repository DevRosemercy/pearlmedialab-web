import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'

async function getLiveStreamingService() {
  'use cache'
  return await client.fetch(`*[_type == "service" && title == "Live Streaming"][0]{
    _id, title, shortDescription, description, image
  }`)
}

export const metadata = {
  title: 'Live Streaming | Pearl Media Lab',
  description: 'Multi-camera, professionally switched live broadcasts for events, conferences, and hybrid gatherings.',
}

export default async function LiveStreamingPage() {
  const service = await getLiveStreamingService()

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#07152b] to-[#0a4f9e] text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#50c8ff] uppercase tracking-widest text-sm font-bold mb-4">
            Live Production
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Live Streaming
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            Multi-camera, professionally switched live broadcasts — reaching audiences anywhere in the world in real time.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#1ba6e8] hover:bg-[#50c8ff] text-white font-bold px-10 py-4 rounded-full transition"
          >
            Book a Live Stream
          </Link>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#07152b] mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-xl font-bold text-[#07152b] mb-2">Multi-Camera Setup</h3>
              <p className="text-gray-600">Professional multi-camera productions with live switching, giving your viewers dynamic coverage from every angle.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">🎙️</div>
              <h3 className="text-xl font-bold text-[#07152b] mb-2">Broadcast-Quality Audio</h3>
              <p className="text-gray-600">Crystal-clear sound with professional microphones, mixers, and backup audio systems.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-[#07152b] mb-2">Multi-Platform Streaming</h3>
              <p className="text-gray-600">Simultaneous streaming to YouTube, Facebook, Zoom, Teams, or any custom platform you need.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-[#07152b] mb-2">Professional Lighting</h3>
              <p className="text-gray-600">Broadcast-grade lighting design that makes every speaker, presenter, and venue look their best.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-[#07152b] mb-2">Live Graphics & Overlays</h3>
              <p className="text-gray-600">Lower thirds, logos, live statistics, and custom graphics — integrated seamlessly into your broadcast.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-[#07152b] mb-2">Backup Systems</h3>
              <p className="text-gray-600">Redundant cameras, audio, and internet connections — so your stream never fails, even if something goes wrong.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#07152b] mb-12">Perfect For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Corporate conferences and AGMs',
              'Church services and religious events',
              'Weddings and celebrations',
              'Product launches and brand events',
              'Award ceremonies and galas',
              'Virtual and hybrid events',
              'Webinars and online training',
              'Sports and community events',
            ].map((useCase, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#1ba6e8] font-bold text-xl">✓</span>
                <p className="text-gray-700">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#07152b] mb-12">How It Works</h2>
          <div className="space-y-8">
            {[
              { step: '01', title: 'Consultation', desc: 'We discuss your event — audience size, platform, venue, and any special requirements.' },
              { step: '02', title: 'Site Survey', desc: 'We visit or review your venue to plan camera positions, lighting, and internet setup.' },
              { step: '03', title: 'Technical Rehearsal', desc: 'Before going live, we do a full technical run-through so everything works perfectly.' },
              { step: '04', title: 'Go Live', desc: 'We stream your event with professional switching, graphics, and real-time monitoring.' },
              { step: '05', title: 'Delivery', desc: 'You get the recorded stream, raw footage, and any custom clips you need after the event.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#0a4f9e] to-[#1ba6e8] text-white flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#07152b] mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#0a4f9e] to-[#1ba6e8] text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Planning a live event?</h2>
        <p className="text-lg mb-8 opacity-90">Let's make sure your stream runs flawlessly.</p>
        <Link
          href="/contact"
          className="inline-block bg-white text-[#0a4f9e] font-bold px-10 py-4 rounded-full hover:bg-gray-100 transition"
        >
          Get a Quote
        </Link>
      </section>
    </main>
  )
}
import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'

async function getServices() {
  'use cache'
  return await client.fetch(`*[_type == "service"] | order(order asc){
    _id, title, slug, shortDescription, description, image
  }`)
}

export const metadata = {
  title: 'Services | Pearl Media Lab',
  description: 'Full-service media production — video, photography, live streaming, and post-production.',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#07152b] to-[#0a4f9e] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">What We Do</h1>
          <p className="text-xl text-gray-300">
            Full-service media production — from concept to final cut.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          {services.map((service: any, i: number) => (
            <div
              key={service._id}
              id={service.slug?.current}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Text */}
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <h2 className="text-3xl font-bold text-[#07152b] mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  {service.shortDescription}
                </p>
                <Link
                  href="/contact"
                  className="inline-block text-[#1ba6e8] font-semibold hover:underline"
                >
                  Enquire about this service →
                </Link>
              </div>

              {/* Image */}
              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                {service.image ? (
                  <img
                    src={urlFor(service.image).width(600).height(400).url()}
                    alt={service.title}
                    className="w-full rounded-lg shadow-lg aspect-[3/2] object-cover"
                  />
                ) : (
                  <div className="w-full rounded-lg bg-gradient-to-br from-[#0a4f9e] to-[#1ba6e8] aspect-[3/2] flex items-center justify-center text-white text-6xl font-bold opacity-30">
                    {service.title?.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#0a4f9e] to-[#1ba6e8] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Need something custom?</h2>
        <p className="text-lg mb-8 opacity-90">Let's talk about your project.</p>
        <Link
          href="/contact"
          className="inline-block bg-white text-[#0a4f9e] font-bold px-10 py-4 rounded-full hover:bg-gray-100 transition"
        >
          Get in Touch
        </Link>
      </section>
    </main>
  )
}
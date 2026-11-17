import { client } from '@/lib/sanity'
import ContactForm from './ContactForm'

async function getSettings() {
  'use cache'
  return await client.fetch(`*[_type == "siteSettings"][0]{
    businessName, phone, whatsapp, email, address, workingHours, googleMapsUrl,
    socialLinks[]{platform, url}
  }`)
}

async function getServices() {
  'use cache'
  return await client.fetch(`*[_type == "service"] | order(order asc){ title }`)
}

export const metadata = {
  title: 'Contact | Pearl Media Lab',
  description: "Get in touch with Pearl Media Lab — let's talk about your next project.",
}

export default async function ContactPage() {
  const settings = await getSettings()
  const services = await getServices()

  return (
    <main>
      <section className="bg-gradient-to-br from-[#07152b] to-[#0a4f9e] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Let's Talk</h1>
          <p className="text-xl text-gray-300">Tell us about your project</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-[#07152b] mb-6">Send us a message</h2>
            <ContactForm services={services.map((s: any) => s.title)} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#07152b] mb-6">Contact details</h2>
            <div className="space-y-6">
              {settings?.phone && (
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-lg font-semibold text-[#07152b]">{settings.phone}</p>
                </div>
              )}
              {settings?.whatsapp && (
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">WhatsApp</p>
                  <p className="text-lg font-semibold text-[#07152b]">{settings.whatsapp}</p>
                </div>
              )}
              {settings?.email && (
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Email</p>
                  <a href={`mailto:${settings.email}`} className="text-lg font-semibold text-[#1ba6e8] hover:underline">
                    {settings.email}
                  </a>
                </div>
              )}
              {settings?.address && (
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Address</p>
                  <p className="text-lg font-semibold text-[#07152b]">{settings.address}</p>
                </div>
              )}
              {settings?.workingHours && (
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Working Hours</p>
                  <p className="text-lg font-semibold text-[#07152b]">{settings.workingHours}</p>
                </div>
              )}
              {settings?.googleMapsUrl && (
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-block text-[#1ba6e8] font-semibold hover:underline"
                >
                  View on Google Maps →
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-r from-[#0a4f9e] to-[#1ba6e8] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Prefer social media?</h2>
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          {settings?.socialLinks?.map((s: any, i: number) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener"
              className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full font-semibold transition"
            >
              {s.platform}
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
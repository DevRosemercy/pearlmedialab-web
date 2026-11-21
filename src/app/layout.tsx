import type { Metadata } from 'next'
import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import { Suspense } from 'react'
import FooterYear from './FooterYear'
import MobileNav from '@/components/MobileNav'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pearl Media Lab | Film • Motion • Story',
  description: 'Nairobi-based creative media production company specialising in video production, videography, live streaming, and photography.',
}

async function getNav() {
  return await client.fetch(`*[_type == "siteSettings"][0]{
    businessName, logo, phone, email,
    socialLinks[]{platform, url}
  }`)
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = await getNav()

  return (
    <html lang="en">
      <body className="antialiased">
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
          <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
            <Link href="/" className="flex items-center gap-2 md:gap-3 min-w-0">
              {nav?.logo && (
                <img
                  src={urlFor(nav.logo).height(50).url()}
                  alt={nav.businessName || 'Pearl Media Lab'}
                  className="h-8 md:h-10 shrink-0"
                />
              )}
              <span className="font-bold text-[#07152b] text-base md:text-lg truncate">
                {nav?.businessName || 'Pearl Media Lab'}
              </span>
            </Link>

            {/* Links on wide screens, menu button on phones and small laptops */}
            <MobileNav />
          </nav>
        </header>

        {children}

        <footer className="bg-[#07152b] text-white py-12 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3">{nav?.businessName || 'Pearl Media Lab'}</h3>
              <p className="text-gray-400 text-sm">Film • Motion • Story</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-[#50c8ff]">Contact</h4>
              <p className="text-gray-300 text-sm">{nav?.phone}</p>
              <p className="text-gray-300 text-sm break-all">{nav?.email}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-[#50c8ff]">Follow</h4>
              <div className="flex gap-4 flex-wrap">
                {nav?.socialLinks?.map((s: any, i: number) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener"
                    className="text-gray-400 hover:text-[#50c8ff] text-sm transition"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <Suspense fallback={<div className="text-center text-gray-500 text-sm mt-10">© Pearl Media Lab. All rights reserved.</div>}>
            <FooterYear businessName={nav?.businessName} />
          </Suspense>
        </footer>

        <a
          href="https://wa.me/254702253655"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </body>
    </html>
  )
}
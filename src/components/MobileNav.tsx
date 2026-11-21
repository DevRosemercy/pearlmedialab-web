'use client'

import { useState } from 'react'
import Link from 'next/link'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/live-streaming', label: 'Live Streaming' },
  { href: '/contact', label: 'Contact' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Wide screens: links in one row */}
      <ul className="hidden lg:flex gap-6 xl:gap-8 whitespace-nowrap text-sm font-medium text-gray-700">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-[#1ba6e8] transition">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Phones and small laptops: menu button */}
      <button
        type="button"
        className="lg:hidden p-2 -mr-2 text-[#07152b]"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="lg:hidden absolute left-0 right-0 top-full bg-white border-b border-gray-100 shadow-lg">
          <ul className="flex flex-col px-6 py-2">
            {LINKS.map((l) => (
              <li key={l.href} className="border-b border-gray-100 last:border-0">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-base font-medium text-[#07152b] hover:text-[#1ba6e8] transition"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
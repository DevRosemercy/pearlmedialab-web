'use client'

import { useState } from 'react'

export default function ContactForm({ services }: { services: string[] }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong')
    }
  }

  if (status === 'sent') {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg">
        <p className="font-bold mb-2">Thank you!</p>
        <p>Your message has been received. We'll be in touch shortly.</p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-sm text-green-600 underline">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#1ba6e8]"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#1ba6e8]"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#1ba6e8]"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Service</label>
        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#1ba6e8]"
        >
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Message *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#1ba6e8]"
        />
      </div>
      {status === 'error' && <p className="text-red-600 text-sm">{errorMsg}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#1ba6e8] hover:bg-[#0a4f9e] text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
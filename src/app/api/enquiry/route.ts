import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

export async function POST(request: Request) {
  try {
    const token = process.env.SANITY_API_WRITE_TOKEN
    console.log('Token exists:', !!token)

    if (!token) {
      console.error('SANITY_API_WRITE_TOKEN is not set in .env.local')
      return NextResponse.json(
        { error: 'Server configuration error: Missing write token' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, email, phone, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const writeClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: '2024-11-01',
      useCdn: false,
      token: token,
    })

    const doc = await writeClient.create({
      _type: 'enquiry',
      name,
      email,
      phone: phone || '',
      service: service || '',
      message,
      submittedAt: new Date().toISOString(),
    })

    console.log('Enquiry created successfully:', doc._id)
    return NextResponse.json({ success: true, id: doc._id })
  } catch (error: any) {
    console.error('Enquiry submission error:', error.message)
    return NextResponse.json(
      { error: error.message || 'Failed to submit enquiry' },
      { status: 500 }
    )
  }
}
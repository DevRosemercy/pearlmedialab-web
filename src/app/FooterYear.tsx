import { connection } from 'next/server'

export default async function FooterYear({ businessName }: { businessName?: string }) {
  await connection()
  const year = new Date().getFullYear()
  return (
    <div className="text-center text-gray-500 text-sm mt-10">
      © {year} {businessName}. All rights reserved.
    </div>
  )
}
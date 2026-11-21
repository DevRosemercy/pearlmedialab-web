import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getGallery(slug: string) {
  return await client.fetch(
    `*[_type == "eventGallery" && slug.current == $slug][0]{
      _id, title, date, description, images
    }`,
    { slug }
  )
}

export default async function SingleGalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const gallery = await getGallery(slug)
  if (!gallery) notFound()

  return (
    <main>
      <section className="bg-gradient-to-br from-[#07152b] to-[#0a4f9e] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/gallery" className="text-[#50c8ff] text-sm mb-4 inline-block hover:underline">← Back to all galleries</Link>
          <h1 className="text-5xl font-bold mb-2">{gallery.title}</h1>
          <p className="text-gray-300">{gallery.date}</p>
          {gallery.description && <p className="mt-4 text-gray-200">{gallery.description}</p>}
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {gallery.images?.map((image: any, i: number) => {
              const imageUrl = urlFor(image).url()
              return (
                <div key={i} className="relative group break-inside-avoid">
                  <img src={imageUrl} alt={`Photo ${i + 1}`} className="w-full rounded-lg" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-lg">
                    <a href={imageUrl} download={`${gallery.title}-photo-${i + 1}.jpg`} target="_blank" rel="noopener noreferrer" className="bg-white text-[#07152b] font-bold px-6 py-2 rounded-full hover:bg-[#1ba6e8] hover:text-white transition">
                      Download
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
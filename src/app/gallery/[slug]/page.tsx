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

  // Skip any empty image slots so one blank entry can't break the page
  const images = (gallery.images ?? []).filter((image: any) => image?.asset)

  return (
    <main>
      <section className="bg-gradient-to-br from-[#07152b] to-[#0a4f9e] text-white py-14 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/gallery" className="text-[#50c8ff] text-sm mb-4 inline-block hover:underline">
            ← Back to all galleries
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{gallery.title}</h1>
          <p className="text-gray-300">{gallery.date}</p>
          {gallery.description && <p className="mt-4 text-gray-200">{gallery.description}</p>}
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {images.map((image: any, i: number) => {
              const imageUrl = urlFor(image).url()
              const filename = `${gallery.title}-photo-${i + 1}.jpg`
              // Sanity's CDN forces a real download when ?dl= is added
              const downloadUrl = `${imageUrl}${imageUrl.includes('?') ? '&' : '?'}dl=${encodeURIComponent(filename)}`

              return (
                <div key={i} className="relative group break-inside-avoid">
                  <img src={imageUrl} alt={`Photo ${i + 1}`} className="w-full rounded-lg" />

                  {/* Desktop: dark overlay + button on hover.
                      Phone/tablet (no hover): button always visible in the corner. */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-lg flex items-center justify-center
                               bg-black/40 opacity-0 group-hover:opacity-100 transition
                               [@media(hover:none)]:bg-transparent [@media(hover:none)]:opacity-100
                               [@media(hover:none)]:items-end [@media(hover:none)]:justify-end [@media(hover:none)]:p-3"
                  >
                    <a
                      href={downloadUrl}
                      download={filename}
                      rel="noopener noreferrer"
                      className="pointer-events-auto bg-white text-[#07152b] font-bold px-6 py-2 rounded-full shadow-lg hover:bg-[#1ba6e8] hover:text-white transition
                                 [@media(hover:none)]:px-4 [@media(hover:none)]:py-2 [@media(hover:none)]:text-sm"
                    >
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
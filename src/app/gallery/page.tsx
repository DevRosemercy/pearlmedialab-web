import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'

async function getGalleries() {
  return await client.fetch(`*[_type == "eventGallery"] | order(date desc){
    _id, title, slug, date, coverImage, description, "imageCount": count(images)
  }`)
}

export const metadata = {
  title: 'Event Galleries | Pearl Media Lab',
  description: 'Browse and download photos from recent events.',
}

export default async function GalleryPage() {
  const galleries = await getGalleries()

  return (
    <main>
      <section className="bg-gradient-to-br from-[#07152b] to-[#0a4f9e] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Event Galleries</h1>
          <p className="text-xl text-gray-300">Browse and download photos from recent events.</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {galleries.length === 0 ? (
            <p className="text-center text-gray-500 py-20">No galleries yet. Check back soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleries.map((gallery: any) => (
                <Link key={gallery._id} href={`/gallery/${gallery.slug?.current}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 mb-4">
                    {gallery.coverImage ? (
                      <img src={urlFor(gallery.coverImage).width(600).height(450).url()} alt={gallery.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-300">No Cover</div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-[#07152b] group-hover:text-[#1ba6e8] transition">{gallery.title}</h3>
                  <p className="text-sm text-gray-500">{gallery.date} • {gallery.imageCount || 0} photos</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
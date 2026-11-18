import { Suspense } from 'react'
import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Project | Pearl Media Lab',
  description: 'A project by Pearl Media Lab.',
}

async function getProject(slug: string) {
  return await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      _id, title, slug, client, year, coverImage, gallery, description, videoUrl,
      "categories": categories[]->{ _id, title, slug }
    }`,
    { slug }
  )
}

// Tells Next.js which project pages exist so they can be built ahead of time
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(
    `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`
  )
  return slugs
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#07152b]" />}>
      <ProjectContent params={params} />
    </Suspense>
  )
}

async function ProjectContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) notFound()

  // Only keep gallery items that actually have an image attached
  const galleryImages = (project.gallery || []).filter((image: any) => image?.asset)

  return (
    <main>
      {/* Hero with cover image */}
      <section className="relative h-[60vh] min-h-[400px] bg-[#07152b]">
        {project.coverImage?.asset && (
          <img
            src={urlFor(project.coverImage).width(1920).height(1080).url()}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        )}
        <div className="relative h-full flex items-end">
          <div className="max-w-6xl mx-auto w-full px-6 pb-12 text-white">
            <Link href="/portfolio" className="text-[#50c8ff] text-sm mb-4 inline-block hover:underline">
              ← Back to portfolio
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-3">{project.title}</h1>
            <p className="text-lg text-gray-300">
              {project.client}
              {project.client && project.year && ' · '}
              {project.year}
            </p>
          </div>
        </div>
      </section>

      {/* Meta + description */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Categories */}
          {project.categories && project.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.categories.map((cat: any) => (
                <span key={cat._id} className="text-sm bg-[#e6f4fb] text-[#0a4f9e] px-3 py-1 rounded-full font-semibold">
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          {/* Video embed */}
          {project.videoUrl && (
            <div className="mb-12 aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={project.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                title={project.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Description (handles both plain text and blockContent) */}
          {project.description && (
            <div className="prose prose-lg max-w-none mb-12">
              {typeof project.description === 'string' ? (
                <p>{project.description}</p>
              ) : Array.isArray(project.description) ? (
                project.description.map((block: any, i: number) => {
                  if (block._type === 'block' && block.children) {
                    return (
                      <p key={i}>
                        {block.children.map((child: any, j: number) => (
                          <span key={j}>{child.text}</span>
                        ))}
                      </p>
                    )
                  }
                  if (block._type === 'image' && block.asset) {
                    return (
                      <img
                        key={i}
                        src={urlFor(block).width(1200).url()}
                        alt=""
                        className="rounded-lg my-6"
                      />
                    )
                  }
                  return null
                })
              ) : null}
            </div>
          )}

          {/* Gallery */}
          {galleryImages.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-[#07152b] mb-6">Gallery</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {galleryImages.map((image: any, i: number) => (
                  <img
                    key={i}
                    src={urlFor(image).width(800).url()}
                    alt={`${project.title} - ${i + 1}`}
                    className="rounded-lg w-full"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#0a4f9e] to-[#1ba6e8] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Like what you see?</h2>
        <p className="text-lg mb-8 opacity-90">Let's create something for your brand.</p>
        <Link
          href="/contact"
          className="inline-block bg-white text-[#0a4f9e] font-bold px-10 py-4 rounded-full hover:bg-gray-100 transition"
        >
          Start a Project
        </Link>
      </section>
    </main>
  )
}
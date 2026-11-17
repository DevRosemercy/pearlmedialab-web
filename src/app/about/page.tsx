import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'

async function getAboutData() {
  'use cache'
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{
    businessName, tagline, story, mission, logo
  }`)
  const team = await client.fetch(`*[_type == "teamMember"] | order(order asc){
    _id, name, role, bio, photo, socialLinks[]{platform, url}
  }`)
  return { settings, team }
}

export const metadata = {
  title: 'About | Pearl Media Lab',
  description: 'The team, the mission, and the story behind Pearl Media Lab.',
}

export default async function AboutPage() {
  const { settings, team } = await getAboutData()

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#07152b] to-[#0a4f9e] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {settings?.logo && (
            <img
              src={urlFor(settings.logo).height(80).url()}
              alt={settings.businessName}
              className="h-16 mx-auto mb-6"
            />
          )}
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-300">{settings?.tagline}</p>
        </div>
      </section>

      {/* Story */}
      {settings?.story && (
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#07152b] mb-6">Our Story</h2>
            <div className="prose prose-lg text-gray-700 whitespace-pre-line">
              {settings.story}
            </div>
          </div>
        </section>
      )}

      {/* Mission */}
      {settings?.mission && (
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#07152b] mb-6">Our Mission</h2>
            <div className="prose prose-lg text-gray-700 whitespace-pre-line">
              {settings.mission}
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      {team && team.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-[#07152b] mb-4">Meet the Team</h2>
            <p className="text-center text-gray-600 mb-12">The people behind the lens</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member: any) => (
                <div key={member._id} className="text-center">
                  <div className="aspect-square rounded-full overflow-hidden bg-gray-200 mx-auto mb-4 max-w-[200px]">
                    {member.photo ? (
                      <img
                        src={urlFor(member.photo).width(400).height(400).url()}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a4f9e] to-[#1ba6e8] text-white text-6xl font-bold">
                        {member.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-[#07152b]">{member.name}</h3>
                  <p className="text-[#1ba6e8] font-semibold mb-3">{member.role}</p>
                  {member.bio && (
                    <p className="text-gray-600 text-sm max-w-xs mx-auto">{member.bio}</p>
                  )}
                  {member.socialLinks && member.socialLinks.length > 0 && (
                    <div className="flex gap-3 justify-center mt-3">
                      {member.socialLinks.map((s: any, i: number) => (
                        <a
                          key={i}
                          href={s.url}
                          target="_blank"
                          rel="noopener"
                          className="text-sm text-gray-500 hover:text-[#1ba6e8]"
                        >
                          {s.platform}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team placeholder if empty */}
      {(!team || team.length === 0) && (
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#07152b] mb-4">Meet the Team</h2>
            <p className="text-gray-500">
              Team profiles will appear here once added in the Sanity Studio.
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#0a4f9e] to-[#1ba6e8] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Work with us</h2>
        <p className="text-lg mb-8 opacity-90">Let's tell your story together.</p>
        <Link
          href="/contact"
          className="inline-block bg-white text-[#0a4f9e] font-bold px-10 py-4 rounded-full hover:bg-gray-100 transition"
        >
          Get in Touch
        </Link>
      </section>
    </main>
  )
}
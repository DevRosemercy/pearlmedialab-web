import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'

async function getHomeData() {
  ''
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{
    businessName, tagline, story, mission, phone, email, logo
  }`)
  const services = await client.fetch(`*[_type == "service"] | order(order asc)[0...4]{
    _id, title, slug, shortDescription, image
  }`)
  const projects = await client.fetch(`*[_type == "project"] | order(order asc)[0...6]{
    _id, title, slug, coverImage, client, year
  }`)
  const testimonials = await client.fetch(`*[_type == "testimonial"][0...3]{
    _id, name, company, quote, photo
  }`)
  const logos = await client.fetch(`*[_type == "clientLogo"] | order(order asc)[0...8]{
    _id, name, logo
  }`)
  return { settings, services, projects, testimonials, logos }
}

// Your 3 background images
const HERO_IMAGES = [
  'https://i.ibb.co/d47C6bRG/Pearl-media-lab.png',
  'https://i.ibb.co/3YrF7ChW/Pearl-media-lab-symbol-1.png',
  'https://i.ibb.co/mCV8YRDJ/Pearl-media-lab-W1.png',
]

export default async function Home() {
  const { settings, services, projects, testimonials, logos } = await getHomeData()

  return (
    <main className="overflow-hidden">

      {/* ─── HERO: CINEMATIC IMAGE SLIDER ─────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07152b]">
        
        {/* Background Image Slider */}
        <div className="absolute inset-0 z-0">
          {HERO_IMAGES.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Pearl Media Lab Showcase"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === 0 ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animation: `fadeSlide 15s infinite ${i * 5}s` }}
            />
          ))}
          
          {/* Dark overlays so text is readable */}
          <div className="absolute inset-0 bg-[#07152b]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07152b] via-transparent to-transparent" />
        </div>

        {/* Hero Content (Logo + Text) */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-16">
          
          {/* Large Logo (overrides the background logo with a solid one if needed) */}
          {settings?.logo && (
            <img
              src={urlFor(settings.logo).height(250).url()}
              alt={settings.businessName}
              className="h-40 md:h-56 mx-auto mb-6 drop-shadow-2xl"
            />
          )}

          <p className="text-[#50c8ff] uppercase tracking-[0.4em] text-sm font-bold mb-6 drop-shadow-lg">
            Film · Motion · Story
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.05] tracking-tight drop-shadow-2xl">
            {settings?.businessName || 'Pearl Media Lab'}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-lg">
            {settings?.tagline || "We don't just capture moments. We shape them into stories that resonate, persuade, and endure."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="group bg-[#1ba6e8] hover:bg-[#50c8ff] text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#1ba6e8]/40 hover:shadow-[#50c8ff]/60 hover:-translate-y-0.5"
            >
              Start a Project
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/portfolio"
              className="border border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR (Client Logos) ──────────────────────────── */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
            Trusted by brands and creators
          </p>
          {logos && logos.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {logos.map((logo: any) => (
                <img
                  key={logo._id}
                  src={urlFor(logo.logo).height(40).url()}
                  alt={logo.name}
                  className="h-8 opacity-50 hover:opacity-100 transition"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-30">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-24 bg-gray-300 rounded" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── STORY / INTRO ─────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#1ba6e8] uppercase tracking-[0.3em] text-sm font-bold mb-6">
            Who We Are
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#07152b] leading-tight mb-8">
            Every story begins with a moment.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {settings?.story?.substring(0, 300)}
            {(settings?.story?.length ?? 0) > 300 && '...'}
          </p>
          <Link
            href="/about"
            className="inline-block mt-8 text-[#1ba6e8] font-semibold hover:underline"
          >
            Read our full story →
          </Link>
        </div>
      </section>

      {/* ─── SERVICES ──────────────────────────────────────────── */}
      {services && services.length > 0 && (
        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#1ba6e8] uppercase tracking-[0.3em] text-sm font-bold mb-4">
                What We Do
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#07152b] mb-4">
                Full-service production
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From concept to final cut — every frame crafted with intention.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service: any, i: number) => (
                <Link
                  key={service._id}
                  href={`/services#${service.slug?.current}`}
                  className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="text-[#1ba6e8] text-5xl font-bold opacity-10 absolute top-4 right-6 group-hover:opacity-20 transition">
                    0{i + 1}
                  </div>
                  <h3 className="text-xl font-bold text-[#07152b] mb-3 relative">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed relative">
                    {service.shortDescription}
                  </p>
                  <div className="mt-4 text-[#1ba6e8] text-sm font-semibold opacity-0 group-hover:opacity-100 transition">
                    Learn more →
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/services"
                className="inline-block border-2 border-[#1ba6e8] text-[#1ba6e8] hover:bg-[#1ba6e8] hover:text-white font-bold px-8 py-3 rounded-full transition"
              >
                View All Services
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── FEATURED WORK ─────────────────────────────────────── */}
      {projects && projects.length > 0 && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <p className="text-[#1ba6e8] uppercase tracking-[0.3em] text-sm font-bold mb-4">
                  Featured Work
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-[#07152b]">
                  Stories we've told
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="text-[#1ba6e8] font-semibold hover:underline mt-4 md:mt-0"
              >
                View full portfolio →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project: any, i: number) => (
                <Link
                  key={project._id}
                  href={`/portfolio/${project.slug?.current}`}
                  className={`group relative overflow-hidden rounded-2xl aspect-[4/5] bg-gray-200 ${
                    i === 0 ? 'md:col-span-2 md:aspect-[16/10]' : ''
                  }`}
                >
                  {project.coverImage ? (
                    <img
                      src={urlFor(project.coverImage).width(1200).height(1500).url()}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a4f9e] to-[#1ba6e8] text-white text-6xl font-bold opacity-40">
                      {project.title?.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform group-hover:-translate-y-2 transition duration-300">
                      <p className="text-[#50c8ff] text-sm font-semibold mb-1">
                        {project.client}
                        {project.client && project.year && ' · '}
                        {project.year}
                      </p>
                      <h3 className="text-white font-bold text-2xl md:text-3xl">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── TESTIMONIALS ──────────────────────────────────────── */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-24 px-6 bg-[#07152b] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(27,166,232,0.15),transparent_60%)]" />
          <div className="relative max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#50c8ff] uppercase tracking-[0.3em] text-sm font-bold mb-4">
                Testimonials
              </p>
              <h2 className="text-4xl md:text-5xl font-bold">
                What clients say
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((t: any) => (
                <blockquote
                  key={t._id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition"
                >
                  <svg className="w-8 h-8 text-[#1ba6e8] mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-lg text-gray-200 leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                  <footer className="text-[#50c8ff] font-semibold">
                    — {t.name}
                    {t.company && <span className="text-gray-400 font-normal">, {t.company}</span>}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── PROCESS ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#1ba6e8] uppercase tracking-[0.3em] text-sm font-bold mb-4">
              How We Work
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#07152b]">
              From idea to final cut
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Listen', desc: 'We start by understanding your story, your audience, and your goal.' },
              { num: '02', title: 'Plan', desc: 'We craft a creative treatment — the visual language, pacing, and emotion.' },
              { num: '03', title: 'Produce', desc: 'Directors, cinematographers, and editors bring the vision to life on set.' },
              { num: '04', title: 'Deliver', desc: 'Final cut, color grade, and delivery in every format you need.' },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-[#1ba6e8]/10 mb-2">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-[#07152b] mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0a4f9e] to-[#1ba6e8] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to tell your story?
          </h2>
          <p className="text-lg md:text-xl mb-10 opacity-90">
            Let's create something unforgettable.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#0a4f9e] font-bold px-12 py-4 rounded-full hover:bg-gray-100 transition shadow-xl hover:shadow-2xl hover:-translate-y-0.5 duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* ─── CUSTOM CSS FOR SLIDER ANIMATION ───────────────────── */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeSlide {
          0%, 100% { opacity: 1; }
          33% { opacity: 0; }
          66% { opacity: 0; }
        }
      `}} />
    </main>
  )
}
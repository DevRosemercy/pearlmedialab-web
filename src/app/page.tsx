import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'
import Showreel from '@/components/Showreel'

async function getHomeData() {
  'use cache'
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{
    businessName, tagline, story, showreelUrl, logo
  }`)
  const services = await client.fetch(`*[_type == "service"] | order(order asc)[0...4]{
    _id, title, slug, shortDescription
  }`)
  const projects = await client.fetch(`*[_type == "project"] | order(order asc)[0...6]{
    _id, title, slug, coverImage, client
  }`)
  return { settings, services, projects }
}

export default async function Home() {
  const { settings, services, projects } = await getHomeData()

  // Clean truncation of the story text
  const storyExcerpt = settings?.story 
    ? settings.story.length > 250 
      ? settings.story.substring(0, 250).split(' ').slice(0, -1).join(' ') + '...'
      : settings.story
    : "A premium production house delivering high-end video, photography, and live streaming for forward-thinking brands."

  return (
    <main className="overflow-hidden cursor-none">
      <CustomCursor />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#07152b]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0a4f9e] via-[#07152b] to-black opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#1ba6e8]/20 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto w-full">
          {settings?.logo && (
            <img src={urlFor(settings.logo).height(200).url()} alt={settings.businessName} className="h-24 md:h-40 mx-auto mb-8 drop-shadow-2xl" />
          )}
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-bold text-white mb-6 leading-[1.1] md:leading-[0.95] tracking-tighter drop-shadow-2xl">
            We Create <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50c8ff] to-[#1ba6e8]">
              Powerful Stories.
            </span>
          </h1>

          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
            {settings?.tagline || "Film. Motion. Story"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="w-full sm:w-auto group bg-white text-[#07152b] hover:bg-[#1ba6e8] hover:text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-xl hover:-translate-y-1">
              Start Your Project <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            
            <div className="w-full sm:w-auto">
              <Showreel videoUrl={settings?.showreelUrl} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="bg-[#0a4f9e] text-white py-4 overflow-hidden border-y border-[#1ba6e8]/30">
        <div className="whitespace-nowrap flex items-center" style={{ animation: 'marquee 20s linear infinite' }}>
          {['Video Production', 'Music Videos', 'Photography', 'Live Streaming', 'Drone Footage', 'Documentary', 'Commercials'].map((item, i) => (
            <span key={i} className="mx-8 text-xs md:text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-4">
              {item} <span className="text-[#1ba6e8] text-lg">✦</span>
            </span>
          ))}
           {['Video Production', 'Music Videos', 'Photography', 'Live Streaming', 'Drone Footage', 'Documentary', 'Commercials'].map((item, i) => (
            <span key={`dup-${i}`} className="mx-8 text-xs md:text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-4">
              {item} <span className="text-[#1ba6e8] text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── STORY (Mobile Optimized) ─── */}
      <section className="py-24 px-6 bg-[#f8fbff]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="text-[#1ba6e8] uppercase tracking-[0.3em] text-sm font-bold mb-6">The Pearl Standard</p>
            <h2 className="text-3xl md:text-6xl font-bold text-[#07152b] leading-[1.2] md:leading-[1.1] mb-8">
              Cinematic craft. <br />
              <span className="text-gray-400">Commercial impact.</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
              {storyExcerpt}
            </p>
            <Link href="/about" className="inline-flex items-center gap-3 bg-[#07152b] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1ba6e8] transition">
              Discover Our Story <span>→</span>
            </Link>
          </div>
          
          {/* Responsive Image Box */}
          <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] bg-[#07152b] rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl">
             {settings?.logo ? (
                <img src={urlFor(settings.logo).height(400).url()} alt="Pearl Media" className="w-3/4 object-contain drop-shadow-2xl" />
             ) : (
                <div className="text-white/20 text-9xl font-bold">P</div>
             )}
             
             {/* Floating Badge (Fixed for mobile) */}
             <div className="absolute bottom-4 right-4 md:-bottom-6 md:-right-6 bg-[#1ba6e8] text-white p-4 md:p-6 rounded-full w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center shadow-xl z-10 rotate-12">
              <span className="text-lg md:text-3xl font-bold text-center leading-none">Premium</span>
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-center mt-1">Quality<br/>Production</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      {services && services.length > 0 && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <p className="text-[#1ba6e8] uppercase tracking-[0.3em] text-sm font-bold mb-4">Expertise</p>
                <h2 className="text-3xl md:text-5xl font-bold text-[#07152b]">What we do best.</h2>
              </div>
              <Link href="/services" className="text-[#07152b] font-bold border-b-2 border-[#1ba6e8] pb-1 hover:text-[#1ba6e8] transition">
                Explore All Services
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service: any, i: number) => (
                <Link key={service._id} href={`/services#${service.slug?.current}`} className="group relative bg-[#f8fbff] rounded-3xl p-8 md:p-10 hover:bg-[#07152b] transition-all duration-500 overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[#1ba6e8] font-bold text-sm mb-4 block">0{i + 1}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#07152b] group-hover:text-white mb-4 transition-colors">{service.title}</h3>
                    <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-400 max-w-md transition-colors">{service.shortDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── PORTFOLIO ─── */}
      {projects && projects.length > 0 && (
        <section className="py-24 px-6 bg-[#07152b]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#50c8ff] uppercase tracking-[0.3em] text-sm font-bold mb-4">The Portfolio</p>
              <h2 className="text-3xl md:text-6xl font-bold text-white">Selected Work.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((project: any, i: number) => (
                <Link key={project._id} href={`/portfolio/${project.slug?.current}`} className={`group relative overflow-hidden rounded-2xl bg-gray-800 ${i === 0 ? 'md:col-span-2 aspect-[4/3] md:aspect-[21/9]' : 'aspect-square'}`}>
                  {project.coverImage ? (
                    <img src={urlFor(project.coverImage).width(1600).height(1200).url()} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-8xl font-bold">{project.title?.charAt(0)}</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07152b] via-transparent to-transparent opacity-90" />
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="transform group-hover:-translate-y-2 transition duration-500">
                      <p className="text-[#1ba6e8] text-xs md:text-sm font-bold mb-2 uppercase tracking-wider">{project.client}</p>
                      <h3 className="text-white font-bold text-2xl md:text-4xl">{project.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/portfolio" className="inline-block border border-white/30 text-white hover:bg-white hover:text-[#07152b] font-bold px-8 py-3 md:px-10 md:py-4 rounded-full transition">View Full Portfolio</Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-[#0a4f9e]">
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-7xl font-bold text-white mb-8 leading-tight">Let's make something <br/><span className="text-[#50c8ff]">unforgettable.</span></h2>
          <Link href="/contact" className="inline-block bg-white text-[#07152b] font-bold px-8 py-4 md:px-12 md:py-5 rounded-full hover:bg-[#1ba6e8] hover:text-white transition-all shadow-2xl hover:-translate-y-1 text-base md:text-lg">
            Book a Consultation
          </Link>
        </div>
      </section>

      {/* ─── CUSTOM CSS ─── */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .cursor-none { cursor: auto !important; }
          .custom-cursor { display: none !important; }
        }
      `}} />
    </main>
  )
}
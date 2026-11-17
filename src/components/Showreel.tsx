'use client'

export default function Showreel({ videoUrl }: { videoUrl?: string }) {
  return (
    <>
      <button
        onClick={() => (document.getElementById('showreel-modal') as HTMLDialogElement)?.showModal()}
        className="flex items-center gap-3 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm border border-white/20"
      >
        <span className="bg-[#1ba6e8] p-2 rounded-full">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        Watch Showreel
      </button>

      <dialog
        id="showreel-modal"
        className="backdrop:bg-black/90 backdrop:backdrop-blur-md bg-transparent p-0 m-auto w-full max-w-5xl rounded-2xl overflow-hidden"
      >
        <div className="relative bg-black aspect-video w-full">
          <button
            onClick={() => (document.getElementById('showreel-modal') as HTMLDialogElement)?.close()}
            className="absolute top-4 right-4 z-50 text-white bg-white/20 p-2 rounded-full hover:bg-white/40 transition"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          {videoUrl ? (
            <iframe
              src={videoUrl
                .replace('watch?v=', 'embed/')
                .replace('youtu.be/', 'youtube.com/embed/')
                .replace('youtube.com/shorts/', 'youtube.com/embed/')}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white/50 text-xl p-8 text-center">
              Please add a Showreel URL in Sanity Site Settings.
            </div>
          )}
        </div>
      </dialog>
    </>
  )
}
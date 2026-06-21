import React, { useState } from 'react';

function parseYoutube(url) {
  if (!url) return {};
  try {
    const u = new URL(url, 'https://example.com');
    const hostname = u.hostname;
    const params = Object.fromEntries(u.searchParams.entries());

    if (params.list) return { playlistId: params.list };

    // /embed/VIDEO_ID or /watch?v=VIDEO_ID or youtu.be/VIDEO_ID
    const embedMatch = url.match(/embed\/([A-Za-z0-9_-]{6,})/);
    if (embedMatch) return { videoId: embedMatch[1] };

    const vParam = params.v;
    if (vParam) return { videoId: vParam };

    const shortMatch = url.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/);
    if (shortMatch) return { videoId: shortMatch[1] };

    // fallback: try to find 11-char id in the URL
    const idMatch = url.match(/([A-Za-z0-9_-]{11})/);
    if (idMatch) return { videoId: idMatch[1] };
  } catch (e) {
    // ignore
  }
  return {};
}

export default function ProtectedYoutube({ videoId, playlistId, srcUrl, title }) {
  const [open, setOpen] = useState(false);

  const parsed = srcUrl ? parseYoutube(srcUrl) : {};
  const finalVideoId = videoId || parsed.videoId;
  const finalPlaylistId = playlistId || parsed.playlistId;

  const thumb = finalVideoId
    ? `https://img.youtube.com/vi/${finalVideoId}/hqdefault.jpg`
    : 'https://img.youtube.com/vi/D7TtQ1YobDU/hqdefault.jpg';

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const embedSrc = finalPlaylistId
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${finalPlaylistId}&rel=0&modestbranding=1&showinfo=0&origin=${encodeURIComponent(origin)}`
    : `https://www.youtube-nocookie.com/embed/${finalVideoId || ''}?rel=0&modestbranding=1&showinfo=0&origin=${encodeURIComponent(origin)}`;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative w-full aspect-video bg-black rounded overflow-hidden border border-white/10"
        aria-label={title || 'Abrir vídeo'}
      >
        <img src={thumb} alt={title || 'Vídeo'} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/60 rounded-full p-3">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full h-full max-h-[96vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-5xl h-[85vh] sm:h-auto sm:aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src={embedSrc}
                title={title || 'Vídeo protegido'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

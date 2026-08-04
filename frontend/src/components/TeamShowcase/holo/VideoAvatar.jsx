import React, { useEffect, useRef } from 'react';

/**
 * Plays a pre-rendered showcase clip in place of the live 3D avatar.
 * No true alpha channel is assumed here — the clip's own dark background is
 * blended against the section's matching dark backdrop via a soft radial mask
 * and edge fade, so the rectangular video bounds don't read as a hard box.
 */
export default function VideoAvatar({ src, poster }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay can be blocked until user interaction; that's fine, it'll
      // start on the first click/tap the browser registers on the page.
    });
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <video
        ref={videoRef}
        className="holo-video-mask h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        aria-label="Developer showcase animation"
      />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_40px_#04060f]" />

      <style>{`
        .holo-video-mask {
          -webkit-mask-image: radial-gradient(ellipse 80% 85% at center, black 55%, transparent 100%);
          mask-image: radial-gradient(ellipse 80% 85% at center, black 55%, transparent 100%);
        }
      `}</style>
    </div>
  );
}

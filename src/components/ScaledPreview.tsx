import { useRef, useEffect, useState, RefObject, ReactNode } from 'react';

interface Props {
  previewRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}

/**
 * Renders the resume at 800px wide, then scales it down so it
 * fits perfectly inside its parent container.  Works at any viewport width.
 */
export default function ScaledPreview({ previewRef, children }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const compute = () => {
      if (!wrapperRef.current) return;
      const available = wrapperRef.current.clientWidth;
      const widthScale = available / 800;
      // Keep the whole page visible on mobile by also fitting the height.
      // 1130px approximates the template page height used across templates.
      const heightScale = (window.innerHeight - 132) / 1130;
      const computed = Math.min(widthScale, heightScale, 1); // never upscale
      setScale(computed);
    };

    compute();
    const ro = new ResizeObserver(compute);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    window.addEventListener('resize', compute);
    window.addEventListener('orientationchange', compute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
      window.removeEventListener('orientationchange', compute);
    };
  }, []);

  // Estimate total resume height based on scale; clamp to a usable min
  const clipHeight = Math.max(scale * 1130, 320);

  return (
    <div ref={wrapperRef} className="w-full rounded-xl shadow-xl bg-white overflow-hidden">
      {/* Clip box — height tracks scaled page so the full page is visible */}
      <div style={{ height: `${clipHeight}px`, overflow: 'hidden', position: 'relative' }}>
        {/* Scaled resume — 800 px wide, scaled to fit */}
        <div
          ref={previewRef as RefObject<HTMLDivElement>}
          id="resume-preview"
          className="bg-white"
          style={{
            width: '800px',
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

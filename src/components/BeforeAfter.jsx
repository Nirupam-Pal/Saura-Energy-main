import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronsLeftRight } from "lucide-react";

/**
 * Lightweight before/after image comparison slider.
 * Drag the handle (or move pointer over the image) to reveal before/after.
 */
export default function BeforeAfter({ before, after, alt = "Project before-after", height = "h-72", testid }) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef(null);

  const update = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      update(e.touches ? e.touches[0].clientX : e.clientX);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [update]);

  return (
    <div
      ref={containerRef}
      data-testid={testid}
      className={`relative w-full ${height} overflow-hidden select-none cursor-ew-resize bg-slate-900`}
      onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; update(e.touches[0].clientX); }}
    >
      {/* AFTER image (full background) */}
      <img src={after} alt={`${alt} – after`} className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />

      {/* BEFORE image (clipped) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width: `${pos}%` }}>
        <img src={before} alt={`${alt} – before`} className="absolute inset-0 w-full h-full object-cover" style={{ width: `${100 / (pos / 100 || 0.0001)}%`, maxWidth: "none" }} draggable={false} />
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur text-[10px] tracking-widest font-bold text-white uppercase">Before</span>
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#F26A21] text-[10px] tracking-widest font-bold text-white uppercase">After</span>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_2px_rgba(0,0,0,0.15)] pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white shadow-xl grid place-items-center">
          <ChevronsLeftRight className="h-5 w-5 text-[#1B3A8C]" />
        </div>
      </div>
    </div>
  );
}

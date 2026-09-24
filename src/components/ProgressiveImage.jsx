import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { resolveImage } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Blur-up image.
 *
 * 1. Instantly paints a tiny blurred placeholder (inline base64 for local
 *    photos, a ~1 KB thumbnail for Unsplash) or a shimmer skeleton.
 * 2. Lets the browser pick the right size from `srcSet` + `sizes`.
 * 3. Fades the sharp image in over the placeholder once it has decoded.
 *
 * Layout modes:
 * - default ("fill"): the wrapper takes its size from `className`
 *   (e.g. "h-72 w-full" or "absolute inset-0") and the image covers it.
 * - `intrinsic`: the wrapper reserves the photo's real aspect ratio — use
 *   for masonry grids so nothing jumps when images arrive.
 *
 * `priority` is for the one or two images visible on first paint (heroes):
 * it disables lazy loading and raises fetch priority. Everything else is
 * lazy-loaded by the browser as it nears the viewport.
 */
export default function ProgressiveImage({
  src,
  alt = "",
  sizes = "100vw",
  priority = false,
  intrinsic = false,
  className,
  imgClassName,
  style,
  ...rest
}) {
  const img = useMemo(() => resolveImage(src), [src]);
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Already in the browser cache (e.g. revisiting a page): mark it loaded
  // before the first paint so it appears at once instead of fading.
  useLayoutEffect(() => {
    const el = ref.current;
    setLoaded(Boolean(el?.complete && el.naturalWidth > 0));
  }, [img.src]);

  const aspect = intrinsic && img.width && img.height ? { aspectRatio: `${img.width} / ${img.height}` } : null;

  return (
    <div
      className={cn("relative overflow-hidden bg-slate-200/70", !className?.includes("absolute") && "w-full", className)}
      style={{ ...aspect, ...style }}
    >
      {img.lqip ? (
        <img
          src={img.lqip}
          alt=""
          aria-hidden="true"
          className={cn(
            "absolute inset-0 h-full w-full object-cover scale-110 blur-xl transition-opacity duration-700 ease-out-expo",
            loaded && "opacity-0 delay-300"
          )}
        />
      ) : (
        !loaded && <div aria-hidden="true" className="absolute inset-0 skeleton-shimmer" />
      )}

      <img
        ref={ref}
        src={img.src}
        srcSet={img.srcSet}
        sizes={img.srcSet ? sizes : undefined}
        alt={alt}
        width={img.width}
        height={img.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        onLoad={() => setLoaded(true)}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          "transition-[opacity,transform,filter] duration-700 ease-out-expo",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName
        )}
        {...rest}
      />
    </div>
  );
}

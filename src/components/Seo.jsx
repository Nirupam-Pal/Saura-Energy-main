import { useLocation } from "react-router-dom";
import { BRAND, SITE_URL } from "@/lib/data";
import { resolveImage } from "@/lib/images";

const DEFAULT_IMAGE = "/img/brand/saura-og.jpg";

// Per-page <head> tags. React 19 hoists <title>/<meta>/<link> rendered
// anywhere in the tree into document.head, and scripts/prerender.mjs bakes
// them into each route's static HTML so crawlers see them without JS.
//
// `title` is the page-specific part; the brand is appended unless the title
// already contains it. Pass `noindex` for pages that shouldn't be indexed.
export default function Seo({ title, description, image, type = "website", noindex = false, jsonLd }) {
  const { pathname } = useLocation();
  const fullTitle = title && !title.includes(BRAND.name) ? `${title} | ${BRAND.name}` : title || BRAND.name;
  const canonical = SITE_URL + (pathname === "/" ? "/" : pathname.replace(/\/+$/, ""));
  // resolveImage swaps multi-MB originals for the optimised web size.
  const { src } = resolveImage(image || DEFAULT_IMAGE);
  const ogImage = /^https?:/.test(src) ? src : SITE_URL + src;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:site_name" content={BRAND.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </>
  );
}

// LocalBusiness structured data for the homepage and contact page.
export const LOCAL_BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BRAND.name,
  url: SITE_URL + "/",
  logo: SITE_URL + "/img/brand/saura-180.png",
  image: SITE_URL + DEFAULT_IMAGE,
  telephone: BRAND.phoneDisplay,
  email: BRAND.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Badharghat, near Vivekananda Market, Godown Road",
    addressLocality: "Agartala",
    addressRegion: "Tripura",
    postalCode: "799003",
    addressCountry: "IN",
  },
  areaServed: "North-East India",
  sameAs: [BRAND.instagramUrl, BRAND.facebookUrl],
};

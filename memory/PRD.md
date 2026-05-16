# Saura Energy — PRD

## Original Problem Statement
Premium, enterprise-grade, fully responsive solar energy website for Saura Energy (Agartala, Tripura). Goal: generate solar installation leads, showcase projects, educate users about subsidy & savings. Tata-Power-class feel with cinematic hero, glassmorphism, deep-blue/orange/green brand palette.

## Architecture
- **Backend**: FastAPI on :8001, MongoDB (motor). Endpoints: /api/leads (POST/GET), /api/newsletter (POST), /api/calculator/savings (POST), /api/stats (GET).
- **Frontend**: React 19 + react-router-dom v7 + Tailwind + Framer Motion + recharts + Sonner toasts.
- **Routes**: / (long-scroll home), /about, /services, /services/:slug, /projects, /calculator, /blog, /contact.

## User Personas
- Indian homeowner exploring rooftop solar + PM Surya Ghar subsidy.
- SME owner needing commercial solar with finance options.
- Industrial procurement lead seeking MW-scale EPC partner.
- Govt./policy enthusiast browsing subsidy slabs and resources.

## Core Requirements (Static)
- Cinematic hero with animated stats & dual CTA.
- 9-card services bento.
- Interactive savings calculator with chart.
- Project filter gallery.
- Animated 7-step process timeline.
- PM Surya Ghar subsidy spotlight with slab table.
- Lead inquiry form + newsletter + floating WhatsApp.
- Footer with full contact, social, newsletter, sitemap.

## Implemented (Feb 2026)
- ✅ Full Home page with 13 sections (Hero → Trust → About → Services → Calculator → Projects → Why → Process → Subsidy → Testimonials → Blog → CTA → Contact).
- ✅ 7 inner pages including dynamic /services/:slug with FAQ.
- ✅ Backend lead capture, newsletter, savings calculator, stats endpoints.
- ✅ Sticky glass navbar with mobile drawer.
- ✅ Floating WhatsApp button.
- ✅ Sonner toasts on form submissions.
- ✅ Testing subagent — 14/14 backend + 100% frontend flows verified.

## Prioritized Backlog
- **P1**: Email notifications for new leads (Resend/SendGrid) — requires API key.
- **P1**: Admin dashboard at /admin to view leads (auth-protected).
- **P2**: AI solar assistant chatbot (Emergent LLM key).
- **P2**: Real before/after slider on project cards (currently single image).
- **P2**: CMS-driven blog content (currently static seeds).
- **P3**: Multi-language (Hindi, Bengali).
- **P3**: Live chat widget alternative.
- **P3**: Dark/light mode toggle (currently always light with dark hero blocks).

## Next Tasks
- Add real solar-rooftop hero photo (swapped from drone image already).
- Decide on email integration provider & gather API key.

## Iteration 2 (Feb 2026) — Integrations Added
- ✅ **Before/After image sliders** on every project card (`BeforeAfter.jsx` + `projectPairs.js`) with drag handle and BEFORE/AFTER labels.
- ✅ **AI Solar Assistant 'Surya'** powered by Claude Sonnet 4.5 via Emergent Universal Key. Floating chat widget at bottom-right with suggested-question chips, typing indicator, message persistence in MongoDB. Budget-error → 429 retry.
- ✅ **Resend email notifications on new lead** with graceful no-op when `RESEND_API_KEY` is missing. Lead is always saved; email sent in background task only when key + recipient configured.

### Action required from user to fully activate email
- Create Resend account → https://resend.com/api-keys → paste key into `/app/backend/.env` `RESEND_API_KEY=`
- Optional: verify your sending domain on Resend and update `SENDER_EMAIL`
- Update `NOTIFY_EMAIL` to your inbox

## Backlog (remaining)
- P1: Admin dashboard at /admin to view captured leads.
- P2: CMS-driven blog.
- P3: Multi-language (Hindi, Bengali), dark/light mode toggle.

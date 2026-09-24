// Built-in answers for the "Surya" chat assistant.
//
// Runs entirely in the browser (no server or API key needed), matching the
// visitor's question to a topic by keywords. Facts come from the site's own
// content (src/lib/data.js) plus the official PM Surya Ghar subsidy rates for
// special category states such as Tripura. To change an answer, edit the
// `reply` of its topic below; to teach it a new topic, add an entry to TOPICS.
import { BRAND, PARTNERS, BANKS } from "@/lib/data";

// Same planning assumptions as the site's savings calculator.
const TARIFF_PER_UNIT = 8; // ₹ per unit (kWh)
const UNITS_PER_KW_MONTH = 135;
const COST_PER_KW = 60000; // ₹, residential, before subsidy

const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const kwLabel = (kw) => `${Number.isInteger(kw) ? kw : kw.toFixed(1)} kW`;

/** PM Surya Ghar subsidy for Tripura / special category states. */
export function subsidyFor(kw) {
  if (kw <= 0) return 0;
  if (kw <= 2) return 33000 * kw;
  if (kw < 3) return 66000 + 19800 * (kw - 2);
  return 85800;
}

const CONTACT_LINKS = [
  { label: "WhatsApp us", href: `https://wa.me/${BRAND.whatsapp}` },
  { label: `Call ${BRAND.phoneDisplay}`, href: `tel:${BRAND.phone}` },
];

// --- Number extraction ---------------------------------------------------

function extractKw(text) {
  const m = text.match(/(\d+(?:\.\d+)?)\s*(?:kw|kilo ?watts?|kilowatts?)\b/);
  return m ? parseFloat(m[1]) : null;
}

function extractUnits(text) {
  const m = text.match(/(\d{2,5})\s*(?:units?|kwh)\b/);
  return m ? parseInt(m[1], 10) : null;
}

function extractBill(text) {
  if (!/bill|pay|paying|rs\.?|₹|rupees?|inr/.test(text)) return null;
  const m = text.match(/(?:₹|rs\.?|inr)?\s*(\d{1,2},\d{3}|\d{3,6})\s*(?:rs\.?|rupees?|inr)?/);
  return m ? parseInt(m[1].replace(/,/g, ""), 10) : null;
}

// Round up to the nearest 0.5 kW — systems are built from whole panels.
const sizeForUnits = (units) => Math.max(1, Math.ceil((units / UNITS_PER_KW_MONTH) * 2) / 2);

// Real payback depends on the tariff and how much solar power is used on
// site, so quote the site's stated range rather than an over-precise figure.
const PAYBACK_NOTE =
  "Most home systems pay for themselves in about 4–5 years after subsidy, depending on your tariff and how much of the power you use yourself.";

// --- Dynamic answers -----------------------------------------------------

function subsidyReply(text) {
  const kw = extractKw(text);
  if (kw) {
    return {
      text:
        `For a ${kwLabel(kw)} home system in Tripura, the PM Surya Ghar subsidy is about ${inr(subsidyFor(kw))}` +
        (kw >= 3 ? " — that's the maximum." : ".") +
        "\n\nThe subsidy is paid straight into your bank account after installation and DISCOM inspection, usually within about 30 days of commissioning. We handle the registration and paperwork for you.",
      links: [{ label: "Subsidy guide", to: "/blog/pm-surya-ghar-subsidy-guide" }],
    };
  }
  return {
    text:
      "Under PM Surya Ghar, homes in Tripura (a special category state) get:\n" +
      "• 1 kW → ₹33,000\n• 2 kW → ₹66,000\n• 3 kW or more → ₹85,800 (maximum)\n\n" +
      "It's credited directly to your bank account after installation and DISCOM inspection — usually within about 30 days. Saura Energy handles the portal registration, DISCOM approval and inspection for you.",
    links: [{ label: "Step-by-step subsidy guide", to: "/blog/pm-surya-ghar-subsidy-guide" }],
    suggestions: ["Subsidy for 2 kW?", "What documents do I need?"],
  };
}

function costReply(text) {
  const kw = extractKw(text);
  if (kw && kw <= 10) {
    const cost = kw * COST_PER_KW;
    const subsidy = subsidyFor(kw);
    return {
      text:
        `A ${kwLabel(kw)} home system is roughly ${inr(cost)} before subsidy. ` +
        `After the PM Surya Ghar subsidy of about ${inr(subsidy)}, you'd pay around ${inr(cost - subsidy)}.\n\n` +
        "This is a planning estimate — your exact, itemised quote comes after a free site survey. No hidden costs.",
      links: [{ label: "Get a free quote", to: "/contact" }],
    };
  }
  if (kw) {
    return {
      text: `For a ${kwLabel(kw)} system, pricing depends a lot on the site and structure, so we quote it after a free survey. Commercial and industrial systems usually cost less per kW than small home systems.`,
      links: [{ label: "Request a commercial quote", to: "/contact" }, ...CONTACT_LINKS.slice(0, 1)],
    };
  }
  return {
    text:
      "As a rough guide, a home system costs about ₹60,000 per kW before subsidy — a 3 kW system is around ₹1.8 lakh. " +
      "With the ₹85,800 PM Surya Ghar subsidy in Tripura, that drops to roughly ₹94,000.\n\nTell me a size (e.g. \"cost of 2 kW\") and I'll estimate it, or get an exact itemised quote after a free site survey.",
    links: [{ label: "Get a free quote", to: "/contact" }],
    suggestions: ["Cost of 2 kW?", "Payback for 3 kW?"],
  };
}

function sizingReply(text) {
  const units = extractUnits(text);
  const bill = extractBill(text);
  const monthlyUnits = units || (bill ? bill / TARIFF_PER_UNIT : null);
  if (monthlyUnits) {
    const kw = sizeForUnits(monthlyUnits);
    const cost = kw * COST_PER_KW;
    const net = Math.max(0, cost - subsidyFor(kw));
    return {
      text:
        `For about ${Math.round(monthlyUnits)} units a month${bill ? ` (a ${inr(bill)} bill)` : ""}, a system of around ${kwLabel(kw)} should cover your usage.\n\n` +
        `Rough estimate: ${inr(cost)} before subsidy, about ${inr(net)} after the PM Surya Ghar subsidy. ${PAYBACK_NOTE}\n\n` +
        "A free site survey confirms the exact size for your roof.",
      links: [{ label: "Book a free survey", to: "/contact" }],
    };
  }
  return {
    text:
      "A quick rule of thumb from your monthly electricity use:\n" +
      "• Up to 150 units → 1–2 kW\n• 150–300 units → 2–3 kW\n• Above 300 units → 3 kW or more\n\n" +
      "Tell me your monthly units or bill (e.g. \"my bill is ₹2,500\") and I'll suggest a size. Need backup during power cuts? The Load Calculator sizes the inverter and battery.",
    links: [{ label: "Load Calculator", to: "/calculator" }],
    suggestions: ["My bill is ₹2,500", "I use 250 units"],
  };
}

function paybackReply(text) {
  const kw = extractKw(text);
  if (kw && kw <= 10) {
    const net = Math.max(0, kw * COST_PER_KW - subsidyFor(kw));
    return {
      text:
        `A ${kwLabel(kw)} system generates roughly ${Math.round(kw * UNITS_PER_KW_MONTH)} units a month and costs about ${inr(net)} after the PM Surya Ghar subsidy. ` +
        `${PAYBACK_NOTE}\n\nAfter that it's essentially free electricity for the rest of the panels' 25-year life.`,
      links: [{ label: "Get a free quote", to: "/contact" }],
    };
  }
  return {
    text:
      `${PAYBACK_NOTE} After that it's essentially free power for the rest of the panels' 25-year life.\n\nTell me a size (e.g. "payback for 3 kW") for a rough estimate.`,
    suggestions: ["Payback for 3 kW?", "How much subsidy can I claim?"],
  };
}

// --- Topics --------------------------------------------------------------
// `match` patterns are tested against the lower-cased question; the topic
// with the most matching patterns wins (ties go to the earlier topic).

const TOPICS = [
  {
    id: "subsidy",
    match: [/subsid/, /surya ghar/, /pm ?surya/, /government (scheme|support|help)/, /yojana/, /muft bijli/],
    reply: subsidyReply,
  },
  {
    id: "documents",
    match: [/document/, /papers?\b/, /eligib/, /who can (apply|get)/, /\bapply\b/, /register/, /portal/],
    reply: () => ({
      text:
        "To apply for PM Surya Ghar you'll need:\n• An electricity connection in your name (your consumer number)\n• Your own house with a suitable roof\n• A bank account in the same name, with a cancelled cheque\n• Your mobile number and email for the portal\n\n" +
        "You're eligible if you haven't already taken another rooftop-solar subsidy. We register you on the portal and handle DISCOM approval and inspection.",
      links: [{ label: "Full subsidy guide", to: "/blog/pm-surya-ghar-subsidy-guide" }],
    }),
  },
  {
    id: "sizing",
    match: [/how (many|much) (kw|kilowatt)/, /what size/, /which size/, /size (do|should|of)/, /\bunits?\b/, /my (electricity |power )?bill/, /bill is/, /\bkwh\b/, /how big/],
    reply: sizingReply,
  },
  {
    id: "cost",
    match: [/cost/, /price/, /pric(e|ing)/, /how much (is|does|for|will)/, /rate\b/, /expens/, /cheap/, /budget/, /quote/],
    reply: costReply,
  },
  {
    id: "payback",
    match: [/payback/, /pay back/, /\broi\b/, /return/, /save|saving/, /worth it/, /recover/, /break ?even/],
    reply: paybackReply,
  },
  {
    id: "battery",
    match: [/batter/, /power cut/, /outage/, /backup/, /load ?shedding/, /blackout/, /hybrid/, /off[- ]?grid/, /night/, /inverter/],
    reply: () => ({
      text:
        "Standard grid-tied systems switch off during power cuts — it's a safety rule. To keep running during outages you need a hybrid system with a battery, which we design end-to-end.\n\n" +
        "Batteries make most sense if you have frequent cuts or loads that can't stop (home office, clinic, fridge). If your supply is reliable, net metering works like a free battery and pays back faster.",
      links: [
        { label: "Size my inverter & battery", to: "/calculator" },
        { label: "Is a battery worth it?", to: "/blog/solar-battery-storage-2026" },
      ],
    }),
  },
  {
    id: "brands",
    match: [/brand/, /panel/, /manufactur/, /\btopcon\b/, /\bperc\b/, /mono/, /efficien/, /tier/, /which (company|make)/, /best/],
    reply: () => ({
      text:
        `We install Tier-1 Mono-PERC and TOPCon panels with up to 22% efficiency, working with brands including ${PARTNERS.slice(0, 6).map((p) => p.name).join(", ")}.\n\n` +
        "TOPCon suits smaller or hotter roofs (more output per panel, slower ageing); Mono-PERC is great value when you have plenty of space. We'll compare datasheets for your roof.",
      links: [{ label: "Mono-PERC vs TOPCon", to: "/blog/mono-perc-vs-topcon" }],
    }),
  },
  {
    id: "area",
    match: [/agartala/, /tripura/, /cover/, /service area/, /where (are|is) you/, /location/, /address/, /office/, /north[- ]?east/, /assam/, /meghalaya/, /mizoram/, /near me/, /\barea\b/],
    reply: () => ({
      text:
        `Yes! We're based in Agartala and install across Tripura and the North-East.\n\nOffice: ${BRAND.address}.\n\nTell us your location and we'll confirm a free site survey.`,
      links: [{ label: "Book a free survey", to: "/contact" }, ...CONTACT_LINKS.slice(0, 1)],
    }),
  },
  {
    id: "time",
    match: [/how long/, /how many days/, /timeline/, /install(ation)? time/, /how (fast|quick)/, /when can/, /\bprocess\b/, /steps?\b/],
    reply: () => ({
      text:
        "Here's how it works: free consultation → site survey → system design → DISCOM approval & subsidy registration → installation → net meter & commissioning → ongoing support.\n\n" +
        "Home installations take 7–14 days after DISCOM approval. Commercial projects take 4–8 weeks, and industrial 6–14 weeks depending on size.",
      links: [{ label: "Start with a free consultation", to: "/contact" }],
    }),
  },
  {
    id: "finance",
    match: [/loan/, /\bemi\b/, /financ/, /instal?ments?/, /\bbank/, /interest/],
    reply: () => ({
      text: `Yes — easy solar loans are available at around 5.75% through partner banks including ${BANKS.slice(0, 4).join(", ")}. We help you with the application alongside your subsidy paperwork.`,
      links: [{ label: "Ask about financing", to: "/contact" }],
    }),
  },
  {
    id: "maintenance",
    match: [/mainten/, /clean/, /service/, /\bo&m\b/, /repair/, /dust/, /rain/, /monsoon/],
    reply: () => ({
      text:
        "Rooftop solar needs very little upkeep: clean the panels every 2–3 months and have an annual electrical check. Our maintenance plans cover both, with a 24/7 helpdesk and quarterly cleaning included.",
    }),
  },
  {
    id: "warranty",
    match: [/warrant/, /guarantee/, /life ?span/, /how long (do|does|will).*(last|panel)/, /\blast\b/, /durab/],
    reply: () => ({
      text: "Our Tier-1 panels come with a 25-year performance warranty from the manufacturer, and inverter warranties of up to 10 years are available. Panels typically keep producing well beyond 25 years.",
    }),
  },
  {
    id: "shade",
    match: [/shad/, /tree/, /building next/, /small roof/],
    reply: () => ({
      text:
        "We start with a shadow analysis of your roof. Where there's partial shade, we use micro-inverters or DC optimisers so one shaded panel doesn't pull down the rest.",
      links: [{ label: "Book a free roof survey", to: "/contact" }],
    }),
  },
  {
    id: "netmeter",
    match: [/net ?meter/, /export/, /sell (power|electricity)/, /grid ?tie/, /\bdiscom\b/, /\btsecl\b/],
    reply: () => ({
      text:
        "With net metering, the extra power your panels make during the day is sent to the grid and credited against the power you use at night. We apply for the net meter with your DISCOM and complete commissioning for you.",
    }),
  },
  {
    id: "products",
    match: [/water heater/, /street ?light/, /commercial/, /industr/, /factory/, /school/, /hospital/, /business/, /office/],
    reply: () => ({
      text:
        "Besides home rooftop systems, we do commercial and industrial solar plants, premium inverters, lithium battery storage, solar street lights and solar water heaters — for homes, schools, hospitals, businesses and tea estates.",
      links: [{ label: "See our services", to: "/services" }, { label: "See our projects", to: "/projects" }],
    }),
  },
  {
    id: "contact",
    match: [/contact/, /call/, /phone/, /number/, /whats ?app/, /email/, /talk to/, /speak/, /human/, /visit/, /survey/, /meet/],
    reply: () => ({
      text: `You can reach us on ${BRAND.phoneDisplay} (landline ${BRAND.landline}), on WhatsApp, or at ${BRAND.email}. We offer a free site survey.`,
      links: [...CONTACT_LINKS, { label: "Contact form", to: "/contact" }],
    }),
  },
  {
    id: "greeting",
    match: [/^(hi|hello|hey|namaste|namaskar|good (morning|afternoon|evening))\b/],
    reply: () => ({
      text: "Hello! 👋 I can help with PM Surya Ghar subsidy, costs, system size, payback, batteries, or booking a free site survey. What would you like to know?",
    }),
  },
  {
    id: "thanks",
    match: [/thank/, /\bthx\b/, /great/, /awesome/, /\bok(ay)?\b/, /\bbye\b/],
    reply: () => ({
      text: "You're welcome! ☀️ If you'd like an exact quote, our team can do a free site survey.",
      links: [{ label: "Get a free quote", to: "/contact" }],
    }),
  },
];

const FALLBACK = {
  text:
    `I'm not sure about that one yet — our team will be happy to help. Call ${BRAND.phoneDisplay} or message us on WhatsApp.\n\n` +
    "I can answer questions about subsidy, cost, system size, payback, batteries, financing and installation.",
  links: CONTACT_LINKS,
  suggestions: ["How much subsidy can I claim?", "Cost of a 3 kW system?", "Do you cover Agartala?"],
};

/** Returns { text, links?, suggestions? } for a visitor's question. */
export function answerQuestion(question) {
  const text = question.toLowerCase().replace(/\s+/g, " ").trim();
  let best = null;
  let bestScore = 0;
  for (const topic of TOPICS) {
    const score = topic.match.reduce((n, re) => n + (re.test(text) ? 1 : 0), 0);
    if (score > bestScore) {
      best = topic;
      bestScore = score;
    }
  }
  // A bare size like "3 kW" with no other topic is most likely a cost question.
  if (!best && extractKw(text)) return costReply(text);
  return best ? best.reply(text) : FALLBACK;
}

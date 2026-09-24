// Article bodies for the Insights (/blog) pages, keyed by BLOG_POSTS slug.
//
// Each article is a list of blocks rendered by src/pages/BlogPost.jsx:
//   { h: "Heading" }                     section heading
//   { p: "Paragraph" }                   paragraph
//   { list: ["…", "…"] }                 bullet list
//   { steps: [{ t: "Title", d: "…" }] }  numbered steps
//   { table: { head: [...], rows: [[...]] } }
//   { note: "…" }                        highlighted callout
//   { cta: { label: "…", to: "/path" } }  button linking to a page
//
// An article with `comingSoon: true` shows its excerpt and a contact prompt
// instead of a body — replace it with real content when it's ready.

export const BLOG_ARTICLES = {
  "pm-surya-ghar-subsidy-guide": {
    readTime: "6 min read",
    blocks: [
      { p: "PM Surya Ghar: Muft Bijli Yojana is the Government of India's rooftop solar scheme for homes. The subsidy is paid by the central government straight into your bank account after your system is installed and inspected. Tripura is a special category state, so homeowners here receive a higher subsidy than most of India — up to ₹85,800." },

      { h: "How much subsidy you get" },
      { p: "The subsidy depends on the size (kW) of the solar system you install, not on its price:" },
      {
        table: {
          head: ["System size", "Subsidy in Tripura & the North-East", "Subsidy in most other states"],
          rows: [
            ["1 kW", "₹33,000", "₹30,000"],
            ["2 kW", "₹66,000", "₹60,000"],
            ["3 kW or more", "₹85,800 (maximum)", "₹78,000 (maximum)"],
          ],
        },
      },
      { p: "A simple way to pick a size: if your home uses up to 150 units a month, 1–2 kW is usually enough. Between 150 and 300 units, look at 2–3 kW. Above 300 units, 3 kW or more — and 3 kW is where the subsidy reaches its maximum." },

      { h: "Who is eligible" },
      {
        list: [
          "You are an Indian citizen and own the house.",
          "The house has a roof suitable for solar panels.",
          "You have a valid electricity connection in your name.",
          "You have not already received another subsidy for rooftop solar.",
        ],
      },

      { h: "The step-by-step process" },
      {
        steps: [
          { t: "Register on the national portal", d: "At pmsuryaghar.gov.in, choose your state and electricity company (DISCOM), then enter your consumer number, mobile number and email." },
          { t: "Apply for rooftop solar", d: "Log in with your consumer number and submit the rooftop solar application." },
          { t: "Get feasibility approval", d: "Your DISCOM checks the application and approves it — you'll be notified on the portal." },
          { t: "Install with a registered vendor", d: "Only systems installed by a vendor registered with your DISCOM qualify. Residential installs typically take 7–14 days after approval." },
          { t: "Apply for net metering", d: "Submit the plant details on the portal and apply for a net meter." },
          { t: "Inspection and commissioning", d: "After the net meter is installed and the DISCOM inspects the system, a commissioning certificate is generated on the portal." },
          { t: "Receive the subsidy", d: "Submit your bank account details and a cancelled cheque. The subsidy is typically credited within about 30 days." },
        ],
      },
      { note: "So how fast is it really? The installation itself can be done in about a week once approved. The full journey — approval, installation, net metering and the subsidy reaching your account — usually takes a few weeks. Saura Energy handles the portal registration, DISCOM paperwork and inspection for you." },

      { h: "Common mistakes that delay your subsidy" },
      {
        list: [
          "The electricity connection is in a different family member's name — the applicant, connection and bank account should match.",
          "Installing before feasibility approval — the system won't qualify.",
          "Choosing an unregistered installer.",
          "Blurry or incomplete documents on the portal.",
        ],
      },
      { cta: { label: "Get help with my subsidy application", to: "/contact" } },
    ],
  },

  "mono-perc-vs-topcon": {
    readTime: "5 min read",
    blocks: [
      { p: "Almost every rooftop quote in India today offers one of two panel technologies: Mono-PERC or TOPCon. Both are good. The right one depends on your roof space, your budget and how hot your roof gets." },

      { h: "What's the difference?" },
      { p: "Mono-PERC (Passivated Emitter and Rear Cell) has been the industry workhorse for years. TOPCon (Tunnel Oxide Passivated Contact) is a newer design built on n-type silicon that wastes less of the sunlight that hits it. In practice that means TOPCon squeezes a bit more energy out of the same roof area and ages more slowly." },

      { h: "Side by side" },
      {
        table: {
          head: ["", "Mono-PERC", "TOPCon"],
          rows: [
            ["Typical module efficiency", "About 20–21.5%", "About 21.5–23%"],
            ["First-year degradation", "Around 2%", "Around 1%"],
            ["Yearly degradation after that", "Around 0.55%", "Around 0.4%"],
            ["Performance in heat", "Good", "Better (loses less power per °C)"],
            ["Bifacial gain (double-glass versions)", "Lower", "Higher"],
            ["Price per watt", "Lower", "Slightly higher"],
          ],
        },
      },
      { note: "These are typical ranges across leading brands. Always check the exact figures on the datasheet of the specific panel in your quote." },

      { h: "Which should you choose?" },
      { p: "Choose TOPCon if:" },
      {
        list: [
          "Your roof space is limited and you want the most kW from it.",
          "Your roof gets very hot in summer — TOPCon handles heat better.",
          "You care most about output over 25+ years; slower degradation adds up.",
        ],
      },
      { p: "Choose Mono-PERC if:" },
      {
        list: [
          "You have plenty of shade-free roof space.",
          "You want the lowest upfront cost per kW.",
        ],
      },

      { h: "What matters more than the cell technology" },
      {
        list: [
          "A Tier-1 manufacturer with a real presence in India, so warranty claims are honoured.",
          "The performance warranty (typically 25–30 years) and the product warranty.",
          "Correct system design: orientation, tilt and shade analysis often matter more than a 1% efficiency difference.",
          "Installation quality — structure, wiring and earthing.",
        ],
      },
      { p: "Saura Energy installs both Tier-1 Mono-PERC and TOPCon panels with up to 22% efficiency, and we'll show you the datasheets side by side for your roof." },
      { cta: { label: "Book a free rooftop survey", to: "/contact" } },
    ],
  },

  "solar-battery-storage-2026": {
    readTime: "6 min read",
    blocks: [
      { p: "A standard grid-tied solar system switches off during a power cut — that's a safety rule, so it doesn't send power into lines that engineers may be repairing. If you want your lights and fans to keep running during outages, you need a hybrid system: solar panels plus a battery and a hybrid inverter. But is the extra cost worth it?" },

      { h: "When a battery is worth it" },
      {
        list: [
          "You have frequent or long power cuts.",
          "You run loads that can't stop: a home office, medical equipment, a clinic, a shop's billing counter, cold storage.",
          "You're replacing a diesel generator or an old inverter-battery setup anyway.",
          "Net metering isn't available to you, or you get very little for exported power — storing your own solar is then worth more.",
        ],
      },

      { h: "When it usually isn't" },
      {
        list: [
          "Your grid supply is reliable and you have net metering. With net metering the grid works like a free battery — daytime surplus is credited against what you use at night.",
          "Your main goal is the fastest payback. Batteries add cost and wear out before panels do, so a plain grid-tied system pays back sooner.",
        ],
      },
      { note: "PM Surya Ghar subsidy is calculated on the solar capacity (kW) you install. The battery itself isn't what the subsidy pays for, so budget for it separately." },

      { h: "Battery chemistries to know" },
      {
        table: {
          head: ["Chemistry", "Typical life", "Good to know"],
          rows: [
            ["Lithium iron phosphate (LFP / LiFePO₄)", "Several thousand cycles — often 3,000–6,000", "Today's default for home solar: safe, stable, no maintenance, lasts many years."],
            ["Lead-acid (tubular)", "Roughly 500–1,200 cycles", "Cheapest upfront, but heavier, needs water top-ups and is replaced more often."],
            ["Sodium-ion", "Emerging", "A promising lower-cost chemistry that's starting to appear; worth watching."],
          ],
        },
      },
      { p: "Always compare the cycle rating at a stated depth of discharge, and the warranty in years — not just the price." },

      { h: "How to size the battery" },
      {
        steps: [
          { t: "List your essential loads", d: "Lights, fans, Wi-Fi router, fridge, TV — whatever must run during a cut." },
          { t: "Add up their wattage", d: "This is your running load, which sets the inverter size." },
          { t: "Decide the backup hours", d: "Load × hours gives the energy the battery must store (with some margin)." },
        ],
      },
      { p: "Our free Load Calculator does this for you — pick your appliances and backup hours and it recommends the inverter capacity (VA) and battery size (Ah)." },
      { cta: { label: "Open the Load Calculator", to: "/calculator" } },
    ],
  },

  "commercial-solar-roi-tripura": {
    comingSoon: true,
  },
};

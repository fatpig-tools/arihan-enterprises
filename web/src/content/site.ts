// Fallback content. The site reads from Sanity when it is configured and
// falls back to this file otherwise. Text in [square brackets] is a
// placeholder the business still has to confirm; it renders highlighted.

export type Stat = { value: string; label: string };
export type Crane = {
  slug: string;
  name: string;
  kind: "truck" | "crawler";
  type: string;
  capacityTonnes: number;
  regNo: string;
  bestFor: string;
};
export type Service = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  body: string;
  points: string[];
};
export type Industry = { title: string; summary: string };
export type Faq = { question: string; answer: string };
export type JobRole = { title: string; requirement: string };
export type Project = {
  title: string;
  client: string;
  location: string;
  scope: string;
  equipment: string;
  contractModel: string;
  duration: string;
  outcome: string;
};
export type Client = { name: string };
export type Testimonial = { quote: string; name: string; designation: string; company: string };
export type PageCopy = {
  slug: string;
  headline: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
};
export type Settings = {
  companyName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  careersEmail: string;
  address: string;
  hours: string;
  gstin: string;
  udyam: string;
  legalName: string;
  regions: string;
  footerAbout: string;
  stats: Stat[];
};

export const settings: Settings = {
  companyName: "Arihan Enterprises",
  tagline: "Machines on Site. Work on Schedule.",
  phone: "[+91 XXXXX XXXXX]",
  whatsapp: "[+91 XXXXX XXXXX]",
  email: "[info@arihanenterprises.in]",
  careersEmail: "[careers@arihanenterprises.in]",
  address: "[Address]",
  hours: "Mon–Sat, 9:00 AM – 7:00 PM; breakdown support 24×7",
  gstin: "[Number]",
  udyam: "[Number]",
  legalName: "[Arihan Enterprises — proprietorship / partnership / LLP]",
  regions: "[States]",
  footerAbout:
    "Arihan Enterprises — heavy machinery hire and contract-based project execution for infrastructure, energy and industry.",
  // Only figures the supplied content can back. Swap in fleet size, projects
  // delivered, years in operation and states served once they are confirmed.
  stats: [
    { value: "100 t", label: "Maximum rated lift" },
    { value: "45–100 t", label: "Owned crane range" },
    { value: "5", label: "Contract models" },
    { value: "24×7", label: "Breakdown support" },
  ],
};

export const taglines = [
  "Machines on Site. Work on Schedule.",
  "Heavy Equipment. Dependable Delivery.",
  "Your Project's Muscle, On Demand.",
  "Hire the Fleet. Deliver the Contract.",
];

export const pages: PageCopy[] = [
  {
    slug: "home",
    headline: "Heavy Machinery on Hire. Project Work on Contract.",
    intro:
      "Excavators, cranes, tippers and trailers — with trained operators — mobilised to your site and managed to your schedule.",
    seoTitle: "Heavy Machinery on Hire & Contract Work | Arihan",
    seoDescription:
      "Excavators, cranes, tippers and trailers on hire with operators. Contract-based earthwork and haulage for infrastructure projects.",
  },
  {
    slug: "about",
    headline: "Built on Machines. Run on Commitment.",
    intro:
      "We supply the machines, operators and site management that contractors and project owners need to deliver on time.",
    seoTitle: "About Arihan Enterprises | Machinery Hire Partner",
    seoDescription:
      "Arihan Enterprises supplies heavy equipment and executes contract work for infrastructure, energy and industrial projects.",
  },
  {
    slug: "services",
    headline: "Equipment, Crew and Execution — Under One Contract.",
    intro:
      "Choose a machine on hire, or hand us a complete work package. Either way, you get maintained equipment, skilled operators and a single point of accountability.",
    seoTitle: "Equipment Hire & Project Contract Services | Arihan",
    seoDescription:
      "Wet and dry hire, per-quantity earthwork, lifting, operators, maintenance and heavy transport under one contract.",
  },
  {
    slug: "fleet",
    headline: "A Fleet Ready for Heavy Work.",
    intro:
      "Our crane fleet spans 45 to 100 tonnes — from fast-moving truck cranes to a heavy crawler crane. Every unit is owned, maintained and operated by Arihan, so you get consistent availability, known service history and no middleman delays.",
    seoTitle: "Excavators, Cranes & Tippers for Hire | Arihan",
    seoDescription:
      "Browse our owned fleet of excavators, 45–100 t cranes, tippers and prime movers. Hourly, daily and monthly hire.",
  },
  {
    slug: "industries",
    headline: "Where Our Machines Work.",
    intro:
      "Our equipment and crews support projects where schedules are tight and site conditions are tough.",
    seoTitle: "Industries We Serve | Arihan Enterprises",
    seoDescription:
      "Machinery and crews for highways, oil & gas, power, railways, mining and industrial plant projects.",
  },
  {
    slug: "how-we-work",
    headline: "From Enquiry to Execution in Five Steps.",
    intro:
      "A clear process, a clear contract and signed records at every stage.",
    seoTitle: "How We Work | Arihan Enterprises",
    seoDescription:
      "Five steps from enquiry to execution, and five contract models: hourly, monthly, per-quantity, lump-sum and dedicated fleet.",
  },
  {
    slug: "projects",
    headline: "Work We've Delivered.",
    intro:
      "A selection of projects where Arihan machines and crews kept the schedule on track.",
    seoTitle: "Projects | Arihan Enterprises",
    seoDescription:
      "Projects where Arihan machines and crews kept infrastructure, energy and industrial schedules on track.",
  },
  {
    slug: "safety",
    headline: "Safe Machines. Trained People. Clean Paperwork.",
    intro:
      "Heavy equipment is only as safe as the people and processes behind it. Our safety standards are built into every deployment.",
    seoTitle: "Safety & Compliance | Arihan Enterprises",
    seoDescription:
      "Pre-deployment inspection, trained operators, load-tested cranes and complete vehicle and workforce compliance.",
  },
  {
    slug: "careers",
    headline: "Operate With the Best.",
    intro:
      "We're always looking for skilled people who take pride in running heavy machines safely and well. Join a team that pays on time, maintains its equipment and values experience.",
    seoTitle: "Careers | Arihan Enterprises",
    seoDescription:
      "Jobs for crane and excavator operators, heavy vehicle drivers, mechanics, riggers and site supervisors.",
  },
  {
    slug: "contact",
    headline: "Let's Get Your Project Moving.",
    intro:
      "Share a few details and our team will respond with equipment options and rates within [24 hours]. For urgent requirements, call or WhatsApp us directly.",
    seoTitle: "Get a Quote for Equipment Hire | Arihan",
    seoDescription:
      "Share your requirement and get equipment options and rates within 24 hours. Call or WhatsApp for urgent needs.",
  },
];

export const whoWeAre =
  "Arihan Enterprises supplies heavy equipment and executes contract-based work for infrastructure, industrial and energy projects. We don't just rent machines — we take responsibility for getting the work done. Our fleet, operators and site supervisors plug into your project so you can focus on delivery, not on managing equipment.";

export const coreMessages = [
  { title: "Ready fleet, fast mobilisation", body: "Machines on site in [48–72 hours]." },
  { title: "Operated and maintained", body: "Every machine comes with a trained operator and service backup." },
  { title: "Flexible contracts", body: "Hourly, daily, monthly, or per-quantity work packages." },
  { title: "Proven with major names", body: "[Client names] across infrastructure, oil & gas and logistics." },
];

export const whyArihan = [
  { title: "Fast mobilisation", body: "Equipment on site within [48–72 hours] of order confirmation." },
  { title: "Well-maintained fleet", body: "Regularly serviced machines with documented service history." },
  { title: "One accountable partner", body: "Machine, operator, fuel management and supervision under one contract." },
  { title: "Transparent billing", body: "Daily log sheets signed on site; no hidden charges." },
  { title: "Safety first", body: "Trained crews, valid fitness certificates and insurance on every unit." },
];

export const services: Service[] = [
  {
    slug: "equipment-hire",
    title: "Heavy equipment hire",
    short: "Equipment Hire",
    summary:
      "Excavators, cranes, tippers, prime movers and support equipment on hourly, daily or monthly hire.",
    body: "Well-maintained earthmoving, lifting and haulage equipment available on short- and long-term hire. Every unit is inspected before dispatch and backed by our service team.",
    points: [
      "Hire periods: hourly, daily, monthly, or project duration",
      "Wet hire (with operator, fuel managed) or dry hire (machine only)",
      "Replacement unit if a machine is down beyond [24/48] hours",
    ],
  },
  {
    slug: "contract-work",
    title: "Project & contract-based work",
    short: "Contract Work Packages",
    summary:
      "Earthwork, material shifting, lifting and haulage executed on a per-quantity or lump-sum basis.",
    body: "We take on defined scopes of work and deliver against quantity, time and quality targets — so you pay for output, not idle hours.",
    points: [
      "Bulk earthwork: excavation, cutting, filling, grading",
      "Material handling and shifting: soil, aggregate, overburden, debris",
      "Lifting and erection support for plant, pipeline and structural work",
      "Site clearance, trenching and haul-road development",
      "Billing on per cubic metre, per tonne, per trip or lump-sum basis",
    ],
  },
  {
    slug: "operators-crew",
    title: "Operators & site crew",
    short: "Operators & Crew",
    summary: "Licensed, experienced operators and helpers supplied with every machine.",
    body: "Licensed operators with [X]+ years of machine-specific experience, supported by helpers, riggers and site supervisors. Crews follow your site's HSE rules and shift pattern.",
    points: [],
  },
  {
    slug: "maintenance",
    title: "Maintenance & breakdown support",
    short: "Maintenance & Breakdown Support",
    summary: "Preventive servicing and on-call mechanics to keep downtime low.",
    body: "On-site preventive maintenance, a mobile service van and trained mechanics keep our machines productive. Genuine spares, scheduled servicing and logged service records for every unit.",
    points: [],
  },
  {
    slug: "transport",
    title: "Heavy transport & logistics",
    short: "Heavy Transport & Logistics",
    summary: "Movement of machinery, ODC cargo and bulk material between sites.",
    body: "Tippers, trailers and prime movers for moving machinery, over-dimensional (ODC) cargo and bulk material between sites, yards and plants.",
    points: [],
  },
  {
    slug: "dedicated-fleet",
    title: "Fleet deployment for long-term projects",
    short: "Dedicated Fleet",
    summary: "A dedicated fleet with on-site supervision for projects running 6 months or more.",
    body: "For projects running 6 months or more, we set up a dedicated fleet with an on-site supervisor, a fuel and log management system, and weekly performance reports.",
    points: [],
  },
];

export const cranes: Crane[] = [
  {
    slug: "sany-stc-450",
    name: "Sany STC 450",
    kind: "truck",
    type: "Hydraulic truck crane",
    capacityTonnes: 45,
    regNo: "MH04KR0817",
    bestFor: "Quick-mobilising lifts, plant maintenance, material handling",
  },
  {
    slug: "sany-stc-800",
    name: "Sany STC 800",
    kind: "truck",
    type: "Hydraulic truck crane",
    capacityTonnes: 80,
    regNo: "MH46AB0191",
    bestFor: "Structural erection, equipment installation, heavier lifts",
  },
  {
    slug: "sany-scs1000a",
    name: "Sany SCS1000A",
    kind: "crawler",
    type: "Lattice-boom crawler crane",
    capacityTonnes: 100,
    regNo: "CC0100CF1758",
    bestFor: "Heavy lifts, long-duration project sites, soft or uneven ground",
  },
];

export const fleetNote =
  "Capacities are the manufacturer's maximum rated loads; actual capacity at site depends on radius, boom length and configuration. Detailed load charts available on request.";

export const hireTerms = [
  { term: "Minimum hire", detail: "[8 hours / 1 day / 1 month] depending on equipment" },
  { term: "Rates", detail: "Hourly, daily, monthly, or per-quantity — quoted per project" },
  { term: "Included", detail: "Operator, routine maintenance, breakdown support (wet hire)" },
  {
    term: "Client scope (typical)",
    detail: "Fuel [or fuel managed at actuals], site access, operator accommodation where applicable",
  },
  { term: "Mobilisation", detail: "Charged per trip or waived for long-term contracts" },
  {
    term: "Documentation",
    detail: "RC, insurance, fitness and PUC for every vehicle; load test certificates for cranes",
  },
];

export const industries: Industry[] = [
  {
    title: "Roads & highways",
    summary:
      "Earthwork, embankment, subgrade preparation and material haulage for NH, state highway and expressway packages.",
  },
  {
    title: "Oil & gas",
    summary:
      "Well-site preparation, pipeline trenching, lifting support and equipment movement for upstream and midstream operators.",
  },
  {
    title: "Power & energy",
    summary: "Crane and haulage support for thermal, solar, hydro and transmission projects.",
  },
  {
    title: "Railways & metro",
    summary: "Formation work, ballast and material movement, and lifting for station and bridge works.",
  },
  {
    title: "Industrial plants",
    summary: "Erection support, material shifting and site development for steel, cement and process plants.",
  },
  { title: "Mining & quarrying", summary: "Overburden removal, loading and haulage on contract." },
  { title: "Irrigation & water", summary: "Canal excavation, pipeline laying and reservoir earthwork." },
  { title: "Logistics & warehousing", summary: "Heavy cargo movement and yard handling." },
];

export const processSteps = [
  {
    icon: "enquiry",
    title: "Share your requirement",
    body: "Tell us the scope, site location, duration and timeline via form, call or WhatsApp.",
  },
  {
    icon: "assessment",
    title: "Site assessment & proposal",
    body: "Our team reviews the work (with a site visit if needed) and recommends the right equipment mix.",
  },
  {
    icon: "agreement",
    title: "Quote & agreement",
    body: "You receive a clear quote with rates, inclusions and terms. We sign a work order or hire agreement.",
  },
  {
    icon: "mobilise",
    title: "Mobilisation",
    body: "Machines, operators and a supervisor reach your site with all documents, typically within [48–72 hours].",
  },
  {
    icon: "report",
    title: "Execution & reporting",
    body: "Daily log sheets, weekly progress reports and monthly billing against signed records.",
  },
] as const;

export const contractModels = [
  { model: "Hourly / daily hire", billed: "Per machine-hour or machine-day", bestFor: "Short jobs, variable workloads" },
  {
    model: "Monthly hire",
    billed: "Fixed monthly rate + agreed working hours",
    bestFor: "Ongoing projects with steady demand",
  },
  {
    model: "Per-quantity contract",
    billed: "Per m³, tonne or trip",
    bestFor: "Earthwork and haulage with measurable output",
  },
  {
    model: "Lump-sum work package",
    billed: "Fixed price for a defined scope",
    bestFor: "Clearly scoped jobs with fixed deadlines",
  },
  {
    model: "Dedicated fleet",
    billed: "Monthly fleet fee + performance terms",
    bestFor: "Large projects running 6+ months",
  },
];

// Real case studies, client names and testimonials are added in the CMS once
// they are cleared for public use. Nothing unapproved is rendered.
export const projects: Project[] = [];
export const clients: Client[] = [];
export const testimonials: Testimonial[] = [];

export const about = {
  story: [
    "Arihan Enterprises was founded in [year] in [city] with [one/two] machines and a simple promise: show up on time and keep the work moving. Contractors kept calling us back, and the fleet grew with them.",
    "Today we operate [XX]+ units — excavators, cranes, tippers and prime movers — across [states/regions]. We work with EPC contractors, infrastructure developers, oil & gas operators and logistics companies on projects where delays cost money.",
  ],
  different:
    "Most rental companies hand over a machine and step away. Arihan takes on the work. Whether it's moving [X] lakh cubic metres of earth or lifting equipment at a plant, we plan the deployment, supply the crew and stay answerable for output.",
  mission:
    "To be the most dependable machinery and execution partner for India's infrastructure and industrial projects — measured by uptime, safety and on-time delivery.",
  vision:
    "To build a pan-India fleet and site-services network that project owners trust with their most critical work packages.",
  values: [
    { title: "Reliability", body: "We commit only what we can deliver, and deliver what we commit." },
    { title: "Safety", body: "No deadline is worth an accident." },
    { title: "Transparency", body: "Honest rates, signed log sheets, clear billing." },
    { title: "Ownership", body: "We treat your project milestones as our own." },
  ],
  leadership: [
    {
      name: "[Name]",
      role: "Founder & Managing Partner",
      bio: "[2–3 lines on experience, e.g., “15 years in heavy equipment operations across the Northeast and Eastern India.”]",
    },
    { name: "[Name]", role: "Head of Operations", bio: "[2–3 lines]" },
  ],
};

export const safety = {
  items: [
    { title: "Pre-deployment inspection", body: "Every machine is checked against a standard checklist before dispatch." },
    { title: "Trained operators", body: "Valid licences, machine-specific experience and site safety induction." },
    {
      title: "PPE on every site",
      body: "Helmets, safety shoes, high-visibility jackets and harnesses for lifting work.",
    },
    { title: "Crane safety", body: "Third-party load test certificates, trained riggers and signalmen." },
    { title: "Vehicle compliance", body: "Current RC, insurance, fitness, permits and PUC for every vehicle." },
    { title: "Workforce compliance", body: "EPF, ESIC and labour-law compliance for all crew." },
    {
      title: "Client HSE alignment",
      body: "We follow your site's permit-to-work, toolbox talk and incident reporting systems.",
    },
  ],
  documents: [
    "GST registration",
    "PAN",
    "Udyam certificate",
    "Insurance policies",
    "Equipment ownership records",
    "[ISO certification if held]",
  ],
};

export const careers = {
  why: [
    "Timely salary with EPF and ESIC benefits",
    "Well-maintained machines — less breakdown, more work",
    "Accommodation and food support at project sites [where applicable]",
    "Growth from operator to supervisor to site in-charge",
  ],
  roles: [
    { title: "Excavator operator", requirement: "Valid licence, [2]+ years on 20-tonne class machines" },
    { title: "Crane operator", requirement: "Crane licence, [3]+ years, lifting-plan knowledge" },
    { title: "Heavy vehicle driver", requirement: "HMV/HGV licence, [3]+ years on tippers or trailers" },
    { title: "Mechanic (HEMM)", requirement: "ITI/diploma, hydraulic and diesel-engine experience" },
    { title: "Rigger / signalman", requirement: "Rigging training and site experience" },
    { title: "Site supervisor", requirement: "[3]+ years managing equipment on project sites" },
  ] as JobRole[],
};

export const faqs: Faq[] = [
  {
    question: "Do you provide operators with the machines?",
    answer:
      "Yes. All wet-hire equipment comes with a trained, licensed operator. Dry hire (machine only) is available for select equipment on request.",
  },
  {
    question: "What is the minimum hire period?",
    answer:
      "It depends on the machine — typically [8 hours] for excavators and [1 day] for cranes. Monthly and project-duration rates are more economical.",
  },
  {
    question: "Who pays for fuel?",
    answer:
      "Usually the client supplies fuel or reimburses it at actuals. We can also quote fuel-inclusive rates.",
  },
  {
    question: "How quickly can you mobilise?",
    answer:
      "Most equipment reaches site within [48–72 hours] of confirmation, depending on location and availability.",
  },
  {
    question: "What happens if a machine breaks down?",
    answer:
      "Our mechanics attend within [X hours]. If repair takes longer than [24/48 hours], we replace the unit or stop billing for the downtime.",
  },
  {
    question: "Do you take full work packages, not just hire?",
    answer: "Yes. We execute earthwork, haulage and lifting scopes on per-quantity or lump-sum contracts.",
  },
  {
    question: "Which areas do you serve?",
    answer: "[List states/regions]. We take projects outside these areas for long-duration contracts.",
  },
  {
    question: "How is billing done?",
    answer:
      "Monthly (or as agreed), based on log sheets or measured quantities signed by your site engineer. GST invoices are issued for every bill.",
  },
  {
    question: "Are your machines insured?",
    answer:
      "Yes. Every machine and vehicle carries valid insurance, and cranes hold current load test certificates.",
  },
];

export const quoteOptions = {
  service: ["Equipment hire", "Contract work", "Operators", "Transport", "Other"],
  equipment: ["Excavator", "Crane", "Tipper", "Trailer", "Other"],
  duration: ["< 1 week", "1–4 weeks", "1–6 months", "6+ months"],
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Fleet" },
  { href: "/industries", label: "Industries" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/projects", label: "Projects" },
  { href: "/safety", label: "Safety" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
];

export const siteUrl = 'https://sitesbuilder-full-site.vercel.app';

export const whatsappText = encodeURIComponent('Hi Local Web Works, I want a free SitesBuilder preview. My business is:');
export const whatsappHref = `https://wa.me/6591616337?text=${whatsappText}`;
export const mailHref = 'mailto:contact@sitesbuilder.store?subject=SitesBuilder%20free%20preview&body=Hi%20Local%20Web%20Works%2C%0A%0AI%20want%20a%20free%20SitesBuilder%20preview.%0A%0ABusiness%20name%3A%0ACurrent%20website%3A%0AMain%20customer%20action%3A';

export const navItems = [
  { href: '/work/', label: 'Work' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/process/', label: 'Process' },
  { href: '/contact/', label: 'Contact' }
];

export const sectionAssets = {
  hero: '/assets/bg-hero-1.jpg',
  heroAlt: '/assets/bg-hero-3.jpg',
  proof: '/assets/bg-proof-2.jpg',
  proofAlt: '/assets/bg-proof-3.jpg',
  process: '/assets/bg-process-1.jpg',
  processAlt: '/assets/bg-process-3.jpg',
  conversion: '/assets/bg-conversion-4.jpg',
  conversionAlt: '/assets/bg-conversion-1.jpg',
  pricing: '/assets/bg-conversion-3.jpg',
  contact: '/assets/bg-proof-4.jpg'
};

export const proofTiles = [
  {
    id: 'left',
    label: 'Eraspace',
    title: 'Retail product discovery',
    body: 'Ecommerce and product-flow redesign proof. Open the live site.',
    image: '/assets/eraspace-live-hero.png',
    link: 'https://eraspace.sg/',
    accent: '#37D7FF'
  },
  {
    id: 'center',
    label: 'Your preview',
    title: 'First two sections',
    body: 'Hero and first proof section drafted before you commit.',
    image: '/assets/bg-process-3.jpg',
    link: '/free-preview/',
    accent: '#2FE6BF'
  },
  {
    id: 'right',
    label: 'Sarathy',
    title: 'Student finance MVP',
    body: 'Landing page and app flow shaped in four days. Open the live site.',
    image: '/assets/sarathy-live-hero.png',
    link: 'https://sarathyv2-web-production.up.railway.app/',
    accent: '#77F4FF'
  }
];

export const packages = [
  {
    name: 'Starter Website',
    price: 'From S$999',
    body: 'Focused landing page for one offer, with the free preview first.',
    href: '/free-preview/?package=starter'
  },
  {
    name: 'Business Website',
    price: 'From S$1,499',
    body: 'Multi-section site with proof, pricing clarity, and WhatsApp enquiry flow.',
    href: '/free-preview/?package=business'
  },
  {
    name: 'Custom Build',
    price: 'S$1,999+',
    body: 'Custom motion, richer proof systems, and more complex content structure.',
    href: '/free-preview/?package=custom'
  }
];

export const processSteps = [
  ['Send', 'Business name, current link, and the customer action you want.'],
  ['Preview', 'Local Web Works drafts the hero and first proof section.'],
  ['Approve', 'You review the direction before a paid full build starts.'],
  ['Build', 'The site is finished with pages, pricing, proof, and contact paths.']
];

export const routeMeta = {
  home: {
    title: 'SitesBuilder by Local Web Works | Preview first. Build after.',
    description: 'Preview-first websites for local businesses. Local Web Works drafts the first two landing-page sections before you commit.',
    path: '/'
  },
  work: {
    title: 'Work proof | SitesBuilder by Local Web Works',
    description: 'Live proof examples behind SitesBuilder: ecommerce product discovery, MVP landing work, and the preview-first process.',
    path: '/work/'
  },
  pricing: {
    title: 'Pricing | SitesBuilder by Local Web Works',
    description: 'Clear SitesBuilder website packages from S$999, with a free preview of the first two sections before you commit.',
    path: '/pricing/'
  },
  process: {
    title: 'Process | SitesBuilder by Local Web Works',
    description: 'How the SitesBuilder preview-first workflow moves from request to first two sections, approval, and full build.',
    path: '/process/'
  },
  contact: {
    title: 'Contact | SitesBuilder by Local Web Works',
    description: 'Contact Local Web Works to request a SitesBuilder free preview by WhatsApp or email.',
    path: '/contact/'
  },
  preview: {
    title: 'Request a free preview | SitesBuilder by Local Web Works',
    description: 'Send your business details and get a SitesBuilder preview direction before committing to a full website build.',
    path: '/free-preview/'
  }
};

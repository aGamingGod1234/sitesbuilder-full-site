export const whatsappText = encodeURIComponent('Hi Local Web Works, I want a free SitesBuilder preview. My business is:');
export const whatsappHref = `https://wa.me/6591616337?text=${whatsappText}`;
export const mailHref = 'mailto:contact@sitesbuilder.store?subject=SitesBuilder%20free%20preview&body=Hi%20Local%20Web%20Works%2C%0A%0AI%20want%20a%20free%20SitesBuilder%20preview.%0A%0ABusiness%20name%3A%0ACurrent%20website%3A%0AMain%20customer%20action%3A';

export const navItems = [
  { href: '/work/', label: 'Work' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/process/', label: 'Process' },
  { href: '/contact/', label: 'Contact' }
];

export const proofTiles = [
  {
    id: 'left',
    label: 'Eraspace',
    title: 'Retail product discovery',
    body: 'Heavy ecommerce redesign and product-flow work for Singapore tech retail.',
    asset: '/assets/proof-eraspace.svg',
    accent: '#37D7FF',
    link: 'https://eraspace.sg/'
  },
  {
    id: 'center',
    label: 'Your preview',
    title: 'First two sections',
    body: 'Hero and first proof section drafted before you commit.',
    asset: '/assets/proof-preview-flow.svg',
    accent: '#4D7CFF',
    link: '/process/#preview-flow'
  },
  {
    id: 'right',
    label: 'Sarathy',
    title: 'Student finance MVP',
    body: 'Landing page and app flow shaped in four days for a Singapore university-life finance product.',
    asset: '/assets/proof-sarathy.svg',
    accent: '#2FE6BF',
    link: 'https://sarathyv2-web-production.up.railway.app/'
  }
];


export const doneSites = [
  {
    name: 'Eraspace',
    url: 'https://eraspace.sg/',
    label: 'Open Eraspace live site'
  },
  {
    name: 'Sarathy',
    url: 'https://sarathyv2-web-production.up.railway.app/',
    label: 'Open Sarathy live site'
  }
];

export const packages = [
  {
    name: 'Starter Website',
    price: 'From S$999',
    body: 'Focused landing page for one clear offer, with the free preview first.',
    href: '/free-preview/?package=starter'
  },
  {
    name: 'Business Website',
    price: 'From S$1,499',
    body: 'Multi-section website with stronger proof, service clarity, and contact flow.',
    href: '/free-preview/?package=business'
  },
  {
    name: 'Custom Build',
    price: 'S$1,999+',
    body: 'Custom interactions, richer proof systems, and more complex content structure.',
    href: '/free-preview/?package=custom'
  }
];

export const routeMeta = {
  home: {
    title: 'SitesBuilder by Local Web Works | Preview first. Build after.',
    description: 'SitesBuilder drafts the first two landing-page sections before you commit, then Local Web Works finishes the full site after you approve the direction.',
    path: '/'
  },
  work: {
    title: 'Work proof | SitesBuilder by Local Web Works',
    description: 'See proof examples behind SitesBuilder: ecommerce product discovery, MVP landing work, and the preview-first process.',
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

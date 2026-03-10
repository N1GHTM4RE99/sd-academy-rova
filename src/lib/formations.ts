import { Formation } from './types';

export const formations: Formation[] = [
  // Brand Identity - 3 formations
  {
    id: 'brand-design-fundamentals',
    title: 'Brand Design Fundamentals',
    description: 'Learn the core principles of brand design and visual identity creation.',
    service: 'brand-identity',
    priority: 'urgent',
    level: 'Débutant',
    duration: '3-4h',
    modules: [
      { id: 'bdf-1', title: 'Introduction to Brand Identity', description: 'Understanding what makes a brand', duration: '30 min' },
      { id: 'bdf-2', title: 'Brand Architecture', description: 'How to structure your brand elements', duration: '45 min' },
      { id: 'bdf-3', title: 'Visual Identity Systems', description: 'Creating cohesive visual languages', duration: '1h' },
      { id: 'bdf-4', title: 'Brand Guidelines', description: 'Documenting your brand standards', duration: '45 min' },
    ],
  },
  {
    id: 'color-theory-branding',
    title: 'Color Theory for Branding',
    description: 'Master the psychology and application of colors in brand identity.',
    service: 'brand-identity',
    priority: 'urgent',
    level: 'Débutant',
    duration: '2-3h',
    modules: [
      { id: 'ctb-1', title: 'Color Psychology', description: 'How colors affect perception', duration: '30 min' },
      { id: 'ctb-2', title: 'Color Palettes', description: 'Creating harmonious color combinations', duration: '40 min' },
      { id: 'ctb-3', title: 'Color in Digital vs Print', description: 'Adapting colors across media', duration: '35 min' },
    ],
  },
  {
    id: 'typography-essentials',
    title: 'Typography Essentials',
    description: 'Learn to choose and pair fonts for maximum brand impact.',
    service: 'brand-identity',
    priority: 'urgent',
    level: 'Débutant',
    duration: '2-3h',
    modules: [
      { id: 'te-1', title: 'Type Anatomy', description: 'Understanding font terminology', duration: '25 min' },
      { id: 'te-2', title: 'Font Pairing', description: 'Combining typefaces effectively', duration: '40 min' },
      { id: 'te-3', title: 'Typography in Brand Systems', description: 'Using type to reinforce identity', duration: '35 min' },
    ],
  },

  // Content Creation - 2 formations
  {
    id: 'content-strategy-basics',
    title: 'Content Strategy Basics',
    description: 'Build a sustainable content strategy that drives engagement.',
    service: 'content-creation',
    priority: 'urgent',
    level: 'Débutant',
    duration: '3-4h',
    modules: [
      { id: 'csb-1', title: 'Content Audit', description: 'Evaluating your current content', duration: '30 min' },
      { id: 'csb-2', title: 'Audience Research', description: 'Understanding your content consumers', duration: '45 min' },
      { id: 'csb-3', title: 'Content Pillars', description: 'Defining core content themes', duration: '40 min' },
      { id: 'csb-4', title: 'Content Calendar', description: 'Planning and scheduling content', duration: '35 min' },
    ],
  },
  {
    id: 'video-editing-fundamentals',
    title: 'Video Editing Fundamentals',
    description: 'Create professional-quality video content for social media and marketing.',
    service: 'content-creation',
    priority: 'medium',
    level: 'Intermédiaire',
    duration: '4-5h',
    modules: [
      { id: 'vef-1', title: 'Video Editing Software', description: 'Tools and workflow setup', duration: '30 min' },
      { id: 'vef-2', title: 'Cutting and Transitions', description: 'Basic editing techniques', duration: '50 min' },
      { id: 'vef-3', title: 'Color Grading', description: 'Enhancing visual appeal', duration: '45 min' },
      { id: 'vef-4', title: 'Audio Syncing', description: 'Sound design basics', duration: '40 min' },
      { id: 'vef-5', title: 'Export and Optimization', description: 'Getting ready for platforms', duration: '30 min' },
    ],
  },

  // Funnel Systems - 6 formations
  {
    id: 'funnel-building-intro',
    title: 'Funnel Building Introduction',
    description: 'Understand conversion funnels and their role in digital marketing.',
    service: 'funnel-systems',
    priority: 'urgent',
    level: 'Débutant',
    duration: '3-4h',
    modules: [
      { id: 'fbi-1', title: 'What is a Funnel?', description: 'Understanding funnel anatomy', duration: '30 min' },
      { id: 'fbi-2', title: 'Funnel Stages', description: 'From awareness to conversion', duration: '45 min' },
      { id: 'fbi-3', title: 'Funnel Metrics', description: 'Key performance indicators', duration: '40 min' },
      { id: 'fbi-4', title: 'Funnel Tools', description: 'Software and platforms', duration: '35 min' },
    ],
  },
  {
    id: 'landing-page-optimization',
    title: 'Landing Page Optimization',
    description: 'Maximize conversion rates with proven landing page strategies.',
    service: 'funnel-systems',
    priority: 'urgent',
    level: 'Intermédiaire',
    duration: '3-4h',
    modules: [
      { id: 'lpo-1', title: 'Landing Page Anatomy', description: 'Essential elements of high-converting pages', duration: '35 min' },
      { id: 'lpo-2', title: 'Copywriting for LP', description: 'Persuasive writing techniques', duration: '45 min' },
      { id: 'lpo-3', title: 'Visual Hierarchy', description: 'Guiding visitor attention', duration: '40 min' },
      { id: 'lpo-4', title: 'A/B Testing Basics', description: 'Testing and optimizing', duration: '35 min' },
    ],
  },
  {
    id: 'copywriting-for-funnels',
    title: 'Copywriting for Funnels',
    description: 'Write compelling copy that converts at every funnel stage.',
    service: 'funnel-systems',
    priority: 'medium',
    level: 'Intermédiaire',
    duration: '3-4h',
    modules: [
      { id: 'cff-1', title: 'Hook, Story, Offer', description: 'The copywriting framework', duration: '40 min' },
      { id: 'cff-2', title: 'Headlines that Convert', description: 'Writing attention-grabbing titles', duration: '35 min' },
      { id: 'cff-3', title: 'Call-to-Action Mastery', description: 'Driving action with CTAs', duration: '30 min' },
      { id: 'cff-4', title: 'Email Copywriting', description: 'Nurturing leads through email', duration: '45 min' },
    ],
  },
  {
    id: 'conversion-optimization',
    title: 'Conversion Optimization',
    description: 'Turn more visitors into customers with CRO techniques.',
    service: 'funnel-systems',
    priority: 'medium',
    level: 'Avancé',
    duration: '4-5h',
    modules: [
      { id: 'co-1', title: 'CRO Framework', description: 'The conversion optimization process', duration: '40 min' },
      { id: 'co-2', title: 'User Behavior Analysis', description: 'Understanding visitor actions', duration: '45 min' },
      { id: 'co-3', title: 'Conversion Barriers', description: 'Identifying and removing obstacles', duration: '35 min' },
      { id: 'co-4', title: 'Social Proof', description: 'Building trust and credibility', duration: '40 min' },
      { id: 'co-5', title: 'Advanced CRO Tactics', description: 'Sophisticated optimization techniques', duration: '45 min' },
    ],
  },
  {
    id: 'ab-testing-mastery',
    title: 'A/B Testing Mastery',
    description: 'Master the science of split testing for continuous improvement.',
    service: 'funnel-systems',
    priority: 'medium',
    level: 'Avancé',
    duration: '3-4h',
    modules: [
      { id: 'abt-1', title: 'A/B Testing Fundamentals', description: 'Understanding statistical significance', duration: '35 min' },
      { id: 'abt-2', title: 'Test Planning', description: 'Prioritizing what to test', duration: '40 min' },
      { id: 'abt-3', title: 'Running Tests', description: 'Implementation and monitoring', duration: '45 min' },
      { id: 'abt-4', title: 'Analyzing Results', description: 'Interpreting test data', duration: '35 min' },
    ],
  },
  {
    id: 'advanced-funnel-architecture',
    title: 'Advanced Funnel Architecture',
    description: 'Build sophisticated multi-channel funnels for complex campaigns.',
    service: 'funnel-systems',
    priority: 'optional',
    level: 'Avancé',
    duration: '4-5h',
    modules: [
      { id: 'afa-1', title: 'Multi-Touch Funnels', description: 'Complex customer journeys', duration: '45 min' },
      { id: 'afa-2', title: 'Retention Funnels', description: 'Keeping customers engaged', duration: '40 min' },
      { id: 'afa-3', title: 'Upsell/Downsell Strategies', description: 'Maximizing customer value', duration: '45 min' },
      { id: 'afa-4', title: 'Funnel Automation', description: 'Scaling with automation', duration: '50 min' },
    ],
  },
];

export const serviceColors: Record<string, string> = {
  'brand-identity': '#FF2D78',
  'content-creation': '#00F5FF',
  'funnel-systems': '#10B981',
};

export const priorityColors: Record<string, string> = {
  urgent: '#FF2D78',
  medium: '#F59E0B',
  optional: '#10B981',
};

export const serviceNames: Record<string, string> = {
  'brand-identity': 'Brand Identity',
  'content-creation': 'Content Creation',
  'funnel-systems': 'Funnel Systems',
};

export function getFormationById(id: string): Formation | undefined {
  return formations.find(f => f.id === id);
}

export function getFormationsByService(service: string): Formation[] {
  return formations.filter(f => f.service === service);
}

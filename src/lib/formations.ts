import { Formation } from './types';

export const formations: Formation[] = [
  // SEO & Growth - 3 formations
  {
    id: 'seo-fundamentals',
    title: 'SEO Fundamentals',
    description: 'Comprendre les bases du référencement naturel',
    service: 'seo-and-growth',
    priority: 'high',
    level: 'Débutant',
    duration: '4-5h',
    modules: [
      { id: 'sf-1', title: 'Principes du SEO', description: 'Comprendre le référencement naturel', duration: '45 min' },
      { id: 'sf-2', title: 'Optimisation on-page', description: 'Optimiser les éléments internes', duration: '1h' },
      { id: 'sf-3', title: 'Structure du site', description: 'Architecture et navigation', duration: '1h' },
      { id: 'sf-4', title: 'SEO local', description: 'Référencement local', duration: '45 min' },
    ],
  },
  {
    id: 'keyword-research',
    title: 'Keyword Research Masterclass',
    description: 'Maîtriser la recherche de mots-clés',
    service: 'seo-and-growth',
    priority: 'high',
    level: 'Débutant',
    duration: '3-4h',
    modules: [
      { id: 'kr-1', title: 'Outils de recherche', description: 'Utiliser les outils SEO', duration: '45 min' },
      { id: 'kr-2', title: 'Analyse de concurrence', description: 'Étudier les concurrents', duration: '45 min' },
      { id: 'kr-3', title: 'Long-tail keywords', description: 'Mots-clés longue traîne', duration: '45 min' },
      { id: 'kr-4', title: 'Intent de recherche', description: 'Comprendre lintention utilisateur', duration: '45 min' },
    ],
  },
  {
    id: 'google-search-console',
    title: 'Google Search Console - Les fondamentaux',
    description: 'Utiliser les outils de recherche Google',
    service: 'seo-and-growth',
    priority: 'high',
    level: 'Débutant',
    duration: '2-3h',
    modules: [
      { id: 'gsc-1', title: 'Configuration', description: 'Configurer GSC', duration: '25 min' },
      { id: 'gsc-2', title: 'Analyse des performances', description: 'Lire les données', duration: '35 min' },
      { id: 'gsc-3', title: 'Indexation', description: 'Gérer lindexation', duration: '30 min' },
      { id: 'gsc-4', title: 'Améliorations', description: 'Corriger les erreurs', duration: '30 min' },
    ],
  },

  // Paid Campaigns - 4 formations
  {
    id: 'google-ads-introduction',
    title: 'Google Ads - Introduction',
    description: 'Lancer ses premières campagnes Google',
    service: 'paid-campaigns',
    priority: 'high',
    level: 'Débutant',
    duration: '4-5h',
    modules: [
      { id: 'gai-1', title: 'Interface Google Ads', description: 'Naviguer dans linterface', duration: '45 min' },
      { id: 'gai-2', title: 'Types de campagnes', description: 'Choisir le bon type', duration: '1h' },
      { id: 'gai-3', title: 'Mots-clés & enchères', description: 'Stratégie denchères', duration: '1h' },
      { id: 'gai-4', title: 'Rédaction des annonces', description: 'Créer des annonces efficaces', duration: '1h' },
    ],
  },
  {
    id: 'meta-ads-manager',
    title: 'Meta Ads Manager - Les bases',
    description: 'Créer et gérer des campagnes Facebook/Instagram',
    service: 'paid-campaigns',
    priority: 'high',
    level: 'Débutant',
    duration: '4-5h',
    modules: [
      { id: 'ma-1', title: 'Structure des campagnes', description: 'Organiser ses campagnes', duration: '45 min' },
      { id: 'ma-2', title: 'Audiences', description: 'Créer des audiences', duration: '1h' },
      { id: 'ma-3', title: 'Formats publicitaires', description: 'Choisir les formats', duration: '1h' },
      { id: 'ma-4', title: 'Budget & planification', description: 'Gérer le budget', duration: '45 min' },
    ],
  },
  {
    id: 'technical-seo',
    title: 'Technical SEO',
    description: 'Optimiser le SEO technique',
    service: 'seo-and-growth',
    priority: 'medium',
    level: 'Intermédiaire',
    duration: '5-6h',
    modules: [
      { id: 'tseo-1', title: 'Vitesse de chargement', description: 'Optimiser la vitesse', duration: '1h' },
      { id: 'tseo-2', title: 'Mobile-first', description: 'Approche mobile-first', duration: '1h' },
      { id: 'tseo-3', title: 'Schema markup', description: 'Utiliser le schema.org', duration: '1h' },
      { id: 'tseo-4', title: 'Core Web Vitals', description: 'Optimiser les métriques', duration: '1h' },
    ],
  },
  {
    id: 'google-analytics-4',
    title: 'Google Analytics 4',
    description: 'Analyser les performances des campagnes',
    service: 'paid-campaigns',
    priority: 'medium',
    level: 'Intermédiaire',
    duration: '4-5h',
    modules: [
      { id: 'ga4-1', title: 'Configuration GA4', description: 'Paramétrer GA4', duration: '45 min' },
      { id: 'ga4-2', title: 'Rapports', description: 'Lire les rapports', duration: '1h' },
      { id: 'ga4-3', title: 'Événements & conversions', description: 'Tracker les conversions', duration: '1h' },
      { id: 'ga4-4', title: 'Attribution', description: 'Modèles dallocation', duration: '45 min' },
    ],
  },

  // LLC Formation - 1 formation
  {
    id: 'llc-formation-guide',
    title: 'LLC Formation - Guide complet',
    description: 'Comprendre la création de LLC aux US',
    service: 'llc-formation-and-structuring',
    priority: 'medium',
    level: 'Avancé',
    duration: '3-4h',
    modules: [
      { id: 'llc-1', title: 'Types de structures', description: 'Choisir la structure', duration: '30 min' },
      { id: 'llc-2', title: 'Choix de lÉtat', description: 'Sélectionner le bon État', duration: '45 min' },
      { id: 'llc-3', title: 'Documents requis', description: 'Préparer les documents', duration: '45 min' },
      { id: 'llc-4', title: 'Compliance annuelle', description: 'Respecter les obligations', duration: '30 min' },
    ],
  },
];

export const serviceColors: Record<string, string> = {
  'seo-and-growth': '#10B981',
  'paid-campaigns': '#F59E0B',
  'llc-formation-and-structuring': '#8B5CF6',
};

export const priorityColors: Record<string, string> = {
  high: '#FF2D78',
  medium: '#F59E0B',
  low: '#10B981',
};

export const serviceNames: Record<string, string> = {
  'seo-and-growth': 'SEO & Growth',
  'paid-campaigns': 'Paid Campaigns',
  'llc-formation-and-structuring': 'LLC Formation',
};

export function getFormationById(id: string): Formation | undefined {
  return formations.find(f => f.id === id);
}

export function getFormationsByService(service: string): Formation[] {
  return formations.filter(f => f.service === service);
}

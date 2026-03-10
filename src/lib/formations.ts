import { Formation } from './types';

export const formations: Formation[] = [
  // Social Media Setup - 4 formations
  {
    id: 'instagram-tiktok-marketing',
    title: 'Instagram & TikTok Marketing Fundamentals',
    description: 'Maîtriser les bases du marketing sur les plateformes sociales principales',
    service: 'social-media-setup',
    priority: 'high',
    level: 'Débutant',
    duration: '4-6h',
    modules: [
      { id: 'itm-1', title: 'Algorithmes & Tendances', description: 'Comprendre le fonctionnement des algorithmes', duration: '45 min' },
      { id: 'itm-2', title: 'Création de contenu', description: 'Produire du contenu engageant', duration: '1h' },
      { id: 'itm-3', title: 'Stratégie de croissance', description: 'Techniques pour grow son audience', duration: '1h' },
      { id: 'itm-4', title: 'Analytics de base', description: 'Mesurer ses performances', duration: '45 min' },
    ],
  },
  {
    id: 'facebook-business-suite',
    title: 'Facebook Business Suite - Les fondamentaux',
    description: 'Configurer et gérer les outils professionnels Meta',
    service: 'social-media-setup',
    priority: 'high',
    level: 'Débutant',
    duration: '3-4h',
    modules: [
      { id: 'fbs-1', title: 'Configuration du compte', description: 'Paramétrer son compte professionnel', duration: '30 min' },
      { id: 'fbs-2', title: 'Gestion des pages', description: 'Administrer ses pages Facebook', duration: '45 min' },
      { id: 'fbs-3', title: 'Publicités de base', description: 'Créer ses premières campagnes', duration: '1h' },
      { id: 'fbs-4', title: 'Analytics', description: 'Analyser les performances', duration: '45 min' },
    ],
  },
  {
    id: 'x-twitter-pro',
    title: 'X (Twitter) pour professionnels',
    description: 'Comprendre les spécificités de X pour le marketing',
    service: 'social-media-setup',
    priority: 'medium',
    level: 'Intermédiaire',
    duration: '2-3h',
    modules: [
      { id: 'xtp-1', title: 'Optimisation du profil', description: 'Créer un profil professionnel', duration: '25 min' },
      { id: 'xtp-2', title: 'Stratégie de contenu', description: 'Développer une stratégie Twitter', duration: '35 min' },
      { id: 'xtp-3', title: 'Hashtags & Tendances', description: 'Utiliser les hashtags efficacement', duration: '30 min' },
      { id: 'xtp-4', title: 'Outils pro', description: 'Maîtriser les outils analytiques', duration: '30 min' },
    ],
  },
  {
    id: 'bluesky-threads',
    title: 'Bluesky & Threads Mastery',
    description: 'Maîtriser les nouvelles plateformes sociales émergentes',
    service: 'social-media-setup',
    priority: 'medium',
    level: 'Débutant',
    duration: '2-3h',
    modules: [
      { id: 'bmt-1', title: 'Introduction aux plateformes', description: 'Comprendre Bluesky et Threads', duration: '25 min' },
      { id: 'bmt-2', title: 'Stratégie de contenu', description: 'Créer du contenu adapté', duration: '35 min' },
      { id: 'bmt-3', title: 'Cross-posting', description: 'Gérer plusieurs plateformes', duration: '30 min' },
      { id: 'bmt-4', title: 'Croissance organique', description: 'Techniques de croissance', duration: '30 min' },
    ],
  },

  // Account Protection - 1 formation
  {
    id: 'account-security-protection',
    title: 'Account Security & Protection',
    description: 'Sécuriser les comptes contre les piratages',
    service: 'account-protection',
    priority: 'high',
    level: 'Avancé',
    duration: '5-6h',
    modules: [
      { id: 'asp-1', title: 'Audit de sécurité', description: 'Évaluer les vulnérabilités', duration: '45 min' },
      { id: 'asp-2', title: '2FA & Authentification', description: 'Mettre en place l\'authentification forte', duration: '1h' },
      { id: 'asp-3', title: 'Détection des menaces', description: 'Identifier les tentatives de piratage', duration: '1h' },
      { id: 'asp-4', title: 'Procédures de récupération', description: 'Récupérer un compte compromis', duration: '1h' },
    ],
  },

  // Telegram Management - 3 formations
  {
    id: 'telegram-bot-api',
    title: 'Telegram Bot API',
    description: 'Gérer et automatiser les channels Telegram',
    service: 'telegram-management',
    priority: 'medium',
    level: 'Intermédiaire',
    duration: '6-8h',
    modules: [
      { id: 'tba-1', title: 'Introduction aux Bots', description: 'Comprendre les bots Telegram', duration: '45 min' },
      { id: 'tba-2', title: 'API Telegram', description: 'Maîtriser l\'API Bot', duration: '1h30' },
      { id: 'tba-3', title: 'Automatisation', description: 'Créer des automatisations', duration: '1h30' },
      { id: 'tba-4', title: 'Déploiement', description: 'Mettre en production', duration: '1h' },
    ],
  },
  {
    id: 'community-management-avance',
    title: 'Community Management Avancé',
    description: 'Engager et animer une communauté',
    service: 'telegram-management',
    priority: 'medium',
    level: 'Avancé',
    duration: '4-5h',
    modules: [
      { id: 'cma-1', title: 'Psychologie communautaire', description: 'Comprendre les dynamiques de groupe', duration: '45 min' },
      { id: 'cma-2', title: 'Gestion des conflits', description: 'Modérer efficacement', duration: '1h' },
      { id: 'cma-3', title: 'Engagement & UGC', description: 'Favoriser la participation', duration: '1h' },
      { id: 'cma-4', title: 'KPIs & Reporting', description: 'Mesurer la performance', duration: '45 min' },
    ],
  },
  {
    id: 'meta-business-suite-pro',
    title: 'Meta Business Suite Pro',
    description: 'Maîtriser les outils professionnels Meta avancés',
    service: 'social-media-setup',
    priority: 'medium',
    level: 'Avancé',
    duration: '4-5h',
    modules: [
      { id: 'mbp-1', title: 'Attribution', description: 'Comprendre les modèles d\'attribution', duration: '45 min' },
      { id: 'mbp-2', title: 'Pixel & Conversions', description: 'Paramétrer le suivi', duration: '1h' },
      { id: 'mbp-3', title: 'Audiences avancées', description: 'Créer des audiences ciblées', duration: '1h' },
      { id: 'mbp-4', title: 'Optimisation campaigns', description: 'Optimiser ses campagnes', duration: '1h' },
    ],
  },
];

export const serviceColors: Record<string, string> = {
  'social-media-setup': '#1DA1F2',
  'account-protection': '#FF2D78',
  'telegram-management': '#0088CC',
};

export const priorityColors: Record<string, string> = {
  high: '#FF2D78',
  medium: '#F59E0B',
  low: '#10B981',
};

export const serviceNames: Record<string, string> = {
  'social-media-setup': 'Social Media Setup',
  'account-protection': 'Account Protection',
  'telegram-management': 'Telegram Management',
};

export function getFormationById(id: string): Formation | undefined {
  return formations.find(f => f.id === id);
}

export function getFormationsByService(service: string): Formation[] {
  return formations.filter(f => f.service === service);
}

export type ServiceType = 'brand-identity' | 'content-creation' | 'funnel-systems';
export type Priority = 'urgent' | 'medium' | 'optional';
export type Level = 'Débutant' | 'Intermédiaire' | 'Avancé';
export type ModuleStatus = 'locked' | 'in-progress' | 'completed';

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
}

export interface Formation {
  id: string;
  title: string;
  description: string;
  service: ServiceType;
  priority: Priority;
  level: Level;
  duration: string;
  modules: Module[];
}

export interface ModuleProgress {
  completed: boolean;
  score: number;
  attempts: number;
}

export interface FormationProgress {
  [moduleIndex: string]: ModuleProgress;
}

export interface AllProgress {
  [formationId: string]: FormationProgress;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  score: number;
  grade: 'Expert' | 'Excellent' | 'Validé' | 'À revoir' | 'Insuffisant';
  strengths: string[];
  weaknesses: string[];
  tips: string[];
  questionAnalysis: {
    question: string;
    userAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ProfessorRequest {
  messages: ChatMessage[];
  useWebSearch: boolean;
  systemPrompt: string;
  context?: {
    formationId?: string;
    moduleIndex?: number;
    action?: 'lesson' | 'quiz' | 'feedback';
  };
}

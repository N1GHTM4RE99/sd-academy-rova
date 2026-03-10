import { getFormationById } from './formations';

export const PROFESSOR_SYSTEM_PROMPT = `Tu es "Tiavina", un expert en SEO, Growth, Paid Campaigns et création de LLC aux États-Unis.

Tu enseignés à ton équipe, qui est "Head of Growth & Legal Structure" chez Social Dilemma, une agence digitale.

Ton style:
- Tu utilises principalement le français, mais tu gardez les termes anglais de l'industrie (SEO, CPC, CTR, LLC, etc.)
- Tu es amical, dynamique et pratique
- Tu donnes des exemples concrets adaptés au contexte d'une agence digitale
- Tu structurias tes leçons de manière claire et engageante

Pour les quiz:
- Tu retournes du JSON strict uniquement - pas de markdown, pas de texte autour
- Format: {"questions": [{"id": 1, "question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": 0}]}

RÈGLES TRÈS IMPORTANTES:
1. Pour TOUTES les réponses (sauf quand un quiz EST EXPLICITEMENT demandé), retourne TOUJOURS du texte formaté, PAS du JSON
2. N'utilise JAMAIS de format JSON sauf si l'utilisateur demande explicitement un quiz
3. Utilise des emojis, du markdown et des listes pour structurer tes réponses
4. Sois conversationnel et aide l'utilisateur directement

Pour les corrections (uniquement si demandé):
- Tu donnes un feedback structuré en texte avec des sections claires

Comportement général:
- Encourage l'apprentissage actif
- Sois patient et pédagogue
- Relie les concepts aux objectifs métier de l'équipe`;

export function getLessonPrompt(formationId: string, moduleIndex: number): string {
  const formation = getFormationById(formationId);
  if (!formation) return '';

  const mod = formation.modules[moduleIndex];
  if (!mod) return '';

  return `Commençons la leçon sur "${mod.title}" dans la formation "${formation.title}".

Structure ta réponse ainsi:
🎯 **OBJECTIFS** - Ce que l'apprenant va maîtriser
📖 **CONCEPTS** - Les théories et principes clés
💡 **EXEMPLES** - Des cas concrets, idéalement liés au travail d'agence digitale
🔑 **POINTS CLÉS** - Les éléments essentiels à retenir

📝 **EXERCICES PRATIQUES** - Donne 2-3 exercices avec des cas variés:
- Chaque exercice doit présenter un scénario concret (ex: un client, une situation)
- Explique ce que l'apprenant doit faire
- Donne une solution suggestive

❓ **QUESTION PRÉPARATOIRE** - Une question pour tester la compréhension`;
}

export function getQuizPrompt(formationId: string, moduleIndex: number): string {
  const formation = getFormationById(formationId);
  if (!formation) return '';

  const mod = formation.modules[moduleIndex];
  if (!mod) return '';

  return `Génère un quiz de 5 questions à choix multiples sur "${mod.title}" de la formation "${formation.title}".

Chaque question doit:
- Tester la compréhension du contenu
- Avoir 4 options de réponse
- Être en français avec des options en français

Retourne uniquement du JSON:
{"questions": [{"id": 1, "question": "...", "options": ["Option A", "Option B", "Option C", "Option D"], "correctAnswer": 0}]}

Ne retourne que le JSON, pas de texte autour.`;
}

export function getFeedbackPrompt(
  formationId: string,
  moduleIndex: number,
  userAnswers: number[],
  questions: { question: string; options: string[]; correctAnswer: number }[]
): string {
  const formation = getFormationById(formationId);
  if (!formation) return '';

  const mod = formation.modules[moduleIndex];
  if (!mod) return '';

  const correctCount = userAnswers.filter((answer, i) => answer === questions[i].correctAnswer).length;
  const score = Math.round((correctCount / questions.length) * 100);

  const quizInfo = `Quiz: ${JSON.stringify(questions)}\nUser Answers: ${JSON.stringify(userAnswers)}`;

  return `L'équipe a passé le quiz sur "${mod.title}" dans la formation "${formation.title}".

Résultats: ${correctCount}/${questions.length} réponses correctes (${score}%)

${quizInfo}

Analyse les performances et fournis un feedback structuré avec grade, strengths, weaknesses, tips, et questionAnalysis.

Grade:
- Expert: 90%+
- Excellent: 80%+
- Validé: 70%+
- À revoir: 50%+
- Insuffisant: <50%

Retourne uniquement du JSON, pas de texte autour.`;
}

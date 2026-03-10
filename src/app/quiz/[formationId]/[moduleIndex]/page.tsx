'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import TopBar from '@/components/TopBar';
import { getFormationById, serviceColors } from '@/lib/formations';
import { PROFESSOR_SYSTEM_PROMPT, getQuizPrompt } from '@/lib/professor';
import { QuizQuestion } from '@/lib/types';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const formationId = params.formationId as string;
  const moduleIndex = parseInt(params.moduleIndex as string);
  const formation = getFormationById(formationId);
  const mod = formation?.modules[moduleIndex];

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate quiz on load
  useEffect(() => {
    if (formation && module) {
      generateQuiz();
    }
  }, [formation, module]);

  const generateQuiz = async () => {
    setIsLoading(true);
    setError(null);

    const prompt = getQuizPrompt(formationId, moduleIndex);

    try {
      const response = await fetch('/api/professor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          useWebSearch: false,
          systemPrompt: PROFESSOR_SYSTEM_PROMPT,
        }),
      });

      const data = await response.json();

      // Parse JSON response
      try {
        const parsed = JSON.parse(data.content);
        if (parsed.questions && Array.isArray(parsed.questions)) {
          setQuestions(parsed.questions);
        } else {
          // Use fallback questions
          setQuestions(getFallbackQuestions());
        }
      } catch {
        // Use fallback questions if parsing fails
        setQuestions(getFallbackQuestions());
      }
    } catch (err) {
      console.error('Error generating quiz:', err);
      setError('Erreur lors de la génération du quiz');
      setQuestions(getFallbackQuestions());
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackQuestions = (): QuizQuestion[] => {
    if (!module) return [];

    return [
      {
        id: 1,
        question: `Quel est le concept principal de "${mod?.title}" ?`,
        options: [
          'La théorie fondamentale du domaine',
          'Les bases pratiques et applicables',
          'L\'histoire et l\'évolution',
          'Les tendances futures',
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: 'Quel est un élément clé mentionné dans ce module ?',
        options: [
          'La stratégie de mise en œuvre',
          'Les outils recommandés',
          'Les meilleures pratiques',
          'Toutes ces réponses',
        ],
        correctAnswer: 3,
      },
      {
        id: 3,
        question: 'Comment appliquer ce学到 dans un contexte d\'agence ?',
        options: [
          'En suivant les méthodes traditionnelles',
          'En adaptant aux besoins clients',
          'En utilisant uniquement les outils gratuits',
          'En évitant les nouvelles technologies',
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'Quel est l\'objectif principal de ce module ?',
        options: [
          'Maîtriser les fondamentaux',
          'Préparer des案例 complexes',
          'Développer une expertise pointue',
          'Créer sa propre méthodologie',
        ],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: 'Quelle est la meilleur façon de valider ses acquis ?',
        options: [
          'Lire davantage de théorie',
          'Passer le quiz de validation',
          'Regarder des tutoriels vidéo',
          'Demander à un коллега',
        ],
        correctAnswer: 1,
      },
    ];
  };

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const canSubmit = questions.length > 0 && Object.keys(answers).length === questions.length;

  const handleSubmit = () => {
    if (!canSubmit) return;

    // Store answers in sessionStorage for results page
    const answersArray = questions.map((q) => answers[q.id] ?? 0);
    sessionStorage.setItem('quiz-answers', JSON.stringify(answersArray));
    sessionStorage.setItem('quiz-questions', JSON.stringify(questions));

    router.push(`/results/${formationId}/${moduleIndex}`);
  };

  if (!formation || !mod) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold font-syne text-white">Module non trouvé</h1>
            <Link href="/" className="text-brand-identity hover:underline mt-4 inline-block">
              Retour au dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      <main className="pt-20 pb-12 px-4 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/lesson/${formationId}/${moduleIndex}`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour à la leçon
          </Link>
          <h1 className="text-3xl font-bold font-syne text-white mb-2">
            Quiz: {mod?.title}
          </h1>
          <p className="text-gray-400">{formation.title}</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Progression</span>
            <span className="text-white font-medium">
              {Object.keys(answers).length} / {questions.length} répondues
            </span>
          </div>
          <div className="h-2 bg-card-bg rounded-full overflow-hidden">
            <motion.div
              className="h-full"
              style={{ backgroundColor: serviceColors[formation.service] }}
              initial={{ width: 0 }}
              animate={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="card p-12 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-brand-identity border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-gray-400">Génération du quiz...</p>
          </div>
        ) : error ? (
          <div className="card p-8 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={generateQuiz}
              className="btn-primary bg-brand-identity text-white"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <>
            {/* Questions */}
            <div className="space-y-6">
              {questions.map((question, qIndex) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: qIndex * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: serviceColors[formation.service] }}
                    >
                      {qIndex + 1}
                    </div>
                    <h3 className="text-lg font-medium text-white pt-1">
                      {question.question}
                    </h3>
                  </div>

                  <div className="space-y-2 ml-12">
                    {question.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswer(question.id, oIndex)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          answers[question.id] === oIndex
                            ? 'border-brand-identity bg-brand-identity/10 text-white'
                            : 'border-card-border text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        <span className="font-medium mr-2">{String.fromCharCode(65 + oIndex)}.</span>
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8"
            >
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                  canSubmit
                    ? 'bg-brand-identity text-white hover:bg-brand-identity/80'
                    : 'bg-card-bg text-gray-500 cursor-not-allowed'
                }`}
              >
                {canSubmit
                  ? 'Soumettre mes réponses'
                  : `Répondez à toutes les questions (${Object.keys(answers).length}/${questions.length})`}
              </button>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
}

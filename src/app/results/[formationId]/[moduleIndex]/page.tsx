'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import TopBar from '@/components/TopBar';
import { useProgress } from '@/hooks/useProgress';
import { getFormationById, serviceColors } from '@/lib/formations';
import { PROFESSOR_SYSTEM_PROMPT, getFeedbackPrompt } from '@/lib/professor';
import { QuizQuestion, QuizResult } from '@/lib/types';

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const formationId = params.formationId as string;
  const moduleIndex = parseInt(params.moduleIndex as string);
  const formation = getFormationById(formationId);
  const mod = formation?.modules[moduleIndex];

  const { saveModuleProgress, isModuleUnlocked } = useProgress();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load answers from sessionStorage
    const storedAnswers = sessionStorage.getItem('quiz-answers');
    const storedQuestions = sessionStorage.getItem('quiz-questions');

    if (storedAnswers && storedQuestions) {
      setAnswers(JSON.parse(storedAnswers));
      setQuestions(JSON.parse(storedQuestions));
    } else {
      // Redirect back to quiz if no data
      router.push(`/quiz/${formationId}/${moduleIndex}`);
    }
  }, [formationId, moduleIndex, router]);

  // Calculate and save results when data is loaded
  useEffect(() => {
    if (questions.length > 0 && answers.length > 0 && !saved) {
      calculateResults();
    }
  }, [questions, answers, saved]);

  const calculateResults = async () => {
    setIsLoading(true);

    const correctCount = answers.filter((answer, i) => answer === questions[i].correctAnswer).length;
    const score = Math.round((correctCount / questions.length) * 100);

    let grade: QuizResult['grade'];
    if (score >= 90) grade = 'Expert';
    else if (score >= 80) grade = 'Excellent';
    else if (score >= 70) grade = 'Validé';
    else if (score >= 50) grade = 'À revoir';
    else grade = 'Insuffisant';

    // Try to get AI feedback
    try {
      const prompt = getFeedbackPrompt(formationId, moduleIndex, answers, questions);

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

      try {
        const parsedFeedback = JSON.parse(data.content);
        setResult({
          score,
          grade: parsedFeedback.grade || grade,
          strengths: parsedFeedback.strengths || [],
          weaknesses: parsedFeedback.weaknesses || [],
          tips: parsedFeedback.tips || [],
          questionAnalysis: parsedFeedback.questionAnalysis || questions.map((q, i) => ({
            question: q.question,
            userAnswer: answers[i],
            correctAnswer: q.correctAnswer,
            isCorrect: answers[i] === q.correctAnswer,
            explanation: answers[i] === q.correctAnswer ? 'Correct !' : 'Incorrect',
          })),
        });
      } catch {
        // Use fallback result
        setResult({
          score,
          grade,
          strengths: ['Bonne participation au quiz'],
          weaknesses: [' Algunos puntos necesitan plus de révision'],
          tips: ['Revois la leçon et réessaye'],
          questionAnalysis: questions.map((q, i) => ({
            question: q.question,
            userAnswer: answers[i],
            correctAnswer: q.correctAnswer,
            isCorrect: answers[i] === q.correctAnswer,
            explanation: answers[i] === q.correctAnswer ? 'Correct !' : `La bonne réponse était: ${q.options[q.correctAnswer]}`,
          })),
        });
      }
    } catch (err) {
      console.error('Error getting feedback:', err);
      // Use fallback result
      setResult({
        score,
        grade,
        strengths: ['Bonne participation au quiz'],
        weaknesses: ['Certains points nécessitent plus de révision'],
        tips: ['Revois la leçon et réessaye'],
        questionAnalysis: questions.map((q, i) => ({
          question: q.question,
          userAnswer: answers[i],
          correctAnswer: q.correctAnswer,
          isCorrect: answers[i] === q.correctAnswer,
          explanation: answers[i] === q.correctAnswer ? 'Correct !' : `La bonne réponse était: ${q.options[q.correctAnswer]}`,
        })),
      });
    }

    // Save progress to localStorage
    const isPassed = score >= 70;
    saveModuleProgress(formationId, moduleIndex, {
      completed: isPassed,
      score: Math.max(score, result?.score || 0),
      attempts: 1,
    });
    setSaved(true);
    setIsLoading(false);
  };

  const getGradeColor = (grade: QuizResult['grade']) => {
    switch (grade) {
      case 'Expert':
        return '#10B981';
      case 'Excellent':
        return '#00F5FF';
      case 'Validé':
        return '#F59E0B';
      case 'À revoir':
        return '#FF6B6B';
      default:
        return '#FF2D78';
    }
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

  const isPassed = result ? result.score >= 70 : false;
  const nextModuleIndex = moduleIndex + 1;
  const hasNextModule = formation.modules.length > nextModuleIndex;
  const nextModuleUnlocked = hasNextModule && isModuleUnlocked(formationId, nextModuleIndex);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      <main className="pt-20 pb-12 px-4 max-w-4xl mx-auto">
        {isLoading || !result ? (
          <div className="card p-12 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-brand-identity border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-gray-400">Calcul de vos résultats...</p>
          </div>
        ) : (
          <>
            {/* Score Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-8 text-center mb-8"
            >
              <div
                className="text-7xl font-bold font-syne mb-4"
                style={{ color: getGradeColor(result.grade) }}
              >
                {result.score}%
              </div>
              <div
                className="text-2xl font-bold font-syne mb-2"
                style={{ color: getGradeColor(result.grade) }}
              >
                {result.grade}
              </div>
              <p className="text-gray-400">
                {isPassed
                  ? 'Félicitations ! Tu as validé ce module.'
                  : 'Tu dois obtenir au moins 70% pour valider ce module.'}
              </p>
            </motion.div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-6"
              >
                <h3 className="text-lg font-bold font-syne text-green-400 mb-4">✓ Points forts</h3>
                <ul className="space-y-2">
                  {result.strengths.map((strength, i) => (
                    <li key={i} className="text-gray-300 text-sm">• {strength}</li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="card p-6"
              >
                <h3 className="text-lg font-bold font-syne text-yellow-400 mb-4">⚠ Points à améliorer</h3>
                <ul className="space-y-2">
                  {result.weaknesses.map((weakness, i) => (
                    <li key={i} className="text-gray-300 text-sm">• {weakness}</li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Tips */}
            {result.tips.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card p-6 mb-8"
              >
                <h3 className="text-lg font-bold font-syne text-brand-identity mb-4">💡 Conseils personnalisés</h3>
                <ul className="space-y-2">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="text-gray-300 text-sm">• {tip}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Question Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-xl font-bold font-syne text-white mb-4">Analyse détaillée</h3>
              <div className="space-y-4">
                {result.questionAnalysis.map((qa, i) => (
                  <div
                    key={i}
                    className={`card p-4 border-l-4 ${
                      qa.isCorrect ? 'border-l-green-500' : 'border-l-red-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          qa.isCorrect ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                        }`}
                      >
                        {qa.isCorrect ? '✓' : '✗'}
                      </div>
                      <div>
                        <p className="text-white font-medium mb-2">{qa.question}</p>
                        <p className="text-sm text-gray-400">
                          Ta réponse: <span className={qa.isCorrect ? 'text-green-400' : 'text-red-400'}>
                            {questions[i]?.options[qa.userAnswer] || 'Non réponduue'}
                          </span>
                        </p>
                        {!qa.isCorrect && (
                          <p className="text-sm text-gray-500">
                            Bonne réponse: {questions[i]?.options[qa.correctAnswer]}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">{qa.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {isPassed && hasNextModule && nextModuleUnlocked ? (
                <Link
                  href={`/lesson/${formationId}/${nextModuleIndex}`}
                  className="flex-1 btn-primary text-center"
                  style={{
                    backgroundColor: serviceColors[formation.service],
                    color: formation.service === 'brand-identity' ? 'white' : 'black',
                  }}
                >
                  Module suivant →
                </Link>
              ) : (
                <Link
                  href={`/lesson/${formationId}/${moduleIndex}`}
                  className="flex-1 btn-primary text-center bg-brand-identity text-white"
                >
                  Revoir la leçon
                </Link>
              )}

              <Link
                href={`/formation/${formationId}`}
                className="flex-1 btn-primary text-center bg-card-bg border border-card-border text-white hover:bg-card-bg/80"
              >
                Retour à la formation
              </Link>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
}

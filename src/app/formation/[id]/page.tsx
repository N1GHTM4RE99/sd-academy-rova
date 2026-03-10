'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import TopBar from '@/components/TopBar';
import { useProgress } from '@/hooks/useProgress';
import { getFormationById, serviceColors, priorityColors } from '@/lib/formations';

export default function FormationPage() {
  const params = useParams();
  const formationId = params.id as string;
  const formation = getFormationById(formationId);

  const { getModuleProgress, getFormationProgress, isModuleUnlocked, getBestScore } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!formation) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold font-syne text-white">Formation non trouvée</h1>
            <Link href="/" style={{ color: serviceColors['social-media-setup'] }}>
              Retour au dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const formationProgress = mounted
    ? getFormationProgress(formation.id, formation.modules.length)
    : 0;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      <main className="pt-24 pb-12 px-4 max-w-5xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour au dashboard
        </Link>

        {/* Formation Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="px-3 py-1 text-sm font-medium rounded-full"
              style={{
                backgroundColor: `${priorityColors[formation.priority]}22`,
                color: priorityColors[formation.priority],
              }}
            >
              {formation.priority === 'high' ? 'Haute' :
               formation.priority === 'medium' ? 'Moyenne' : 'Basse'}
            </span>
            <span className="text-gray-500">{formation.level}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">{formation.duration}</span>
          </div>

          <h1 className="text-4xl font-bold font-syne text-white mb-4">
            {formation.title}
          </h1>

          <p className="text-xl text-gray-400 mb-6">
            {formation.description}
          </p>

          {/* Progress Bar */}
          <div className="card p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Progression de la formation</span>
              <span
                className="text-lg font-bold"
                style={{ color: serviceColors[formation.service] }}
              >
                {formationProgress}%
              </span>
            </div>
            <div className="h-3 bg-card-bg rounded-full overflow-hidden">
              <motion.div
                className="h-full"
                style={{ backgroundColor: serviceColors[formation.service] }}
                initial={{ width: 0 }}
                animate={{ width: `${formationProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {formation.modules.filter((_, i) => mounted && isModuleUnlocked(formation.id, i)).length} / {formation.modules.length} modules débloqués
            </div>
          </div>
        </motion.div>

        {/* Module List */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <h2 className="text-2xl font-bold font-syne text-white mb-6">
            Modules ({formation.modules.length})
          </h2>

          <div className="space-y-4">
            {formation.modules.map((module, index) => {
              const moduleProgress = mounted
                ? getModuleProgress(formation.id, index)
                : { completed: false, score: 0, attempts: 0 };
              const unlocked = mounted ? isModuleUnlocked(formation.id, index) : index === 0;
              const bestScore = mounted ? getBestScore(formation.id, index) : 0;

              return (
                <motion.div key={module.id} variants={item}>
                  <div
                    className={`card flex items-center justify-between ${
                      !unlocked ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Status Icon */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                          moduleProgress.completed
                            ? 'bg-green-500/20 text-green-500'
                            : unlocked
                            ? 'bg-card-bg text-gray-400'
                            : 'bg-card-bg text-gray-600'
                        }`}
                      >
                        {moduleProgress.completed ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : !unlocked ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>

                      {/* Module Info */}
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {module.title}
                        </h3>
                        <p className="text-sm text-gray-400">{module.description}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500">{module.duration}</span>
                          {moduleProgress.attempts > 0 && (
                            <span className="text-xs text-gray-500">
                              {moduleProgress.attempts} tentative{moduleProgress.attempts > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                      {bestScore > 0 && (
                        <div className="text-right">
                          <div className="text-lg font-bold text-white">{bestScore}%</div>
                          <div className="text-xs text-gray-500">Meilleur score</div>
                        </div>
                      )}

                      {unlocked ? (
                        <Link
                          href={`/lesson/${formation.id}/${index}`}
                          className="btn-primary"
                          style={{
                            backgroundColor: serviceColors[formation.service],
                            color: serviceColors[formation.service] === '#FF2D78' ? 'white' : 'black',
                          }}
                        >
                          {moduleProgress.completed ? 'Revoir' : moduleProgress.attempts > 0 ? 'Réessayer' : 'Commencer'}
                        </Link>
                      ) : (
                        <div className="text-gray-500 text-sm">
                          Complétez le module précédent
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { AllProgress, ModuleProgress } from '@/lib/types';

const STORAGE_KEY = 'sd-academy-progress';

const defaultProgress: AllProgress = {};

export function useProgress() {
  const [progress, setProgress] = useState<AllProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setProgress(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse progress:', e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  const saveModuleProgress = useCallback((
    formationId: string,
    moduleIndex: number,
    data: Partial<ModuleProgress>
  ) => {
    setProgress(prev => {
      const formationProgress = prev[formationId] || {};
      const moduleProgress = formationProgress[moduleIndex] || {
        completed: false,
        score: 0,
        attempts: 0,
      };

      return {
        ...prev,
        [formationId]: {
          ...formationProgress,
          [moduleIndex]: {
            ...moduleProgress,
            ...data,
            attempts: (moduleProgress.attempts || 0) + (data.score !== undefined ? 1 : 0),
          },
        },
      };
    });
  }, []);

  const getModuleProgress = useCallback((
    formationId: string,
    moduleIndex: number
  ): ModuleProgress => {
    return progress[formationId]?.[moduleIndex] || {
      completed: false,
      score: 0,
      attempts: 0,
    };
  }, [progress]);

  const getFormationProgress = useCallback((
    formationId: string,
    totalModules: number
  ): number => {
    const formationProgress = progress[formationId];
    if (!formationProgress || totalModules === 0) return 0;

    const completedModules = Object.values(formationProgress).filter(m => m.completed).length;
    return Math.round((completedModules / totalModules) * 100);
  }, [progress]);

  const getGlobalProgress = useCallback((
    totalFormations: number
  ): number => {
    if (totalFormations === 0) return 0;
    const completedFormations = Object.keys(progress).filter(formationId => {
      return Object.values(progress[formationId] || {}).every(m => m.completed);
    }).length;
    return Math.round((completedFormations / totalFormations) * 100);
  }, [progress]);

  const isModuleUnlocked = useCallback((
    formationId: string,
    moduleIndex: number
  ): boolean => {
    // First module is always unlocked
    if (moduleIndex === 0) return true;

    // Check if previous module is completed with score >= 70%
    const prevModuleProgress = progress[formationId]?.[moduleIndex - 1];
    return prevModuleProgress?.completed === true && prevModuleProgress?.score >= 70;
  }, [progress]);

  const getBestScore = useCallback((
    formationId: string,
    moduleIndex: number
  ): number => {
    return progress[formationId]?.[moduleIndex]?.score || 0;
  }, [progress]);

  const getTotalCompletedModules = useCallback((): number => {
    return Object.values(progress).reduce((total, formation) => {
      return total + Object.values(formation).filter(m => m.completed).length;
    }, 0);
  }, [progress]);

  const getAverageScore = useCallback((): number => {
    const allScores: number[] = [];
    Object.values(progress).forEach(formation => {
      Object.values(formation).forEach(module => {
        if (module.attempts > 0) {
          allScores.push(module.score);
        }
      });
    });
    if (allScores.length === 0) return 0;
    return Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length);
  }, [progress]);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    progress,
    isLoaded,
    saveModuleProgress,
    getModuleProgress,
    getFormationProgress,
    getGlobalProgress,
    isModuleUnlocked,
    getBestScore,
    getTotalCompletedModules,
    getAverageScore,
    resetProgress,
  };
}

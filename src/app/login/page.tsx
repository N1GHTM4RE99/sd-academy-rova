'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { serviceColors } from '@/lib/formations';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(redirect);
        router.refresh();
      } else {
        setError('Mot de passe incorrect');
      }
    } catch {
      setError('Une erreur est survenue');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="card max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-syne text-white mb-2">
            SD Academy
          </h1>
          <p className="text-gray-400">Entrez votre mot de passe pour accéder</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-gray-400 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderColor: serviceColors['social-media-setup'] }}
              placeholder="Entrez le mot de passe"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <button
            type="submit"
            style={{ backgroundColor: serviceColors['social-media-setup'] }} className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-80 transition-colors"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LoginForm />
    </Suspense>
  );
}

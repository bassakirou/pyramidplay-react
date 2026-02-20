import React, { useState } from 'react';
import { Mail, Lock, Play } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { Button } from '@/components/ui/button';

export function Login() {
  const { login } = useAuth();
  const { navigateTo } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigateTo('home');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B]"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B]"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-16 relative">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <polygon 
                  points="20,5 35,35 5,35" 
                  fill="#F59E0B"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
                <circle cx="20" cy="8" r="3" fill="white" />
              </svg>
            </div>
            <span className="text-white font-bold text-3xl">
              PYRAMID <span className="text-[#F59E0B]">Play</span>
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            La plateforme multimedia de promotion de l'art musical africain
          </h1>
          
          <div className="w-32 h-1 bg-[#F59E0B] mx-auto mb-8"></div>
          
          <p className="text-gray-400 text-lg">
            Découvrez les meilleurs artistes africains et leurs créations
          </p>
        </div>

        {/* Floating Play Button */}
        <div className="absolute bottom-12 left-12">
          <div className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center">
            <Play className="w-6 h-6 text-[#0F172A] fill-current ml-1" />
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-[#1E293B] flex flex-col justify-center items-center p-8 relative">
        {/* Decorative Pattern */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B]"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B]"></div>

        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 relative">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <polygon 
                  points="20,5 35,35 5,35" 
                  fill="#F59E0B"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
                <circle cx="20" cy="8" r="3" fill="white" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl">
              PYRAMID <span className="text-[#F59E0B]">Play</span>
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F59E0B]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Adresse email"
                required
                className="w-full pl-12 pr-4 py-4 bg-[#0F172A] border border-white/10 rounded-full text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F59E0B]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
                className="w-full pl-12 pr-4 py-4 bg-[#0F172A] border border-white/10 rounded-full text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition-all"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold rounded-full transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-between text-sm">
            <button 
              onClick={() => {}}
              className="text-[#F59E0B] hover:underline"
            >
              Mot de passe oublié ?
            </button>
            <button 
              onClick={() => navigateTo('register')}
              className="text-[#F59E0B] hover:underline"
            >
              Vous n'avez pas de compte ? Créez un compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Mail, Lock, User, Play } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@/contexts/NavigationContext";
import { Button } from "@/components/ui/button";

export function Register() {
  const { register } = useAuth();
  const { navigateTo } = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(email, password, name);
      if (success) {
        navigateTo("home");
      } else {
        setError("Erreur lors de la création du compte");
      }
    } catch (err) {
      setError("Une erreur est survenue");
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
          <div
            className="absolute top-0 left-0 w-full h-[13px]"
            style={{
              backgroundImage: "url(/assets/motifs_pyramid.svg)",
              backgroundRepeat: "repeat-x",
              backgroundSize: "auto 100%",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-[13px]"
            style={{
              backgroundImage: "url(/assets/motifs_pyramid.svg)",
              backgroundRepeat: "repeat-x",
              backgroundSize: "auto 100%",
            }}
          />
        </div>

        {/* Desktop Logo */}
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-8">
            <img
              src="/pyramid-play-white.svg"
              alt="PYRAMID Play"
              className="h-20 w-auto"
            />
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            La plateforme multimedia de promotion de l'art musical africain
          </h1>

          <div className="w-32 h-1 bg-[#F59E0B] mx-auto mb-8"></div>

          <p className="text-gray-400 text-lg">
            Rejoignez la communauté et découvrez la richesse de la musique
            africaine
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-6 h-6 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
                <span className="text-[#F59E0B] text-sm">✓</span>
              </div>
              <span>Écoute illimitée</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-6 h-6 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
                <span className="text-[#F59E0B] text-sm">✓</span>
              </div>
              <span>Créez vos playlists</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-6 h-6 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
                <span className="text-[#F59E0B] text-sm">✓</span>
              </div>
              <span>Sauvegardez vos favoris</span>
            </div>
          </div>
        </div>

        {/* Floating Play Button */}
        <div className="absolute bottom-12 left-12">
          <div className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center">
            <Play className="w-6 h-6 text-[#0F172A] fill-current ml-1" />
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 bg-[#1E293B] flex flex-col justify-center items-center p-8 relative">
        {/* Decorative Pattern */}
        <div
          className="absolute top-0 left-0 w-full h-[13px]"
          style={{
            backgroundImage: "url(/assets/motifs_pyramid.svg)",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-[13px]"
          style={{
            backgroundImage: "url(/assets/motifs_pyramid.svg)",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
          }}
        />

        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <img
              src="/pyramid-play-white.svg"
              alt="PYRAMID Play"
              className="h-10 w-auto"
            />
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Créer un compte
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F59E0B]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom complet"
                required
                className="w-full pl-12 pr-4 py-4 bg-[#0F172A] border border-white/10 rounded-full text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition-all"
              />
            </div>

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

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F59E0B]" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmer le mot de passe"
                required
                className="w-full pl-12 pr-4 py-4 bg-[#0F172A] border border-white/10 rounded-full text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition-all"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold rounded-full transition-colors disabled:opacity-50"
            >
              {isLoading ? "Création..." : "Créer un compte"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigateTo("login")}
              className="text-[#F59E0B] hover:underline text-sm"
            >
              Vous avez déjà un compte ? Connectez-vous
            </button>
          </div>

          <p className="text-gray-500 text-xs text-center mt-6">
            En créant un compte, vous acceptez nos conditions d'utilisation et
            notre politique de confidentialité.
          </p>
        </div>
      </div>
    </div>
  );
}

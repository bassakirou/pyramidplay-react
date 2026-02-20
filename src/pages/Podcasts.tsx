import { Radio, Mic, Headphones } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';

export function Podcasts() {
  const { isAuthenticated } = useAuth();
  const { navigateTo } = useNavigation();

  if (!isAuthenticated) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full">
        <Radio className="w-16 h-16 text-gray-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Podcasts</h2>
        <p className="text-gray-400 text-center mb-6">
          Connectez-vous pour accéder aux podcasts
        </p>
        <button
          onClick={() => navigateTo('login')}
          className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold rounded-full transition-colors"
        >
          Se connecter
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center justify-center h-full">
      <div className="w-24 h-24 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mb-6">
        <Mic className="w-12 h-12 text-[#F59E0B]" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Podcasts</h2>
      <p className="text-gray-400 text-center max-w-md mb-6">
        Les podcasts arrivent bientôt sur Pyramid Play !
      </p>
      <p className="text-gray-500 text-sm text-center max-w-md">
        Découvrez bientôt des podcasts sur la musique africaine, des interviews d'artistes et bien plus encore.
      </p>

      {/* Coming Soon Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-2xl">
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mb-3">
            <Mic className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <h3 className="text-white font-medium mb-1">Interviews</h3>
          <p className="text-gray-400 text-sm">Découvrez les artistes à travers des interviews exclusives</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mb-3">
            <Headphones className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <h3 className="text-white font-medium mb-1">Émissions</h3>
          <p className="text-gray-400 text-sm">Des émissions dédiées à la musique africaine</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 rounded-full bg-[#F59E0B]/20 flex items-center justify-center mb-3">
            <Radio className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <h3 className="text-white font-medium mb-1">Radio</h3>
          <p className="text-gray-400 text-sm">Écoutez la radio en direct 24/7</p>
        </div>
      </div>
    </div>
  );
}

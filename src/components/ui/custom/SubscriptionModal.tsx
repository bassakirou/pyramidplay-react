import { Music, Heart, ListMusic, Infinity } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { usePlayer } from '@/contexts/PlayerContext';
import { useNavigation } from '@/contexts/NavigationContext';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const { songsPlayed, maxFreeSongs } = usePlayer();
  const { navigateTo } = useNavigation();

  const handleSubscribe = () => {
    onClose();
    navigateTo('register');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E293B] border-white/10 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-center text-xl">
            Limite atteinte !
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center py-4">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
            <Music className="w-10 h-10 text-[#F59E0B]" />
          </div>
          
          <p className="text-gray-300 mb-2">
            Vous avez écouté <span className="text-[#F59E0B] font-bold">{songsPlayed}</span> chansons sur {maxFreeSongs} gratuites.
          </p>
          
          <p className="text-white text-lg font-semibold mb-6">
            Passez à l'abonnement gratuit pour profiter de :
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
                <Infinity className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <span>Écoute illimitée</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
                <Heart className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <span>Ajouter aux favoris</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
                <ListMusic className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <span>Créer des playlists</span>
            </div>
          </div>

          <Button
            onClick={handleSubscribe}
            className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold py-3"
          >
            Créer un compte gratuit
          </Button>
          
          <p className="text-gray-400 text-sm mt-3">
            C'est 100% gratuit !
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

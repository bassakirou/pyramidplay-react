import { Library as LibraryIcon, Disc, Radio, ListMusic, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { albums, artists } from '@/data/mockData';
import { AlbumCard } from '@/components/ui/custom/AlbumCard';
import { ArtistCard } from '@/components/ui/custom/ArtistCard';

export function Library() {
  const { isAuthenticated, user } = useAuth();
  const { navigateTo } = useNavigation();

  if (!isAuthenticated) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full">
        <LibraryIcon className="w-16 h-16 text-gray-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Votre bibliothèque</h2>
        <p className="text-gray-400 text-center mb-6">
          Connectez-vous pour accéder à votre bibliothèque musicale
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
    <div className="p-6 overflow-y-auto h-full">
      <h1 className="text-2xl font-bold text-white mb-6">Votre bibliothèque</h1>

      {/* Quick Access */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => navigateTo('playlists')}
          className="flex items-center gap-3 p-4 bg-[#1E293B] rounded-lg hover:bg-[#F59E0B]/20 transition-colors group"
        >
          <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center group-hover:bg-[#F59E0B]">
            <ListMusic className="w-6 h-6 text-[#F59E0B] group-hover:text-[#0F172A]" />
          </div>
          <div className="text-left">
            <p className="text-white font-medium">Playlists</p>
            <p className="text-gray-400 text-sm">{user?.playlists.length || 0} playlist(s)</p>
          </div>
        </button>

        <button
          onClick={() => navigateTo('favorites')}
          className="flex items-center gap-3 p-4 bg-[#1E293B] rounded-lg hover:bg-[#F59E0B]/20 transition-colors group"
        >
          <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center group-hover:bg-[#F59E0B]">
            <Heart className="w-6 h-6 text-[#F59E0B] group-hover:text-[#0F172A]" />
          </div>
          <div className="text-left">
            <p className="text-white font-medium">Favoris</p>
            <p className="text-gray-400 text-sm">{user?.favorites.length || 0} chanson(s)</p>
          </div>
        </button>

        <button
          onClick={() => navigateTo('podcasts')}
          className="flex items-center gap-3 p-4 bg-[#1E293B] rounded-lg hover:bg-[#F59E0B]/20 transition-colors group"
        >
          <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center group-hover:bg-[#F59E0B]">
            <Radio className="w-6 h-6 text-[#F59E0B] group-hover:text-[#0F172A]" />
          </div>
          <div className="text-left">
            <p className="text-white font-medium">Podcasts</p>
            <p className="text-gray-400 text-sm">À venir</p>
          </div>
        </button>

        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3 p-4 bg-[#1E293B] rounded-lg hover:bg-[#F59E0B]/20 transition-colors group"
        >
          <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center group-hover:bg-[#F59E0B]">
            <Disc className="w-6 h-6 text-[#F59E0B] group-hover:text-[#0F172A]" />
          </div>
          <div className="text-left">
            <p className="text-white font-medium">Albums</p>
            <p className="text-gray-400 text-sm">{albums.length} albums</p>
          </div>
        </button>
      </div>

      {/* Your Albums */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Albums</h2>
          <button className="text-[#F59E0B] text-sm hover:underline">
            Tout afficher
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {albums.slice(0, 8).map((album) => (
            <div key={album.id} className="flex-shrink-0 w-40">
              <AlbumCard album={album} />
            </div>
          ))}
        </div>
      </section>

      {/* Your Artists */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Artistes suivis</h2>
          <button className="text-[#F59E0B] text-sm hover:underline">
            Tout afficher
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {artists.slice(0, 8).map((artist) => (
            <div key={artist.id} className="flex-shrink-0 w-40">
              <ArtistCard artist={artist} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

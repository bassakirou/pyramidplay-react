import { Search as SearchIcon } from 'lucide-react';
import { searchContent, searchByCategory } from '@/data/mockData';
import { SongCard } from '@/components/ui/custom/SongCard';
import { AlbumCard } from '@/components/ui/custom/AlbumCard';
import { ArtistCard } from '@/components/ui/custom/ArtistCard';

interface SearchPageProps {
  query: string;
}

export function SearchPage({ query }: SearchPageProps) {
  // Vérifier si la requête correspond à une catégorie
  const categoryNames = ['Hip Hop', 'Jazz', 'Pop', 'Rap', 'Makossa', 'Rumba', 'Country', 'R&B', 'Bikutsi', 'Gospel', 'Salsa', 'Zouk', 'Ndombolo', 'Afrobeat', 'Highlife'];
  const isCategorySearch = categoryNames.some(cat => cat.toLowerCase() === query.toLowerCase());
  
  // Utiliser la recherche par catégorie si c'est une catégorie, sinon recherche normale
  const results = isCategorySearch ? searchByCategory(query) : searchContent(query);
  
  const hasResults = results.songs.length > 0 || results.albums.length > 0 || results.artists.length > 0;

  if (!query) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full">
        <SearchIcon className="w-16 h-16 text-gray-600 mb-4" />
        <p className="text-gray-400 text-lg">Recherchez des chansons, artistes ou albums</p>
      </div>
    );
  }

  if (!hasResults) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full">
        <SearchIcon className="w-16 h-16 text-gray-600 mb-4" />
        <p className="text-gray-400 text-lg">Aucun résultat pour "{query}"</p>
        <p className="text-gray-500 text-sm mt-2">
          Essayez avec d'autres mots-clés
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 overflow-y-auto h-full">
      <h1 className="text-2xl font-bold text-white mb-6">
        {isCategorySearch ? `Catégorie: "${query}"` : `Résultats pour "${query}"`}
      </h1>

      {/* Songs */}
      {results.songs.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Chansons</h2>
            {results.songs.length > 5 && (
              <button className="text-[#F59E0B] text-sm hover:underline">
                Tout afficher
              </button>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {results.songs.slice(0, 10).map((song) => (
              <div key={song.id} className="flex-shrink-0 w-40">
                <SongCard song={song} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Albums */}
      {results.albums.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Albums</h2>
            {results.albums.length > 5 && (
              <button className="text-[#F59E0B] text-sm hover:underline">
                Tout afficher
              </button>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {results.albums.slice(0, 10).map((album) => (
              <div key={album.id} className="flex-shrink-0 w-40">
                <AlbumCard album={album} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Artists */}
      {results.artists.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Artistes</h2>
            {results.artists.length > 5 && (
              <button className="text-[#F59E0B] text-sm hover:underline">
                Tout afficher
              </button>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {results.artists.slice(0, 10).map((artist) => (
              <div key={artist.id} className="flex-shrink-0 w-40">
                <ArtistCard artist={artist} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

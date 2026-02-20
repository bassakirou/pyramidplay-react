import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories, artists, albums } from '@/data/mockData';
import { CategoryBadge } from '@/components/ui/custom/CategoryBadge';
import { ArtistCard } from '@/components/ui/custom/ArtistCard';
import { AlbumCard } from '@/components/ui/custom/AlbumCard';
import { useNavigation } from '@/contexts/NavigationContext';

interface ScrollableSectionProps {
  title: string;
  children: React.ReactNode;
  showAll?: boolean;
  onShowAll?: () => void;
}

function ScrollableSection({ title, children, showAll = true, onShowAll }: ScrollableSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {showAll && (
          <button 
            onClick={onShowAll}
            className="text-[#F59E0B] text-sm hover:underline"
          >
            Tout afficher
          </button>
        )}
      </div>
      
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#D97706]"
        >
          <ChevronLeft className="w-6 h-6 text-[#0F172A]" />
        </button>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#D97706]"
        >
          <ChevronRight className="w-6 h-6 text-[#0F172A]" />
        </button>
      </div>
    </section>
  );
}

export function Home() {
  const [selectedCategory] = useState<string | null>(null);
  const { navigateToSearch } = useNavigation();

  const handleCategoryClick = (categoryName: string) => {
    navigateToSearch(categoryName);
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      {/* Categories Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Catégories populaires</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <CategoryBadge
              key={category.id}
              category={category}
              isActive={selectedCategory === category.id}
              onClick={() => handleCategoryClick(category.name)}
            />
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <ScrollableSection title="Artistes populaires">
        {artists.slice(0, 10).map((artist) => (
          <div key={artist.id} className="flex-shrink-0 w-40">
            <ArtistCard artist={artist} />
          </div>
        ))}
      </ScrollableSection>

      {/* Popular Albums */}
      <ScrollableSection title="Albums populaires">
        {albums.slice(0, 10).map((album) => (
          <div key={album.id} className="flex-shrink-0 w-40">
            <AlbumCard album={album} />
          </div>
        ))}
      </ScrollableSection>

      {/* New Releases */}
      <ScrollableSection title="Nouveautés">
        {[...albums].reverse().slice(0, 8).map((album) => (
          <div key={album.id} className="flex-shrink-0 w-40">
            <AlbumCard album={album} />
          </div>
        ))}
      </ScrollableSection>

      {/* Trending Artists */}
      <ScrollableSection title="Tendances">
        {artists.slice(0, 8).reverse().map((artist) => (
          <div key={artist.id} className="flex-shrink-0 w-40">
            <ArtistCard artist={artist} />
          </div>
        ))}
      </ScrollableSection>
    </div>
  );
}

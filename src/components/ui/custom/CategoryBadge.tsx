import type { Category } from '@/types';

interface CategoryBadgeProps {
  category: Category;
  onClick?: () => void;
  isActive?: boolean;
}

export function CategoryBadge({ category, onClick, isActive = false }: CategoryBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        isActive
          ? 'bg-[#F59E0B] text-[#0F172A]'
          : 'bg-[#1E293B] text-gray-300 hover:bg-[#F59E0B]/20 hover:text-[#F59E0B]'
      }`}
    >
      <span>{category.name}</span>
      <span className={`text-xs px-2 py-0.5 rounded-full ${
        isActive ? 'bg-[#0F172A]/20' : 'bg-[#F59E0B]/20 text-[#F59E0B]'
      }`}>
        {category.count}
      </span>
    </button>
  );
}

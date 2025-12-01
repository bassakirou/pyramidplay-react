import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Breakpoints = Partial<{ sm: number; md: number; lg: number; xl: number }>;

interface CarouselProps {
  children: React.ReactNode[] | React.ReactNode;
  nbSlides?: number; // par défaut pour grands écrans
  breakpoints?: Breakpoints; // personnaliser par taille d’écran
  showDots?: boolean;
  showNav?: boolean;
  className?: string;
}

export function Carousel({
  children,
  nbSlides = 6,
  breakpoints = { sm: 2, md: 3, lg: 5, xl: nbSlides },
  showDots = true,
  showNav = true,
  className,
}: CarouselProps) {
  const items = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children],
  );
  const [slidesPerView, setSlidesPerView] = useState(nbSlides);
  const [page, setPage] = useState(0);
  const stripRef = useRef<HTMLDivElement | null>(null);

  // Responsive slides per view
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      let spv = nbSlides;
      if (w < 640 && breakpoints.sm) spv = breakpoints.sm;
      else if (w < 768 && breakpoints.md) spv = breakpoints.md;
      else if (w < 1024 && breakpoints.lg) spv = breakpoints.lg;
      else spv = breakpoints.xl ?? nbSlides;
      setSlidesPerView(spv);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [nbSlides, breakpoints]);

  const pages = Math.max(1, Math.ceil(items.length / slidesPerView));

  const scrollToPage = (p: number) => {
    const el = stripRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(p, pages - 1));
    setPage(clamped);
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  const next = () => scrollToPage(page + 1);
  const prev = () => scrollToPage(page - 1);

  // Track page during manual scroll
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onScroll = () => {
      const current = Math.round(el.scrollLeft / el.clientWidth);
      setPage(current);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={className ?? ""} data-oid="zlaj25z">
      <div className="relative" data-oid="o.kgytk">
        {showNav && (
          <>
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
              data-oid="a.t-11c"
            >
              <Button
                size="icon"
                variant="secondary"
                style={{ backgroundColor: "#fdac0d", color: "#0a1d35" }}
                onClick={prev}
                aria-label="Précédent"
                data-oid="557wcdm"
              >
                <ChevronLeft data-oid="_2adx5s" />
              </Button>
            </div>
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
              data-oid="chdm654"
            >
              <Button
                size="icon"
                variant="secondary"
                style={{ backgroundColor: "#fdac0d", color: "#0a1d35" }}
                onClick={next}
                aria-label="Suivant"
                data-oid="t:b-.vq"
              >
                <ChevronRight data-oid="c_4h32b" />
              </Button>
            </div>
          </>
        )}

        <div className="overflow-hidden px-12" data-oid="2w63e6l">
          <div
            ref={stripRef}
            className="flex gap-6 w-full overflow-x-auto scroll-smooth snap-x snap-mandatory"
            data-oid="8actjl:"
          >
            {items.map((child, idx) => (
              <div
                key={idx}
                className="snap-start"
                style={{ flex: `0 0 ${100 / slidesPerView}%` }}
                data-oid="phfxg34"
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showDots && pages > 1 && (
        <div
          className="mt-3 flex items-center justify-center gap-2"
          data-oid=":ju7xab"
        >
          {Array.from({ length: pages }).map((_, i) => (
            <Button
              key={i}
              variant="ghost"
              size="icon"
              onClick={() => scrollToPage(i)}
              className="h-2 w-2 rounded-full p-0"
              style={{ backgroundColor: i === page ? "#fdac0d" : "#27425e" }}
              aria-label={`Aller à la page ${i + 1}`}
              data-oid="oq.ya2m"
            />
          ))}
        </div>
      )}
    </div>
  );
}

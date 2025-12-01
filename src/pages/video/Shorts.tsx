import { useShorts } from "../../hooks/useShorts";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";

export default function Shorts() {
  const { shorts } = useShorts();
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
    }
  }, [index]);

  const next = () => setIndex((i) => (i + 1) % Math.max(1, shorts.length));
  const prev = () =>
    setIndex(
      (i) => (i - 1 + Math.max(1, shorts.length)) % Math.max(1, shorts.length),
    );

  const current = shorts[index];

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#162a42" }}
    >
      <div className="w-full max-w-md">
        <div
          className="rounded-lg overflow-hidden"
          style={{ backgroundColor: "#091d35" }}
        >
          {current ? (
            <video
              ref={videoRef}
              src={current.src || ""}
              className="w-full h-[70vh] object-cover"
              controls
              onEnded={next}
            />
          ) : (
            <div className="h-[70vh] flex items-center justify-center text-white">
              Aucun short
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <Button
            className="px-4 py-2 rounded-md"
            style={{ backgroundColor: "#fdac0d", color: "#091d35" }}
            onClick={prev}
          >
            Précédent
          </Button>
          <div className="text-white text-sm">{current?.title || ""}</div>
          <Button
            className="px-4 py-2 rounded-md"
            style={{ backgroundColor: "#fdac0d", color: "#091d35" }}
            onClick={next}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}

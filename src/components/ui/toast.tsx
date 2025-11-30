import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

type ToastItem = {
  id: string;
  title: string;
  description?: string;
  type?: "default" | "success" | "error" | "info";
  durationMs?: number;
};

type Position = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

type ToastContextType = {
  add: (t: Omit<ToastItem, "id">) => string;
  close: (id: string) => void;
  position: Position;
};

const ToastContext = createContext<ToastContextType | null>(null);

let latestCtx: ToastContextType | null = null;

export const toastManager = {
  add: (t: Omit<ToastItem, "id">) => {
    if (!latestCtx) return "";
    return latestCtx.add(t);
  },
  close: (id: string) => {
    latestCtx?.close(id);
  },
};

export function ToastProvider({ children, position = "bottom-right" as Position }: { children: React.ReactNode; position?: Position }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const timersRef = useRef<Record<string, number>>({});

  const ctxValue = useMemo<ToastContextType>(() => ({
    position,
    add: ({ title, description, type = "default", durationMs = 3000 }) => {
      const id = crypto.randomUUID();
      const item: ToastItem = { id, title, description, type, durationMs };
      setItems((prev) => [...prev, item]);
      timersRef.current[id] = window.setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== id));
        delete timersRef.current[id];
      }, durationMs);
      return id;
    },
    close: (id: string) => {
      const t = timersRef.current[id];
      if (t) {
        clearTimeout(t);
        delete timersRef.current[id];
      }
      setItems((prev) => prev.filter((i) => i.id !== id));
    },
  }), [position]);

  useEffect(() => {
    latestCtx = ctxValue;
    return () => {
      if (latestCtx === ctxValue) latestCtx = null;
    };
  }, [ctxValue]);

  const containerStyle: React.CSSProperties = useMemo(() => {
    const base: React.CSSProperties = { position: "fixed", zIndex: 1000, display: "flex", gap: 8, flexDirection: "column" };
    const map: Record<Position, React.CSSProperties> = {
      "top-left": { top: 16, left: 16, alignItems: "flex-start" },
      "top-center": { top: 16, left: "50%", transform: "translateX(-50%)", alignItems: "center" },
      "top-right": { top: 16, right: 16, alignItems: "flex-end" },
      "bottom-left": { bottom: 16, left: 16, alignItems: "flex-start" },
      "bottom-center": { bottom: 16, left: "50%", transform: "translateX(-50%)", alignItems: "center" },
      "bottom-right": { bottom: 16, right: 16, alignItems: "flex-end" },
    };
    return { ...base, ...map[position] };
  }, [position]);

  const colorFor = (type?: ToastItem["type"]) => {
    switch (type) {
      case "success":
        return { border: "#16a34a", bg: "#052e1b" };
      case "error":
        return { border: "#ef4444", bg: "#3b0a0a" };
      case "info":
        return { border: "#60a5fa", bg: "#0b1b33" };
      default:
        return { border: "#203c5a", bg: "#0f2036" };
    }
  };

  return (
    <ToastContext.Provider value={ctxValue}>
      {children}
      <div style={containerStyle}>
        {items.map((item) => {
          const c = colorFor(item.type);
          return (
            <div key={item.id} className="rounded-md p-3 shadow" style={{ backgroundColor: c.bg, border: `1px solid ${c.border}`, color: "#fff", minWidth: 240 }}>
              <div className="font-semibold">{item.title}</div>
              {item.description && (
                <div className="text-sm" style={{ color: "#ffd384" }}>{item.description}</div>
              )}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function AnchoredToastProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


import React, { useEffect, useRef, useState } from "react";

interface Bolt {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  life: number;
  maxLife: number;
}

interface LogoLightningProps {
  color?: string;
  glowColor?: string;
  maxBolts?: number;
}

/**
 * Scatters small random lightning bolts across the nearest `<a>` ancestor
 * while it's hovered. Astro wraps `client:*` islands in an `<astro-island>`
 * element that — since this canvas is `position: absolute` and therefore
 * doesn't contribute to its own parent's box size — collapses to 0×0, so we
 * deliberately look past it via `closest("a")` rather than `parentElement`.
 */
export const LogoLightning: React.FC<LogoLightningProps> = ({
  color = "#ffffff",
  glowColor = "#38bdf8",
  maxBolts = 5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.closest<HTMLElement>("a");
    if (!container) return;

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.closest<HTMLElement>("a")?.getBoundingClientRect();
      canvas.width = rect?.width || 200;
      canvas.height = rect?.height || 60;
    };
    resize();
    window.addEventListener("resize", resize);

    if (!isHovering) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return () => window.removeEventListener("resize", resize);
    }

    let bolts: Bolt[] = [];
    let spawnTimer = 0;
    let animationFrameId: number;

    function spawnBolt() {
      const w = canvas!.width;
      const h = canvas!.height;
      const x1 = Math.random() * w;
      const y1 = Math.random() * h;
      const angle = Math.random() * Math.PI * 2;
      const length = 10 + Math.random() * 20;
      const x2 = x1 + Math.cos(angle) * length;
      const y2 = y1 + Math.sin(angle) * length;
      bolts.push({ x1, y1, x2, y2, life: 0, maxLife: 10 + Math.random() * 10 });
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      spawnTimer++;
      if (spawnTimer > 5 + Math.random() * 8) {
        spawnTimer = 0;
        if (bolts.length < maxBolts) spawnBolt();
      }

      bolts = bolts.filter((bolt) => bolt.life < bolt.maxLife);

      for (const bolt of bolts) {
        const t = bolt.life / bolt.maxLife;
        const alpha = t < 0.5 ? t * 2 : (1 - t) * 2; // fade in then out

        const midX = (bolt.x1 + bolt.x2) / 2 + (Math.random() - 0.5) * 6;
        const midY = (bolt.y1 + bolt.y2) / 2 + (Math.random() - 0.5) * 6;

        ctx!.save();
        ctx!.globalAlpha = alpha;

        ctx!.shadowColor = glowColor;
        ctx!.shadowBlur = 8;
        ctx!.strokeStyle = glowColor;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.moveTo(bolt.x1, bolt.y1);
        ctx!.lineTo(midX, midY);
        ctx!.lineTo(bolt.x2, bolt.y2);
        ctx!.stroke();

        ctx!.shadowBlur = 2;
        ctx!.strokeStyle = color;
        ctx!.lineWidth = 0.75;
        ctx!.stroke();

        ctx!.restore();

        bolt.life++;
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovering, color, glowColor, maxBolts]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full" />;
};

export default LogoLightning;

import React, { useEffect, useRef, useState } from "react";

interface ElectricProcessLineProps {
  /**
   * 1-based step to arc towards. Pass this to fully control the line from a
   * parent that owns its own state. Leave undefined (the default) and the
   * line manages itself by listening for hover/click on sibling elements
   * matching `triggerSelector` — which is how it's used today, since the
   * step row is plain Astro-rendered markup, not a React parent.
   */
  activeIndex?: number | null;
  totalSteps?: number;
  triggerSelector?: string;
  color?: string;
  glowColor?: string;
}

export const ElectricProcessLine: React.FC<ElectricProcessLineProps> = ({
  activeIndex,
  totalSteps = 6,
  triggerSelector = "[data-process-trigger]",
  color = "#ffffff",
  glowColor = "#00f0ff",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Self-managed hover/click state, used whenever `activeIndex` isn't
  // explicitly controlled by a parent.
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [pinnedStep, setPinnedStep] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex !== undefined) return; // externally controlled, skip auto-wiring

    const triggers = Array.from(document.querySelectorAll<HTMLElement>(triggerSelector));
    if (triggers.length === 0) return;

    const cleanups: Array<() => void> = [];

    triggers.forEach((trigger) => {
      const raw = trigger.dataset.processTrigger;
      if (raw === undefined) return;
      const stepNumber = Number(raw) + 1; // data-process-trigger is 0-based

      const onEnter = () => setHoveredStep(stepNumber);
      const onLeave = () => setHoveredStep((current) => (current === stepNumber ? null : current));
      const onClick = (event: MouseEvent) => {
        // Stop this from reaching the document-level "click outside" listener below,
        // which would otherwise immediately clear the pin we're about to set.
        event.stopPropagation();
        setPinnedStep((current) => (current === stepNumber ? null : stepNumber));
      };

      trigger.addEventListener("mouseenter", onEnter);
      trigger.addEventListener("mouseleave", onLeave);
      trigger.addEventListener("focus", onEnter);
      trigger.addEventListener("blur", onLeave);
      trigger.addEventListener("click", onClick);

      cleanups.push(() => {
        trigger.removeEventListener("mouseenter", onEnter);
        trigger.removeEventListener("mouseleave", onLeave);
        trigger.removeEventListener("focus", onEnter);
        trigger.removeEventListener("blur", onLeave);
        trigger.removeEventListener("click", onClick);
      });
    });

    // Clicking anywhere outside the step triggers un-pins the current selection
    // so the beam resumes its normal idle travel, same as a plain hover-out.
    const onDocumentClick = () => setPinnedStep(null);
    document.addEventListener("click", onDocumentClick);
    cleanups.push(() => document.removeEventListener("click", onDocumentClick));

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [activeIndex, triggerSelector]);

  const resolvedActiveIndex = activeIndex !== undefined ? activeIndex : (hoveredStep ?? pinnedStep);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let progress = 0; // Travel progress for idle mode

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = 40;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawElectricBeam = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const centerY = canvas.height / 2;

      // 1. Draw base low-opacity guide line
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.strokeStyle = "rgba(2, 132, 199, 0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      let tailX = 0;
      let headX = 0;
      let isFullArc = false;

      // 2. Calculate tail and head according to mode
      if (resolvedActiveIndex !== null && resolvedActiveIndex !== undefined && resolvedActiveIndex > 0 && resolvedActiveIndex <= totalSteps) {
        // TARGET MODE: From 0 to center of target step
        isFullArc = true;
        tailX = 0;
        // Step center formula: (stepIndex - 0.5) / totalSteps
        const targetRatio = (resolvedActiveIndex - 0.5) / totalSteps;
        headX = width * targetRatio;
      } else {
        // IDLE TRAVELING MODE: Short segment moving left to right
        headX = progress * width;
        tailX = Math.max(0, headX - 180);
      }

      // 3. Render Electric Arc if visible
      if (headX > tailX) {
        ctx.save();

        // Glow Layer
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 12;
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.moveTo(tailX, centerY);

        // Calculate segment density according to length
        const distance = headX - tailX;
        const segmentLength = 12; // Approx px per zigzag
        const segments = Math.max(8, Math.floor(distance / segmentLength));
        const stepSize = distance / segments;

        for (let i = 1; i <= segments; i++) {
          const nextX = tailX + i * stepSize;
          // Jitter energy displacement
          const offsetY = (Math.random() - 0.5) * (isFullArc ? 9 : 7);
          ctx.lineTo(nextX, centerY + offsetY);
        }

        ctx.stroke();

        // White Core Layer
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#ffffff";
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Sparks on target head
        for (let s = 0; s < 5; s++) {
          const sparkX = headX + (Math.random() - 0.5) * 12;
          const sparkY = centerY + (Math.random() - 0.5) * 16;
          ctx.fillStyle = Math.random() > 0.5 ? glowColor : "#ffffff";
          ctx.fillRect(sparkX, sparkY, 2, 2);
        }

        ctx.restore();
      }

      // Increment progress for idle mode
      if (!isFullArc) {
        progress += 0.005;
        if (progress > 1.1) progress = -0.1;
      }

      animationFrameId = requestAnimationFrame(drawElectricBeam);
    };

    drawElectricBeam();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedActiveIndex, totalSteps, color, glowColor]);

  return (
    <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute left-0 top-1/2 block h-[40px] w-full -translate-y-1/2" />
    </div>
  );
};

export default ElectricProcessLine;

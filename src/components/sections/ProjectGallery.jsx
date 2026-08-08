import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { siteContent } from "../../data/siteContent";

export default function ProjectGallery() {
  const projects = siteContent.projects;
  const [activeIndex, setActiveIndex] = useState(null);

  const isOpen = activeIndex !== null;

  function close() {
    setActiveIndex(null);
  }

  function showPrev() {
    setActiveIndex((i) => (i - 1 + projects.length) % projects.length);
  }

  function showNext() {
    setActiveIndex((i) => (i + 1) % projects.length);
  }

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {projects.map((project, index) => (
          <div key={project.id} className="flip-card-scene h-64">
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${project.label}`}
              className="flip-card-inner block w-full text-left"
            >
              <div className="flip-card-face overflow-hidden border border-border-technical">
                <img
                  src={project.image.src}
                  width={project.image.width}
                  height={project.image.height}
                  alt={project.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute right-2 top-2 bg-hud-blue px-1 font-mono text-[9px] text-white">
                  {`DONE_${String(index + 1).padStart(2, "0")}`}
                </div>
              </div>

              <div className="flip-card-face flip-card-back flex flex-col gap-2 border border-primary-container bg-surface-slate p-4">
                <span className="font-mono text-[9px] text-hud-blue-light">{`DONE_${String(index + 1).padStart(2, "0")}`}</span>
                <h4 className="font-heading text-sm font-bold leading-tight text-white">{project.label}</h4>
                <p className="line-clamp-5 text-xs leading-relaxed text-text-secondary">{project.description}</p>
                <span className="mt-auto font-mono text-[9px] text-primary-container">VIEW PROJECT →</span>
              </div>
            </button>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={close}>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 text-text-secondary hover:text-white"
          >
            <X size={28} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous project"
            className="absolute left-2 top-1/2 -translate-y-1/2 border border-border-technical bg-surface-slate p-2 text-white hover:border-hud-blue sm:left-6"
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden border border-border-technical bg-surface-container md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={projects[activeIndex].image.src}
              width={projects[activeIndex].image.width}
              height={projects[activeIndex].image.height}
              alt={projects[activeIndex].alt}
              loading="eager"
              decoding="async"
              className="max-h-[45vh] w-full object-cover md:max-h-[85vh] md:w-3/5"
            />
            <div className="flex flex-col gap-3 overflow-y-auto p-6 md:w-2/5">
              <span className="font-mono text-[11px] text-hud-blue-light">
                {`[DONE_${String(activeIndex + 1).padStart(2, "0")}]`}
              </span>
              <h3 className="font-heading text-xl font-bold text-white">{projects[activeIndex].label}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{projects[activeIndex].description}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next project"
            className="absolute right-2 top-1/2 -translate-y-1/2 border border-border-technical bg-surface-slate p-2 text-white hover:border-hud-blue sm:right-6"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </>
  );
}

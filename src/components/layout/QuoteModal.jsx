import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { siteContent } from "../../data/siteContent";
import EstimateForm from "../ui/EstimateForm.jsx";

export default function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("open-quote-modal", open);
    return () => window.removeEventListener("open-quote-modal", open);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function close() {
    setIsOpen(false);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={siteContent.company.ctaText}
        className="themed-scrollbar relative my-8 max-h-[85vh] w-full max-w-lg overflow-y-auto border border-border-technical bg-surface-container p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-text-secondary hover:text-white"
        >
          <X size={22} />
        </button>

        <span className="mb-1 block font-mono text-[11px] text-hud-blue-light">[REQUEST_ESTIMATE]</span>
        <EstimateForm
          idPrefix="qm"
          heading={siteContent.company.ctaText}
          description="Tell us about your project and we'll get back to you shortly."
        />
      </div>
    </div>
  );
}

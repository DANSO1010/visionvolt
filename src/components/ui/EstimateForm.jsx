import { useState } from "react";

const projectTypes = ["Commercial", "Residential", "Industrial", "Multi-Family", "Government"];
const cameraCounts = ["1-5", "6-15", "16-32", "32+"];

const initialForm = {
  fullName: "",
  businessName: "",
  phone: "",
  email: "",
  projectType: projectTypes[0],
  cameraCount: cameraCounts[0],
  message: "",
};

const fieldClass =
  "w-full border-0 border-b border-border-technical bg-transparent px-0 py-2 text-sm text-white placeholder-text-secondary/60 focus:border-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-surface-slate";
const labelClass = "mb-1 block text-[11px] uppercase tracking-wide text-text-secondary";

export default function EstimateForm({ idPrefix = "estimate", heading, description, submitLabel = "SEND REQUEST" }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <h3 className="text-xl font-bold text-white">Thank you!</h3>
        <p className="mt-3 text-text-secondary">We received your request and will contact you shortly.</p>
      </div>
    );
  }

  return (
    <>
      {heading && <h3 className="text-xl font-bold text-white">{heading}</h3>}
      {description && <p className="mt-2 text-sm text-text-secondary">{description}</p>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className={labelClass} htmlFor={`${idPrefix}-fullName`}>
            Full Name
          </label>
          <input
            id={`${idPrefix}-fullName`}
            name="fullName"
            type="text"
            required
            value={form.fullName}
            onChange={handleChange}
            className={fieldClass}
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`${idPrefix}-businessName`}>
            Business Name
          </label>
          <input
            id={`${idPrefix}-businessName`}
            name="businessName"
            type="text"
            value={form.businessName}
            onChange={handleChange}
            className={fieldClass}
            placeholder="Company name (optional)"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`${idPrefix}-phone`}>
            Phone Number
          </label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            className={fieldClass}
            placeholder="(555) 555-5555"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`${idPrefix}-email`}>
            Email Address
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className={fieldClass}
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`${idPrefix}-projectType`}>
            Project Type
          </label>
          <select
            id={`${idPrefix}-projectType`}
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            className={`${fieldClass} appearance-none`}
          >
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-surface-container text-white">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor={`${idPrefix}-cameraCount`}>
            Number of Cameras
          </label>
          <select
            id={`${idPrefix}-cameraCount`}
            name="cameraCount"
            value={form.cameraCount}
            onChange={handleChange}
            className={`${fieldClass} appearance-none`}
          >
            {cameraCounts.map((count) => (
              <option key={count} value={count} className="bg-surface-container text-white">
                {count}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor={`${idPrefix}-message`}>
            Message / Project Details
          </label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            rows={3}
            value={form.message}
            onChange={handleChange}
            className={fieldClass}
            placeholder="Tell us about your project"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary-container px-5 py-3 font-mono text-sm font-bold text-background transition-all hover:scale-[1.02]"
        >
          {submitLabel}
        </button>
      </form>
    </>
  );
}

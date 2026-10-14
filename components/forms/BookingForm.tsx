"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  UploadCloud,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import {
  consentText,
  leadFormSchema,
  type LeadFormValues,
} from "@/lib/leadSchema";
import { services } from "@/data/services";
import { siteConfig, whatsappLink } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";

const serviceOptions = [
  "Free hair loss consultation",
  ...services.map((service) => service.title),
  "Not sure yet",
];

const inputClass =
  "h-12 w-full rounded-xl border border-gold/15 bg-bg/60 px-4 text-base text-ink placeholder:text-muted/50 outline-none transition-colors focus:border-gold/50 focus:ring-2 focus:ring-gold/25";
const labelClass =
  "mb-2 block text-[0.62rem] font-medium uppercase tracking-[0.2em] text-muted";
const errorClass = "mt-2 text-xs text-[#e6b3b3]";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

function buildMessage(values: LeadFormValues): string {
  return [
    `Hello ${siteConfig.name}, I would like to book a consultation.`,
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    values.email ? `Email: ${values.email}` : "",
    values.city ? `City: ${values.city}` : "",
    values.service ? `Service: ${values.service}` : "",
    values.preferredDate ? `Preferred date: ${values.preferredDate}` : "",
    values.preferredTime ? `Preferred time: ${values.preferredTime}` : "",
    values.message ? `Message: ${values.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      service: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
      consent: false,
    },
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [delivered, setDelivered] = useState(true);
  const [waLink, setWaLink] = useState("");

  const onPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setPhoto(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please upload an image file (JPG or PNG).");
      setPhoto(null);
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setPhotoError("Please upload an image under 5 MB.");
      setPhoto(null);
      return;
    }
    setPhoto(file);
  };

  const onSubmit = async (values: LeadFormValues) => {
    setServerError(null);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("city", values.city);
    formData.append("service", values.service);
    formData.append("preferredDate", values.preferredDate ?? "");
    formData.append("preferredTime", values.preferredTime ?? "");
    formData.append("message", values.message ?? "");
    formData.append("consent", String(values.consent));
    formData.append("source", "booking");
    if (photo) formData.append("photo", photo);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setStatus("error");
        setServerError(
          data.error ||
            "Something went wrong. Please try again or continue on WhatsApp."
        );
        return;
      }
      setDelivered(data.delivered !== false);
      setWaLink(whatsappLink(buildMessage(values)));
      setStatus("success");
    } catch {
      setStatus("error");
      setServerError("Network error. Please try again or continue on WhatsApp.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-gold/25 bg-surface/70 p-8 text-center sm:p-12"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-6 font-serif text-2xl text-ink sm:text-3xl">
          Thank you — your request is received
        </h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
          {delivered
            ? "Our team will contact you shortly to confirm your consultation."
            : "We could not send the confirmation email automatically, so please continue on WhatsApp to reach us instantly."}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Continue on WhatsApp
          </a>
          <Button
            variant="secondary"
            onClick={() => {
              reset();
              setPhoto(null);
              setStatus("idle");
            }}
          >
            Submit another request
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-gold/15 bg-surface/60 p-6 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name *
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
            {...register("name")}
          />
          {errors.name ? (
            <p className={errorClass}>{errors.name.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone / WhatsApp *
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+00 000 000 0000"
            className={inputClass}
            {...register("phone")}
          />
          {errors.phone ? (
            <p className={errorClass}>{errors.phone.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
            {...register("email")}
          />
          {errors.email ? (
            <p className={errorClass}>{errors.email.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="city" className={labelClass}>
            City *
          </label>
          <input
            id="city"
            type="text"
            autoComplete="address-level2"
            placeholder="Your city"
            className={inputClass}
            {...register("city")}
          />
          {errors.city ? (
            <p className={errorClass}>{errors.city.message}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="service" className={labelClass}>
            Service *
          </label>
          <select
            id="service"
            className={cn(inputClass, "appearance-none bg-[#100e0b]")}
            defaultValue=""
            {...register("service")}
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.service ? (
            <p className={errorClass}>{errors.service.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="preferredDate" className={labelClass}>
            Preferred date
          </label>
          <input
            id="preferredDate"
            type="date"
            className={cn(inputClass, "[color-scheme:dark]")}
            {...register("preferredDate")}
          />
        </div>

        <div>
          <label htmlFor="preferredTime" className={labelClass}>
            Preferred time
          </label>
          <input
            id="preferredTime"
            type="time"
            className={cn(inputClass, "[color-scheme:dark]")}
            {...register("preferredTime")}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="photo" className={labelClass}>
            Photo of your concern (optional)
          </label>
          <label
            htmlFor="photo"
            className="flex min-h-[3.5rem] cursor-pointer items-center justify-between gap-4 rounded-xl border border-dashed border-gold/25 bg-bg/40 px-4 py-3 transition-colors hover:border-gold/45"
          >
            <span className="flex items-center gap-3 text-sm text-muted">
              <UploadCloud className="h-5 w-5 text-gold" />
              {photo ? photo.name : "Upload an image (JPG/PNG, max 5 MB)"}
            </span>
            {photo ? (
              <button
                type="button"
                onClick={() => setPhoto(null)}
                aria-label="Remove photo"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/25 text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <span className="text-[0.6rem] uppercase tracking-[0.18em] text-gold">
                Choose
              </span>
            )}
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onPhotoChange}
          />
          {photoError ? <p className={errorClass}>{photoError}</p> : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Tell us briefly about your goals or concerns"
            className={cn(inputClass, "h-auto py-3")}
            {...register("message")}
          />
          {errors.message ? (
            <p className={errorClass}>{errors.message.message}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-7 rounded-2xl border border-gold/15 bg-bg/40 p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-0.5 h-6 w-6 shrink-0 rounded accent-[#D4AF37]"
            {...register("consent")}
          />
          <span className="text-xs leading-relaxed text-muted">
            {consentText}
          </span>
        </label>
        {errors.consent ? (
          <p className={errorClass}>{errors.consent.message}</p>
        ) : null}
      </div>

      {serverError ? (
        <p className="mt-5 rounded-xl border border-[#e6b3b3]/30 bg-[#e6b3b3]/5 px-4 py-3 text-sm text-[#e6b3b3]">
          {serverError}
        </p>
      ) : null}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gold-gradient text-sm font-semibold uppercase tracking-[0.18em] text-[#1b1404] shadow-gold-soft transition-all duration-300 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60 sm:w-auto sm:px-10"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Request Consultation
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        <a
          href={whatsappLink(
            `Hello ${siteConfig.name}, I would like to book a consultation.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/40 text-sm font-semibold uppercase tracking-[0.18em] text-[#25D366] transition-colors hover:bg-[#25D366]/10 sm:w-auto sm:px-8"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp Instead
        </a>
      </div>
    </form>
  );
}

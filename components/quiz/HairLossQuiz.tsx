"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";
import ScalpIllustration from "@/components/quiz/ScalpIllustration";
import {
  ageQuestion,
  directions,
  durationQuestion,
  familyQuestion,
  getStage,
  goalsQuestion,
  graftRangeLabel,
  quizDisclaimer,
  stagesFor,
  type Gender,
  type QuizOption,
} from "@/data/quiz";
import { consentText } from "@/lib/leadSchema";
import { siteConfig, whatsappLink } from "@/lib/siteConfig";
import { cn } from "@/lib/cn";

const FIELD_ORDER = [
  "gender",
  "age",
  "pattern",
  "duration",
  "family",
  "goals",
] as const;

type Field = (typeof FIELD_ORDER)[number];
type Answers = Record<Field, string>;

const initialAnswers: Answers = {
  gender: "",
  age: "",
  pattern: "",
  duration: "",
  family: "",
  goals: "",
};

function OptionButton({
  option,
  selected,
  onClick,
}: {
  option: QuizOption;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex min-h-[3.25rem] w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left text-[0.95rem] transition-all duration-300",
        selected
          ? "border-gold/60 bg-gold/10 text-ink"
          : "border-gold/15 text-ink/80 hover:border-gold/40 hover:bg-gold/5"
      )}
    >
      <span>{option.label}</span>
      <span
        className={cn(
          "grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors",
          selected ? "border-gold bg-gold" : "border-gold/30"
        )}
      >
        {selected ? (
          <CheckCircle2 className="h-5 w-5 text-[#1b1404]" />
        ) : null}
      </span>
    </button>
  );
}

function StageCard({
  stageId,
  label,
  title,
  level,
  gender,
  selected,
  onClick,
}: {
  stageId: string;
  label: string;
  title: string;
  level: number;
  gender: Gender;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      data-stage={stageId}
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl border p-4 text-center transition-all duration-300",
        selected
          ? "border-gold/60 bg-gold/10"
          : "border-gold/15 hover:border-gold/40 hover:bg-gold/5"
      )}
    >
      <ScalpIllustration
        variant={gender === "male" ? "norwood" : "ludwig"}
        level={level}
        className={cn(
          "h-[4.5rem] w-[4.5rem]",
          selected ? "text-gold" : "text-ink/40"
        )}
      />
      <span className="text-[0.58rem] uppercase tracking-[0.18em] text-gold/80">
        {label}
      </span>
      <span className="text-xs leading-snug text-muted">{title}</span>
    </button>
  );
}

export default function HairLossQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [finished, setFinished] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [waLink, setWaLink] = useState("");

  const totalSteps = FIELD_ORDER.length;
  const currentField = FIELD_ORDER[step];
  const stage = getStage(answers.pattern);
  const direction = stage ? directions[stage.directionKey] : directions.moderate;
  const gender: Gender = answers.gender === "female" ? "female" : "male";
  const stages = useMemo(() => stagesFor(gender), [gender]);

  const summary = useMemo(() => {
    if (!stage) return "";
    return [
      `Gender: ${gender}`,
      `Age: ${answers.age}`,
      `Pattern: ${stage.label}`,
      `Duration: ${answers.duration}`,
      `Family history: ${answers.family}`,
      `Goal: ${answers.goals}`,
    ].join("\n");
  }, [stage, gender, answers]);

  const progress = ((step + 1) / totalSteps) * 100;

  function setAnswer(field: Field, value: string) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }

  function next() {
    if (step < totalSteps - 1) setStep((prev) => prev + 1);
    else setFinished(true);
  }

  function back() {
    if (finished) {
      setFinished(false);
      setStep(totalSteps - 1);
      return;
    }
    setStep((prev) => Math.max(0, prev - 1));
  }

  function restart() {
    setAnswers(initialAnswers);
    setStep(0);
    setFinished(false);
    setDone(false);
    setError(null);
  }

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 2 || phone.trim().length < 7 || !consent) {
      setError("Please enter your name, a valid phone number and accept the consent.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("name", name.trim());
      body.append("phone", phone.trim());
      body.append("consent", "true");
      body.append("source", "quiz");
      body.append("answers", summary);
      const response = await fetch("/api/lead", { method: "POST", body });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setDone(true);
      setWaLink(
        whatsappLink(
          `Hello ${siteConfig.name}, I completed the hair loss quiz and would like to book a consultation.\n\n${summary}`
        )
      );
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const currentAnswered = Boolean(answers[currentField]);

  function renderQuestion() {
    if (currentField === "gender") {
      return (
        <div className="space-y-5">
          <h3 className="font-serif text-2xl leading-snug text-ink sm:text-[1.75rem]">
            Which best describes you?
          </h3>
          <p className="text-sm text-muted">
            This determines whether we use the Norwood or Ludwig scale.
          </p>
          <div className="space-y-3">
            {(["male", "female"] as const).map((value) => (
              <OptionButton
                key={value}
                option={{
                  value,
                  label: value === "male" ? "Male" : "Female",
                }}
                selected={answers.gender === value}
                onClick={() => setAnswer("gender", value)}
              />
            ))}
          </div>
        </div>
      );
    }

    if (currentField === "pattern") {
      return (
        <div className="space-y-5">
          <h3 className="font-serif text-2xl leading-snug text-ink sm:text-[1.75rem]">
            Which pattern looks closest to yours?
          </h3>
          <p className="text-sm text-muted">
            Choose the illustration that best matches your hair loss. Stylised
            for illustration only.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {stages.map((item) => (
              <StageCard
                key={item.id}
                stageId={item.id}
                label={item.label}
                title={item.title}
                level={item.level}
                gender={gender}
                selected={answers.pattern === item.id}
                onClick={() => setAnswer("pattern", item.id)}
              />
            ))}
          </div>
        </div>
      );
    }

    const question =
      currentField === "age"
        ? ageQuestion
        : currentField === "duration"
          ? durationQuestion
          : currentField === "family"
            ? familyQuestion
            : goalsQuestion;

    return (
      <div className="space-y-5">
        <h3 className="font-serif text-2xl leading-snug text-ink sm:text-[1.75rem]">
          {question.title}
        </h3>
        <p className="text-sm text-muted">{question.subtitle}</p>
        <div className="space-y-3">
          {question.options.map((option) => (
            <OptionButton
              key={option.value}
              option={option}
              selected={answers[currentField] === option.value}
              onClick={() => setAnswer(currentField, option.value)}
            />
          ))}
        </div>
      </div>
    );
  }

  function renderResult() {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-[0.58rem] uppercase tracking-[0.24em] text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            Your Suggested Direction
          </span>
          <h3 className="mt-5 font-serif text-3xl leading-tight text-ink sm:text-4xl">
            {direction.title}
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
            {direction.summary}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gold/15 bg-bg/40 p-5">
            <p className="text-[0.55rem] uppercase tracking-[0.22em] text-muted">
              Pattern
            </p>
            <p className="mt-1.5 font-serif text-xl text-ink">
              {stage?.label}
            </p>
            <p className="mt-3 text-[0.55rem] uppercase tracking-[0.22em] text-muted">
              Approx. grafts
            </p>
            <p className="mt-1.5 font-serif text-xl text-gold">
              {stage ? graftRangeLabel(stage.graftMin, stage.graftMax) : "—"}
            </p>
          </div>
          <div className="rounded-2xl border border-gold/15 bg-bg/40 p-5">
            <p className="text-[0.55rem] uppercase tracking-[0.22em] text-muted">
              What this may involve
            </p>
            <ul className="mt-3 space-y-2">
              {direction.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/85"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-gold/20 bg-surface/70 p-6 sm:p-7">
          {done ? (
            <div className="space-y-5 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
              <h4 className="font-serif text-2xl text-ink">
                Thank you — your request is in.
              </h4>
              <p className="mx-auto max-w-md text-sm text-muted">
                Our team will contact you shortly to arrange your free
                consultation.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                {waLink ? (
                  <Button href={waLink} variant="secondary">
                    Continue on WhatsApp
                  </Button>
                ) : null}
                <Button href="/book" variant="primary">
                  Book Free Consultation
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={submitLead} className="space-y-4" noValidate>
              <div>
                <h4 className="font-serif text-2xl text-ink">
                  Book your free consultation
                </h4>
                <p className="mt-2 text-sm text-muted">
                  Leave your details and our team will confirm a time that suits
                  you.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[0.58rem] uppercase tracking-[0.2em] text-muted">
                    Full name
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    className="h-12 w-full rounded-xl border border-gold/20 bg-bg/60 px-4 text-sm text-ink placeholder:text-muted/60 focus:border-gold/60 focus:outline-none"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[0.58rem] uppercase tracking-[0.2em] text-muted">
                    Phone number
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    autoComplete="tel"
                    className="h-12 w-full rounded-xl border border-gold/20 bg-bg/60 px-4 text-sm text-ink placeholder:text-muted/60 focus:border-gold/60 focus:outline-none"
                    placeholder="Your phone number"
                  />
                </label>
              </div>

              <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#d4af37]"
                />
                {consentText}
              </label>

              {error ? (
                <p className="text-xs text-red-400">{error}</p>
              ) : null}

              <Button type="submit" size="lg" fullWidth disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Book Free Consultation"
                )}
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-[0.68rem] leading-relaxed text-muted/80">
          {quizDisclaimer}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gold/15 bg-surface/60 p-6 sm:p-10">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gold-gradient"
            initial={false}
            animate={{ width: `${finished ? 100 : progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <span className="shrink-0 text-[0.58rem] uppercase tracking-[0.2em] text-muted">
          {finished ? "Result" : `Step ${step + 1} / ${totalSteps}`}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={finished ? "result" : currentField}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -28 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {finished ? renderResult() : renderQuestion()}
        </motion.div>
      </AnimatePresence>

      {!finished ? (
        <div className="mt-9 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <Button
            type="button"
            onClick={next}
            disabled={!currentAnswered}
            size="lg"
          >
            {step === totalSteps - 1 ? "See my result" : "Continue"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="mt-9 flex justify-center">
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Retake the quiz
          </button>
        </div>
      )}
    </div>
  );
}

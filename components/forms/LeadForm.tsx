"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, ChevronDown, Loader2 } from "lucide-react";
import { submitLead, validate, type FormField } from "@/lib/forms";
import { ArrowGlyph, arrowButtonClass } from "@/components/ui/ArrowButton";
import { easeOut } from "@/components/animations/variants";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-xl bg-card px-4 text-[1rem] text-ink ring-1 ring-line-strong transition-[box-shadow] duration-200 placeholder:text-stone/70 focus:ring-2 focus:ring-iris-ink focus:outline-none";

/**
 * Floating-label field: the label sits inside the box and, on focus or once there is a value, shrinks onto the
 * top border. Rounded box, 1.5px border that turns Sarai green on focus and when filled (red on error).
 */
const floatBox =
  "peer w-full rounded-2xl border-[1.5px] border-[#9e9e9e] bg-transparent px-4 py-3.5 text-[1rem] text-ink transition-[border-color] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] focus:border-cta focus:shadow-[0_0_0_3px_rgba(0,120,125,0.14)] focus:outline-none focus-visible:outline-none! aria-invalid:border-[#b42318] focus:aria-invalid:border-[#b42318] focus:aria-invalid:shadow-[0_0_0_3px_rgba(180,35,24,0.12)]";
const floatLabel =
  "pointer-events-none absolute top-0 left-3.5 z-10 origin-left bg-card px-1 text-[1rem] text-stone transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] peer-aria-invalid:text-[#b42318]";
/** Label resting position (inside the box) and floated position (on the border). */
const labelRest = "translate-y-[0.95rem] bg-transparent";
const labelUp = "-translate-y-1/2 scale-[0.8]";

function FloatingField({
  field,
  id,
  common,
  hasError,
}: {
  field: FormField;
  id: string;
  common: Record<string, unknown>;
  hasError: boolean;
}) {
  const required = field.required && (
    <span aria-hidden className="text-cta">
      {" "}
      *
    </span>
  );

  if (field.type === "select") {
    return (
      <div className="relative">
        <select
          {...common}
          defaultValue=""
          className={cn(
            floatBox,
            "min-h-[3.4rem] cursor-pointer appearance-none pr-10 valid:border-cta invalid:text-stone",
          )}
        >
          <option value="" disabled>
            Select…
          </option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-stone"
          aria-hidden
        />
        {/* a select always shows a value or "Select…", so its label stays on the border */}
        <label htmlFor={id} className={cn(floatLabel, labelUp, "bg-card peer-valid:text-cta peer-focus:text-cta")}>
          {field.label}
          {required}
        </label>
      </div>
    );
  }

  const labelState = cn(
    labelRest,
    "peer-focus:-translate-y-1/2 peer-focus:scale-[0.8] peer-focus:bg-card peer-focus:text-cta",
    "peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:scale-[0.8] peer-[:not(:placeholder-shown)]:bg-card peer-[:not(:placeholder-shown)]:text-cta",
  );

  return (
    <div className="relative">
      {field.type === "textarea" ? (
        <textarea
          {...common}
          rows={5}
          // the hint only appears once the field is focused, so it never collides with the label
          placeholder={field.placeholder ?? " "}
          className={cn(
            floatBox,
            "min-h-32 resize-y placeholder:text-transparent focus:placeholder:text-stone/70 [&:not(:placeholder-shown)]:border-cta",
            hasError && "border-[#b42318]",
          )}
        />
      ) : (
        <input
          {...common}
          type={field.type}
          inputMode={field.type === "email" ? "email" : undefined}
          placeholder=" "
          className={cn(
            floatBox,
            "min-h-[3.4rem] [&:not(:placeholder-shown)]:border-cta",
            hasError && "border-[#b42318]",
          )}
        />
      )}
      <label htmlFor={id} className={cn(floatLabel, labelState)}>
        {field.label}
        {required}
      </label>
    </div>
  );
}

export function LeadForm({
  formId,
  fields,
  submitLabel,
  successTitle,
  successBody,
  floatingLabels = false,
}: {
  formId: string;
  fields: FormField[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  /** Use floating-label inputs instead of labels above the fields. */
  floatingLabels?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const nextErrors = validate(fields, data);
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      await submitLead({ ...data, formId });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const onBlur = (field: FormField, value: string) => {
    if (!errors[field.name]) return;
    const err = validate([field], { [field.name]: value })[field.name];
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[field.name] = err;
      else delete next[field.name];
      return next;
    });
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="flex min-h-[420px] flex-col items-start justify-center rounded-3xl bg-card p-8 ring-1 ring-line sm:p-10"
            role="status"
          >
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-success-soft text-success">
              <Check className="size-6" aria-hidden />
            </span>
            <h2 className="mt-6 heading-sub text-4xl">{successTitle}</h2>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-stone">{successBody}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            onSubmit={onSubmit}
            noValidate
            className="rounded-3xl bg-card/60 p-6 ring-1 ring-line sm:p-8"
            aria-describedby="form-required-note"
          >
            <p id="form-required-note" className="mb-6 text-sm text-stone">
              Fields marked <span aria-hidden>*</span>
              <span className="sr-only">with an asterisk</span> are required.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((f) => {
                const id = `${formId}-${f.name}`;
                const errId = `${id}-error`;
                const err = errors[f.name];
                const common = {
                  id,
                  name: f.name,
                  required: f.required,
                  autoComplete: f.autoComplete,
                  "aria-invalid": err ? true : undefined,
                  "aria-describedby": err ? errId : undefined,
                  onBlur: (e: { currentTarget: { value: string } }) => onBlur(f, e.currentTarget.value),
                };
                if (floatingLabels) {
                  return (
                    <div key={f.name} className={cn(!f.half && "sm:col-span-2")}>
                      <FloatingField field={f} id={id} common={common} hasError={!!err} />
                      {err && (
                        <p id={errId} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[#b42318]">
                          <AlertCircle className="size-4 shrink-0" aria-hidden /> {err}
                        </p>
                      )}
                    </div>
                  );
                }
                return (
                  <div key={f.name} className={cn(!f.half && "sm:col-span-2")}>
                    <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
                      {f.label}
                      {f.required && (
                        <span aria-hidden className="text-cta">
                          {" "}
                          *
                        </span>
                      )}
                    </label>
                    {f.type === "select" ? (
                      <div className="relative">
                        <select
                          {...common}
                          defaultValue=""
                          className={cn(
                            inputBase,
                            "min-h-12 cursor-pointer appearance-none pr-10",
                            err && "ring-2 ring-[#b42318]",
                          )}
                        >
                          <option value="" disabled>
                            Select…
                          </option>
                          {f.options?.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-stone"
                          aria-hidden
                        />
                      </div>
                    ) : f.type === "textarea" ? (
                      <textarea
                        {...common}
                        rows={5}
                        placeholder={f.placeholder}
                        className={cn(inputBase, "resize-y py-3", err && "ring-2 ring-[#b42318]")}
                      />
                    ) : (
                      <input
                        {...common}
                        type={f.type}
                        inputMode={f.type === "email" ? "email" : undefined}
                        placeholder={f.placeholder}
                        className={cn(inputBase, "min-h-12", err && "ring-2 ring-[#b42318]")}
                      />
                    )}
                    {err && (
                      <p id={errId} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[#b42318]">
                        <AlertCircle className="size-4 shrink-0" aria-hidden /> {err}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {status === "error" && (
              <p
                role="alert"
                className="mt-6 flex items-center gap-2 rounded-xl bg-[#fdecea] px-4 py-3 text-sm font-medium text-[#b42318]"
              >
                <AlertCircle className="size-4 shrink-0" aria-hidden /> We couldn&apos;t send your message. Check your
                connection and try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className={cn(
                arrowButtonClass("primary", "sm"),
                "mt-8 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70",
              )}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
                </>
              ) : (
                <>
                  {submitLabel}
                  <ArrowGlyph />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

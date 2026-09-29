"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, Check, ChevronDown, Loader2 } from "lucide-react";
import { submitLead, validate, type FormField } from "@/lib/forms";
import { buttonClass } from "@/components/ui/primitives";
import { easeOut } from "@/components/animations/variants";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-xl bg-card px-4 text-[1rem] text-ink ring-1 ring-line-strong transition-[box-shadow] duration-200 placeholder:text-stone/70 focus:ring-2 focus:ring-iris-ink focus:outline-none";

export function LeadForm({
  formId,
  fields,
  submitLabel,
  successTitle,
  successBody,
}: {
  formId: string;
  fields: FormField[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
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
                return (
                  <div key={f.name} className={cn(!f.half && "sm:col-span-2")}>
                    <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
                      {f.label}
                      {f.required && (
                        <span aria-hidden className="text-iris-ink">
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
              className={cn(buttonClass("primary", "lg"), "mt-8 w-full sm:w-auto")}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
                </>
              ) : (
                <>
                  {submitLabel}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

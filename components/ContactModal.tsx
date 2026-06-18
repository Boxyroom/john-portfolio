"use client";

import {
  createContext,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ContactModalContextValue = {
  openContactModal: (trigger?: HTMLElement | null) => void;
};

type ContactFormState = {
  company: string;
  email: string;
  message: string;
  name: string;
};

const initialFormState: ContactFormState = {
  company: "",
  email: "",
  message: "",
  name: "",
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function submitContactMessage(_formState: ContactFormState) {
  const response = await fetch("/api/contact", {
    body: JSON.stringify(_formState),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Unable to send message.");
  }
}

export function useContactModal() {
  const context = useContext(ContactModalContext);

  if (!context) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }

  return context;
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [formState, setFormState] = useState<ContactFormState>(initialFormState);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const successCloseRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const isValid = useMemo(
    () =>
      formState.name.trim().length > 0 &&
      isValidEmail(formState.email.trim()) &&
      formState.message.trim().length > 0,
    [formState],
  );

  function closeContactModal() {
    setIsOpen(false);
    setErrorMessage("");
    setFormState(initialFormState);
    setIsSending(false);
    setIsSubmitted(false);
  }

  function openContactModal(trigger?: HTMLElement | null) {
    triggerRef.current = trigger ?? null;
    setErrorMessage("");
    setFormState(initialFormState);
    setIsSending(false);
    setIsSubmitted(false);
    setIsOpen(true);
  }

  function handleBackdropMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      closeContactModal();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeContactModal();
      return;
    }

    if (event.key !== "Tab" || !dialogRef.current) {
      return;
    }

    const focusableElements = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid || isSending) {
      return;
    }

    setErrorMessage("");
    setIsSending(true);

    try {
      await submitContactMessage(formState);
      setIsSubmitted(true);
    } catch {
      setErrorMessage(
        "Unable to send message.\n\nPlease try again in a moment.",
      );
    } finally {
      setIsSending(false);
    }
  }

  useEffect(() => {
    if (!isOpen) {
      triggerRef.current?.focus();
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => {
      if (isSubmitted) {
        successCloseRef.current?.focus();
        return;
      }

      firstFieldRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, isSubmitted]);

  return (
    <ContactModalContext.Provider value={{ openContactModal }}>
      {children}
      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/85 px-4 py-6 backdrop-blur-sm"
          onKeyDown={handleKeyDown}
          onMouseDown={handleBackdropMouseDown}
        >
          <div
            aria-describedby={
              isSubmitted ? "contact-success-message" : "contact-modal-subtitle"
            }
            aria-labelledby="contact-modal-title"
            aria-modal="true"
            className="max-h-[calc(100vh-3rem)] w-full max-w-2xl overflow-y-auto rounded-sm border border-copper/35 bg-charcoal-2 p-6 text-bone shadow-glow sm:p-8"
            ref={dialogRef}
            role="dialog"
          >
            {isSubmitted ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                <h2
                  className="text-3xl font-black uppercase leading-tight text-bone sm:text-4xl"
                  id="contact-modal-title"
                >
                  MESSAGE SENT
                </h2>
                <p
                  className="body-copy mt-4 max-w-md"
                  id="contact-success-message"
                >
                  I'll get back to you as soon as possible.
                </p>
                <button
                  className="btn-primary mt-8"
                  onClick={closeContactModal}
                  ref={successCloseRef}
                  type="button"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="section-kicker">Contact</p>
                    <h2
                      className="mt-4 text-3xl font-black leading-tight text-bone sm:text-4xl"
                      id="contact-modal-title"
                    >
                      Let's Talk
                    </h2>
                    <p
                      className="body-copy mt-4 max-w-xl"
                      id="contact-modal-subtitle"
                    >
                      Interested in working together? Send me a message and
                      I'll get back to you as soon as possible.
                    </p>
                  </div>
                  <button
                    aria-label="Close contact form"
                    className="shrink-0 rounded-sm border border-bone/20 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-bone-muted hover:border-copper hover:text-copper-bright focus:outline-none focus:ring-2 focus:ring-copper-bright focus:ring-offset-2 focus:ring-offset-charcoal"
                    onClick={closeContactModal}
                    type="button"
                  >
                    Close
                  </button>
                </div>

                <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
                  {errorMessage ? (
                    <div
                      className="rounded-sm border border-copper/35 bg-copper/10 p-4 text-sm font-bold leading-6 text-bone"
                      role="alert"
                    >
                      {errorMessage.split("\n").map((line, index) => (
                        <p className={index === 0 ? "" : "mt-2"} key={index}>
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        className="text-sm font-black uppercase tracking-[0.12em] text-copper-bright"
                        htmlFor="contact-name"
                      >
                        Name
                      </label>
                      <input
                        className="mt-2 w-full rounded-sm border border-bone/10 bg-charcoal px-4 py-3 text-base font-semibold text-bone outline-none focus:border-copper focus:ring-2 focus:ring-copper-bright"
                        id="contact-name"
                        name="name"
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                        ref={firstFieldRef}
                        required
                        type="text"
                        value={formState.name}
                      />
                    </div>
                    <div>
                      <label
                        className="text-sm font-black uppercase tracking-[0.12em] text-copper-bright"
                        htmlFor="contact-company"
                      >
                        Company
                      </label>
                      <input
                        className="mt-2 w-full rounded-sm border border-bone/10 bg-charcoal px-4 py-3 text-base font-semibold text-bone outline-none focus:border-copper focus:ring-2 focus:ring-copper-bright"
                        id="contact-company"
                        name="company"
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            company: event.target.value,
                          }))
                        }
                        type="text"
                        value={formState.company}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="text-sm font-black uppercase tracking-[0.12em] text-copper-bright"
                      htmlFor="contact-email"
                    >
                      Email
                    </label>
                    <input
                      className="mt-2 w-full rounded-sm border border-bone/10 bg-charcoal px-4 py-3 text-base font-semibold text-bone outline-none focus:border-copper focus:ring-2 focus:ring-copper-bright"
                      id="contact-email"
                      name="email"
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                      required
                      type="email"
                      value={formState.email}
                    />
                  </div>

                  <div>
                    <label
                      className="text-sm font-black uppercase tracking-[0.12em] text-copper-bright"
                      htmlFor="contact-message"
                    >
                      Message
                    </label>
                    <textarea
                      className="mt-2 min-h-[180px] w-full resize-y rounded-sm border border-bone/10 bg-charcoal px-4 py-3 text-base font-semibold text-bone outline-none focus:border-copper focus:ring-2 focus:ring-copper-bright"
                      id="contact-message"
                      name="message"
                      onChange={(event) =>
                        setFormState((current) => ({
                          ...current,
                          message: event.target.value,
                        }))
                      }
                      required
                      value={formState.message}
                    />
                  </div>

                  <button
                    className="btn-primary disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:bg-copper"
                    disabled={!isValid || isSending}
                    type="submit"
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      ) : null}
    </ContactModalContext.Provider>
  );
}

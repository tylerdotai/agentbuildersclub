import type { Locale } from "@/lib/i18n/config";

export const newsletterUiCopy = {
  en: {
    back: "← The Drop",
    issue: "Issue",
    published: "Published",
    nextNode: "Live calendar",
    rsvp: "RSVP Now →",
    older: "← Older",
    newer: "Newer →",
    readFull: "Read full issue →",
    pastIssues: "Past Issues",
    read: "Read →",
    subscribeHeading: "GET THE NEXT DROP.",
    subscribeText: "Event reminders, builder spotlights, and DFW AI community updates. No spam.",
    success: "You're in. Watch your inbox for updates.",
    error: "Something went wrong. Try again.",
    emailLabel: "Email address",
    emailPlaceholder: "your@email.com",
    subscribe: "Subscribe",
  },
  es: {
    back: "← The Drop",
    issue: "Edición",
    published: "Publicado",
    nextNode: "Calendario en vivo",
    rsvp: "RSVP ahora →",
    older: "← Anterior",
    newer: "Más reciente →",
    readFull: "Leer edición completa →",
    pastIssues: "Ediciones anteriores",
    read: "Leer →",
    subscribeHeading: "RECIBE EL PRÓXIMO DROP.",
    subscribeText: "Recordatorios de eventos, highlights de builders y updates de la comunidad de IA en DFW. Sin spam.",
    success: "Estás dentro. Revisa tu inbox para updates.",
    error: "Algo salió mal. Inténtalo de nuevo.",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@email.com",
    subscribe: "Suscribirse",
  },
} satisfies Record<Locale, Record<string, string>>;

export function translateIssue<T>(issue: T, _locale?: Locale): T {
  void _locale;
  return issue;
}

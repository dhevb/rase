import { SMK_6_PUBLIC_REGISTRATION_CARDS } from "@/data/smk-6-external-registrations";

export type HomeRegistrationTypeCard = {
  label: string;
  fee: string;
  hint: string;
  href: string;
  external?: boolean;
};

/** Homepage registration overview — same order and destinations as the public hub. */
export const HOME_REGISTRATION_TYPES: HomeRegistrationTypeCard[] =
  SMK_6_PUBLIC_REGISTRATION_CARDS.map((card) => ({
    label: card.label,
    fee: card.badge,
    hint: card.hint,
    href: card.href,
    external: card.external,
  }));

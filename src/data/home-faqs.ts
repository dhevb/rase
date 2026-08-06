import type { FaqItem } from "@/lib/cms/faq";
import { SITE_URL } from "@/config/site";
import { CMT_SUBMISSION_URL } from "@/lib/registration/config";
import { DHE_ORGANIZATION } from "@/config/organization";
import {
  PROJECT_COLLEGE_STUDENT_FEE,
  PROJECT_SCHOOL_STUDENT_FEE,
} from "@/lib/registration/fees";

const SUPPORT_EMAIL = DHE_ORGANIZATION.emails[1];

export const HOME_DEFAULT_FAQS: FaqItem[] = [
  {
    question: "What is Shiksha Mahakumbh Abhiyan?",
    answer:
      "A national–international multidisciplinary education movement aligned with NEP 2020 and Bharat@2047.",
  },
  {
    question: "When is Shiksha Mahakumbh 6.0?",
    answer: "9–11 October 2026 at NIT Hamirpur, Himachal Pradesh, India.",
  },
  {
    question: "How do I register for Shiksha Mahakumbh 6.0?",
    answer: `Use the unified registration portal at ${SITE_URL}/registration for delegates, conclaves, olympiads, awards, exhibitions, projects, and cultural programmes.`,
  },
  {
    question: "Which categories are free vs paid?",
    answer: `Conclave, Awards, Olympiad, Exhibition, Best Practices, Shodhankur, and Cultural Program use free on-site forms. Projects: ₹${PROJECT_SCHOOL_STUDENT_FEE} (school level) · ₹${PROJECT_COLLEGE_STUDENT_FEE} (college/university) via online payment. Delegate fees vary by category.`,
  },
  {
    question: "How do I submit to the Multi Track Conference?",
    answer:
      "Use the official Microsoft CMT portal for paper and abstract submissions, deadlines, and peer review.",
  },
  {
    question: "Is accommodation available?",
    answer:
      "Accommodation booking opens in September 2026. Lodging cannot be selected during registration yet — watch the notice board for official updates.",
  },
  {
    question: "I did not receive my confirmation email",
    answer: `Check your inbox, spam, and Promotions folders. On the registration success page, use Resend confirmation email if needed. For help, email ${SUPPORT_EMAIL} with your SMK registration ID.`,
  },
  {
    question: "How do I access my registration after signing up?",
    answer: `Visit ${SITE_URL}/dashboard with your registration ID and the email address you used when registering.`,
  },
];

export const HOME_FAQ_CMT_URL = CMT_SUBMISSION_URL;

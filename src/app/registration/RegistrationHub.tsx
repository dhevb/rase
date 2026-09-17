"use client";

import { useCallback, useEffect, useMemo, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import RegistrationShell from "@/components/registration/RegistrationShell";
import { RegistrationType } from "@/types/registration";
import RegistrationProgress from "@/components/registration/RegistrationProgress";
import CategoryStep from "@/components/registration/CategoryStep";
import CategoryInstructionsPanel from "@/components/registration/CategoryInstructionsPanel";
import {
  ConclaveExternalSelector,
  GoogleFormRegistrationPanel,
} from "@/components/registration/Smk6ExternalRegistrationPanels";
import { loadMeta, saveMeta, switchRegistrationCategory, clearRegistrationMeta, clearDraft } from "@/lib/registration/draftStorage";
import { RegistrationFlowProvider, useRegistrationFlow } from "@/components/registration/RegistrationFlowContext";
import RegistrationHoneypot from "@/components/registration/RegistrationHoneypot";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/events";
import RegistrationTrustBar from "@/components/registration/RegistrationTrustBar";
import {
  isExternalRedirectType,
  usesMultiStepPaymentFlow,
} from "@/lib/registration/config";
import {
  isSmk6ConclaveSelectorType,
  isSmk6GoogleFormRegistrationType,
} from "@/data/smk-6-external-registrations";
import ProgrammeSupportPanel from "@/components/contact/ProgrammeSupportPanel";
import { getOfficialContactByRegistrationType } from "@/data/smk-6-official-contacts";
import { loadRazorpayCheckoutScript } from "@/lib/razorpay/load-checkout-script";

const VALID_TYPES = [
  "Delegate Registration",
  "Multi Track Conference",
  "Conclave",
  "Best Practices",
  "Olympiad",
  "Awards",
  "Exhibition",
  "Projects",
  "Shodhankur",
  "Cultural Program",
  "Accommodation",
] as const satisfies readonly RegistrationType[];

function isRegistrationType(value: string | null): value is RegistrationType {
  return Boolean(value && (VALID_TYPES as readonly string[]).includes(value));
}

function usesOnSiteForm(type: RegistrationType): boolean {
  return (
    !isExternalRedirectType(type) &&
    !isSmk6ConclaveSelectorType(type) &&
    !isSmk6GoogleFormRegistrationType(type)
  );
}

const DelegateForm = dynamic(() => import("@/components/forms/DelegateForm"));
const ConclaveForm = dynamic(() => import("@/components/forms/ConclaveForm"));
const BestPracticeForm = dynamic(() => import("@/components/forms/BestPracticeForm"));
const OlympiadForm = dynamic(() => import("@/components/forms/OlympiadForm"));
const AwardsForm = dynamic(() => import("@/components/forms/AwardsForm"));
const GenericRegistrationForm = dynamic(
  () => import("@/components/forms/GenericRegistrationForm")
);

function RegistrationFormRouter({
  type,
  step,
  onContinueToPayment,
  showPaymentStep,
}: {
  type: RegistrationType;
  step: number;
  onContinueToPayment: () => void;
  showPaymentStep: boolean;
}) {
  const visibilityClass = showPaymentStep
    ? step === 2
      ? "[&_.registration-payment]:hidden [&_button[type=submit]]:hidden"
      : step === 3
        ? "[&_.registration-details]:hidden"
        : "[&_.registration-details]:hidden [&_.registration-payment]:hidden"
    : "";

  const form = useMemo(() => {
    switch (type) {
      case "Delegate Registration":
        return <DelegateForm />;
      case "Conclave":
        return <ConclaveForm />;
      case "Best Practices":
        return <BestPracticeForm />;
      case "Olympiad":
        return <OlympiadForm />;
      case "Awards":
        return <AwardsForm />;
      case "Exhibition":
        return (
          <GenericRegistrationForm
            registrationType="Exhibition"
            sectionTitle="Exhibition Registration"
          />
        );
      case "Cultural Program":
        return (
          <GenericRegistrationForm
            registrationType="Cultural Program"
            sectionTitle="Cultural Program Registration"
          />
        );
      default:
        return null;
    }
  }, [type]);

  return (
    <div className={visibilityClass}>
      {form}
      {showPaymentStep && step === 2 && (
        <button
          type="button"
          onClick={onContinueToPayment}
          className="mt-4 w-full min-h-[48px] rounded-xl bg-brand-saffron font-bold text-brand-navy shadow-lg transition hover:bg-brand-saffron-dark hover:text-white"
        >
          Continue to payment &amp; confirmation →
        </button>
      )}
    </div>
  );
}

export default function RegistrationHub() {
  return (
    <RegistrationFlowProvider>
      <Suspense fallback={<p className="px-4 py-6 text-sm text-slate-600">Loading registration…</p>}>
        <RegistrationHubInner />
      </Suspense>
    </RegistrationFlowProvider>
  );
}

function RegistrationHubInner() {
  const [step, setStep] = useState(1);
  const [registrationType, setRegistrationType] =
    useState<RegistrationType>("Delegate Registration");
  const [detailsSelected, setDetailsSelected] = useState(false);
  const flow = useRegistrationFlow();
  const currentFee = flow?.currentFee ?? 0;
  const metaLoadedRef = useRef(false);
  const searchParams = useSearchParams();

  const showPaymentStep = usesMultiStepPaymentFlow(registrationType, currentFee);
  const showOnSiteForm = usesOnSiteForm(registrationType);

  useEffect(() => {
    if (!flow) return;
    return flow.registerPaymentVerifiedHandler(() => {
      setStep(3);
      saveMeta({
        step: 3,
        registrationType,
        updatedAt: new Date().toISOString(),
      });
      window.scrollTo(0, 0);
    });
  }, [flow, registrationType]);

  useEffect(() => {
    if (metaLoadedRef.current) return;
    metaLoadedRef.current = true;
    const requested = searchParams.get("category");
    if (isRegistrationType(requested) && !isExternalRedirectType(requested)) {
      if (isSmk6ConclaveSelectorType(requested) || isSmk6GoogleFormRegistrationType(requested)) {
        setStep(1);
        setDetailsSelected(false);
        if (isSmk6ConclaveSelectorType(requested)) {
          window.requestAnimationFrame(() => {
            document.getElementById("conclave-registration")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          });
        }
        return;
      }
      setRegistrationType(requested);
      setDetailsSelected(true);
      switchRegistrationCategory(requested);
      setStep(2);
      return;
    }
    const meta = loadMeta();
    if (meta?.registrationType && !isExternalRedirectType(meta.registrationType)) {
      if (
        isSmk6ConclaveSelectorType(meta.registrationType) ||
        isSmk6GoogleFormRegistrationType(meta.registrationType)
      ) {
        setRegistrationType("Delegate Registration");
        setDetailsSelected(false);
        setStep(1);
        return;
      }
      setRegistrationType(meta.registrationType);
      setDetailsSelected(true);
      if (meta.step >= 2) {
        const maxStep = usesMultiStepPaymentFlow(meta.registrationType, currentFee)
          ? 3
          : 2;
        setStep(Math.min(meta.step, maxStep));
      }
    }
  }, [currentFee, searchParams]);

  useEffect(() => {
    if (step > 1 && !isExternalRedirectType(registrationType)) {
      saveMeta({
        step,
        registrationType,
        updatedAt: new Date().toISOString(),
      });
    }
  }, [step, registrationType]);

  useEffect(() => {
    if (!showPaymentStep && step === 3) {
      setStep(2);
    }
  }, [showPaymentStep, step]);

  useEffect(() => {
    if (!showPaymentStep || step !== 3) return;
    void loadRazorpayCheckoutScript().catch((err) => {
      console.error("RAZORPAY_SCRIPT_LOAD_FAILED", {
        phase: "hub_payment_step",
        error: err instanceof Error ? err.message : String(err),
      });
    });
  }, [showPaymentStep, step]);

  const goToPayment = useCallback(async () => {
    const ok = (await flow?.requestPaymentStep()) ?? true;
    if (!ok) return;
    setStep(3);
    window.scrollTo(0, 0);
  }, [flow]);

  return (
    <>
      <RegistrationHoneypot
        value={flow?.honeypotValue ?? ""}
        onChange={(value) => flow?.setHoneypotValue(value)}
      />
      <RegistrationShell
        title="Shiksha Mahakumbh 6.0 Registration"
        subtitle="Official registration — choose a category below"
        sidebar={
          step >= 2 && !isExternalRedirectType(registrationType) ? (
            <CategoryInstructionsPanel registrationType={registrationType} />
          ) : undefined
        }
      >
        {step >= 2 ? (
          <RegistrationProgress
            currentStep={step}
            requiresPayment={showPaymentStep}
          />
        ) : null}
        <RegistrationTrustBar />

        {step === 1 && (
          <CategoryStep
            value={registrationType}
            detailsSelected={detailsSelected}
            onContinue={() => {
              if (isExternalRedirectType(registrationType)) return;
              if (isSmk6ConclaveSelectorType(registrationType) || isSmk6GoogleFormRegistrationType(registrationType)) {
                return;
              }
              trackEvent(ANALYTICS_EVENTS.registrationStarted, {
                registrationType,
                step: 2,
              });
              setStep(2);
            }}
          />
        )}

        {step >= 2 && !isExternalRedirectType(registrationType) && (
          <div className="space-y-4" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
              <span>
                <strong className="text-brand-navy">
                  {registrationType === "Shodhankur"
                    ? "Shodhankur – छात्र शोध पत्रिका"
                    : registrationType === "Projects"
                      ? "Student Projects"
                      : registrationType}
                </strong>
                {showPaymentStep ? (
                  <span className="ml-2 text-xs text-amber-700">(Paid registration)</span>
                ) : isSmk6GoogleFormRegistrationType(registrationType) ||
                  isSmk6ConclaveSelectorType(registrationType) ? (
                  <span className="ml-2 text-xs text-violet-800">(Official Google Form)</span>
                ) : (
                  <span className="ml-2 text-xs text-emerald-700">(Free registration)</span>
                )}
              </span>
              <button
                type="button"
                className="font-semibold text-brand-saffron underline"
                onClick={() => {
                  clearDraft(registrationType);
                  clearRegistrationMeta();
                  setRegistrationType("Delegate Registration");
                  setDetailsSelected(false);
                  setStep(1);
                  flow?.setCurrentFee(0);
                }}
              >
                Change category
              </button>
            </div>

            <ProgrammeSupportPanel
              contact={getOfficialContactByRegistrationType(registrationType)}
              title="Need help with this registration?"
            />

            {step === 2 && showOnSiteForm && (
              <p className="text-sm text-slate-600">
                {showPaymentStep
                  ? "Fill your details below. Progress is saved automatically if you leave this page."
                  : "Complete your details and submit — no payment required for this category."}
              </p>
            )}
            {showPaymentStep && step === 3 && (
              <p className="text-sm text-slate-600">
                Complete payment and submit your registration. Paid registrations are
                generally non-refundable once confirmed — see the{" "}
                <Link href="/refund-policy" className="font-semibold text-brand-saffron underline">
                  refund policy
                </Link>
                .
              </p>
            )}

            {isSmk6ConclaveSelectorType(registrationType) ? (
              <ConclaveExternalSelector />
            ) : isSmk6GoogleFormRegistrationType(registrationType) ? (
              <GoogleFormRegistrationPanel type={registrationType} />
            ) : (
              <RegistrationFormRouter
                key={registrationType}
                type={registrationType}
                step={step}
                onContinueToPayment={goToPayment}
                showPaymentStep={showPaymentStep}
              />
            )}

            {showPaymentStep && step === 3 && (
              <button
                type="button"
                className="text-sm font-semibold text-brand-navy underline"
                onClick={() => setStep(2)}
              >
                ← Back to details
              </button>
            )}
          </div>
        )}
      </RegistrationShell>
    </>
  );
}

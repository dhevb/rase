"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  isRazorpayCheckoutReady,
  loadRazorpayCheckoutScript,
} from "@/lib/razorpay/load-checkout-script";

export type RazorpayPaymentResult = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  verified: boolean;
};

type RazorpayHandlerResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type PendingPayment = RazorpayHandlerResponse & { amountPaise: number };

const PENDING_PAYMENT_KEY = "smk_pending_razorpay_payment";

function readPendingPayment(): PendingPayment | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PENDING_PAYMENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingPayment;
    if (
      parsed.razorpay_payment_id?.startsWith("pay_") &&
      parsed.razorpay_order_id?.startsWith("order_") &&
      parsed.razorpay_signature
    ) {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function savePendingPayment(payment: PendingPayment) {
  sessionStorage.setItem(PENDING_PAYMENT_KEY, JSON.stringify(payment));
}

function clearPendingPayment() {
  sessionStorage.removeItem(PENDING_PAYMENT_KEY);
}

function isWebsiteMismatchError(message: string): boolean {
  const lower = message.toLowerCase();
  return (
    lower.includes("website") ||
    lower.includes("unregistered") ||
    lower.includes("domain") ||
    lower.includes("mismatch")
  );
}

const WEBSITE_MISMATCH_HELP =
  "Razorpay has not approved www.rase.co.in for this merchant account yet. Ask the account owner to add https://www.rase.co.in and https://rase.co.in under Razorpay → Account & Settings → Website. Do not pay again until this is fixed.";

async function verifyPaymentWithRetry(
  response: RazorpayHandlerResponse,
  amountPaise: number,
  orderNotes?: Record<string, string>
): Promise<{ ok: true; duplicate?: boolean; registration_id?: string } | { ok: false; error: string }> {
  const body = {
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_order_id: response.razorpay_order_id,
    razorpay_signature: response.razorpay_signature,
    amount_paise: amountPaise,
    metadata: orderNotes,
  };

  let lastError = "Payment verification failed";

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const verifyRes = await fetch("/api/payments/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const verifyData = (await verifyRes.json()) as {
        ok?: boolean;
        duplicate?: boolean;
        registration_id?: string;
        error?: string;
      };

      if (verifyRes.ok && verifyData.ok) {
        return {
          ok: true,
          duplicate: verifyData.duplicate,
          registration_id: verifyData.registration_id,
        };
      }

      lastError = verifyData.error ?? lastError;

      if (verifyRes.status >= 400 && verifyRes.status < 500 && verifyRes.status !== 429) {
        break;
      }
    } catch (err) {
      lastError = err instanceof Error ? err.message : lastError;
    }

    if (attempt < 3) {
      await new Promise((r) => window.setTimeout(r, attempt * 800));
    }
  }

  return { ok: false, error: lastError };
}

type RazorpayInstance = {
  open: () => void;
  on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void;
};

type RazorpayConstructor = new (options: Record<string, unknown>) => RazorpayInstance;

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

type RazorpayCheckoutProps = {
  /** Fee in rupees (INR) */
  amountInRupees: number;
  receipt?: string;
  description?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  /** Passed to Razorpay order notes for webhook / audit traceability */
  orderNotes?: Record<string, string>;
  disabled?: boolean;
  className?: string;
  onSuccess?: (result: RazorpayPaymentResult) => void;
  onDismiss?: () => void;
};

export default function RazorpayCheckout({
  amountInRupees,
  receipt,
  description = "Registration Fee",
  customerName,
  customerEmail,
  customerPhone,
  orderNotes,
  disabled = false,
  className,
  onSuccess,
  onDismiss,
}: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(false);
  const [verified, setVerified] = useState(false);
  const [pendingPayment, setPendingPayment] = useState<PendingPayment | null>(null);

  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  useEffect(() => {
    setPendingPayment(readPendingPayment());
  }, []);

  useEffect(() => {
    let cancelled = false;
    void loadRazorpayCheckoutScript()
      .then(() => {
        if (!cancelled) {
          setScriptReady(isRazorpayCheckoutReady());
          setScriptFailed(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setScriptReady(false);
          setScriptFailed(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const processPaymentResponse = useCallback(
    async (response: RazorpayHandlerResponse, amountPaise: number) => {
      const verifiedResult = await verifyPaymentWithRetry(response, amountPaise, orderNotes);

      if (!verifiedResult.ok) {
        console.error("PAYMENT_VERIFY_FAILED", {
          payment_id: response.razorpay_payment_id,
          error: verifiedResult.error,
        });
        const pending: PendingPayment = { ...response, amountPaise };
        savePendingPayment(pending);
        setPendingPayment(pending);
        onSuccess?.({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          verified: false,
        });
        toast.error(
          `Payment ID ${response.razorpay_payment_id} saved. Tap "Verify payment" below — do not pay again.`
        );
        return;
      }

      clearPendingPayment();
      setPendingPayment(null);

      if (verifiedResult.duplicate && verifiedResult.registration_id) {
        toast.success(
          `Payment already linked to registration ${verifiedResult.registration_id}. Submit the form or check your email.`
        );
      } else {
        console.info("PAYMENT_VERIFIED", {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
        });
        toast.success("Payment verified!");
      }

      setVerified(true);
      onSuccess?.({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        verified: true,
      });
    },
    [onSuccess, orderNotes]
  );

  const handleVerifyPending = useCallback(async () => {
    const pending = pendingPayment ?? readPendingPayment();
    if (!pending) {
      toast.error("No pending payment to verify.");
      return;
    }

    setLoading(true);
    try {
      await processPaymentResponse(pending, pending.amountPaise);
    } catch (err) {
      console.error("PAYMENT_VERIFY_FAILED", {
        error: err instanceof Error ? err.message : String(err),
      });
      toast.error("Could not verify payment. Try again in a minute.");
    } finally {
      setLoading(false);
    }
  }, [pendingPayment, processPaymentResponse]);

  const handlePay = useCallback(async () => {
    if (!keyId) {
      toast.error("Payment gateway is not configured. Please contact support.");
      return;
    }

    const existingPending = pendingPayment ?? readPendingPayment();
    if (existingPending) {
      await handleVerifyPending();
      return;
    }

    try {
      if (!isRazorpayCheckoutReady()) {
        await loadRazorpayCheckoutScript({ forceRetry: scriptFailed });
        setScriptReady(true);
        setScriptFailed(false);
      }
    } catch (err) {
      console.error("RAZORPAY_SCRIPT_LOAD_FAILED", {
        phase: "pay_click",
        error: err instanceof Error ? err.message : String(err),
      });
      toast.error(
        "Payment gateway could not load. Disable ad blockers for this site, refresh, then tap Retry."
      );
      setScriptFailed(true);
      setScriptReady(false);
      return;
    }

    if (!window.Razorpay) {
      toast.error("Payment gateway is still loading. Please try again.");
      return;
    }

    if (amountInRupees <= 0) {
      toast.error("Invalid payment amount.");
      return;
    }

    setLoading(true);
    const amountPaise = Math.round(amountInRupees * 100);

    try {
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountPaise,
          currency: "INR",
          receipt: receipt ?? `reg_${Date.now()}`,
          notes: orderNotes,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error ?? "Failed to create order");
      }

      const options: Record<string, unknown> = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Shiksha Mahakumbh Abhiyan",
        description,
        order_id: orderData.order_id,
        handler: (response: RazorpayHandlerResponse) => {
          void processPaymentResponse(response, amountPaise)
            .catch((err) => {
              console.error("PAYMENT_VERIFY_FAILED", {
                error: err instanceof Error ? err.message : String(err),
              });
              toast.error("Payment verification failed. Use Verify payment — do not pay again.");
            })
            .finally(() => {
              setLoading(false);
            });
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: { color: "#1e3a5f" },
        modal: {
          ondismiss: () => {
            setLoading(false);
            onDismiss?.();
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        setLoading(false);
        const msg = response.error?.description ?? "Payment failed.";
        if (isWebsiteMismatchError(msg)) {
          toast.error(WEBSITE_MISMATCH_HELP, { duration: 12000 });
        } else {
          toast.error(msg);
        }
      });
      rzp.open();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Payment failed";
      console.error("RAZORPAY_OPEN_FAILED", { error: msg });
      toast.error(msg);
      setLoading(false);
    }
  }, [
    amountInRupees,
    customerEmail,
    customerName,
    customerPhone,
    description,
    handleVerifyPending,
    keyId,
    onDismiss,
    orderNotes,
    pendingPayment,
    processPaymentResponse,
    receipt,
    scriptFailed,
  ]);

  if (!keyId) {
    return (
      <p className="text-sm text-amber-700">
        Online payment is temporarily unavailable. Use manual transfer and upload
        receipt below.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {pendingPayment && !verified ? (
        <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-950">
          <p className="font-semibold">Payment ID saved: {pendingPayment.razorpay_payment_id}</p>
          <p className="mt-1">
            Your bank may have charged you. Tap <strong>Verify payment</strong> below — do not open
            Razorpay again.
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {pendingPayment && !verified ? (
          <button
            type="button"
            onClick={() => void handleVerifyPending()}
            disabled={disabled || loading}
            className={
              className ??
              "inline-flex min-h-[44px] items-center justify-center rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            }
          >
            {loading ? "Verifying…" : "Verify payment (no new charge)"}
          </button>
        ) : null}

        <button
          type="button"
          onClick={() => void handlePay()}
          disabled={disabled || loading || verified || Boolean(pendingPayment)}
          className={
            className ??
            "inline-flex min-h-[44px] items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          }
        >
          {verified
            ? "Payment verified ✓"
            : loading
              ? "Processing…"
              : scriptFailed
                ? `Retry payment · ₹${amountInRupees.toLocaleString("en-IN")}`
                : `Pay ₹${amountInRupees.toLocaleString("en-IN")}`}
        </button>
      </div>

      {!scriptReady && !verified && !loading && (
        <p className="text-xs text-slate-600">
          {scriptFailed
            ? "Payment gateway could not load. Allow scripts for this site, disable ad blockers, refresh, then tap Retry."
            : "Preparing secure checkout… tap Pay when ready."}
        </p>
      )}
    </div>
  );
}

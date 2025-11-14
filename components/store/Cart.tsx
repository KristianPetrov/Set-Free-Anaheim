"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
  PaymentElementProps
} from '@stripe/react-stripe-js'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { useCart } from "./cart-context"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { customerDetails } = useCart()


  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const receiptEmail = customerDetails?.email?.trim() || undefined
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        receipt_email:receiptEmail,
        
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/store?success=true`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions:PaymentElementProps['options'] = {fields:{billingDetails:{
    address:{country:"auto",city:"auto",line1:"auto",line2:"auto",postalCode:"auto",state:"auto"},
    email:"auto",
    name:"auto",
    phone:"auto"
  }},
    layout: "accordion"
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        className="mt-4 block w-full max-w-xs mx-auto rounded-md border border-black bg-red-700 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-70"
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay Now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const options:StripeElementsOptions = {clientSecret,appearance:{
    theme: 'night',
  }};
  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm />
    </Elements>
  )
}
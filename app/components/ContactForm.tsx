"use client";

import { useActionState, useEffect } from "react";
import { sendEmail } from "../actions/send-email";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useAnalytics } from "@/lib/hooks/useAnalytics";

export default function ContactForm() {
  const [state, action, isPending] = useActionState(sendEmail, null);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (state?.success) {
      trackEvent("Contact Form Submission", { status: "success" });
    } else if (state?.message && !state.success) {
      trackEvent("Contact Form Submission", { status: "error", message: state.message });
    }
  }, [state, trackEvent]);

  return (
    <form action={action} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-white/80">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-white/80">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-white/80">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-white/60"
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Project Proposal">Project Proposal</option>
          <option value="Freelance Opportunity">Freelance Opportunity</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-white/80">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
          placeholder="Tell me about your project..."
        ></textarea>
      </div>

      {state?.message && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 ${
            state.success
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {state.success ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <p>{state.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all transform hover:-translate-y-1 shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            Sending... <Loader2 size={18} className="animate-spin" />
          </>
        ) : (
          <>
            Send Message <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useBackgroundColor } from '../../contexts/BackgroundColorContext';

export default function Contact() {
  const { currentBgColor } = useBackgroundColor();
  const isDefaultBg = currentBgColor === "#F1ECE4";
  const uiTextColor = isDefaultBg ? "inherit" : "white";
  const uiBorderColor = isDefaultBg ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.4)";
  const uiBorderColorFocus = isDefaultBg ? "black" : "white";
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-16" style={{
      color: isDefaultBg ? "inherit" : "white",
    }}>
      <div className="max-w-7xl mx-auto mt-36 md:mt-20">
        <header className="mb-16">
          <p
            className="text-6xl md:text-8xl tracking-[0.05em] uppercase"
            style={{ fontFamily: "canela" }}
          >
            Contact
          </p>
          <p
            className="mt-6 text-lg max-w-xl"
            style={{ fontFamily: "ModernSerif" }}
          >
            Ideas, collaborations or conversations.
            If it resonates, let&apos;s talk.
          </p>
        </header>

        {success ? (
          <p className="text-lg"
            style={{ fontFamily: "ModernSerif" }}
          >
            Message sent. I&apos;ll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <label className="block text-xs uppercase tracking-[0.25em] mb-2">
                Name
              </label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border-b bg-transparent py-3 outline-none transition-colors duration-300"
                style={{
                  borderColor: uiBorderColor,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = uiBorderColorFocus)}
                onBlur={(e) => (e.currentTarget.style.borderColor = uiBorderColor)}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.25em] mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border-b bg-transparent py-3 outline-none transition-colors duration-300"
                style={{
                  borderColor: uiBorderColor,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = uiBorderColorFocus)}
                onBlur={(e) => (e.currentTarget.style.borderColor = uiBorderColor)}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.25em] mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full border-b bg-transparent py-3 outline-none transition-colors duration-300"
                style={{
                  borderColor: uiBorderColor,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = uiBorderColorFocus)}
                onBlur={(e) => (e.currentTarget.style.borderColor = uiBorderColor)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              disabled={loading}
              className="inline-flex items-center gap-3 rounded-full px-8 py-3 uppercase tracking-[0.25em] text-sm transition-all duration-300 disabled:opacity-50"
              style={{
                border: `1px solid ${uiBorderColor}`,
                color: uiTextColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = uiBorderColorFocus;
                e.currentTarget.style.color = isDefaultBg ? "white" : "black";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = uiTextColor;
              }}
            >
              {loading ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
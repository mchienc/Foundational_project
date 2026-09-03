---
version: alpha
name: EduFlow-Ollama-design-system
description: |
  An ultra-minimal, documentation-first design system inspired by Ollama (ollama.com).
  Pure paper-white canvas (#ffffff), pure black (#000000) primary actions, hairline borders (#e5e5e5),
  fully rounded pill geometry (rounded-full) for all interactive elements, and crisp typography
  (Plus Jakarta Sans / SF Pro Rounded, system sans, and ui-monospace). No drop shadows, no colorful
  gradients, no marketing noise. The system is the documentation, and the documentation is the system.

colors:
  primary: "#000000"
  on-primary: "#ffffff"
  ink: "#000000"
  ink-deep: "#090909"
  charcoal: "#525252"
  body: "#737373"
  mute: "#a3a3a3"
  canvas: "#ffffff"
  surface-soft: "#fafafa"
  surface-card: "#ffffff"
  hairline: "#e5e5e5"
  hairline-strong: "#d4d4d4"
  surface-dark: "#171717"
  on-dark: "#ffffff"
  traffic-red: "#ff5f56"
  traffic-yellow: "#ffbd2e"
  traffic-green: "#27c93f"

typography:
  headings: Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, "SF Pro Rounded", sans-serif
  body: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif
  code: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace

rounded:
  pill: 9999px (rounded-full)
  card: 16px (rounded-2xl)
  inner: 10px (rounded-xl)

components:
  button-primary: bg-black text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-neutral-800 transition
  button-secondary: bg-white text-black border border-[#e5e5e5] rounded-full px-5 py-2 text-sm font-medium hover:bg-[#fafafa] transition
  pill-badge: rounded-full px-3 py-1 text-xs font-medium border border-[#e5e5e5] bg-[#fafafa] text-neutral-700
  card: bg-white border border-[#e5e5e5] rounded-2xl p-6
  terminal-card: bg-white border border-[#e5e5e5] rounded-2xl p-6 font-mono text-xs
---

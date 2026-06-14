import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Flight Recorder — Proof for AI Agent Work",
  description:
    "Codex says done. Agent Flight Recorder turns AI agent claims into SACP receipts anchored on Mantle."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


import './course.css';
import './unit-one.css';
import type { Metadata } from "next";
import "./globals.css";
import "./overhaul.css";
import "./beginner.css";
import "./number-examples.css";
import "./topic-visuals.css";
import "./learning-celebration.css";
import "./lesson-support.css";
import "./chapter-refinements.css";
import "./number-foundations.css";
import "./transmission.css";
import "./transmission-experience.css";
import "./check-digit.css";
import "./study-pages.css";
import "./hardware.css";
import "./account.css";
import "./paper2.css";

export const metadata: Metadata = {
  title: "Bit by Bit · Computer Science by Learning Lab",
  description: "Computer Science, one idea at a time. Learn Cambridge O Level 2210 with visual lessons and guided practice. By Learning Lab.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}



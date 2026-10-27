import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you were looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#090909] text-[#f7f9fa]"
      aria-label="404 Not Found"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#828384] mb-4">
        404 / NOT_FOUND
      </p>
      <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[#f7f9fa] mb-4">
        Lost in the <span className="font-serif italic">void.</span>
      </h1>
      <p className="text-sm text-[#828384] max-w-sm mb-8 font-light">
        This route does not exist — but Vishal&apos;s machine learning pipelines do.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="btn-action-filled px-5 py-2.5 text-xs font-mono tracking-wider flex items-center gap-2"
        >
          <Home size={14} />
          Back home
        </Link>
        <Link
          href="/#projects"
          className="btn-compact-outlined px-5 py-2.5 text-xs flex items-center gap-2"
        >
          <ArrowLeft size={14} />
          View projects
        </Link>
      </div>
    </main>
  );
}

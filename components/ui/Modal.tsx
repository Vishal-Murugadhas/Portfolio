"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface ModalItem {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  year?: string;
  description?: string;
}

interface ModalProps {
  item: ModalItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ item, isOpen, onClose }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overlay-backdrop"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0e0e13] border border-[rgba(247,249,250,0.16)] rounded-[19.2px] overflow-hidden flex flex-col z-10 p-6 sm:p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(247,249,250,0.08)]">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#828384]">
                ACHIEVEMENT RECORD
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-[rgba(247,249,250,0.14)] flex items-center justify-center text-[#f7f9fa] hover:bg-[rgba(247,249,250,0.08)] transition-colors"
                aria-label="Close modal"
              >
                <X size={15} />
              </button>
            </div>

            {/* Photo / Visual */}
            <div className="mt-5 rounded-xl overflow-hidden border border-[rgba(247,249,250,0.1)] bg-[#090909] aspect-[16/10] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Metadata */}
            <div className="mt-5">
              <div className="flex items-center justify-between gap-3">
                <h3 id="modal-title" className="text-xl sm:text-2xl font-light text-[#f7f9fa]">
                  {item.title}
                </h3>
                {item.year && (
                  <span className="font-mono text-xs text-[#828384] tracking-wider px-2 py-0.5 border border-[rgba(247,249,250,0.15)] rounded">
                    {item.year}
                  </span>
                )}
              </div>
              <p className="text-sm font-mono text-[#828384] mt-1">
                {item.subtitle}
              </p>
              {item.description && (
                <p className="text-sm text-[#828384] mt-3 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

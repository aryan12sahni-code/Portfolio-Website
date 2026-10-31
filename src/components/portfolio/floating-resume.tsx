"use client";

import { FileDown } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingResume() {
  return (
    <motion.a
      href="/Aryan-Sahni-Resume.pdf"
      download
      className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[var(--panel)]/90 px-4 py-3 text-sm font-medium text-white shadow-[0_0_40px_rgba(168,85,247,0.35)] backdrop-blur-md sm:right-6 sm:bottom-6"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.55 }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(236,72,153,0.4)" }}
      whileTap={{ scale: 0.97 }}
    >
      <FileDown className="size-4 text-[var(--violet)]" />
      Resume
    </motion.a>
  );
}

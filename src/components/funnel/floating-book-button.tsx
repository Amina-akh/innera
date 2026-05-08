"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function FloatingBookButton() {
  const pathname = usePathname();
  if (pathname === "/book") return null;

  return (
    <motion.div
      className="innera-floating-book fixed bottom-6 right-5 z-[60] md:bottom-8 md:right-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 22 }}
    >
      <Link
        href="/book"
        className="innera-btn innera-btn-primary shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
      >
        Запись на сессию
      </Link>
    </motion.div>
  );
}

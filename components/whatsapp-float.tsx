"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsAppFloat() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 200 }}
      className="fixed right-5 bottom-5 z-50"
    >
      <Link
        href="https://wa.me/6281997826396"
        target="_blank"
        rel="noopener"
        aria-label="Chat WhatsApp"
        className="flex items-center justify-center w-[62px] h-[62px] rounded-full bg-gradient-to-br from-[#25d366] to-[#1fb85a] text-white shadow-[0_18px_40px_rgba(37,211,102,0.28)] hover:-translate-y-0.5 transition-transform"
      >
        <MessageCircle className="w-7 h-7" />
      </Link>
    </motion.div>
  )
}

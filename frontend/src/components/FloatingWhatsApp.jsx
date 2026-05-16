import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/data";

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.a
      href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20Saura%20Energy%2C%20I%27d%20like%20a%20free%20solar%20consultation.`}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-whatsapp"
      initial={{ scale: 0, opacity: 0 }}
      animate={show ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="fixed bottom-6 right-6 z-40 group"
    >
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#1B3A8C] text-white text-xs font-semibold px-3 py-1.5 opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-lg">
        Chat on WhatsApp
      </span>
      <div className="relative pulse-orange rounded-full">
        <div className="h-14 w-14 rounded-full bg-[#25D366] grid place-items-center shadow-2xl hover:scale-110 transition-transform">
          <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden>
            <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.79 1.23 1.82 2.508 3.41 4.42 4.475.616.343 2.508 1.318 3.166 1.318.358 0 1.626-.487 1.96-.788.214-.2.32-.515.32-.802 0-.114 0-.215-.028-.314-.083-.43-1.776-1.018-2.39-1.018zm-2.36 7.456a8.92 8.92 0 0 1-4.55-1.245l-3.26.847.872-3.156a8.91 8.91 0 0 1-1.345-4.717c0-4.95 4.02-8.97 8.97-8.97a8.91 8.91 0 0 1 6.348 2.626 8.91 8.91 0 0 1 2.624 6.345c0 4.95-4.02 8.97-8.97 8.97zm7.6-16.578A10.75 10.75 0 0 0 16.74 5C10.78 5 5.93 9.85 5.92 15.81c0 1.91.5 3.77 1.45 5.41L5.83 27l5.94-1.554a10.75 10.75 0 0 0 5.14 1.295h.005c5.96 0 10.81-4.85 10.81-10.81 0-2.89-1.12-5.6-3.17-7.65z" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}

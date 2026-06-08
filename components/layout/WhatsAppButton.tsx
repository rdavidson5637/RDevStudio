import { WHATSAPP_URL } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-[#25D366] text-white shadow-lg transition-[transform,box-shadow] duration-normal ease-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-base sm:h-auto sm:w-auto sm:px-5 sm:py-3.5"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp us</span>
    </a>
  );
}

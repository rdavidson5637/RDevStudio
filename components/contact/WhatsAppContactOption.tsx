import { WHATSAPP_URL } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type WhatsAppContactOptionProps = {
  className?: string;
};

export function WhatsAppContactOption({ className = "" }: WhatsAppContactOptionProps) {
  return (
    <div className={`border-t border-border pt-8 ${className}`}>
      <p className="text-sm text-secondary">Prefer to message directly?</p>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-3 text-sm font-semibold text-[#25D366] transition-colors duration-normal ease-out hover:border-[#25D366] hover:bg-[#25D366] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-base sm:w-auto"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Chat on WhatsApp
      </a>
    </div>
  );
}

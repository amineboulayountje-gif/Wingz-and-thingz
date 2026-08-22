import { useI18n } from "@/context/I18nContext";
import { CheckCircle2 } from "lucide-react";

interface ConfirmationOverlayProps {
  visible: boolean;
  onNewOrder: () => void;
}

export function ConfirmationOverlay({ visible, onNewOrder }: ConfirmationOverlayProps) {
  const { t } = useI18n();

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-base/90 backdrop-blur-md animate-fade-in" />
      <div className="card relative flex max-w-md flex-col items-center gap-5 p-8 text-center animate-scale-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success animate-bounce-subtle">
          <CheckCircle2 size={36} />
        </div>
        <h2 className="font-display text-2xl font-bold text-cream-50">
          {t.confirmation.title}
        </h2>
        <p className="text-sm leading-relaxed text-cream-300">
          {t.confirmation.message}
        </p>
        <button onClick={onNewOrder} className="btn-primary w-full">
          {t.confirmation.newOrder}
        </button>
      </div>
    </div>
  );
}

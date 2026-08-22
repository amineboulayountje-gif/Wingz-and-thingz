import { Minus, Plus } from "lucide-react";
import { useI18n } from "@/context/I18nContext";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: "sm" | "md";
  label?: string;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  size = "md",
  label,
}: QuantitySelectorProps) {
  const { t } = useI18n();
  const isActive = quantity > 0;

  const btnSize = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const iconSize = size === "sm" ? 16 : 18;
  const textSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={onDecrease}
        disabled={!isActive && quantity === 0}
        aria-label={t.aria.decreaseQuantity}
        className={`flex ${btnSize} items-center justify-center rounded-full border transition-all active:scale-90 ${
          isActive
            ? "border-primary-500/40 bg-primary-500/10 text-primary-400 hover:bg-primary-500/20"
            : "border-base-border bg-base-surface text-cream-500"
        } disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <Minus size={iconSize} />
      </button>
      <span
        className={`min-w-[2rem] text-center font-display ${textSize} font-bold tabular-nums ${
          isActive ? "text-cream-50" : "text-cream-400"
        }`}
        aria-label={label}
      >
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        aria-label={t.aria.increaseQuantity}
        className={`flex ${btnSize} items-center justify-center rounded-full border transition-all active:scale-90 ${
          isActive
            ? "border-primary-500 bg-primary-500 text-white shadow-glow hover:bg-primary-400"
            : "border-base-border bg-base-card text-cream-200 hover:border-primary-500/50 hover:text-primary-400"
        }`}
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
}

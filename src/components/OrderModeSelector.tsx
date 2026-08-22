import { useI18n } from "@/context/I18nContext";
import { useOrder } from "@/context/OrderContext";
import { SlidersHorizontal, Package } from "lucide-react";

export function OrderModeSelector() {
  const { t } = useI18n();
  const { order, setMode } = useOrder();

  const modes = [
    {
      id: "custom" as const,
      icon: SlidersHorizontal,
      title: t.orderMode.customTitle,
      desc: t.orderMode.customDesc,
      cta: t.orderMode.customCta,
    },
    {
      id: "package" as const,
      icon: Package,
      title: t.orderMode.packageTitle,
      desc: t.orderMode.packageDesc,
      cta: t.orderMode.packageCta,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center font-display text-2xl font-bold text-cream-50 sm:text-3xl">
        {t.orderMode.title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = order.mode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setMode(mode.id)}
              className={`card card-hover group flex flex-col items-start gap-4 p-6 text-left transition-all duration-200 ${
                isActive
                  ? "border-primary-500 shadow-glow"
                  : ""
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/15 text-primary-400 transition-transform group-hover:scale-110">
                <Icon size={26} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-xl font-bold text-cream-50">
                  {mode.title}
                </h3>
                <p className="text-sm leading-relaxed text-cream-300">
                  {mode.desc}
                </p>
              </div>
              <span
                className={`mt-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-primary-500 text-white"
                    : "bg-base-elevated text-cream-200 group-hover:bg-primary-500/20"
                }`}
              >
                {mode.cta}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

import { useI18n } from "@/context/I18nContext";
import { useOrder } from "@/context/OrderContext";
import { ArrowRight, SlidersHorizontal, Package } from "lucide-react";

export function OrderModeSelector() {
  const { t } = useI18n();
  const { order, setMode } = useOrder();

  const modes = [
    {
      id: "custom" as const,
      icon: SlidersHorizontal,
      title: t.orderMode.customTitle,
      desc: t.orderMode.customDesc,
      targetId: "custom-builder",
    },
    {
      id: "package" as const,
      icon: Package,
      title: t.orderMode.packageTitle,
      desc: t.orderMode.packageDesc,
      targetId: "package-builder",
    },
  ];

  const handleModeChange = (
    mode: "custom" | "package",
    targetId: string
  ) => {
    setMode(mode);

    window.setTimeout(() => {
      const element = document.getElementById(targetId);

      if (element) {
        const offset = 120;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }
    }, 150);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center font-display text-2xl font-bold tracking-tight text-cream-50 sm:text-3xl">
        {t.orderMode.title}
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = order.mode === mode.id;

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => handleModeChange(mode.id, mode.targetId)}
              className={`group flex min-h-[78px] w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 sm:min-h-[84px] sm:px-5 ${
                isActive
                  ? "border-primary-500 bg-primary-500/10"
                  : "border-base-border bg-base-card hover:border-primary-500/40 hover:bg-base-hover"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  isActive
                    ? "bg-primary-500/15 text-primary-400"
                    : "bg-base-surface text-cream-400 group-hover:text-primary-400"
                }`}
              >
                <Icon size={19} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-display text-base font-semibold leading-tight text-cream-50 sm:text-lg">
                  {mode.title}
                </h3>

                <p className="mt-1 text-sm leading-snug text-cream-400">
                  {mode.desc}
                </p>
              </div>

              <ArrowRight
                size={19}
                strokeWidth={1.8}
                className={`shrink-0 transition-all duration-200 ${
                  isActive
                    ? "text-primary-400"
                    : "text-cream-500 group-hover:translate-x-1 group-hover:text-primary-400"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

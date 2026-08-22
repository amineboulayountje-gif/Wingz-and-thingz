import { useState, useCallback, useRef } from "react";
import { I18nProvider } from "@/context/I18nContext";
import { OrderProvider, useOrder } from "@/context/OrderContext";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSolution } from "@/components/ProblemSolution";
import { HowItWorks } from "@/components/HowItWorks";
import { OrderModeSelector } from "@/components/OrderModeSelector";
import { CustomBuilder } from "@/components/CustomBuilder";
import { PackageBuilder } from "@/components/PackageBuilder";
import { ExtrasSection } from "@/components/ExtrasSection";
import { OrderSummary } from "@/components/OrderSummary";
import { MobileOrderBar } from "@/components/MobileOrderBar";
import { Occasions } from "@/components/Occasions";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { ConfirmationOverlay } from "@/components/ConfirmationOverlay";
import { buildWhatsAppUrl } from "@/utils/order";

function AppContent() {
  const { order, resetOrder } = useOrder();
  const [confirmation, setConfirmation] = useState(false);
  const orderSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const scrollToOrder = useCallback(() => {
    if (orderSectionRef.current) {
      orderSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleCheckout = useCallback(() => {
    const url = buildWhatsAppUrl(order, document.documentElement.lang as "nl" | "en" | "fr");
    window.open(url, "_blank", "noopener,noreferrer");
    setConfirmation(true);
  }, [order]);

  const handleNewOrder = useCallback(() => {
    resetOrder();
    setConfirmation(false);
    setTimeout(() => {
      scrollToOrder();
    }, 100);
  }, [resetOrder, scrollToOrder]);

  const hasItems = (order.items ?? []).length > 0;

  return (
    <div className="min-h-screen bg-base pb-20 lg:pb-0">
      <Header onNavigate={scrollToSection} />

      <main>
        <HeroSection onStart={scrollToOrder} onHowItWorks={() => scrollToSection("how-it-works")} />

        <ProblemSolution onStart={scrollToOrder} />

        <HowItWorks />

        <section id="order" ref={orderSectionRef} className="py-12 sm:py-16 lg:py-20">
          <div className="section-container">
            <div id="menu" className="flex flex-col gap-8">
              <OrderModeSelector />

              {order.mode === "custom" && (
                <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-8">
                  <div className="animate-fade-in">
                    <CustomBuilder />
                  </div>
                  <div className="hidden lg:block">
                    <div className="sticky top-24">
                      <OrderSummary onCheckout={handleCheckout} />
                    </div>
                  </div>
                </div>
              )}

              {order.mode === "package" && (
                <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-8">
                  <div className="animate-fade-in">
                    <PackageBuilder />
                  </div>
                  <div className="hidden lg:block">
                    <div className="sticky top-24">
                      <OrderSummary onCheckout={handleCheckout} />
                    </div>
                  </div>
                </div>
              )}

              {order.mode === null && (
                <div className="hidden lg:block">
                  <div className="sticky top-24">
                    <OrderSummary onCheckout={handleCheckout} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <ExtrasSection />

        <Occasions />

        <Testimonials />
      </main>

      <Footer />

      <MobileOrderBar onCheckout={handleCheckout} />

      <ConfirmationOverlay visible={confirmation} onNewOrder={handleNewOrder} />

      {hasItems && <div className="h-16 lg:hidden" />}
      {confirmation && <div className="h-16 lg:hidden" />}
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <OrderProvider>
        <AppContent />
      </OrderProvider>
    </I18nProvider>
  );
}

export default App;

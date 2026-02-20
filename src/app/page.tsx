import { OrderProvider } from "@/context/OrderContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChocolateDrip from "@/components/ChocolateDrip";
import MenuSection from "@/components/MenuSection";
import OrderSummary from "@/components/OrderSummary";
import ToxicQuiz from "@/components/ToxicQuiz";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function Home() {
  return (
    <OrderProvider>
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <ToxicQuiz />
        <div className="h-16 sm:h-20 bg-gradient-to-b from-chocolate to-chocolate-dark" />
        <OrderSummary />
        <ChocolateDrip direction="down" />
        <AboutSection />
      </main>
      <Footer />
      <WhatsAppFAB />
    </OrderProvider>
  );
}

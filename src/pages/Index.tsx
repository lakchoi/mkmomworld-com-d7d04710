import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DreamsSection from "@/components/DreamsSection";
import CallToAction from "@/components/CallToAction";
import TickerSection from "@/components/TickerSection";
import StatsSection from "@/components/StatsSection";
import SubjectsSection from "@/components/SubjectsSection";
import GoalsSection from "@/components/GoalsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import YoutubeSection from "@/components/YoutubeSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <DreamsSection />
      <CallToAction />
      <TickerSection />
      <StatsSection />
      <SubjectsSection />
      <GoalsSection />
      <YoutubeSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;

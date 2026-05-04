import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroHands from "@/assets/hero-hands.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background">
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
      
      {/* Hero image */}
      <div className="absolute right-0 top-0 w-full lg:w-3/5 h-full">
        <img
          src={heroHands}
          alt="함께하는 세상"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-bold tracking-widest text-sm mb-4"
          >
            MK MOMWORLD
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-foreground mb-6"
          >
            2000년대 감성,<br />
            <span className="text-primary">함께하는 세상</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg"
          >
            과거의 순수함과 현재의 열정을 담아, 더 나은 미래를 함께 만들어갑니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollTo("campaigns")}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-base hover:brightness-110 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              더 알아보기 <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="border-2 border-primary text-primary px-8 py-4 rounded-full font-bold text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              참여하기
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

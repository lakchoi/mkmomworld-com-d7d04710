import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/mk-momworld-logo.png";

const faqs = [
  {
    q: "이 프로젝트는 무엇인가요?",
    a: "2000년대의 따뜻한 마음으로 더 나은 세상을 만드는 시민 참여 프로젝트입니다.",
  },
  {
    q: "참여 목적은 무엇인가요?",
    a: "안전하고 행복한 사회를 만들고, 기본권을 지키기 위한 행동을 촉구합니다.",
  },
  {
    q: "어떤 입장을 가질 수 있나요?",
    a: "치안, 안전 걱정으로부터 아이들의 안전부터 미래, 노년 생활과 같은 삶의 질을 향상시킬 것을 기대합니다.",
  },
  {
    q: "누구나 참여 가능한가요?",
    a: "네, 아이들과 모든 사람의 안전한 세상과 안전한 식탁으로 젊고 건강한 노후 세상을 위하여 참여합니다.",
  },
  {
    q: "활동은 무엇입니까?",
    a: "공감대 형성, 정책 제안, 지역 사회 활동 등 다양한 참여가 있습니다.",
  },
  {
    q: "참여는 어떻게 하는 건가요?",
    a: "아래 참여 양식을 작성하시거나 이메일(mk.momworld@gmail.com)로 연락주세요.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-12 items-center max-w-6xl mx-auto">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <p className="text-primary font-bold text-sm tracking-widest mb-3">[ 궁금한 내용 ]</p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground">자주 묻는 질문</h2>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-secondary/50 transition-colors"
                  >
                    <span className="font-bold text-foreground text-base">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-muted-foreground leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center items-center self-center gap-4 bg-background border border-border rounded-3xl shadow-2xl p-6 lg:p-8 mx-auto"
          >
            <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 flex items-center justify-center">
              <img
                src={logo}
                alt="MK MOMWORLD 로고"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <span className="text-foreground font-bold tracking-[0.3em] text-sm">엠케이맘월드로고</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

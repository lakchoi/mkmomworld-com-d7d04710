import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, Coffee } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/mk-momworld-logo.png";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const navItems = [
    { label: "우리의 꿈", id: "dreams" },
    { label: "캠페인", id: "campaigns" },
    { label: "FAQ", id: "faq" },
    { label: "참여하기", id: "contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={logo} alt="MK MOMWORLD 로고" className="w-9 h-9 rounded-full object-cover" />
          <span className="text-lg font-bold text-foreground tracking-wide">MK MOMWORLD</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="hover:text-primary transition-colors">
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:flex bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all items-center gap-2"
          >
            참여하기 <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="https://cafe.naver.com/rede9bak"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex border-2 border-primary text-primary px-5 py-2 rounded-full text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all items-center gap-2"
          >
            <Coffee className="w-4 h-4" /> 카페방문
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            {open ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-background border-b"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left py-3 px-4 rounded-lg text-foreground font-medium hover:bg-muted transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-2 bg-primary text-primary-foreground py-3 rounded-xl font-bold text-center"
              >
                참여하기
              </button>
              <a
                href="https://cafe.naver.com/rede9bak"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 border-2 border-primary text-primary py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2"
              >
                <Coffee className="w-4 h-4" /> 네이버 카페방문
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

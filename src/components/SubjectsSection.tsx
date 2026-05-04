import { motion } from "framer-motion";
import { Shield, Apple, Leaf, Handshake, HeartHandshake, Heart, Star } from "lucide-react";
import { useCampaigns } from "@/hooks/useCampaigns";

import campaignSafety from "@/assets/campaign-safety.png";
import campaignFood from "@/assets/campaign-food.png";
import campaignEnvironment from "@/assets/campaign-environment.png";
import campaignEconomy from "@/assets/campaign-economy.png";
import campaignHospital from "@/assets/campaign-hospital.png";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Apple, Leaf, Handshake, HeartHandshake, Heart, Star,
};

const fallbackImages: Record<string, string> = {
  "\"터치소리\" 안심귀가": campaignSafety,
  "먹거리 안전": campaignFood,
  "환경보호": campaignEnvironment,
  "안전한 먹거리": campaignEconomy,
  "병원동행서비스": campaignEconomy,
};

const SubjectsSection = () => {
  const { data: campaigns = [], isLoading } = useCampaigns();

  if (isLoading) return null;

  return (
    <div id="campaigns">
      {campaigns.map((campaign, index) => {
        const Icon = iconMap[campaign.icon || "Shield"] || Shield;
        const reversed = index % 2 !== 0;
        const imageUrl = campaign.image_url?.startsWith("http")
          ? campaign.image_url
          : fallbackImages[campaign.title] || campaignSafety;

        return (
          <section
            key={campaign.id}
            className={`py-20 md:py-28 ${index % 2 === 0 ? "bg-background" : "bg-card"}`}
          >
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, x: reversed ? 80 : -80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                  className={reversed ? "lg:order-2" : "lg:order-1"}
                >
                  <div className="relative">
                    <div className="relative w-full aspect-[4/3] rounded-3xl shadow-2xl shadow-primary/20 overflow-hidden bg-card">
                      <img
                        src={imageUrl}
                        alt={`${campaign.title} 캠페인`}
                        className="absolute inset-0 w-full h-full object-contain p-4"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold text-sm">
                        캠페인 {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: reversed ? -80 : 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={reversed ? "lg:order-1" : "lg:order-2"}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-8 h-8 text-primary" />
                    <span className="text-primary font-bold text-sm tracking-widest uppercase">{campaign.subtitle}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">{campaign.title}</h2>

                  <div className="border-l-4 border-primary bg-primary/5 rounded-r-xl px-6 py-4 mb-6">
                    <p className="text-foreground font-semibold text-lg">"{campaign.question}"</p>
                  </div>

                  {campaign.description && (
                    <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{campaign.description}</p>
                  )}

                  <ul className="space-y-3 mb-6">
                    {(campaign.items || []).map((item: string, i: number) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className="flex items-center gap-3 text-foreground"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {(campaign.tags || []).map((tag: string) => (
                      <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">안전동행 →</span>
                    {(campaign.connections || []).map((conn: string) => (
                      <span key={conn} className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground font-medium">
                        {conn}
                      </span>
                    ))}
                  </div>

                  {campaign.badge && <p className="text-primary font-semibold text-sm">👉 {campaign.badge}</p>}
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default SubjectsSection;

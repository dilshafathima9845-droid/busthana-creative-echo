import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import homeImage from "@/assets/busthana-home.asset.json";
import { Button } from "@/components/ui/button";

const thoughts = [
  { pre: "I am a", word: "Digital Marketer" },
  { pre: "I am a", word: "Creative Thinker" },
  { pre: "I am a", word: "Brand Storyteller" },
  { pre: "I am a", word: "Growth Builder" },
  { pre: "I turn", word: "Ideas into Impact" },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % thoughts.length), 6000);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);
  const thought = thoughts[index] ?? thoughts[0];
  if (!thought) return null;

  return (
    <section id="home" className="hero-single relative overflow-hidden grid-lines px-6 pb-24 pt-32 md:px-10">
      <div className="hero-layout relative mx-auto max-w-7xl">
        <div className="hero-image-stage">
          <div className={`hero-image-motion ${reducedMotion ? "hero-image-still" : ""}`}>
            <img src={homeImage.url} alt="Busthana Shirin, creative thinker and digital marketer" width={768} height={813} fetchPriority="high" className="h-auto w-full" />
          </div>
        </div>
        <div className="hero-copy relative z-10 flex flex-col justify-center">
          <p className="mb-5 text-xs text-muted-foreground">DIGITAL MARKETING STRATEGIST · CALICUT, INDIA</p>
          <h1 className="font-serif text-4xl font-light leading-tight md:text-6xl">Busthana Shirin</h1>
          <div className="mt-7 min-h-44 md:min-h-52">
            <p className="font-serif text-2xl text-muted-foreground md:text-3xl">{thought.pre}</p>
            <AnimatePresence mode="wait">
              <motion.p key={thought.word} initial={reducedMotion ? false : { rotateX: -65, opacity: 0, y: 24 }} animate={{ rotateX: 0, opacity: 1, y: 0 }} exit={{ rotateX: 65, opacity: 0, y: -24 }} transition={{ duration: reducedMotion ? 0 : 0.6 }} className="mt-2 break-words font-serif text-4xl italic leading-tight text-primary md:text-5xl">
                {thought.word}.
              </motion.p>
            </AnimatePresence>
          </div>
          <p className="max-w-md leading-relaxed text-muted-foreground">Turning creative ideas into digital growth — through SEO, performance marketing, social media and branding.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-12 rounded-full bg-ink px-6 text-xs text-ink-foreground"><a href="#work">EXPLORE MY WORK <span aria-hidden>→</span></a></Button>
            <Button asChild variant="outline" className="h-12 rounded-full px-6 text-xs"><a href="#contact">LET’S CONNECT <span aria-hidden>↗</span></a></Button>
          </div>
        </div>
      </div>
      <a href="#about" className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">SCROLL ↓</a>
    </section>
  );
}

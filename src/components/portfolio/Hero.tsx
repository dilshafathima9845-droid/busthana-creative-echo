import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import portraitAsset from "@/assets/busthana-real-portrait.asset.json";

const thoughts = [
  { pre: "I am a", word: "Digital Marketer", pose: { rotate: -6, rotateY: -18, scale: 1, x: -10 } },
  { pre: "I am a", word: "Creative Thinker", pose: { rotate: 5, rotateY: 22, scale: 1.04, x: 20 } },
  { pre: "I am an", word: "SEO Strategist", pose: { rotate: 0, rotateY: 0, scale: 1.08, x: 0 } },
  { pre: "I am a", word: "Brand Storyteller", pose: { rotate: -3, rotateY: 30, scale: 0.98, x: -24 } },
  { pre: "I am a", word: "Growth Builder", pose: { rotate: 7, rotateY: -28, scale: 1.02, x: 14 } },
];

const bubbles = ["SEO", "Meta Ads", "Google Ads", "Branding", "Content", "Reels"];

export function Hero() {
  const [i, setI] = useState(0);
  const reducedMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15 });
  const sy = useSpring(my, { stiffness: 60, damping: 15 });
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 220]);
  const imgY = useTransform(scrollY, [0, 800], [0, -120]);
  const textY = useTransform(scrollY, [0, 800], [0, 160]);
  const tiltX = useTransform(sy, [-1, 1], [8, -8]);
  const tiltY = useTransform(sx, [-1, 1], [-10, 10]);

  useEffect(() => {
    if (reducedMotion) return;
    const t = setInterval(() => setI((v) => (v + 1) % thoughts.length), 5600);
    return () => clearInterval(t);
  }, [reducedMotion]);

  const t = thoughts[i] ?? thoughts[0];
  if (!t) return null;

  return (
    <section
      id="home"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      className="relative overflow-hidden grid-lines pb-20 pt-28"
    >
      {/* mocha arc */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -right-[20vw] top-[700px] h-[120vh] w-[70vw] rounded-l-full bg-mocha md:top-0 md:-right-[10vw] md:w-[55vw]"
      />
      {/* giant outline name */}
      <motion.h1
        aria-hidden
        style={{ y: textY, x: useTransform(sx, [-1, 1], [-30, 30]) }}
        className="pointer-events-none absolute left-0 right-0 top-[58%] select-none opacity-40 whitespace-nowrap text-center font-serif text-8xl font-light leading-none text-outline md:text-[180px]"
      >
        BUSTHANA
      </motion.h1>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 md:px-10">
        <div className="flex min-w-0 flex-col justify-center pb-4 md:pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-xs tracking-[0.3em] text-muted-foreground"
          >
            DIGITAL MARKETING STRATEGIST · CALICUT, INDIA
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-3xl font-light md:text-4xl"
          >
            Hello, I'm Busthana Shirin —
          </motion.p>
          <div className="mt-4 min-h-[11rem] md:min-h-[13rem]" style={{ perspective: 800 }}>
            <p className="font-serif text-4xl font-light text-muted-foreground md:text-5xl">{t.pre}</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={t.word}
                initial={{ rotateX: -90, opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ rotateX: 0, opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ rotateX: 90, opacity: 0, y: -30, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="origin-bottom font-serif text-4xl italic leading-tight text-primary md:text-6xl"
              >
                {t.word}.
              </motion.p>
            </AnimatePresence>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 max-w-md leading-relaxed text-muted-foreground"
          >
            Turning creative ideas into digital growth — through SEO, performance marketing, social media and
            branding that help businesses grow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#work" className="group rounded-full bg-ink px-7 py-4 text-xs tracking-[0.2em] text-ink-foreground transition hover:bg-primary">
              EXPLORE MY WORK <span className="inline-block transition group-hover:translate-x-1">→</span>
            </a>
            <a href="#contact" className="group rounded-full border border-foreground/30 px-7 py-4 text-xs tracking-[0.2em] transition hover:bg-foreground hover:text-background">
              LET'S CONNECT <span className="inline-block transition group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
            </a>
          </motion.div>
        </div>

        {/* portrait in different angles */}
        <motion.div style={{ y: imgY }} className="relative flex items-end justify-center">
          <motion.div
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.6, rotateZ: -20 }}
            animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[7/9] w-full max-w-[480px]"
          >
            <AnimatePresence initial={!reducedMotion} mode="sync">
              <motion.div
                key={i}
                data-portrait-frame={i}
                initial={reducedMotion ? false : { x: "90%", z: -360, rotateY: -42, rotateZ: 7, scale: 0.72, opacity: 0 }}
                animate={{ x: "0%", z: 0, rotateY: 0, rotateZ: 0, scale: 1, opacity: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { x: "-100%", z: 320, rotateY: 32, rotateZ: -8, scale: 1.18, opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 overflow-hidden rounded-t-[40%] border border-primary-foreground/30 bg-sand/60 shadow-2xl"
                style={{ transformPerspective: 1600 }}
              >
                <motion.img src={portraitAsset.url} alt="Busthana Shirin, digital marketing strategist" width={819} height={768}
                  animate={reducedMotion ? {} : { scale: [1, 1.045, 1], y: [0, -5, 0] }}
                  transition={{ delay: 1.3, duration: 4.3, ease: "easeInOut" }}
                  className="absolute bottom-0 h-full w-full object-cover object-center" />
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 18, rotateX: -35, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  transition={{ delay: reducedMotion ? 0 : 1.25, duration: 0.65 }}
                  className="absolute bottom-20 left-6 right-6 border border-border bg-card/90 px-4 py-4 text-center text-card-foreground backdrop-blur-md"
                >
                  <span className="block text-xs text-muted-foreground">{t.pre}</span>
                  <span className="mt-1 block font-serif text-xl italic md:text-2xl">{t.word} 💭</span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {bubbles.map((b, k) => (
            <motion.span
              key={b}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: reducedMotion ? 0 : [0, -12, 0] }}
              transition={{ delay: 1 + k * 0.15, y: { repeat: reducedMotion ? 0 : Infinity, duration: 3 + k * 0.4, ease: "easeInOut" } }}
              className="absolute z-20 rounded-full border border-border bg-card/80 px-4 py-2 text-xs tracking-widest backdrop-blur"
              style={{ top: `${12 + (k % 3) * 24}%`, [k % 2 ? "right" : "left"]: `${(k * 7) % 20}%` }}
            >
              💭 {b}
            </motion.span>
          ))}
          <p className="absolute bottom-10 right-0 z-20 text-right text-xs tracking-[0.25em] text-primary-foreground">
            CREATIVE THINKER.<br />STRATEGIC MARKETER.
          </p>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-xs tracking-[0.3em] text-muted-foreground"
      >
        SCROLL ↓
      </motion.div>
    </section>
  );
}

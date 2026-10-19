import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import portrait from "@/assets/portrait.png";

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
    const t = setInterval(() => setI((v) => (v + 1) % thoughts.length), 2800);
    return () => clearInterval(t);
  }, []);

  const t = thoughts[i];

  return (
    <section
      id="home"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      className="relative min-h-screen overflow-hidden grid-lines pt-28"
    >
      {/* mocha arc */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -right-[20vw] top-0 h-[120vh] w-[70vw] rounded-l-full bg-mocha md:-right-[10vw] md:w-[55vw]"
      />
      {/* giant outline name */}
      <motion.h1
        aria-hidden
        style={{ y: textY, x: useTransform(sx, [-1, 1], [-30, 30]) }}
        className="pointer-events-none absolute left-0 right-0 top-[38%] select-none whitespace-nowrap text-center font-serif text-[22vw] font-light leading-none text-outline md:text-[17vw]"
      >
        BUSTHANA
      </motion.h1>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 md:px-10">
        <div className="flex flex-col justify-center pb-16 md:pb-32">
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
          <div className="mt-4 h-[9rem] md:h-[11rem]" style={{ perspective: 800 }}>
            <p className="font-serif text-4xl font-light text-muted-foreground md:text-5xl">{t.pre}</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={t.word}
                initial={{ rotateX: -90, opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ rotateX: 0, opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ rotateX: 90, opacity: 0, y: -30, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="origin-bottom font-serif text-5xl italic text-primary md:text-7xl"
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
          <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }} className="relative">
            <motion.img
              src={portrait}
              alt="Busthana Shirin, digital marketing strategist"
              width={896}
              height={1152}
              initial={{ opacity: 0, y: 80, clipPath: "inset(100% 0 0 0)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", ...t.pose }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 1000 }}
              className="relative z-10 h-[62vh] w-auto object-contain drop-shadow-2xl md:h-[80vh]"
            />
            {/* ghost echoes at other angles */}
            {[-1, 1].map((d) => (
              <motion.img
                key={d}
                aria-hidden
                src={portrait}
                animate={{ rotate: t.pose.rotate * -d * 2, x: d * 60, opacity: 0.12, scale: 0.95 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-auto object-contain grayscale"
              />
            ))}
          </motion.div>

          {bubbles.map((b, k) => (
            <motion.span
              key={b}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
              transition={{ delay: 1 + k * 0.15, y: { repeat: Infinity, duration: 3 + k * 0.4, ease: "easeInOut" } }}
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

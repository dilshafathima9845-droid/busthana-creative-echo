import { createFileRoute } from "@tanstack/react-router";
import homeImage from "@/assets/busthana-home.asset.json";
import { Hero } from "@/components/portfolio/Hero";
import { About, Contact, Cursor, Nav, Process, Services, Skills, Work, useScrollAnimations } from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Busthana Shirin — Digital Marketing Strategist, Calicut" },
      { name: "description", content: "Portfolio of Busthana Shirin, a digital marketer and creative thinker from Calicut specialising in SEO, Google Ads, Meta Ads and branding." },
      { property: "og:title", content: "Busthana Shirin — Digital Marketing Strategist" },
      { property: "og:description", content: "SEO, performance marketing, social media and branding that help businesses grow." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: homeImage.url },
      { name: "twitter:image", content: homeImage.url },
    ],
  }),
  component: Index,
});

function Index() {
  useScrollAnimations();
  return (
    <main className="overflow-x-clip">
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Work />
      <Skills />
      <Process />
      <Contact />
    </main>
  );
}

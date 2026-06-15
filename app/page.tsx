import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Learning } from "@/components/Learning";
import { Mindset } from "@/components/Mindset";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Stats } from "@/components/Stats";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Journey />
        <Mindset />
        <Projects />
        <Skills />
        <Learning />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

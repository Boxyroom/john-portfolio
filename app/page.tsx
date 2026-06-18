import { Contact } from "@/components/Contact";
import { ContactModalProvider } from "@/components/ContactModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <ContactModalProvider>
      <Header />
      <main>
        <Hero />
        <Journey />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </ContactModalProvider>
  );
}

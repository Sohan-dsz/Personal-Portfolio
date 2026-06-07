import { ParticleBackground } from "@/components/particle-background";
import { ScrollProgress } from "@/components/scroll-progress";
import { LoadingScreen } from "@/components/loading-screen";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Chatbot } from "@/components/chatbot";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Certifications } from "@/components/sections/certifications";
import { Experience } from "@/components/sections/experience";
import { Learning } from "@/components/sections/learning";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ParticleBackground />
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Learning />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

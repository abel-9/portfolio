import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import ContactForm from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen pt-20 px-4">
      <Navbar />
      <Hero />
      <Projects />
      <ContactForm className="mt-20 mb-40" />
      <Footer className="mt-20" />
    </main>
  );
}

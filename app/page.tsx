import { Header } from "@/components/Header";
import { ScrollJourney } from "@/components/ScrollJourney";
import { Services } from "@/components/Services";
import { Philosophy } from "@/components/Philosophy";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <ScrollJourney />
      <Services />
      <Philosophy />
      <Contact />
      <Footer />
    </main>
  );
}

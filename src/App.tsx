import { Gate } from "./components/Gate";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { Method } from "./components/Method";
import { Process } from "./components/Process";
import { Dashboard } from "./components/Dashboard";
import { TrustWhyContact } from "./components/TrustWhyContact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <Gate>
      <div className="grain"></div>
      <Header />
      <Hero />
      <Problem />
      <Method />
      <Process />
      <Dashboard />
      <TrustWhyContact />
      <Footer />
    </Gate>
  );
}

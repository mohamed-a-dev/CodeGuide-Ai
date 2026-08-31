import About from "@/components/Landing/About";
import Features from "@/components/Landing/Features";
import HowItWorks from "@/components/Landing/HowWorks";
import Landing from "@/components/Landing/Landing";
import Navbar from "@/components/Landing/Navbar";


export default function Home() {

  return (
    <>
      <Navbar />
      <Landing />
      <Features />
      <HowItWorks />
      <About />
    </>
  );
}

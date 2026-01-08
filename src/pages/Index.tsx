import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Blog from "@/components/Blog";
import CodeRepos from "@/components/CodeRepos";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Blog />
        <CodeRepos />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

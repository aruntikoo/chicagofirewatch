import Header from "@/components/Header";
import LivePlayer from "@/components/LivePlayer";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import CommunityShop from "@/components/CommunityShop";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <LivePlayer />
        <Timeline />
        <Gallery />
        <CommunityShop />
      </main>
      <Footer />
    </>
  );
}

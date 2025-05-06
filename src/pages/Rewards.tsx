
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RewardsGallery from "@/components/RewardsGallery";

const Rewards = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Rewards Gallery</h1>
            <p className="text-gray-600">
              Redeem your points for eco-friendly rewards and make an even bigger impact.
            </p>
          </div>
          
          <RewardsGallery />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Rewards;

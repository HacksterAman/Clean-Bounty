
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WasteMap from "@/components/WasteMap";

const MapView = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Waste Map</h1>
            <p className="text-gray-600">
              Explore waste hotspots and see where our community is actively recycling.
            </p>
          </div>
          
          <WasteMap />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MapView;

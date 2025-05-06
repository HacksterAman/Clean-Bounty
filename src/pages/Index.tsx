
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-eco-green/10 to-white py-20">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Turn Your Waste Into <span className="text-eco-green">Rewards</span>
              </h1>
              <p className="text-lg text-gray-600">
                Upload photos of your waste, get AI-powered classification, earn points, and redeem exciting eco-friendly rewards.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-eco-green hover:bg-eco-green/90 px-8 py-6">
                  <Link to="/upload">Start Scanning</Link>
                </Button>
                <Button variant="outline" className="px-8 py-6">
                  <Link to="/rewards">View Rewards</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">1.2K+</span>
                  <span className="text-sm text-gray-500">Items Recycled</span>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">300+</span>
                  <span className="text-sm text-gray-500">Active Users</span>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">5K+</span>
                  <span className="text-sm text-gray-500">Points Awarded</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-eco-green rounded-full opacity-5 blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Waste Recycling"
                className="relative z-10 rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform makes it easy to contribute to a cleaner planet while earning rewards
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="bg-eco-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-eco-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Scan Your Waste</h3>
                <p className="text-gray-600">
                  Take a photo of your waste item using our easy upload tool. The location will be tracked automatically.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="bg-eco-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-eco-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Get AI Analysis</h3>
                <p className="text-gray-600">
                  Our AI will analyze your waste, classify it, and generate a detailed environmental impact report.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="bg-eco-brown/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-eco-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Earn & Redeem</h3>
                <p className="text-gray-600">
                  Earn points for every verified waste submission and redeem them for eco-friendly rewards and perks.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Impact Section */}
        <section className="py-16 bg-eco-green/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Environmental Impact</h2>
                <p className="text-gray-600 mb-6">
                  Together with our community, we're making a real difference in waste management and environmental sustainability.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-eco-green/20 p-3 rounded-full">
                      <svg className="w-6 h-6 text-eco-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Reduced Landfill Waste</h3>
                      <p className="text-sm text-gray-600">500+ kg of waste diverted from landfills</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-eco-green/20 p-3 rounded-full">
                      <svg className="w-6 h-6 text-eco-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Carbon Footprint Reduction</h3>
                      <p className="text-sm text-gray-600">200+ kg of CO₂ emissions prevented</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-eco-green/20 p-3 rounded-full">
                      <svg className="w-6 h-6 text-eco-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Community Engagement</h3>
                      <p className="text-sm text-gray-600">300+ active users contributing to waste management</p>
                    </div>
                  </div>
                </div>
                
                <Button className="mt-8 bg-eco-green hover:bg-eco-green/90">
                  <Link to="/map">View Waste Map</Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVjeWNsaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                  alt="Recycling"
                  className="rounded-lg h-40 object-cover w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2FzdGUlMjBtYW5hZ2VtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                  alt="Waste Management"
                  className="rounded-lg h-40 object-cover w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tbXVuaXR5JTIwY2xlYW51cHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="Community Cleanup"
                  className="rounded-lg h-40 object-cover w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Recycling Plant"
                  className="rounded-lg h-40 object-cover w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-eco-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Waste Management Community</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Start uploading waste photos today, earn points, and help us create a cleaner, more sustainable future.
            </p>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-eco-green">
              <Link to="/upload">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;


import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUploader from "@/components/ImageUploader";
import WasteClassification from "@/components/WasteClassification";
import WasteReport from "@/components/WasteReport";

const Upload = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [wasteData, setWasteData] = useState<any>(null);
  
  const handleImageSelected = (image: File, detectedLocation: { lat: number; lng: number } | null) => {
    setSelectedImage(image);
    setImageUrl(URL.createObjectURL(image));
    setLocation(detectedLocation);
    setCurrentStep(2);
  };
  
  const handleClassificationComplete = (data: any) => {
    setWasteData(data);
    setCurrentStep(3);
  };
  
  const handleReportComplete = () => {
    // Reset the form to allow for a new upload
    setCurrentStep(1);
    setSelectedImage(null);
    setImageUrl("");
    setWasteData(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Upload Waste Image</h1>
          <p className="text-gray-600 mb-8">Upload a clear photo of your waste for AI classification and earn points.</p>
          
          {/* Progress Steps */}
          <div className="flex items-center mb-8">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-eco-green text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-eco-green' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-eco-green text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-eco-green' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-eco-green text-white' : 'bg-gray-200'}`}>
              3
            </div>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Upload Your Waste Image"}
                {currentStep === 2 && "Analyze Waste Classification"}
                {currentStep === 3 && "Waste Analysis Report"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Take a clear photo of the waste item you want to classify."}
                {currentStep === 2 && "Our AI is analyzing your waste image to determine its type."}
                {currentStep === 3 && "View your detailed waste report and claim your points."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && (
                <ImageUploader onImageSelected={handleImageSelected} />
              )}
              
              {currentStep === 2 && imageUrl && (
                <WasteClassification 
                  imageUrl={imageUrl} 
                  onComplete={handleClassificationComplete} 
                />
              )}
              
              {currentStep === 3 && imageUrl && wasteData && (
                <WasteReport
                  wasteData={wasteData}
                  imageUrl={imageUrl}
                  location={location}
                  onComplete={handleReportComplete}
                />
              )}
            </CardContent>
          </Card>
          
          {/* Tips Section */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Tips for Better Waste Classification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex gap-3">
                <div className="bg-eco-green/10 p-2 rounded-full h-fit">
                  <svg className="w-6 h-6 text-eco-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Good Lighting</h4>
                  <p className="text-sm text-gray-600">Ensure your photo is taken in well-lit conditions.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-eco-green/10 p-2 rounded-full h-fit">
                  <svg className="w-6 h-6 text-eco-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Clear Focus</h4>
                  <p className="text-sm text-gray-600">Make sure your image is in focus and clear.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-eco-green/10 p-2 rounded-full h-fit">
                  <svg className="w-6 h-6 text-eco-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Single Item</h4>
                  <p className="text-sm text-gray-600">Focus on one waste item at a time for better results.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-eco-green/10 p-2 rounded-full h-fit">
                  <svg className="w-6 h-6 text-eco-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Clean Item</h4>
                  <p className="text-sm text-gray-600">Remove excess dirt for better classification.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;

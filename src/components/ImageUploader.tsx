
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const ImageUploader = ({ onImageSelected }: { onImageSelected: (image: File, location: { lat: number, lng: number } | null) => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };
  
  const processFile = async (file: File) => {
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (jpg, png, etc.)",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
    
    try {
      // Get current location
      let location = null;
      try {
        const position = await getCurrentPosition();
        location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      } catch (err) {
        console.error("Error getting location:", err);
        toast({
          title: "Location access denied",
          description: "We couldn't access your location. The waste location won't be tracked.",
          variant: "default"
        });
      }
      
      // Complete the upload simulation
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        setIsLoading(false);
        onImageSelected(file, location);
      }, 2000);
      
    } catch (error) {
      clearInterval(interval);
      setIsLoading(false);
      console.error("Error processing image:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });
  };
  
  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
          isDragging ? "border-eco-green bg-eco-green/10" : "border-gray-300 hover:border-eco-green hover:bg-gray-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="bg-eco-gray/30 p-4 rounded-full mb-4">
          <svg className="w-8 h-8 text-eco-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <p className="text-lg font-medium text-gray-700">Drag and drop your waste image here</p>
        <p className="text-sm text-gray-500 mt-1">or click to browse</p>
        <p className="text-xs text-gray-400 mt-2 text-center max-w-sm">
          Upload clear images of waste for better classification. Your location will be used to track waste hotspots.
        </p>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept="image/*"
          className="hidden"
          disabled={isLoading}
        />
        
        <Button className="mt-4 bg-eco-green hover:bg-eco-green/90" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Select Image"}
        </Button>
      </div>
      
      {isLoading && (
        <div className="mt-4">
          <Progress value={uploadProgress} className="h-2 bg-gray-100" indicatorClassName="bg-eco-green" />
          <p className="text-sm text-gray-500 mt-1 text-center">Uploading: {uploadProgress}%</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;


import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface WasteType {
  type: string;
  confidence: number;
  color: string;
  description: string;
  points: number;
}

interface WasteClassificationProps {
  imageUrl: string;
  onComplete: (wasteData: WasteType) => void;
}

const WasteClassification = ({ imageUrl, onComplete }: WasteClassificationProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [wasteTypes, setWasteTypes] = useState<WasteType[]>([]);
  const [selectedWaste, setSelectedWaste] = useState<WasteType | null>(null);
  
  useEffect(() => {
    // Simulate waste classification API call
    const analyzeWaste = async () => {
      // Progress animation
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 5;
        setProgress(Math.min(currentProgress, 95));
        
        if (currentProgress >= 95) {
          clearInterval(interval);
        }
      }, 200);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock classification results
      const mockResults: WasteType[] = [
        {
          type: "Plastic",
          confidence: 0.87,
          color: "blue",
          description: "Single-use plastic that needs proper recycling to prevent environmental damage.",
          points: 10
        },
        {
          type: "Paper",
          confidence: 0.09,
          color: "yellow",
          description: "Recyclable paper waste that can be easily processed into new paper products.",
          points: 5
        },
        {
          type: "Organic",
          confidence: 0.03,
          color: "green",
          description: "Biodegradable waste that can be composted to create nutrient-rich soil.",
          points: 3
        },
        {
          type: "Metal",
          confidence: 0.01,
          color: "gray",
          description: "Recyclable metal waste that can be melted down and reused indefinitely.",
          points: 15
        }
      ];
      
      clearInterval(interval);
      setProgress(100);
      setWasteTypes(mockResults);
      setSelectedWaste(mockResults[0]); // Select the highest confidence by default
      
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 500);
    };
    
    analyzeWaste();
  }, []);
  
  const handleConfirm = () => {
    if (selectedWaste) {
      onComplete(selectedWaste);
    }
  };
  
  const getBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "plastic":
        return "bg-blue-500 hover:bg-blue-600";
      case "paper":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "organic":
        return "bg-green-600 hover:bg-green-700";
      case "metal":
        return "bg-gray-600 hover:bg-gray-700";
      default:
        return "bg-eco-green hover:bg-eco-green/90";
    }
  };
  
  return (
    <div className="w-full">
      {isAnalyzing ? (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-eco-green/20"></div>
            <div 
              className="absolute inset-0 rounded-full border-4 border-eco-green animate-spin" 
              style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
            ></div>
            <img 
              src={imageUrl} 
              alt="Waste" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">Analyzing Waste Image</h3>
          <p className="text-sm text-gray-500 mb-4 text-center">
            Our AI is identifying the type of waste in your image and calculating environmental impact.
          </p>
          <Progress value={progress} className="w-full h-2" />
          <p className="text-xs text-gray-400 mt-2">{progress}% complete</p>
        </div>
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Waste Classification Results</span>
                <Badge variant="outline" className="bg-eco-green/10 text-eco-green border-eco-green">
                  {selectedWaste?.points} Points
                </Badge>
              </CardTitle>
              <CardDescription>
                Our AI has analyzed your waste image. Confirm or change the classification.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="w-1/3">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img src={imageUrl} alt="Waste" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="w-2/3 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Detected waste types:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {wasteTypes.map((waste, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className={`cursor-pointer ${selectedWaste?.type === waste.type ? getBadgeColor(waste.type) + ' text-white' : 'bg-gray-100'}`}
                          onClick={() => setSelectedWaste(waste)}
                        >
                          {waste.type} ({(waste.confidence * 100).toFixed(1)}%)
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {selectedWaste && (
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{selectedWaste.type} Waste</h4>
                        <Badge variant="outline" className="bg-eco-green/10 text-eco-green border-eco-green">
                          {(selectedWaste.confidence * 100).toFixed(1)}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{selectedWaste.description}</p>
                      <div className="mt-4">
                        <p className="text-xs font-medium text-gray-500">Recycling Impact:</p>
                        <div className="mt-1 flex gap-4">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-eco-green"></div>
                            <span className="text-xs">High value</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-eco-blue"></div>
                            <span className="text-xs">Water saved</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-eco-brown"></div>
                            <span className="text-xs">Energy saved</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedWaste(null)}>
                Change
              </Button>
              <Button className="bg-eco-green hover:bg-eco-green/90" onClick={handleConfirm}>
                Confirm Classification
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WasteClassification;

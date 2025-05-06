
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface WasteReportProps {
  wasteData: {
    type: string;
    confidence: number;
    description: string;
    points: number;
  };
  imageUrl: string;
  location: { lat: number; lng: number } | null;
  onComplete: () => void;
}

const WasteReport = ({ wasteData, imageUrl, location, onComplete }: WasteReportProps) => {
  const [report, setReport] = useState("");
  const [isGenerating, setIsGenerating] = useState(true);
  const [availablePointsAdded, setAvailablePointsAdded] = useState(false);

  useEffect(() => {
    const generateReport = async () => {
      setIsGenerating(true);
      
      // Simulate API call to generate report using Gemini
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI generated report based on waste type
      let generatedReport = "";
      
      switch (wasteData.type.toLowerCase()) {
        case "plastic":
          generatedReport = `This plastic waste item has been identified with ${(wasteData.confidence * 100).toFixed(1)}% confidence. It appears to be a single-use plastic item that requires proper recycling.\n\nEnvironmental Impact Analysis:\n- If not recycled, this item would take approximately 450 years to decompose in a landfill.\n- Recycling this plastic can save up to 75% of the energy required to produce new plastic.\n- This item likely consumed 0.5 liters of water during its production.\n\nRecommended Disposal Method:\nThis item should be placed in a plastic recycling bin (typically blue) after rinsing. Many recycling facilities can process this type of plastic into new products, reducing landfill waste and conserving natural resources.`;
          break;
        case "paper":
          generatedReport = `This paper waste has been identified with ${(wasteData.confidence * 100).toFixed(1)}% confidence. It appears to be recyclable paper material.\n\nEnvironmental Impact Analysis:\n- Recycling this paper item saves approximately 17 trees per ton of paper recycled.\n- Paper recycling reduces water pollution by 35% and air pollution by 74% compared to new paper production.\n- Recycling paper uses 60% less energy than manufacturing new paper.\n\nRecommended Disposal Method:\nThis item should be placed in a paper recycling bin. Ensure it is clean and free from food contaminants. Paper can typically be recycled 5-7 times before the fibers become too short for reuse.`;
          break;
        case "organic":
          generatedReport = `This organic waste has been identified with ${(wasteData.confidence * 100).toFixed(1)}% confidence. It appears to be compostable organic material.\n\nEnvironmental Impact Analysis:\n- When sent to landfill, organic waste produces methane, a greenhouse gas 25 times more potent than CO2.\n- Composting this waste could reduce greenhouse gas emissions and create nutrient-rich soil.\n- Organic waste accounts for approximately 30% of what we throw away.\n\nRecommended Disposal Method:\nThis item should be composted rather than sent to landfill. Home composting or municipal green waste collection are both excellent options. The resulting compost can enrich soil and reduce the need for chemical fertilizers.`;
          break;
        case "metal":
          generatedReport = `This metal waste has been identified with ${(wasteData.confidence * 100).toFixed(1)}% confidence. It appears to be recyclable metal material.\n\nEnvironmental Impact Analysis:\n- Recycling this metal item uses 95% less energy than producing it from raw materials.\n- Metal can be recycled indefinitely without loss of quality.\n- Mining for virgin metal ore is extremely environmentally damaging, causing habitat destruction and water pollution.\n\nRecommended Disposal Method:\nThis item should be placed in a metal recycling bin. Most metals are highly valuable in recycling streams and are actively sought by recyclers. Ensure the item is clean and free from non-metal attachments if possible.`;
          break;
        default:
          generatedReport = `This waste has been identified as ${wasteData.type} with ${(wasteData.confidence * 100).toFixed(1)}% confidence.\n\nGeneral Recycling Guidelines:\n- Always check local recycling guidelines as they vary by location.\n- Clean items before recycling to avoid contaminating other recyclables.\n- Consider reusing items before recycling when possible.\n\nThank you for contributing to a cleaner environment through proper waste management.`;
      }
      
      setReport(generatedReport);
      setIsGenerating(false);
    };
    
    generateReport();
  }, [wasteData]);
  
  const handleAddPoints = () => {
    if (!availablePointsAdded) {
      setAvailablePointsAdded(true);
      toast.success(`${wasteData.points} points added to your account!`);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Waste Analysis Report</CardTitle>
          <Badge variant="outline" className="bg-eco-green/10 text-eco-green border-eco-green">
            {wasteData.type} Waste
          </Badge>
        </div>
        <CardDescription>
          AI-generated report on environmental impact and proper disposal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="rounded-lg overflow-hidden border">
              <img src={imageUrl} alt="Waste" className="w-full aspect-square object-cover" />
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Waste Type</p>
                <p className="font-medium">{wasteData.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Confidence Score</p>
                <p className="font-medium">{(wasteData.confidence * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Points Available</p>
                <p className="font-medium text-eco-green">{wasteData.points} points</p>
              </div>
              {location && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-sm truncate">
                    {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">AI-Generated Waste Report</h3>
              {isGenerating ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ) : (
                <div className="text-sm text-gray-700 whitespace-pre-line">
                  {report}
                </div>
              )}
            </div>
            
            <Separator className="my-4" />
            
            <div className="bg-eco-green/5 border border-eco-green/20 rounded-lg p-4">
              <h3 className="font-medium mb-2 text-eco-green">Environmental Impact</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded border">
                  <p className="text-xs text-gray-500">CO₂ Saved</p>
                  <p className="font-medium">0.8 kg</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-xs text-gray-500">Water Saved</p>
                  <p className="font-medium">15 liters</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-xs text-gray-500">Energy Saved</p>
                  <p className="font-medium">0.5 kWh</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-xs text-gray-500">Landfill Reduction</p>
                  <p className="font-medium">0.2 kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant={availablePointsAdded ? "outline" : "default"}
          className={availablePointsAdded ? "" : "bg-eco-green hover:bg-eco-green/90"}
          onClick={handleAddPoints}
          disabled={availablePointsAdded}
        >
          {availablePointsAdded ? "Points Added" : `Claim ${wasteData.points} Points`}
        </Button>
        <Button onClick={onComplete}>
          Complete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WasteReport;

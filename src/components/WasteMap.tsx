
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface WasteLocation {
  id: number;
  lat: number;
  lng: number;
  type: string;
  timestamp: string;
}

const WasteMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<WasteLocation | null>(null);
  
  const mockLocations: WasteLocation[] = [
    { id: 1, lat: 37.7749, lng: -122.4194, type: "Plastic", timestamp: "2023-05-01T14:30:00Z" },
    { id: 2, lat: 37.7694, lng: -122.4862, type: "Paper", timestamp: "2023-05-02T09:15:00Z" },
    { id: 3, lat: 37.8199, lng: -122.4783, type: "Metal", timestamp: "2023-05-03T16:45:00Z" },
    { id: 4, lat: 37.7724, lng: -122.4092, type: "Organic", timestamp: "2023-05-04T12:20:00Z" },
    { id: 5, lat: 37.7575, lng: -122.4376, type: "Plastic", timestamp: "2023-05-05T08:10:00Z" },
  ];
  
  useEffect(() => {
    // Placeholder for map integration
    // In a real implementation, we would initialize a Google Maps instance here
    
    const mockMapInitialization = () => {
      if (mapContainerRef.current) {
        const mockMap = document.createElement("div");
        mockMap.className = "relative bg-blue-50 w-full h-full rounded-lg overflow-hidden";
        mockMap.innerHTML = `
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <svg class="w-12 h-12 text-eco-blue mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
              <p class="text-gray-600 font-medium">Map Visualization</p>
              <p class="text-sm text-gray-500">(Map would display here with Google Maps API)</p>
            </div>
          </div>
        `;
        
        // Add mock markers
        mockLocations.forEach((location, index) => {
          const marker = document.createElement("div");
          marker.className = `absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow`;
          
          // Position randomly within the container
          const top = 30 + Math.random() * 40;
          const left = 30 + Math.random() * 40;
          marker.style.top = `${top}%`;
          marker.style.left = `${left}%`;
          
          // Color based on waste type
          let markerColor = "bg-eco-green";
          switch (location.type) {
            case "Plastic": markerColor = "bg-blue-500"; break;
            case "Paper": markerColor = "bg-yellow-500"; break;
            case "Metal": markerColor = "bg-gray-500"; break;
            case "Organic": markerColor = "bg-green-600"; break;
          }
          
          marker.innerHTML = `
            <div class="relative group">
              <div class="w-4 h-4 rounded-full ${markerColor}"></div>
              <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 hidden group-hover:block bg-white shadow-md rounded p-2 text-xs w-24">
                ${location.type} waste
              </div>
            </div>
          `;
          
          marker.addEventListener("click", () => {
            setSelectedLocation(location);
          });
          
          mockMap.appendChild(marker);
        });
        
        mapContainerRef.current.innerHTML = "";
        mapContainerRef.current.appendChild(mockMap);
      }
    };
    
    mockMapInitialization();
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Waste Map</h2>
        <div className="flex gap-2">
          <Badge className="bg-blue-500">Plastic</Badge>
          <Badge className="bg-yellow-500">Paper</Badge>
          <Badge className="bg-green-600">Organic</Badge>
          <Badge className="bg-gray-500">Metal</Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        <div className="md:col-span-2 rounded-lg overflow-hidden border h-[500px]">
          <div ref={mapContainerRef} className="w-full h-full">
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">Loading map...</p>
            </div>
          </div>
        </div>
        
        <div className="h-[500px] overflow-y-auto">
          {selectedLocation ? (
            <Card>
              <CardHeader>
                <CardTitle>Selected Location</CardTitle>
                <CardDescription>
                  Details about the selected waste point
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Waste Type</p>
                    <Badge className="mt-1">
                      {selectedLocation.type}
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Coordinates</p>
                    <p className="font-mono text-sm">
                      {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Reported On</p>
                    <p>{formatDate(selectedLocation.timestamp)}</p>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      Verified
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Waste Locations</CardTitle>
                <CardDescription>
                  Click on a marker to view details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockLocations.map((location) => (
                    <div 
                      key={location.id}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-white">
                          {location.type}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDate(location.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default WasteMap;

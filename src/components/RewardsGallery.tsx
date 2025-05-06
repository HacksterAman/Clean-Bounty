
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Reward {
  id: number;
  name: string;
  description: string;
  points: number;
  category: string;
  image: string;
}

const RewardsGallery = () => {
  const [userPoints, setUserPoints] = useState(120);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const rewards: Reward[] = [
    {
      id: 1,
      name: "Plant a Tree",
      description: "We'll plant a tree on your behalf through our reforestation partners.",
      points: 100,
      category: "Environment",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      name: "5% Off at EcoStore",
      description: "Get 5% off your next purchase at our partner eco-friendly store.",
      points: 50,
      category: "Discount",
      image: "https://images.unsplash.com/photo-1608299882289-176343a1e26b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzY291bnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      name: "Reusable Water Bottle",
      description: "Premium stainless steel water bottle with our logo.",
      points: 200,
      category: "Merchandise",
      image: "https://images.unsplash.com/photo-1546146977-93de3fc367e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      name: "Eco Workshop Ticket",
      description: "Free entry to our upcoming workshop on sustainable living.",
      points: 80,
      category: "Event",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29ya3Nob3B8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      name: "Community Garden Donation",
      description: "Donate to a local community garden project in your name.",
      points: 150,
      category: "Environment",
      image: "https://images.unsplash.com/photo-1571469228067-15a1dd9de7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tbXVuaXR5JTIwZ2FyZGVufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 6,
      name: "Eco-friendly Tote Bag",
      description: "Organic cotton tote bag with our eco-friendly design.",
      points: 75,
      category: "Merchandise",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG90ZSUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
  ];
  
  const categories = Array.from(new Set(rewards.map(reward => reward.category)));
  
  const filteredRewards = activeCategory 
    ? rewards.filter(reward => reward.category === activeCategory)
    : rewards;
  
  const handleRedeemReward = (reward: Reward) => {
    if (userPoints >= reward.points) {
      setUserPoints(userPoints - reward.points);
      toast.success(`You've redeemed ${reward.name}!`);
    } else {
      toast.error("You don't have enough points for this reward.");
    }
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Rewards Gallery</h2>
          <p className="text-gray-500">Redeem your points for eco-friendly rewards</p>
        </div>
        <div className="bg-eco-green/10 px-4 py-3 rounded-lg border border-eco-green/20">
          <p className="text-sm font-medium">Your Points Balance</p>
          <p className="text-2xl font-bold text-eco-green">{userPoints} points</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={activeCategory === null ? "default" : "outline"}
          className={activeCategory === null ? "bg-eco-green hover:bg-eco-green/90" : ""}
          onClick={() => setActiveCategory(null)}
        >
          All Categories
        </Button>
        
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className={activeCategory === category ? "bg-eco-green hover:bg-eco-green/90" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map(reward => (
          <Card key={reward.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={reward.image}
                alt={reward.name}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{reward.name}</CardTitle>
                <Badge variant="secondary">{reward.points} pts</Badge>
              </div>
              <CardDescription>{reward.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                className="w-full bg-eco-green hover:bg-eco-green/90"
                disabled={userPoints < reward.points}
                onClick={() => handleRedeemReward(reward)}
              >
                {userPoints >= reward.points ? "Redeem Reward" : "Not Enough Points"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RewardsGallery;

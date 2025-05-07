import { useState } from 'react';
import { analyzeImage, generateBountyDescription } from '@/lib/ai';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export function AITest() {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [analysis, setAnalysis] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setError(null);
      
      // Create a temporary URL for the uploaded file
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      // Analyze the image
      const imageAnalysis = await analyzeImage(url);
      setAnalysis(imageAnalysis);

      // Generate bounty description
      const bountyDescription = await generateBountyDescription(imageAnalysis);
      setDescription(bountyDescription);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>AI Integration Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Upload an image of waste or environmental issue</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={loading}
              />
            </div>

            {loading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {imageUrl && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Uploaded Image:</h3>
                  <img
                    src={imageUrl}
                    alt="Uploaded waste"
                    className="max-w-md rounded-lg shadow-md"
                  />
                </div>

                {analysis && (
                  <div>
                    <h3 className="font-semibold mb-2">AI Analysis:</h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-md">
                      {analysis}
                    </p>
                  </div>
                )}

                {description && (
                  <div>
                    <h3 className="font-semibold mb-2">Generated Bounty Description:</h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-md">
                      {description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
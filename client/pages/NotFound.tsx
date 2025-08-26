import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardHeader className="pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-3xl text-gray-900">
              404 - Page Not Found
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 mt-2">
              The page you're looking for doesn't exist or has been moved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600">
              Don't worry! You can find what you're looking for from our homepage or browse our popular polls.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button>
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Link to="/polls">
                <Button variant="outline">
                  Browse Polls
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

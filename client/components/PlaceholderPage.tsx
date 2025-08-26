import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Construction, ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  suggestedAction?: string;
}

export default function PlaceholderPage({
  title,
  description,
  suggestedAction = "Continue exploring our features while we build this page",
}: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardHeader className="pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center">
                <Construction className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-gray-900">{title}</CardTitle>
            <CardDescription className="text-lg text-gray-600 mt-2">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600">{suggestedAction}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/polls">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Link to="/polls">
                <Button>Browse Polls</Button>
              </Link>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-gray-500 mb-4">
                Want this page to be prioritized? Let us know!
              </p>
              <Button variant="ghost" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

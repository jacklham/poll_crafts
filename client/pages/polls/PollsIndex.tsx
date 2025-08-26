import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Vote, TrendingUp, Clock, Users, Search, Filter, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface Poll {
  id: string;
  title: string;
  description: string;
  author: string;
  totalVotes: number;
  createdAt: string;
  category: string;
  duration: string;
  options: string[];
}

export default function PollsIndex() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for demonstration (this will be mixed with real created polls)
  const mockPolls: Poll[] = [
    {
      id: "mock-1",
      title: "What's your favorite programming language in 2024?",
      description: "Help us understand the current trends in software development",
      author: "TechCommunity",
      totalVotes: 1247,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      category: "Technology",
      duration: "7",
      options: ["JavaScript", "Python", "TypeScript", "Go"]
    },
    {
      id: "mock-2",
      title: "Best vacation destination for 2024?",
      description: "Share your travel preferences and discover new places",
      author: "WanderlustGuide",
      totalVotes: 856,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      category: "Travel",
      duration: "14",
      options: ["Japan", "Italy", "Iceland", "New Zealand"]
    },
    {
      id: "mock-3",
      title: "Which streaming service offers the best value?",
      description: "Compare popular streaming platforms",
      author: "MediaReviewer",
      totalVotes: 634,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      category: "Entertainment",
      duration: "7",
      options: ["Netflix", "Disney+", "Amazon Prime", "Hulu"]
    }
  ];

  useEffect(() => {
    // Load created polls from localStorage
    const storedPolls = JSON.parse(localStorage.getItem('pollcraft_polls') || '[]');
    
    // Combine with mock polls for demonstration
    const allPolls = [...storedPolls, ...mockPolls];
    
    // Sort by creation date (newest first)
    allPolls.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    setPolls(allPolls);
  }, []);

  const getTimeLeft = (createdAt: string, duration: string) => {
    if (duration === "0") return "No end date";
    
    const created = new Date(createdAt);
    const durationDays = parseInt(duration);
    const endDate = new Date(created.getTime() + durationDays * 24 * 60 * 60 * 1000);
    const now = new Date();
    
    if (endDate < now) return "Ended";
    
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  };

  const isHot = (totalVotes: number) => totalVotes > 500;

  // Filter polls based on search term
  const filteredPolls = polls.filter(poll =>
    poll.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    poll.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    poll.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Separate trending polls (high vote count or recent)
  const trendingPolls = filteredPolls.filter(poll => 
    isHot(poll.totalVotes) || 
    new Date(poll.createdAt).getTime() > Date.now() - 3 * 24 * 60 * 60 * 1000
  ).slice(0, 6);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Polls
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Explore polls, share your opinion, and see what others think
          </p>
          <Link to="/create">
            <Button size="lg" className="mb-4">
              <Plus className="w-4 h-4 mr-2" />
              Create Your Poll
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search polls..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Trending Polls */}
        {trendingPolls.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              Trending Polls
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingPolls.map((poll) => (
                <Card key={poll.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant={isHot(poll.totalVotes) ? "default" : "secondary"} className="mb-2">
                        {poll.category}
                      </Badge>
                      {isHot(poll.totalVotes) && (
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                    <CardTitle className="text-lg leading-tight">{poll.title}</CardTitle>
                    <CardDescription>{poll.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {poll.totalVotes} votes
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {getTimeLeft(poll.createdAt, poll.duration)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">by {poll.author}</span>
                      <Button size="sm" className="flex items-center gap-1">
                        <Vote className="w-4 h-4" />
                        Vote Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Polls */}
        {filteredPolls.length > trendingPolls.length && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              All Polls ({filteredPolls.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPolls.slice(trendingPolls.length).map((poll) => (
                <Card key={poll.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">
                      {poll.category}
                    </Badge>
                    <CardTitle className="text-lg leading-tight">{poll.title}</CardTitle>
                    <CardDescription>{poll.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {poll.totalVotes} votes
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {getTimeLeft(poll.createdAt, poll.duration)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">by {poll.author}</span>
                      <Button size="sm" className="flex items-center gap-1">
                        <Vote className="w-4 h-4" />
                        Vote Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredPolls.length === 0 && (
          <div className="text-center py-12">
            <Vote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? "No polls found" : "No polls yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? "Try adjusting your search terms" 
                : "Be the first to create a poll and start the conversation!"
              }
            </p>
            <Link to="/create">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create First Poll
              </Button>
            </Link>
          </div>
        )}

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Technology", "Entertainment", "Sports", "Politics", 
              "Travel", "Food", "Fashion", "Health", "Education", 
              "Business", "Science", "Art"
            ].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="h-16 text-center hover:bg-indigo-50 hover:border-indigo-300"
                onClick={() => setSearchTerm(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

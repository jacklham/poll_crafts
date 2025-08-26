import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Vote, TrendingUp, Clock, Users, Search, Filter } from "lucide-react";

export default function PollsIndex() {
  // Mock data for polls
  const featuredPolls = [
    {
      id: 1,
      title: "What's your favorite programming language in 2024?",
      description: "Help us understand the current trends in software development",
      author: "TechCommunity",
      votes: 1247,
      timeLeft: "2 days left",
      category: "Technology",
      isHot: true
    },
    {
      id: 2,
      title: "Best vacation destination for 2024?",
      description: "Share your travel preferences and discover new places",
      author: "WanderlustGuide",
      votes: 856,
      timeLeft: "5 days left",
      category: "Travel",
      isHot: false
    },
    {
      id: 3,
      title: "Which streaming service offers the best value?",
      description: "Compare popular streaming platforms",
      author: "MediaReviewer",
      votes: 634,
      timeLeft: "1 day left",
      category: "Entertainment",
      isHot: true
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Polls
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore thousands of polls, share your opinion, and see what others think
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search polls..."
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Featured Polls */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            Trending Polls
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPolls.map((poll) => (
              <Card key={poll.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant={poll.isHot ? "default" : "secondary"} className="mb-2">
                      {poll.category}
                    </Badge>
                    {poll.isHot && (
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
                      {poll.votes} votes
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {poll.timeLeft}
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

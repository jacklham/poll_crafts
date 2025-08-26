import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Vote, 
  TrendingUp, 
  Users, 
  PlusCircle, 
  BarChart3, 
  Zap, 
  Shield, 
  Globe,
  ArrowRight,
  Star
} from "lucide-react";

export default function Index() {
  const featuredPolls = [
    {
      id: 1,
      title: "What's the most important tech skill in 2024?",
      votes: 1247,
      timeLeft: "2 days left",
      category: "Technology"
    },
    {
      id: 2,
      title: "Best work-from-home setup?",
      votes: 856,
      timeLeft: "5 days left",
      category: "Lifestyle"
    },
    {
      id: 3,
      title: "Which AI tool has changed your workflow?",
      votes: 634,
      timeLeft: "1 day left",
      category: "AI & Tech"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Create and share polls in seconds with our intuitive interface"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Get instant insights with beautiful, live updating charts"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Anonymous voting options and secure data handling"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with thousands of active poll creators worldwide"
    }
  ];

  const stats = [
    { label: "Active Users", value: "15K+", icon: Users },
    { label: "Polls Created", value: "50K+", icon: Vote },
    { label: "Total Votes", value: "2M+", icon: TrendingUp },
    { label: "Communities", value: "500+", icon: Globe }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" variant="secondary">
              🎉 Join 15,000+ poll creators
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Create{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Amazing Polls
              </span>
              <br />
              That People Love
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Build engaging polls, gather meaningful insights, and connect with communities. 
              From simple yes/no questions to complex surveys, make every opinion count.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/create">
                <Button size="lg" className="text-lg px-8 py-6">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Create Your First Poll
                </Button>
              </Link>
              <Link to="/polls">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Browse Polls
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Polls */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trending Polls Right Now
            </h2>
            <p className="text-xl text-gray-600">
              See what's capturing attention in our community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredPolls.map((poll) => (
              <Card key={poll.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">
                    {poll.category}
                  </Badge>
                  <CardTitle className="text-lg leading-tight">{poll.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {poll.votes} votes
                    </span>
                    <span>{poll.timeLeft}</span>
                  </div>
                  <Button size="sm" className="w-full">
                    <Vote className="w-4 h-4 mr-2" />
                    Vote Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link to="/polls">
              <Button variant="outline" size="lg">
                Explore All Polls
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose PollCraft?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create, share, and analyze polls
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <Icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using PollCraft to gather insights and engage their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Star className="w-5 h-5 mr-2" />
                Start Free Today
              </Button>
            </Link>
            <Link to="/create">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-indigo-600">
                Create a Poll
                <PlusCircle className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

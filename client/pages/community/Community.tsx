import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Award, MessageCircle, Star, ChevronRight } from "lucide-react";

export default function Community() {
  const topContributors = [
    { name: "Alex Chen", polls: 45, votes: 1240, badge: "Poll Master" },
    { name: "Sarah Wilson", polls: 38, votes: 987, badge: "Trendsetter" },
    { name: "Mike Johnson", polls: 32, votes: 856, badge: "Community Star" },
    { name: "Emma Davis", polls: 28, votes: 743, badge: "Rising Star" },
  ];

  const recentActivity = [
    { user: "John Doe", action: "created a poll", target: "Best coding framework 2024", time: "2 hours ago" },
    { user: "Jane Smith", action: "voted on", target: "Favorite vacation spots", time: "4 hours ago" },
    { user: "Bob Wilson", action: "commented on", target: "Tech trends discussion", time: "6 hours ago" },
    { user: "Lisa Brown", action: "shared", target: "Food preference survey", time: "8 hours ago" },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Community Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with fellow poll creators and discover what's trending in our vibrant community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Community Stats */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Community Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">15,423</div>
                    <p className="text-gray-600">Active Members</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">2,847</div>
                    <p className="text-gray-600">Polls This Month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">89,541</div>
                    <p className="text-gray-600">Total Votes</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-indigo-600" />
                Recent Activity
              </h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span>
                            <span className="text-gray-600"> {activity.action} </span>
                            <span className="font-medium text-indigo-600">{activity.target}</span>
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  Top Contributors
                </CardTitle>
                <CardDescription>This month's most active community members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="text-lg font-bold text-gray-400 w-6">
                        #{index + 1}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{contributor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{contributor.name}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span>{contributor.polls} polls</span>
                          <span>•</span>
                          <span>{contributor.votes} votes</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {contributor.badge}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                <ul className="space-y-2">
                  <li>• Be respectful and inclusive</li>
                  <li>• Create meaningful, engaging polls</li>
                  <li>• Avoid spam or duplicate content</li>
                  <li>• Use constructive feedback</li>
                  <li>• Follow platform rules</li>
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Read Full Guidelines
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Vote, 
  Clock, 
  Users, 
  CheckCircle, 
  ArrowLeft, 
  Share2, 
  Flag,
  BarChart3 
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

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
  votes: Record<string, number>;
  multipleChoice: boolean;
  anonymousVoting: boolean;
  publicResults: boolean;
}

interface UserVote {
  pollId: string;
  selectedOptions: number[];
  votedAt: string;
}

export default function PollDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [poll, setPoll] = useState<Poll | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [userVotes, setUserVotes] = useState<UserVote[]>([]);

  useEffect(() => {
    loadPoll();
    loadUserVotes();
  }, [id]);

  const loadPoll = () => {
    try {
      // Load from stored polls and mock polls
      const storedPolls = JSON.parse(localStorage.getItem('pollcraft_polls') || '[]');
      const mockPolls = getMockPolls();
      const allPolls = [...storedPolls, ...mockPolls];
      
      const foundPoll = allPolls.find(p => p.id === id);
      
      if (foundPoll) {
        // Ensure votes object exists and is properly formatted
        if (!foundPoll.votes) {
          foundPoll.votes = {};
          foundPoll.options.forEach((_, index) => {
            foundPoll.votes[index] = 0;
          });
        }
        setPoll(foundPoll);
      } else {
        toast.error("Poll not found");
        navigate("/polls");
      }
    } catch (error) {
      console.error("Error loading poll:", error);
      toast.error("Failed to load poll");
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserVotes = () => {
    if (!user) return;
    
    try {
      const votes = JSON.parse(localStorage.getItem(`pollcraft_user_votes_${user.id}`) || '[]');
      setUserVotes(votes);
      
      // Check if user already voted on this poll
      const existingVote = votes.find((vote: UserVote) => vote.pollId === id);
      if (existingVote) {
        setHasVoted(true);
        setSelectedOptions(existingVote.selectedOptions);
      }
    } catch (error) {
      console.error("Error loading user votes:", error);
    }
  };

  const getMockPolls = () => [
    {
      id: "mock-1",
      title: "What's your favorite programming language in 2024?",
      description: "Help us understand the current trends in software development",
      author: "TechCommunity",
      totalVotes: 1247,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Technology",
      duration: "7",
      options: ["JavaScript", "Python", "TypeScript", "Go"],
      votes: { "0": 412, "1": 389, "2": 298, "3": 148 },
      multipleChoice: false,
      anonymousVoting: true,
      publicResults: true
    },
    {
      id: "mock-2",
      title: "Best vacation destination for 2024?",
      description: "Share your travel preferences and discover new places",
      author: "WanderlustGuide",
      totalVotes: 856,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Travel",
      duration: "14",
      options: ["Japan", "Italy", "Iceland", "New Zealand"],
      votes: { "0": 234, "1": 298, "2": 167, "3": 157 },
      multipleChoice: false,
      anonymousVoting: true,
      publicResults: true
    },
    {
      id: "mock-3",
      title: "Which streaming service offers the best value?",
      description: "Compare popular streaming platforms",
      author: "MediaReviewer",
      totalVotes: 634,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Entertainment",
      duration: "7",
      options: ["Netflix", "Disney+", "Amazon Prime", "Hulu"],
      votes: { "0": 201, "1": 156, "2": 178, "3": 99 },
      multipleChoice: false,
      anonymousVoting: true,
      publicResults: true
    }
  ];

  const handleOptionSelect = (optionIndex: number) => {
    if (hasVoted || !isAuthenticated) return;

    if (poll?.multipleChoice) {
      // Multiple choice: toggle selection
      setSelectedOptions(prev => 
        prev.includes(optionIndex)
          ? prev.filter(i => i !== optionIndex)
          : [...prev, optionIndex]
      );
    } else {
      // Single choice: replace selection
      setSelectedOptions([optionIndex]);
    }
  };

  const handleVote = async () => {
    if (!poll || !user || selectedOptions.length === 0 || hasVoted) return;

    setIsVoting(true);
    
    try {
      // Update poll votes
      const updatedPoll = { ...poll };
      selectedOptions.forEach(optionIndex => {
        updatedPoll.votes[optionIndex] = (updatedPoll.votes[optionIndex] || 0) + 1;
      });
      updatedPoll.totalVotes += 1;

      // Save updated poll
      const storedPolls = JSON.parse(localStorage.getItem('pollcraft_polls') || '[]');
      const pollIndex = storedPolls.findIndex((p: Poll) => p.id === poll.id);
      if (pollIndex !== -1) {
        storedPolls[pollIndex] = updatedPoll;
        localStorage.setItem('pollcraft_polls', JSON.stringify(storedPolls));
      }

      // Save user vote
      const newVote: UserVote = {
        pollId: poll.id,
        selectedOptions,
        votedAt: new Date().toISOString()
      };
      
      const updatedUserVotes = [...userVotes, newVote];
      setUserVotes(updatedUserVotes);
      localStorage.setItem(`pollcraft_user_votes_${user.id}`, JSON.stringify(updatedUserVotes));

      // Update UI state
      setPoll(updatedPoll);
      setHasVoted(true);
      
      toast.success("🗳️ Your vote has been recorded!");
      
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to record vote. Please try again.");
    } finally {
      setIsVoting(false);
    }
  };

  const getTimeLeft = () => {
    if (!poll || poll.duration === "0") return "No end date";
    
    const created = new Date(poll.createdAt);
    const durationDays = parseInt(poll.duration);
    const endDate = new Date(created.getTime() + durationDays * 24 * 60 * 60 * 1000);
    const now = new Date();
    
    if (endDate < now) return "Ended";
    
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  };

  const getOptionPercentage = (optionIndex: number) => {
    if (!poll || poll.totalVotes === 0) return 0;
    return ((poll.votes[optionIndex] || 0) / poll.totalVotes) * 100;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!poll) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Poll Not Found</h1>
          <p className="text-gray-600 mb-6">The poll you're looking for doesn't exist or has been removed.</p>
          <Link to="/polls">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Polls
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const timeLeft = getTimeLeft();
  const isPollEnded = timeLeft === "Ended";

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/polls">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Polls
            </Button>
          </Link>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Badge className="mb-3">{poll.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{poll.title}</h1>
              {poll.description && (
                <p className="text-lg text-gray-600 mb-4">{poll.description}</p>
              )}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {poll.totalVotes} votes
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {timeLeft}
                </span>
                <span>by {poll.author}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Flag className="w-4 h-4 mr-2" />
                Report
              </Button>
            </div>
          </div>
        </div>

        {/* Authentication Alert */}
        {!isAuthenticated && (
          <Alert className="mb-6">
            <Vote className="h-4 w-4" />
            <AlertDescription>
              <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link> to vote on this poll and see your voting history.
            </AlertDescription>
          </Alert>
        )}

        {/* Voting Interface */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {hasVoted ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  You've Voted!
                </>
              ) : (
                <>
                  <Vote className="w-5 h-5" />
                  Cast Your Vote
                </>
              )}
            </CardTitle>
            {poll.multipleChoice && (
              <CardDescription>
                You can select multiple options for this poll.
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {poll.options.map((option, index) => {
              const percentage = getOptionPercentage(index);
              const voteCount = poll.votes[index] || 0;
              const isSelected = selectedOptions.includes(index);
              
              return (
                <div
                  key={index}
                  className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
                    hasVoted
                      ? isSelected
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 bg-gray-50"
                      : isSelected
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                  } ${isPollEnded || !isAuthenticated ? "cursor-not-allowed opacity-60" : ""}`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{option}</span>
                    <div className="flex items-center gap-2">
                      {hasVoted && poll.publicResults && (
                        <span className="text-sm text-gray-600">
                          {voteCount} votes ({percentage.toFixed(1)}%)
                        </span>
                      )}
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </div>
                  
                  {hasVoted && poll.publicResults && (
                    <Progress value={percentage} className="h-2" />
                  )}
                </div>
              );
            })}

            {!hasVoted && isAuthenticated && !isPollEnded && (
              <Button
                onClick={handleVote}
                disabled={selectedOptions.length === 0 || isVoting}
                className="w-full"
                size="lg"
              >
                {isVoting ? "Recording Vote..." : "Submit Vote"}
              </Button>
            )}

            {isPollEnded && (
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  This poll has ended. No more votes are being accepted.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Poll Statistics */}
        {hasVoted && poll.publicResults && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Poll Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {poll.options.map((option, index) => {
                  const percentage = getOptionPercentage(index);
                  const voteCount = poll.votes[index] || 0;
                  
                  return (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{option}</span>
                        <span className="text-sm text-gray-600">
                          {voteCount} votes ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={percentage} className="h-3" />
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Total votes: {poll.totalVotes} • 
                  Poll created: {new Date(poll.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}

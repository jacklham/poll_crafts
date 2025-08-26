import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  PlusCircle,
  X,
  Users,
  Settings,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface PollData {
  title: string;
  description: string;
  options: string[];
  category: string;
  duration: string;
  multipleChoice: boolean;
  anonymousVoting: boolean;
  publicResults: boolean;
}

export default function CreatePoll() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<PollData>({
    title: "",
    description: "",
    options: ["", ""],
    category: "",
    duration: "",
    multipleChoice: false,
    anonymousVoting: true,
    publicResults: true,
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const updateFormData = (field: keyof PollData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addOption = () => {
    if (formData.options.length < 10) {
      // Limit to 10 options
      updateFormData("options", [...formData.options, ""]);
    }
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      updateFormData("options", newOptions);
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    updateFormData("options", newOptions);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate title
    if (!formData.title.trim()) {
      newErrors.title = "Poll question is required";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Poll question must be at least 5 characters long";
    }

    // Validate options
    const validOptions = formData.options.filter(
      (option) => option.trim() !== "",
    );
    if (validOptions.length < 2) {
      newErrors.options = "At least 2 poll options are required";
    } else if (validOptions.length !== new Set(validOptions).size) {
      newErrors.options = "Poll options must be unique";
    }

    // Validate category
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    // Validate duration
    if (!formData.duration) {
      newErrors.duration = "Please select poll duration";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call (in real app, this would call your backend)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create poll object
      const pollId = Date.now().toString();
      const newPoll = {
        id: pollId,
        ...formData,
        options: formData.options.filter((option) => option.trim() !== ""),
        createdAt: new Date().toISOString(),
        votes: {},
        totalVotes: 0,
        author: "Current User", // In real app, get from auth context
      };

      // Save to localStorage (in real app, save to database)
      const existingPolls = JSON.parse(
        localStorage.getItem("pollcraft_polls") || "[]",
      );
      existingPolls.push(newPoll);
      localStorage.setItem("pollcraft_polls", JSON.stringify(existingPolls));

      setSuccess(true);
      toast.success("🎉 Poll created successfully!");

      // Redirect to polls page after a short delay
      setTimeout(() => {
        navigate("/polls");
      }, 2000);
    } catch (error) {
      console.error("Error creating poll:", error);
      toast.error("Failed to create poll. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Poll Created Successfully!
              </h2>
              <p className="text-gray-600 mb-4">
                Your poll "{formData.title}" has been created and is now live.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to polls page...
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create a New Poll
          </h1>
          <p className="text-xl text-gray-600">
            Get insights from your community with engaging polls
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5" />
                  Poll Details
                </CardTitle>
                <CardDescription>
                  Fill in the basic information about your poll
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Poll Question</Label>
                  <Input
                    id="title"
                    placeholder="What question do you want to ask?"
                    className="text-lg"
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide additional context or details about your poll..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      updateFormData("description", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-4">
                  <Label>Poll Options</Label>
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                      />
                      {formData.options.length > 2 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeOption(index)}
                          type="button"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {formData.options.length < 10 && (
                    <Button
                      variant="outline"
                      onClick={addOption}
                      className="w-full"
                      type="button"
                    >
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add Option
                    </Button>
                  )}
                  {errors.options && (
                    <p className="text-sm text-red-600">{errors.options}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => updateFormData("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="politics">Politics</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-600">{errors.category}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Poll Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="duration">Poll Duration</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => updateFormData("duration", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="7">1 Week</SelectItem>
                      <SelectItem value="14">2 Weeks</SelectItem>
                      <SelectItem value="30">1 Month</SelectItem>
                      <SelectItem value="0">No End Date</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.duration && (
                    <p className="text-sm text-red-600">{errors.duration}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Multiple Choice</Label>
                    <p className="text-sm text-gray-500">
                      Allow multiple selections
                    </p>
                  </div>
                  <Switch
                    checked={formData.multipleChoice}
                    onCheckedChange={(checked) =>
                      updateFormData("multipleChoice", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Anonymous Voting</Label>
                    <p className="text-sm text-gray-500">
                      Hide voter identities
                    </p>
                  </div>
                  <Switch
                    checked={formData.anonymousVoting}
                    onCheckedChange={(checked) =>
                      updateFormData("anonymousVoting", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Results</Label>
                    <p className="text-sm text-gray-500">
                      Show results to everyone
                    </p>
                  </div>
                  <Switch
                    checked={formData.publicResults}
                    onCheckedChange={(checked) =>
                      updateFormData("publicResults", checked)
                    }
                  />
                </div>

                <div className="pt-4 border-t">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Poll..." : "Create Poll"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                <ul className="space-y-1">
                  <li>• Keep polls respectful and inclusive</li>
                  <li>• Avoid spam or duplicate content</li>
                  <li>• Use clear, unbiased language</li>
                  <li>• Follow community standards</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}


import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Lightbulb,
  Target,
  TrendingUp,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const AICoach = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      content: `Hello ${user?.name}! I'm your AI Career Coach powered by Mistral AI. I'm here to help you with career guidance, skill development, job search strategies, and professional growth. What would you like to discuss today?`,
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        "Help me choose a career path",
        "How to improve my resume?",
        "What skills should I learn?",
        "Job interview preparation tips"
      ]
    };
    setMessages([welcomeMessage]);
  }, [user?.name]);

  const mockAIResponses = [
    {
      trigger: ['career', 'path', 'choose', 'direction'],
      response: "Choosing a career path is an exciting journey! Based on your profile, I'd recommend considering your natural strengths, interests, and market demand. Let's start with a few questions: What activities make you lose track of time? What problems do you enjoy solving? Understanding these can help identify careers that align with your passions and strengths.",
      suggestions: ["Tell me about software development", "What about data science?", "Marketing career options"]
    },
    {
      trigger: ['resume', 'cv', 'improve'],
      response: "A strong resume is crucial for career success! Here are key tips: 1) Use a clean, ATS-friendly format, 2) Start with a compelling summary highlighting your value proposition, 3) Use action verbs and quantify achievements, 4) Tailor keywords to each job application, 5) Keep it concise (1-2 pages). Would you like specific advice for your industry?",
      suggestions: ["Resume templates", "How to quantify achievements?", "ATS optimization tips"]
    },
    {
      trigger: ['skills', 'learn', 'development', 'training'],
      response: "Skill development is key to career advancement! The most valuable skills combine technical expertise with soft skills. For 2024, I recommend focusing on: AI/Machine Learning, Data Analysis, Digital Marketing, Cloud Computing, and Cybersecurity for technical skills. For soft skills: Emotional Intelligence, Leadership, Communication, and Adaptability. What's your current field?",
      suggestions: ["Python programming", "Leadership skills", "Digital marketing", "Data analysis"]
    },
    {
      trigger: ['interview', 'preparation', 'tips'],
      response: "Interview preparation is crucial for success! Here's my proven strategy: 1) Research the company thoroughly, 2) Practice the STAR method for behavioral questions, 3) Prepare thoughtful questions about the role and company, 4) Practice technical skills relevant to the position, 5) Plan your outfit and route in advance. Remember, interviews are conversations - show genuine interest and enthusiasm!",
      suggestions: ["STAR method examples", "Common interview questions", "Technical interview prep"]
    },
    {
      trigger: ['salary', 'negotiation', 'compensation'],
      response: "Salary negotiation is a valuable skill! Research market rates using Glassdoor, PayScale, and industry reports. Consider the total compensation package, not just base salary. Best practices: 1) Never accept the first offer immediately, 2) Express enthusiasm first, then discuss compensation, 3) Use data to support your request, 4) Be prepared to walk away if needed. Timing is everything - negotiate after receiving an offer, not during early interviews.",
      suggestions: ["Negotiation scripts", "How to research salary ranges", "Benefits to consider"]
    }
  ];

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Find matching response
    const matchedResponse = mockAIResponses.find(response =>
      response.trigger.some(trigger => lowerMessage.includes(trigger))
    );

    if (matchedResponse) {
      return {
        id: Date.now().toString(),
        content: matchedResponse.response,
        isBot: true,
        timestamp: new Date(),
        suggestions: matchedResponse.suggestions
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      content: "That's an interesting question! While I specialize in career guidance, I'd love to help you with topics like career planning, skill development, resume optimization, interview preparation, and professional growth strategies. Could you tell me more about your career goals or any specific challenges you're facing?",
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        "Career planning advice",
        "Skills development roadmap",
        "Job search strategies",
        "Professional networking tips"
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { icon: Lightbulb, text: "Career Ideas", action: "Give me career ideas based on my interests" },
    { icon: Target, text: "Goal Setting", action: "Help me set SMART career goals" },
    { icon: TrendingUp, text: "Growth Plan", action: "Create a professional development plan" },
    { icon: Clock, text: "Time Management", action: "Tips for better work-life balance" }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <MessageCircle className="h-16 w-16 text-career-600" />
        </div>
        <h1 className="text-4xl font-bold gradient-text">AI Career Coach</h1>
        <p className="text-xl text-gray-600">
          Get personalized career advice powered by Mistral AI
        </p>
      </div>

      {/* Quick Actions */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with these common career topics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => handleSuggestionClick(action.action)}
                >
                  <Icon className="h-5 w-5 text-career-600" />
                  <span className="text-sm">{action.text}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>Career Coaching Session</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-career-600 text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot ? (
                      <Bot className="h-4 w-4 mt-1 flex-shrink-0" />
                    ) : (
                      <User className="h-4 w-4 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="mt-3 space-y-1">
                      <p className="text-xs font-medium opacity-80">Suggested follow-ups:</p>
                      <div className="flex flex-wrap gap-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Badge
                            key={index}
                            className="cursor-pointer text-xs hover:bg-career-200"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg max-w-xs">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your career..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AICoach;

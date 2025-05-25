
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar } from 'recharts';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import { 
  Shuffle, 
  ArrowRight, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users,
  Award,
  AlertTriangle
} from 'lucide-react';

interface CareerMatch {
  category: string;
  score: number;
  color: string;
}

interface TransitionPlan {
  phase: string;
  duration: string;
  actions: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const CareerSwap = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentCareer, setCurrentCareer] = useState('');
  const [targetCareer, setTargetCareer] = useState('');
  const [swapAnalysis, setSwapAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const careers = [
    'Software Developer',
    'Data Scientist',
    'Product Manager',
    'UI/UX Designer',
    'Marketing Manager',
    'Sales Representative',
    'Project Manager',
    'Business Analyst',
    'DevOps Engineer',
    'Consultant'
  ];

  const mockSwapData = {
    compatibility: 78,
    timeline: '12-18 months',
    difficulty: 'Medium',
    salaryChange: '+15%',
    jobMarket: 'Strong',
    matchBreakdown: [
      { category: 'Technical Skills', score: 85, color: '#0ea5e9' },
      { category: 'Soft Skills', score: 90, color: '#22c55e' },
      { category: 'Industry Knowledge', score: 60, color: '#f59e0b' },
      { category: 'Experience Level', score: 75, color: '#8b5cf6' }
    ],
    transferableSkills: [
      { skill: 'Problem Solving', relevance: 95 },
      { skill: 'Communication', relevance: 88 },
      { skill: 'Project Management', relevance: 82 },
      { skill: 'Analytical Thinking', relevance: 90 },
      { skill: 'Team Collaboration', relevance: 85 }
    ],
    skillGaps: [
      { skill: 'Domain Expertise', gap: 40 },
      { skill: 'Technical Tools', gap: 35 },
      { skill: 'Industry Practices', gap: 30 },
      { skill: 'Certification Requirements', gap: 25 }
    ],
    transitionPlan: [
      {
        phase: 'Preparation',
        duration: '3-4 months',
        actions: [
          'Complete online courses in target domain',
          'Build portfolio projects',
          'Network with professionals in the field'
        ],
        difficulty: 'Medium' as const
      },
      {
        phase: 'Skill Building',
        duration: '4-6 months',
        actions: [
          'Gain hands-on experience through projects',
          'Obtain relevant certifications',
          'Join professional communities'
        ],
        difficulty: 'Hard' as const
      },
      {
        phase: 'Job Search',
        duration: '3-4 months',
        actions: [
          'Update resume and LinkedIn profile',
          'Apply for entry-level positions',
          'Prepare for technical interviews'
        ],
        difficulty: 'Medium' as const
      },
      {
        phase: 'Transition',
        duration: '2-4 months',
        actions: [
          'Negotiate transition timeline with current employer',
          'Complete knowledge transfer',
          'Start new role and onboarding'
        ],
        difficulty: 'Easy' as const
      }
    ]
  };

  const handleAnalyzeSwap = async () => {
    if (!currentCareer || !targetCareer) {
      toast({
        title: "Please select both careers",
        description: "Choose your current and target career to analyze the transition.",
        variant: "destructive",
      });
      return;
    }

    if (currentCareer === targetCareer) {
      toast({
        title: "Same career selected",
        description: "Please choose different careers for comparison.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSwapAnalysis(mockSwapData);
      setIsLoading(false);
      toast({
        title: "Career Swap Analysis Complete!",
        description: "Your transition roadmap is ready.",
      });
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const compatibilityColor = swapAnalysis?.compatibility >= 80 ? 'text-green-600' : 
                            swapAnalysis?.compatibility >= 60 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Shuffle className="h-16 w-16 text-career-600" />
        </div>
        <h1 className="text-4xl font-bold gradient-text">Career Swap Simulator</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore career transitions and discover your path to a new professional journey.
        </p>
      </div>

      {/* Career Selection */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowRight className="h-5 w-5" />
            <span>Career Transition Analyzer</span>
          </CardTitle>
          <CardDescription>
            Compare your current career with your target career to get a personalized transition plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Career</label>
              <Select value={currentCareer} onValueChange={setCurrentCareer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your current career" />
                </SelectTrigger>
                <SelectContent>
                  {careers.map((career) => (
                    <SelectItem key={career} value={career}>
                      {career}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Career</label>
              <Select value={targetCareer} onValueChange={setTargetCareer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your target career" />
                </SelectTrigger>
                <SelectContent>
                  {careers.map((career) => (
                    <SelectItem key={career} value={career}>
                      {career}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handleAnalyzeSwap} disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? 'Analyzing Transition...' : 'Analyze Career Swap'}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {swapAnalysis && (
        <div className="space-y-8 animate-fade-in">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-career-600 mx-auto mb-2" />
                <p className={`text-2xl font-bold ${compatibilityColor}`}>
                  {swapAnalysis.compatibility}%
                </p>
                <p className="text-sm text-gray-600">Compatibility</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{swapAnalysis.timeline}</p>
                <p className="text-sm text-gray-600">Timeline</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{swapAnalysis.salaryChange}</p>
                <p className="text-sm text-gray-600">Salary Change</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{swapAnalysis.jobMarket}</p>
                <p className="text-sm text-gray-600">Job Market</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Compatibility Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Compatibility Breakdown</CardTitle>
                <CardDescription>How well your skills match the target career</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={swapAnalysis.matchBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="score"
                      label={({ category, score }) => `${category}: ${score}%`}
                    >
                      {swapAnalysis.matchBreakdown.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Transferable Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Transferable Skills</CardTitle>
                <CardDescription>Skills that translate well to your target career</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={swapAnalysis.transferableSkills}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="skill" 
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="relevance" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Skill Gaps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>Areas for Development</span>
              </CardTitle>
              <CardDescription>Skills you need to develop for a successful transition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {swapAnalysis.skillGaps.map((gap: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{gap.skill}</span>
                      <span className="text-sm text-gray-600">{gap.gap}% gap</span>
                    </div>
                    <Progress value={100 - gap.gap} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transition Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Your Transition Roadmap</CardTitle>
              <CardDescription>Step-by-step plan to make your career swap successful</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {swapAnalysis.transitionPlan.map((phase: TransitionPlan, index: number) => (
                  <div key={index} className="border rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold flex items-center space-x-2">
                        <span className="bg-career-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        <span>{phase.phase}</span>
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={getDifficultyColor(phase.difficulty)}>
                          {phase.difficulty}
                        </Badge>
                        <Badge>{phase.duration}</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Actions:</h4>
                      <ul className="space-y-1">
                        {phase.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="text-gray-600 flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-career-600 rounded-full mt-2 flex-shrink-0" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CareerSwap;

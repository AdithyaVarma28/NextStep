
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { 
  BrainCircuit, 
  BarChart3, 
  Shuffle, 
  MessageCircle, 
  FileText, 
  Calendar,
  TrendingUp,
  Target,
  Award
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const features = [
    {
      title: 'Career Recommendations',
      description: 'Get AI-powered career suggestions based on your skills and interests',
      icon: BrainCircuit,
      href: '/recommendations',
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Skill Mapping',
      description: 'Discover essential skills for your target career',
      icon: BarChart3,
      href: '/skill-mapping',
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Career Swap Simulator',
      description: 'Explore alternative career paths and see how you match up',
      icon: Shuffle,
      href: '/career-swap',
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'AI Career Coach',
      description: 'Chat with our AI coach for personalized career advice',
      icon: MessageCircle,
      href: '/ai-coach',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Resume Feedback',
      description: 'Get detailed feedback on your resume with AI analysis',
      icon: FileText,
      href: '/resume-feedback',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      title: 'Day in the Life',
      description: 'Explore what a typical day looks like in different careers',
      icon: Calendar,
      href: '/day-in-life',
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  const stats = [
    { label: 'Profile Completion', value: 75, icon: Target },
    { label: 'Skills Assessed', value: user?.skills.length || 0, icon: Award },
    { label: 'Career Matches', value: 3, icon: TrendingUp }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your personalized career guidance dashboard. Explore tools to discover, plan, and advance your career journey.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.label === 'Profile Completion' ? `${stat.value}%` : stat.value}
                    </p>
                  </div>
                  <Icon className="h-8 w-8 text-career-600" />
                </div>
                {stat.label === 'Profile Completion' && (
                  <Progress value={stat.value} className="mt-3" />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="card-hover group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={feature.href}>
                  <Button className="w-full">
                    Explore
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Get started with these popular features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/recommendations">
              <Button className="w-full h-20 flex flex-col space-y-2">
                <BrainCircuit className="h-6 w-6" />
                <span>Get Career Advice</span>
              </Button>
            </Link>
            <Link to="/skill-mapping">
              <Button className="w-full h-20 flex flex-col space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span>Assess Skills</span>
              </Button>
            </Link>
            <Link to="/ai-coach">
              <Button className="w-full h-20 flex flex-col space-y-2">
                <MessageCircle className="h-6 w-6" />
                <span>Chat with Coach</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

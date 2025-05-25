
// import type { FC } from 'react'; // Uncomment if you need React types
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Compass, 
  BrainCircuit, 
  BarChart3, 
  Shuffle, 
  MessageCircle, 
  FileText, 
  Calendar,
  Star,
  Users,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: BrainCircuit,
      title: 'AI Career Recommendations',
      description: 'Get personalized career suggestions powered by LLaMA 3',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Skill Gap Analysis',
      description: 'Identify missing skills with Google Gemini AI insights',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Shuffle,
      title: 'Career Swap Simulator',
      description: 'Explore transition paths to new career opportunities',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: MessageCircle,
      title: 'AI Career Coach',
      description: 'Chat with Mistral AI for personalized career advice',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: FileText,
      title: 'Resume Feedback',
      description: 'Get detailed AI-powered resume analysis and tips',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      icon: Calendar,
      title: 'Day in the Life',
      description: 'Explore daily routines across different careers',
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  const stats = [
    { icon: Users, value: '10K+', label: 'Active Users' },
    { icon: TrendingUp, value: '95%', label: 'Success Rate' },
    { icon: Star, value: '4.9', label: 'User Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Compass className="h-20 w-20 text-career-600 animate-scale-in" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold gradient-text">
              CareerCompass
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Navigate your career journey with AI-powered guidance. Discover your potential, 
              identify skill gaps, and find your perfect career path.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="text-lg px-8 py-3">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button className="text-lg px-8 py-3">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-12 w-12 text-career-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">
              Powerful AI Tools for Career Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge AI technology with proven career 
              development strategies to help you achieve your professional goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-hover group">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-career-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals who have discovered their ideal career path 
            with CareerCompass. Start your journey today with our free tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="text-lg px-8 py-3 bg-gray-200 text-gray-900 hover:bg-gray-300">
                Create Free Account
              </Button>
            </Link>
            <Link to="/day-in-life">
              <Button className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-career-600">
                Explore Careers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

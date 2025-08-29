import { useLanguage } from "@/hooks/useLanguage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, ArrowLeft, Clock, CheckCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";

const LearningRoadmaps = () => {
  const { language, switchLanguage, t } = useLanguage();

  const roadmaps = [
    {
      title: "AI Fundamentals",
      description: "Start your AI journey with core concepts and practical applications",
      level: "Beginner",
      duration: "4-6 weeks",
      modules: 8,
      students: "2.3K+"
    },
    {
      title: "Prompt Engineering Mastery",
      description: "Advanced techniques for crafting effective AI prompts",
      level: "Intermediate", 
      duration: "3-4 weeks",
      modules: 6,
      students: "1.8K+"
    },
    {
      title: "AI Tools for Business",
      description: "Implement AI solutions in business workflows and processes",
      level: "Intermediate",
      duration: "5-7 weeks", 
      modules: 10,
      students: "1.2K+"
    },
    {
      title: "Machine Learning Basics",
      description: "Understanding ML algorithms and their practical applications",
      level: "Advanced",
      duration: "8-10 weeks",
      modules: 12,
      students: "890+"
    }
  ];

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentLanguage={language}
        onLanguageChange={switchLanguage}
        t={t}
      />

      <main className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-poppins font-bold gradient-text">
              Learning Roadmaps
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Structured learning paths to master AI concepts and tools. From beginner to advanced, find your perfect starting point.
            </p>
          </div>

          {/* Roadmaps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmaps.map((roadmap, index) => (
              <Card 
                key={index}
                className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 group cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${getLevelColor(roadmap.level)}`}>
                        {roadmap.level}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{roadmap.students}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-poppins font-semibold group-hover:text-primary transition-colors">
                      {roadmap.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {roadmap.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{roadmap.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>{roadmap.modules} modules</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button className="w-full">
                    Start Learning Path
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer
        currentLanguage={language}
        onLanguageChange={switchLanguage}
        t={t}
      />
    </div>
  );
};

export default LearningRoadmaps;
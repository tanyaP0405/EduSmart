
import React, { useState } from 'react';
import { Book, Search, Video, FileText, Link as LinkIcon, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface Resource {
  id: number;
  title: string;
  source: string;
  type: 'video' | 'article' | 'practice';
  category: string;
  url: string;
  thumbnail?: string;
  description: string;
}

const LearningResources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const resources: Resource[] = [
    {
      id: 1,
      title: "Introduction to Calculus",
      source: "Khan Academy",
      type: "video",
      category: "Mathematics",
      url: "https://www.youtube.com/watch?v=WUvTyaaNkzM",
      thumbnail: "https://i.ytimg.com/vi/WUvTyaaNkzM/maxresdefault.jpg",
      description: "Learn the basics of calculus in this comprehensive introduction."
    },
    {
      id: 2,
      title: "Quantum Physics for Beginners",
      source: "MIT OpenCourseWare",
      type: "video",
      category: "Physics",
      url: "https://www.youtube.com/watch?v=2h1E3YJMKfA",
      thumbnail: "https://i.ytimg.com/vi/2h1E3YJMKfA/maxresdefault.jpg",
      description: "An introduction to the principles of quantum mechanics."
    },
    {
      id: 3,
      title: "Understanding DNA Structure",
      source: "Crash Course",
      type: "video",
      category: "Biology",
      url: "https://www.youtube.com/watch?v=8kK2zwjRV0M",
      thumbnail: "https://i.ytimg.com/vi/8kK2zwjRV0M/maxresdefault.jpg",
      description: "Learn about the structure and function of DNA."
    },
    {
      id: 4,
      title: "Introduction to Chemical Bonding",
      source: "The Organic Chemistry Tutor",
      type: "video",
      category: "Chemistry",
      url: "https://www.youtube.com/watch?v=DEdRcfyYnSQ",
      thumbnail: "https://i.ytimg.com/vi/DEdRcfyYnSQ/maxresdefault.jpg",
      description: "A comprehensive explanation of chemical bonds."
    },
    {
      id: 5,
      title: "Shakespeare's Macbeth Analysis",
      source: "CrashCourse",
      type: "video",
      category: "English",
      url: "https://www.youtube.com/watch?v=T-PKotyoxys",
      thumbnail: "https://i.ytimg.com/vi/T-PKotyoxys/maxresdefault.jpg",
      description: "An in-depth analysis of themes and characters in Macbeth."
    },
    {
      id: 6,
      title: "Understanding Derivatives",
      source: "Mathisfun.com",
      type: "article",
      category: "Mathematics",
      url: "https://www.mathsisfun.com/calculus/derivatives-introduction.html",
      description: "A clear explanation of derivatives with examples."
    },
    {
      id: 7,
      title: "Cellular Respiration Guide",
      source: "Khan Academy",
      type: "article",
      category: "Biology",
      url: "https://www.khanacademy.org/science/biology/cellular-respiration-and-fermentation",
      description: "Complete guide to understanding cellular respiration."
    },
    {
      id: 8,
      title: "Newton's Laws of Motion",
      source: "Physics Classroom",
      type: "article",
      category: "Physics",
      url: "https://www.physicsclassroom.com/class/newtlaws",
      description: "Detailed explanations of Newton's three laws of motion."
    },
    {
      id: 9,
      title: "Balancing Chemical Equations",
      source: "ChemGuide",
      type: "article",
      category: "Chemistry",
      url: "https://www.chemguide.co.uk/inorganic/redox/equations.html",
      description: "Step-by-step guide to balancing chemical equations."
    },
    {
      id: 10,
      title: "Essay Writing Tips",
      source: "Purdue OWL",
      type: "article",
      category: "English",
      url: "https://owl.purdue.edu/owl/general_writing/academic_writing/essay_writing/",
      description: "Tips and guidelines for writing effective essays."
    },
    {
      id: 11,
      title: "Quadratic Equations Practice",
      source: "MathGames",
      type: "practice",
      category: "Mathematics",
      url: "https://www.mathgames.com/skill/A.35-solve-a-quadratic-equation",
      description: "Interactive practice problems for quadratic equations."
    },
    {
      id: 12,
      title: "DNA Replication Quiz",
      source: "Biology Corner",
      type: "practice",
      category: "Biology",
      url: "https://www.biologycorner.com/quiz/qz_dna.html",
      description: "Test your knowledge of DNA replication process."
    },
    {
      id: 13,
      title: "Force and Motion Problems",
      source: "PhysicsClassroom",
      type: "practice",
      category: "Physics",
      url: "https://www.physicsclassroom.com/calcpad/dynamics",
      description: "Practice problems related to forces and motion."
    },
    {
      id: 14,
      title: "Chemical Reactions Practice",
      source: "Chem101",
      type: "practice",
      category: "Chemistry",
      url: "https://www.101science.com/Chemistry.htm",
      description: "Practice identifying and balancing chemical reactions."
    },
    {
      id: 15,
      title: "Grammar and Punctuation Exercises",
      source: "English Grammar",
      type: "practice",
      category: "English",
      url: "https://www.englishgrammar.org/exercises/",
      description: "Comprehensive exercises for grammar and punctuation."
    }
  ];
  
  const categories = [
    { id: 'all', name: 'All Subjects' },
    { id: 'Mathematics', name: 'Mathematics' },
    { id: 'Physics', name: 'Physics' },
    { id: 'Chemistry', name: 'Chemistry' },
    { id: 'Biology', name: 'Biology' },
    { id: 'English', name: 'English' }
  ];
  
  // Filter resources based on search query and active category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Group resources by type
  const videoResources = filteredResources.filter(r => r.type === 'video');
  const articleResources = filteredResources.filter(r => r.type === 'article');
  const practiceResources = filteredResources.filter(r => r.type === 'practice');
  
  const ResourceCard = ({ resource }: { resource: Resource }) => {
    const TypeIcon = resource.type === 'video' 
      ? Video 
      : resource.type === 'article' 
        ? FileText 
        : Book;
    
    const cardClassName = `
      resource-card hover-scale transform transition-all duration-300
      ${resource.type === 'video' ? 'border-l-4 border-edu-red' : 
        resource.type === 'article' ? 'border-l-4 border-edu-blue' : 
        'border-l-4 border-edu-green'}
    `;
    
    return (
      <a 
        href={resource.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block no-underline text-foreground"
      >
        <div className={cardClassName}>
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <TypeIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{resource.source}</span>
                </div>
                <h3 className="font-medium text-base mb-1 flex items-center group">
                  {resource.title}
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 font-medium">{resource.description}</p>
              </div>
              
              {resource.thumbnail && resource.type === 'video' && (
                <div className="ml-4 w-20 h-12 overflow-hidden rounded-md flex-shrink-0 relative">
                  <img 
                    src={resource.thumbnail} 
                    alt={resource.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Play />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-2 flex justify-between items-center">
              <Badge variant="outline" className="text-xs">
                {resource.category}
              </Badge>
              <span className="text-xs font-medium text-edu-blue flex items-center">
                Visit
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>
            </div>
          </div>
        </div>
      </a>
    );
  };
  
  // Simple play button component
  const Play = () => (
    <div className="w-8 h-8 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-edu-red border-b-[6px] border-b-transparent ml-1"></div>
    </div>
  );
  
  return (
    <div className="space-y-8 w-full px-0" id="resources">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for learning resources..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all" className="flex-1 sm:flex-none">All Resources</TabsTrigger>
          <TabsTrigger value="videos" className="flex-1 sm:flex-none">Videos</TabsTrigger>
          <TabsTrigger value="articles" className="flex-1 sm:flex-none">Articles</TabsTrigger>
          <TabsTrigger value="practice" className="flex-1 sm:flex-none">Practice</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6 mt-4">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No resources found matching your criteria</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-6 mt-4">
          {videoResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videoResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No video resources found matching your criteria</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="articles" className="space-y-6 mt-4">
          {articleResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articleResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No article resources found matching your criteria</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="practice" className="space-y-6 mt-4">
          {practiceResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {practiceResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No practice resources found matching your criteria</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-center mt-8">
        <Button 
          className="gap-2"
          onClick={() => {
            window.open('https://www.khanacademy.org/', '_blank');
          }}
        >
          Browse All Resources
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LearningResources;


import React from 'react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';

const ProgressAnalysis: React.FC = () => {
  const testHistoryData = [
    { week: 'Week 1', score: 65 },
    { week: 'Week 2', score: 70 },
    { week: 'Week 3', score: 68 },
    { week: 'Week 4', score: 75 },
    { week: 'Week 5', score: 72 },
    { week: 'Week 6', score: 80 },
    { week: 'Week 7', score: 85 },
    { week: 'Week 8', score: 82 },
  ];

  const subjectProgressData = [
    { subject: 'Mathematics', proficiency: 72, target: 85 },
    { subject: 'Physics', proficiency: 68, target: 80 },
    { subject: 'Chemistry', proficiency: 85, target: 90 },
    { subject: 'Biology', proficiency: 45, target: 75 },
    { subject: 'English', proficiency: 88, target: 85 },
  ];

  const topicProgressData = [
    { subject: 'Mathematics', topic: 'Algebra', score: 85, status: 'strength' },
    { subject: 'Mathematics', topic: 'Calculus', score: 45, status: 'weakness' },
    { subject: 'Physics', topic: 'Mechanics', score: 82, status: 'strength' },
    { subject: 'Physics', topic: 'Quantum Theory', score: 38, status: 'weakness' },
    { subject: 'Chemistry', topic: 'Periodic Table', score: 90, status: 'strength' },
    { subject: 'Chemistry', topic: 'Organic Chemistry', score: 48, status: 'weakness' },
    { subject: 'Biology', topic: 'Cell Biology', score: 92, status: 'strength' },
    { subject: 'Biology', topic: 'Genetics', score: 42, status: 'weakness' },
    { subject: 'English', topic: 'Grammar', score: 88, status: 'strength' },
    { subject: 'English', topic: 'Essay Writing', score: 49, status: 'weakness' },
  ];

  const radarData = [
    { subject: 'Mathematics', A: 85, B: 65, fullMark: 100 },
    { subject: 'Physics', A: 68, B: 75, fullMark: 100 },
    { subject: 'Chemistry', A: 85, B: 78, fullMark: 100 },
    { subject: 'Biology', A: 45, B: 70, fullMark: 100 },
    { subject: 'English', A: 88, B: 80, fullMark: 100 },
  ];

  // Filter strength and weakness topics
  const strengths = topicProgressData.filter(item => item.status === 'strength');
  const weaknesses = topicProgressData.filter(item => item.status === 'weakness');

  return (
    <div className="space-y-8" id="progress">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Test Score History</CardTitle>
            <CardDescription>Your performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={testHistoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#4f46e5" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Average</p>
                <p className="text-xl font-semibold">74.6%</p>
              </div>
              <div className="flex items-center text-edu-green">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+12% from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Subject Performance</CardTitle>
            <CardDescription>Compared to class average</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart outerRadius={90} data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="Your Score" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                <Radar name="Class Average" dataKey="B" stroke="#eab308" fill="#eab308" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6" id="analysis">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Subject-wise Progress</CardTitle>
            <CardDescription>Your proficiency in each subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {subjectProgressData.map((subject) => (
                <div key={subject.subject}>
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <span className="font-medium">{subject.subject}</span>
                      <div className="flex items-center text-xs text-muted-foreground space-x-2">
                        <span>Current: {subject.proficiency}%</span>
                        <span>•</span>
                        <span>Target: {subject.target}%</span>
                      </div>
                    </div>
                    <div>
                      {subject.proficiency < subject.target - 20 ? (
                        <Badge variant="destructive" className="flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Needs Attention
                        </Badge>
                      ) : subject.proficiency < subject.target - 5 ? (
                        <Badge variant="outline" className="bg-edu-light-orange text-edu-orange border-edu-orange">
                          Improving
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-edu-light-green text-edu-green border-edu-green">
                          On Track
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div 
                        style={{ width: `${subject.proficiency}%` }} 
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                          subject.proficiency < 50 ? 'bg-edu-red' : 
                          subject.proficiency < 70 ? 'bg-edu-orange' : 
                          'bg-edu-green'
                        }`}
                      ></div>
                    </div>
                    <div 
                      className="absolute h-4 w-1 bg-gray-800 rounded-full top-0 transform -translate-y-1"
                      style={{ left: `${subject.target}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button className="w-full">
                View Detailed Analysis
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Strengths</CardTitle>
              <CardDescription>Topics with &gt;80% mastery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strengths.map((topic, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <div>
                      <h4 className="font-medium text-sm">{topic.topic}</h4>
                      <p className="text-xs text-muted-foreground">{topic.subject}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-edu-green font-medium">{topic.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Areas to Improve</CardTitle>
              <CardDescription>Topics with &lt;50% mastery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weaknesses.map((topic, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <div>
                      <h4 className="font-medium text-sm">{topic.topic}</h4>
                      <p className="text-xs text-muted-foreground">{topic.subject}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-edu-red font-medium">{topic.score}%</span>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Improve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalysis;

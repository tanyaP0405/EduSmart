import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { CheckCircle2, Clock, BookOpen, CheckSquare2, Square } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Dashboard: React.FC = () => {
  const performanceData = [
    { subject: 'Math', max: 100, avg: 76, score: 82 },
    { subject: 'Physics', max: 100, avg: 73, score: 68 },
    { subject: 'Chemistry', max: 100, avg: 78, score: 85 },
    { subject: 'Biology', max: 100, avg: 75, score: 71 },
    { subject: 'English', max: 100, avg: 80, score: 88 },
  ];

  const completionData = [
    { subject: 'Math', completed: 75 },
    { subject: 'Physics', completed: 60 },
    { subject: 'Chemistry', completed: 85 },
    { subject: 'Biology', completed: 45 },
    { subject: 'English', completed: 90 },
  ];

  const pieData = [
    { name: 'Completed', value: 72, color: '#22c55e' },
    { name: 'In Progress', value: 18, color: '#eab308' },
    { name: 'Not Started', value: 10, color: '#ef4444' },
  ];

  const weakTopics = [
    { id: 1, name: 'Calculus Integration', subject: 'Math', score: 42 },
    { id: 2, name: 'Quantum Mechanics', subject: 'Physics', score: 38 },
    { id: 3, name: 'Organic Chemistry', subject: 'Chemistry', score: 45 },
    { id: 4, name: 'Genetics', subject: 'Biology', score: 48 },
    { id: 5, name: 'Essay Writing', subject: 'English', score: 49 },
  ];

  const tasks = [
    { id: 1, title: 'Complete Math Assignment', priority: 'high', dueDate: 'May 20', completed: false },
    { id: 2, title: 'Review Biology Notes', priority: 'medium', dueDate: 'May 21', completed: false },
    { id: 3, title: 'Prepare for History Presentation', priority: 'medium', dueDate: 'May 24', completed: false },
    { id: 4, title: 'Finish English Essay Draft', priority: 'low', dueDate: 'May 26', completed: false },
    { id: 5, title: 'Physics Lab Report', priority: 'high', dueDate: 'May 19', completed: false },
  ];

  // New state variables for functionality
  const [taskFilter, setTaskFilter] = useState('all');
  const [taskList, setTaskList] = useState(tasks);
  
  // Calculate overall completion
  const overallCompletion = completionData.reduce((acc, curr) => acc + curr.completed, 0) / completionData.length;

  // Filter tasks based on priority
  const filteredTasks = taskList.filter(task => {
    if (taskFilter === 'all') return true;
    if (taskFilter === 'high') return task.priority === 'high';
    if (taskFilter === 'medium') return task.priority === 'medium';
    if (taskFilter === 'low') return task.priority === 'low';
    return true;
  });

  // Handle task completion toggle
  const toggleTaskCompletion = (taskId: number) => {
    setTaskList(taskList.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    
    const task = taskList.find(t => t.id === taskId);
    if (task) {
      toast({
        title: task.completed ? "Task marked as incomplete" : "Task completed",
        description: task.title,
        duration: 2000
      });
    }
  };

  // Handle topic improvement click
  const handleImproveClick = (topic: typeof weakTopics[0]) => {
    const topicUrls: Record<string, string> = {
      'Math': 'https://www.khanacademy.org/math/calculus-1/cs1-integrals',
      'Physics': 'https://www.youtube.com/watch?v=JzhlfbWBuQ8',
      'Chemistry': 'https://www.youtube.com/watch?v=bka20Q9TN6M',
      'Biology': 'https://www.youtube.com/watch?v=qCLmR9-YY7o',
      'English': 'https://www.youtube.com/watch?v=GgkRoYPLhts'
    };
    
    window.open(topicUrls[topic.subject] || 'https://www.khanacademy.org/', '_blank');
  };

  return (
    <div className="space-y-8" id="overview">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Syllabus Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="relative h-32 w-32 mx-auto">
                <PieChart width={128} height={128}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold">{Math.round(overallCompletion)}%</span>
                  <span className="text-xs text-muted-foreground">completed</span>
                </div>
              </div>
              <div className="space-y-2">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center">
                    <span className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart
                data={performanceData}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#4f46e5" fillOpacity={1} fill="url(#colorScore)" />
                <Area type="monotone" dataKey="avg" stroke="#eab308" fillOpacity={1} fill="url(#colorAvg)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-2 space-x-4 text-sm">
              <div className="flex items-center">
                <span className="h-2 w-2 bg-edu-indigo rounded-full mr-1"></span>
                <span>Your Score</span>
              </div>
              <div className="flex items-center">
                <span className="h-2 w-2 bg-edu-yellow rounded-full mr-1"></span>
                <span>Class Average</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Subject Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {completionData.map((subject) => (
              <div key={subject.subject} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{subject.subject}</span>
                  <span>{subject.completed}%</span>
                </div>
                <Progress value={subject.completed} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Study Tasks</CardTitle>
            <div className="flex">
              <ToggleGroup 
                type="single" 
                value={taskFilter} 
                onValueChange={(value) => value && setTaskFilter(value)}
                className="justify-start"
              >
                <ToggleGroupItem value="all" size="sm" className="text-xs px-3">All</ToggleGroupItem>
                <ToggleGroupItem value="high" size="sm" className="text-xs px-3">High</ToggleGroupItem>
                <ToggleGroupItem value="medium" size="sm" className="text-xs px-3">Med</ToggleGroupItem>
                <ToggleGroupItem value="low" size="sm" className="text-xs px-3">Low</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-72 overflow-y-auto scrollbar-hidden">
              {filteredTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`p-3 bg-secondary rounded-md flex justify-between items-start task-priority-${task.priority}`}
                >
                  <div className="flex-1">
                    <div className="flex items-start gap-2">
                      <button 
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="mt-0.5"
                      >
                        {task.completed ? 
                          <CheckSquare2 className="h-4 w-4 text-edu-green" /> : 
                          <Square className="h-4 w-4 text-muted-foreground" />
                        }
                      </button>
                      <div>
                        <h4 className={`font-medium text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Due: {task.dueDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-3 w-full"
              onClick={() => window.location.hash = "#all-tasks"}
            >
              View all tasks and assignments
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Areas to Improve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weakTopics.map((topic) => (
                <div key={topic.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`h-10 w-1 rounded-full ${topic.score < 40 ? 'bg-edu-red' : 'bg-edu-orange'}`}></div>
                    <div>
                      <h4 className="font-medium text-sm">{topic.name}</h4>
                      <p className="text-xs text-muted-foreground">{topic.subject} • Score: {topic.score}%</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7"
                    onClick={() => handleImproveClick(topic)}
                  >
                    Improve
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => window.location.href = "/progress"} 
              >
                View detailed analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Subject Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={performanceData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="subject" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="max" name="Maximum" fill="#cbd5e1" />
              <Bar dataKey="avg" name="Class Average" fill="#eab308" />
              <Bar dataKey="score" name="Your Score" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="text-center mt-6">
        <Button 
          variant="outline" 
          className="bg-white dark:bg-gray-800 hover:bg-edu-light-blue text-edu-blue dark:text-white"
          onClick={() => window.location.href = "/register"}
        >
          Get started for free
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;

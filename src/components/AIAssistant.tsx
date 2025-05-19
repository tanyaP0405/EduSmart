
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Mock data for sample questions
const sampleQuestions = [
  "Can you explain how to solve quadratic equations?",
  "What is the difference between mitosis and meiosis?",
  "How do I find the derivative of a function?",
  "What are the key themes in Shakespeare's Macbeth?",
  "Can you help me understand Newton's third law?"
];

// Mock responses for simulating AI responses
const mockResponses: Record<string, string> = {
  "Can you explain how to solve quadratic equations?": 
    "To solve a quadratic equation (ax² + bx + c = 0):\n\n1. Try factoring: If the equation can be factored as (px + q)(rx + s) = 0, then x = -q/p or x = -s/r\n\n2. Use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a\n\n3. Complete the square: Rearrange to (x + b/2a)² = (b² - 4ac) / 4a²\n\nExample: For x² - 5x + 6 = 0\n- Factor: (x - 3)(x - 2) = 0\n- Solutions: x = 3 or x = 2",
  
  "What is the difference between mitosis and meiosis?": 
    "Mitosis and meiosis are both types of cell division, but they have key differences:\n\nMitosis:\n- Produces 2 genetically identical daughter cells\n- Maintains chromosome count (diploid to diploid)\n- Used for growth, repair, and asexual reproduction\n- One division phase\n- No crossing over occurs\n\nMeiosis:\n- Produces 4 genetically diverse haploid cells\n- Reduces chromosome count (diploid to haploid)\n- Used for sexual reproduction (creates gametes/spores)\n- Two division phases (meiosis I and II)\n- Crossing over occurs, increasing genetic diversity",
  
  "How do I find the derivative of a function?": 
    "To find the derivative of a function, apply these rules:\n\n1. Power Rule: d/dx(xⁿ) = n·xⁿ⁻¹\n2. Constant Rule: d/dx(c) = 0\n3. Sum Rule: d/dx(f + g) = d/dx(f) + d/dx(g)\n4. Product Rule: d/dx(f·g) = f·g' + g·f'\n5. Quotient Rule: d/dx(f/g) = (g·f' - f·g')/g²\n6. Chain Rule: d/dx(f(g(x))) = f'(g(x))·g'(x)\n\nExample: Find d/dx(x³ + 2x² - 5x + 3)\nApplying the power and sum rules:\n= 3x² + 4x - 5",
  
  "What are the key themes in Shakespeare's Macbeth?": 
    "Key themes in Shakespeare's Macbeth include:\n\n1. Ambition and Power: Macbeth's ruthless pursuit of power leads to his downfall\n\n2. Fate vs. Free Will: The witches' prophecies vs. Macbeth's choices\n\n3. Guilt and Conscience: Lady Macbeth's madness and Macbeth's hallucinations\n\n4. Appearance vs. Reality: \"Fair is foul, and foul is fair\"\n\n5. Loyalty and Betrayal: Macbeth betrays his king while others remain loyal\n\n6. Manhood and Gender Roles: Lady Macbeth challenges Macbeth's masculinity\n\n7. Supernatural: Witches, ghosts, and prophecies influence events",
  
  "Can you help me understand Newton's third law?": 
    "Newton's Third Law states: \"For every action, there is an equal and opposite reaction.\"\n\nThis means when one object exerts a force on a second object, the second object simultaneously exerts a force equal in magnitude but opposite in direction on the first object.\n\nExamples:\n1. When you push against a wall, the wall pushes back with equal force\n2. A rocket propels forward by pushing exhaust gases backward\n3. When walking, you push the ground backward, and it pushes you forward\n4. A swimmer pushes water backward, and the water pushes the swimmer forward\n\nThe forces always act on different objects and form an action-reaction pair."
};

// A custom hook to simulate API call
const useAIResponse = (message: string) => {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!message) return;

    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      // Check if we have a predefined response
      if (mockResponses[message]) {
        setResponse(mockResponses[message]);
      } else {
        // Generate a generic response for other queries
        setResponse(`I'll help you understand "${message}". This seems to be related to ${message.includes('math') ? 'mathematics' : message.includes('biology') ? 'biology' : message.includes('physics') ? 'physics' : 'your studies'}. Could you provide more details or ask a more specific question so I can give you a better explanation?`);
      }
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [message]);

  return { response, isLoading };
};

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm EduBuddy, your AI learning assistant. How can I help you with your studies today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [activeQuery, setActiveQuery] = useState('');
  const { response, isLoading } = useAIResponse(activeQuery);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add bot response when response changes
  useEffect(() => {
    if (response && activeQuery) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setActiveQuery(''); // Reset active query
    }
  }, [response]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    }]);
    
    // Set active query to trigger response
    setActiveQuery(text);
    
    // Clear input
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSampleQuestionClick = (question: string) => {
    handleSend(question);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="assistant">
      <div className="md:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg flex items-center">
              <Bot className="mr-2 h-5 w-5 text-edu-purple" />
              EduBuddy
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user' 
                        ? 'bg-edu-blue text-white rounded-tr-none' 
                        : 'bg-muted rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center mb-1 text-xs opacity-70">
                      {message.sender === 'user' ? (
                        <>
                          <span>You</span>
                          <User className="ml-1 h-3 w-3" />
                        </>
                      ) : (
                        <>
                          <Bot className="mr-1 h-3 w-3" />
                          <span>EduBuddy</span>
                        </>
                      )}
                    </div>
                    <div className="whitespace-pre-line">
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg rounded-tl-none p-3 flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>EduBuddy is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t mt-auto">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about your studies..."
                  className="flex-1"
                />
                <Button 
                  onClick={() => handleSend()}
                  size="icon"
                  disabled={isLoading || !input.trim()}
                >
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Try Asking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Click on any question to get an answer</p>
            <div className="space-y-2">
              {sampleQuestions.map((question, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-2 whitespace-normal"
                  onClick={() => handleSampleQuestionClick(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Popular Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Mathematics</Button>
              <Button variant="outline" size="sm">Physics</Button>
              <Button variant="outline" size="sm">Chemistry</Button>
              <Button variant="outline" size="sm">Biology</Button>
              <Button variant="outline" size="sm">English</Button>
              <Button variant="outline" size="sm">History</Button>
              <Button variant="outline" size="sm">Computer Science</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;

'use client';
import React, { useState, } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, Send } from 'lucide-react';
import { getStudentById } from '@/helper';
import {  Toaster } from 'sonner';


interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]); 
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [students, setStudents] = useState<any[]>([]);

  const { data: session } = useSession() as unknown as { data: Session & { user: { id: string } } };
  const userId = session?.user?.id ?? null;

  
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);

    const botMessage: Message = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, botMessage]);
    setIsStreaming(true);
    const response = await getStudentById(userId);
    console.log(JSON.stringify(response));
    const input_with_context = ` U are a career guidance expert  this is the details of  the student ${JSON.stringify(response)} help them with any queries the query of the user is ${input};`
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input_with_context,
          students: students.map((student) => ({
            name: student.name,
            nationality: student.nationality,
            careerAspirations: student.careerAspirations,
            preferredCountries: student.preferredCountries,
            preferredPrograms: student.preferredPrograms,
          })),
        }),
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((msg, idx) =>
            idx === prev.length - 1
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        );
      }
    } catch (error) {
      console.error('Error streaming response:', error);
    }

    setInput('');
    setIsStreaming(false);
  };
  // normal bg-background dark:bg-[#202434] dark:border-[#293040] border-[#E9ECF1]
  // invert bg-background dark:bg-[#212A39] dark:border-[#293040] border-[#E9ECF1]
  // light shadow dark:border-[#3B4254]  border-[#E9ECF1]
  return (
    <div className="flex flex-col h-full rounded-xl w-full justify-center items-center  bg-background dark:bg-[#202434] font-sans ">
      <div className='max-w-4xl h-full w-full flex flex-col  '>
      <header className="flex items-center justify-between px-6 py-4 border-b  dark:border-[#293040] border-[#E9ECF1]">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold">AI Counselor</h1>
            <p className="text-sm text-muted-foreground">
              Guiding you through your study abroad journey
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => signOut()}
          aria-label="Logout"
        >
          Logout
          <LogOut className="w-5 h-5" />
        </Button>
      </header>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex gap-2 max-w-[80%] items-start ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {message.role === 'user' ? 'S' : 'AI'}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          {isStreaming && (
            <div className="text-muted-foreground">Counselor is typing...</div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-2 border shadow-xl dark:border-[#293040] rounded-xl bg-[#F3F4F6] dark:bg-[#212A39] border-[#E9ECF1] mb-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your question about studying abroad..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 dark:bg-[#212A39] bg-[#F3F4F6] border-none"
            disabled={isStreaming}
          />
          <Button
            onClick={sendMessage}
            size="icon"
            disabled={isStreaming}
            aria-label="Send message"
            className='rounded-xl'
          >
            {isStreaming ? (
              <span className="text-sm">...</span>
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
          <Toaster position="top-center"/>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
  time: string;
}

interface ChatClientProps {
  locale: string;
}

export function ChatClient({ locale }: ChatClientProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm here to help you learn about AI and our platform. What would you like to know?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const content = {
    ru: {
      backToMain: 'Вернуться на главную',
      placeholder: 'Спросите меня что-нибудь о MediaSchool.ai...',
      suggestions: [
        "Что включено в подписку?",
        "Сколько это стоит?",
        "Покажите доступные курсы",
        "У вас есть живые занятия?",
        "Чем ваша школа отличается?",
        "Есть ли сообщество?"
      ]
    },
    en: {
      backToMain: 'Back to Main',
      placeholder: 'Ask me anything about MediaSchool.ai...',
      suggestions: [
        "What's included in the subscription?",
        "How much does it cost?",
        "Show me available courses",
        "Do you offer live classes?",
        "How is your school different?",
        "Is there a community?"
      ]
    }
  };

  const t = content[locale as 'ru' | 'en'];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: getAIResponse(input, locale),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    setTimeout(handleSend, 100);
  };

  const getAIResponse = (question: string, locale: string) => {
    const q = question.toLowerCase();
    
    if (locale === 'ru') {
      if (q.includes('подписк') || q.includes('включен')) {
        return "Наши планы подписки включают:\n\n• **Базовый (19$/мес)**: Доступ ко всем записанным курсам и форуму\n• **Про (39$/мес)**: Все из Базового + живые воркшопы и приоритетная поддержка\n• **Предприятие (99$/мес)**: Все из Про + персональное наставничество\n\nВсе планы включают неограниченный доступ к растущей библиотеке курсов по ИИ!";
      }
      
      if (q.includes('стоит') || q.includes('цена')) {
        return "Наши цены просты и прозрачны:\n\n• Базовый: $19/месяц\n• Про: $39/месяц\n• Предприятие: $99/месяц\n\nВсе планы идут с 30-дневной гарантией возврата денег!";
      }
      
      return "Отличный вопрос! Я буду рад помочь вам узнать больше о MediaSchool.ai. Не могли бы вы быть более конкретными? Спрашивайте о курсах, ценах, сообществе или чем-то еще!";
    }
    
    // English responses
    if (q.includes('subscription') || q.includes('included')) {
      return "Our subscription plans include:\n\n• **Basic ($19/mo)**: Access to all recorded courses and community forum\n• **Pro ($39/mo)**: Everything in Basic + live workshops and priority support\n• **Enterprise ($99/mo)**: Everything in Pro + 1-on-1 mentoring and custom learning paths\n\nAll plans include unlimited access to our growing library of AI courses!";
    }
    
    if (q.includes('cost') || q.includes('price')) {
      return "Our pricing is simple and transparent:\n\n• Basic: $19/month\n• Pro: $39/month\n• Enterprise: $99/month\n\nAll plans come with a 30-day money-back guarantee. You can upgrade or downgrade anytime!";
    }
    
    if (q.includes('course')) {
      return "We offer courses in:\n\n• AI Content Creation\n• Video Production with AI\n• AI in Journalism & Ethics\n• Prompt Engineering\n• No-Code AI Development\n• And many more!\n\nOur courses combine recorded lessons with live workshops and hands-on projects.";
    }
    
    if (q.includes('live')) {
      return "Yes! We offer various live sessions:\n\n• Weekly live workshops with expert instructors\n• Monthly meetups in Prague and online\n• Live Q&A sessions with course instructors\n• Special masterclasses with industry leaders\n\nPro and Enterprise members get priority access to all live events.";
    }
    
    if (q.includes('different') || q.includes('unique')) {
      return "MediaSchool.ai is unique because:\n\n• **Human-centered approach**: We focus on ethical, creative AI use\n• **Practical application**: Real-world projects, not just theory\n• **Expert instructors**: Learn from professionals using AI daily\n• **Community focus**: Connect with fellow creators and professionals\n• **Constantly updated**: New content as AI tools evolve\n\nWe're not just teaching tools - we're building AI-literate creative professionals!";
    }
    
    if (q.includes('community')) {
      return "Absolutely! Our community features:\n\n• Active Discord server with 1000+ members\n• Weekly challenges and competitions\n• Peer feedback on your projects\n• Networking events in major cities\n• Job board for AI-related positions\n• Collaboration opportunities\n\nThe community is one of our strongest features - you'll never learn alone!";
    }
    
    return "That's a great question! I'd be happy to help you learn more about MediaSchool.ai. Could you be more specific about what you'd like to know? You can ask about our courses, pricing, community, or anything else about AI learning!";
  };

  return (
    <div className="bg-gray-50 h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 flex-shrink-0">
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center">
            <Link href="/">
              <Image 
                src="/images/PSM-Logo.png" 
                alt="MediaSchool.ai" 
                width={48} 
                height={48}
                className="h-12 w-auto"
              />
            </Link>
          </div>
          <Link href="/" className="text-brand-purple hover:text-purple-700 font-medium">
            {t.backToMain}
          </Link>
        </nav>
      </header>

      {/* Chat Container */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-8">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={message.type === 'ai' ? '' : 'flex justify-end'}>
              <div className={`max-w-2xl ${message.type === 'ai' ? 'bg-white' : 'bg-brand-purple text-white'} rounded-2xl p-6 shadow-sm`}>
                <p className="whitespace-pre-line">
                  {message.content}
                </p>
                <div className={`text-sm mt-2 ${message.type === 'ai' ? 'text-gray-500' : 'text-white/70'}`}>
                  {message.time}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="bg-white rounded-2xl p-6 shadow-sm max-w-2xl">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {t.suggestions.slice(0, 4).map((question) => (
              <button
                key={question}
                onClick={() => handleSuggestedQuestion(question)}
                className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:border-brand-purple hover:text-brand-purple transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            {t.suggestions.slice(4).map((question) => (
              <button
                key={question}
                onClick={() => handleSuggestedQuestion(question)}
                className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:border-brand-purple hover:text-brand-purple transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex-shrink-0">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.placeholder}
              className="w-full bg-white border border-gray-200 rounded-full px-6 py-4 pr-16 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple focus:ring-opacity-20"
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand-purple text-white p-3 rounded-full hover:bg-purple-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </main>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-brand-purple to-brand-green text-white py-3 px-6 text-center text-sm">
        <p>
          🤖 This is a demo chat. For real AI assistance, integrate with OpenAI, Claude, or your preferred LLM.
        </p>
      </div>
    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, Flame, MessageSquare } from 'lucide-react';
import { ChatMessage, LeadScore } from '../../types';
import { AiService, ChatState } from '../../services/aiService';
import { LeadService } from '../../services/leadService';

interface KdAiChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenLeadForm: () => void;
}

export const KdAiChatbot: React.FC<KdAiChatbotProps> = ({ isOpen, onToggle, onOpenLeadForm }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatState, setChatState] = useState<ChatState>({ 
    step: 'greeting', 
    leadData: { services: [], leadSource: 'AI Chatbot' },
    conversationHistory: []
  });
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentScore, setCurrentScore] = useState<LeadScore>('COLD');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat
  useEffect(() => {
    const { message, state } = AiService.getInitialState();
    setMessages([message]);
    setChatState(state);
  }, []);

  // Auto-scroll chat view smoothly
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Update lead score dynamically
  useEffect(() => {
    if (chatState.leadData) {
      const score = LeadService.calculateLeadScore(chatState.leadData);
      setCurrentScore(score);
    }
  }, [chatState.leadData]);

  const handleSendMessage = (textToSend?: string, actionVal?: string, optVal?: string) => {
    const messageText = textToSend || inputText;
    if (!messageText.trim() && !actionVal) return;

    // Handle Direct WhatsApp Action
    if (actionVal === 'whatsapp_direct') {
      const waUrl = LeadService.generateWhatsAppUrl(chatState.leadData);
      window.open(waUrl, '_blank');
      return;
    }

    // Add user message to state
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: optVal || messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate Human OpenAI response streaming delay (450ms)
    setTimeout(() => {
      const { reply, newState } = AiService.processUserResponse(
        optVal || messageText, 
        actionVal, 
        chatState
      );

      setMessages((prev) => [...prev, reply]);
      setChatState(newState);
      setIsTyping(false);

      // Save lead object when phone or complete step reached
      if (newState.step === 'complete' || newState.leadData.phone) {
        LeadService.createLead({
          name: newState.leadData.name || 'AI Chat Guest',
          phone: newState.leadData.phone || '',
          email: newState.leadData.email || '',
          weddingDate: newState.leadData.weddingDate || 'TBD',
          weddingLocation: newState.leadData.weddingLocation || 'TBD',
          eventType: newState.leadData.eventType || 'Full Wedding Coverage',
          services: newState.leadData.services || ['Wedding Cinematography'],
          guestCount: newState.leadData.guestCount || '300+',
          budget: newState.leadData.budget || 'Luxury Package',
          leadSource: 'AI Chatbot'
        });
      }
    }, 450);
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      <motion.button
        onClick={onToggle}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[9980] flex items-center gap-3 border border-gold/50 p-3 sm:px-5 sm:py-3.5 rounded-full shadow-[0_10px_35px_rgba(212,175,55,0.4)] text-gold focus:outline-none bg-[#2B050B] backdrop-blur-xl group"
        aria-label="Open KD AI Consultant"
      >
        <div className="relative">
          <div className="w-8.5 h-8.5 rounded-full bg-gold-gradient text-obsidian flex items-center justify-center font-bold shadow-md">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#2B050B] animate-ping" />
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] tracking-[0.2em] font-serif-luxury font-extrabold text-gold uppercase">
            ASK KD AI EXPERT
          </span>
          <span className="text-[9.5px] text-[#F5F2EB]/80 tracking-wider font-semibold">
            Luxury Wedding Assistant
          </span>
        </div>
      </motion.button>

      {/* Floating Liquid Glass Chat Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-8 z-[9990] w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] rounded-3xl border border-gold/40 shadow-2xl flex flex-col overflow-hidden bg-[#2B050B]/98 text-[#F5F2EB] backdrop-blur-2xl"
          >
            {/* Chatbot Header */}
            <div className="p-4 sm:p-4.5 bg-[#1C0307] border-b border-gold/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-gold/50 bg-[#3B0811] flex items-center justify-center text-gold shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-serif-luxury font-bold text-[#F5F2EB] uppercase">
                      KD AI CONSULTANT
                    </h3>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                      GPT-4 INSPIRED
                    </span>
                  </div>
                  <span className="text-[10px] text-[#F5F2EB]/70 font-semibold block">
                    Chief Film & Photography Director AI • KD CREATION
                  </span>
                </div>
              </div>

              {/* Internal Lead Score Indicator Badge */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded bg-gold/15 border border-gold/35 text-gold font-bold" title="Internal Qualification Rank">
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>RANK: {currentScore}</span>
                </div>

                <button
                  onClick={onToggle}
                  className="p-1.5 text-gold hover:text-white rounded-full bg-gold/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Scroll View */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#2B050B]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gold-gradient text-obsidian font-bold rounded-tr-none shadow-lg'
                        : 'bg-[#3B0811]/90 text-[#F5F2EB] font-medium border border-gold/35 rounded-tl-none shadow-lg'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Quick Options Pills */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-gold/25 flex flex-col gap-2">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage('', opt.action, opt.value || opt.label)}
                            className="w-full text-left text-xs font-bold text-gold bg-[#1C0307] border border-gold/40 hover:bg-gold-gradient hover:text-obsidian p-2.5 rounded-xl shadow-sm transition-all flex items-center justify-between group/opt"
                          >
                            <span className="truncate pr-2">{opt.label}</span>
                            <Sparkles className="w-3.5 h-3.5 text-gold group-hover/opt:text-obsidian flex-shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-[#F5F2EB]/40 mt-1 font-mono px-1 font-semibold">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-gold text-xs italic p-2.5 bg-[#3B0811] rounded-xl max-w-[150px] border border-gold/30 shadow-md font-semibold">
                  <Bot className="w-4 h-4 animate-spin text-gold" />
                  <span>KD AI is crafting...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 bg-[#1C0307] border-t border-gold/30 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask KD AI about dates, packages, equipment..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-[#2B050B] border border-gold/40 rounded-xl px-3.5 py-2.5 text-xs text-[#F5F2EB] placeholder-[#F5F2EB]/40 font-semibold focus:outline-none focus:border-gold transition-colors"
              />
              <button
                onClick={() => handleSendMessage()}
                className="p-2.5 rounded-xl bg-gold-gradient text-obsidian hover:brightness-110 transition-all font-bold shadow-md active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

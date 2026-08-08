import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, Flame } from 'lucide-react';
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
  const [chatState, setChatState] = useState<ChatState>({ step: 'greeting', leadData: { services: [], leadSource: 'AI Chatbot' } });
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

  // Auto-scroll chat
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

    // Handle Direct WhatsApp action
    if (actionVal === 'whatsapp_direct') {
      const waUrl = LeadService.generateWhatsAppUrl(chatState.leadData);
      window.open(waUrl, '_blank');
      return;
    }

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: optVal || messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const { reply, newState } = AiService.processUserResponse(
        optVal || messageText, 
        actionVal, 
        chatState
      );

      setMessages((prev) => [...prev, reply]);
      setChatState(newState);
      setIsTyping(false);

      // Save lead object on complete or phone provided
      if (newState.step === 'complete' || newState.leadData.phone) {
        LeadService.createLead({
          name: newState.leadData.name || 'AI Chat Guest',
          phone: newState.leadData.phone || '',
          email: newState.leadData.email || '',
          weddingDate: newState.leadData.weddingDate || 'TBD',
          weddingLocation: newState.leadData.weddingLocation || 'TBD',
          eventType: newState.leadData.eventType || 'Full Wedding',
          services: newState.leadData.services || ['Wedding Cinematography'],
          guestCount: newState.leadData.guestCount || '300+',
          budget: newState.leadData.budget || 'Luxury Package',
          leadSource: 'AI Chatbot'
        });
      }
    }, 600);
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
        className="fixed bottom-6 right-6 z-[9980] flex items-center gap-3 liquid-glass-panel border-2 border-gold p-3.5 sm:px-6 sm:py-3.5 rounded-full shadow-[0_10px_35px_rgba(212,175,55,0.35)] text-gold group focus:outline-none bg-white"
        data-cursor="CHAT"
      >
        <div className="relative">
          <div className="w-8.5 h-8.5 rounded-full bg-gold-gradient text-obsidian flex items-center justify-center font-bold shadow-sm">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-ping" />
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] tracking-widest font-serif-luxury font-extrabold text-gold uppercase">
            PLAN YOUR WEDDING
          </span>
          <span className="text-[9px] text-[#44403C] tracking-wider font-bold">
            ASK KD AI CONSULTANT
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
            className="fixed bottom-24 right-4 sm:right-8 z-[9990] w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] liquid-glass-panel border border-gold/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden bg-white/95"
          >
            {/* Chatbot Header */}
            <div className="p-4 sm:p-5 bg-white/90 border-b border-gold/25 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-gold bg-gold/10 flex items-center justify-center text-gold shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-serif-luxury font-bold text-[#1C1917] uppercase">
                      KD AI CONSULTANT
                    </h3>
                    <span className="text-[9px] bg-emerald-500/15 text-emerald-600 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      ONLINE
                    </span>
                  </div>
                  <span className="text-[10px] text-[#44403C] font-semibold block">
                    Luxury Wedding Concierge • KD CREATION
                  </span>
                </div>
              </div>

              {/* Internal Lead Score Indicator Badge */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded bg-gold/10 border border-gold/30 text-gold font-bold" title="Internal Lead Qualification Engine">
                  <Flame className="w-3 h-3 text-amber-600" />
                  <span>SCORE: {currentScore}</span>
                </div>

                <button
                  onClick={onToggle}
                  className="p-1.5 text-[#44403C] hover:text-gold rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Scroll View */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gold-gradient text-obsidian font-bold rounded-tr-none shadow-md'
                        : 'bg-white text-[#1C1917] font-medium border border-gold/30 rounded-tl-none shadow-md'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Quick Options Pills */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gold/20 flex flex-col gap-2">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage('', opt.action, opt.value || opt.label)}
                            className="w-full text-left text-xs font-bold text-gold bg-white border border-gold/40 hover:bg-gold-gradient hover:text-obsidian p-2.5 rounded-xl shadow-sm transition-all flex items-center justify-between"
                          >
                            <span>{opt.label}</span>
                            <Sparkles className="w-3 h-3 opacity-70" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-[#78716C] mt-1 font-mono px-1 font-semibold">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-gold text-xs italic p-2 bg-white rounded-xl max-w-[130px] border border-gold/25 shadow-sm font-semibold">
                  <Bot className="w-4 h-4 animate-spin text-gold" />
                  <span>KD AI thinking...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 bg-white border-t border-gold/20 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask KD AI about packages, dates..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-[#F9F7F2] border border-gold/30 rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] placeholder-[#78716C] font-semibold focus:outline-none focus:border-gold"
              />
              <button
                onClick={() => handleSendMessage()}
                className="p-2.5 rounded-xl bg-gold-gradient text-obsidian hover:brightness-110 transition-all font-bold shadow-md"
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

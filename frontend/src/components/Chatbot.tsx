import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

interface Message {
  role: "user" | "model";
  text: string;
}

const STARTER_PROMPTS = [
  "Tell me about Stream Arena",
  "How can I watch football?",
  "Tell me about the Matches I will give you the pridictions of winning team",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! Welcome to **Stream Arena**. I am your sports streaming AI assistant. How can I help you find channels, matches, or navigate the site today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages or open state changes
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Prepare full conversation history for the backend
    const updatedMessages = [...messages, userMessage];

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "model", text: data.response || "I didn't receive a response. Please try again." },
      ]);
    } catch (error) {
      console.error("Chatbot API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I am having trouble connecting to my service right now. Please verify your connection or try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "model",
        text: "Hello! Welcome to **Stream Arena**. I am your sports streaming AI assistant. How can I help you find channels, matches, or navigate the site today?",
      },
    ]);
  };

  // Helper to format text into rich elements (Bold, List, internal Router Links)
  const formatMessageText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let content = line.trim();
      const isBullet = content.startsWith("- ") || content.startsWith("* ");
      if (isBullet) {
        content = content.substring(2);
      }

      // Process bold markers (**text**)
      const boldParts = content.split(/(\*\*.*?\*\*)/g);
      const parsedParts = boldParts.map((part, pIdx) => {
        const isBold = part.startsWith("**") && part.endsWith("**");
        const cleanPart = isBold ? part.slice(2, -2) : part;

        // Process internal route paths (/live, /schedules, etc.)
        const routeParts = cleanPart.split(/(\/[a-z]+)/g);
        const renderedRouteParts = routeParts.map((subPart, sIdx) => {
          const validRoutes = ["/live", "/schedules", "/news", "/directory", "/platforms", "/about"];
          if (validRoutes.includes(subPart)) {
            return (
              <Link
                key={sIdx}
                to={subPart}
                onClick={() => setIsOpen(true)} // Keep chat open when navigating
                className="text-red-600 hover:text-red-700 font-bold underline inline-flex items-center mx-0.5"
              >
                {subPart}
              </Link>
            );
          }
          return subPart;
        });

        if (isBold) {
          return (
            <strong key={pIdx} className="font-bold text-slate-950">
              {renderedRouteParts}
            </strong>
          );
        }
        return renderedRouteParts;
      });

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-700 my-1 font-body">
            {parsedParts}
          </li>
        );
      }

      return (
        <p key={idx} className="my-1 leading-relaxed text-slate-700 font-body min-h-[1rem]">
          {parsedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* FLOATING ACTION BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 md:bottom-6 right-6 z-50 w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(220,38,38,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 group"
        title="Chat with Sports AI"
      >
        <span className="material-symbols-outlined text-2xl transition-transform duration-300 group-hover:rotate-12">
          {isOpen ? "close" : "smart_toy"}
        </span>
        {/* Pulsing indicator */}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border border-white"></span>
          </span>
        )}
      </button>

      {/* CHAT CONTAINER */}
      <div
        className={`fixed z-50 bottom-20 md:bottom-24 right-6 w-[360px] sm:w-[400px] h-[500px] max-h-[80vh] bg-white border border-slate-200 shadow-[0_12px_40px_rgba(0,0,0,0.15)] rounded-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        {/* HEADER */}
        <div className="bg-slate-900 text-white px-4 py-3.5 flex justify-between items-center select-none border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-base">smart_toy</span>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
            </div>
            <div>
              <h4 className="font-headline uppercase font-bold text-sm tracking-wide">StreamArena AI</h4>
              <p className="text-[10px] text-green-400 font-medium tracking-wide">Assistant Online</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReset}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors flex items-center justify-center"
              title="Clear Conversation"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors flex items-center justify-center"
              title="Minimize"
            >
              <span className="material-symbols-outlined text-[18px]">minimize</span>
            </button>
          </div>
        </div>

        {/* MESSAGE CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scrollbar-hide">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 max-w-[80%] ${
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {msg.role === "model" && (
                <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center flex-shrink-0 text-slate-600">
                  <span className="material-symbols-outlined text-xs">smart_toy</span>
                </div>
              )}
              <div
                className={`p-3 text-sm border shadow-sm ${
                  msg.role === "user"
                    ? "bg-red-600 text-white border-red-700 rounded-tl-2xl rounded-tr-sm rounded-br-2xl rounded-bl-2xl font-medium"
                    : "bg-white text-slate-800 border-slate-200/80 rounded-tl-sm rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
                }`}
              >
                {formatMessageText(msg.text)}
              </div>
            </div>
          ))}

          {/* STARTER PILLS */}
          {messages.length === 1 && !isLoading && (
            <div className="pt-2">
              <p className="text-[10.5px] text-slate-400 uppercase tracking-widest font-label font-bold mb-2">
                Frequently Asked
              </p>
              <div className="flex flex-wrap gap-2">
                {STARTER_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="text-[11.5px] font-medium text-slate-600 bg-white border border-slate-200/80 rounded-full px-3.5 py-1.5 hover:border-red-500 hover:text-red-600 transition-all active:scale-95 text-left shadow-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* LOADING STATE */}
          {isLoading && (
            <div className="flex items-end gap-2 max-w-[80%] mr-auto">
              <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center flex-shrink-0 text-slate-600">
                <span className="material-symbols-outlined text-xs animate-spin">progress_activity</span>
              </div>
              <div className="p-3 bg-white text-slate-500 border border-slate-200/80 rounded-tl-sm rounded-tr-2xl rounded-br-2xl rounded-bl-2xl shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="border-t border-slate-100 p-3 bg-white flex gap-2 items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask AI guide..."
            className="flex-1 bg-slate-50 border-0 focus:ring-2 focus:ring-red-600/10 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none shadow-md shadow-red-600/10"
          >
            <span className="material-symbols-outlined text-base">send</span>
          </button>
        </form>
      </div>
    </>
  );
}

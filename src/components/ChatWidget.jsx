import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, X, Send, Sun, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { BRAND } from "@/lib/data";

const SUGGESTIONS = [
  "How much subsidy can I claim?",
  "What's the payback period for a 3 kW system?",
  "Do you cover Agartala?",
  "Best panel brand?",
];

const INTRO = {
  role: "assistant",
  content:
    "Hi! I'm Surya, your Saura Energy AI Solar Assistant. ☀️ Ask me about PM Surya Ghar subsidy (up to ₹85,800), payback periods, or any solar question.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INTRO]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const send = async (text) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setLoading(true);
    try {
      const r = await api.post("/chat", { message: q, session_id: sessionId });
      if (!sessionId) setSessionId(r.data.session_id);
      setMessages((m) => [...m, { role: "assistant", content: r.data.reply }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I couldn't reach my brain right now 🙈 Please call us on " + BRAND.phoneDisplay + " or try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 220, damping: 18 }}
        onClick={() => setOpen((o) => !o)}
        data-testid="chat-launcher"
        aria-label="Open AI Solar Assistant"
        className={`fixed bottom-6 right-24 z-40 h-14 w-14 rounded-full grid place-items-center shadow-2xl transition-transform hover:scale-110 ${
          open ? "bg-[#0A1128] text-white" : "bg-gradient-to-br from-[#F26A21] to-[#D95B1A] text-white"
        }`}
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquareText className="h-6 w-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#2BA84A] ring-2 ring-white" />
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 230, damping: 22 }}
            data-testid="chat-panel"
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[560px] max-h-[80vh] rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-[#1B3A8C] via-[#1B3A8C] to-[#0A1128] text-white p-5 overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#F26A21]/30 blur-3xl" />
              <div className="relative flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-white/10 grid place-items-center border border-white/20">
                  <Sun className="h-6 w-6 text-[#F26A21]" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-lg leading-tight flex items-center gap-1.5">
                    Surya <Sparkles className="h-4 w-4 text-[#F26A21]" />
                  </div>
                  <div className="text-xs text-white/70">AI Solar Assistant · Saura Energy</div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50" data-testid="chat-messages">
              {messages.map((m, i) => (
                <Bubble key={i} role={m.role} content={m.content} />
              ))}
              {loading && <Bubble role="assistant" content={<TypingDots />} />}

              {messages.length <= 1 && !loading && (
                <div className="pt-2 space-y-2">
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-1">Try asking</div>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      data-testid={`chat-suggestion-${s.slice(0, 10)}`}
                      className="block w-full text-left px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 hover:border-[#F26A21] hover:text-[#F26A21] transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="p-3 border-t border-slate-100 bg-white flex items-center gap-2"
              data-testid="chat-form"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about solar, subsidy, panels..."
                disabled={loading}
                data-testid="chat-input"
                className="flex-1 rounded-full bg-slate-100 border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F26A21] focus:bg-white transition"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                data-testid="chat-send-btn"
                aria-label="Send"
                className="h-10 w-10 rounded-full bg-[#F26A21] hover:bg-[#D95B1A] text-white grid place-items-center disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, content }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-[#F26A21] text-white rounded-br-md"
            : "bg-white border border-slate-200 text-slate-800 rounded-bl-md"
        }`}
      >
        {content}
      </div>
    </motion.div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

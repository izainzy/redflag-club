"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOrder, type Flavor } from "@/context/OrderContext";

interface Question {
  question: string;
  options: { label: string; points: Record<Flavor, number> }[];
}

const questions: Question[] = [
  {
    question: "Do you double-text?",
    options: [
      {
        label: "Always. I have no shame.",
        points: { "toxic-banana": 3, "red-flag-classic": 1, "mixed-signals": 1 },
      },
      {
        label: "Only if they're worth it.",
        points: { "toxic-banana": 1, "red-flag-classic": 3, "mixed-signals": 1 },
      },
      {
        label: "Sometimes yes, sometimes no.",
        points: { "toxic-banana": 1, "red-flag-classic": 1, "mixed-signals": 3 },
      },
    ],
  },
  {
    question: "You see your ex at a party. What do you do?",
    options: [
      {
        label: "Walk right up and say hi. Power move.",
        points: { "toxic-banana": 3, "red-flag-classic": 1, "mixed-signals": 2 },
      },
      {
        label: "Ignore them and look amazing.",
        points: { "toxic-banana": 1, "red-flag-classic": 3, "mixed-signals": 1 },
      },
      {
        label: "Make eye contact, look away, repeat.",
        points: { "toxic-banana": 1, "red-flag-classic": 1, "mixed-signals": 3 },
      },
    ],
  },
  {
    question: 'How do you handle "we need to talk"?',
    options: [
      {
        label: "Bring snacks. It's a show now.",
        points: { "toxic-banana": 3, "red-flag-classic": 2, "mixed-signals": 1 },
      },
      {
        label: "Say it first. Stay in control.",
        points: { "toxic-banana": 1, "red-flag-classic": 3, "mixed-signals": 1 },
      },
      {
        label: "Panic, then pretend you're chill.",
        points: { "toxic-banana": 1, "red-flag-classic": 1, "mixed-signals": 3 },
      },
    ],
  },
];

const flavorResults: Record<Flavor, { name: string; emoji: string; tagline: string }> = {
  "toxic-banana": {
    name: "TOXIC BANANA",
    emoji: "🍌",
    tagline: "You're dangerously sweet. Unhinged but loveable.",
  },
  "red-flag-classic": {
    name: "RED FLAG CLASSIC",
    emoji: "🍓",
    tagline: "Classic villain energy. You know your worth.",
  },
  "mixed-signals": {
    name: "MIXED SIGNALS",
    emoji: "🍓🍌",
    tagline: "Hot then cold. Nobody knows what you'll do next.",
  },
};

export default function ToxicQuiz() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<Flavor, number>>({
    "toxic-banana": 0,
    "red-flag-classic": 0,
    "mixed-signals": 0,
  });
  const [result, setResult] = useState<Flavor | null>(null);
  const { setFlavor } = useOrder();

  const handleAnswer = (points: Record<Flavor, number>) => {
    const newScores = { ...scores };
    (Object.keys(points) as Flavor[]).forEach((f) => {
      newScores[f] += points[f];
    });
    setScores(newScores);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const winner = (Object.keys(newScores) as Flavor[]).reduce((a, b) =>
        newScores[a] > newScores[b] ? a : b
      );
      setResult(winner);
      setFlavor(winner);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setScores({ "toxic-banana": 0, "red-flag-classic": 0, "mixed-signals": 0 });
    setResult(null);
  };

  return (
    <>
      {/* Quiz trigger section */}
      <section
        id="quiz"
        className="bg-chocolate py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden"
      >
        {/* Decorative floating images */}
        <img
          src="/images/banana-half.png"
          alt=""
          className="absolute -left-8 top-4 w-28 opacity-15 animate-float pointer-events-none hidden sm:block"
          style={{ animationDelay: "0.5s" }}
        />
        <img
          src="/images/banana-pieces.png"
          alt=""
          className="absolute -right-8 bottom-4 w-28 opacity-15 animate-float pointer-events-none hidden sm:block"
          style={{ animationDelay: "1.2s" }}
        />
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-heading text-4xl sm:text-5xl text-white tracking-tight mb-4"
        >
          AM I <span className="text-redflag">TOXIC</span>
          <span className="text-warning">?</span>
        </motion.h2>
        <p className="font-body text-chocolate-light/60 text-lg mb-6 max-w-md mx-auto">
          Take the quiz and find out which flavor matches your energy.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            resetQuiz();
            setOpen(true);
          }}
          className="font-heading text-xl px-8 py-3 bg-redflag text-white rounded-lg glow-btn tracking-widest cursor-pointer"
        >
          FIND OUT NOW
        </motion.button>
      </section>

      {/* Quiz Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.7, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 50 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-grunge rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-chocolate/40 hover:text-chocolate transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {result === null ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Progress */}
                    <div className="flex gap-1 mb-6">
                      {questions.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            i <= step ? "bg-redflag" : "bg-chocolate/15"
                          }`}
                        />
                      ))}
                    </div>

                    <h3 className="font-heading text-3xl text-chocolate-dark tracking-wider mb-6">
                      {questions[step].question}
                    </h3>

                    <div className="flex flex-col gap-3">
                      {questions[step].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(opt.points)}
                          className="text-left p-4 rounded-xl bg-white/60 border-2 border-chocolate/10 hover:border-redflag/50 font-body text-chocolate-dark transition-colors cursor-pointer"
                        >
                          {opt.label}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-4"
                >
                  <div className="text-6xl mb-4">{flavorResults[result].emoji}</div>
                  <h3 className="font-heading text-4xl text-redflag tracking-wider mb-2">
                    {flavorResults[result].name}
                  </h3>
                  <p className="font-body text-chocolate-light text-lg mb-6">
                    {flavorResults[result].tagline}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setOpen(false);
                        document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="font-heading text-lg px-6 py-3 bg-redflag text-white rounded-lg tracking-widest cursor-pointer"
                    >
                      ORDER IT
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetQuiz}
                      className="font-heading text-lg px-6 py-3 bg-chocolate/10 text-chocolate rounded-lg tracking-widest cursor-pointer"
                    >
                      RETAKE
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles } from "lucide-react";
import FallingTomatoes from "./components/FallingTomatoes";

const LandingPage = () => {
  const [taskName, setTaskName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (taskName.trim()) {
      navigate(`/timer?task=${encodeURIComponent(taskName)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex flex-col items-center justify-center relative overflow-hidden">
      <FallingTomatoes />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 bg-white/80 backdrop-blur-sm p-8 rounded-3xl max-w-md w-full relative before:absolute before:inset-0 before:rounded-3xl before:p-[2px] before:bg-gradient-to-r before:from-pink-300 before:via-purple-200 before:to-pink-300 before:-z-10 after:absolute after:inset-0 after:rounded-3xl after:p-[1px] after:bg-white/50 after:-z-10 shadow-[0_10px_40px_-15px_rgba(236,72,153,0.3)]"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <div className="relative">
              <img src="/tomato.png" alt="Tomato" className="w-24 h-24" />
              <motion.div
                initial={{ opacity: 0.7, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1.1 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-6 h-6 text-pink-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <h1 className="text-lg font-bold text-center text-pink-600 mb-2 flex items-center justify-center gap-2">
          <Heart className="w-6 h-6 fill-pink-400 text-pink-400" />
          Focus for 25 minutes, then take a break!
          <Heart className="w-6 h-6 fill-pink-400 text-pink-400" />
        </h1>

        <div className="space-y-4">
          <div>
            <Input
              id="task"
              type="text"
              placeholder="Enter your task..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="border-pink-300 focus:border-pink-500 focus:ring-pink-500 rounded-xl"
            />
          </div>

          <Button
            onClick={handleStart}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-medium py-2 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            Start Pomodoro
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              →
            </motion.div>
          </Button>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-pink-600 mt-6 text-sm"
      ></motion.p>
    </div>
  );
};

export default LandingPage;

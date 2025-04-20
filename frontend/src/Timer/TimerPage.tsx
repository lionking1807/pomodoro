import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, PauseCircle, PlayCircle, RotateCcw, Home } from "lucide-react";

const TimerPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const taskName = searchParams.get("task") || "My Task";

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate progress percentage
  const progressPercentage = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/timer-complete.mp3");

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isCompleted) {
      setIsActive(false);
      setIsCompleted(true);

      // Play sound when timer completes
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isCompleted]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTimeLeft(25 * 60);
    setIsActive(false);
    setIsCompleted(false);
  };

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-pink-200 max-w-md w-full"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-pink-600 mb-2">
            {isCompleted ? "Time's up! 🎉" : "Focus Time"}
          </h1>
          <p className="text-pink-500 text-sm mb-4">{taskName}</p>

          <motion.div
            initial={{ scale: 1 }}
            animate={
              isCompleted
                ? {
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.5,
              repeat: isCompleted ? Number.POSITIVE_INFINITY : 0,
              repeatDelay: 1,
            }}
            className="relative mx-auto w-48 h-48 flex items-center justify-center bg-pink-100 rounded-full mb-6 border-4 border-pink-300"
          >
            <span className="text-5xl font-bold text-pink-600">
              {formatTime(timeLeft)}
            </span>

            {isCompleted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-2 -right-2"
              >
                <Heart className="w-8 h-8 fill-pink-500 text-pink-500" />
              </motion.div>
            )}
          </motion.div>

          <Progress value={progressPercentage} className="h-2 bg-pink-200">
            <div
              className="bg-pink-500 h-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </Progress>

          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={toggleTimer}
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-pink-300 text-pink-600"
              disabled={isCompleted}
            >
              {isActive ? (
                <PauseCircle className="h-6 w-6" />
              ) : (
                <PlayCircle className="h-6 w-6" />
              )}
            </Button>

            <Button
              onClick={resetTimer}
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-pink-300 text-pink-600"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>

            <Button
              onClick={goHome}
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-pink-300 text-pink-600"
            >
              <Home className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-pink-600 mb-4">Great job! Take a break now.</p>
            <Button
              onClick={resetTimer}
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-xl"
            >
              Start Another Pomodoro
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
export default TimerPage;

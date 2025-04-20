import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Tomato = {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
};

const FallingTomatoes =() => {
  const [tomatoes, setTomatoes] = useState<Tomato[]>([]);

  useEffect(() => {
    // Generate random tomatoes
    const newTomatoes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random horizontal position (%)
      size: Math.random() * 30 + 20, // random size between 20-50px
      delay: Math.random() * 5, // random delay before animation starts
      duration: Math.random() * 10 + 10, // random duration between 10-20s
      rotation: Math.random() * 360, // random initial rotation
    }));

    setTomatoes(newTomatoes);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {tomatoes.map((tomato) => (
        <motion.div
          key={tomato.id}
          initial={{
            y: -100,
            x: `${tomato.x}vw`,
            rotate: tomato.rotation,
          }}
          animate={{
            y: "120vh",
            rotate: tomato.rotation + 360,
          }}
          transition={{
            duration: tomato.duration,
            delay: tomato.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: tomato.size,
            height: tomato.size,
          }}
        >
          <img src="/tomato.png" alt="" className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  );
}

export default FallingTomatoes;
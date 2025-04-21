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

const FallingTomatoes = () => {
  const [tomatoes, setTomatoes] = useState<Tomato[]>([]);

  useEffect(() => {
    const newTomatoes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 30 + 20,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      rotation: Math.random() * 360,
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
};

export default FallingTomatoes;

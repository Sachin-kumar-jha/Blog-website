import {motion} from "framer-motion"
import { useState,useEffect } from "react";
const Working = () => {
  const text = "Working on it...";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % (text.length + 1));
    }, 200);

    return () => clearInterval(interval);
  }, [text.length]);

  return (
    <div className="flex justify-center items-center h-[90vh] bg-gray-100">
      <motion.h1
        className="text-3xl font-bold text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {text.slice(0, index)}
      </motion.h1>
    </div>
  );
};

  export default Working;
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";

const Test = () => {
  const { scrollY } = useScroll();
  const divRefs = useRef([]);

  const scale = useTransform(scrollY, [0, 200], [0.5, 1]);
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      divRefs.current.forEach((ref, index) => {
        if (ref) {
          const { top, bottom } = ref.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          if (top < viewportHeight && bottom >= 0) {
            // Check if in viewport
            ref.style.transform = "scale(1)";
            ref.style.opacity = "1";
            ref.style.transition = "transform 0.2s ease-out, opacity 0.5s ease-out";
          } else {
            ref.style.transform = "scale(0.5)";
            ref.style.opacity = "0";
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ height: "200vh", overflow: "scroll" }}>
      <motion.div
        ref={(el) => (divRefs.current[0] = el)}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: "hsl(0, 50%, 50%)",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          color: "white",
        }}
      >
        Div 1
      </motion.div>
      <motion.div
        ref={(el) => (divRefs.current[1] = el)}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: "hsl(120, 50%, 50%)",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          color: "white",
        }}
      >
        Div 2
      </motion.div>
      <motion.div
        ref={(el) => (divRefs.current[2] = el)}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: "hsl(240, 50%, 50%)",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          color: "white",
        }}
      >
        Div 3
      </motion.div>
      <motion.div
        ref={(el) => (divRefs.current[3] = el)}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: "hsl(30, 50%, 50%)",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          color: "white",
        }}
      >
        Div 4
      </motion.div>
      <motion.div
        ref={(el) => (divRefs.current[4] = el)}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: "hsl(0, 50%, 50%)",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          color: "white",
        }}
      >
        Div 5
      </motion.div>
      <motion.div
        ref={(el) => (divRefs.current[5] = el)}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: "hsl(120, 50%, 50%)",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          color: "white",
        }}
      >
        Div 6
      </motion.div>
      <motion.div
        ref={(el) => (divRefs.current[6] = el)}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: "hsl(240, 50%, 50%)",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          color: "white",
        }}
      >
        Div 7
      </motion.div>
      <motion.div
        ref={(el) => (divRefs.current[7] = el)}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: "hsl(30, 50%, 50%)",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          color: "white",
        }}
      >
        Div 8
      </motion.div>
    </div>
  );
};

export default Test;

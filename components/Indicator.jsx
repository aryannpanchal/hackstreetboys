'use client';

import { motion, useScroll, useSpring } from "framer-motion";

const Indicator = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  return (
    <motion.div className="bg-black h-1 fixed top-0 right-0 left-0 z-50" style={{ scaleX }} />

  )
}

export default Indicator
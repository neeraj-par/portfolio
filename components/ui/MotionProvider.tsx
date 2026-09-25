"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Makes every Framer Motion animation respect the visitor's "reduce motion" system setting.
const MotionProvider = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

export default MotionProvider;

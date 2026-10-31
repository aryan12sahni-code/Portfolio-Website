"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMouse } from "./mouse-provider";

export function HeroField() {
  const ref = useRef<HTMLDivElement>(null);
  const { snx, sny } = useMouse();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yScroll = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const xParallax = useTransform(snx, [-0.5, 0.5], [-48, 48]);
  const yParallax = useTransform(sny, [-0.5, 0.5], [-32, 32]);
  const rotate = useTransform(snx, [-0.5, 0.5], [-4, 4]);
  const glowLeftX = useTransform(snx, [-0.5, 0.5], [36, -36]);
  const glowRightX = useTransform(snx, [-0.5, 0.5], [-28, 28]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_70%_20%,rgba(168,85,247,0.22),transparent_55%),radial-gradient(60%_50%_at_10%_80%,rgba(236,72,153,0.12),transparent_50%),linear-gradient(180deg,#050508_0%,#0a0a14_100%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_40%,black_15%,transparent_72%)]" />

      <motion.div
        style={{ y: yScroll, opacity, x: xParallax, rotate }}
        className="absolute inset-0 will-change-transform"
      >
        <motion.div style={{ y: yParallax }} className="absolute inset-0">
          <svg
            className="absolute -right-[6%] top-[6%] h-[92%] w-[80%] opacity-90"
            viewBox="0 0 800 700"
            fill="none"
          >
            <defs>
              <linearGradient id="flow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#A855F7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.45" />
              </linearGradient>
              <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {[
              [120, 140],
              [260, 90],
              [420, 160],
              [560, 110],
              [680, 200],
              [180, 280],
              [340, 250],
              [500, 300],
              [640, 340],
              [220, 420],
              [390, 460],
              [560, 480],
              [300, 560],
              [470, 580],
            ].map(([cx, cy], i) => (
              <motion.circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={i % 3 === 0 ? 8 : 4.5}
                fill={i % 4 === 0 ? "#EC4899" : i % 3 === 0 ? "#A855F7" : "#22D3EE"}
                filter="url(#softGlow)"
                initial={{ opacity: 0.2, scale: 0.6 }}
                animate={{ opacity: [0.25, 1, 0.35], scale: [0.85, 1.15, 0.9] }}
                transition={{
                  duration: 2.8 + (i % 5) * 0.35,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}

            <motion.path
              d="M120 140 C210 90, 300 210, 420 160 S560 70, 680 200"
              stroke="url(#flow)"
              strokeWidth="2.25"
              strokeLinecap="round"
              filter="url(#softGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.4, ease: "easeInOut", delay: 0.35 }}
            />
            <motion.path
              d="M180 280 C280 220, 360 320, 500 300 S620 250, 640 340"
              stroke="#A855F7"
              strokeOpacity="0.55"
              strokeWidth="1.75"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.55 }}
            />
            <motion.path
              d="M220 420 C310 380, 360 520, 470 580 S540 470, 560 480"
              stroke="#22D3EE"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="6 8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.7, ease: "easeInOut", delay: 0.75 }}
            />

            <motion.g
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <rect
                x="470"
                y="70"
                width="220"
                height="90"
                rx="12"
                fill="#12121c"
                fillOpacity="0.85"
                stroke="#A855F7"
                strokeOpacity="0.45"
              />
              <text
                x="492"
                y="106"
                fill="#B7B3C9"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
              >
                OCCUPANCY SIGNAL
              </text>
              <text
                x="492"
                y="136"
                fill="#C084FC"
                fontSize="24"
                fontFamily="ui-monospace, monospace"
                fontWeight="600"
              >
                92% accuracy
              </text>
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: glowLeftX }}
        className="absolute bottom-[-20%] left-[-12%] h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.22),transparent_68%)] blur-3xl"
      />
      <motion.div
        style={{ x: glowRightX }}
        className="absolute top-[10%] right-[-8%] h-[40%] w-[40%] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.18),transparent_68%)] blur-3xl"
      />
    </div>
  );
}

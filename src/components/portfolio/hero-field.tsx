"use client";

import { motion } from "framer-motion";

/** Full-bleed atmospheric plane: industrial signal grid + occupancy flow. */
export function HeroField() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_10%,#d9e4ee_0%,var(--mist)_42%,#c5d3e0_100%)]" />
      <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_75%)]" />

      <svg
        className="absolute -right-[8%] top-[8%] h-[88%] w-[78%] opacity-90"
        viewBox="0 0 800 700"
        fill="none"
      >
        <defs>
          <linearGradient id="flow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0F766E" stopOpacity="0.15" />
            <stop offset="55%" stopColor="#E8461C" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0C1420" stopOpacity="0.2" />
          </linearGradient>
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
            r={i % 3 === 0 ? 7 : 4.5}
            fill={i % 4 === 0 ? "#E8461C" : "#0C1420"}
            initial={{ opacity: 0.25, scale: 0.7 }}
            animate={{ opacity: [0.25, 0.9, 0.35], scale: [0.85, 1.08, 0.92] }}
            transition={{
              duration: 3.2 + (i % 5) * 0.35,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.path
          d="M120 140 C210 90, 300 210, 420 160 S560 70, 680 200"
          stroke="url(#flow)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.path
          d="M180 280 C280 220, 360 320, 500 300 S620 250, 640 340"
          stroke="#0F766E"
          strokeOpacity="0.55"
          strokeWidth="1.75"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.55 }}
        />
        <motion.path
          d="M220 420 C310 380, 360 520, 470 580 S540 470, 560 480"
          stroke="#0C1420"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="6 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, ease: "easeInOut", delay: 0.75 }}
        />

        <motion.g
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <rect
            x="470"
            y="70"
            width="210"
            height="86"
            rx="4"
            fill="#0C1420"
            fillOpacity="0.08"
            stroke="#0C1420"
            strokeOpacity="0.18"
          />
          <text
            x="490"
            y="104"
            fill="#0C1420"
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            opacity="0.7"
          >
            OCCUPANCY SIGNAL
          </text>
          <text
            x="490"
            y="132"
            fill="#E8461C"
            fontSize="22"
            fontFamily="ui-monospace, monospace"
            fontWeight="600"
          >
            92% accuracy
          </text>
        </motion.g>
      </svg>

      <motion.div
        className="absolute bottom-[-18%] left-[-10%] h-[52%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(232,70,28,0.16),transparent_68%)] blur-2xl"
        animate={{ opacity: [0.45, 0.8, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

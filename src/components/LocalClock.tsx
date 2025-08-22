"use client";

import React, { useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  MotionValue,
  Transition,
  AnimatePresence,
} from "framer-motion";
import GlassSurface from "./LiquidGlass";

function Number({
  mv,
  number,
  height,
}: {
  mv: MotionValue<number>;
  number: number;
  height: number;
}) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span
      style={{
        y,
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {number}
    </motion.span>
  );
}

function Digit({ value, height }: { value: number; height: number }) {
  const springConfig: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
  };
  const animatedValue = useSpring(value, springConfig);

  React.useEffect(() => {
    animatedValue.set(value);
  }, [animatedValue, value]);

  return (
    <div
      style={{ height, position: "relative", overflow: "hidden", width: "1ch" }}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

function AnimatedTimeSegment({
  value,
  height,
}: {
  value: number;
  height: number;
}) {
  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return (
    <div className="flex" style={{ width: "2ch" }}>
      <Digit value={tens} height={height} />
      <Digit value={ones} height={height} />
    </div>
  );
}

interface LocalClockProps {
  showSeconds?: boolean;
  className?: string;
}

const LocalClock: React.FC<LocalClockProps> = ({
  showSeconds = true,
  className,
}) => {
  const [now, setNow] = React.useState<Date | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  React.useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const timeParts = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/Brussels",
  }).formatToParts(now);

  const hour = parseInt(
    timeParts.find((part) => part.type === "hour")?.value ?? "0"
  );
  const minute = parseInt(
    timeParts.find((part) => part.type === "minute")?.value ?? "0"
  );
  const second = parseInt(
    timeParts.find((part) => part.type === "second")?.value ?? "0"
  );

  const date = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "Europe/Brussels",
  }).format(now);

  const animationHeight = 14;

  const springTransition: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 0.5,
  };

  return (
    <div className="absolute top-[1em] z-[1000] w-full left-0 md:w-auto md:left-auto select-none">
      <GlassSurface
        width={220}
        height={40}
        borderRadius={20}
        className="border border-muted"
        brightness={50}
        blur={20}
        distortionScale={100}
        displace={3}
      >
        <div
          className="flex flex-col w-full justify-center items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ minHeight: "40px" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!isHovered ? (
              <motion.div
                key="time"
                className={[
                  "flex items-center gap-3 font-mono p-3",
                  className ?? "",
                ].join(" ")}
                aria-label="Belgium local time (Europe/Brussels)"
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                exit={{ y: -30 }}
                transition={springTransition}
              >
                <div
                  className="tabular-nums text-foreground text-sm flex items-center"
                  style={{ lineHeight: 1 }}
                >
                  <AnimatedTimeSegment value={hour} height={animationHeight} />
                  <span className="mx-0.5">:</span>
                  <AnimatedTimeSegment
                    value={minute}
                    height={animationHeight}
                  />
                  {showSeconds && (
                    <>
                      <span className="mx-0.5">:</span>
                      <AnimatedTimeSegment
                        value={second}
                        height={animationHeight}
                      />
                    </>
                  )}
                </div>
                <span className="text-muted-foreground text-xs">
                  Brussels, BE
                </span>
              </motion.div>
            ) : (
              <motion.span
                key="date"
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                exit={{ y: -30 }}
                transition={springTransition}
                className="text-muted-foreground px-3 font-mono w-full justify-center text-sm"
              >
                🗓️ {date}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </GlassSurface>
    </div>
  );
};

export default LocalClock;

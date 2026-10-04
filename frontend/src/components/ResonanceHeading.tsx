import { useEffect } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';

export default function ResonanceHeading() {
  const reduceMotion = useReducedMotion();
  const phase = useMotionValue(0);

  const x = useTransform(phase, [0, 1, 2, 3], [0, -5, 6, -2]);
  const skewX = useTransform(phase, [0, 1, 2, 3], [0, -5, 4, -2]);
  const redOpacity = useTransform(phase, (value) =>
    value > 0 ? 0.9 : 0,
  );
  const waveOpacity = useTransform(phase, (value) =>
    value > 0 ? 0 : 1,
  );
  const symbolOpacity = useTransform(phase, (value) =>
    value > 0 ? 1 : 0,
  );
  const textShadow = useTransform(phase, (value) =>
    value > 0
      ? '-3px 0 #ef4444, 3px 0 #7f1d1d'
      : '0px 0 transparent',
  );

  useEffect(() => {
    phase.set(0);

    if (reduceMotion) return;

    const controls = animate(
      phase,
      [0, 0, 1, 3, 0, 2, 1, 0],
      {
        duration: 4,
        times: [0, 0.75, 0.76, 0.78, 0.8, 0.82, 0.85, 0.88],
        ease: 'steps(1, end)',
        repeat: Infinity,
        repeatDelay: 0.5,
      },
    );

    return () => controls.stop();
  }, [phase, reduceMotion]);

  return (
    <h1 className="flex items-center gap-3 font-heading text-3xl font-semibold uppercase tracking-[0.12em]">
      <motion.span
        className="relative inline-block"
        style={{ x, skewX, textShadow }}
      >
        Welcome back

        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-red-500"
          style={{
            opacity: redOpacity,
            x: -8,
            clipPath: 'inset(38% 0 38% 0)',
          }}
        >
          Welcome back
        </motion.span>
      </motion.span>

      <span
        aria-hidden="true"
        className="relative inline-grid h-9 w-9 -translate-y-0.5 place-items-center tracking-normal"

      >
        <motion.span
          className="absolute text-2xl"
          style={{ opacity: waveOpacity }}
        >
          👋
        </motion.span>
        <motion.span
          className="absolute text-3xl text-red-500"
          style={{ opacity: symbolOpacity, x }}
        >
          ⟁
        </motion.span>
      </span>
    </h1>
  );
}
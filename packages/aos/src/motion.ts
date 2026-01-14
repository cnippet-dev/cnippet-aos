import { Transition, Variants } from "motion/react";

// ============================================================================
// TYPES
// ============================================================================

export type EasingFunction =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "anticipate"
  | [number, number, number, number];

export type AnimationOptions = {
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Animation duration in seconds (default: 0.6) */
  duration?: number;
  /** Easing function (default: "easeOut") */
  ease?: EasingFunction;
  /** Animate only once when scrolled into view (default: true) */
  once?: boolean;
  /** Viewport threshold 0-1 for scroll trigger (default: 0.25) */
  amount?: number;
  /** Viewport margin for scroll trigger (e.g., "-100px") */
  margin?: string;
  /** Animation physics type */
  type?: "spring" | "tween" | "inertia";
  /** Spring stiffness (default: 100) */
  stiffness?: number;
  /** Spring damping (default: 10) */
  damping?: number;
  /** Spring mass (default: 1) */
  mass?: number;
  /** Spring bounce amount 0-1 (default: 0) */
  bounce?: number;
  /** Number of repeats (0 = none, Infinity = forever) */
  repeat?: number;
  /** How to repeat the animation */
  repeatType?: "loop" | "reverse" | "mirror";
  /** Enable scroll-triggered animation */
  scroll?: boolean;
  /** Y offset in pixels */
  y?: number;
  /** X offset in pixels */
  x?: number;
  /** Scale value */
  scale?: number;
  /** Starting opacity (usually 0) */
  opacity?: number;
  /** Rotation in degrees */
  rotate?: number;
  /** Blur amount in pixels */
  filter?: number;
  /** Custom initial state properties */
  customInitial?: Record<string, unknown>;
  /** Custom animate state properties */
  customAnimate?: Record<string, unknown>;
  /** Respect user's reduced motion preference (default: true) */
  respectReducedMotion?: boolean;
};

export type StaggerOptions = AnimationOptions & {
  /** Delay between each child animation (default: 0.1) */
  staggerChildren?: number;
  /** Delay before children start animating */
  delayChildren?: number;
  /** Reverse stagger direction */
  staggerDirection?: 1 | -1;
};

type AnimationState = {
  opacity?: number;
  x?: number | string;
  y?: number | string;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  rotate?: number;
  rotateX?: number;
  rotateY?: number;
  skewX?: number;
  skewY?: number;
  filter?: string;
  clipPath?: string;
  transformOrigin?: string;
};

type EnhancedTransition = Transition & {
  repeat?: number;
  repeatType?: "loop" | "reverse" | "mirror";
  staggerChildren?: number;
  delayChildren?: number;
  staggerDirection?: 1 | -1;
};

type StaggerPropsReturn = {
  initial: string | AnimationState;
  animate?: string | AnimationState;
  whileInView?: string;
  viewport?: {
    once: boolean;
    amount: number;
    margin?: string;
  };
  variants: {
    hidden: AnimationState;
    visible: AnimationState & { transition?: EnhancedTransition };
    item: {
      hidden: AnimationState;
      visible: AnimationState & { transition?: EnhancedTransition };
    };
  };
};

// ============================================================================
// PRESETS - Common animation configurations
// ============================================================================

export const presets = {
  fast: { duration: 0.3, ease: "easeOut" as const },
  default: { duration: 0.6, ease: "easeOut" as const },
  slow: { duration: 1, ease: "easeInOut" as const },
  slower: { duration: 1.4, ease: "easeInOut" as const },
  bouncy: { type: "spring" as const, bounce: 0.5, stiffness: 300 },
  gentle: { type: "spring" as const, stiffness: 100, damping: 15 },
  elastic: { type: "spring" as const, stiffness: 400, damping: 10 },
  smooth: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  apple: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  snappy: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
} as const;

// ============================================================================
// CORE UTILITY FUNCTIONS
// ============================================================================

const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const baseTransition = (options?: AnimationOptions): EnhancedTransition => {
  const base: EnhancedTransition = {
    delay: options?.delay ?? 0,
    duration: options?.duration ?? 0.6,
    ease: options?.ease ?? "easeOut",
    type: options?.type ?? "tween",
    repeat: options?.repeat ?? 0,
    repeatType: options?.repeatType ?? "loop",
  };

  if (options?.type === "spring" || base.type === "spring") {
    base.stiffness = options?.stiffness ?? 100;
    base.damping = options?.damping ?? 10;
    base.mass = options?.mass ?? 1;
    base.bounce = options?.bounce ?? 0;
    delete base.duration;
    delete base.ease;
  }

  return base;
};

const createMotionProps = (
  baseInitial: AnimationState,
  baseAnimate: AnimationState,
  options?: AnimationOptions
) => {
  if (options?.respectReducedMotion !== false && prefersReducedMotion()) {
    return {
      initial: baseAnimate,
      animate: baseAnimate,
      variants: { hidden: baseAnimate, visible: baseAnimate },
    };
  }

  const initial: AnimationState = {
    ...baseInitial,
    ...(options?.customInitial ?? {}),
  };
  const animate: AnimationState = {
    ...baseAnimate,
    ...(options?.customAnimate ?? {}),
  };

  if (options?.filter !== undefined) {
    initial.filter = `blur(${options.filter}px)`;
    animate.filter = "blur(0px)";
  }

  const transition = baseTransition(options);
  const variants: Variants = {
    hidden: initial,
    visible: { ...animate, transition },
  };

  if (options?.scroll) {
    return {
      initial: "hidden",
      whileInView: "visible",
      viewport: {
        once: options?.once ?? true,
        amount: options?.amount ?? 0.25,
        margin: options?.margin,
      },
      variants,
    };
  }

  return { initial: "hidden", animate: "visible", variants };
};

const createMotionPropsWithExit = (
  baseInitial: AnimationState,
  baseAnimate: AnimationState,
  baseExit: AnimationState,
  options?: AnimationOptions
) => {
  const props = createMotionProps(baseInitial, baseAnimate, options);
  const transition = baseTransition(options);
  return {
    ...props,
    exit: "exit",
    variants: { ...props.variants, exit: { ...baseExit, transition } },
  };
};

const createStaggerProps = (
  baseInitial: AnimationState,
  baseAnimate: AnimationState,
  options?: StaggerOptions
): StaggerPropsReturn => {
  const motionProps = createMotionProps(baseInitial, baseAnimate, options);
  const staggerTransition: EnhancedTransition = {
    staggerChildren: options?.staggerChildren ?? 0.1,
    delayChildren: options?.delayChildren ?? 0,
    staggerDirection: options?.staggerDirection ?? 1,
  };

  const childTransition = baseTransition(options);

  const extendedVariants: StaggerPropsReturn["variants"] = {
    hidden: motionProps.variants.hidden as AnimationState,
    visible: {
      ...(motionProps.variants.visible as AnimationState),
      transition: staggerTransition,
    },
    item: {
      hidden: baseInitial,
      visible: { ...baseAnimate, transition: childTransition },
    },
  };

  return { ...motionProps, variants: extendedVariants };
};

export const getChildVariants = (
  containerProps: ReturnType<typeof createStaggerProps>
) => containerProps.variants.item;

// ============================================================================
// FADE ANIMATIONS
// ============================================================================

export const fadeIn = (options?: AnimationOptions) =>
  createMotionProps(
    { opacity: options?.opacity ?? 0 },
    { opacity: 1 },
    options
  );

export const fadeUp = (options?: AnimationOptions) =>
  createMotionProps(
    { opacity: options?.opacity ?? 0, y: options?.y ?? 30 },
    { opacity: 1, y: 0 },
    options
  );

export const fadeDown = (options?: AnimationOptions) =>
  createMotionProps(
    { opacity: options?.opacity ?? 0, y: options?.y ?? -30 },
    { opacity: 1, y: 0 },
    options
  );

export const fadeLeft = (options?: AnimationOptions) =>
  createMotionProps(
    { opacity: options?.opacity ?? 0, x: options?.x ?? 30 },
    { opacity: 1, x: 0 },
    options
  );

export const fadeRight = (options?: AnimationOptions) =>
  createMotionProps(
    { opacity: options?.opacity ?? 0, x: options?.x ?? -30 },
    { opacity: 1, x: 0 },
    options
  );

export const fadeInOut = (options?: AnimationOptions) =>
  createMotionPropsWithExit(
    { opacity: 0 },
    { opacity: 1 },
    { opacity: 0 },
    options
  );

export const fadeUpOut = (options?: AnimationOptions) =>
  createMotionPropsWithExit(
    { opacity: options?.opacity ?? 0, y: options?.y ?? 30 },
    { opacity: 1, y: 0 },
    { opacity: 0, y: options?.y ?? -30 },
    options
  );

// ============================================================================
// SLIDE ANIMATIONS (No opacity - pure movement)
// ============================================================================

export const slideUp = (options?: AnimationOptions) =>
  createMotionProps({ y: options?.y ?? 50 }, { y: 0 }, options);

export const slideDown = (options?: AnimationOptions) =>
  createMotionProps({ y: options?.y ?? -50 }, { y: 0 }, options);

export const slideLeft = (options?: AnimationOptions) =>
  createMotionProps({ x: options?.x ?? 50 }, { x: 0 }, options);

export const slideRight = (options?: AnimationOptions) =>
  createMotionProps({ x: options?.x ?? -50 }, { x: 0 }, options);

export const slideInRight = (options?: AnimationOptions) =>
  createMotionProps({ x: options?.x ?? "100%" }, { x: 0 }, options);

export const slideInLeft = (options?: AnimationOptions) =>
  createMotionProps({ x: options?.x ?? "-100%" }, { x: 0 }, options);

export const slideInTop = (options?: AnimationOptions) =>
  createMotionProps({ y: options?.y ?? "-100%" }, { y: 0 }, options);

export const slideInBottom = (options?: AnimationOptions) =>
  createMotionProps({ y: options?.y ?? "100%" }, { y: 0 }, options);

// ============================================================================
// ZOOM/SCALE ANIMATIONS
// ============================================================================

export const zoomIn = (options?: AnimationOptions) =>
  createMotionProps(
    { scale: options?.scale ?? 0, opacity: options?.opacity ?? 0 },
    { scale: 1, opacity: 1 },
    options
  );

export const zoomOut = (options?: AnimationOptions) =>
  createMotionProps(
    { scale: options?.scale ?? 1.5, opacity: options?.opacity ?? 0 },
    { scale: 1, opacity: 1 },
    options
  );

export const zoomUp = (options?: AnimationOptions) =>
  createMotionProps(
    {
      scale: options?.scale ?? 0.8,
      opacity: options?.opacity ?? 0,
      y: options?.y ?? 30,
    },
    { scale: 1, opacity: 1, y: 0 },
    options
  );

export const zoomDown = (options?: AnimationOptions) =>
  createMotionProps(
    {
      scale: options?.scale ?? 0.8,
      opacity: options?.opacity ?? 0,
      y: options?.y ?? -30,
    },
    { scale: 1, opacity: 1, y: 0 },
    options
  );

export const zoomLeft = (options?: AnimationOptions) =>
  createMotionProps(
    {
      scale: options?.scale ?? 0.8,
      opacity: options?.opacity ?? 0,
      x: options?.x ?? 30,
    },
    { scale: 1, opacity: 1, x: 0 },
    options
  );

export const zoomRight = (options?: AnimationOptions) =>
  createMotionProps(
    {
      scale: options?.scale ?? 0.8,
      opacity: options?.opacity ?? 0,
      x: options?.x ?? -30,
    },
    { scale: 1, opacity: 1, x: 0 },
    options
  );

// ============================================================================
// SCALE ANIMATIONS (with distinct physics)
// ============================================================================

export const scaleIn = (options?: AnimationOptions) =>
  createMotionProps(
    { scale: options?.scale ?? 0, opacity: options?.opacity ?? 0 },
    { scale: 1, opacity: 1 },
    {
      ...options,
      type: "spring",
      stiffness: options?.stiffness ?? 200,
      damping: options?.damping ?? 15,
      bounce: options?.bounce ?? 0.4,
    }
  );

export const scaleOut = (options?: AnimationOptions) =>
  createMotionProps(
    { scale: options?.scale ?? 1.2, opacity: options?.opacity ?? 0 },
    { scale: 1, opacity: 1 },
    options
  );

export const scaleBounce = (options?: AnimationOptions) =>
  createMotionProps(
    { scale: options?.scale ?? 0, opacity: options?.opacity ?? 0 },
    { scale: 1, opacity: 1 },
    {
      ...options,
      type: "spring",
      stiffness: options?.stiffness ?? 300,
      damping: options?.damping ?? 10,
      bounce: options?.bounce ?? 0.6,
    }
  );

export const scaleElastic = (options?: AnimationOptions) =>
  createMotionProps(
    { scale: options?.scale ?? 0.5, opacity: options?.opacity ?? 0 },
    { scale: 1, opacity: 1 },
    {
      ...options,
      type: "spring",
      stiffness: options?.stiffness ?? 400,
      damping: options?.damping ?? 8,
    }
  );

export const scaleX = (options?: AnimationOptions) =>
  createMotionProps(
    { scaleX: options?.scale ?? 0, opacity: options?.opacity ?? 0 },
    { scaleX: 1, opacity: 1 },
    options
  );

export const scaleY = (options?: AnimationOptions) =>
  createMotionProps(
    { scaleY: options?.scale ?? 0, opacity: options?.opacity ?? 0 },
    { scaleY: 1, opacity: 1 },
    options
  );

// ============================================================================
// ROTATE ANIMATIONS
// ============================================================================

export const rotateIn = (options?: AnimationOptions) =>
  createMotionProps(
    { rotate: options?.rotate ?? -180, opacity: options?.opacity ?? 0 },
    { rotate: 0, opacity: 1 },
    options
  );

export const rotateOut = (options?: AnimationOptions) =>
  createMotionProps(
    { rotate: options?.rotate ?? 180, opacity: options?.opacity ?? 0 },
    { rotate: 0, opacity: 1 },
    options
  );

export const rotateSpin = (options?: AnimationOptions) =>
  createMotionProps(
    {
      rotate: options?.rotate ?? -360,
      opacity: options?.opacity ?? 0,
      scale: options?.scale ?? 0,
    },
    { rotate: 0, opacity: 1, scale: 1 },
    options
  );

export const rotateFlip = (options?: AnimationOptions) =>
  createMotionProps(
    {
      rotate: options?.rotate ?? 90,
      opacity: options?.opacity ?? 0,
      scale: options?.scale ?? 0.8,
    },
    { rotate: 0, opacity: 1, scale: 1 },
    options
  );

export const rotateScale = (options?: AnimationOptions) =>
  createMotionProps(
    {
      rotate: options?.rotate ?? -45,
      scale: options?.scale ?? 0,
      opacity: options?.opacity ?? 0,
    },
    { rotate: 0, scale: 1, opacity: 1 },
    {
      ...options,
      type: "spring",
      stiffness: options?.stiffness ?? 200,
      damping: options?.damping ?? 15,
    }
  );

// ============================================================================
// BLUR ANIMATIONS
// ============================================================================

export const fadeInBlur = (options?: AnimationOptions) =>
  createMotionProps(
    {
      opacity: options?.opacity ?? 0,
      filter: `blur(${options?.filter ?? 10}px)`,
    },
    { opacity: 1, filter: "blur(0px)" },
    options
  );

export const fadeUpBlur = (options?: AnimationOptions) =>
  createMotionProps(
    {
      opacity: options?.opacity ?? 0,
      y: options?.y ?? 30,
      filter: `blur(${options?.filter ?? 10}px)`,
    },
    { opacity: 1, y: 0, filter: "blur(0px)" },
    options
  );

export const fadeDownBlur = (options?: AnimationOptions) =>
  createMotionProps(
    {
      opacity: options?.opacity ?? 0,
      y: options?.y ?? -30,
      filter: `blur(${options?.filter ?? 10}px)`,
    },
    { opacity: 1, y: 0, filter: "blur(0px)" },
    options
  );

export const fadeLeftBlur = (options?: AnimationOptions) =>
  createMotionProps(
    {
      opacity: options?.opacity ?? 0,
      x: options?.x ?? 30,
      filter: `blur(${options?.filter ?? 10}px)`,
    },
    { opacity: 1, x: 0, filter: "blur(0px)" },
    options
  );

export const fadeRightBlur = (options?: AnimationOptions) =>
  createMotionProps(
    {
      opacity: options?.opacity ?? 0,
      x: options?.x ?? -30,
      filter: `blur(${options?.filter ?? 10}px)`,
    },
    { opacity: 1, x: 0, filter: "blur(0px)" },
    options
  );

export const zoomInBlur = (options?: AnimationOptions) =>
  createMotionProps(
    {
      opacity: options?.opacity ?? 0,
      scale: options?.scale ?? 0.8,
      filter: `blur(${options?.filter ?? 10}px)`,
    },
    { opacity: 1, scale: 1, filter: "blur(0px)" },
    options
  );

// ============================================================================
// BOUNCE ANIMATIONS
// ============================================================================

export const bounceIn = (options?: AnimationOptions) =>
  createMotionProps(
    {
      opacity: options?.opacity ?? 0,
      scale: options?.scale ?? 0.3,
      y: options?.y ?? -100,
    },
    { opacity: 1, scale: 1, y: 0 },
    {
      ...options,
      type: "spring",
      stiffness: options?.stiffness ?? 300,
      damping: options?.damping ?? 10,
      bounce: options?.bounce ?? 0.6,
    }
  );

export const bounceUp = (options?: AnimationOptions) =>
  createMotionProps(
    { opacity: options?.opacity ?? 0, y: options?.y ?? 100 },
    { opacity: 1, y: 0 },
    {
      ...options,
      type: "spring",
      stiffness: options?.stiffness ?? 300,
      damping: options?.damping ?? 10,
      bounce: options?.bounce ?? 0.6,
    }
  );

export const bounceDown = (options?: AnimationOptions) =>
  createMotionProps(
    { opacity: options?.opacity ?? 0, y: options?.y ?? -100 },
    { opacity: 1, y: 0 },
    {
      ...options,
      type: "spring",
      stiffness: options?.stiffness ?? 300,
      damping: options?.damping ?? 10,
      bounce: options?.bounce ?? 0.6,
    }
  );

export const bounceLeft = (options?: AnimationOptions) =>
  createMotionProps(
    { opacity: options?.opacity ?? 0, x: options?.x ?? -100 },
    { opacity: 1, x: 0 },
    {
      ...options,
      type: "spring",
      stiffness: options?.stiffness ?? 300,
      damping: options?.damping ?? 10,
      bounce: options?.bounce ?? 0.6,
    }
  );

export const bounceRight = (options?: AnimationOptions) =>
  createMotionProps(
    { opacity: options?.opacity ?? 0, x: options?.x ?? 100 },
    { opacity: 1, x: 0 },
    {
      ...options,
      type: "spring",
      stiffness: options?.stiffness ?? 300,
      damping: options?.damping ?? 10,
      bounce: options?.bounce ?? 0.6,
    }
  );

// ============================================================================
// FLIP ANIMATIONS (3D)
// ============================================================================

export const flipInX = (options?: AnimationOptions) =>
  createMotionProps(
    { opacity: options?.opacity ?? 0, rotateX: options?.rotate ?? 90 },
    { opacity: 1, rotateX: 0 },
    options
  );

export const flipInY = (options?: AnimationOptions) =>
  createMotionProps(
    { opacity: options?.opacity ?? 0, rotateY: options?.rotate ?? 90 },
    { opacity: 1, rotateY: 0 },
    options
  );

export const flipOutX = (options?: AnimationOptions) =>
  createMotionProps(
    { opacity: options?.opacity ?? 0, rotateX: options?.rotate ?? -90 },
    { opacity: 1, rotateX: 0 },
    options
  );

export const flipOutY = (options?: AnimationOptions) =>
  createMotionProps(
    { opacity: options?.opacity ?? 0, rotateY: options?.rotate ?? -90 },
    { opacity: 1, rotateY: 0 },
    options
  );

export const flipCard = (options?: AnimationOptions) =>
  createMotionProps(
    {
      opacity: options?.opacity ?? 0,
      rotateY: options?.rotate ?? 180,
      scale: options?.scale ?? 0.8,
    },
    { opacity: 1, rotateY: 0, scale: 1 },
    {
      ...options,
      type: "spring",
      stiffness: options?.stiffness ?? 100,
      damping: options?.damping ?? 15,
    }
  );

// ============================================================================
// CLIP PATH / REVEAL ANIMATIONS
// ============================================================================

export const revealLeft = (options?: AnimationOptions) =>
  createMotionProps(
    { clipPath: "inset(0 100% 0 0)" },
    { clipPath: "inset(0 0% 0 0)" },
    options
  );

export const revealRight = (options?: AnimationOptions) =>
  createMotionProps(
    { clipPath: "inset(0 0 0 100%)" },
    { clipPath: "inset(0 0 0 0%)" },
    options
  );

export const revealTop = (options?: AnimationOptions) =>
  createMotionProps(
    { clipPath: "inset(0 0 100% 0)" },
    { clipPath: "inset(0 0 0% 0)" },
    options
  );

export const revealBottom = (options?: AnimationOptions) =>
  createMotionProps(
    { clipPath: "inset(100% 0 0 0)" },
    { clipPath: "inset(0% 0 0 0)" },
    options
  );

export const revealCenter = (options?: AnimationOptions) =>
  createMotionProps(
    { clipPath: "inset(50% 50% 50% 50%)" },
    { clipPath: "inset(0% 0% 0% 0%)" },
    options
  );

export const revealCircle = (options?: AnimationOptions) =>
  createMotionProps(
    { clipPath: "circle(0% at 50% 50%)" },
    { clipPath: "circle(100% at 50% 50%)" },
    options
  );

export const revealCircleTopLeft = (options?: AnimationOptions) =>
  createMotionProps(
    { clipPath: "circle(0% at 0% 0%)" },
    { clipPath: "circle(150% at 0% 0%)" },
    options
  );

export const revealCircleTopRight = (options?: AnimationOptions) =>
  createMotionProps(
    { clipPath: "circle(0% at 100% 0%)" },
    { clipPath: "circle(150% at 100% 0%)" },
    options
  );

export const revealCircleBottomLeft = (options?: AnimationOptions) =>
  createMotionProps(
    { clipPath: "circle(0% at 0% 100%)" },
    { clipPath: "circle(150% at 0% 100%)" },
    options
  );

export const revealCircleBottomRight = (options?: AnimationOptions) =>
  createMotionProps(
    { clipPath: "circle(0% at 100% 100%)" },
    { clipPath: "circle(150% at 100% 100%)" },
    options
  );

// ============================================================================
// SKEW ANIMATIONS
// ============================================================================

export const skewLeft = (options?: AnimationOptions) =>
  createMotionProps(
    {
      opacity: options?.opacity ?? 0,
      skewX: options?.rotate ?? 20,
      x: options?.x ?? -30,
    },
    { opacity: 1, skewX: 0, x: 0 },
    options
  );

export const skewRight = (options?: AnimationOptions) =>
  createMotionProps(
    {
      opacity: options?.opacity ?? 0,
      skewX: options?.rotate ?? -20,
      x: options?.x ?? 30,
    },
    { opacity: 1, skewX: 0, x: 0 },
    options
  );

export const skewUp = (options?: AnimationOptions) =>
  createMotionProps(
    {
      opacity: options?.opacity ?? 0,
      skewY: options?.rotate ?? 10,
      y: options?.y ?? 30,
    },
    { opacity: 1, skewY: 0, y: 0 },
    options
  );

export const skewDown = (options?: AnimationOptions) =>
  createMotionProps(
    {
      opacity: options?.opacity ?? 0,
      skewY: options?.rotate ?? -10,
      y: options?.y ?? -30,
    },
    { opacity: 1, skewY: 0, y: 0 },
    options
  );

// ============================================================================
// STAGGER ANIMATIONS
// ============================================================================

export const staggerFadeUp = (options?: StaggerOptions): StaggerPropsReturn =>
  createStaggerProps(
    { opacity: options?.opacity ?? 0, y: options?.y ?? 30 },
    { opacity: 1, y: 0 },
    options
  );

export const staggerFadeIn = (options?: StaggerOptions): StaggerPropsReturn =>
  createStaggerProps(
    { opacity: options?.opacity ?? 0 },
    { opacity: 1 },
    options
  );

export const staggerSlideUp = (options?: StaggerOptions): StaggerPropsReturn =>
  createStaggerProps({ y: options?.y ?? 30 }, { y: 0 }, options);

export const staggerScale = (options?: StaggerOptions): StaggerPropsReturn =>
  createStaggerProps(
    { opacity: options?.opacity ?? 0, scale: options?.scale ?? 0.8 },
    { opacity: 1, scale: 1 },
    options
  );

export const staggerFadeLeft = (options?: StaggerOptions): StaggerPropsReturn =>
  createStaggerProps(
    { opacity: options?.opacity ?? 0, x: options?.x ?? 30 },
    { opacity: 1, x: 0 },
    options
  );

export const staggerFadeRight = (options?: StaggerOptions): StaggerPropsReturn =>
  createStaggerProps(
    { opacity: options?.opacity ?? 0, x: options?.x ?? -30 },
    { opacity: 1, x: 0 },
    options
  );

export const staggerReveal = (options?: StaggerOptions): StaggerPropsReturn =>
  createStaggerProps(
    { clipPath: "inset(100% 0 0 0)" },
    { clipPath: "inset(0% 0 0 0)" },
    options
  );

export const staggerZoom = (options?: StaggerOptions): StaggerPropsReturn =>
  createStaggerProps(
    { opacity: options?.opacity ?? 0, scale: options?.scale ?? 0 },
    { opacity: 1, scale: 1 },
    options
  );

// ============================================================================
// ATTENTION SEEKER ANIMATIONS
// ============================================================================

export const pulse = (options?: AnimationOptions) => ({
  initial: { scale: 1 },
  animate: {
    scale: [1, options?.scale ?? 1.05, 1],
    transition: {
      duration: options?.duration ?? 1,
      repeat: options?.repeat ?? Infinity,
      repeatType: options?.repeatType ?? "loop",
      ease: "easeInOut",
      delay: options?.delay ?? 0,
    },
  },
});

export const pulseStrong = (options?: AnimationOptions) => ({
  initial: { scale: 1 },
  animate: {
    scale: [1, options?.scale ?? 1.15, 1],
    transition: {
      duration: options?.duration ?? 0.8,
      repeat: options?.repeat ?? Infinity,
      repeatType: options?.repeatType ?? "loop",
      ease: "easeInOut",
      delay: options?.delay ?? 0,
    },
  },
});

export const shake = (options?: AnimationOptions) => ({
  initial: { x: 0 },
  animate: {
    x: [
      0,
      -(options?.x ?? 10),
      options?.x ?? 10,
      -(options?.x ?? 10),
      options?.x ?? 10,
      0,
    ],
    transition: {
      duration: options?.duration ?? 0.5,
      repeat: options?.repeat ?? 0,
      repeatType: options?.repeatType ?? "loop",
      delay: options?.delay ?? 0,
    },
  },
});

export const shakeY = (options?: AnimationOptions) => ({
  initial: { y: 0 },
  animate: {
    y: [
      0,
      -(options?.y ?? 10),
      options?.y ?? 10,
      -(options?.y ?? 10),
      options?.y ?? 10,
      0,
    ],
    transition: {
      duration: options?.duration ?? 0.5,
      repeat: options?.repeat ?? 0,
      repeatType: options?.repeatType ?? "loop",
      delay: options?.delay ?? 0,
    },
  },
});

export const tada = (options?: AnimationOptions) => ({
  initial: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
    rotate: [0, -3, -3, 3, -3, 3, -3, 3, -3, 0],
    transition: {
      duration: options?.duration ?? 1,
      repeat: options?.repeat ?? 0,
      repeatType: options?.repeatType ?? "loop",
      delay: options?.delay ?? 0,
    },
  },
});

export const wobble = (options?: AnimationOptions) => ({
  initial: { rotate: 0, x: 0 },
  animate: {
    rotate: [0, -5, 5, -5, 3, -2, 0],
    x: [
      0,
      -(options?.x ?? 25),
      options?.x ?? 20,
      -(options?.x ?? 15),
      options?.x ?? 10,
      -(options?.x ?? 5),
      0,
    ],
    transition: {
      duration: options?.duration ?? 0.8,
      repeat: options?.repeat ?? 0,
      repeatType: options?.repeatType ?? "loop",
      delay: options?.delay ?? 0,
    },
  },
});

export const heartbeat = (options?: AnimationOptions) => ({
  initial: { scale: 1 },
  animate: {
    scale: [1, options?.scale ?? 1.25, 1.1, options?.scale ?? 1.25, 1],
    transition: {
      duration: options?.duration ?? 1,
      repeat: options?.repeat ?? Infinity,
      repeatType: options?.repeatType ?? "loop",
      ease: "easeInOut",
      delay: options?.delay ?? 0,
    },
  },
});

export const rubberBand = (options?: AnimationOptions) => ({
  initial: { scaleX: 1, scaleY: 1 },
  animate: {
    scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
    scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
    transition: {
      duration: options?.duration ?? 1,
      repeat: options?.repeat ?? 0,
      repeatType: options?.repeatType ?? "loop",
      delay: options?.delay ?? 0,
    },
  },
});

export const swing = (options?: AnimationOptions) => ({
  initial: { rotate: 0, transformOrigin: "top center" },
  animate: {
    rotate: [
      0,
      options?.rotate ?? 15,
      -(options?.rotate ?? 10),
      options?.rotate ?? 5,
      -(options?.rotate ?? 5),
      0,
    ],
    transition: {
      duration: options?.duration ?? 1,
      repeat: options?.repeat ?? 0,
      repeatType: options?.repeatType ?? "loop",
      delay: options?.delay ?? 0,
    },
  },
});

export const jello = (options?: AnimationOptions) => ({
  initial: { skewX: 0, skewY: 0 },
  animate: {
    skewX: [0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0],
    skewY: [0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0],
    transition: {
      duration: options?.duration ?? 1,
      repeat: options?.repeat ?? 0,
      repeatType: options?.repeatType ?? "loop",
      delay: options?.delay ?? 0,
    },
  },
});

export const float = (options?: AnimationOptions) => ({
  initial: { y: 0 },
  animate: {
    y: [0, options?.y ?? -10, 0],
    transition: {
      duration: options?.duration ?? 2,
      repeat: options?.repeat ?? Infinity,
      repeatType: options?.repeatType ?? "loop",
      ease: "easeInOut",
      delay: options?.delay ?? 0,
    },
  },
});

export const spin = (options?: AnimationOptions) => ({
  initial: { rotate: 0 },
  animate: {
    rotate: options?.rotate ?? 360,
    transition: {
      duration: options?.duration ?? 1,
      repeat: options?.repeat ?? Infinity,
      repeatType: options?.repeatType ?? "loop",
      ease: "linear",
      delay: options?.delay ?? 0,
    },
  },
});

export const ping = (options?: AnimationOptions) => ({
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, options?.scale ?? 1.5],
    opacity: [options?.opacity ?? 0.75, 0],
    transition: {
      duration: options?.duration ?? 1,
      repeat: options?.repeat ?? Infinity,
      repeatType: options?.repeatType ?? "loop",
      ease: "easeOut",
      delay: options?.delay ?? 0,
    },
  },
});

export const blink = (options?: AnimationOptions) => ({
  initial: { opacity: 1 },
  animate: {
    opacity: [1, options?.opacity ?? 0, 1],
    transition: {
      duration: options?.duration ?? 1,
      repeat: options?.repeat ?? Infinity,
      repeatType: options?.repeatType ?? "loop",
      ease: "linear",
      delay: options?.delay ?? 0,
    },
  },
});

export const bounceLoop = (options?: AnimationOptions) => ({
  initial: { y: 0 },
  animate: {
    y: [0, options?.y ?? -20, 0],
    transition: {
      duration: options?.duration ?? 0.6,
      repeat: options?.repeat ?? Infinity,
      repeatType: options?.repeatType ?? "loop",
      ease: "easeOut",
      delay: options?.delay ?? 0,
    },
  },
});

// ============================================================================
// HOVER ANIMATIONS
// ============================================================================

export const hoverLift = (options?: {
  y?: number;
  scale?: number;
  duration?: number;
}) => ({
  whileHover: {
    y: options?.y ?? -5,
    scale: options?.scale ?? 1.02,
    transition: { duration: options?.duration ?? 0.2 },
  },
  whileTap: { scale: 0.98 },
});

export const hoverGrow = (options?: { scale?: number; duration?: number }) => ({
  whileHover: {
    scale: options?.scale ?? 1.05,
    transition: { duration: options?.duration ?? 0.2 },
  },
  whileTap: { scale: 0.95 },
});

export const hoverShrink = (options?: {
  scale?: number;
  duration?: number;
}) => ({
  whileHover: {
    scale: options?.scale ?? 0.95,
    transition: { duration: options?.duration ?? 0.2 },
  },
  whileTap: { scale: 0.9 },
});

export const hoverTilt = (options?: {
  rotate?: number;
  duration?: number;
}) => ({
  whileHover: {
    rotate: options?.rotate ?? 3,
    transition: { duration: options?.duration ?? 0.2 },
  },
});

export const hoverBounce = (options?: { y?: number; duration?: number }) => ({
  whileHover: {
    y: [0, options?.y ?? -8, 0],
    transition: { duration: options?.duration ?? 0.4, repeat: Infinity },
  },
});

export const hoverShake = (options?: { x?: number; duration?: number }) => ({
  whileHover: {
    x: [
      0,
      -(options?.x ?? 5),
      options?.x ?? 5,
      -(options?.x ?? 5),
      options?.x ?? 5,
      0,
    ],
    transition: { duration: options?.duration ?? 0.4 },
  },
});

export const hoverPulse = (options?: {
  scale?: number;
  duration?: number;
}) => ({
  whileHover: {
    scale: [1, options?.scale ?? 1.05, 1],
    transition: { duration: options?.duration ?? 0.6, repeat: Infinity },
  },
});

export const hoverGlow = (options?: { scale?: number; duration?: number }) => ({
  whileHover: {
    scale: options?.scale ?? 1.02,
    transition: { duration: options?.duration ?? 0.2 },
  },
  whileTap: { scale: 0.98 },
});

// ============================================================================
// TAP/PRESS ANIMATIONS
// ============================================================================

export const tapPress = (options?: { scale?: number }) => ({
  whileTap: { scale: options?.scale ?? 0.95 },
});

export const tapRotate = (options?: { scale?: number; rotate?: number }) => ({
  whileTap: { scale: options?.scale ?? 0.95, rotate: options?.rotate ?? 2 },
});

export const tapBounce = (options?: { scale?: number }) => ({
  whileTap: {
    scale: options?.scale ?? 0.9,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const combineAnimations = (
  ...animations: Array<ReturnType<typeof createMotionProps>>
) => {
  const combined = { ...animations[0] };
  for (let i = 1; i < animations.length; i++) {
    const anim = animations[i];
    if (anim.variants && combined.variants) {
      combined.variants = {
        hidden: {
          ...(combined.variants.hidden as object),
          ...(anim.variants.hidden as object),
        },
        visible: {
          ...(combined.variants.visible as object),
          ...(anim.variants.visible as object),
        },
      };
    }
    if (anim.viewport && combined.viewport) {
      combined.viewport = { ...combined.viewport, ...anim.viewport };
    }
  }
  return combined;
};

export const createSequence = (
  animations: Array<{
    animation: (
      options?: AnimationOptions
    ) => ReturnType<typeof createMotionProps>;
    delay: number;
    options?: AnimationOptions;
  }>
) =>
  animations.map(({ animation, delay, options }) =>
    animation({ ...options, delay: (options?.delay ?? 0) + delay })
  );

export const withOrigin = (
  animation: ReturnType<typeof createMotionProps>,
  origin: string
) => ({
  ...animation,
  style: { transformOrigin: origin },
});

export const withPreset = <T extends AnimationOptions>(
  preset: Partial<AnimationOptions>,
  options?: T
): T => ({ ...preset, ...options }) as T;

export const noAnimation = () => ({
  initial: false,
  animate: false,
  variants: {},
});

export const withDelay = (
  animation: ReturnType<typeof createMotionProps>,
  delay: number
) => {
  const variants = { ...animation.variants };
  if (variants.visible && typeof variants.visible === "object") {
    variants.visible = {
      ...variants.visible,
      transition: {
        ...(variants.visible as any).transition,
        delay: ((variants.visible as any).transition?.delay ?? 0) + delay,
      },
    };
  }
  return { ...animation, variants };
};

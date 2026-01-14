"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  fadeIn,
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  fadeInOut,
  fadeUpOut,
  slideUp,
  slideDown,
  slideLeft,
  slideRight,
  slideInRight,
  slideInLeft,
  slideInTop,
  slideInBottom,
  zoomIn,
  zoomOut,
  zoomUp,
  zoomDown,
  zoomLeft,
  zoomRight,
  scaleIn,
  scaleOut,
  scaleBounce,
  scaleElastic,
  scaleX,
  scaleY,
  rotateIn,
  rotateOut,
  rotateSpin,
  rotateFlip,
  rotateScale,
  fadeInBlur,
  fadeUpBlur,
  fadeDownBlur,
  fadeLeftBlur,
  fadeRightBlur,
  zoomInBlur,
  bounceIn,
  bounceUp,
  bounceDown,
  bounceLeft,
  bounceRight,
  flipInX,
  flipInY,
  flipOutX,
  flipOutY,
  flipCard,
  revealLeft,
  revealRight,
  revealTop,
  revealBottom,
  revealCenter,
  revealCircle,
  skewLeft,
  skewRight,
  skewUp,
  skewDown,
  staggerFadeUp,
  staggerFadeIn,
  staggerScale,
  staggerZoom,
  pulse,
  pulseStrong,
  shake,
  shakeY,
  tada,
  wobble,
  heartbeat,
  rubberBand,
  swing,
  jello,
  float,
  spin,
  ping,
  blink,
  bounceLoop,
  hoverLift,
  hoverGrow,
  hoverShrink,
  hoverTilt,
  hoverBounce,
  hoverShake,
  hoverPulse,
  tapPress,
  tapRotate,
  tapBounce,
  presets,
  getChildVariants,
} from "cnippet-aos";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  Zap,
  Box,
  MousePointer,
} from "lucide-react";

// ============================================================================
// ANIMATION REGISTRY
// ============================================================================

const animationCategories = {
  fade: {
    label: "Fade",
    description: "Smooth opacity transitions",
    animations: {
      fadeIn: { fn: fadeIn, label: "fadeIn" },
      fadeUp: { fn: fadeUp, label: "fadeUp" },
      fadeDown: { fn: fadeDown, label: "fadeDown" },
      fadeLeft: { fn: fadeLeft, label: "fadeLeft" },
      fadeRight: { fn: fadeRight, label: "fadeRight" },
      fadeInOut: { fn: fadeInOut, label: "fadeInOut" },
      fadeUpOut: { fn: fadeUpOut, label: "fadeUpOut" },
    },
  },
  slide: {
    label: "Slide",
    description: "Pure movement animations",
    animations: {
      slideUp: { fn: slideUp, label: "slideUp" },
      slideDown: { fn: slideDown, label: "slideDown" },
      slideLeft: { fn: slideLeft, label: "slideLeft" },
      slideRight: { fn: slideRight, label: "slideRight" },
      slideInRight: { fn: slideInRight, label: "slideInRight" },
      slideInLeft: { fn: slideInLeft, label: "slideInLeft" },
    },
  },
  zoom: {
    label: "Zoom",
    description: "Scale with movement",
    animations: {
      zoomIn: { fn: zoomIn, label: "zoomIn" },
      zoomOut: { fn: zoomOut, label: "zoomOut" },
      zoomUp: { fn: zoomUp, label: "zoomUp" },
      zoomDown: { fn: zoomDown, label: "zoomDown" },
      zoomLeft: { fn: zoomLeft, label: "zoomLeft" },
      zoomRight: { fn: zoomRight, label: "zoomRight" },
    },
  },
  scale: {
    label: "Scale",
    description: "Spring-based scaling",
    animations: {
      scaleIn: { fn: scaleIn, label: "scaleIn" },
      scaleOut: { fn: scaleOut, label: "scaleOut" },
      scaleBounce: { fn: scaleBounce, label: "scaleBounce" },
      scaleElastic: { fn: scaleElastic, label: "scaleElastic" },
      scaleX: { fn: scaleX, label: "scaleX" },
      scaleY: { fn: scaleY, label: "scaleY" },
    },
  },
  rotate: {
    label: "Rotate",
    description: "Rotation animations",
    animations: {
      rotateIn: { fn: rotateIn, label: "rotateIn" },
      rotateOut: { fn: rotateOut, label: "rotateOut" },
      rotateSpin: { fn: rotateSpin, label: "rotateSpin" },
      rotateFlip: { fn: rotateFlip, label: "rotateFlip" },
      rotateScale: { fn: rotateScale, label: "rotateScale" },
    },
  },
  blur: {
    label: "Blur",
    description: "Fade with blur effect",
    animations: {
      fadeInBlur: { fn: fadeInBlur, label: "fadeInBlur" },
      fadeUpBlur: { fn: fadeUpBlur, label: "fadeUpBlur" },
      fadeDownBlur: { fn: fadeDownBlur, label: "fadeDownBlur" },
      fadeLeftBlur: { fn: fadeLeftBlur, label: "fadeLeftBlur" },
      fadeRightBlur: { fn: fadeRightBlur, label: "fadeRightBlur" },
      zoomInBlur: { fn: zoomInBlur, label: "zoomInBlur" },
    },
  },
  bounce: {
    label: "Bounce",
    description: "Spring physics bounce",
    animations: {
      bounceIn: { fn: bounceIn, label: "bounceIn" },
      bounceUp: { fn: bounceUp, label: "bounceUp" },
      bounceDown: { fn: bounceDown, label: "bounceDown" },
      bounceLeft: { fn: bounceLeft, label: "bounceLeft" },
      bounceRight: { fn: bounceRight, label: "bounceRight" },
    },
  },
  flip: {
    label: "Flip",
    description: "3D flip animations",
    animations: {
      flipInX: { fn: flipInX, label: "flipInX" },
      flipInY: { fn: flipInY, label: "flipInY" },
      flipOutX: { fn: flipOutX, label: "flipOutX" },
      flipOutY: { fn: flipOutY, label: "flipOutY" },
      flipCard: { fn: flipCard, label: "flipCard" },
    },
  },
  reveal: {
    label: "Reveal",
    description: "Clip-path reveals",
    animations: {
      revealLeft: { fn: revealLeft, label: "revealLeft" },
      revealRight: { fn: revealRight, label: "revealRight" },
      revealTop: { fn: revealTop, label: "revealTop" },
      revealBottom: { fn: revealBottom, label: "revealBottom" },
      revealCenter: { fn: revealCenter, label: "revealCenter" },
      revealCircle: { fn: revealCircle, label: "revealCircle" },
    },
  },
  skew: {
    label: "Skew",
    description: "Skew transformations",
    animations: {
      skewLeft: { fn: skewLeft, label: "skewLeft" },
      skewRight: { fn: skewRight, label: "skewRight" },
      skewUp: { fn: skewUp, label: "skewUp" },
      skewDown: { fn: skewDown, label: "skewDown" },
    },
  },
  attention: {
    label: "Attention",
    description: "Looping attention seekers",
    animations: {
      pulse: { fn: pulse, label: "pulse", loop: true },
      shake: { fn: shake, label: "shake", loop: true },
      tada: { fn: tada, label: "tada", loop: true },
      wobble: { fn: wobble, label: "wobble", loop: true },
      heartbeat: { fn: heartbeat, label: "heartbeat", loop: true },
      rubberBand: { fn: rubberBand, label: "rubberBand", loop: true },
      swing: { fn: swing, label: "swing", loop: true },
      jello: { fn: jello, label: "jello", loop: true },
      float: { fn: float, label: "float", loop: true },
      spin: { fn: spin, label: "spin", loop: true },
    },
  },
};

type CategoryKey = keyof typeof animationCategories;

// ============================================================================
// COMPONENTS
// ============================================================================

function AnimationDemo({
  animationFn,
  label,
  isLoop = false,
}: {
  animationFn: (options?: any) => any;
  label: string;
  isLoop?: boolean;
}) {
  const [key, setKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const replay = useCallback(() => {
    setKey((k) => k + 1);
  }, []);

  const copyCode = useCallback(() => {
    const code = `<motion.div {...${label}({ scroll: true })}>\n  Content\n</motion.div>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [label]);

  const animationProps = isLoop
    ? animationFn({ repeat: Infinity, duration: 1.5 })
    : animationFn({ duration: 0.6 });

  return (
    <div className="group relative">
      <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50/50 transition-colors hover:border-neutral-300 hover:bg-neutral-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            {...animationProps}
            className="flex h-16 w-16 items-center justify-center rounded-lg bg-linear-to-br from-neutral-900 to-neutral-700 text-white shadow-lg"
          >
            <Box className="h-6 w-6" />
          </motion.div>
        </AnimatePresence>

        {/* Controls overlay */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={replay}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-neutral-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-neutral-900"
            title="Replay animation"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={copyCode}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-neutral-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-neutral-900"
            title="Copy code"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
      <p className="mt-2 text-center font-mono text-xs text-neutral-600">
        {label}
      </p>
    </div>
  );
}

function HoverDemo({
  hoverFn,
  label,
}: {
  hoverFn: (options?: any) => any;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = useCallback(() => {
    const code = `<motion.button {...${label}()}>\n  Hover me\n</motion.button>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [label]);

  return (
    <div className="group relative">
      <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50/50">
        <motion.button
          {...hoverFn()}
          className="rounded-lg bg-linear-to-br from-neutral-900 to-neutral-700 px-6 py-3 font-medium text-white shadow-lg"
        >
          Hover me
        </motion.button>

        <button
          onClick={copyCode}
          className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-neutral-600 opacity-0 shadow-sm backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-white hover:text-neutral-900"
          title="Copy code"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-600" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      <p className="mt-2 text-center font-mono text-xs text-neutral-600">
        {label}
      </p>
    </div>
  );
}

function StaggerDemo() {
  const [key, setKey] = useState(0);
  const containerProps = staggerFadeUp({
    staggerChildren: 0.1,
    delayChildren: 0.2,
  });

  return (
    <div className="group relative">
      <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50/50 p-6">
        <motion.div key={key} {...containerProps} className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              variants={containerProps.variants.item}
              className="h-12 w-12 rounded-lg bg-linear-to-br from-neutral-900 to-neutral-700 shadow-lg"
            />
          ))}
        </motion.div>

        <button
          onClick={() => setKey((k) => k + 1)}
          className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-neutral-600 opacity-0 shadow-sm backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-white hover:text-neutral-900"
          title="Replay"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="mt-2 text-center font-mono text-xs text-neutral-600">
        staggerFadeUp
      </p>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="group relative">
      <pre className="overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-950 p-4 text-sm">
        <code className="text-neutral-300">{code}</code>
      </pre>
      <button
        onClick={copyCode}
        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-md bg-neutral-800 text-neutral-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-neutral-700 hover:text-white"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div {...fadeUpBlur({ scroll: true, delay, y: 30 })}>
      <Card className="h-full border-neutral-200 bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
            <Icon className="h-5 w-5 text-neutral-700" />
          </div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function AOSHomePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("fade");
  const [globalKey, setGlobalKey] = useState(0);

  const replayAll = useCallback(() => {
    setGlobalKey((k) => k + 1);
  }, []);

  const currentCategory = animationCategories[activeCategory];

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle grid background */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[4rem_4rem]" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <motion.div
            {...fadeRight({ duration: 0.5 })}
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-neutral-900">cnippet-aos</span>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-xs text-neutral-600">
              v2.0
            </span>
          </motion.div>

          <motion.div
            {...fadeLeft({ duration: 0.5, delay: 0.1 })}
            className="flex items-center gap-3"
          >
            <a
              href="https://github.com/cnippet/cnippet-aos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/cnippet-aos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
            >
              npm
            </a>
            <Button size="sm">Get Started</Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              {...fadeUpBlur({ y: 40, delay: 0.1 })}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1"
            >
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-sm text-neutral-600">
                Built on Motion (Framer Motion)
              </span>
            </motion.div>

            <motion.h1
              {...fadeUpBlur({ y: 50, delay: 0.2, duration: 0.7 })}
              className="mb-6 text-4xl font-semibold tracking-tight text-neutral-900 md:text-6xl"
            >
              Animation on Scroll,
              <br />
              <span className="text-neutral-400">Made Simple</span>
            </motion.h1>

            <motion.p
              {...fadeUpBlur({ y: 40, delay: 0.3 })}
              className="mb-8 text-lg text-neutral-600 md:text-xl"
            >
              A lightweight, declarative animation library with 80+ ready-to-use
              animations. Just spread and go.
            </motion.p>

            <motion.div
              {...fadeUpBlur({ y: 30, delay: 0.4 })}
              className="flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Button size="lg" className="gap-2">
                View Animations
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Documentation
              </Button>
            </motion.div>
          </div>

          {/* Hero code example */}
          <motion.div
            {...fadeUpBlur({ y: 40, delay: 0.5, scroll: true })}
            className="mx-auto mt-16 max-w-2xl"
          >
            <CodeBlock
              code={`import { motion } from "motion/react";
import { fadeUpBlur } from "cnippet-aos";

function Hero() {
  return (
    <motion.h1 {...fadeUpBlur({ scroll: true, y: 50 })}>
      Hello World
    </motion.h1>
  );
}`}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-neutral-200 bg-neutral-50/50">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <motion.div
            {...fadeUpBlur({ scroll: true, y: 30 })}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-2xl font-semibold text-neutral-900 md:text-3xl">
              Why cnippet-aos?
            </h2>
            <p className="text-neutral-600">
              Everything you need for scroll animations, nothing you don't.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={Zap}
              title="Zero Config"
              description="Sensible defaults out of the box. Just spread the props and you're done."
              delay={0}
            />
            <FeatureCard
              icon={Box}
              title="80+ Animations"
              description="Fades, slides, zooms, bounces, flips, reveals, and more."
              delay={0.1}
            />
            <FeatureCard
              icon={Sparkles}
              title="TypeScript First"
              description="Full TypeScript support with autocomplete for all options."
              delay={0.2}
            />
            <FeatureCard
              icon={MousePointer}
              title="Scroll & Hover"
              description="Scroll-triggered animations plus hover and tap interactions."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Animation Showcase */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <motion.div
            {...fadeUpBlur({ scroll: true, y: 30 })}
            className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
          >
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-neutral-900 md:text-3xl">
                Animation Gallery
              </h2>
              <p className="text-neutral-600">
                Explore all available animations. Hover to replay and copy code.
              </p>
            </div>
            <Button variant="outline" onClick={replayAll} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Replay All
            </Button>
          </motion.div>

          <Tabs
            value={activeCategory}
            onValueChange={(v) => setActiveCategory(v as CategoryKey)}
          >
            <motion.div {...fadeIn({ scroll: true, delay: 0.1 })}>
              <TabsList className="mb-8 flex-wrap">
                {Object.entries(animationCategories).map(([key, { label }]) => (
                  <TabsTab key={key} value={key}>
                    {label}
                  </TabsTab>
                ))}
              </TabsList>
            </motion.div>

            {Object.entries(animationCategories).map(
              ([categoryKey, category]) => (
                <TabsPanel key={categoryKey} value={categoryKey}>
                  <motion.div {...fadeIn({ duration: 0.3 })} className="mb-4">
                    <p className="text-sm text-neutral-500">
                      {category.description}
                    </p>
                  </motion.div>

                  <div
                    key={globalKey}
                    className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                  >
                    {Object.entries(category.animations).map(
                      ([key, { fn, label, loop }]) => (
                        <AnimationDemo
                          key={key}
                          animationFn={fn}
                          label={label}
                          isLoop={loop}
                        />
                      ),
                    )}
                  </div>
                </TabsPanel>
              ),
            )}
          </Tabs>
        </div>
      </section>

      {/* Stagger Section */}
      <section className="border-b border-neutral-200 bg-neutral-50/50">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div {...fadeRight({ scroll: true, x: -30 })}>
              <h2 className="mb-4 text-2xl font-semibold text-neutral-900 md:text-3xl">
                Stagger Animations
              </h2>
              <p className="mb-6 text-neutral-600">
                Animate lists and grids with cascading delays. Perfect for card
                grids, navigation menus, and content reveals.
              </p>
              <CodeBlock
                code={`const containerProps = staggerFadeUp({
  staggerChildren: 0.1,
  delayChildren: 0.2,
  scroll: true,
});

<motion.ul {...containerProps}>
  {items.map((item) => (
    <motion.li
      key={item.id}
      variants={containerProps.variants.item}
    >
      {item.name}
    </motion.li>
  ))}
</motion.ul>`}
              />
            </motion.div>

            <motion.div {...fadeLeft({ scroll: true, x: 30, delay: 0.2 })}>
              <StaggerDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hover & Tap Section */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <motion.div
            {...fadeUpBlur({ scroll: true, y: 30 })}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-2xl font-semibold text-neutral-900 md:text-3xl">
              Hover & Tap Interactions
            </h2>
            <p className="text-neutral-600">
              Ready-made interaction states for buttons and interactive
              elements.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            <HoverDemo hoverFn={hoverLift} label="hoverLift" />
            <HoverDemo hoverFn={hoverGrow} label="hoverGrow" />
            <HoverDemo hoverFn={hoverShrink} label="hoverShrink" />
            <HoverDemo hoverFn={hoverTilt} label="hoverTilt" />
            <HoverDemo hoverFn={hoverBounce} label="hoverBounce" />
            <HoverDemo hoverFn={hoverShake} label="hoverShake" />
            <HoverDemo hoverFn={hoverPulse} label="hoverPulse" />
          </div>
        </div>
      </section>

      {/* Presets Section */}
      <section className="border-b border-neutral-200 bg-neutral-50/50">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              {...fadeLeft({ scroll: true, x: 30 })}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(presets).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-lg border border-neutral-200 bg-white p-3"
                  >
                    <p className="mb-1 font-mono text-sm font-medium text-neutral-900">
                      {key}
                    </p>
                    <p className="font-mono text-xs text-neutral-500">
                      {JSON.stringify(value).slice(0, 30)}...
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeRight({ scroll: true, x: -30 })}
              className="order-1 lg:order-2"
            >
              <h2 className="mb-4 text-2xl font-semibold text-neutral-900 md:text-3xl">
                Built-in Presets
              </h2>
              <p className="mb-6 text-neutral-600">
                Common timing configurations ready to use. Mix and match with
                any animation.
              </p>
              <CodeBlock
                code={`import { presets, fadeUp } from "cnippet-aos";

// Use a preset
<motion.div {...fadeUp({ ...presets.bouncy })}>
  Bouncy fade up
</motion.div>

// Available presets:
// fast, default, slow, slower
// bouncy, gentle, elastic
// smooth, apple, snappy`}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <motion.div
            {...fadeUpBlur({ scroll: true, y: 30 })}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-2xl font-semibold text-neutral-900 md:text-3xl">
              Get Started in Seconds
            </h2>
            <p className="mb-8 text-neutral-600">
              Install the package and start animating. It's that simple.
            </p>

            <div className="space-y-4 text-left">
              <CodeBlock code="npm install cnippet-aos motion" />
              <CodeBlock
                code={`import { motion } from "motion/react";
import { fadeUpBlur } from "cnippet-aos";

export function MyComponent() {
  return (
    <motion.div {...fadeUpBlur({ scroll: true })}>
      ✨ Animated content
    </motion.div>
  );
}`}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50/50">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-neutral-900">
                cnippet-aos
              </span>
            </div>

            <p className="text-sm text-neutral-500">
              Built by{" "}
              <a
                href="https://cnippet.dev"
                className="text-neutral-700 underline-offset-4 hover:underline"
              >
                Cnippet
              </a>
              . Open source on{" "}
              <a
                href="https://github.com/cnippet/cnippet-aos"
                className="text-neutral-700 underline-offset-4 hover:underline"
              >
                GitHub
              </a>
              .
            </p>

            <p className="font-mono text-xs text-neutral-400">©2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

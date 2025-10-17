# Cnippet Animate On Scroll (AOS)

A lightweight animation on scroll/load library built with Motion (Framer Motion). It provides smooth, performant animations that trigger when elements enter the viewport with extensive customization options.

## Installation

```bash
npm install cnippet-aos motion
# or
pnpm add cnippet-aos motion
# or
yarn add cnippet-aos motion
```

## Features

- **✨ Smooth Animations**: Powered by Framer Motion for buttery-smooth transitions
- **⚡ Scroll Triggered**: Animations activate when elements enter viewport
- **🪶 Responsive**: Works seamlessly across all devices
- **🗃️ Lightweight**: Minimal bundle size impact
- **🔥 Highly Customizable**: Extensive animation options and parameters
- **🌟 Accessible**: Respects reduced motion preferences
- **📝 30+ Animation Variants**: Fade, slide, zoom, scale, rotate, and blur effects

## Usage Methods

### Method 1: Using Animation Functions (Recommended)

Import animation functions and spread them directly on motion components:

```jsx
import { motion } from "motion/react";
import { fadeUp, fadeUpBlur, slideLeft, zoomIn } from "cnippet-aos";

function MyComponent() {
  return (
    <div>
      <motion.h2
        {...fadeUpBlur({
          delay: 0.1,
          duration: 0.8,
          scroll: true,
          once: true,
        })}
      >
        Animated Heading
      </motion.h2>
      
      <motion.p
        {...fadeUp({
          delay: 0.3,
          duration: 0.6,
          scroll: true,
          once: true,
        })}
      >
        This text fades up smoothly
      </motion.p>
    </div>
  );
}
```

## Complete Animation Reference

### Fade Animations

```jsx
import { fadeIn, fadeUp, fadeDown, fadeLeft, fadeRight } from "cnippet-aos";

// Simple fade in
<motion.div {...fadeIn({ delay: 0.2 })}>

// Fade with movement
<motion.div {...fadeUp({ y: 50, duration: 0.8 })}>
<motion.div {...fadeDown({ y: -30 })}>
<motion.div {...fadeLeft({ x: 30 })}>
<motion.div {...fadeRight({ x: -30 })}>
```

### Fade with Blur Animations

```jsx
import { 
  fadeInBlur, 
  fadeUpBlur, 
  fadeDownBlur, 
  fadeLeftBlur, 
  fadeRightBlur 
} from "cnippet-aos";

// Fade with blur effects
<motion.div {...fadeUpBlur({ filter: 15 })}> // Custom blur amount
<motion.div {...fadeInBlur({ duration: 1 })}>
```

### Slide Animations

```jsx
import { slideUp, slideDown, slideLeft, slideRight } from "cnippet-aos";

<motion.div {...slideUp({ y: 100 })}>
<motion.div {...slideDown({ y: -100 })}>
<motion.div {...slideLeft({ x: 100 })}>
<motion.div {...slideRight({ x: -100 })}>
```

### Zoom Animations

```jsx
import { 
  zoomIn, zoomOut, zoomUp, zoomDown, zoomLeft, zoomRight 
} from "cnippet-aos";

<motion.div {...zoomIn({ scale: 0.5 })}>
<motion.div {...zoomOut({ scale: 1.5 })}>
<motion.div {...zoomUp({ scale: 0.3 })}>
```

### Scale Animations

```jsx
import { scaleIn, scaleOut, scaleBounce, scaleElastic } from "cnippet-aos";

// Spring-based scale animations
<motion.div {...scaleIn({ type: "spring", bounce: 0.4 })}>
<motion.div {...scaleBounce({ scale: 0.8 })}>
```

### Rotate Animations

```jsx
import { rotateIn, rotateOut, rotateSpin, rotateFlip } from "cnippet-aos";

<motion.div {...rotateIn({ rotate: -90 })}>
<motion.div {...rotateSpin({ rotate: 360, duration: 1 })}>
<motion.div {...rotateFlip({ rotate: 180 })}>
```

## Animation Options Reference

| Parameter     | Type    | Default     | Description                                        |
|---------------|---------|-------------|----------------------------------------------------|
| delay         | number  | 0           | Delay before animation starts (seconds)            |
| duration      | number  | 0.6         | Animation duration in seconds                      |
| ease          | string  | "easeOut"   | CSS easing function                                |
| once          | boolean | true        | Whether animation should happen only once          |
| amount        | number  | 0.25        | Viewport threshold (0-1) when animation triggers   |
| type          | string  | "tween"     | Animation type: "spring", "tween", or "inertia" |
| stiffness     | number  | 100         | Spring animation stiffness                         |
| damping       | number  | 10          | Spring animation damping                           |
| mass          | number  | 1           | Spring animation mass                              |
| bounce        | number  | 0           | Spring animation bounce                            |
| repeat        | number  | 0           | Number of times to repeat animation                |
| repeatType    | string  | "loop"      | Repeat type: "loop", "reverse", "mirror"       |
| scroll        | boolean | false       | Whether to trigger on scroll (vs on load)          |
| y             | number  | 30          | Vertical starting position for animations          |
| x             | number  | 30          | Horizontal starting position for animations        |
| scale         | number  | 0.5         | Starting scale for scale/zoom animations           |
| rotate        | number  | -45         | Starting rotation for rotate animations            |
| filter        | number  | 10          | Starting blur amount for blur animations           |
| customInitial | object  | {}          | Custom initial animation state                     |
| customAnimate | object  | {}          | Custom target animation state                      |

## Advanced Usage Examples

### Spring Physics Animations

```jsx
<motion.div
  {...scaleIn({
    type: "spring",
    stiffness: 200,
    damping: 15,
    mass: 1,
    bounce: 0.5,
    duration: 1.2,
  })}
>
  Springy element
</motion.div>
```

### Looping Animations

```jsx
<motion.div
  {...rotateSpin({
    repeat: Infinity,
    repeatType: "loop",
    duration: 2,
    scroll: false, // Start immediately, not on scroll
  })}
>
  Continuously spinning
</motion.div>
```

### Custom Animation States

```jsx
<motion.div
  {...fadeUp({
    customInitial: { 
      opacity: 0, 
      y: 100,
      backgroundColor: "#ff0000" 
    },
    customAnimate: { 
      opacity: 1, 
      y: 0,
      backgroundColor: "#00ff00" 
    },
    duration: 1.5,
  })}
>
  Custom color transition
</motion.div>
```

### Complex Staggered Layout

```jsx
import { motion } from "motion/react";
import { fadeUpBlur, zoomIn } from "cnippet-aos";

function FeaturesGrid() {
  const features = [
    { title: "Feature 1", icon: "🚀" },
    { title: "Feature 2", icon: "🎨" },
    { title: "Feature 3", icon: "⚡" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="p-6 bg-white rounded-lg shadow-lg"
          {...fadeUpBlur({
            delay: 0.2 + index * 0.1,
            y: 50,
            duration: 0.8,
            scroll: true,
            once: true,
            filter: 8, // Custom blur amount
          })}
          whileHover={{
            scale: 1.05,
            transition: { type: "spring", stiffness: 400 }
          }}
        >
          <motion.div
            className="text-3xl mb-4"
            {...zoomIn({
              delay: 0.4 + index * 0.1,
              scale: 0.5,
              duration: 0.6,
            })}
          >
            {feature.icon}
          </motion.div>
          <h3 className="text-xl font-semibold">{feature.title}</h3>
        </motion.div>
      ))}
    </div>
  );
}
```

### Sequential Animation Chain

```jsx
function HeroSection() {
  return (
    <section className="relative h-full">
      <motion.h1
        {...fadeUpBlur({
          delay: 0.1,
          duration: 1,
          scroll: true,
          y: 80,
          filter: 12,
        })}
      >
        Welcome Here
      </motion.h1>
      
      <motion.p
        {...fadeUp({
          delay: 0.3,
          duration: 0.8,
          scroll: true,
          y: 40,
        })}
      >
        Discover amazing features
      </motion.p>
      
      <motion.div
        {...zoomIn({
          delay: 0.6,
          duration: 0.7,
          scroll: true,
          scale: 0.8,
        })}
      >
        <button>Get Started</button>
      </motion.div>
    </section>
  );
}
```

## Performance Tips

- **Use `once={true}`** for static content that doesn't need re-animation
- **Chain delays** for sequential animations rather than using heavy staggers
- **Use `type: "tween"`** for simple animations and `type: "spring"` for physics-based
- **Set `scroll={false}`** for animations that should trigger on load only
- **Use blur effects sparingly** on low-performance devices
- **Prefer `repeat: 0` (default)** in most cases to avoid unnecessary loops

## Browser Support

Works in all modern browsers that support:

- Intersection Observer API
- CSS transforms, filters, and 3D transforms
- ES6+ features

For older browsers, consider adding polyfills for Intersection Observer.

## License

MIT © Cnippet

Enjoy building beautiful, performant animations! 🚀

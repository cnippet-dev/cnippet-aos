import { Transition, Variants } from "motion/react";
export type AnimationOptions = {
    delay?: number;
    duration?: number;
    ease?: Transition["ease"];
    once?: boolean;
    amount?: number;
    type?: "spring" | "tween" | "inertia";
    stiffness?: number;
    damping?: number;
    mass?: number;
    bounce?: number;
    repeat?: number;
    repeatType?: "loop" | "reverse" | "mirror";
    scroll?: boolean;
    y?: number;
    x?: number;
    scale?: number;
    rotate?: number;
    filter?: number;
    customInitial?: Record<string, unknown>;
    customAnimate?: Record<string, unknown>;
};
declare const fadeIn: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const fadeUp: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const fadeDown: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const fadeLeft: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const fadeRight: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const slideUp: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const slideDown: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const slideLeft: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const slideRight: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const zoomIn: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const zoomOut: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const zoomUp: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const zoomDown: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const zoomLeft: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const zoomRight: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const scaleIn: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const scaleOut: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const scaleBounce: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const scaleElastic: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const rotateIn: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const rotateOut: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const rotateSpin: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const rotateFlip: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const fadeInBlur: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const fadeUpBlur: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const fadeDownBlur: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const fadeLeftBlur: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
declare const fadeRightBlur: (options?: AnimationOptions) => {
    initial: string;
    whileInView: string;
    viewport: {
        once: boolean;
        amount: number;
    };
    variants: Variants;
    animate?: undefined;
} | {
    initial: string;
    animate: string;
    variants: Variants;
    whileInView?: undefined;
    viewport?: undefined;
};
export { fadeIn, fadeUp, fadeDown, fadeLeft, fadeRight, slideUp, slideDown, slideLeft, slideRight, zoomIn, zoomOut, zoomUp, zoomDown, zoomLeft, zoomRight, scaleIn, scaleOut, scaleBounce, scaleElastic, rotateIn, rotateOut, rotateSpin, rotateFlip, fadeInBlur, fadeUpBlur, fadeDownBlur, fadeRightBlur, fadeLeftBlur, };

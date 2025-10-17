const baseTransition = (options) => ({
    delay: options?.delay || 0,
    duration: options?.duration || 0.6,
    ease: options?.ease || "easeOut",
    type: options?.type || "tween",
    stiffness: options?.stiffness || 100,
    damping: options?.damping || 10,
    mass: options?.mass || 1,
    bounce: options?.bounce || 0,
    repeat: options?.repeat || 0,
    repeatType: options?.repeatType || "loop",
});
const createMotionProps = (baseInitial, baseAnimate, options) => {
    const initial = {
        ...baseInitial,
        ...(options?.customInitial || {}),
    };
    const animate = {
        ...baseAnimate,
        ...(options?.customAnimate || {}),
    };
    // Handle filter separately with proper typing
    if (options?.filter !== undefined) {
        initial.filter = `blur(${options.filter}px)`;
        animate.filter = "blur(0px)";
    }
    const transition = baseTransition(options);
    const variants = {
        hidden: initial,
        visible: {
            ...animate,
            transition,
        },
    };
    if (options?.scroll) {
        return {
            initial: "hidden",
            whileInView: "visible",
            viewport: {
                once: options?.once ?? true,
                amount: options?.amount ?? 0.25,
            },
            variants,
        };
    }
    return {
        initial: "hidden",
        animate: "visible",
        variants,
    };
};
// ============================================================================
// FADE ANIMATION
// ============================================================================
const fadeIn = (options) => createMotionProps({ opacity: 0 }, { opacity: 1 }, options);
const fadeUp = (options) => createMotionProps({ opacity: 0, y: options?.y ?? 30 }, { opacity: 1, y: 0 }, options);
const fadeDown = (options) => createMotionProps({ opacity: 0, y: options?.y ?? -30 }, { opacity: 1, y: 0 }, options);
const fadeLeft = (options) => createMotionProps({ opacity: 0, x: options?.x ?? 30 }, { opacity: 1, x: 0 }, options);
const fadeRight = (options) => createMotionProps({ opacity: 0, x: options?.x ?? -30 }, { opacity: 1, x: 0 }, options);
// ============================================================================
// SLIDE ANIMATION
// ============================================================================
const slideUp = (options) => createMotionProps({ y: options?.y ?? 30, opacity: 0 }, { y: 0, opacity: 1 }, options);
const slideDown = (options) => createMotionProps({ y: options?.y ?? -30, opacity: 0 }, { y: 0, opacity: 1 }, options);
const slideLeft = (options) => createMotionProps({ x: options?.x ?? 30, opacity: 0 }, { x: 0, opacity: 1 }, options);
const slideRight = (options) => createMotionProps({ x: options?.x ?? -30, opacity: 0 }, { x: 0, opacity: 1 }, options);
// ============================================================================
// ZOOM ANIMATION
// ============================================================================
const zoomIn = (options) => createMotionProps({ scale: options?.scale ?? 0, opacity: 0 }, { scale: 1, opacity: 1 }, options);
const zoomOut = (options) => createMotionProps({ scale: options?.scale ?? 1.2, opacity: 0 }, { scale: 1, opacity: 1 }, options);
const zoomUp = (options) => createMotionProps({ scale: options?.scale ?? 0.5, opacity: 0 }, { scale: 1, opacity: 1 }, options);
const zoomDown = (options) => createMotionProps({ scale: options?.scale ?? 1.5, opacity: 0 }, { scale: 1, opacity: 1 }, options);
const zoomLeft = (options) => createMotionProps({ scale: options?.scale ?? 0.5, opacity: 0 }, { scale: 1, opacity: 1 }, options);
const zoomRight = (options) => createMotionProps({ scale: options?.scale ?? 1.5, opacity: 0 }, { scale: 1, opacity: 1 }, options);
// ============================================================================
// SCALE ANIMATION
// ============================================================================
const scaleIn = (options) => createMotionProps({ scale: options?.scale ?? 0 }, { scale: 1 }, {
    ...options,
    type: "spring",
    bounce: 0.4,
});
const scaleOut = (options) => createMotionProps({ scale: options?.scale ?? 1.2, opacity: 0 }, { scale: 1, opacity: 1 }, options);
const scaleBounce = (options) => createMotionProps({ scale: options?.scale ?? 0.5, opacity: 0 }, { scale: 1, opacity: 1 }, options);
const scaleElastic = (options) => createMotionProps({ scale: options?.scale ?? 0.5, opacity: 0 }, { scale: 1, opacity: 1 }, options);
// ============================================================================
// ROTATE ANIMATION
// ============================================================================
const rotateIn = (options) => createMotionProps({ rotate: options?.rotate ?? -45, opacity: 0 }, { rotate: 0, opacity: 1 }, options);
const rotateOut = (options) => createMotionProps({ rotate: options?.rotate ?? 0, opacity: 0 }, { rotate: 45, opacity: 1 }, {
    ...options,
    type: "spring",
    bounce: 0.4,
});
const rotateSpin = (options) => createMotionProps({ rotate: options?.rotate ?? 0, opacity: 0 }, { rotate: 360, opacity: 1 }, options);
const rotateFlip = (options) => createMotionProps({ rotate: options?.rotate ?? 0, opacity: 0 }, { rotate: 180, opacity: 1 }, options);
// ============================================================================
// FADE W/ BLUR ANIMATION
// ============================================================================
const fadeInBlur = (options) => createMotionProps({ opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0px)" }, { ...options, filter: options?.filter ?? 10 });
const fadeUpBlur = (options) => createMotionProps({ opacity: 0, y: options?.y ?? 30, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)" }, { ...options, filter: options?.filter ?? 10 });
const fadeDownBlur = (options) => createMotionProps({ opacity: 0, y: options?.y ?? -30, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)" }, { ...options, filter: options?.filter ?? 10 });
const fadeLeftBlur = (options) => createMotionProps({ opacity: 0, x: options?.x ?? 30, filter: "blur(10px)" }, { opacity: 1, x: 0, filter: "blur(0px)" }, { ...options, filter: options?.filter ?? 10 });
const fadeRightBlur = (options) => createMotionProps({ opacity: 0, x: options?.x ?? 30, filter: "blur(10px)" }, { opacity: 1, x: 0, filter: "blur(0px)" }, { ...options, filter: options?.filter ?? 10 });
export { fadeIn, fadeUp, fadeDown, fadeLeft, fadeRight, slideUp, slideDown, slideLeft, slideRight, zoomIn, zoomOut, zoomUp, zoomDown, zoomLeft, zoomRight, scaleIn, scaleOut, scaleBounce, scaleElastic, rotateIn, rotateOut, rotateSpin, rotateFlip, fadeInBlur, fadeUpBlur, fadeDownBlur, fadeRightBlur, fadeLeftBlur, };

import { applyCustomEffect_7 } from "./effect.js";
let lenis;
const initSmoothScrolling = () => {
	// Instantiate the Lenis object with specified properties
	lenis = new Lenis({
		lerp: 0.2, // Lower values create a smoother scroll effect
		smoothWheel: true // Enables smooth scrolling for mouse wheel events
	});

	// Update ScrollTrigger each time the user scrolls
	lenis.on('scroll', () => ScrollTrigger.update());

	// Define a function to run at each animation frame
	const scrollFn = (time) => {
		lenis.raf(time); // Run Lenis' requestAnimationFrame method
		requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
	};
	// Start the animation frame loop
	requestAnimationFrame(scrollFn);
};
await document.fonts.load("100px h19a_lunaluna");
await new Promise(resolve => imagesLoaded(document.querySelector(".poster__inner"), { background: true }, resolve));
initSmoothScrolling();
applyCustomEffect_7(document.querySelector(".content"));

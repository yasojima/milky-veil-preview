# Typography motion

Source: https://github.com/codrops/OnScrollTypographyAnimations/blob/main/src/js/index2.js
Demo: https://tympanus.net/Development/OnScrollTypographyAnimations/index2.html
Selected effect: effect19, visible section .4 INTENSE NATURE.

The character transform, opacity, perspective, ease and .05 stagger are adapted from effect19. Typeface, color and layout are MILKY VEIL specific. Uses the existing vendor GSAP runtime.

Playback and page composition follow the UNIPLEX split hero: its is-out state starts one playback; returning resets it; completion hides the background with is-end. The original absolute background / sticky stage and foreground content spacing are restored. This integration deliberately uses time-based playback instead of Codrops scroll scrubbing.

License: MIT, see LICENSE.

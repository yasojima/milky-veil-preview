# Typography motion

Source: https://github.com/codrops/OnScrollTypographyAnimations/blob/main/src/js/index2.js
Demo: https://tympanus.net/Development/OnScrollTypographyAnimations/index2.html
Selected effect: effect19, visible section .4 INTENSE NATURE.

The transform, opacity, perspective, ease, stagger and scrub parameters are retained in site/concept-typography.js. Uses the existing vendor GSAP/ScrollTrigger runtime without adding Lenis or another scroll owner. Text comes from sharedSalonData.name. Typeface, color and page layout are MILKY VEIL specific.
The reference scroll travel (80% viewport + half the title height) is retained but its start is translated to the split-hero exit. The title stays in a sticky stage while unfolding and leaves through normal page scroll afterward. Initial values are also explicitly set to prevent unstarted stagger targets from reverting to visible during backward scrubbing.
License: MIT, see LICENSE.

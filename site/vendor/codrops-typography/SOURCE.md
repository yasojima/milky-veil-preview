# Typography motion

Source: https://github.com/codrops/OnScrollTypographyAnimations/blob/main/src/js/index2.js
Demo: https://tympanus.net/Development/OnScrollTypographyAnimations/index2.html
Selected effect: effect19, visible section .4 INTENSE NATURE.

The transform, opacity, perspective, ease, duration and scrub parameters are retained. The reference's 13-character stagger (.05 seconds between characters) is normalized to .6 seconds total for other names. Uses the existing vendor GSAP/ScrollTrigger runtime without adding Lenis or another scroll owner. Text comes from sharedSalonData.name. Typeface, color and page layout are MILKY VEIL specific.
The original title trigger and center-bottom / bottom-top-plus-20-percent range are retained. Title placement connects the start to the split-hero exit. The title moves with normal page scroll rather than a sticky stage. Initial values are explicitly set to keep unstarted stagger targets hidden during backward scrubbing.
License: MIT, see LICENSE.

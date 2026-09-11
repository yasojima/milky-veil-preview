# Codrops TextClipScroll integration

Source: https://tympanus.net/Development/TextClipScroll/
Repository: https://github.com/codrops/TextClipScroll
License: LICENSE (MIT); bundled libraries retain their license headers.

The applyCustomEffect_7 function is adapted: scrub is 0.45 seconds and both shadow colors are rgba(111,137,155,0.3). Other motion values remain original. GSAP, ScrollTrigger and img/2.jpg are copied from the original one-row reference under site/roughs/text-clip-original/. Font: assets/fonts/h19a-luna/h19a-luna-webfont.woff2 (original H19A Luna).

site/concept-text-clip.js mounts one row from sharedSalonData.name with the original SVG text layout. site/concept-text-clip.css preserves the original effect dimensions and adds scoped flow spacing for the CONCEPT header and following body. The existing page scroll is used; the standalone demo Lenis scroll manager is deliberately not added to the integrated page. Rotation, easing, stagger, shadow geometry, horizontal travel and ScrollTrigger start/end are unchanged. No reversal or duplication yet.

CHG-131: glyph ink bounds are measured to fit the name in 92% of the stage width, with a small word gap. The clip now arrives at xPercent 0 in 0.55 timeline units, holds until 1.0, and exits to -140 by 1.6. Original letter rotation/scale/easing/stagger are retained. Font layout resets SVG transforms before refresh to prevent stale origin compensation on resize.

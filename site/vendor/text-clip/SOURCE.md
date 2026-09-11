# Codrops TextClipScroll integration

Source: https://tympanus.net/Development/TextClipScroll/
Repository: https://github.com/codrops/TextClipScroll
License: LICENSE (MIT); bundled libraries retain their license headers.

The applyCustomEffect_7 function is adapted: scrub is 0.45 seconds and both shadow colors are rgba(111,137,155,0.3). Other motion values remain original. GSAP, ScrollTrigger and img/2.jpg are copied from the original one-row reference under site/roughs/text-clip-original/. Font: assets/fonts/h19a-luna/h19a-luna-webfont.woff2 (original H19A Luna).

site/concept-text-clip.js mounts one row from sharedSalonData.name with the original SVG text layout. site/concept-text-clip.css preserves the original effect dimensions and adds scoped flow spacing for the CONCEPT header and following body. The existing page scroll is used; the standalone demo Lenis scroll manager is deliberately not added to the integrated page. Rotation, easing, stagger, shadow geometry, horizontal travel and ScrollTrigger start/end are unchanged. No reversal or duplication yet.

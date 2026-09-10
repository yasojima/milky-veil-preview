# Codrops TextClipScroll integration

Source: https://tympanus.net/Development/TextClipScroll/
Repository: https://github.com/codrops/TextClipScroll
License: LICENSE (MIT); bundled libraries retain their license headers.

The original applyCustomEffect_7 function is unchanged except for its module export. GSAP, ScrollTrigger and img/2.jpg are copied from the original one-row reference under site/roughs/text-clip-original/. Font: assets/fonts/h19a-luna/h19a-luna-webfont.woff2 (original H19A Luna).

site/concept-text-clip.js mounts one kelpforests row with the original SVG text layout. site/concept-text-clip.css preserves the original effect dimensions and adds scoped flow spacing for the CONCEPT header and following body. The existing page scroll is used; the standalone demo Lenis scroll manager is deliberately not added to the integrated page. Rotation, easing, stagger, shadow, horizontal travel and ScrollTrigger start/end/scrub values are unchanged. No reversal, brand substitution or duplication yet.

# Codrops TextClipScroll adaptation

Source: https://tympanus.net/Development/TextClipScroll/
Repository: https://github.com/codrops/TextClipScroll
License: LICENSE (MIT); bundled libraries retain their license headers.

Original GSAP, ScrollTrigger and img/2.jpg are retained. The letter fold uses original rotation -45 to 0, scale 0 to 1, expo.inOut, duration .25 and stagger .03. The H19A Luna font and 30vw / 1ch layout remain. Salon name is read from sharedSalonData.

The integrated trajectory is adapted to the split first view: a fixed background plane, measured completed glyph bounds, linear horizontal travel and cubic upward displacement. One scrub .45 progress value drives the trajectory, letter unfolding and shadow. Letters begin at time .2 underneath the hero so the leading glyph is visible when the split reveals it. This is not the original demo's page-flow trajectory. The original standalone comparison remains under site/roughs/text-clip-original/.

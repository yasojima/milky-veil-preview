const applyCustomEffect_7 = (contentElement, layoutLetters) => {
    
    const clipPath = contentElement.querySelectorAll('svg clipPath');
    const poster = contentElement.querySelectorAll('.poster');
    const texts = clipPath[0].querySelectorAll('text');

    gsap.timeline({
        defaults: {
            ease: 'none'
        },
        scrollTrigger: {
            trigger: poster[0],
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.45,
            onRefreshInit: layoutLetters,
            invalidateOnRefresh: true
        }
    })
    .fromTo(contentElement, {
        filter: 'drop-shadow(-100px -20px 5px rgba(111, 137, 155, 0.3))'
    }, {
        duration: 1.6,
        filter: 'drop-shadow(100px 20px 20px rgba(111, 137, 155, 0.3))'
    }, 0)
    .fromTo(clipPath, {
        xPercent: 140
    }, {
        duration: 0.55,
        xPercent: 0
    }, 0)
    .to(clipPath, { duration: 0.6, xPercent: -140 }, 1)
    .fromTo(texts, {
        transformOrigin: '0% 50%',
        rotation: -45,
        scale: 0,
        opacity: 0
    }, {
        duration: 0.25,
        ease: 'expo.inOut',
        stagger: 0.03,
        rotation: 0,
        scale: 1,
        xPercent: 0,
        opacity: 1
    }, 0);

};
export { applyCustomEffect_7 };

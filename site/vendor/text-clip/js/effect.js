const applyCustomEffect_7 = (contentElement) => {
    
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
            scrub: 0.45
        }
    })
    .fromTo(contentElement, {
        filter: 'drop-shadow(-100px -20px 5px rgba(111, 137, 155, 0.3))'
    }, {
        filter: 'drop-shadow(100px 20px 20px rgba(111, 137, 155, 0.3))'
    }, 0)
    .fromTo(clipPath, {
        xPercent: 140
    }, {
        xPercent: -140
    }, 0)
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

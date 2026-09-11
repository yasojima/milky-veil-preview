const applyCustomEffect_7 = (contentElement, trigger) => {
    const clip = contentElement.querySelector('clipPath');
    const texts = [...clip.querySelectorAll('text')];
    const poster = contentElement.querySelector('.poster');
    const travel = { progress: 0 };
    let geometry;
    const letters = gsap.timeline({ paused: true }).fromTo(texts, {
        transformOrigin: '0% 50%', rotation: -45, scale: 0, opacity: 0
    }, {
        duration: 0.25, ease: 'expo.inOut', stagger: 0.03,
        rotation: 0, scale: 1, xPercent: 0, opacity: 1
    });
    const measure = () => {
        const time = letters.time();
        letters.progress(1);
        const width = poster.clientWidth;
        const height = poster.clientHeight;
        const boxes = texts.filter(text => text.textContent.trim()).map(text => text.getBBox());
        const top = Math.min(...boxes.map(box => box.y));
        const bottom = Math.max(...boxes.map(box => box.y + box.height));
        const glyphHeight = bottom - top;
        const headerSpace = width > 767 ? 120 : 96;
        const rowTop = Math.max(headerSpace, Math.min(height * 0.3, height - glyphHeight - 100));
        geometry = {
            startX: width - boxes[0].width * 0.18 - boxes[0].x,
            endX: -Math.max(...boxes.map(box => box.x + box.width)) - width * 0.45,
            startY: rowTop - top,
            lift: rowTop + glyphHeight
        };
        letters.time(time);
    };
    const render = () => {
        const progress = travel.progress;
        gsap.set(clip, {
            x: geometry.startX + (geometry.endX - geometry.startX) * progress,
            y: geometry.startY - geometry.lift * progress ** 3
        });
        letters.time(0.2 + progress * 0.8);
        contentElement.style.filter = `drop-shadow(${ -100 + progress * 200 }px ${ -20 + progress * 40 }px ${ 5 + progress * 15 }px rgba(111,137,155,0.3))`;
    };
    measure();
    gsap.fromTo(travel, { progress: 0 }, {
        progress: 1, ease: 'none', onUpdate: render,
        scrollTrigger: {
            trigger, start: 'bottom top', end: () => `+=${poster.clientHeight * 1.6}`,
            scrub: 0.45, onRefreshInit: measure, onRefresh: render
        }
    });
    render();
};
export { applyCustomEffect_7 };

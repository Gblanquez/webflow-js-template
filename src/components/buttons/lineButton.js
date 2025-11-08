import gsap from 'gsap';

export function lineButton() {
  const links = document.querySelectorAll('.s-link');

  links.forEach(link => {
    const lineLine = link.querySelector('.s-line');
    if (!lineLine) return;

    // Set initial state
    gsap.set(lineLine, { 
      x: "-110%", 
      opacity: 0,
      scaleX: 1,
      transformOrigin: 'left',
    });

    const hoverIn = () => {
      // Reset in case it's midway through something
      gsap.killTweensOf(lineLine);

      gsap.fromTo(lineLine,
        { x: '-110%', opacity: 0, scaleX: 1 },
        { x: '0%', opacity: 1, duration: 1.2, ease: 'expo.out' }
      );
    };

    const hoverOut = () => {
      gsap.killTweensOf(lineLine);

      gsap.to(lineLine, {
        duration: 1.2,
        opacity: 0,
        scaleX: 0,
        transformOrigin: 'right',
        ease: "expo.out",
        onComplete: () => {

          gsap.set(lineLine, { 
            x: "-110%", 
            opacity: 0, 
            scaleX: 1, 
            transformOrigin: 'left' 
          });
        }
      });
    };

    link.addEventListener('mouseenter', hoverIn);
    link.addEventListener('mouseleave', hoverOut);
  });
}

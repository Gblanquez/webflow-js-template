// circleButton.js
import gsap from 'gsap';

export function circleButton() {
  const links = document.querySelectorAll('.p-link');

  links.forEach(link => {
    // Initial setup for second arrow - make it invisible and positioned off-screen
    const arrowEmbSecond = link.querySelector('.arrow_emb.second');
    if (arrowEmbSecond) {
      gsap.set(arrowEmbSecond, { 
        x: "-110%", 
        skewY: 3, 
        opacity: 0 
      });
    }

    const hoverIn = () => {
      gsap.to(link, {
        duration: 0.8,
        scale: 1.1,
        ease: "expo.out"
      });

      // Animate arrow_emb.first - just fade out
      const arrowEmb = link.querySelector('.arrow_emb.first');
      if (arrowEmb) {
        gsap.to(arrowEmb, {
          duration: 1.2,
          opacity: 0,
          ease: "expo.out"
        });
      }

      // Animate arrow_emb.second
      if (arrowEmbSecond) {
        gsap.fromTo(arrowEmbSecond, 
          { x: "-110%", skewY: 3, opacity: 0 },
          {
            duration: 1.2,
            x: "0%",
            skewY: 0,
            opacity: 1,
            ease: "expo.out"
          }
        );

        // Animate the path inside with id: svg-second
        const svgSecond = arrowEmbSecond.querySelector('#svg-second');
        if (svgSecond) {
          const paths = svgSecond.querySelectorAll('path');
          const originalPaths = Array.from(paths).map(p => p.getAttribute('d'));
          
          // Start with collapsed paths
          paths.forEach(p => {
            gsap.set(p, { attr: { d: "M14.9542 12.5 L14.9542 12.5 Z" } });
          });
          
          // Animate them to full shape
          paths.forEach((p, i) => {
            gsap.to(p, {
              duration: 1.5,
              attr: { d: originalPaths[i] },
              ease: "expo.out"
            });
          });
        }
      }
    };

    const hoverOut = () => {
      gsap.to(link, {
        duration: 0.8,
        scale: 1,
        ease: "expo.out"
      });
    };

    link.addEventListener('mouseenter', hoverIn);
    link.addEventListener('mouseleave', hoverOut);
  });
}

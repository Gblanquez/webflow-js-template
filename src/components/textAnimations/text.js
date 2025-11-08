import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";


gsap.registerPlugin(ScrollTrigger, SplitText);


export default function textAnimations() {


  function animateTitles() {
    const titles = document.querySelectorAll('[data-a="title"]');
    if (!titles.length) return;

    titles.forEach((title) => {

      const split = new SplitText(title, {
        
        type: "words, chars",
        linesClass: "lines-mask",
        autoSplit: true,
        mask: 'lines'
    });

      gsap.fromTo(
        split.chars,
        { y: '120%',
          opacity: 0,
          rotateX: 120,
          rotateY: -90,
          rotateZ: 20,
          skewY: 20,
          

        },
        {
          y: '0%',
          opacity: 1,
          rotateX: '0',
          rotateY: 0,
          rotateZ: 0,
          skewY: 0,
          duration: 1.4,
          ease: "power3.out",
          stagger: { each: 0.02, from: 'end'},
          scrollTrigger: {
            trigger: title,
            start: "bottom 98%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });
  }


  function animateText() {
    const titles = document.querySelectorAll('[data-a="text"]');
    if (!titles.length) return;

    titles.forEach((title) => {

      const split = new SplitText(title, {
        
        type: "lines, words",
        linesClass: "lines-mask",
        autoSplit: true,
        mask: 'lines'
    });

      gsap.fromTo(
        split.lines,
        { y: '110%',
        //   opacity: 0,


          

        },
        {
          y: '0%',
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          stagger: { each: 0.02,},
          scrollTrigger: {
            trigger: title,
            start: "bottom bottom",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });
  }


  function animateLabel() {
    const titles = document.querySelectorAll('[data-a="label"]');
    if (!titles.length) return;

    titles.forEach((title) => {

      const split = new SplitText(title, {
        
        type: "words,chars",
        wordsClass: "word-mask",
        autoSplit: true,
        mask: 'chars'
    });

      gsap.fromTo(
        split.chars,
        { x: '110%',
          opacity: 0,


          

        },
        {
          x: '0%',
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
          stagger: { each: 0.05,},
          scrollTrigger: {
            trigger: title,
            start: "bottom bottom",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });
  }


  animateLabel();
  animateText();
  animateTitles();
}

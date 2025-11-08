import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function formAnimations() {
  const fields = document.querySelectorAll(".contact-field");
  const labels = document.querySelectorAll(".contact-label");
  const lines = document.querySelectorAll(".contact-line");
  const checkboxes = document.querySelectorAll(".contact-checkbox");
  const fieldTexts = document.querySelectorAll(".contact-field-text");

  if (!fields.length) return;

  // -------------------------------
  // 1. Handle pressed state
  // -------------------------------
  function handleFieldPress() {
    fields.forEach((field) => {
      const label = field.querySelector(".contact-label");
      if (!label) return;

      // keep the original computed marginBottom so we could revert if needed later
      const computed = window.getComputedStyle(label);
      const originalMarginBottom = computed.marginBottom || "0px";
      const originalDisplay = computed.display || "";

      // Helper that ensures margin animates reliably:
      function prepareLabelForAnimation() {
        // If label is inline, change to inline-block for reliable vertical margins
        if (originalDisplay === "inline") {
          label.style.display = "inline-block";
        }
      }

      // The animation we want: marginBottom -> 0 and opacity -> 0.5
      function pressIn() {
        prepareLabelForAnimation();

        gsap.to(label, {
          marginBottom: "0px",
          // animate a small translate as well to ensure visible movement across browsers/layouts
          y: 0,
          opacity: 0.5,
          duration: 0.28,
          ease: "power2.out",
        });
      }

      // NOTE: you asked to remove blur/reverting — so we DO NOT animate back here.
      // If you ever want to restore the original state (for example on form reset),
      // you can call the restore function below.
      function restore() {
        // restores the original margin and opacity (not used automatically)
        gsap.to(label, {
          marginBottom: originalMarginBottom,
          y: 0,
          opacity: 1,
          duration: 0.28,
          ease: "power2.out",
          onComplete() {
            // put display back if we changed it
            if (originalDisplay === "inline") {
              label.style.display = originalDisplay;
            }
          },
        });
      }

      // Add listeners to the input inside the field; fall back to the field click
      const input = field.querySelector("input, textarea, select");
      if (input) {
        // clicking or focusing the input triggers the pressed animation
        input.addEventListener("focus", pressIn);
        input.addEventListener("click", pressIn);
        // Touch support
        input.addEventListener("touchstart", pressIn, { passive: true });
      } else {
        // If no input found, attach to field click
        field.addEventListener("click", pressIn);
        field.addEventListener("touchstart", pressIn, { passive: true });
      }

      // expose restore on element in case you want to call it externally:
      // e.g. field._restoreLabel = restore;
      field._restoreLabel = restore;
    });
  }

  // -------------------------------
  // Helper for staggered animation
  // -------------------------------
  function staggerAnimate(elements, fromVars, toVars, baseDelay = 0.04) {
    elements.forEach((el, i) => {
      gsap.fromTo(
        el,
        fromVars,
        {
          ...toVars,
          delay: i * baseDelay, // stagger based on index
          scrollTrigger: {
            trigger: el,
            start: "bottom bottom",
            toggleActions: "play none none none",
            once: true, // plays only once
          },
        }
      );
    });
  }

  // -------------------------------
  // 2. Animate fields on scroll
  // -------------------------------
  function animateFieldsOnScroll() {
    staggerAnimate(
      fields,
      { scaleX: 0, transformOrigin: "right center" },
      { scaleX: 1, duration: 1.4, ease: "expo.out" }
    );
  }

  // -------------------------------
  // 3. Animate labels on scroll
  // -------------------------------
  function animateLabelsOnScroll() {
    staggerAnimate(
      labels,
      { opacity: 0, y: "120%" },
      { opacity: 1, y: "0%", duration: 1.6, ease: "expo.out" }
    );
  }

  // -------------------------------
  // 4. Animate lines on scroll
  // -------------------------------
  function animateLinesOnScroll() {
    staggerAnimate(
      lines,
      { scaleX: 0, transformOrigin: "right center" },
      { scaleX: 1, duration: 1.4, ease: "expo.out" }
    );
  }

  // -------------------------------
  // 5. Animate checkboxes on scroll
  // -------------------------------
  function animateCheckboxesOnScroll() {
    staggerAnimate(
      checkboxes,
      { scaleX: 0, transformOrigin: "right center" },
      { scaleX: 1, duration: 1.4, ease: "expo.out" }
    );
  }

  // -------------------------------
  // 6. Animate field text on scroll
  // -------------------------------
  function animateFieldTextOnScroll() {
    staggerAnimate(
      fieldTexts,
      { scaleX: 0, transformOrigin: "right center" },
      { scaleX: 1, duration: 1.4, ease: "expo.out" }
    );
  }

  // Initialize all
  handleFieldPress();
  animateFieldsOnScroll();
  animateLabelsOnScroll();
  animateLinesOnScroll();
  animateCheckboxesOnScroll();
  animateFieldTextOnScroll();
}

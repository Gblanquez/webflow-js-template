import { Renderer } from '@unseenco/taxi';
import globalSceneManager from '../sketch/scene-manager';
import reinitWebflow from '../webflowReinitialization/reinWebflow';
import formAnimations from '../forms/form';
import textAnimations from '../textAnimations/text';
import { circleButton } from '../buttons/circleButton';
import { lineButton } from '../buttons/lineButton';
import { lenis, startRAF, stopRAF } from '../scroll';
import gsap from 'gsap'

export default class contactRender extends Renderer {
  onEnter() {
    console.log('contactRenderEnter')
    // run after the new content has been added to the Taxi container

    
    const container = document.querySelector('.contact-section')

    const tl = gsap.timeline(
      {
        onStart: () => 
          {
            formAnimations();
            textAnimations();
            circleButton();
            lineButton();

            lenis.scrollTo(0, { immediate: true })

            
            
          },
          onComplete: () => 
            {


            }
      })

      tl.from(container,
        {
          opacity: 0,
          delay: 0.2,
          duration: 1,
          ease: 'linear'
        })

    
  }

  onEnterCompleted() {

    startRAF()


     setTimeout(() => {
      
        reinitWebflow();
      }, 300);



  }

  onLeave() {

    stopRAF()
  }

  onLeaveCompleted() {

  }
}

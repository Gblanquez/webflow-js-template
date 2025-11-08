import { Renderer } from '@unseenco/taxi';
import globalSceneManager from '../sketch/scene-manager';
import { circleButton } from '../buttons/circleButton';
import formAnimations from '../forms/form';
import textAnimations from '../textAnimations/text';
import { lineButton } from '../buttons/lineButton';
import { lenis, startRAF, stopRAF } from '../scroll';
import gsap from 'gsap'

export default class homeRender extends Renderer {
  onEnter() {
    console.log('homeRenderEnter')

    const container = document.querySelector('.hero-section')

    const tl = gsap.timeline(
      {
        onStart: () => 
          {

            circleButton();
            lineButton();
            textAnimations();
            formAnimations();

            lenis.scrollTo(0, { immediate: true })


          },
          onComplete: () => 
            {

              
            }
      })

    tl.from(container,
      {
        opacity: 0,
        delay: 0.4,
        duration: 1.1,
        ease: 'linear'
      })




  }

  onEnterCompleted() {

    startRAF()
  
  }

  onLeave() {

    stopRAF()

    
  }

  onLeaveCompleted() {


  }
}

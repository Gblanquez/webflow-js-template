import { Renderer } from '@unseenco/taxi';
import globalSceneManager from '../sketch/scene-manager';
import textAnimations from '../textAnimations/text';
import gsap from 'gsap';


export default class aboutRender extends Renderer {
  onEnter() {
    console.log('aboutRenderEnter')


    const container = document.querySelector('.about-hero')

    const tl = gsap.timeline(
      {
        onStart: () => 
          {
            // globalSceneManager.reset()
            textAnimations();
            
          },
          onComplete: () => 
            {

            }
      })

    tl.from(container,
      {
        opacity: 0,
        delay: 0.1,
        duration: 1.1,
        ease: 'linear'
      })



  }

  onEnterCompleted() {
    



  }

  onLeave() {


  }

  onLeaveCompleted() {


  }
}

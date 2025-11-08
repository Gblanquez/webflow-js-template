import { Renderer } from '@unseenco/taxi';
import globalSceneManager from '../sketch/scene-manager';
import sketchManager from '../sketch/sketch';
import { circleButton } from '../buttons/circleButton';
import formAnimations from '../forms/form';
import textAnimations from '../textAnimations/text';
import { lineButton } from '../buttons/lineButton';
import { lenis, startRAF, stopRAF } from '../scroll';
import gsap from 'gsap'

export default class defaultRender extends Renderer {
    initialLoad() {

        sketchManager.init(document.body);

    
        this.onEnter()
        this.onEnterCompleted()
      }
  onEnter() {
    console.log('defaultRenderEnter')

    const container = this.wrapper.querySelector('[data-a="wrap"]');

    const tl = gsap.timeline(
      {
        onStart: () => 
          {

            // circleButton();
            // lineButton();
            // textAnimations();
            // formAnimations();

          },
          onComplete: () => 
            {


            }
      })

      tl.set(container,
        {
            opacity: 0,
        })
      tl.from(container,
        {
            opacity: 1,
            duration: 0.2,
            onStart: () => 
                {

                },
            onComplete: () => 
                {
           
                }
        })



  }

  onEnterCompleted() {
    
    sketchManager.refreshMeshes();
    sketchManager.meshIn();
    sketchManager.enableDrag();
    startRAF()

  
  }

  onLeave() {


    sketchManager.meshOut()

  
  }

  onLeaveCompleted() {

    // sketchManager.meshOut()

  }
}

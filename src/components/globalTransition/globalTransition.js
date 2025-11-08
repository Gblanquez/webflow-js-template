import { Transition } from '@unseenco/taxi'
import globalSceneManager from '../sketch/scene-manager';
import gsap from 'gsap'
import { CustomEase } from "gsap/CustomEase";
import { lenis, startRAF, stopRAF } from '../scroll';

gsap.registerPlugin(CustomEase);

export default class globalTransition extends Transition {
  /**
   * Handle the transition leaving the previous page.
   * @param { { from: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
   */
  onLeave({ from, trigger, done }) {
    // do something ...
    console.log('globalTransitionLeave')

    const bg = document.querySelector('.bg')
    const overlay = document.querySelector('.overlay')

    const tl = gsap.timeline(
        {
            onComplete: () => 
                {
                    
                    from.remove()

                    gsap.set(from,
                        {
                            position: 'static'
                        })

                },
            onStart: () => 
                {

                    gsap.set(from,
                        {
                            position: 'absolute',
                            width: '100%'
                        })

                        stopRAF()


                }
        })



    tl.to(overlay,
        {
            opacity: 1,
            duration: 1,
            ease: 'expo.out'
        }, 0)    

    tl.to(from,
        {
            y: '-8%',
            duration: 1.1,
            ease: 'sine.inOut',
            
        }, 0.1)



    done()



  }

  /**
   * Handle the transition entering the next page.
   * @param { { to: HTMLElement, trigger: string|HTMLElement|false, done: function } } props
   */
  onEnter({ to, trigger, done }) {
    // do something else ...
    console.log('globalTransitionEnter')

    const bg = document.querySelector('.bg')

    const tl = gsap.timeline(
        {
            onComplete: () => 
                {

                    gsap.set(to,
                        {
                            position: 'static',
                            width: '100%',
                            height: 'auto',
                            zIndex: 'auto'

                        })

                    done()
                    startRAF()


                },

            
            onStart: () => 
                {
                    gsap.set(to,
                        {
                            position: 'fixed',
                            height: '100vh',
                            width: '100%',
                            y: '110%',
                            zIndex: 8
                        })
                }
            
        }
    )



    tl.to(to,
        {
            y: '0%',
            duration: 1.2,
            // ease: CustomEase.create("custom", "M0,0 C0.448,0 -0.168,1 1,1 "),
            ease: CustomEase.create("custom", "M0,0 C0.448,0 0.234,1 1,1 "),
            onComplete: () => 
                {
                    lenis.scrollTo(0, {immediate: true})
                }

        },
    )


  }
}

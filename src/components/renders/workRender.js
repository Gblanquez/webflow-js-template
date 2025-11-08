import { Renderer } from '@unseenco/taxi';
import globalSceneManager from '../sketch/scene-manager';

export default class workRender extends Renderer {
  onEnter() {
    console.log('workRenderEnter')
    // run after the new content has been added to the Taxi container
  }

  onEnterCompleted() {

    // setTimeout(() => {
  
    //   if (!window.sketchManager) {
    //     window.sketchManager = new SketchManager();
    //     window.sketchManager.init(document.body);
    //   } else {
    //     window.sketchManager.refreshMeshes();
    //   }
  
    // }, 100);
  }

  onLeave() {
    // run before the transition.onLeave method is called
    // Clean up existing meshes
    // globalSceneManager.reset()
    // if (window.sketchManager) {
    //   window.sketchManager.cleanup();
    // }
  }

  onLeaveCompleted() {
    // run after the transition.onleave has fully completed
    // globalSceneManager.reset()
  }
}

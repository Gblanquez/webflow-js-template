import { Renderer } from '@unseenco/taxi';
import globalSceneManager from '../sketch/scene-manager';

export default class capabilitiesRender extends Renderer {
  onEnter() {
    console.log('capabilitiesRenderEnter')
    // run after the new content has been added to the Taxi container
  }

  onEnterCompleted() {

  }

  onLeave() {
  

  }

  onLeaveCompleted() {

  }
}

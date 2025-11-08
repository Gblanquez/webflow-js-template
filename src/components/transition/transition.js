import { Core } from '@unseenco/taxi'
import homeRender from '../renders/homeRender'
import aboutRender from '../renders/aboutRender'
import workRender from '../renders/workRender'
import contactRender from '../renders/contactRender'
import globalTransition from '../globalTransition/globalTransition'
import capabilitiesRender from '../renders/capabilitiesRender'
import defaultRender from '../renders/defaultRender'


const taxi = new Core({
	renderers: {
        home: defaultRender,
        about: defaultRender,
        work: defaultRender,
        contact: defaultRender,
        capabilities: defaultRender
	},
	transitions: {
		default: globalTransition,
	},
    removeOldContent: false
    

})



export default taxi
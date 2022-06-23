// import { createApp } from 'vue'
// import App from '../../../App.vue'
//import router from '../../../router'

//import {createVuetify} from 'vuetify'
//import * as components from 'vuetify/components'
//import * as directives from 'vuetify/directives'
import vuetify from 'vuetify'

import { describe, it, expect, beforeAll } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SimulationViolations from '../../grid_operator/SimulationViolations.vue'
import * as API from '@/api'

const data = API.fetchGridOperatorData(new Date(), 0)

//const vuetify = createVuetify({ components, directives })

describe('Tests', () => {
  const wrapper = shallowMount(SimulationViolations, {
    props: {
      violations: []
    },
    global: {
      plugins: [vuetify]
    }
  })

  it('renders properly', () => {
    expect(wrapper.text()).toContain('')
  })

  it('checkViolations Method Test', async () => {
    //no violation
    await wrapper.setProps({ violations: [] })
    expect(wrapper.vm.hasViolations).toBeFalsy()

    // one violation
    await wrapper.setProps({ violations: ['Some Violation'] })
    expect(wrapper.vm.hasViolations).toBeTruthy()

    //more than one violation
    await wrapper.setProps({ violations: ['Some Violation', 'Some Other Violation', 'Another Violation'] })
    expect(wrapper.vm.hasViolations).toBeTruthy()
  })
})

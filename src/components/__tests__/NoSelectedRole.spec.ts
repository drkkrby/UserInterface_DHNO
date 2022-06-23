import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import NoSelectedRole from '@/views/NoSelectedRole.vue'
import vuetify from '@/plugins/vuetify'

function mountHome() {
  return mount(NoSelectedRole, {
    global: {
      plugins: [vuetify]
    }
  })
}

describe('Render', () => {
  it('renders properly', () => {
    const wrapper = mountHome()
    expect(wrapper.text()).toContain('Change view')
    expect(wrapper.text()).toContain('About')
  })
})

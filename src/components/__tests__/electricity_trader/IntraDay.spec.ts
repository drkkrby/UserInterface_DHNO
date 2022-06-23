import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IntraDay from '../../electricity_trader/IntraDay.vue'
import ElectricityProductionVue from '../../graphs/ElectricityProduction.vue'
import ElectricityProductionTableVue from '../../tables/ElectricityProductionTable.vue'

const vuetify = createVuetify({ components, directives })

/**
 * Function mounts intra day
 * @returns wrapper
 */
function mountIntraday() {
  return mount(IntraDay, {
    global: {
      plugins: [vuetify]
    }
  })
}

describe('Rendering', () => {
  const wrapper = mountIntraday()

  it('Component', () => {
    expect(wrapper.isVisible()).toBe(true)
  })

  it('Graph', () => {
    const graph = wrapper.findComponent(ElectricityProductionVue)
    expect(graph.isVisible()).toBe(true)
  })

  it('Table', () => {
    const table = wrapper.findComponent(ElectricityProductionTableVue)
    expect(table.isVisible()).toBe(true)
  })

  it('Feasibility', async () => {
    const btn = wrapper.findAll('button').at(1)
    await btn?.trigger('click')

    wrapper.vm.data.feasible = true
    await wrapper.vm.$forceUpdate()

    const feasibilityAlert = wrapper.findComponent('[data-test="feasible"]')
    expect(feasibilityAlert.isVisible()).toBe(true)
  })

  it('Not feasible', async () => {
    const btn = wrapper.findAll('button').at(1)
    await btn?.trigger('click')

    const data = wrapper.vm.data
    data.feasible = false
    wrapper.setData({ data: data })
    //wrapper.vm.data.feasible = false
    await wrapper.vm.$forceUpdate()

    const feasibilityAlert = wrapper.findComponent('[data-test="notFeasible"]')
    expect(feasibilityAlert.isVisible()).toBe(true)
  })
})

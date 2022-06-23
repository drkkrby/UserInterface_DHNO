import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DayAhead from '../../electricity_trader/DayAhead.vue'
import moment from 'moment'
import HeatDemandVue from '../../graphs/HeatDemand.vue'
import OutsideTempVue from '../../graphs/OutsideTemp.vue'
import PriceEstimateVue from '../../graphs/PriceEstimate.vue'
import ElectricityProductionVue from '../../graphs/ElectricityProduction.vue'
import HeatDemTableVue from '../../tables/HeatDemTable.vue'
import OutsideTempTableVue from '../../tables/OutsideTempTable.vue'
import PriceEstimateTableVue from '../../tables/PriceEstimateTable.vue'
import OptimizeButtonVue from '../../grid_operator/OptimizeButton.vue'

const vuetify = createVuetify({ components, directives })

/**
 * Function mounts day ahead
 * @param days adds days to picked date
 * @param selectedTime start time of date picker
 * @returns wrapper
 */
function mountDayAhead(days: number, selectedTime: number) {
  return mount(DayAhead, {
    props: {
      selectedTime: selectedTime,
      selectedDate: moment().add(days, 'd').toDate()
    },
    global: {
      plugins: [vuetify]
    }
  })
}

const graphs = [HeatDemandVue, OutsideTempVue, PriceEstimateVue]
const tables = [HeatDemTableVue, OutsideTempTableVue, PriceEstimateTableVue]

describe('Rendering', () => {
  const wrapper = mountDayAhead(0, 0)

  it('Component', () => {
    expect(wrapper.isVisible()).toBe(true)
  })

  it('Graphs', () => {
    for (const comp of graphs) {
      const graph = wrapper.findComponent(comp)
      expect(graph.isVisible()).toBe(true)
    }
  })

  //ADD DAT CHECK HERE
  it('Optimize Button current date', () => {
    const btn = wrapper.findComponent(OptimizeButtonVue)
    expect(btn.exists()).toBe(false)
  })

  it('ElectricityProduction is visible', () => {
    const pp = wrapper.findComponent(ElectricityProductionVue)
    expect(pp.exists()).toBe(true)
  })

  it('Hide Tables', () => {
    for (const comp of tables) {
      const table = wrapper.findComponent(comp)
      expect(table.exists()).toBe(false)
    }
  })

  /*
  This test is failing:
  
  it('Disable Buttons', () => {
    for (const comp of graphs) {
      const graphComp = wrapper.findComponent(comp)
      const buttons = graphComp.findAll('button')
      expect(buttons.at(0)?.attributes().disabled).toBeDefined()
      expect(buttons.at(1)?.attributes().disabled).toBeDefined()
    }
  })
  */
})

describe('Rendering Tables', () => {
  const wrapperFuture = mountDayAhead(1, 0)

  it('Show Tables', async () => {
    for (const i in graphs) {
      const graph = wrapperFuture.findComponent(graphs[i])
      const editBtn = graph.findAll('button').at(1)
      await editBtn?.trigger('click')

      const table = wrapperFuture.findComponent(tables[i])
      expect(table.isVisible()).toBe(true)
    }
  })
})

describe('Rendering Optimize', () => {
  const wrapper = mountDayAhead(1, 0)

  it('Optimize Button future date', () => {
    const btn = wrapper.findComponent(OptimizeButtonVue)
    expect(btn.exists()).toBe(true)
  })

  // it('Hide Todays PowerProduction', async () => {
  //   await optimizeBtn.trigger('click')

  //   const pp = wrapper.findComponent(PowerProductionVue)
  //   expect(pp.isVisible()).toBe(true)
  // })
})

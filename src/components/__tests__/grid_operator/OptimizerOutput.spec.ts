import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import moment from 'moment'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OptimizerOutput from '@/components/grid_operator/OptimizerOutput.vue'
import type { ProductionUnitData } from '@/api/datatypes'
import * as Utils from '@/utils'
import * as mockData from '@/api/mockData'
import OutletTempTableVue from '@/components/tables/OutletTempTable.vue'
import OptimizerOutputGraphVue from '@/components/graphs/OptimizerOutputGraph.vue'
import SimulationViolationsVue from '@/components/grid_operator/SimulationViolations.vue'

const vuetify = createVuetify({ components, directives })

/**
 * Function mounts OptimizerOutput
 * @param days adds days to picked date
 * @param selectedTime start time of date picker
 * @returns wrapper
 */
function mountOptimizerOutput(days: number, selectedTime: number) {
  return mount(OptimizerOutput, {
    props: {
      selectedTime: selectedTime,
      selectedDate: moment().add(days, 'd').toDate(),
      selectedDateIsToday: true,
      timeArray: Utils.timeArray(selectedTime),
      productionUnitsData: mockData.gridOperatorTodaysData.productionUnitsData,
      optimizerViolations: mockData.gridOperatorTodaysData.optimizerViolations
    },
    global: {
      plugins: [vuetify]
    }
  })
}

/**
 * Function mounts OptimizerOutput
 * @param days adds days to picked date
 * @param selectedTime start time of date picker
 * @returns wrapper
 */
function mountPastOptimizerOutput(days: number, selectedTime: number) {
  return mount(OptimizerOutput, {
    props: {
      selectedTime: selectedTime,
      selectedDate: moment().add(days, 'd').toDate(),
      selectedDateIsToday: false,
      timeArray: Utils.timeArray(selectedTime),
      productionUnitsData: mockData.gridOperatorPastData.productionUnitsData,
      optimizerViolations: mockData.gridOperatorPastData.optimizerViolations
    },
    global: {
      plugins: [vuetify]
    }
  })
}

describe('Rendering + current day testing', () => {
  const wrapper = mountOptimizerOutput(0, 0)

  it('Component visible', () => {
    expect(wrapper.isVisible()).toBe(true)
  })

  it('Graphs', () => {
    const graphs = wrapper.findAllComponents(OptimizerOutputGraphVue)
    expect(graphs[0].isVisible()).toBe(true)
    expect(graphs[1].isVisible()).toBe(true)
    expect(graphs[2].isVisible()).toBe(true)
    expect(graphs[3].isVisible()).toBe(true)
  })

  it('outlet temp table + tweak solution shows table', async () => {
    const table = wrapper.findComponent(OutletTempTableVue)
    expect(table.exists()).toBe(false)
    const tableView = wrapper.findComponent('button')
    await tableView?.trigger('click')
    const table2 = wrapper.findComponent(OutletTempTableVue)
    expect(table2.exists()).toBe(true)
    expect(table2.isVisible()).toBe(true)
  })

  it('simulate button fires event', async () => {
    const btns = wrapper.findAll('button')
    const simulateBtn = btns[1]
    await simulateBtn.trigger('click')
    expect(wrapper.emitted('simulate-pressed')).toHaveLength(1)
    expect((wrapper.emitted('simulate-pressed') as object[])[0]).toEqual([
      { productionUnitIndex: wrapper.vm.selectedProductionUnit }
    ])
  })

  it('update and reset simulated', () => {
    //deep copy of array
    const sim = Object.assign([], wrapper.vm.outletTemperature.simulated)
    wrapper.vm.updateOutletTemp({ index: 10, value: 30 })
    expect(wrapper.vm.outletTemperature.simulated[10]).toEqual(30)
    wrapper.vm.resetOutletTemperature()
    expect(wrapper.vm.outletTemperature.simulated[10]).toEqual(sim[10])
  })
})

describe('Rendering + past day testing', () => {
  const wrapper = mountPastOptimizerOutput(-1, 0)

  it('Component visible for past date', () => {
    expect(wrapper.isVisible()).toBe(true)
  })

  it('Graphs visible for past date', () => {
    const graphs = wrapper.findAllComponents(OptimizerOutputGraphVue)
    expect(graphs[0].isVisible()).toBe(true)
    expect(graphs[1].isVisible()).toBe(true)
    expect(graphs[2].isVisible()).toBe(true)
    expect(graphs[3].isVisible()).toBe(true)
  })

  it('tweak solution button is disabled and does not show table', async () => {
    const table = wrapper.findComponent(OutletTempTableVue)
    expect(table.exists()).toBe(false)
    const tableView = wrapper.findComponent('button')
    await tableView?.trigger('click')
    const table2 = wrapper.findComponent(OutletTempTableVue)
    expect(table2.exists()).toBe(false)
  })
})

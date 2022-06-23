import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import moment from 'moment'
import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OptimizerInput from '@/components/grid_operator/OptimizerInput.vue'
import type { ProductionUnitData } from '@/api/datatypes'
import * as Utils from '@/utils'
import * as mockData from '@/api/mockData'
import HeatDemTableVue from '@/components/tables/HeatDemTable.vue'
import OutsideTempVue from '@/components/graphs/OutsideTemp.vue'
import HeatDemandVue from '@/components/graphs/HeatDemand.vue'
import OutsideTempTableVue from '@/components/tables/OutsideTempTable.vue'

const vuetify = createVuetify({ components, directives })

/**
 * Function mounts OptimizerInput
 * @param days adds days to picked date
 * @param selectedTime start time of date picker
 * @returns wrapper
 */
function mountOptimizerInput(days: number, selectedTime: number) {
  return mount(OptimizerInput, {
    props: {
      selectedTime: selectedTime,
      selectedDate: moment().add(days, 'd').toDate(),
      readonlyData: false,
      timeArray: Utils.timeArray(selectedTime),
      heatDemandRealization: mockData.gridOperatorTodaysData.heatDemandRealization,
      heatDemandConsumerForecast: mockData.gridOperatorTodaysData.heatDemandConsumerForecast,
      heatDemandTotalForecast: Utils.heatDemandTotalForecast(
        mockData.gridOperatorTodaysData.heatDemandConsumerForecast
      ),
      outsideTempRealization: mockData.gridOperatorTodaysData.outsideTempRealization,
      outsideTempForecast: mockData.gridOperatorTodaysData.outsideTempForecast
    },
    global: {
      plugins: [vuetify]
    }
  })
}

/**
 * Function mounts OptimizerInput
 * @param days adds days to picked date
 * @param selectedTime start time of date picker
 * @returns wrapper
 */
function mountPastOptimizerInput(days: number, selectedTime: number) {
  return mount(OptimizerInput, {
    props: {
      selectedTime: selectedTime,
      selectedDate: moment().add(days, 'd').toDate(),
      readonlyData: false,
      timeArray: Utils.timeArray(selectedTime),
      heatDemandRealization: mockData.gridOperatorPastData.heatDemandRealization,
      heatDemandConsumerForecast: mockData.gridOperatorPastData.heatDemandConsumerForecast,
      heatDemandTotalForecast: Utils.heatDemandTotalForecast(mockData.gridOperatorPastData.heatDemandConsumerForecast),
      outsideTempRealization: mockData.gridOperatorPastData.outsideTempRealization,
      outsideTempForecast: mockData.gridOperatorPastData.outsideTempForecast
    },
    global: {
      plugins: [vuetify]
    }
  })
}

describe('Rendering + current day testing', () => {
  const wrapper = mountOptimizerInput(0, 0)

  test('Component visible', () => {
    expect(wrapper.isVisible()).toBe(true)
  })

  test('Heat Demand Graph', () => {
    const heatDemandGraph = wrapper.findComponent(HeatDemandVue)
    expect(heatDemandGraph.isVisible()).toBe(true)
  })

  test('Outside Temperature Graph', () => {
    const outsideTempGraph = wrapper.findComponent(OutsideTempVue)
    expect(outsideTempGraph.isVisible()).toBe(true)
  })

  test('Heat Demand Table + Table View button shows table', async () => {
    const table = wrapper.findComponent(HeatDemTableVue)
    expect(table.exists()).toBe(false)
    const tableView = wrapper.findComponent('[data-test="Heat Demand Table View"]')
    await tableView?.trigger('click')
    const tableOpened = wrapper.findComponent('[data-test="Heat Demand Table"]')
    expect(tableOpened.exists()).toBe(true)
    expect(tableOpened.isVisible()).toBe(true)
  })

  test('Outside Temperature Table + Table View button shows table', async () => {
    const table = wrapper.findComponent(OutsideTempTableVue)
    expect(table.exists()).toBe(false)
    const tableView = wrapper.findComponent('[data-test="Outside Temperature Table View"]')
    await tableView?.trigger('click')
    const tableOpened = wrapper.findComponent('[data-test="Outside Temperature Table"]')
    expect(tableOpened.exists()).toBe(true)
    expect(tableOpened.isVisible()).toBe(true)
  })
})

describe('Rendering + past day testing', () => {
  const wrapper = mountPastOptimizerInput(-1, 0)

  test('Component visible for past date', () => {
    expect(wrapper.isVisible()).toBe(true)
  })

  test('Heat Demand Graph visible for past date', () => {
    const heatDemandGraph = wrapper.findComponent(HeatDemandVue)
    expect(heatDemandGraph.isVisible()).toBe(true)
  })

  test('Outside Temperature Graph visible for past date', () => {
    const outsideTempGraph = wrapper.findComponent(OutsideTempVue)
    expect(outsideTempGraph.isVisible()).toBe(true)
  })

  test('Table View button is disabled for Heat Demand Graph and does not show table', async () => {
    const table = wrapper.findComponent(HeatDemTableVue)
    expect(table.exists()).toBe(false)
    const tableView = wrapper.findComponent('[data-test="Reset Edits"]')
    await tableView?.trigger('click')
    const tableOpened = wrapper.findComponent(HeatDemTableVue)
    expect(tableOpened.exists()).toBe(false)
  })

  test('Table View button is disabled for Outside Temperature Graph and does not show table', async () => {
    const table = wrapper.findComponent(OutsideTempTableVue)
    expect(table.exists()).toBe(false)
    const tableView = wrapper.findComponent('[data-test="Reset Edits"]')
    await tableView?.trigger('click')
    const tableOpened = wrapper.findComponent(OutsideTempTableVue)
    expect(tableOpened.exists()).toBe(false)
  })
})

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import OutsideTemp from '@/components/graphs/OutsideTemp.vue'
import * as mockData from '@/api/mockData'

const vuetify = createVuetify({ components, directives })

// Keeping this constant as it doesn't change component's state:
const timeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

/**
 * Reusable function to mount the Outside Temperature component and avoid duplicated code
 */
function mountComponent(
  outsideTempRealization: number[] | undefined, //prop has 'required' set to false
  outsideTempForecast: number[],
  readonly: boolean | undefined //prop has 'required' set to false
) {
  return mount(OutsideTemp, {
    props: {
      outsideTempRealization: outsideTempRealization,
      outsideTempForecast: outsideTempForecast,
      timeArray: timeArray,
      readonly: readonly
    },
    global: {
      plugins: [vuetify],
      stubs: {
        LineChart: true //stub the lineChart component as it is not tested here
      }
    }
  })
}

describe('Test suite for the current date', () => {
  // Mocked data for today (current date):
  const data = mockData.gridOperatorTodaysData

  test('the page renders properly', () => {
    const wrapper = mountComponent(data.outsideTempRealization, data.outsideTempForecast, false)

    // The wrapper exists and it's visible:
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.isVisible()).toBe(true)
  })

  test('the buttons are rendered', () => {
    const wrapper = mountComponent(data.outsideTempRealization, data.outsideTempForecast, false)

    const buttons = wrapper.findAllComponents({ name: 'v-btn' })

    // 2 buttons are rendered: "Reset edits" and "Table View"
    expect(buttons.length).toBe(2)

    expect(buttons[0].text()).toBe('Reset Edits')
    expect(buttons[0].props('disabled')).toBe(false) // button is not disabled

    expect(buttons[1].text()).toBe('Table View')
    expect(buttons[1].props('disabled')).toBe(false) // button is not disabled
  })

  test('Reset Edits button pressed', () => {
    const wrapper = mountComponent(data.outsideTempRealization, data.outsideTempForecast, false)

    // Reset outside temperature button:
    const resetButton = wrapper.findComponent('[data-test="Reset Edits"]')
    resetButton.trigger('click')

    // button emits the correct event:
    expect(wrapper.emitted()).toHaveProperty('reset-outside-temperature')
  })

  test('Table View button pressed', () => {
    const wrapper = mountComponent(data.outsideTempRealization, data.outsideTempForecast, false)

    // Table View outside temperature button:
    const tableViewButton = wrapper.findComponent('[data-test="Outside Temperature Table View"]')
    tableViewButton.trigger('click')

    // button emits the correct event:
    expect(wrapper.emitted()).toHaveProperty('table-view-outside-temp')
  })

  test('LineChart Component has the correct props passed', () => {
    const wrapper = mountComponent(data.outsideTempRealization, data.outsideTempForecast, false)

    // Computed property plotDataSets:
    const chartDataSets = wrapper.vm.plotDataSets
    //Chart component:
    const chart = wrapper.findComponent({ name: 'LineChart' })

    // Check that chart component has the right properties passed:
    expect(chart.exists()).toBe(true)
    expect(chart.props('title')).toBe('Outside Temperature')
    expect(chart.props('x_title')).toBe('Time (hour)')
    expect(chart.props('y_title')).toBe('Temperature (°C)')
    expect(chart.props('labels')).toBe(timeArray)
    expect(chart.props('datasets')).toBe(chartDataSets)
  })
})

describe('Test suite for a past date', () => {
  // Mocked data for a past date:
  const data = mockData.gridOperatorPastData

  test('the page renders properly', () => {
    // selectedDateIsToday is set to false:
    const wrapper = mountComponent(data.outsideTempRealization, data.outsideTempForecast, false)

    // The wrapper exists and it's visible:
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.isVisible()).toBe(true)
  })

  test('the buttons are rendered', () => {
    // selectedDateIsToday is set to false:
    const wrapper = mountComponent(data.outsideTempRealization, data.outsideTempForecast, true)

    const buttons = wrapper.findAllComponents({ name: 'v-btn' })

    // 2 buttons are rendered: "Reset edits" and "Edit"
    expect(buttons.length).toBe(2)

    expect(buttons[0].text()).toBe('Reset Edits')
    expect(buttons[0].props('disabled')).toBe(true) // button is disabled because it's not the current date

    expect(buttons[1].text()).toBe('Table View')
    expect(buttons[1].props('disabled')).toBe(true) // button is disabled because it's not the current date
  })

  test('Reset Edits button pressed', () => {
    // selectedDateIsToday is set to false:
    const wrapper = mountComponent(data.outsideTempRealization, data.outsideTempForecast, true)

    // Reset outside temperature button:
    const resetButton = wrapper.findComponent('[data-test="Reset Edits"]')
    resetButton.trigger('click')

    // button doesn't emit any event because it's disabled:
    expect(wrapper.emitted()).not.toHaveProperty('reset-outside-temperature')
  })

  test('Table View button pressed', () => {
    // selectedDateIsToday is set to false:
    const wrapper = mountComponent(data.outsideTempRealization, data.outsideTempForecast, true)

    // Edit outside temperature button:
    const tableViewButton = wrapper.findComponent('[data-test="Outside Temperature Table View"]')
    tableViewButton.trigger('click')

    // button doesn't emit any event because it's disabled:
    expect(wrapper.emitted()).not.toHaveProperty('table-view-outside-temp')
  })

  test('LineChart Component has the correct props passed', () => {
    // selectedDateIsToday is set to false:
    const wrapper = mountComponent(data.outsideTempRealization, data.outsideTempForecast, false)

    // Computed property plotDataSets:
    const chartDataSets = wrapper.vm.plotDataSets
    //Chart component:
    const chart = wrapper.findComponent({ name: 'LineChart' })

    // Check that chart component has the right properties passed:
    expect(chart.exists()).toBe(true)
    expect(chart.props('title')).toBe('Outside Temperature')
    expect(chart.props('x_title')).toBe('Time (hour)')
    expect(chart.props('y_title')).toBe('Temperature (°C)')
    expect(chart.props('labels')).toBe(timeArray)
    expect(chart.props('datasets')).toBe(chartDataSets)
  })
})

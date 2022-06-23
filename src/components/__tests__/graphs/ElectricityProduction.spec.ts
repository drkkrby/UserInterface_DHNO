import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import ElectricityProduction from '@/components/graphs/ElectricityProduction.vue'
import * as mockData from '@/api/mockData'

const vuetify = createVuetify({ components, directives })

// Keeping this constant as it doesn't change component's state:
const timeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

/**
 * Reusable function to mount the Electricity Production component and avoid duplicated code
 */
function mountComponent(
  electricityProduction: number[],
  dataVisible: boolean,
  readonly: boolean | undefined //prop has 'required' set to false
) {
  return mount(ElectricityProduction, {
    props: {
      electricityProduction: electricityProduction,
      timeArray: timeArray,
      dataVisible: dataVisible,
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
  const data = mockData.intraDayData

  test('the page renders properly', () => {
    const wrapper = mountComponent(data.electricityProduction, true, false)

    // The wrapper exists and it's visible:
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.isVisible()).toBe(true)
  })

  test('LineChart Component has the correct props passed', () => {
    const wrapper = mountComponent(data.electricityProduction, true, false)

    // Computed property outputDataSets:
    const chartDataSets = wrapper.vm.outputDataSets
    //Chart component:
    const chart = wrapper.findComponent({ name: 'LineChart' })

    // Check that chart component has the right properties passed:
    expect(chart.exists()).toBe(true)
    expect(chart.props('title')).toBe('Electricity Production')
    expect(chart.props('x_title')).toBe('Time (hour)')
    expect(chart.props('y_title')).toBe('Megawatts (MW)')
    expect(chart.props('labels')).toBe(timeArray)
    expect(chart.props('datasets')).toBe(chartDataSets)
  })
})

describe('Test suite for a past date', () => {
  // Mocked data for a past date:
  const data = mockData.electricityTraderPastData

  test('the page renders properly', () => {
    // selectedDateIsToday is set to false:
    const wrapper = mountComponent(data.electricityProduction, true, false)

    // The wrapper exists and it's visible:
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.isVisible()).toBe(true)
  })

  test('LineChart Component has the correct props passed', () => {
    // selectedDateIsToday is set to false:
    const wrapper = mountComponent(data.electricityProduction, true, false)

    // Computed property outputDataSets:
    const chartDataSets = wrapper.vm.outputDataSets
    //Chart component:
    const chart = wrapper.findComponent({ name: 'LineChart' })

    // Check that chart component has the right properties passed:
    expect(chart.exists()).toBe(true)
    expect(chart.props('title')).toBe('Electricity Production')
    expect(chart.props('x_title')).toBe('Time (hour)')
    expect(chart.props('y_title')).toBe('Megawatts (MW)')
    expect(chart.props('labels')).toBe(timeArray)
    expect(chart.props('datasets')).toBe(chartDataSets)
  })
})

describe('Test suite for a current date in the DayAhead', () => {
  // Mocked data for a past date:
  const data = mockData.electricityTraderFutureData

  test('the page renders properly', () => {
    // selectedDateIsToday is set to false:
    const wrapper = mountComponent(data.electricityProduction, false, false)

    // The wrapper exists and it's visible:
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.isVisible()).toBe(true)
  })

  test('LineChart Component has the correct props passed', () => {
    // selectedDateIsToday is set to false:
    const wrapper = mountComponent(data.electricityProduction, true, false)

    // Computed property outputDataSets:
    const chartDataSets = wrapper.vm.outputDataSets
    //Chart component:
    const chart = wrapper.findComponent({ name: 'LineChart' })

    // Check that chart component has the right properties passed:
    expect(chart.exists()).toBe(true)
    expect(chart.props('title')).toBe('Electricity Production')
    expect(chart.props('x_title')).toBe('Time (hour)')
    expect(chart.props('y_title')).toBe('Megawatts (MW)')
    expect(chart.props('labels')).toBe(timeArray)
    expect(chart.props('datasets')).toBe(chartDataSets)
  })
})

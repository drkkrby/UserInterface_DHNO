import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import LineChart from '@/components/graphs/LineChart.vue'
import type { ChartDataset, ScatterDataPoint } from 'chart.js'

const vuetify = createVuetify({ components, directives })

const someArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Array with only one dataset
const datasets: ChartDataset<'line', (number | ScatterDataPoint | null)[]>[] = [
  {
    label: 'Price',
    backgroundColor: 'red',
    borderColor: 'red',
    data: JSON.parse(JSON.stringify(someArray))
  }
]

/**
 * Mounts the lineChart component.
 */
function mountComponent() {
  return mount(LineChart, {
    props: {
      title: 'Some chart',
      x_title: 'X-values',
      y_title: 'Y-values',
      labels: [...someArray],
      datasets: datasets
    },
    global: {
      plugins: [vuetify],
      stubs: {
        Line: true //stub the chart js Line component
      }
    }
  })
}

describe('Test suite', () => {
  const wrapper = mountComponent()
  const lineWrapper = wrapper.findComponent({ name: 'Line' })

  test('Rendering the component', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.isVisible()).toBe(true)
  })

  test('Props were correctly passed', () => {
    expect(wrapper.props('title')).toBe('Some chart')
    expect(wrapper.props('x_title')).toBe('X-values')
    expect(wrapper.props('y_title')).toBe('Y-values')
    expect(wrapper.props('labels')).toStrictEqual(someArray)
    expect(wrapper.props('datasets')).toBe(datasets)

    expect(wrapper.vm.datasets).toStrictEqual(datasets)
  })

  test('Rendering chart js "Line" library component', () => {
    expect(lineWrapper.isVisible()).toBe(true)
    expect(lineWrapper.isVisible()).toBe(true)
  })

  test('Line component has the correct data (labels + datasets) passed to it', () => {
    const chartDataProp = lineWrapper.props('chartData')

    expect(chartDataProp.labels).toStrictEqual(someArray)
    expect(chartDataProp.datasets).toStrictEqual(datasets)
  })
})

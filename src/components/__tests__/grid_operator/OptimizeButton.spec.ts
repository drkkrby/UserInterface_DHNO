import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { nextTick } from 'vue'
import { flushPromises, mount, shallowMount } from '@vue/test-utils'

import { describe, it, expect, beforeAll } from 'vitest'
import OptimizeButton from '../../grid_operator/OptimizeButton.vue'
import * as API from '@/api'

const vuetify = createVuetify({ components, directives })
async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms))
}
/**
 * Function mounts OptimizeButton
 * @returns wrapper
 */
function shallowMountOptimizeButton(fetchResults: () => void) {
  return shallowMount(OptimizeButton, {
    props: {
      fetchResults: fetchResults
    },
    global: {
      plugins: [vuetify]
    }
  })
}

function mountOptimizeButton(fetchResults: () => void) {
  return mount(OptimizeButton, {
    props: {
      fetchResults: fetchResults
    },
    global: {
      plugins: [vuetify]
    }
  })
}
describe('method testing and data testing', () => {
  const wrapper = shallowMountOptimizeButton(() => ({
    get: Promise.resolve('value')
  }))
  it('text initializes properly', () => {
    expect(wrapper.vm.timer).toEqual('')
  })
  it('optimizationCancelled initializes properly', () => {
    expect(wrapper.vm.optimizationCancelled).toBe(false)
  })
  it('color initializes properly', () => {
    expect(wrapper.vm.optimizeColor).toEqual('green')
  })
  it('optimizerIsRunning initializes properly', () => {
    expect(wrapper.vm.optimizerIsRunning).toBe(false)
  })

  it('optimizerPressed method test', async () => {
    wrapper.vm.optimizePressed(1)
    expect(wrapper.vm.timer).toEqual('Optimizer running: 0 seconds...')
    expect(wrapper.vm.optimizeColor).toEqual('grey')
    expect(wrapper.vm.optimizerIsRunning).toBe(true)
    await delay(1100)
    expect(wrapper.vm.timer).toEqual('Optimization complete')
    expect(wrapper.vm.optimizeColor).toEqual('green')
    expect(wrapper.vm.optimizerIsRunning).toBe(false)
  })
  it('optimizerCancelled while optimizer is running', async () => {
    wrapper.vm.optimizePressed(5)
    await delay(900)
    expect(wrapper.vm.timer).toEqual('Optimizer running: 0 seconds...')
    expect(wrapper.vm.optimizeColor).toEqual('grey')
    expect(wrapper.vm.optimizerIsRunning).toBe(true)
    wrapper.vm.cancelOptimization()
    expect(wrapper.vm.optimizationCancelled).toBe(true)
    await delay(150)
    expect(wrapper.vm.timer).toEqual('Optimization cancelled')
    expect(wrapper.vm.optimizerIsRunning).toBe(false)
    expect(wrapper.vm.optimizeColor).toEqual('green')
    expect(wrapper.vm.optimizationCancelled).toBe(false)
  })
})

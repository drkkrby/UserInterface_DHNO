// import { createApp } from 'vue'
// import App from '../../../App.vue'
//import router from '../../../router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import vuetify from 'vuetify'

import { describe, it, expect, beforeAll, Vitest, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import ElectricityProductionTable from '../../tables/ElectricityProductionTable.vue'
import * as API from '@/api'

const data = API.fetchGridOperatorData(new Date(), 0)
const vuetify = createVuetify({ components, directives })

// Plan of the document
/*
-Helper Methods
-Method testing
-Table elements testing
*/
function shallowMountWrap() {
  return shallowMount(ElectricityProductionTable, {
    props: {
      electricityPlan: [
        // production across 15 min intervals
        91, 88, 90, 93, 72, 74, 79, 75, 44, 42, 38, 36, 39, 42, 44, 43, 41, 40, 41, 40, 45, 48, 51, 55, 42, 40, 38, 32,
        40, 45, 50, 57, 58, 59, 59, 54, 50, 49, 48, 43, 49, 53, 52, 58, 53, 47, 49, 46, 40, 38, 35, 38, 43, 50, 56, 54,
        46, 43, 41, 46, 48, 59, 50, 53, 52, 55, 51, 56, 49, 44, 46, 41, 42, 45, 44, 48, 28, 23, 18, 13, 26, 31, 36, 38,
        44, 50, 56, 52, 45, 34, 39, 34, 31, 28, 29, 25
      ],
      timeArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    global: {
      plugins: [vuetify]
    }
  })
}

function mountWrap() {
  return mount(ElectricityProductionTable, {
    props: {
      electricityPlan: [
        // production across 15 min intervals
        91, 88, 90, 93, 72, 74, 79, 75, 44, 42, 38, 36, 39, 42, 44, 43, 41, 40, 41, 40, 45, 48, 51, 55, 42, 40, 38, 32,
        40, 45, 50, 57, 58, 59, 59, 54, 50, 49, 48, 43, 49, 53, 52, 58, 53, 47, 49, 46, 40, 38, 35, 38, 43, 50, 56, 54,
        46, 43, 41, 46, 48, 59, 50, 53, 52, 55, 51, 56, 49, 44, 46, 41, 42, 45, 44, 48, 28, 23, 18, 13, 26, 31, 36, 38,
        44, 50, 56, 52, 45, 34, 39, 34, 31, 28, 29, 25
      ],
      timeArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    global: {
      plugins: [vuetify]
    }
  })
}

//METHOD TESTS
//Changed Method test
describe('Changed Method Tests', () => {
  const wrapper = shallowMountWrap()

  it('renders properly', () => {
    expect(wrapper.text()).toContain('')
  })

  //running the method one time
  it('Changed Method Test (one time)', () => {
    wrapper.vm.changed('2', 1)
    expect(wrapper.emitted('changed-electricity-production')).toHaveLength(1)
    expect((wrapper.emitted('changed-electricity-production') as object[])[0]).toEqual([{ index: 1, value: 2 }])
  })
  //running the method -in total- three times
  it('Changed Method Test Multiple (multiple times)', () => {
    wrapper.vm.changed('2', 1)
    wrapper.vm.changed('4', 3)

    expect(wrapper.emitted('changed-electricity-production')).toHaveLength(3)
    expect((wrapper.emitted('changed-electricity-production') as object[])[1]).toEqual([{ index: 1, value: 2 }])
    expect((wrapper.emitted('changed-electricity-production') as object[])[2]).toEqual([{ index: 3, value: 4 }])
  })

  it('Reset Edits Method Test', () => {
    wrapper.vm.resetEdits()
    expect(wrapper.emitted('reset-electricity-production')).toHaveLength(1)
  })

  it('Check Feasibility Method Test', () => {
    wrapper.vm.checkFeasibility()
    expect(wrapper.emitted('check-feasibility')).toHaveLength(1)
  })
})

// TABLE ELEMENT TESTS
// Table Element Tests for the Table
describe('Table Element Tests', async () => {
  //general arrangement for the test
  const wrapper = mountWrap()
  const table = wrapper.find('table')
  expect(table.exists()).toBe(true)

  const tableRows = table.findAll('tr')
  expect(tableRows[0].exists()).toBe(true)

  //check whether the time is displayed correctly
  it('Check Time Displayed', () => {
    //general arrangement for the time
    const columns = tableRows[0].findAll('th')
    expect(columns[0].exists()).toBe(true)
    expect(columns.length).toEqual(25)

    //the test
    for (let i = 0; i <= 23; i++) {
      expect(columns[i + 1].text()).toEqual('' + i)
    }
  })

  //check whether the projection (the forecast) is displayed correctly
  // AND check whether the event handling happens correctly
  it('Check Projection', async () => {
    //general arrangement for the test
    const totalInputs = [
      tableRows[1].findAll('input'),
      tableRows[2].findAll('input'),
      tableRows[3].findAll('input'),
      tableRows[4].findAll('input')
    ]

    const powerPlanArray = [
      // production across 15 min intervals
      91, 88, 90, 93, 72, 74, 79, 75, 44, 42, 38, 36, 39, 42, 44, 43, 41, 40, 41, 40, 45, 48, 51, 55, 42, 40, 38, 32,
      40, 45, 50, 57, 58, 59, 59, 54, 50, 49, 48, 43, 49, 53, 52, 58, 53, 47, 49, 46, 40, 38, 35, 38, 43, 50, 56, 54,
      46, 43, 41, 46, 48, 59, 50, 53, 52, 55, 51, 56, 49, 44, 46, 41, 42, 45, 44, 48, 28, 23, 18, 13, 26, 31, 36, 38,
      44, 50, 56, 52, 45, 34, 39, 34, 31, 28, 29, 25
    ]

    let walker = 0

    for (let column = 0; column <= 23; column++) {
      for (let row = 0; row <= 3; row++) {
        expect(totalInputs[row][column].element.value).toEqual(powerPlanArray[walker].toString())
        walker++
      }
    }
  })
})

describe('ResetEdit Button Test', async () => {
  //general arrangement for the test
  const wrapper = mountWrap()
  const buttons = wrapper.findAllComponents('.v-btn')

  it('Reset Button Test', () => {
    expect(buttons[0].exists()).toBe(true)
    buttons[0].trigger('click')

    //the test
    expect(wrapper.emitted('reset-electricity-production')).toHaveLength(1)
  })

  it('Check Feasibility Button Test', () => {
    expect(buttons[1].exists()).toBe(true)
    buttons[1].trigger('click')

    //the tests
    expect(wrapper.emitted('check-feasibility')).toHaveLength(1)
  })
})

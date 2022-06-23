// import { createApp } from 'vue'
// import App from '../../../App.vue'
//import router from '../../../router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import vuetify from 'vuetify'

import { describe, it, expect, beforeAll, Vitest, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import OutletTempTable from '../../tables/OutletTempTable.vue'
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
  return shallowMount(OutletTempTable, {
    props: {
      outtemp: {
        optimal: [73, 73, 78, 72, 79, 78, 74, 75, 76, 75, 77, 76, 75, 79, 78, 78, 77, 76, 79, 77, 76, 75, 86, 70],
        realization: [74, 87, 82, 87, 84, 84, 88, 88, 87, 86, 90],
        simulated: [74, 67, 68, 67, 71, 69, 71, 67, 70, 71, 72, 79, 73, 75, 74, 68, 84, 70, 85, 79, 70, 74, 79, 71]
      },
      timeArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    global: {
      plugins: [vuetify]
    }
  })
}

function mountWrap() {
  return mount(OutletTempTable, {
    props: {
      outtemp: {
        optimal: [73, 73, 78, 72, 79, 78, 74, 75, 76, 75, 77, 76, 75, 79, 78, 78, 77, 76, 79, 77, 76, 75, 86, 70],
        realization: [74, 87, 82, 87, 84, 84, 88, 88, 87, 86, 90],
        simulated: [74, 67, 68, 67, 71, 69, 71, 67, 70, 71, 72, 79, 73, 75, 74, 68, 84, 70, 85, 79, 70, 74, 79, 71]
      },
      timeArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    global: {
      plugins: [vuetify]
    }
  })
}

//METHOD TESTS
//Changed Method test
describe('Changed Method and Reset Method Tests', () => {
  const wrapper = shallowMountWrap()

  it('renders properly', () => {
    expect(wrapper.text()).toContain('')
  })

  //running the method one time
  it('Changed Method Test (one time)', () => {
    wrapper.vm.changed('2', 1)
    expect(wrapper.emitted('changed-outlet-temperature')).toHaveLength(1)
    expect((wrapper.emitted('changed-outlet-temperature') as object[])[0]).toEqual([{ index: 0, value: 2 }])
  })
  //running the method -in total- three times
  it('Changed Method Test Multiple (multiple times)', () => {
    wrapper.vm.changed('2', 1)
    wrapper.vm.changed('4', 3)

    expect(wrapper.emitted('changed-outlet-temperature')).toHaveLength(3)
    expect((wrapper.emitted('changed-outlet-temperature') as object[])[1]).toEqual([{ index: 0, value: 2 }])
    expect((wrapper.emitted('changed-outlet-temperature') as object[])[2]).toEqual([{ index: 2, value: 4 }])
  })

  //running the method -in total- three times
  it('Reset Edits Method Test', () => {
    wrapper.vm.resetEdits()
    expect(wrapper.emitted('reset-outlet-temperature')).toHaveLength(1)
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
    expect(columns.length).toEqual(24)

    //the test
    for (let i = 0; i <= 23; i++) {
      expect(columns[i].text()).toEqual('' + i)
    }
  })
  //check whether the simulated is displayed correctly
  // AND check whether the event handling happens correctly
  it('Check Projection', async () => {
    //general arrangement for the test
    const inputs = tableRows[3].findAll('input')
    const simulatedArray = [
      74, 67, 68, 67, 71, 69, 71, 67, 70, 71, 72, 79, 73, 75, 74, 68, 84, 70, 85, 79, 70, 74, 79, 71
    ]

    //the test
    for (let i = 0; i <= 23; i++) {
      //   console.log("i="+i);
      expect(inputs[i].element.value).toEqual(simulatedArray[i].toString())

      //change event emit check
      inputs[i].setValue('2')
      expect(wrapper.emitted('changed-outlet-temperature')[i]).toEqual([{ index: i, value: 2 }])
    }
  })

  //check whether the realization and optimal are displayed correctly
  it('Check Realization', async () => {
    //general arrangement for the test
    const realizationValues = tableRows[2].findAll('td')
    const optimalValues = tableRows[1].findAll('td')

    const optimalArray = [
      73, 73, 78, 72, 79, 78, 74, 75, 76, 75, 77, 76, 75, 79, 78, 78, 77, 76, 79, 77, 76, 75, 86, 70
    ]
    const realizationArray = [74, 87, 82, 87, 84, 84, 88, 88, 87, 86, 90]

    //the test for realization
    for (let i = 0; i < realizationArray.length; i++) {
      expect(realizationValues[i].text()).toEqual(realizationArray[i].toString())
    }

    //the test for optimal
    for (let i = 0; i < optimalValues.length; i++) {
      expect(optimalValues[i].text()).toEqual(optimalArray[i].toString())
    }
  })
})

describe('ResetEdit Button Test', async () => {
  //general arrangement for the test
  const wrapper = mountWrap()
  it('Reset Button Test', () => {
    const resetButton = wrapper.findComponent('.v-btn')
    expect(resetButton.exists()).toBe(true)
    resetButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('reset-outlet-temperature')
  })
})

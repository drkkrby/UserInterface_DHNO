// import { createApp } from 'vue'
// import App from '../../../App.vue'
//import router from '../../../router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import vuetify from 'vuetify'

import { describe, it, expect, beforeAll, Vitest, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import OutsideTempTable from '../../tables/OutsideTempTable.vue'
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
  return shallowMount(OutsideTempTable, {
    props: {
      outsideTempRealization: [10, 11, 12, 12, 12, 13, 14, 14, 13, 13, 13],
      outsideTempForecast: [10, 11, 12, 12, 12, 13, 14, 14, 13, 13, 13, 14, 13, 12, 12, 11, 9, 9, 9, 8, 8, 9, 9, 10],
      timeArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    global: {
      plugins: [vuetify]
    }
  })
}

function mountWrap() {
  return mount(OutsideTempTable, {
    props: {
      outsideTempRealization: [10, 11, 12, 12, 12, 13, 14, 14, 13, 13, 13],
      outsideTempForecast: [10, 11, 12, 12, 12, 13, 14, 14, 13, 13, 13, 14, 13, 12, 12, 11, 9, 9, 9, 8, 8, 9, 9, 10],
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
    expect(wrapper.emitted('changed-outside-temperature')).toHaveLength(1)
    expect((wrapper.emitted('changed-outside-temperature') as object[])[0]).toEqual([{ index: 0, value: 2 }])
  })
  //running the method -in total- three times
  it('Changed Method Test Multiple (multiple times)', () => {
    wrapper.vm.changed('2', 1)
    wrapper.vm.changed('4', 3)

    expect(wrapper.emitted('changed-outside-temperature')).toHaveLength(3)
    expect((wrapper.emitted('changed-outside-temperature') as object[])[1]).toEqual([{ index: 0, value: 2 }])
    expect((wrapper.emitted('changed-outside-temperature') as object[])[2]).toEqual([{ index: 2, value: 4 }])
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
  //check whether the projection (the forecast) is displayed correctly
  // AND check whether the event handling happens correctly
  it('Check Projection', async () => {
    //general arrangement for the test
    const inputs = tableRows[1].findAll('input')
    const forecastArray = [10, 11, 12, 12, 12, 13, 14, 14, 13, 13, 13, 14, 13, 12, 12, 11, 9, 9, 9, 8, 8, 9, 9, 10]

    //the test
    for (let i = 0; i <= 23; i++) {
      //   console.log("i="+i);
      expect(inputs[i].element.value).toEqual(forecastArray[i].toString())

      //change event emit check
      inputs[i].setValue('2')
      expect(wrapper.emitted('changed-outside-temperature')[i]).toEqual([{ index: i, value: 2 }])
    }
  })

  //check whether the realization is displayed correctly
  it('Check Realization', async () => {
    //general arrangement for the test
    const realizationValues = tableRows[2].findAll('td')
    const outsideTempRealization = [10, 11, 12, 12, 12, 13, 14, 14, 13, 13, 13]

    //the test
    for (let i = 0; i < outsideTempRealization.length; i++) {
      //   console.log("i="+i);
      expect(realizationValues[i].text()).toEqual(outsideTempRealization[i].toString())
    }
  })
})

// import { createApp } from 'vue'
// import App from '../../../App.vue'
//import router from '../../../router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import vuetify from 'vuetify'

import { describe, it, expect, beforeAll, Vitest, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import HeatDemTable from '../../tables/HeatDemTable.vue'
import * as API from '@/api'

const data = API.fetchGridOperatorData(new Date(), 0)
const vuetify = createVuetify({ components, directives })

// Plan of the document
/*
-Helper Methods
-Method testing
-Table elements testing
*/
function shallowMountWrapOne() {
  return shallowMount(HeatDemTable, {
    props: {
      heatDemandForecast: {
        Industrial: [68, 62, 95, 94, 52, 36, 29, 61, 54, 34, 99, 98, 47, 31, 80, 12, 10, 71, 67, 11, 46, 33, 13, 14]
      },
      heatDemandTotalForecast: [
        68, 62, 95, 94, 52, 36, 29, 61, 54, 34, 99, 98, 47, 31, 80, 12, 10, 71, 67, 11, 46, 33, 13, 14
      ],
      timeArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    global: {
      plugins: [vuetify]
    }
  })
}

function shallowMountWrap() {
  return shallowMount(HeatDemTable, {
    props: {
      heatDemandForecast: {
        Industrial: [68, 62, 95, 94, 52, 36, 29, 61, 54, 34, 99, 98, 47, 31, 80, 12, 10, 71, 67, 11, 46, 33, 13, 14],
        HighRises: [82, 23, 42, 48, 56, 41, 32, 68, 37, 26, 79, 67, 97, 59, 80, 38, 85, 87, 39, 29, 13, 16, 62, 22],
        FamilyHouses: [34, 85, 13, 22, 70, 46, 72, 62, 21, 24, 25, 10, 33, 32, 41, 11, 75, 29, 39, 30, 91, 27, 97, 99],
        NewClients: [69, 71, 91, 72, 80, 94, 57, 27, 30, 51, 11, 25, 13, 15, 46, 21, 20, 86, 10, 49, 83, 55, 75, 96]
      },
      heatDemandTotalForecast: [],
      timeArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    global: {
      plugins: [vuetify]
    }
  })
}

function mountWrapOne() {
  return mount(HeatDemTable, {
    props: {
      heatDemandForecast: {
        Industrial: [68, 62, 95, 94, 52, 36, 29, 61, 54, 34, 99, 98, 47, 31, 80, 12, 10, 71, 67, 11, 46, 33, 13, 14]
      },
      heatDemandTotalForecast: [
        68, 62, 95, 94, 52, 36, 29, 61, 54, 34, 99, 98, 47, 31, 80, 12, 10, 71, 67, 11, 46, 33, 13, 14
      ],
      timeArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    global: {
      plugins: [vuetify]
    }
  })
}

function mountWrap() {
  return mount(HeatDemTable, {
    props: {
      heatDemandForecast: {
        Industrial: [68, 62, 95, 94, 52, 36, 29, 61, 54, 34, 99, 98, 47, 31, 80, 12, 10, 71, 67, 11, 46, 33, 13, 14],
        HighRises: [82, 23, 42, 48, 56, 41, 32, 68, 37, 26, 79, 67, 97, 59, 80, 38, 85, 87, 39, 29, 13, 16, 62, 22],
        FamilyHouses: [34, 85, 13, 22, 70, 46, 72, 62, 21, 24, 25, 10, 33, 32, 41, 11, 75, 29, 39, 30, 91, 27, 97, 99],
        NewClients: [69, 71, 91, 72, 80, 94, 57, 27, 30, 51, 11, 25, 13, 15, 46, 21, 20, 86, 10, 49, 83, 55, 75, 96]
      },
      heatDemandTotalForecast: [
        253, 241, 241, 236, 258, 217, 190, 218, 142, 135, 214, 200, 190, 137, 247, 82, 190, 273, 155, 119, 233, 131,
        247, 231
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
    wrapper.vm.changed(1, 2, '3')
    expect(wrapper.emitted('changed-heat-demand-forecast')).toHaveLength(1)
    expect((wrapper.emitted('changed-heat-demand-forecast') as object[])[0]).toEqual([
      { keyIndex: 1, index: 2, value: 3 }
    ])
  })
  //running the method -in total- three times
  it('Changed Method Test Multiple (multiple times)', () => {
    wrapper.vm.changed(2, 2, '2')
    wrapper.vm.changed(4, 5, '6')

    expect(wrapper.emitted('changed-heat-demand-forecast')).toHaveLength(3)
    expect((wrapper.emitted('changed-heat-demand-forecast') as object[])[1]).toEqual([
      { keyIndex: 2, index: 2, value: 2 }
    ])
    expect((wrapper.emitted('changed-heat-demand-forecast') as object[])[2]).toEqual([
      { keyIndex: 4, index: 5, value: 6 }
    ])
  })
})

// TABLE ELEMENT TESTS
// Table Element Tests for the Table with One Use-Case
describe('Table Element Tests for the Table with One Row', async () => {
  //general arrangement for the test
  const wrapper = mountWrapOne()
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
  //check whether the use cases are displayed correctly
  // AND check whether the event handling happens correctly
  it('Check Use Case and Total Displayed', async () => {
    //general arrangement for the test
    const inputs = tableRows[1].findAll('input')
    const totals = tableRows[2].findAll('td')
    const industrialUseCaseArray = [
      68, 62, 95, 94, 52, 36, 29, 61, 54, 34, 99, 98, 47, 31, 80, 12, 10, 71, 67, 11, 46, 33, 13, 14
    ]

    //the test
    for (let i = 0; i <= 23; i++) {
      expect(inputs[i].element.value).toEqual(industrialUseCaseArray[i].toString())
      expect(totals[i].text()).toEqual(industrialUseCaseArray[i].toString())

      //change event emit check
      inputs[i].setValue('2')
      expect(wrapper.emitted('changed-heat-demand-forecast')[i]).toEqual([{ keyIndex: 0, index: i, value: 2 }])
    }
  })
})

// Table Element Tests for the Table with Four Use-Cases
describe('Table value Tests', async () => {
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

  it('Check Use Case and Total Displayed for Multiple Rows', async () => {
    //general arrangement for the test
    const wrapper = mountWrap()
    const table = wrapper.find('table')
    expect(table.exists()).toBe(true)

    const tableRows = table.findAll('tr')
    expect(tableRows[0].exists()).toBe(true)

    let inputs = tableRows[1].findAll('input')

    const totals = tableRows[2].findAll('td')
    const useCaseArray = [
      [68, 62, 95, 94, 52, 36, 29, 61, 54, 34, 99, 98, 47, 31, 80, 12, 10, 71, 67, 11, 46, 33, 13, 14],
      [82, 23, 42, 48, 56, 41, 32, 68, 37, 26, 79, 67, 97, 59, 80, 38, 85, 87, 39, 29, 13, 16, 62, 22],
      [34, 85, 13, 22, 70, 46, 72, 62, 21, 24, 25, 10, 33, 32, 41, 11, 75, 29, 39, 30, 91, 27, 97, 99],
      [69, 71, 91, 72, 80, 94, 57, 27, 30, 51, 11, 25, 13, 15, 46, 21, 20, 86, 10, 49, 83, 55, 75, 96]
    ]

    const totalArray = [
      253, 241, 241, 236, 258, 217, 190, 218, 142, 135, 214, 200, 190, 137, 247, 82, 190, 273, 155, 119, 233, 131, 247,
      231
    ]
    let emitCounter = 0

    const tableheasders = tableRows[0].findAll('th')
    expect(tableheasders[0].exists()).toBe(true)
    expect(tableheasders.length).toEqual(24)

    const tableTotals = tableRows[5].findAll('td')

    //check the total is displayed correctly
    for (let i = 0; i <= 23; i++) {
      expect(tableheasders[i].text()).toEqual('' + i)
      expect(tableTotals[i].text()).toBe('' + totalArray[i])
    }

    //check the use cases are displayed correctly
    //AND the emits are handled correctly
    for (let row = 0; row <= 3; row++) {
      inputs = tableRows[row + 1].findAll('input')
      for (let column = 0; column <= 23; column++) {
        expect(inputs[column].element.value).toEqual(useCaseArray[row][column].toString())
        //add change event emit check
        inputs[column].setValue('2')
        expect(wrapper.emitted('changed-heat-demand-forecast')[emitCounter]).toEqual([
          { keyIndex: row, index: column, value: 2 }
        ])
        emitCounter++
      }
    }
  })
})

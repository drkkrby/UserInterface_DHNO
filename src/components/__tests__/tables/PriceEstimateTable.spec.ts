// import { createApp } from 'vue'
// import App from '../../../App.vue'
//import router from '../../../router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import vuetify from 'vuetify'

import { describe, it, expect, beforeAll, Vitest, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import PriceEstimateTable from '../../tables/PriceEstimateTable.vue'
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
  return shallowMount(PriceEstimateTable, {
    props: {
      priceEstimate: [
        186, 161, 185, 139, 151, 123, 148, 116, 136, 164, 178, 198, 155, 115, 152, 143, 163, 119, 125, 120, 128, 179,
        159, 175
      ],
      timeArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    global: {
      plugins: [vuetify]
    }
  })
}

function mountWrap() {
  return mount(PriceEstimateTable, {
    props: {
      priceEstimate: [
        186, 161, 185, 139, 151, 123, 148, 116, 136, 164, 178, 198, 155, 115, 152, 143, 163, 119, 125, 120, 128, 179,
        159, 175
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
    expect(wrapper.emitted('changed-price')).toHaveLength(1)
    expect((wrapper.emitted('changed-price') as object[])[0]).toEqual([{ index: 0, value: 2 }])
  })
  //running the method -in total- three times
  it('Changed Method Test Multiple (multiple times)', () => {
    wrapper.vm.changed('2', 1)
    wrapper.vm.changed('4', 3)

    expect(wrapper.emitted('changed-price')).toHaveLength(3)
    expect((wrapper.emitted('changed-price') as object[])[1]).toEqual([{ index: 0, value: 2 }])
    expect((wrapper.emitted('changed-price') as object[])[2]).toEqual([{ index: 2, value: 4 }])
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
  it('Check Price Estimates', async () => {
    //general arrangement for the test
    const inputs = tableRows[1].findAll('input')
    const priceEstimateArray = [
      186, 161, 185, 139, 151, 123, 148, 116, 136, 164, 178, 198, 155, 115, 152, 143, 163, 119, 125, 120, 128, 179, 159,
      175
    ]

    //the test
    for (let i = 0; i <= 23; i++) {
      //   console.log("i="+i);
      expect(inputs[i].element.value).toEqual(priceEstimateArray[i].toString())

      //change event emit check
      inputs[i].setValue('2')
      expect(wrapper.emitted('changed-price')[i]).toEqual([{ index: i, value: 2 }])
    }
  })
})

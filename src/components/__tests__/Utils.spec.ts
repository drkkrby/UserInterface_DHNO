import { describe, test, expect } from 'vitest'
import * as Utils from '@/utils'

describe('Time Array test suite', () => {
  test('time = 0', () => {
    const time = 0
    const expectedOutput: number[] = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
    ]

    expect(Utils.timeArray(time)).toStrictEqual(expectedOutput)
  })

  test('time = 1', () => {
    const time = 1
    const expectedOutput: number[] = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0
    ]

    expect(Utils.timeArray(time)).toStrictEqual(expectedOutput)
  })

  test('time = 10', () => {
    const time = 10
    const expectedOutput: number[] = [
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    ]

    expect(Utils.timeArray(time)).toStrictEqual(expectedOutput)
  })

  test('time = 23', () => {
    const time = 23
    const expectedOutput: number[] = [
      23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22
    ]

    expect(Utils.timeArray(time)).toStrictEqual(expectedOutput)
  })
})

describe('Total demand forecast test suite', () => {
  test('No records', () => {
    const heatDemand: Record<string, number[]> = {}
    const expectedOutput: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    expect(Utils.heatDemandTotalForecast(heatDemand)).toStrictEqual(expectedOutput)
  })

  test('2 empty records', () => {
    const heatDemand: Record<string, number[]> = {
      Industrial: [],
      HighRises: []
    }
    const expectedOutput: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    expect(Utils.heatDemandTotalForecast(heatDemand)).toStrictEqual(expectedOutput)
  })

  test('2 Non empty records', () => {
    const heatDemand: Record<string, number[]> = {
      Industrial: [1, 2, 3, 4],
      HighRises: [1, 2, 3, 4]
    }
    const expectedOutput: number[] = [2, 4, 6, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    expect(Utils.heatDemandTotalForecast(heatDemand)).toStrictEqual(expectedOutput)
  })

  test('Different record sizes', () => {
    const heatDemand: Record<string, number[]> = {
      Industrial: [111, 22, 3, 94, 6, 7],
      HighRises: [1, 2, 3, 4]
    }
    const expectedOutput: number[] = [112, 24, 6, 98, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    expect(Utils.heatDemandTotalForecast(heatDemand)).toStrictEqual(expectedOutput)
  })
})

describe('isDateToday() test suite', () => {
  test('Date is today', () => {
    const date = new Date()
    expect(Utils.isDateToday(date)).toStrictEqual(true)
  })

  test('Date is today 23:59', () => {
    const date = new Date()
    date.setHours(23, 59, 59, 59)
    expect(Utils.isDateToday(date)).toStrictEqual(true)
  })

  test('Date is yesterday 23:59', () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    date.setHours(23, 59, 59, 59)
    expect(Utils.isDateToday(date)).toStrictEqual(false)
  })

  test('Date is 10 days ago', () => {
    const date = new Date()
    date.setDate(date.getDate() - 10)
    expect(Utils.isDateToday(date)).toStrictEqual(false)
  })

  test('Date is 10 days in the future', () => {
    const date = new Date()
    date.setDate(date.getDate() + 10)
    expect(Utils.isDateToday(date)).toStrictEqual(false)
  })

  test('Date is previous year', () => {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 1)
    expect(Utils.isDateToday(date)).toStrictEqual(false)
  })

  test('Date is next year', () => {
    const date = new Date()
    date.setFullYear(date.getFullYear() + 1)
    expect(Utils.isDateToday(date)).toStrictEqual(false)
  })
})

describe('isDateInTheFuture() test suite', () => {
  test('Date is tomorrow', () => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    date.setHours(0, 0, 0, 0)
    expect(Utils.isDateInTheFuture(date)).toStrictEqual(true)
  })

  test('Date is today 23:59', () => {
    const date = new Date()
    date.setHours(23, 59, 59, 59)
    expect(Utils.isDateInTheFuture(date)).toStrictEqual(false)
  })

  test('Date is yesterday', () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    expect(Utils.isDateInTheFuture(date)).toStrictEqual(false)
  })

  test('Date is 10 days ago', () => {
    const date = new Date()
    date.setDate(date.getDate() - 10)
    expect(Utils.isDateInTheFuture(date)).toStrictEqual(false)
  })

  test('Date is 10 days in the future', () => {
    const date = new Date()
    date.setDate(date.getDate() + 10)
    expect(Utils.isDateInTheFuture(date)).toStrictEqual(true)
  })

  test('Date is previous year', () => {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 1)
    expect(Utils.isDateInTheFuture(date)).toStrictEqual(false)
  })

  test('Date is next year', () => {
    const date = new Date()
    date.setFullYear(date.getFullYear() + 1)
    expect(Utils.isDateInTheFuture(date)).toStrictEqual(true)
  })
})

import moment from 'moment'

/**
 *  Array representing 24 hours in a day starting at the selected time.
 *  Displayed in the graphs as the x-label, and in the tables as the top row.
 */
export function timeArray(time: number): number[] {
  return Array.from(Array(24).keys()).map((x) => (x + time) % 24)
}

/**
 * Computes the total heat demand by summing all demands in heatDemandConsumerForecast object.
 * It's represented by the line 'total' in the heat demand graph and table.
 * @returns the total heat demand for all consumers.
 */
export function heatDemandTotalForecast(heatDemandConsumerForecast: Record<string, number[]>): number[] {
  const total: number[] = new Array(24).fill(0)

  //Sum all arrays in the heatDemandConsumerForecast object to get the total demand
  for (const [, value] of Object.entries(heatDemandConsumerForecast)) {
    value.forEach((num: number, idx: number) => {
      total[idx] = num + total[idx]
    })
  }
  return total
}

/**
 * Function to check if a date is today or not.
 * @param date the date that is checked.
 * @returns true if the date is 'today' and false otherwise.
 */
export function isDateToday(date: Date): boolean {
  return moment(date.setHours(0, 0, 0, 0)).isSame(moment(new Date().setHours(0, 0, 0, 0)))
}

/**
 * Function to check if a date is in the future.
 * Used to hide certain components that are not visible for the future (for example: the optimizer result)
 * @returns true if the date is in the future and false otherwise.
 */
export function isDateInTheFuture(date: Date): boolean {
  return moment(date.setHours(0, 0, 0, 0)).isAfter(moment(new Date().setHours(0, 0, 0, 0)))
}

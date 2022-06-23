/* eslint-disable @typescript-eslint/no-unused-vars */

// This file handles the backend requests. Just change each function accordingly to make the requests to the correct API endpoints.
// After that check if the return type is the same or change it as needed in the datatypes.ts file.

import type {
  GridOperatorData,
  OptimizerSolution,
  SimulatorResult,
  ParameterRealizations,
  IntradayData,
  DayAheadData
} from '@/api/datatypes'

import * as mockData from '@/api/mockData'

//--------------------------------------
//  Grid operator:
//--------------------------------------

/**
 * Fetches the grid operator data for a selected date.
 * The data is for the **whole** displayed page: `input + optimizer output + simulator output` (if exists).
 * See the data type GridOperatorData for more info.
 * @param date the selected date.
 * @param time the time the 24 hour window starts.
 * @returns the data for the grid operator, according to the selected date and time.
 */
export function fetchGridOperatorData(date: Date, time: number): GridOperatorData {
  // just for display purposes (different data if the date is a past date):
  return isToday(date)
    ? JSON.parse(JSON.stringify(mockData.gridOperatorTodaysData)) // copy of the object, so the pointer isn't shared and doesn't cause side effects
    : JSON.parse(JSON.stringify(mockData.gridOperatorPastData))
}

// **This method is used for the electricity trader as well, in the Day-Ahead section.**
/**
 * Reset the heat demand for the selected date (date is optional because the grid operator is able
 *                        to do it for 'today' only, while electricity trader can choose any date).
 * Heat demand is per consumer, as a record with entries of type `{"consumer_name": number[]}`.
 * **It gets reset to the original forecasted values.**
 * @param time the time the 24 hour window starts.
 * @param date the date selected by the user.
 * @returns the forecasted heat demand values (for each consumer).
 */
export function resetHeatDemand(date: Date, time: number): Record<string, number[]> {
  // copy of the object, so the pointer isn't shared and doesn't cause side effects
  return JSON.parse(JSON.stringify(mockData.gridOperatorTodaysData.heatDemandConsumerForecast))
}

// **This method is used for the electricity trader as well, in the Day-Ahead section.**
/**
 * Reset the outside temperature for the current date (date is optional because the grid operator is able
 *                               to do it for 'today' only, while electricity trader can choose any date).
 * **It gets reset to the original forecasted values.**
 * @param time the time the 24 hour window starts.
 * @param date the date selected by the user.
 * @returns the forecasted outside temperature values.
 */
export function resetOutsideTemperature(date: Date, time: number): number[] {
  // copy of the object, so the pointer isn't shared and doesn't cause side effects
  return [...mockData.gridOperatorTodaysData.outsideTempForecast]
}

/**
 * Calls the optimizer and gets the optimal parameters.
 * @param time the time the 24 hour window starts.
 * @param heatDemand the heat demand inputted by the grid operator.
 * @param outsideTemperature the outside temperature inputted by the grid operator.
 * @returns a tuple [OptimizerSolution, errorMessage] containing the optimal parameters for each production unit
 *          or an error message if the optimizer returned an error.
 */
// The fact that the error message is global (while optimizerSolution is per production unit, an array)
// was the reason for choosing a tuple as a return value.
export function optimize(
  time: number,
  heatDemand: number[],
  outsideTemperature: number[]
): [OptimizerSolution, string] {
  const result = mockData.optimizerSolution

  // For display purposes: when total demand is greater than 400 for some hour, then show the violation.
  let timeOfViolation = 0
  const threshold400Violated: boolean = heatDemand
    .map((x, index) => {
      if (x >= 400 && timeOfViolation === 0) timeOfViolation = (time + index) % 24
      return x >= 400
    })
    .reduce((x, y) => x || y)

  // Return violations if threshold is violated (for display purposes):
  const violationsMsg = threshold400Violated
    ? `The optimizer was unable to produce a solution for this demand.
       Causes: Can't produce this much heat at time ${timeOfViolation}:00. Threshold per hour is 400.`
    : ''

  return [result, violationsMsg] //Tuple
}

/**
 * Calls the simulator and gets the simulated parameters.
 * @param time The time the 24h window starts.
 * @param productionUnit the production unit that is simulated.
 * @param outletTemperature the outlet temperature that was inputted by the user.
 * @returns the result returned by the simulator, containing the parameter values and violations if there are some.
 */
export function simulate(time: number, productionUnit: string, outletTemperature: number[]): SimulatorResult {
  const result = mockData.simulatorResult
  // Show violations only for chp 1 (for display purposes):
  result.violations = productionUnit === 'CHP Unit 1' ? ['Not enough heat at building A'] : []
  return result
}

/**
 * Fetches the realizations for all production units. (Invoked when optimize is pressed).
 * The values are displayed in the *optimizer* section of the page.
 * @param date the selected date.
 * @param time the time the 24h window starts.
 * @returns the realizations of each parameter per production unit. *(see return type)*
 */
// The design solution was reasoned by the fact that the realizations depend on sensors and are separated
// from the optimizer and simulator.
export function fetchRealizations(date: Date, time: number): ParameterRealizations {
  return mockData.parameterRealizations
}

//--------------------------------------
//  Electricity trader:
//--------------------------------------

// -------------------------------------
// DayAhead:

/**
 * Fetches the day ahead data for a selected date.
 * @param date the date inputted by the user.
 * @param time the time the 24h window starts.
 * @returns the day ahead data. *(see return type for more info)*
 */
export function fetchDayAheadData(date: Date, time: number): DayAheadData {
  return date > new Date()
    ? JSON.parse(JSON.stringify(mockData.electricityTraderFutureData)) // display it for the future as well
    : JSON.parse(JSON.stringify(mockData.electricityTraderPastData))
}

// As well as these methods, declared above:
//export function resetHeatDemand(time: number, date: Date = new Date()): Record<string, number[]>
//export function resetOutsideTemperature(time: number, date: Date = new Date()): number[]

/**
 * Resets the electricity price estimate to the forecasted values.
 * @param date the selected date.
 * @param time the time the 24h window starts.
 * @returns the (original) forecasted electricity price estimate.
 */
export function resetElectricityPriceEstimate(date: Date, time: number) {
  // copy of the object, so the pointer isn't shared and doesn't cause side effects
  return [...mockData.electricityTraderFutureData.electricityPriceEstimate]
}

/**
 * Creates an electricity production plan for the inputted data.
 * @param date the date inputted by the user.
 * @param time the time the 24h window starts.
 * @param heatDemand the heat demand parameter inputted by the user.
 * @param outsideTemp the outside temperature parameter inputted by the user.
 * @param electricityPriceEstimate the electricity price estimate inputted by the user.
 * @returns the best production plan for the selected date.
 */
export function createElectricityProductionPlan(
  date: Date,
  time: number,
  heatDemand: number[],
  outsideTemp: number[],
  electricityPriceEstimate: number[]
): [number[], string] {
  const result = mockData.electricityProductionPlan

  // For display purposes: when total demand is greater than 400 for some hour, then show the violation.
  let timeOfViolation = 0
  const threshold400Violated: boolean = heatDemand
    .map((x, index) => {
      if (x >= 400 && timeOfViolation === 0) timeOfViolation = (time + index) % 24
      return x >= 400
    })
    .reduce((x, y) => x || y)

  // Return violations if threshold is violated (for display purposes):
  const violationsMsg: string = threshold400Violated
    ? `The optimizer was unable to produce a production plan for this demand.
       Causes: Can't produce this much heat at time ${timeOfViolation}:00. Threshold per hour is 400.`
    : ''

  return [result, violationsMsg]
}

//-----------------------------------
// Intraday:

/**
 * Fetches the intraday data.
 * Only accessible for today (current date), so no additional parameters required.
 * Electricity production starts at midnight (00:00) and has 15min slots.
 * @returns the intraday data. *(see return type for more info)*
 */
export function fetchIntradayData(): IntradayData {
  // copy of the object, so the pointer isn't shared and doesn't cause side effects
  return JSON.parse(JSON.stringify(mockData.intraDayData))
}

/**
 * Resets the electrictyProduction for intraday.
 * @returns the forcasted/optimized electricity production.
 */
export function resetElectricityProduction(): number[] {
  // copy of the object, so the pointer isn't shared and doesn't cause side effects
  return JSON.parse(JSON.stringify(mockData.intraDayData.electricityProduction))
}

/**
 * Checks if the inputted production plan is feasible or not.
 * @param electricityProduction the inputted production plan.
 * @returns true/false based on if the plan is feasible or not.
 */
export function checkFeasibility(electricityProduction: number[]): boolean {
  const threshold100Violated: boolean = electricityProduction.map((x, index) => x >= 100).reduce((x, y) => x || y)
  return threshold100Violated ? false : true
}

// ------------------------------------------
// ------------------------------------------
// Variables and local functions:

/**
 * For display purposes. (display different data depending if the date is today or not)
 * @param date
 * @returns if the date is today or not.
 */
function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

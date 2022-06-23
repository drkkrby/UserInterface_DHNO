//-------------------------------
// Data types for Grid Operator:
// ------------------------------

// Data related to a certain parameter (returned from optimizer)
export type ParameterData = { optimal: number[]; realization: number[]; simulated: number[] }

// Data related to a certain production unit:
export type ProductionUnitData = {
  // The production unit's name that it's related to:
  productionUnit: string
  // And the parameters related to it:
  outletTemperature: ParameterData
  electricityProduction: ParameterData
  massFlow: ParameterData
  inletTemperature: ParameterData

  // The violations returned by the simulator for this production unit:
  simulatorViolations: string[] | undefined
}

// All the data related to a specific date (gets fetched when the date is selected):
export type GridOperatorData = {
  // User input (1st half of the page):
  heatDemandRealization: number[]
  // Record with entries of type {"consumer_name": number[], ...}:
  heatDemandConsumerForecast: Record<string, number[]>
  outsideTempRealization: number[]
  outsideTempForecast: number[]

  // User output (optimizer part)
  optimized: boolean //if optimizer has data for this date
  optimizerViolations: string // (Global) Violations returned by the optimizer
  // Optimizer result (for that selected date, might not exist, in which case it's empty):
  productionUnitsData: ProductionUnitData[]
}

//----------------------------------------------------
// Data types for the optimizer:

// Optimizer result for several production units
// Data type returned when optimize() is invoked.
export type OptimizerSolution = {
  // The production unit's name:
  productionUnit: string
  // Optimized parameters:
  outletTemperature: number[]
  electricityProduction: number[]
  massFlow: number[]
  inletTemperature: number[]
}[]

//----------------------------------------------------
// Data types for the simulator:

// Simulator result for a *single* production unit:
// Data type returned when simulate() is invoked.
export type SimulatorResult = {
  //no outlet temperature
  electricityProduction: number[]
  massFlow: number[]
  inletTemperature: number[]
  violations: string[] // the violations of the simulator
}

//----------------------------------------------------
// The realizations of all parameters for all production units. ( in the optimizer part )
// It is used by fetcheRealizations() function, as the realizations depend on sensors and are separated
// from the optimizer and simulator.
export type ParameterRealizations = {
  // The production unit's name:
  productionUnit: string
  // The realizations at this production unit:
  outletTemperature: number[]
  electricityProduction: number[]
  massFlow: number[]
  inletTemperature: number[]
}[]

//----------------------------------------------------------
//----------------------------------------------------------

//----------------------------------------------------------
//  Data Types for eLectricity trader:
//----------------------------------------------------------

// Intraday market data (for today only)
export type IntradayData = {
  // Total electricity production:
  // This one is across 15 min intervals.
  electricityProduction: number[]
  // when the data is fetched feasibility might not have been checked yet, so it's possible to be undefined
  feasible: boolean | undefined
}

// Day ahead market ( for any selected date )
export type DayAheadData = {
  // User Input:
  heatDemand: Record<string, number[]>
  outsideTemp: number[]
  electricityPriceEstimate: number[]

  // Optimizer output:
  optimized: boolean //if optimizer has data for this date
  optimizerViolations: string // Violations returned by the optimizer
  // The optimal electricity production: (might not exist, so empty array in that case)
  electricityProduction: number[] // hourly intervals
}

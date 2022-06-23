/**
 * This file returnes data that is displayed in the application and used by unit tests.
 * DO NOT DELETE IT, the tests will fail without it.
 */

import type {
  GridOperatorData,
  OptimizerSolution,
  SimulatorResult,
  ParameterRealizations,
  IntradayData,
  DayAheadData
} from '@/api/datatypes'

// ----------------------------
// Grid operator:
// ----------------------------

export const gridOperatorTodaysData: GridOperatorData = {
  heatDemandRealization: [330, 308, 273, 217, 203, 206, 233, 239, 267, 284, 308],
  heatDemandConsumerForecast: {
    Industrial: [45, 90, 51, 87, 153, 92, 116, 70, 45, 83, 108, 63, 100, 30, 47, 83, 111, 64, 90, 67, 36, 63, 86, 57],
    HighRises: [121, 112, 86, 71, 83, 139, 159, 142, 97, 67, 79, 92, 72, 59, 75, 82, 70, 60, 51, 35, 57, 86, 55, 31],
    FamilyHouses: [80, 78, 76, 76, 75, 70, 80, 78, 86, 66, 50, 50, 61, 62, 58, 67, 69, 61, 61, 57, 71, 75, 73, 65]
  },
  outsideTempRealization: [15, 15, 16, 16, 17, 17, 17, 18, 19, 19, 19],
  outsideTempForecast: [14, 15, 15, 16, 16, 17, 17, 17, 18, 19, 20, 20, 19, 19, 18, 18, 17, 17, 17, 16, 16, 16, 15, 14],
  optimized: false, //if optimizer has data for this date
  optimizerViolations: '',
  // empty solution for today:
  productionUnitsData: [
    {
      productionUnit: 'CHP Unit 1',
      outletTemperature: { optimal: [], realization: [], simulated: [] },
      electricityProduction: { optimal: [], realization: [], simulated: [] },
      massFlow: { optimal: [], realization: [], simulated: [] },
      inletTemperature: { optimal: [], realization: [], simulated: [] },
      simulatorViolations: undefined
    },
    {
      productionUnit: 'CHP Unit 2',
      outletTemperature: { optimal: [], realization: [], simulated: [] },
      electricityProduction: { optimal: [], realization: [], simulated: [] },
      massFlow: { optimal: [], realization: [], simulated: [] },
      inletTemperature: { optimal: [], realization: [], simulated: [] },
      simulatorViolations: undefined
    }
  ]
}

export const gridOperatorPastData: GridOperatorData = {
  heatDemandRealization: [
    186, 161, 185, 139, 151, 123, 148, 116, 136, 164, 178, 198, 155, 115, 152, 143, 163, 119, 125, 120, 128, 179, 159,
    175
  ],
  heatDemandConsumerForecast: {
    Industrial: [68, 62, 95, 94, 52, 36, 29, 61, 54, 34, 99, 98, 47, 31, 80, 12, 10, 71, 67, 11, 46, 33, 13, 14],
    HighRises: [82, 23, 42, 48, 56, 41, 32, 68, 37, 26, 79, 67, 97, 59, 80, 38, 85, 87, 39, 29, 13, 16, 62, 22],
    FamilyHouses: [34, 85, 13, 22, 70, 46, 72, 62, 21, 24, 25, 10, 33, 32, 41, 11, 75, 29, 39, 30, 91, 27, 97, 99],
    NewClients: [69, 71, 91, 72, 80, 94, 57, 27, 30, 51, 11, 25, 13, 15, 46, 21, 20, 86, 10, 49, 83, 55, 75, 96]
  },
  outsideTempRealization: [10, 11, 12, 12, 12, 13, 14, 14, 13, 13, 13],
  outsideTempForecast: [10, 11, 12, 12, 12, 13, 14, 14, 13, 13, 13, 14, 13, 12, 12, 11, 9, 9, 9, 8, 8, 9, 9, 10],

  optimized: true,
  optimizerViolations: '',
  productionUnitsData: [
    {
      productionUnit: 'CHP Unit 1',
      outletTemperature: {
        optimal: [73, 73, 78, 72, 79, 78, 74, 75, 76, 75, 77, 76, 75, 79, 78, 78, 77, 76, 79, 77, 76, 75, 86, 70],
        realization: [74, 87, 82, 87, 84, 84, 88, 88, 87, 86, 90],
        simulated: [74, 67, 68, 67, 71, 69, 71, 67, 70, 71, 72, 79, 73, 75, 74, 68, 84, 70, 85, 79, 70, 74, 79, 71]
      },
      electricityProduction: {
        optimal: [64, 70, 61, 54, 64, 64, 68, 71, 66, 60, 73, 63, 69, 63, 60, 74, 64, 59, 52, 62, 58, 69, 71, 33],
        realization: [71, 80, 79, 74, 74, 76, 82, 81, 82, 86, 81],
        simulated: [31, 56, 47, 51, 53, 66, 74, 65, 60, 52, 65, 47, 78, 70, 74, 88, 77, 65, 75, 86, 55, 49, 59, 40]
      },
      massFlow: {
        optimal: [50, 57, 58, 78, 60, 58, 56, 67, 51, 76, 51, 69, 59, 60, 63, 62, 51, 71, 50, 63, 60, 72, 83, 79],
        realization: [59, 39, 69, 64, 75, 72, 68, 63, 60, 59, 61],
        simulated: [48, 49, 49, 49, 42, 64, 46, 47, 42, 39, 44, 53, 53, 44, 47, 44, 45, 56, 46, 39, 68, 57, 60, 66]
      },
      inletTemperature: {
        optimal: [63, 60, 66, 73, 67, 75, 76, 76, 79, 74, 73, 76, 70, 75, 63, 71, 75, 58, 70, 67, 68, 67, 74, 81],
        realization: [45, 67, 63, 68, 74, 87, 74, 79, 80, 77, 79],
        simulated: [23, 39, 50, 49, 50, 54, 59, 57, 63, 52, 66, 65, 84, 43, 55, 61, 50, 39, 59, 53, 53, 48, 52, 58]
      },

      simulatorViolations: []
    },
    {
      productionUnit: 'CHP Unit 2',
      outletTemperature: {
        optimal: [74, 67, 68, 67, 71, 69, 71, 67, 70, 71, 72, 79, 73, 75, 74, 68, 84, 70, 85, 79, 70, 74, 79, 71],
        realization: [48, 79, 72, 73, 77, 71, 59, 76, 77, 75, 81],
        simulated: [64, 70, 61, 54, 64, 64, 68, 71, 66, 60, 73, 63, 69, 63, 60, 74, 64, 59, 52, 62, 58, 69, 71, 33]
      },
      electricityProduction: {
        optimal: [48, 49, 49, 49, 42, 64, 46, 47, 42, 39, 44, 53, 53, 44, 47, 44, 45, 56, 46, 39, 68, 57, 60, 66],
        realization: [78, 76, 74, 87, 75, 82, 64, 67, 73, 83, 80],
        simulated: [63, 60, 66, 73, 67, 75, 76, 76, 79, 74, 73, 76, 70, 75, 63, 71, 75, 58, 70, 67, 68, 67, 74, 81]
      },
      massFlow: {
        optimal: [23, 39, 50, 49, 50, 54, 59, 57, 63, 52, 66, 65, 84, 43, 55, 61, 50, 39, 59, 53, 53, 48, 52, 58],
        realization: [86, 60, 74, 53, 61, 64, 61, 64, 47, 65, 57],
        simulated: [73, 73, 78, 72, 79, 78, 74, 75, 76, 75, 77, 76, 75, 79, 78, 78, 77, 76, 79, 77, 76, 75, 86, 70]
      },
      inletTemperature: {
        optimal: [64, 70, 61, 54, 64, 64, 68, 71, 66, 60, 73, 63, 69, 63, 60, 74, 64, 59, 52, 62, 58, 69, 71, 33],
        realization: [53, 38, 41, 47, 74, 80, 84, 79, 83, 83, 88],
        simulated: [50, 57, 58, 78, 60, 58, 56, 67, 51, 76, 51, 69, 59, 60, 63, 62, 51, 71, 50, 63, 60, 72, 83, 79]
      },

      simulatorViolations: ['Not enough heat for building A', 'Outlet temperature constraint violation at time 15:00']
    }
  ]
}

export const optimizerSolution: OptimizerSolution = [
  {
    productionUnit: 'CHP Unit 1',
    outletTemperature: [65, 73, 78, 70, 79, 78, 74, 75, 73, 75, 77, 76, 72, 79, 78, 72, 77, 76, 79, 77, 76, 75, 86, 70],
    electricityProduction: [
      64, 77, 72, 61, 64, 64, 68, 63, 74, 65, 76, 69, 69, 63, 60, 82, 71, 78, 67, 80, 62, 67, 84, 33
    ],
    massFlow: [50, 81, 70, 78, 60, 58, 56, 67, 51, 82, 51, 69, 59, 60, 56, 56, 57, 61, 61, 63, 68, 72, 83, 38],
    inletTemperature: [63, 60, 66, 78, 60, 67, 76, 67, 69, 70, 67, 66, 70, 79, 67, 83, 75, 86, 70, 75, 73, 67, 69, 60]
  },
  {
    productionUnit: 'CHP Unit 2',
    outletTemperature: [74, 87, 74, 69, 84, 72, 91, 77, 69, 73, 71, 80, 70, 69, 73, 76, 74, 82, 84, 70, 73, 60, 76, 60],
    electricityProduction: [
      71, 80, 83, 55, 58, 48, 63, 75, 50, 72, 81, 62, 62, 60, 48, 99, 54, 94, 60, 49, 67, 85, 80, 50
    ],
    massFlow: [59, 39, 52, 60, 50, 55, 47, 43, 60, 88, 71, 49, 64, 72, 87, 74, 62, 68, 64, 56, 79, 62, 72, 59],
    inletTemperature: [45, 54, 52, 57, 60, 57, 74, 60, 92, 55, 51, 63, 69, 66, 96, 42, 91, 77, 73, 79, 88, 71, 61, 83]
  }
]

export const simulatorResult: SimulatorResult = {
  electricityProduction: [
    91, 72, 38, 44, 41, 51, 38, 50, 59, 48, 52, 49, 35, 56, 41, 50, 51, 46, 44, 18, 36, 56, 39, 29
  ],
  massFlow: [64, 64, 61, 56, 41, 29, 37, 27, 39, 50, 37, 46, 47, 39, 40, 42, 50, 46, 72, 53, 53, 66, 74, 81],
  inletTemperature: [64, 64, 61, 56, 41, 29, 37, 27, 39, 50, 37, 46, 47, 39, 40, 42, 50, 46, 72, 53, 53, 66, 74, 81],
  violations: ['Not enough heat at building A']
}

export const parameterRealizations: ParameterRealizations = [
  {
    productionUnit: 'CHP Unit 1',
    outletTemperature: [74, 87, 74, 69, 84, 72, 91, 77, 69, 73, 71],
    electricityProduction: [71, 80, 83, 55, 58, 48, 63, 75, 50, 72, 81],
    massFlow: [59, 39, 52, 60, 50, 55, 47, 43, 60, 88, 71],
    inletTemperature: [45, 54, 52, 57, 60, 57, 74, 60, 92, 55, 51]
  },
  {
    productionUnit: 'CHP Unit 2',
    outletTemperature: [65, 73, 78, 70, 79, 78, 74, 75, 73, 75, 77],
    electricityProduction: [64, 77, 72, 61, 64, 64, 68, 63, 74, 65, 76],
    massFlow: [50, 81, 70, 78, 60, 58, 56, 67, 51, 82, 51],
    inletTemperature: [63, 60, 66, 78, 60, 67, 76, 67, 69, 70, 67]
  }
]

// ----------------------------
// Electricity trader:
// ----------------------------

// Day ahead:

export const electricityTraderFutureData: DayAheadData = {
  heatDemand: {
    Industrial: [45, 90, 51, 87, 153, 92, 116, 70, 45, 83, 108, 63, 100, 30, 47, 83, 111, 64, 90, 67, 36, 63, 86, 57],
    HighRises: [121, 112, 86, 71, 83, 139, 159, 142, 97, 67, 79, 92, 72, 59, 75, 82, 70, 60, 51, 35, 57, 86, 55, 31],
    FamilyHouses: [80, 78, 76, 76, 75, 70, 80, 78, 86, 66, 50, 50, 61, 62, 58, 67, 69, 61, 61, 57, 71, 75, 73, 65]
  },
  outsideTemp: [14, 15, 15, 16, 16, 17, 17, 17, 18, 19, 20, 20, 19, 19, 18, 18, 17, 17, 17, 16, 16, 16, 15, 14],
  electricityPriceEstimate: [
    186, 161, 185, 139, 151, 123, 148, 116, 136, 164, 178, 198, 155, 115, 152, 143, 163, 119, 125, 120, 128, 179, 159,
    175
  ],
  optimized: false,
  optimizerViolations: '',
  electricityProduction: []
}

export const electricityTraderPastData: DayAheadData = {
  heatDemand: {
    Industrial: [68, 62, 95, 94, 52, 36, 29, 61, 54, 34, 99, 98, 47, 31, 80, 12, 10, 71, 67, 11, 46, 33, 13, 14],
    HighRises: [82, 23, 42, 48, 56, 41, 32, 68, 37, 26, 79, 67, 97, 59, 80, 38, 85, 87, 39, 29, 13, 16, 62, 22],
    FamilyHouses: [34, 85, 13, 22, 70, 46, 72, 62, 21, 24, 25, 10, 33, 32, 41, 11, 75, 29, 39, 30, 91, 27, 97, 99],
    NewClients: [69, 71, 91, 72, 80, 94, 57, 27, 30, 51, 11, 25, 13, 15, 46, 21, 20, 86, 10, 49, 83, 55, 75, 96]
  },
  outsideTemp: [10, 11, 12, 12, 12, 13, 14, 14, 13, 13, 13, 14, 13, 12, 12, 11, 9, 9, 9, 8, 8, 9, 9, 10],
  electricityPriceEstimate: [
    73, 73, 78, 72, 79, 78, 74, 75, 76, 75, 77, 76, 75, 79, 78, 78, 77, 76, 79, 77, 76, 75, 86, 70
  ],
  optimized: true,
  optimizerViolations: '',
  electricityProduction: [
    48, 49, 49, 49, 42, 64, 46, 47, 42, 39, 44, 53, 53, 44, 47, 44, 45, 56, 46, 39, 68, 57, 60, 66
  ]
}

export const electricityProductionPlan: number[] = [
  48, 49, 49, 49, 42, 64, 46, 47, 42, 39, 44, 53, 53, 44, 47, 44, 45, 56, 46, 39, 68, 57, 60, 66
]

// IntraDay:

export const intraDayData: IntradayData = {
  electricityProduction: [
    // production across 15 min intervals
    91, 88, 90, 93, 72, 74, 79, 75, 44, 42, 38, 36, 39, 42, 44, 43, 41, 40, 41, 40, 45, 48, 51, 55, 42, 40, 38, 32, 40,
    45, 50, 57, 58, 59, 59, 54, 50, 49, 48, 43, 49, 53, 52, 58, 53, 47, 49, 46, 40, 38, 35, 38, 43, 50, 56, 54, 46, 43,
    41, 46, 48, 59, 50, 53, 52, 55, 51, 56, 49, 44, 46, 41, 42, 45, 44, 48, 28, 23, 18, 13, 26, 31, 36, 38, 44, 50, 56,
    52, 45, 34, 39, 34, 31, 28, 29, 25
  ],
  feasible: undefined
}

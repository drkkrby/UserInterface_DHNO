<!-- This component displays the entire grid operator page (optimizer's input and output ) -->
<script lang="ts">
import { defineComponent } from 'vue'

import * as API from '../api'
import * as Utils from '../utils'
import type { OptimizerSolution, ParameterRealizations } from '../api/datatypes'

import OptimizerInput from '../components/grid_operator/OptimizerInput.vue'
import OptimizerOutput from '../components/grid_operator/OptimizerOutput.vue'
import OptimizeButton from '../components/grid_operator/OptimizeButton.vue'

export default defineComponent({
  props: {
    // The selected starting time of the day:
    selectedTime: { required: true, type: Number },
    // The selected date (to optimize):
    selectedDate: { required: true, type: Date }
  },
  data() {
    return {
      API,
      // All the data displayed on this page: (see the type for more info)
      data: API.fetchGridOperatorData(this.selectedDate, this.selectedTime)
    }
  },
  computed: {
    /**
     *  Array representing 24 hours in a day starting at the selected time.
     *  Displayed in the graphs as the x-label, and in the tables as the top row.
     */
    timeArray(): number[] {
      return Utils.timeArray(this.selectedTime)
    },

    /**
     * Computes the total heat demand by summing all demands in heatDemandConsumerForecast object.
     * @returns the total heat demand for all consumers.
     */
    heatDemandTotalForecast(): number[] {
      return Utils.heatDemandTotalForecast(this.data.heatDemandConsumerForecast)
    },

    /**
     * Checks if the selected date is 'today' or not.
     * @returns true if the date is 'today' and false otherwise.
     */
    selectedDateIsToday(): boolean {
      return Utils.isDateToday(this.selectedDate)
    },

    /**
     * Checks if the selected date is in the future.
     * Used to hide certain components that are not visible for the future (for example: the optimizer result)
     * @returns true if the date is in the future and false otherwise.
     */
    selectedDateIsInTheFuture(): boolean {
      return Utils.isDateInTheFuture(this.selectedDate)
    }
  },
  methods: {
    /**
     * **Event handler** for when the `changed-heat-demand-forecast` event is emitted (in the heat demand table component).
     * Updates the heat demand (consumer) forecast with the user-inputted value.
     *
     * @param payload the event's payload, specifying the index of the object's key,
     *               the index in the array of the 'key' property and the new desired value to be replaced to that array entry.
     */
    updateHeatDemandForecast(payload: { keyIndex: number; index: number; value: number }): void {
      // Set the value of the specific entry (heatDemandConsumerForecast is an object!)
      // to the desired new value:
      Object.values(this.data.heatDemandConsumerForecast)[payload.keyIndex][payload.index] = payload.value
    },
    /**
     * **Event handler** for when the `changed-heat-demand-forecast` event is emitted (in the outside temp. table component).
     * Updates the values of the outside temperature forecast array.
     *
     * @param payload the event's payload, specifying the outside temperature forecast array's index
     *               that should be updated and the value it will be updated into.
     */
    updateOutsideTempForecast(payload: { index: number; value: number }): void {
      this.data.outsideTempForecast[payload.index] = payload.value
    },

    /**
     *  **Callback** function that is called in the OptimizeButton.vue component, and it is passed along as a prop.
     *   When the user presses optimize (in the OptimizeButton component), this function gets called.
     */
    async optimizePressed(): Promise<void> {
      // Fetches the optimizer solution:
      this.optimize()
      // Fetches the realizations:
      this.fetchRealizations()
    },

    /**
     * Fetches the optimizer's solution and updates the data variable with the fetched values.
     */
    optimize(): void {
      // Fetch the optimizer's result:
      let optimizerResult = this.API.optimize(
        this.selectedTime,
        this.heatDemandTotalForecast,
        this.data.outsideTempForecast
      )
      // The result is a tuple [optimizerSolution, violations]:
      let optimizerSolution: OptimizerSolution = optimizerResult[0]

      // The local array indeces of the production units might not correspond to the fetched ones,
      // so we need to iterate and match the production unit's names
      this.data.productionUnitsData.map((unitParams) => {
        //Find the index that corresponds to this production unit:
        let idx: number = optimizerSolution.findIndex((item) => item.productionUnit === unitParams.productionUnit)

        // Update the parameters' optimal value:
        unitParams.outletTemperature.optimal = optimizerSolution[idx].outletTemperature
        unitParams.electricityProduction.optimal = optimizerSolution[idx].electricityProduction
        unitParams.inletTemperature.optimal = optimizerSolution[idx].inletTemperature
        unitParams.massFlow.optimal = optimizerSolution[idx].massFlow
      })
      // Mark the data object optimized property as true: (used in a v-if directive)
      this.data.optimized = true
      // Update the violations: (if none the string will be empty)
      this.data.optimizerViolations = optimizerResult[1]
    },

    /**
     * Fetches the parameter realizations for all production units (outlet temp., mass flow, etc.).
     * See the datatype for more details.
     */
    fetchRealizations(): void {
      let realizations: ParameterRealizations = API.fetchRealizations(this.selectedDate, this.selectedTime)

      // The local array indeces of the production units might not correspond to the fetched ones,
      // so we need to iterate and match the production unit's names
      this.data.productionUnitsData.map((unitParams) => {
        //Find the index that corresponds to this production unit:
        let idx = realizations.findIndex((item) => item.productionUnit === unitParams.productionUnit)

        // Update the parameters' realization value:
        unitParams.outletTemperature.realization = realizations[idx].outletTemperature
        unitParams.electricityProduction.realization = realizations[idx].electricityProduction
        unitParams.inletTemperature.realization = realizations[idx].inletTemperature
        unitParams.massFlow.realization = realizations[idx].massFlow
      })
    },
    /**
     * **Event handler** for when the `simulate-pressed` event is emitted (in the OptimizerOutput component).
     * Makes a request to the server and gets the simulated data values.
     *
     * @param object the event's payload, specifying the production unit's index that is currently simulated.
     */
    simulatePressed(object: { productionUnitIndex: number }): void {
      // Get simulation result:
      let simulatorResult = API.simulate(
        this.selectedTime,
        this.data.productionUnitsData[object.productionUnitIndex].productionUnit,
        this.data.productionUnitsData[object.productionUnitIndex].outletTemperature.simulated
      )
      // Update the parameters' simulated value:
      this.data.productionUnitsData[object.productionUnitIndex].electricityProduction.simulated =
        simulatorResult.electricityProduction
      this.data.productionUnitsData[object.productionUnitIndex].massFlow.simulated = simulatorResult.massFlow
      this.data.productionUnitsData[object.productionUnitIndex].inletTemperature.simulated =
        simulatorResult.inletTemperature
      this.data.productionUnitsData[object.productionUnitIndex].simulatorViolations = simulatorResult.violations
    }
  },
  watch: {
    /**
     * If the selected date changes, fetch the new data for it.
     */
    selectedDate(newDate): void {
      this.data = API.fetchGridOperatorData(newDate, this.selectedTime)
    },
    /**
     * If the selected time changes, fetch the data again.
     */
    startselectedTimeime(newTime): void {
      this.data = API.fetchGridOperatorData(this.selectedDate, newTime)
    }
  },

  components: { OptimizeButton, OptimizerInput, OptimizerOutput }
})
</script>

<template>
  <!-- The user's input, the 1st half of the page -->
  <OptimizerInput
    :selectedTime="selectedTime"
    :selectedDate="selectedDate"
    :readonlyData="!selectedDateIsToday"
    :timeArray="timeArray"
    :heatDemandRealization="data.heatDemandRealization"
    :heatDemandConsumerForecast="data.heatDemandConsumerForecast"
    :heatDemandTotalForecast="heatDemandTotalForecast"
    :outsideTempRealization="data.outsideTempRealization"
    :outsideTempForecast="data.outsideTempForecast"
    @reset-heat-demand="data.heatDemandConsumerForecast = API.resetHeatDemand(selectedDate, selectedTime)"
    @reset-outside-temperature="data.outsideTempForecast = API.resetOutsideTemperature(selectedDate, selectedTime)"
    @changed-heat-demand-forecast="updateHeatDemandForecast"
    @changed-outside-temperature="updateOutsideTempForecast"
  />

  <!-- Optimize button component (handles the asynchronicity) -->
  <OptimizeButton v-if="selectedDateIsToday" :fetchResults="optimizePressed" />
  <br />

  <!-- The output of the optimizer (contains the simulator functionality too, but that cannot be abstracted) -->
  <OptimizerOutput
    v-if="data.optimized && !selectedDateIsInTheFuture"
    :selectedTime="selectedTime"
    :selectedDate="selectedDate"
    :time-array="timeArray"
    :productionUnitsData="data.productionUnitsData"
    :optimizer-violations="data.optimizerViolations"
    :selectedDateIsToday="selectedDateIsToday"
    @simulate-pressed="simulatePressed"
  />
</template>

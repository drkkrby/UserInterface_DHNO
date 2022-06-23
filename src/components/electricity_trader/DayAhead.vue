<!-- This component displays the day-ahead market data -->
<script lang="ts">
import { defineComponent } from 'vue'

import * as API from '../../api'
import * as Utils from '../../utils'

import HeatDemand from '../graphs/HeatDemand.vue'
import HeatDemTable from '../tables/HeatDemTable.vue'
import OutsideTempTable from '../tables/OutsideTempTable.vue'
import PriceEstimate from '../graphs/PriceEstimate.vue'
import OutsideTemp from '../graphs/OutsideTemp.vue'
import PriceEstimateTable from '../tables/PriceEstimateTable.vue'
import ElectricityProduction from '../graphs/ElectricityProduction.vue'
import OptimizeButton from '../grid_operator/OptimizeButton.vue'

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
      // All the data displayed on the page:
      data: API.fetchDayAheadData(this.selectedDate, this.selectedTime),

      // Component visibility:
      heatDemTableVisible: false,
      outsideTempTableVisible: false,
      priceEstimateTableVisible: false
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
      return Utils.heatDemandTotalForecast(this.data.heatDemand)
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
     * Used to hide certain components that are not visible for the future (for example: disables buttons in the graphs)
     * @returns true if the date is in the future and false otherwise.
     */
    selectedDateIsInTheFuture(): boolean {
      return Utils.isDateInTheFuture(this.selectedDate)
    }
  },
  methods: {
    /**
     * **Event handler** for when the `changed-heat-demand-forecast` event is emitted (in the heat demand table component).
     * Updates the values of the heat demand object.
     *
     * @param payload the event's payload, specifying the object key's index, array's index
     *                and the value it will be updated into.
     */
    updateHeatDemandForecast(payload: { keyIndex: number; index: number; value: number }): void {
      Object.values(this.data.heatDemand)[payload.keyIndex][payload.index] = payload.value
    },
    /**
     * **Event handler** for when the `changed-outside-temperature` event is emitted (in the outside temperature table component).
     * Updates the values of the outside temperature array.
     *
     * @param payload the event's payload, specifying the array's index that should be updated
     *                and the value it will be updated into.
     */
    updateOutsideTempForecast(payload: { index: number; value: number }): void {
      this.data.outsideTemp[payload.index] = payload.value
    },
    /**
     * **Event handler** for when the `changed-price` event is emitted (in the price estimate table component).
     * Updates the values of the price estimate array.
     *
     * @param payload the event's payload, specifying the array's index that should be updated
     *                and the value it will be updated into.
     */
    updatePriceEstimate(payload: { index: number; value: number }): void {
      this.data.electricityPriceEstimate[payload.index] = payload.value
    },
    /**
     * Toggles visibility of the heat demand table.
     */
    changeVisibilityHeatDemand(): void {
      if (!this.heatDemTableVisible) {
        this.outsideTempTableVisible = false
        this.priceEstimateTableVisible = false
        this.heatDemTableVisible = true
      } else {
        this.heatDemTableVisible = false
      }
    },
    /**
     * Toggles visibility of the outside temperature table.
     */
    changeVisibilityOutsideTemperature(): void {
      if (!this.outsideTempTableVisible) {
        this.heatDemTableVisible = false
        this.priceEstimateTableVisible = false
        this.outsideTempTableVisible = true
      } else {
        this.outsideTempTableVisible = false
      }
    },
    /**
     * Toggles visibility of the price estimate table.
     */
    changeVisibilityPriceEstimate(): void {
      if (!this.priceEstimateTableVisible) {
        this.outsideTempTableVisible = false
        this.heatDemTableVisible = false
        this.priceEstimateTableVisible = true
      } else {
        this.priceEstimateTableVisible = false
      }
    },
    /**
     * Fetches the optimizer's solution (optimal production plan) and updates the data variable
     * with the fetched values.
     */
    simulateElectricityProduction(): void {
      const [productionPlan, violations] = API.createElectricityProductionPlan(
        this.selectedDate,
        this.selectedTime,
        this.heatDemandTotalForecast,
        this.data.outsideTemp,
        this.data.electricityPriceEstimate
      )
      this.data.optimized = true
      this.data.optimizerViolations = violations
      this.data.electricityProduction = productionPlan
    },
    /**
     * Makes tables hidden
     */
    hideTables(): void {
      this.heatDemTableVisible = false
      this.outsideTempTableVisible = false
      this.priceEstimateTableVisible = false
    }
  },
  watch: {
    // If selected date changes fetch data and reset component variables:
    selectedDate(newDate, oldDate): void {
      this.data = API.fetchDayAheadData(newDate, this.selectedTime)
      this.heatDemTableVisible = false
      this.outsideTempTableVisible = false
      this.priceEstimateTableVisible = false
    },
    // If selected time changes fetch data and reset component variables:
    selectedTime(newTime, oldTime): void {
      this.data = API.fetchDayAheadData(this.selectedDate, newTime)
      this.heatDemTableVisible = false
      this.outsideTempTableVisible = false
      this.priceEstimateTableVisible = false
    }
  },

  components: {
    HeatDemand,
    HeatDemTable,
    OutsideTempTable,
    PriceEstimate,
    OutsideTemp,
    PriceEstimateTable,
    ElectricityProduction,
    OptimizeButton
  }
})
</script>

<template>
  <v-row>
    <!-- Heat demand component-->
    <v-col sm="12" md="4" align="center">
      <v-sheet elevation="2" rounded>
        <HeatDemand
          :heatDemandConsumerForecast="data.heatDemand"
          :heatDemandTotalForecast="heatDemandTotalForecast"
          :timeArray="timeArray"
          :readonly="!selectedDateIsInTheFuture"
          @table-view-heat-demand="changeVisibilityHeatDemand"
          @reset-heat-demand="data.heatDemand = API.resetHeatDemand(selectedDate, selectedTime)"
        />
      </v-sheet>
    </v-col>

    <!-- Outside Temperature component-->
    <v-col sm="12" md="4" align="center">
      <v-sheet elevation="2" rounded>
        <OutsideTemp
          :outside-temp-forecast="data.outsideTemp"
          :time-array="timeArray"
          :readonly="!selectedDateIsInTheFuture"
          @table-view-outside-temp="changeVisibilityOutsideTemperature"
          @reset-outside-temperature="data.outsideTemp = API.resetOutsideTemperature(selectedDate, selectedTime)"
        />
      </v-sheet>
    </v-col>

    <!-- Price Estimate component-->
    <v-col sm="12" md="4" align="center">
      <v-sheet elevation="2" rounded>
        <PriceEstimate
          :forecast="data.electricityPriceEstimate"
          :time-array="timeArray"
          :readonly="!selectedDateIsInTheFuture"
          @table-view-price-estimate="changeVisibilityPriceEstimate"
          @reset-price="data.electricityPriceEstimate = API.resetElectricityPriceEstimate(selectedDate, selectedTime)"
        />
      </v-sheet>
    </v-col>
  </v-row>

  <!-- Heat Demand Table -->
  <v-row>
    <v-col cols="12">
      <HeatDemTable
        v-if="heatDemTableVisible"
        :heat-demand-forecast="data.heatDemand"
        :heat-demand-total-forecast="heatDemandTotalForecast"
        :time-array="timeArray"
        @changed-heat-demand-forecast="updateHeatDemandForecast"
        @reset-heat-demand="data.heatDemand = API.resetHeatDemand(selectedDate, selectedTime)"
      />
    </v-col>
  </v-row>

  <!-- Outside Temp table -->
  <v-row>
    <v-col cols="12">
      <OutsideTempTable
        v-if="outsideTempTableVisible"
        :outside-temp-realization="[]"
        :outside-temp-forecast="data.outsideTemp"
        :time-array="timeArray"
        @changed-outside-temperature="updateOutsideTempForecast"
        @reset-temperature="data.outsideTemp = API.resetOutsideTemperature(selectedDate, selectedTime)"
      />
    </v-col>
  </v-row>

  <!-- Price Estimate Table -->
  <v-row>
    <v-col cols="12">
      <PriceEstimateTable
        v-if="priceEstimateTableVisible"
        :price-estimate="data.electricityPriceEstimate"
        :time-array="timeArray"
        :readonly="!selectedDateIsInTheFuture"
        @changed-price="updatePriceEstimate"
        @reset-price="data.electricityPriceEstimate = API.resetElectricityPriceEstimate(selectedDate, selectedTime)"
      />
    </v-col>
  </v-row>

  <!-- Optimize button -->
  <OptimizeButton v-if="selectedDateIsInTheFuture" :fetchResults="simulateElectricityProduction" />
  <br />

  <!-- Optimizer's solution, the optimal electricity production plan-->
  <v-row v-if="data.optimized && data.optimizerViolations === ''">
    <!-- To align the graph to the center -->
    <v-col sm="0" md="2"></v-col>
    <!-- Electricity Production component-->
    <v-col sm="12" md="8" align="center">
      <v-sheet rounded elevation="2">
        <ElectricityProduction
          :readonly="true"
          :electricity-production="data.electricityProduction"
          :time-array="timeArray"
        />
      </v-sheet>
    </v-col>
  </v-row>

  <v-row v-if="data.optimizerViolations != ''">
    <!-- Optimizer Violations -->
    <v-col cols="12">
      <v-alert border type="error" title="Optimizer error" icon="mdi-alert-circle" class="font-weight-light">
        {{ data.optimizerViolations }}
      </v-alert>
    </v-col>
  </v-row>
</template>

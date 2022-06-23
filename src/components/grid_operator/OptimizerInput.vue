<!-- This component displays the input of the grid operator (heat demand and outside temp. graphs and tables) -->
<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import HeatDemTable from '../../components/tables/HeatDemTable.vue'
import OutsideTemp from '../../components/graphs/OutsideTemp.vue'
import HeatDemand from '../../components/graphs/HeatDemand.vue'
import OutsideTempTable from '../../components/tables/OutsideTempTable.vue'

export default defineComponent({
  props: {
    // The selected starting time of the day:
    selectedTime: { required: true, type: Number }, //prop used only in it's watcher (to hide the tables if time is changed)
    // The selected date (to optimize):
    selectedDate: { required: true, type: Date }, //prop used only in it's watcher (to hide the tables if date is changed)

    // If the input is not editable:
    readonlyData: { required: true, type: Boolean },

    // Array representing 24 hours in a day starting at the selected time:
    timeArray: { required: true, type: Array as PropType<number[]> },
    // The realization of heat demand:
    heatDemandRealization: { required: true, type: Array as PropType<number[]> },
    // The consumer heat demand forecast:
    heatDemandConsumerForecast: { required: true, type: Object as PropType<Record<string, number[]>> },
    // The total computed heat demand:
    heatDemandTotalForecast: { required: true, type: Array as PropType<number[]> },
    // The realization of outside temperature:
    outsideTempRealization: { required: true, type: Array as PropType<number[]> },
    //The outside temperature forecast:
    outsideTempForecast: { required: true, type: Array as PropType<number[]> }
  },
  data() {
    return {
      // Visibility of table components:
      heatDemTableVisible: false,
      outsideTempTableVisible: false
    }
  },
  methods: {
    /**
     * Toggles visibility of the heat demand table.
     */
    changeVisibilityHeatDemand(): void {
      if (!this.heatDemTableVisible) {
        this.heatDemTableVisible = true
        // Make the other table (outside temp.) hidden so there's only one table visible at a time:
        this.outsideTempTableVisible = false
      } else {
        this.heatDemTableVisible = false
      }
    },
    /**
     * Toggles visibility of the outside temperature table.
     */
    changeVisibilityOutsideTemperature(): void {
      if (!this.outsideTempTableVisible) {
        this.outsideTempTableVisible = true
        // Make the other table (outside temp.) hidden so there's only one table visible at a time:
        this.heatDemTableVisible = false
      } else {
        this.outsideTempTableVisible = false
      }
    }
  },
  watch: {
    /**
     * Watches the selected date for changes. Hides the tables if the date is changed.
     */
    selectedDate(): void {
      this.heatDemTableVisible = false
      this.outsideTempTableVisible = false
    },
    /**
     * Watches the selected time for changes. Hides the tables if the time is changed.
     */
    selectedTime(): void {
      this.heatDemTableVisible = false
      this.outsideTempTableVisible = false
    }
  },

  components: { OutsideTemp, HeatDemand, HeatDemTable, OutsideTempTable }
})
</script>

<template>
  <v-container fluid fill-height>
    <v-row>
      <!-- Heat demand component-->
      <v-col sm="12" md="6" align="center">
        <v-sheet rounded color="white">
          <!-- v-bind propagates the emitted events to the parent (gridOperator view) -->
          <!-- Propagated events: 'reset-heat-demand' -->
          <HeatDemand
            :heat-demand-realization="heatDemandRealization"
            :heat-demand-consumer-forecast="heatDemandConsumerForecast"
            :heat-demand-total-forecast="heatDemandTotalForecast"
            :time-array="timeArray"
            :readonly="readonlyData"
            @table-view-heat-demand="changeVisibilityHeatDemand"
            v-bind="$attrs"
          />
        </v-sheet>
      </v-col>

      <!-- Outside Temperature component-->
      <v-col sm="12" md="6" align="center">
        <v-sheet rounded color="white">
          <!-- v-bind propagates the emitted events to the parent (gridOperator view) -->
          <!-- Propagated events: 'reset-outside-temperature' -->
          <OutsideTemp
            :outside-temp-realization="outsideTempRealization"
            :outside-temp-forecast="outsideTempForecast"
            :time-array="timeArray"
            :readonly="readonlyData"
            @table-view-outside-temp="changeVisibilityOutsideTemperature"
            v-bind="$attrs"
          />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Heat demand table component-->
    <v-row>
      <v-col cols="12">
        <!-- v-bind propagates the emitted events to the parent (gridOperator view) -->
        <!-- Propagated events: 'changed-heat-demand-forecast' -->
        <HeatDemTable
          v-if="heatDemTableVisible && !readonlyData"
          :heat-demand-forecast="heatDemandConsumerForecast"
          :heat-demand-total-forecast="heatDemandTotalForecast"
          :time-array="timeArray"
          data-test="Heat Demand Table"
          v-bind="$attrs"
        />
      </v-col>
    </v-row>

    <!-- Outside temperature table component -->
    <v-row>
      <v-col cols="12">
        <!-- v-bind propagates the emitted events to the parent (gridOperator view) -->
        <!-- Propagated events: 'changed-outside-temperature' -->
        <OutsideTempTable
          v-if="outsideTempTableVisible && !readonlyData"
          :outside-temp-realization="outsideTempRealization"
          :outside-temp-forecast="outsideTempForecast"
          :time-array="timeArray"
          data-test="Outside Temperature Table"
          v-bind="$attrs"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

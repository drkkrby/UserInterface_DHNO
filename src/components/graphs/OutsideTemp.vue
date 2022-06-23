<!-- This component displays the Outside temperature graph along with the 2 buttons beneath it. -->
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import LineChart from '../graphs/LineChart.vue'

import type { ScatterDataPoint, ChartDataset } from 'chart.js'

export default defineComponent({
  props: {
    // The realization:
    outsideTempRealization: { required: false, type: Array as PropType<number[]> },
    // The forecast:
    outsideTempForecast: { required: true, type: Array as PropType<number[]> },
    // The x-axis labels:
    timeArray: { required: true, type: Array as PropType<number[]> },
    // If the graph lines are not draggable:
    readonly: { required: false, type: Boolean, default: false }
  },
  computed: {
    /**
     * Creates the datasets to be used by chart js. Each entry represents y-axis values.
     * @returns an array containing the datasets.
     */
    plotDataSets(): ChartDataset<'line', (number | ScatterDataPoint | null)[]>[] {
      let datasets = []

      // Realization:
      // Only add it if it's provided (the prop is not required)
      if (this.outsideTempRealization) {
        datasets.push({
          label: 'Realization',
          backgroundColor: 'lime',
          borderColor: 'lime',
          data: this.outsideTempRealization,
          dragData: false // disables dragging for this line
        })
      }

      // Forecast:
      datasets.push({
        label: `Forecast`,
        backgroundColor: 'red',
        borderColor: 'red',
        data: this.outsideTempForecast,
        dragData: !this.readonly
      })
      return datasets
    }
  },
  components: { LineChart },
  emits: ['reset-outside-temperature', 'table-view-outside-temp']
})
</script>

<template>
  <!-- Vuetiy Grid -->
  <v-container class="" :fluid="true">
    <!-- Outside temperature graph -->
    <v-row>
      <v-col cols="12" align="center">
        <LineChart
          :title="'Outside Temperature'"
          :x_title="'Time (hour)'"
          :y_title="'Temperature (°C)'"
          :labels="timeArray"
          :datasets="plotDataSets"
        />
      </v-col>
    </v-row>

    <!-- Reset edits and edit buttons -->
    <v-row>
      <!-- Reset edits button -->
      <v-col cols="6" align="center">
        <v-btn
          :disabled="readonly"
          class="rounded-lg"
          variant="contained-text"
          :color="!readonly ? 'orange' : undefined"
          size="large"
          width="75%"
          data-test="Reset Edits"
          @click="$emit('reset-outside-temperature')"
        >
          Reset Edits
        </v-btn>
      </v-col>

      <!-- Table View button -->
      <v-col cols="6" align="center">
        <v-btn
          :disabled="readonly"
          class="rounded-lg"
          variant="contained-text"
          :color="!readonly ? 'blue' : undefined"
          size="large"
          width="75%"
          data-test="Outside Temperature Table View"
          @click="$emit('table-view-outside-temp')"
        >
          Table View
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

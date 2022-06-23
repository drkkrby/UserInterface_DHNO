<!-- This component displays the Electricity Production graph. -->
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import LineChart from './LineChart.vue'

import type { ScatterDataPoint, ChartDataset } from 'chart.js'

export default defineComponent({
  props: {
    // The electricity production array displayed
    electricityProduction: { required: true, type: Array as PropType<number[]> },
    // The X-axis labels
    timeArray: { required: true, type: Array as PropType<number[] | string[]> },
    // If the graph lines are not draggable
    readonly: { required: false, type: Boolean, default: false }
  },
  computed: {
    /**
     * Creates the datasets to be used by chart js. Each entry represents y-axis values.
     * @returns an array containing the datasets.
     */
    outputDataSets(): ChartDataset<'line', (number | ScatterDataPoint | null)[]>[] {
      let datasets = []

      // Electricity production:
      datasets.push({
        label: 'Electricity Production',
        backgroundColor: 'lime',
        borderColor: 'lime',
        data: this.electricityProduction,
        dragData: !this.readonly // disables dragging for this line
      })
      return datasets
    }
  },
  components: { LineChart }
})
</script>

<template>
  <!-- Vuetiy Grid -->
  <v-container class="" :fluid="true">
    <!-- Chart-->
    <v-row>
      <v-col cols="12" align="center">
        <LineChart
          :x_title="'Time (hour)'"
          :y_title="'Megawatts (MW)'"
          :title="'Electricity Production'"
          :labels="timeArray"
          :datasets="outputDataSets"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<!-- This component displays the Optimizer Output graphs. -->
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import LineChart from '../../components/graphs/LineChart.vue'

import type { ScatterDataPoint, ChartDataset } from 'chart.js'

export default defineComponent({
  props: {
    // The realization
    realization: { required: true, type: Array as PropType<number[]> },
    // The optimizer result
    optimized: { required: true, type: Array as PropType<number[]> },
    // The simulated result
    simulated: { required: true, type: Array as PropType<number[]> },
    // The X-axis title
    xTitle: { required: true, type: String },
    // The Y-axis title
    yTitle: { required: true, type: String },
    // The title of the graph
    title: { required: true, type: String },
    // The x-axis labels
    timeArray: { required: true, type: Array as PropType<number[]> },
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

      // Realization:
      datasets.push({
        label: 'Realization',
        backgroundColor: 'lime',
        borderColor: 'lime',
        data: this.realization,
        dragData: false // disables dragging for this line
      })
      // Simulated:
      datasets.push({
        label: `Simulated`,
        backgroundColor: '#76d7c4',
        borderColor: '#76d7c4',
        data: this.simulated,
        // Enable dragging the simulated values if the the graph displays the outlet temperature
        dragData: this.title === 'Outlet Temperature' ? !this.readonly : false
      })
      // Projection:
      datasets.push({
        label: `Optimized`,
        backgroundColor: 'red',
        borderColor: 'red',
        data: this.optimized,
        dragData: false // disables dragging for this line
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
        <LineChart :x_title="xTitle" :y_title="yTitle" :title="title" :labels="timeArray" :datasets="outputDataSets" />
      </v-col>
    </v-row>
  </v-container>
</template>

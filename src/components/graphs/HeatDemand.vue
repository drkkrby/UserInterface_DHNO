<!-- This component displays the Heat Demand graph along with the 2 buttons beneath it. -->
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import LineChart from '../../components/graphs/LineChart.vue'

import type { ScatterDataPoint, ChartDataset } from 'chart.js'

export default defineComponent({
  props: {
    // The realization:
    heatDemandRealization: { required: false, type: Array as PropType<number[]> },
    // The forecast (an object with heat demand per consumer):
    heatDemandConsumerForecast: { required: true, type: Object as PropType<Record<string, number[]>> },
    // The total (summed) forecast:
    heatDemandTotalForecast: { required: true, type: Array as PropType<number[]> },
    // The x-axis labels:
    timeArray: { required: true, type: Array as PropType<number[]> },
    // If the graph lines are not draggable:
    readonly: { required: false, type: Boolean, default: false }
  },
  computed: {
    /**
     * Creates the datasets to be used by chart js. Each entry represents y-axis values.
     * @returns an array containing all datasets.
     */
    plotDataSets(): ChartDataset<'line', (number | ScatterDataPoint | null)[]>[] {
      // different colors to be used for different consumer demands (each consumer takes a different color):
      let colors: string[] = ['#3399FF', '#9900FF', '#76D7C4', '#FF00FF', '#FFC800', '#f5b7b1', '#CCFFFF', '#FF6F00']
      let datasets = []

      // Total demand data:
      datasets.push({
        label: 'Total Demand',
        backgroundColor: 'red',
        borderColor: 'red',
        data: this.heatDemandTotalForecast,
        dragData: false // disables dragging for this line
      })

      // Realization:
      // Only add it if it's provided (the prop is not required)
      if (this.heatDemandRealization) {
        datasets.push({
          label: 'Realization',
          backgroundColor: 'lime',
          borderColor: 'lime',
          data: this.heatDemandRealization,
          dragData: false // disables dragging for this line
        })
      }

      // Consumers demand:
      // Iterate through heatConsumerForecast object entries:
      for (const [key, value] of Object.entries(this.heatDemandConsumerForecast)) {
        datasets.push({
          label: `${key}`, // key is the consumer's name
          backgroundColor: colors[datasets.length % colors.length], //take a color according to index
          borderColor: colors[datasets.length % colors.length],
          // don't hide industry datapoints or if the graph is on the electricity trader page,
          // (meaning the realization is not provided) then don't hide anything:
          hidden: key === 'Industrial' || !this.heatDemandRealization ? false : true,
          data: value,
          dragData: !this.readonly
        })
      }
      return datasets
    }
  },
  components: { LineChart },
  emits: ['reset-heat-demand', 'table-view-heat-demand']
})
</script>

<template>
  <!-- Vuetiy Grid -->
  <v-container :fluid="true">
    <!-- Heat demand graph -->
    <v-row>
      <v-col cols="12" align="center">
        <LineChart
          :title="'Heat Demand'"
          :x_title="'Time (hour)'"
          :y_title="'Heat Demand (MW)'"
          :labels="timeArray"
          :datasets="plotDataSets"
        />
      </v-col>
    </v-row>

    <!-- Reset edits and table view buttons -->
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
          @click="$emit('reset-heat-demand')"
          >Reset Edits</v-btn
        >
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
          @click="$emit('table-view-heat-demand')"
          data-test="Heat Demand Table View"
        >
          Table View
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

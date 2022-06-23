<!-- This component displays the Price Estimate graph along with the 2 buttons beneath it. -->
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import LineChart from '../graphs/LineChart.vue'

import type { ScatterDataPoint, ChartDataset } from 'chart.js'

export default defineComponent({
  props: {
    // The forecast from the optimizer
    forecast: { required: true, type: Array as PropType<number[]> },
    // The X-axis labels
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
      // Forecast:
      datasets.push({
        label: `Forecast`,
        backgroundColor: 'red',
        borderColor: 'red',
        data: this.forecast,
        dragData: !this.readonly
      })
      return datasets
    }
  },
  components: { LineChart },
  emits: ['reset-price', 'table-view-price-estimate']
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
          :y_title="'Euros per Megawatthour (€/MWh)'"
          :title="'Price Estimate'"
          :labels="timeArray"
          :datasets="outputDataSets"
        />
      </v-col>
    </v-row>

    <!-- Reset Edits and Table View buttons -->
    <v-row>
      <!-- Reset Edits -->
      <v-col cols="6" align="center">
        <v-btn
          :disabled="readonly"
          class="rounded-lg"
          variant="contained-text"
          :color="!readonly ? 'orange' : undefined"
          size="large"
          width="75%"
          data-test="Reset Edits"
          @click="$emit('reset-price')"
          >Reset Edits</v-btn
        >
      </v-col>

      <!-- Table View -->
      <v-col cols="6" align="center">
        <v-btn
          :disabled="readonly"
          class="rounded-lg"
          variant="contained-text"
          :color="!readonly ? 'blue' : undefined"
          size="large"
          width="75%"
          data-test="Edit"
          @click="$emit('table-view-price-estimate')"
          >Table View</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

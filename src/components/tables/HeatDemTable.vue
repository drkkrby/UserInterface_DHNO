<!-- Component that displays the heat demand table for both grid operator and electr. trader -->
<template>
  <v-container fluid fill-height>
    <h2 class="text-h4 font-weight-thin pb-3">Heat Demand</h2>

    <v-row>
      <v-col cols="12">
        <!-- THE TABLE FOR HEAT DEMAND -->
        <table class="tableForHeatDemand" border="1px solid black" width="100%" height="100%">
          <!-- The Time row -->
          <tr align="center">
            <td style="padding: 10px 0 10px 0"></td>

            <th v-for="n in 24" :key="n" style="padding: 10px 0 10px 0">{{ timeArray[n - 1] }}</th>
          </tr>

          <!-- The forecast rows -->
          <!-- Loops over different consumers -->
          <tr v-for="n in Object.keys(heatDemandForecast).length" :key="n" align="center">
            <th align="left" style="padding: 10px 0 10px 15px">{{ Object.keys(heatDemandForecast)[n - 1] }}</th>

            <!-- Loop over the time array cells -->
            <td class="editable" v-for="i in 24" :key="i">
              <v-tooltip position="absolute" activator="parent" location="bottom" open-delay="500">
                Heat demand value at {{ timeArray[i - 1] }}:00
              </v-tooltip>

              <input
                class="editable"
                :value="Object.values(heatDemandForecast)[n - 1][i - 1]"
                size="3"
                style="text-align: center"
                @change="changed(n - 1, i - 1, $event.target.value)"
              />
            </td>
          </tr>

          <!-- The total aggregated row -->
          <tr align="center" style="background-color: #edf0f8">
            <th align="left" style="padding: 10px 0 10px 15px">Total</th>

            <td class="noteditable" v-for="n in 24" :key="n" style="text-align: center">
              <!-- onHover functionality displaying the time -->
              <v-tooltip position="absolute" activator="parent" location="bottom" open-delay="500">
                Total heat demand value at {{ timeArray[n - 1] }}:00
              </v-tooltip>

              <!-- Total heat demand values -->
              {{ heatDemandTotalForecast[n - 1] }}
            </td>
          </tr>
        </table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    // The forecasted heat demand
    heatDemandForecast: { required: true, type: Object as PropType<Record<string, number[]>> },
    // Total heat demand
    heatDemandTotalForecast: { required: true, type: Array as PropType<number[]> },
    // Array representing 24 hours in a day starting at the selected time
    timeArray: { required: true, type: Array as PropType<number[]> }
  },

  methods: {
    /** Emits the changes made in the table.
     * @param typeIndex is the consumer's index in the record<string, number[]> object
     * @param i is the index of the column or the heat demand array
     * @param changedValue is the new updated value
     */
    changed(typeIndex: number, i: number, changedValue: string): void {
      this.$emit('changed-heat-demand-forecast', { keyIndex: typeIndex, index: i, value: +changedValue })
    }
  },
  emits: ['changed-heat-demand-forecast']
})
</script>
<style scoped>
/* Basic styling of the table */
table {
  background-color: white;
}
td {
  cursor: auto;
}

/* 
* changes the cursor when the cursor is on the cells
*/
.editable {
  cursor: cell;
}

/**
 * changes the background of the editable cell onHover
 */
.editable:hover {
  background-color: #cee9ff;
}

/**
 * changes the cursor of the non-editable cell onHover
 */
.noteditable {
  cursor: not-allowed;
}
</style>

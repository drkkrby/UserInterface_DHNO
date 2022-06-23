<!-- Component that displays the outside temperature table for both grid operator and electr. trader -->
<template>
  <v-container fluid fill-height>
    <h2 class="text-h4 font-weight-thin pb-3">Outside Temperature</h2>
    <!-- Table -->
    <v-row>
      <v-col cols="12">
        <table border="1px solid black" width="100%" height="100%">
          <!-- the displayed times -->
          <tr align="center">
            <td style="padding: 10px 0 10px 0">&nbsp;</td>

            <th v-for="n in 24" :key="n">{{ timeArray[n - 1] }}</th>
          </tr>

          <!-- the forecasted values of outside temperature -->
          <tr align="center">
            <th style="padding: 10px 0 10px 0">Forecast</th>

            <!-- this loops the values per timeInterval -->
            <td v-for="n in 24" :key="n" class="editable">
              <!-- onHover functionality displaying the time -->
              <v-tooltip position="absolute" activator="parent" location="bottom" open-delay="500">
                Forecasted outside temperature at {{ timeArray[n - 1] }}:00
              </v-tooltip>

              <!-- the forecasted outside temperature values -->
              <input
                class="editable"
                id="projection"
                :value="outsideTempForecast[n - 1]"
                size="3"
                style="text-align: center"
                @change="changed($event.target.value, n)"
              />
            </td>
          </tr>

          <!-- the realization values of outside temperature -->
          <tr v-if="outsideTempRealization.length > 0" align="center" style="background-color: #edf0f8">
            <!-- the realization values of outside temperature -->
            <th style="padding: 10px 0 10px 0">Realization</th>

            <td v-for="n in 24" :key="n" class="noteditable" contenteditable="false">
              <!-- onHover functionality displaying the time -->
              <v-tooltip position="absolute" activator="parent" location="bottom" open-delay="500">
                Outside temperature at {{ timeArray[n - 1] }}:00
              </v-tooltip>

              <!-- the realization values -->
              <div>{{ outsideTempRealization[n - 1] }}</div>
            </td>
          </tr>
        </table>
      </v-col>
    </v-row>
  </v-container>
  <!--End of table-->
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    // The realized values of outside temperature
    outsideTempRealization: { required: true, type: Array as PropType<number[]> },
    // The forecasted values of outside temperature
    outsideTempForecast: { required: true, type: Array as PropType<number[]> },
    // Array representing 24 hours in a day starting at the selected time
    timeArray: { required: true, type: Array as PropType<number[]> }
  },
  methods: {
    /**
     * Emits an event to both dayAhead and optimizerInput components with a payload containing an
     * array index and the new value to be set at that index.
     * The components then listen for this event and update the array.
     * @param event event emitted by editing the table value, you can access the value it changed to by using event.target.value
     * @param n the index where the change was made, using -1 here since the table starts at 1 but the index of the array starts at 0
     */
    changed(event: string, n: number): void {
      this.$emit('changed-outside-temperature', { index: n - 1, value: +event })
    }
  },
  emits: ['changed-outside-temperature']
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
.autohover {
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

<!-- Component that displays the electricity production table in the intraday component -->
<template>
  <v-container fluid fill-height>
    <h2 class="text-h4 font-weight-thin pb-3">Electricity Production</h2>
    <!-- Table -->
    <v-row>
      <v-col cols="12">
        <!-- The hours row -->
        <table border="1px solid black" width="100%" height="100%">
          <tr align="center">
            <th style="padding: 10px">Time</th>

            <th v-for="n in 24" :key="n">
              {{ timeArray[n - 1] }}
            </th>
          </tr>

          <!-- the minute intervals [00,15,30,45] rows-->
          <tr v-for="i in 4" :key="i" align="center">
            <th style="padding: 10px">{{ minuteIntervals[i - 1] }}</th>

            <td v-for="n in 24" :key="n" class="editable">
              <!-- onHover functionality displaying the time -->
              <v-tooltip position="absolute" activator="parent" location="bottom" open-delay="500">
                Production value at {{ timeArray[n - 1] }}{{ minuteIntervals[i - 1] }}
              </v-tooltip>

              <!-- the production array values -->
              <input
                class="editable"
                :value="electricityPlan[(n - 1) * 4 + i - 1]"
                id="projection"
                size="3"
                style="text-align: center"
                @change="changed($event.target.value, (n - 1) * 4 + i - 1)"
              />
            </td>
          </tr>
        </table>
      </v-col>
    </v-row>
    <!--End of table-->

    <!-- Button for resetting edits -->
    <v-row>
      <v-col cols="2">
        <v-btn class="rounded-lg" variant="contained-text" color="orange" size="large" width="100%" @click="resetEdits">
          Reset Edits
        </v-btn>
      </v-col>

      <!-- Button for checking feasibility -->
      <v-col cols="2">
        <v-btn
          class="rounded-lg"
          variant="contained-text"
          color="green"
          size="large"
          width="100%"
          @click="checkFeasibility"
        >
          Check Feasibility
        </v-btn>
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    // Array representing 24 hours in a day starting at the selected time
    timeArray: { required: true, type: Array as PropType<number[]> },

    // Electricity production plan array
    electricityPlan: { required: true, type: Array as PropType<number[]> }
  },
  data() {
    return {
      minuteIntervals: [':00', ':15', ':30', ':45']
    }
  },
  methods: {
    /**
     * Emits an event to the intraday file with an attached object with one index and a value.
     * The intraday file then listens for this event and updates the array at the attached indices with the attached value.
     * @param changedValue the changed value
     * @param n the index where the change was made
     */
    changed(changedValue: string, n: number): void {
      this.$emit('changed-electricity-production', { index: n, value: +changedValue })
    },
    /**
     * Emits an event to the intraday file to reset to the API values and discard any changes made
     */
    resetEdits(): void {
      this.$emit('reset-electricity-production')
    },
    /**
     * Emits an event to the intraday file to display the feasibility of the current electricityproduction plan
     */
    checkFeasibility(): void {
      this.$emit('check-feasibility')
    }
  },
  emits: ['changed-electricity-production', 'reset-electricity-production', 'check-feasibility']
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

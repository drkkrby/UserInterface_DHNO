<!-- Component that displays the outlet temperature table inside the optimizer input component -->
<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12">
        <table class="tableForOutletTempTable" border="1px solid black" width="100%" height="100%">
          <tr align="center">
            <!-- Hours -->
            <td class="firstRowColumn" style="padding: 10px 0 10px 0"></td>

            <!-- Time row -->
            <th v-for="n in 24" :key="n" size="3" style="padding: 10px 0 10px 0">{{ timeArray[n - 1] }}</th>
          </tr>

          <tr align="center" style="background-color: #edf0f8">
            <!-- Optimal array, uneditable -->
            <th align="left" style="padding: 10px 0 10px 15px">Optimal</th>

            <td class="noteditable" v-for="n in 24" :key="n" size="3">
              <!-- onHover functionality displaying the time -->
              <v-tooltip position="absolute" activator="parent" location="bottom" open-delay="500">
                Optimal outlet temperature at {{ timeArray[n - 1] }}:00
              </v-tooltip>

              <!-- Optimal array values -->
              {{ outtemp.optimal[n - 1] }}
            </td>
          </tr>

          <tr align="center" style="background-color: #edf0f8">
            <!-- Realization array, uneditable -->
            <th align="left" style="padding: 10px 0 10px 15px">Realization</th>

            <td class="noteditable" v-for="n in 24" :key="n" size="3">
              <!-- onHover functionality displaying the time -->
              <v-tooltip position="absolute" activator="parent" location="bottom" open-delay="500">
                Outlet temperature at {{ timeArray[n - 1] }}:00
              </v-tooltip>

              <!-- Realization array values -->
              {{ outtemp.realization[n - 1] }}
            </td>
          </tr>

          <tr align="center">
            <!-- Simulated array, editable -->
            <th align="left" style="padding: 10px 0 10px 15px">Simulated</th>

            <td class="editable" v-for="n in 24" :key="n" size="3">
              <!-- onHover functionality displaying the time -->
              <v-tooltip position="absolute" activator="parent" location="bottom" open-delay="500">
                Simulated outlet temperature at {{ timeArray[n - 1] }}:00
              </v-tooltip>

              <!-- Simulated array values -->
              <input
                class="editable"
                :value="outtemp.simulated[n - 1]"
                size="3"
                style="text-align: center"
                @change="changed($event.target.value, n)"
              />
            </td>
          </tr>
        </table>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <!-- button for reseting edits -->
        <v-btn
          align="center"
          style="padding: 10px 0 10px 0"
          class="rounded-lg px-14"
          variant="contained-text"
          color="orange"
          size="large"
          @click="resetEdits"
          >Reset Edits
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { ParameterData } from '../../api/datatypes'

export default defineComponent({
  props: {
    // Outlet temperature array
    outtemp: { required: true, type: Object as PropType<ParameterData> },

    // Array representing 24 hours in a day starting at the selected time
    timeArray: { required: true, type: Array as PropType<number[]> }
  },
  methods: {
    /**
     * Emits event with the changed outlet temperature index and the new value at that index.
     * @param changedValue is the changed value for simulated. It is the inputted value
     * @param index is the index of the changed cell.
     */
    changed(changedValue: string, index: number): void {
      this.$emit('changed-outlet-temperature', { index: index - 1, value: +changedValue })
    },
    /**
     * Emits event for resetting the edits of simulated values
     */
    resetEdits(): void {
      this.$emit('reset-outlet-temperature')
    }
  },
  emits: ['changed-outlet-temperature', 'reset-outlet-temperature']
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

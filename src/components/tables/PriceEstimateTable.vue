<!-- Component that displays the price estimate table inside the dayAhead component -->
<template>
  <v-container fluid fill-height>
    <h2 class="text-h4 font-weight-thin pb-3">Price Estimate</h2>
    <!-- Table -->
    <v-row>
      <v-col cols="12">
        <table border="1px solid black" width="100%" height="100%">
          <!-- The Time row -->
          <tr align="center">
            <td style="padding: 10px 0 10px 0">&nbsp;</td>

            <th v-for="n in 24" :key="n">{{ timeArray[n - 1] }}</th>
          </tr>

          <!-- Price estimate row -->
          <tr align="center">
            <th style="padding: 10px 0 10px 0">Estimate</th>

            <td v-for="n in 24" :key="n" class="editable">
              <!-- onHover functionality to display the time -->
              <v-tooltip position="absolute" activator="parent" location="bottom" open-delay="500">
                Price estimate at {{ timeArray[n - 1] }}:00
              </v-tooltip>

              <!-- The price estimate array values-->
              <input
                class="editable"
                id="estimate"
                :value="priceEstimate[n - 1]"
                size="3"
                style="text-align: center"
                @change="changed($event.target.value, n)"
              />
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
    // The price estimate array
    priceEstimate: { required: true, type: Array as PropType<number[]> },
    // Array representing 24 hours in a day starting at the selected time
    timeArray: { required: true, type: Array as PropType<number[]> }
  },
  methods: {
    /**
     * Emits an event to the dayAhead component with an attached payload containing an index and value.
     * The dayAhead component listens for this event and updates the array.
     * @param changedValue is the value changed
     * @param n the index where the change was made, using -1 here since the table starts at 1 but the index of the array starts at 0
     */
    changed(changedValue: string, n: number): void {
      this.$emit('changed-price', { index: n - 1, value: +changedValue })
    }
  },
  emits: ['changed-price']
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

<!-- This component displays the intraday market data -->
<script lang="ts">
import { defineComponent } from 'vue'

import * as API from '../../api'

import ElectricityProductionTable from '../tables/ElectricityProductionTable.vue'
import ElectricityProduction from '../graphs/ElectricityProduction.vue'

export default defineComponent({
  data() {
    return {
      API,
      // All the data displayed on the page:
      data: API.fetchIntradayData()
    }
  },
  computed: {
    /**
     * Array representing 24 hours in a day starting from 00:00
     */
    timeArray(): number[] {
      return Array.from(Array(24).keys())
    }
  },
  methods: {
    /**
     * **Event handler** for when the `changed-electricity-production` event is emitted (in the electricity production table component).
     * Updates the values of the electricity production array.
     *
     * @param payload the event's payload, specifying the array's index that should be updated
     *                and the value it will be updated into.
     */
    updateElectricityProduction(payload: { index: number; value: number }): void {
      this.data.electricityProduction[payload.index] = payload.value
    }
  },
  components: { ElectricityProductionTable, ElectricityProduction }
})
</script>

<template>
  <v-container fluid fill height>
    <v-row>
      <!-- To align the graph to the center -->
      <v-col sm="0" md="2"></v-col>
      <!-- Electricity Production chart-->
      <v-col sm="12" md="8" align="center">
        <v-sheet rounded elevation="2">
          <ElectricityProduction
            :electricity-production="data.electricityProduction"
            :time-array="
              timeArray
                .map((x) => x.toString())
                .map((x) => [x + ':00', x + ':15', x + ':30', x + ':45'])
                .flat()
            "
          />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Electricity production table -->
    <v-row>
      <v-col cols="12">
        <ElectricityProductionTable
          :time-array="timeArray"
          :electricity-plan="data.electricityProduction"
          @changed-electricity-production="updateElectricityProduction"
          @reset-electricity-production="data.electricityProduction = API.resetElectricityProduction()"
          @check-feasibility="data.feasible = API.checkFeasibility(data.electricityProduction)"
        />

        <!-- Feasibility status -->
        <!-- If data.feasible is undefined then the user didn't press the 'check feasibility' button -->
        <v-container class="" :fluid="true" v-if="data.feasible !== undefined">
          <!-- Feasible -->
          <v-alert v-if="data.feasible" border type="success" title="Feasible" data-test="feasible"></v-alert>
          <!-- Not feasible -->
          <v-alert v-else border type="warning" title="Not feasible" data-test="notFeasible"></v-alert>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

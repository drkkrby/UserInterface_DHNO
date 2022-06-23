<!-- This component displays the optimizer output for the grid operator (everything that follows the optimize button in the page)-->
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { ParameterData, ProductionUnitData } from '../../api/datatypes'
import SimulationViolations from '../../components/grid_operator/SimulationViolations.vue'
import OutletTempTable from '../../components/tables/OutletTempTable.vue'
import OptimizerOutputGraph from '../../components/graphs/OptimizerOutputGraph.vue'
import { mdiAlertCircle } from '@mdi/js'

export default defineComponent({
  data() {
    return {
      // V-select dropdown index (index of the selected chp unit):
      selectedProductionUnit: 0,
      // Outlet temp. table component visibility:
      outletTempTableVisible: false,
      mdiAlertCircle
    }
  },

  props: {
    // The selected starting time of the day:
    selectedTime: { required: true, type: Number },
    // The selected date (to optimize):
    selectedDate: { required: true, type: Date },
    // If the date selected is 'today':
    selectedDateIsToday: { required: true, type: Boolean },

    // Array representing 24 hours in a day starting at the selected time:
    timeArray: { required: true, type: Array as PropType<number[]> },
    // Array representing optimizer data for all production units:
    productionUnitsData: { required: true, type: Array as PropType<ProductionUnitData[]> },
    // The violations returned by the optimizer, empty string meaning no violations:
    optimizerViolations: { required: true, type: String }
  },

  computed: {
    /**
     * Empty parameter data object, used in the following computed properties.
     * (used as a safety check - if the selected chp unit doesn't exits, return this empty parameter object)
     */
    emptyParameterData(): ParameterData {
      return { optimal: [], realization: [], simulated: [] }
    },
    /**
     * Get the name of each production unit in an array.
     * Used for displaying the production units names inside the v-select dropdown:
     */
    productionUnits_strings(): string[] {
      return this.productionUnitsData.map((x) => x.productionUnit)
    },
    /**
     * Used as 'default' option for v-select dropdown:
     */
    selectedProductionUnitString(): string {
      return this.productionUnits_strings[this.selectedProductionUnit]
    },
    /**
     * Outlet temperature as ParameterData which includes optimal, realization and simulated
     * Safety checks whether the v-select index exists is valid in the productionUnitsData array.
     */
    outletTemperature(): ParameterData {
      return this.selectedProductionUnit in this.productionUnitsData
        ? this.productionUnitsData[this.selectedProductionUnit].outletTemperature
        : this.emptyParameterData //empty object if index is out of bounds
    },
    /**
     * Electricity production as ParameterData which includes optimal, realization and simulated
     * Safety checks whether the v-select index exists is valid in the productionUnitsData array.
     */
    electricityProduction(): ParameterData {
      return this.selectedProductionUnit in this.productionUnitsData
        ? this.productionUnitsData[this.selectedProductionUnit].electricityProduction
        : this.emptyParameterData //empty object if index is out of bounds
    },
    /**
     * Massflow as ParameterData which includes optimal, realization and simulated
     * Safety checks whether the v-select index exists is valid in the productionUnitsData array.
     */
    massFlow(): ParameterData {
      return this.selectedProductionUnit in this.productionUnitsData
        ? this.productionUnitsData[this.selectedProductionUnit].massFlow
        : this.emptyParameterData //empty object if index is out of bounds
    },
    /**
     * Inlet temperature as ParameterData which includes optimal, realization and simulated
     * Safety checks whether the v-select index exists is valid in the productionUnitsData array.
     */
    inletTemperature(): ParameterData {
      return this.selectedProductionUnit in this.productionUnitsData
        ? this.productionUnitsData[this.selectedProductionUnit].inletTemperature
        : this.emptyParameterData //empty object if index is out of bounds
    },
    /**
     * Triggers visibility for the optimizer violations
     */
    optimizerViolationsVisible(): boolean {
      // if the violations string is empty then there are no violations:
      return this.optimizerViolations !== ''
    },
    /**
     *  Triggers visibility for simulation violations
     */
    simulationViolationsVisible(): boolean {
      // If the simulator violations is undefined then there was no simulation happening
      // (if it's empty string then there are no violations for the last simulation)
      return this.productionUnitsData[this.selectedProductionUnit].simulatorViolations !== undefined
    }
  },

  methods: {
    /**
     * Displays the default values for the outlet temperature simulated line.
     * When 'tweak solution' is pressed, this method copies the optimal outlet temp. array (so the user can 'tweak' it)
     */
    displayOutletTemperatureValues(): void {
      // Only do so when the simulated array is empty (meaning the user didn't simulate before)
      if (this.outletTemperature.simulated.length == 0) {
        // Copy the optimal outlet temp. so the user can tweak the suggested solution:
        this.outletTemperature.simulated = JSON.parse(JSON.stringify(this.outletTemperature.optimal))
      }
    },
    /**
     * **Event handler** for when the `changed-outlet-temperature` event is emitted (in the outlet temp. table component).
     * Updates the values of the outlet temperature array.
     *
     * @param payload the event's payload, specifying the array's index that should be updated
     *                and the value it will be updated into.
     */
    updateOutletTemp(payload: { index: number; value: number }): void {
      this.outletTemperature.simulated[payload.index] = payload.value
    },
    /**
     * Resets the simulated outlet temperature values back to the optimal outlet temperature.
     */
    resetOutletTemperature(): void {
      for (let i = 0; i <= 23; i++) {
        this.outletTemperature.simulated[i] = this.outletTemperature.optimal[i]
      }
    },
    /**
     * Emits event to the gridOperator view component to simulate.
     * Adds a payload with the selected production unit index.
     */
    simulatePressed(): void {
      this.$emit('simulate-pressed', {
        productionUnitIndex: this.selectedProductionUnit
      })
    }
  },
  watch: {
    // watches the selected date for changes
    selectedDate(newDate, oldDate): void {
      // Reset the selected unit index and hide the outlet temperature:
      this.selectedProductionUnit = 0
      this.outletTempTableVisible = false
    },
    // watches the selected time for changes
    selectedTime(newTime, oldTime): void {
      // Reset the selected unit index and hide the outlet temperature:
      this.selectedProductionUnit = 0
      this.outletTempTableVisible = false
    }
  },
  components: { OutletTempTable, SimulationViolations, OptimizerOutputGraph },
  emits: ['simulate-pressed']
})
</script>

<template>
  <!-- Optimizer violations -->
  <v-container fluid fill-height v-show="optimizerViolationsVisible">
    <v-row>
      <v-col cols="12">
        <v-alert border type="error" title="Optimizer error" :icon="mdiAlertCircle" class="font-weight-light">
          {{ optimizerViolations }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>

  <!-- Optimizer result -->
  <v-container fluid fill-height v-if="!optimizerViolationsVisible">
    <!-- Result text -->
    <v-row>
      <v-col cols="12" align="left">
        <div class="text-h2 pl-3">Result</div>
        <br />
      </v-col>
    </v-row>

    <!-- Select field -->
    <v-row>
      <v-col cols="12" class="pl-6">
        <v-select
          v-model="selectedProductionUnitString"
          :items="productionUnits_strings"
          label="Production unit"
          return-object
          single-line
          width="40 px"
          @update:model-value="
            (selectedValue) => {
              selectedProductionUnit = productionUnits_strings.findIndex((x) => x === selectedValue)
              outletTempTableVisible = false
            }
          "
        />
        <br />
      </v-col>
    </v-row>

    <v-row>
      <!-- Outlet temperature chart-->
      <v-col sm="12" md="6" align="center">
        <v-row>
          <v-col>
            <v-sheet rounded color="white">
              <OptimizerOutputGraph
                :realization="outletTemperature.realization"
                :optimized="outletTemperature.optimal"
                :simulated="outletTemperature.simulated"
                :x-title="'Time (hour)'"
                :y-title="'Temperature (°C)'"
                :title="'Outlet Temperature'"
                :time-array="timeArray"
                :readonly="!selectedDateIsToday"
              />
            </v-sheet>
          </v-col>
        </v-row>

        <!-- Tweak solution button -->
        <v-row>
          <v-col cols="6">
            <v-btn
              :disabled="!selectedDateIsToday"
              @click="
                () => {
                  outletTempTableVisible = !outletTempTableVisible
                  displayOutletTemperatureValues()
                }
              "
              class="rounded-lg px-14"
              variant="contained-text"
              :color="selectedDateIsToday ? 'blue' : undefined"
              size="large"
              width="80%"
            >
              Tweak solution
            </v-btn>
          </v-col>

          <!-- Simulate button -->
          <v-col cols="6">
            <v-btn
              :disabled="!selectedDateIsToday"
              align="center"
              style="padding: 10px 0 10px 0"
              class="rounded-lg px-14"
              variant="contained-text"
              :color="selectedDateIsToday ? 'green' : undefined"
              size="large"
              width="80%"
              @click="simulatePressed"
            >
              Simulate
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <!-- Electricity production chart-->
      <v-col sm="12" md="6" align="center">
        <v-sheet rounded color="white">
          <OptimizerOutputGraph
            :realization="electricityProduction.realization"
            :optimized="electricityProduction.optimal"
            :simulated="electricityProduction.simulated"
            :x-title="'Time (hour)'"
            :y-title="'Production (MW)'"
            :title="'Electricity Production'"
            :time-array="timeArray"
            :readonly="true"
          />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Tweak solution table-->
    <v-row>
      <v-col cols="12">
        <!-- Table here -->
        <outlet-temp-table
          v-if="outletTempTableVisible"
          :outtemp="outletTemperature"
          :time-array="timeArray"
          @changed-outlet-temperature="updateOutletTemp"
          @reset-outlet-temperature="resetOutletTemperature"
        />
      </v-col>
    </v-row>

    <v-row>
      <!-- Mass flow chart -->
      <v-col sm="12" md="6" align="center">
        <v-sheet rounded color="white">
          <OptimizerOutputGraph
            :realization="massFlow.realization"
            :optimized="massFlow.optimal"
            :simulated="massFlow.simulated"
            :x-title="'Time (hour)'"
            :y-title="'Flow Rate (m/s)'"
            :title="'Mass Flow'"
            :time-array="timeArray"
            :readonly="true"
          />
        </v-sheet>
      </v-col>

      <!-- Inlet temperature chart -->
      <v-col sm="12" md="6" align="center">
        <v-sheet rounded color="white">
          <OptimizerOutputGraph
            :realization="inletTemperature.realization"
            :optimized="inletTemperature.optimal"
            :simulated="inletTemperature.simulated"
            :x-title="'Time (hour)'"
            :y-title="'Temperature (°C)'"
            :title="'Inlet Temperature'"
            :time-array="timeArray"
            :readonly="true"
          />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Simulation violations -->
    <v-row v-if="simulationViolationsVisible">
      <v-col cols="12">
        <SimulationViolations
          :violations="
          // Because violations can be undefined, not casting it shows error in the editor
          // Type casting from undefined to string[] won't cause issues, because 
          // this component wouldn't be rendered when violations = undefined
            productionUnitsData[selectedProductionUnit].simulatorViolations as string[]
          "
        />
      </v-col>
    </v-row>
  </v-container>
</template>

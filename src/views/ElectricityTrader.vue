<!-- This component displays the entire Electricity Trader page. -->
<script lang="ts">
import { defineComponent } from 'vue'

import IntraDay from '../components/electricity_trader/IntraDay.vue'
import DayAhead from '../components/electricity_trader/DayAhead.vue'

export default defineComponent({
  props: {
    // The selected starting time of the day:
    selectedTime: { required: true, type: Number },
    // The selected date (to optimize):
    selectedDate: { required: true, type: Date }
  },
  data() {
    return {
      // The first panel (Day Ahead) is expanded by default: (used on v-expansion-panels v-model)
      expandedPanels: [0]
    }
  },
  // The two components in the electricity trader view:
  components: { IntraDay, DayAhead }
})
</script>

<template>
  <!-- The 1st half of the page, Day Ahead expansion panel and the component -->
  <v-col sm="12" md="12" align="auto">
    <v-expansion-panels :multiple="true" v-model="expandedPanels">
      <v-expansion-panel class="rounded-xl">
        <!-- Panel title -->
        <v-expansion-panel-title>
          <h1 class="panel-title font-weight-light text-h4">Day Ahead Market</h1>
        </v-expansion-panel-title>

        <!-- Should be v-expansion-panel-content but at the current time it wasn't released in vuetify 3 beta -->
        <!-- TODO: change this to -content once it becomes available -->
        <v-expansion-panel-text :eager="true">
          <!-- Day Ahead component -->
          <DayAhead :selectedTime="selectedTime" :selectedDate="selectedDate" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <br />

    <!-- The 2nd half of the page, IntraDay expansion panel and the component -->
    <v-expansion-panels>
      <v-expansion-panel class="rounded-xl override-border">
        <!-- Panel title -->
        <v-expansion-panel-title>
          <h1 class="panel-title font-weight-light text-h4">Intraday Market</h1>
        </v-expansion-panel-title>

        <!-- Should be v-expansion-panel-content but at the current time it wasn't released in vuetify 3 beta -->
        <!-- TODO: change this to -content once it becomes available -->
        <v-expansion-panel-text :eager="true">
          <!-- Intraday component -->
          <IntraDay />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-col>
</template>

<style>
/* Padding for the panel titles */
.panel-title {
  padding: 10px;
}

/* No shadow */
.v-expansion-panel__shadow {
  box-shadow: none !important;
}

/* Override vuetify styling for expansion panel title color */
.v-expansion-panel-title--active:hover.v-expansion-panel-title__overlay,
.v-expansion-panel-title--active .v-expansion-panel-title__overlay {
  color: white;
}

/* Margins for the panel content */
.v-expansion-panel-text {
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>

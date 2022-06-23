<!-- Component that displays the violations of the simulator (in the optimizerOutput.vue) -->
<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    // Violations list that gets displayed
    violations: { required: true, type: Array as PropType<string[]> }
  },

  computed: {
    // Returns a boolean indicating whether there is a violation or not.
    hasViolations(): boolean {
      if (this.violations.length == 0) {
        return false
      } else {
        return true
      }
    }
  }
})
</script>

<template>
  <v-container :fluid="true">
    <!-- Alert for having violations -->
    <v-alert v-if="hasViolations" border type="warning" title="Simulation violations">
      <ul v-for="violation in violations" v-bind:key="violation">
        <li>{{ violation }}</li>
      </ul>
    </v-alert>

    <!-- Alert for having no violations -->
    <v-alert v-else border type="success" title="Simulation violations"> No violations </v-alert>
  </v-container>
</template>

<!-- Component that displays the optimize button and deals with it's asynchronocity -->
<template>
  <v-row>
    <v-col md="5" sm="2"></v-col>
    <!-- Optimize button-->
    <v-col md="2" sm="8" align="center">
      <v-btn
        class="rounded-lg"
        variant="outlined"
        :color="optimizeColor"
        size="large"
        width="75%"
        :disabled="optimizerIsRunning"
        @click="optimizePressed(3)"
        >Optimize
      </v-btn>
    </v-col>
  </v-row>

  <v-row>
    <v-col align="center">
      <!-- Progress circle -->
      <v-progress-circular class="progress" v-if="optimizerIsRunning" :indeterminate="true" color="orange" size="30" />

      <!-- Optimization timer text-->
      <div class="optimization-text">{{ timer }}</div>

      <!-- Cancel button -->
      <div
        class="optimization-text"
        style="color: red; cursor: pointer"
        v-if="optimizerIsRunning"
        @click="cancelOptimization"
      >
        Cancel
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      // timer text string:
      timer: '',

      optimizationCancelled: false,
      optimizeColor: 'green',
      optimizerIsRunning: false
    }
  },

  props: {
    // Callback function that gets executed once the timer runs out:
    fetchResults: { required: true, type: Function }
  },

  methods: {
    /**
     * Helper method used to delay execution of code for the specified ms.
     * @param ms the delay in milliseconds
     */
    async delay(ms: number): Promise<void> {
      await new Promise((resolve) => setTimeout(resolve, ms))
    },
    /**
     * Asynchronous method that mocks the optimization process.
     * @param seconds the number of seconds to have the mock optimization take
     */
    async optimizePressed(seconds: number) {
      // is used to determine whether to show progress bar, cancel text and whether to disable the optimize button
      this.optimizerIsRunning = true
      this.timer = 'Optimizer running: 0 seconds...'
      this.optimizeColor = 'grey'
      for (let i = 1; i <= seconds; i++) {
        if (this.optimizationCancelled) {
          this.optimizationCancelled = false
          this.optimizerIsRunning = false
          this.timer = 'Optimization cancelled'
          this.optimizeColor = 'green'
          return
        }
        await this.delay(1000).then(() => (this.timer = 'Optimizer running: ' + i.toString() + ' seconds...'))
      }

      try {
        //method from prop, differs for both day ahead and grid operator file
        await this.fetchResults()
        this.timer = 'Optimization complete'
      } catch (error) {
        this.timer = 'Error! Could not reach the API.'
      }
      this.optimizerIsRunning = false
      this.optimizeColor = 'green'
    },

    /**
     * Cancels optimization process by updating a boolean
     * that is checked for in every loop in the optimization method.
     */
    cancelOptimization(): void {
      this.optimizationCancelled = true
    }
  }
})
</script>

<style>
.progress {
  display: inline-block;
  right: 5px;
}

.optimization-text {
  display: inline-block;
  position: relative;
  top: 2px;
}
</style>

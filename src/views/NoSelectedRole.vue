<template>
  <v-container>
    <v-row>
      <v-col cols="12" align="center">
        <p class="mt-12 text-h2">Change view</p>
      </v-col>
      <v-col cols="12" align="center">
        <v-btn class="mr-4" :to="{ name: 'GridOperator' }"> <v-icon :icon="mdiWindTurbine" />Grid Operator </v-btn>
        <v-btn :to="{ name: 'ElectricityTrader' }">
          <v-icon :icon="mdiFinance" />
          <p class="pl-1">Electricity Trader</p>
        </v-btn>
      </v-col>
      <v-col cols="12" align="center"> </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" align="center">
        <p class="text-h2">About</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" align="center">
        <p class="text-center">
          Looking into the future, district heating is of crucial importance because it offers a more energy efficient
          way of providing heat to houses and better pollution control than the usual method using localized boilers.
          District heating consists of a network of pipes that deliver hot water from one or multiple plants to
          buildings. The people in charge of these plants (in this case CHP units) have a lot of metrics (i.e. physical
          parameters) to adjust in order to supply the demanded heat, minimize heat loss (in the pipes) and maximize
          profit from selling electricity. Thanks to our client, they have provided optimization algorithms that find
          the optimal metrics for them. However, they don't have an interface to interact with these algorithms, and
          they need one for that purpose. A UI would help them use the algorithms and as a result, save energy sources,
          minimize heat loss and maximize profit.
        </p>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" align="center">
        <p class="mt-4 text-h2">Team</p>
      </v-col>
      <v-col cols="3"></v-col>
      <v-col v-for="image in images" v-bind:key="image" cols="3" align="center">
        <v-img max-height="100" max-width="250" :src="image" alt=""></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { mdiWindTurbine, mdiFinance } from '@mdi/js'

export default {
  data: () => ({
    mdiWindTurbine,
    mdiFinance,
    images: {
      // tudelft: 'https://d2k0ddhflgrk1i.cloudfront.net/TUDelft/Algemene_Bestanden/TU_d_line_P1_color.png',
      vattenfall:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Vattenfall_logo2.svg/1200px-Vattenfall_logo2.svg.png',
      withthegrid: 'https://solarimpulse.com/files/companies/logo/2018-12-31-152306/logo_withthegrid.jpg'
    }
  })
}
</script>

<template>
  <v-app>
    <v-main>
      <!-- Top bar with date picker -->
      <v-app-bar elevation="0">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
        <v-btn variant="plain" elevation="1"
          ><input type="datetime-local" id="meeting-time" name="meeting-time" v-model="datetime" />
        </v-btn>
      </v-app-bar>

      <!-- Navigation drawer for switching views -->
      <v-navigation-drawer v-model="drawer" bottom temporary>
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" :to="item.value">
            {{ item.title }}
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Content of page -->
      <router-view :selectedTime="getHour" :selectedDate="getDate" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'

export default defineComponent({
  name: 'App',

  data: () => ({
    drawer: false,
    group: null,
    datetime: moment().format('yyyy-MM-DDTHH:mm'),
    items: [
      {
        title: 'Home',
        value: '/'
      },
      {
        title: 'Grid Operator',
        value: 'grid-operator'
      },
      {
        title: 'Electricity Trader',
        value: 'electricity-trader'
      }
    ]
  }),

  computed: {
    // compute current date
    getDate(): Date {
      let dateString = moment(this.datetime).format('yyyy-MM-DD')
      const year = +dateString.substring(0, 4)
      const month = +dateString.substring(5, 7)
      const day = +dateString.substring(8, 10)

      const date = new Date(year, month - 1, day)
      //console.log(date)
      return date
    },
    // compute current hour
    getHour(): number {
      return Number(moment(this.datetime).startOf('hour').format('H'))
    }
  },

  watch: {
    // watcher for the navigation drawer
    group(): void {
      this.drawer = false
    }
  }
})
</script>

<style scoped>
.v-application {
  background-color: #f4f7fc;
}
</style>

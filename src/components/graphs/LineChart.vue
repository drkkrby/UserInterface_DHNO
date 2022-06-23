<!-- This component creates a single chart -->
<!-- More about vue-chart-js at https://vue-chartjs.org/guide/ -->
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Line } from 'vue-chartjs' // Component for a line chart
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  type ChartDataset,
  type ScatterDataPoint,
  type InteractionItem,
  type ChartEvent
} from 'chart.js'
// Plugin that allows the chart lines to be draggable:
import 'chartjs-plugin-dragdata'

// Register the chart components we need:
ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)

export default defineComponent({
  props: {
    // The title of the chart:
    title: {
      type: String,
      required: false,
      default: ''
    },
    // The x-axis title:
    x_title: {
      type: String,
      required: false,
      default: ''
    },
    // The y-axis title:
    y_title: {
      type: String,
      required: false,
      default: ''
    },
    // The x-axis values/labels (that correspond to the data points x-coordinates)
    labels: {
      type: Array as PropType<string[] | number[]>,
      required: true
    },
    // The datasets (may have multiple lines):
    // Their type is ChartDataset<'line', (number | ScatterDataPoint | null)[]>[]
    // See how they're used in any other component under ./graphs
    datasets: {
      type: Array as PropType<ChartDataset<'line', (number | ScatterDataPoint | null)[]>[]>,
      required: true
    }
  },
  methods: {
    // More info about these methods at: https://github.com/chrispahm/chartjs-plugin-dragdata
    // Here's an example on the usage that we inspired from: https://raw.githubusercontent.com/chrispahm/chartjs-plugin-dragdata/master/docs/index.html

    // The editor might show that some properties do not exist on type 'Chart Event', but everything works fine.
    // (haven't found a solution to mitigate the error, as it's because of the library)

    /**
     * Method that handles when the chart is hovered.
     * It changes the cursor to 'grab' for the lines that are draggable.
     * @param e the chartEvent that encapsulates the data about the chart and the cursor.
     * This method can take multiple parameters, but only the event is needed.
     */
    chartOnHover(e: ChartEvent): void {
      // Get nearest datapoints from the cursor position:
      const point: InteractionItem[] = e.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false)

      // if at least one nearest point exists (the list is not empty) and the dragData property
      // is not false (can be undefined & true) at the point's index:
      if (point.length && this.datasets[point[0].datasetIndex].dragData !== false) {
        // Set the cursor to 'grab' to indicate that the line can be dragged:
        e.native.target.style.cursor = 'grab'
      } else {
        // If the line cannnot be dragged or the cursor doesn't hover any lines set it to default:
        e.native.target.style.cursor = 'default'
      }
    },
    /**
     * Method that handles the dragging of the lines in the chart.
     * @param e the chartEvent that encapsulates the data about the chart and the cursor.
     * This method can take multiple parameters, but only the event is needed.
     */
    chartOnDrag(e: ChartEvent): void {
      // set the cursor style to 'grabbing' (the line is being dragged):
      e.target.style.cursor = 'grabbing'
    },
    /**
     *
     * @param e the chartEvent that encapsulates the data about the chart and the cursor.
     * This method can take multiple parameters, but only the event is needed.
     */
    chartOnDragEnd(e: ChartEvent): void {
      // set the cursor style to 'default' (the line is not being dragged anymore):
      e.target.style.cursor = 'default'
    }
  },
  components: {
    Line
  }
})
</script>

<template>
  <!-- More about the accepted options: https://www.chartjs.org/docs/latest/charts/line.html -->
  <!-- Since vue-chartjs (the library used here) is a (typed) wrapper around the official chart.js library, 
  there might be differences on where the options are located. -->

  <Line
    :chart-options="{
      responsive: true, // makes the chart resizable
      aspectRatio: 2, // in combination with maintainAspectRatio: true, you can set a fixed size here
      maintainAspectRatio: false, // allows the chart to be responsive
      elements: {
        point: {
          hitRadius: 25 // for improved touch support
        },
        line: {
          tension: 0.3 // how 'curvy' or 'smooth' the graph is (0 by default)
        }
      },
      // handler on when the chart is hovered (changes the cursor styling when draggable lines are hovered)
      onHover: chartOnHover,
      plugins: {
        // Plugin that enables dragging data in the chart.
        // Might show error in the editor (because it's an external plugin and not part of the library)
        // More info on this plugin: https://github.com/chrispahm/chartjs-plugin-dragdata
        dragData: {
          round: 0, // round floating point values to integers
          showTooltip: true, // show the tooltip when the point is being dragged
          // Handlers for dragging:
          onDrag: chartOnDrag,
          onDragEnd: chartOnDragEnd
        },
        // Plugin that displays a title above the chart
        title: {
          display: true,
          text: title,
          align: 'center',
          font: { size: 20, family: 'Helvetica' },
          padding: {
            bottom: 10
          }
        }
      },
      scales: {
        // x-axis title
        x: {
          title: {
            display: true,
            text: x_title
          }
        },
        // y-axis title
        y: {
          title: {
            display: true,
            text: y_title
          }
        }
      }
    }"
    :chart-data="{
      // x-axis labels/values:
      labels: labels,
      // datasets:
      datasets: datasets
    }"
  />
</template>

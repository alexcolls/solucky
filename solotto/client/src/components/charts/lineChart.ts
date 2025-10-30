import { defineComponent, h,  } from 'vue' // PropType
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  // Plugin
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)
export default defineComponent({
  name: 'LineChart',
  components: {
    Line
  },
  // props: [
  //   'chartData',
  //   'chartLabels'
  // ],
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    chartData: {
      type: Array,
      default: Array
    },
    // chartLabels: {
    //   type: Array,
    //   default: Array
    // }
    // styles: {
    //   type: Object as PropType<Partial<CSSStyleDeclaration>>,
    //   default: () => {}
    // },
    // plugins: {
    //   type: Array as PropType<Plugin<'line'>[]>,
    //   default: () => []
    // }
  },
  setup(props) {

    const chartData = { 

      labels: ['11-07', '11-08', '11-09', '11-10', '11-11', '11-12', '11-13', '11-14'], // props.chartData,
      datasets: [{
        label: false,
        backgroundColor: '#c084fc',
        data: props.chartData
      }]
    };

    //  {
    //   labels: ['11-04', '11-05', '11-06', '11-07', '11-08', '11-09', '11-10', '11-11', '11-12', '11-13'],
    //   datasets: [
    //     {
    //       label: false,
    //       backgroundColor: '#c084fc',
    //       data: [5, 20, 40, 153, 220, 323, 940, 1090, 1400, 1500, 1640]
    //     }
    //   ]
    // }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          fontColor: '#4B5563',
        },
        area: {
          display: true,
        },
        text: {
          color: '#4B5563',
        }
     }
    }


    
    return () => 
      h( Line, {
        chartData,
        chartOptions,
        // chartId: props.chartId,
        // width: props.width,
        // height: props.height,
        // cssClasses: props.cssClasses,
        // styles: props.styles,
        // plugins: props.plugins
      })
  }
})
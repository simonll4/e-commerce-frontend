<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import Line from "chart.js/auto";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const chartData = ref({
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      backgroundColor: "#42A5F5",
      borderColor: "#42A5F5",
      data: [40, 39, 10, 40, 39, 80, 40],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2, 
});

const chartRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (chartRef.value) {
    new Line(chartRef.value, {
      type: "line",
      data: chartData.value,
      options: chartOptions.value,
    });
  }
});
</script>

<template>
  <v-container grid-list-md class="activity-container">
    <h4 class="mb-6">Estadísticas</h4>
    <canvas ref="chartRef"></canvas>
  </v-container>
</template>

<style scoped>
.activity-container {
  border: 0.1px solid #dee2e6;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #e0e0e0;
  width: 100%;
  height: 400px; /* Ajusta la altura según tu necesidad */
}

canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>

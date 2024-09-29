<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
      :key="countAtualizacao"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue'

// Tipagem das propriedades esperadas
interface PropTypes {
  /**
   * Valores de cada coluna (frequência de ocorrência de cada nível de cinza)
   */
  valores?: number[] | string[]

  /**
   * Categorias do gráfico (níveis de cinza 0-255)
   */
  labels: string[]

  /**
   * Título do gráfico
   */
  titulo?: string

  /**
   * Adicionar símbolo antes do valor
   */
  simboloAntesLabel?: string | null

  /**
   * Adicionar símbolo após o valor
   */
  simbolosDepoisLabel?: string | null
}

// Configuração padrão das props
const props = withDefaults(defineProps<PropTypes>(), {
  titulo: 'Histograma de Níveis de Cinza',
  simboloAntesLabel: null,
  simbolosDepoisLabel: null,
  valores: () => [],
  labels: () => []
})

// Contagem para atualização do gráfico
const countAtualizacao = ref(0)

// Série de dados do gráfico (frequência de ocorrência)
const series = ref([
  {
    name: 'Frequência de Pixel',
    data: props.valores
  }
])

// Opções de configuração do gráfico de barras
const chartOptions = ref({
  chart: {
    height: 350,
    type: 'bar'
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      dataLabels: {
        position: 'top' // Mostrar o valor no topo da barra
      }
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (valor: string | number) {
      return valor.toString()
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ['#304758']
    }
  },
  xaxis: {
    categories: props.labels, // Exibir níveis de cinza 0-255
    title: {
      text: '',
      style: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: '14px'
      }
    },
    position: 'bottom',
    axisBorder: {
      show: true
    },
    axisTicks: {
      show: true
    }
  },
  yaxis: {
    title: {
      text: 'Frequência',
      style: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: '14px'
      }
    },
    labels: {
      formatter: function (valor: string | number) {
        return valor.toString()
      }
    }
  },
  title: {
    text: props.titulo,
    floating: true,
    offsetY: 330,
    align: 'center',
    style: {
      color: '#444'
    }
  }
})
</script>

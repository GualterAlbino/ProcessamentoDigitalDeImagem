import { ref } from 'vue'
import { defineStore } from 'pinia'

type TLoading = {
  mensagem: string
  percentual?: number
}

export const useLayoutStore = defineStore('[LAYOUT]', () => {
  const telaCheia = ref<boolean>(false)
  const loading = ref<TLoading>({ mensagem: '' })

  return {
    loading,
    telaCheia
  }
})

<template>
  <v-dialog v-if="show" @click:outside="setFocus" v-model="show" persistent :max-width="maxWidth">
    <v-card tile rounded="lg">
      <v-card-title :class="classCardTitle">
        <v-btn
          v-if="showCloseButton"
          class="t-message-dialog__close-button"
          variant="text"
          small
          @click="evClickCloseButton"
          @focusin="$event.stopPropagation()"
        >
          <v-icon color="white">mdi-close-thick</v-icon>
        </v-btn>
        <v-icon size="80" color="white" :class="classIconTitle">{{ iconTitle }}</v-icon>
      </v-card-title>

      <v-card-text class="text-center align-center justify-center">
        <div class="t-message-dialog__titulo">{{ title }}</div>
        <div
          v-if="Boolean(treatedMessage)"
          class="t-message-dialog__mensagem"
          v-html="treatedMessage"
        ></div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          v-if="showCancelBtn"
          variant="text"
          ref="cancelButtonRef"
          :color="btnCancelColor"
          @click="choose(false)"
          @focusin="$event.stopPropagation()"
        >
          {{ appliedCancelLabel }}
        </v-btn>
        <v-btn
          variant="text"
          ref="okButtonRef"
          :color="btnOKColor"
          @click="choose(true)"
          @focusin="$event.stopPropagation()"
        >
          {{ appliedOkLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, type Ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useDisplay } from 'vuetify'

const display = useDisplay()

const props = withDefaults(
  defineProps<{
    /**
     * Define o tipo de caixa de diálogo a ser exibida.
     *
     * @values
     * - `"info"`: Caixa de diálogo na cor azul com ícone de informação.
     * - `"success"`: Caixa de diálogo na cor verde com ícone de check.
     * - `"alert"`: Caixa de diálogo na cor amarela com ícone de exclamação.
     * - `"error"`: Caixa de diálogo na cor vermelha com ícone de erro.
     * - `"question"`: Caixa de diálogo na cor azul com ícone de interrogação botão de confirmar e cancelar são exibidos.
     */
    type: 'info' | 'success' | 'alert' | 'error' | 'question'

    /**
     * Define se a caixa de diálogo será exibida com o botão de cancelar. type="question" já vem com essa opção habilitada por padrão.
     * @default false
     */
    question?: boolean

    /**
     * Define se a caixa de diálogo será exibida na forma expandida.
     * @default false
     */
    extended?: boolean
    /**
     * Define a mensagem a ser exibida na caixa de diálogo.
     * @default ""
     */
    message?: string
    /**
     * Define o título a ser exibido na caixa de diálogo.
     * @default ""
     */
    title?: string
    /**
     * Define o texto do botão de confirmação.
     * @default "OK"
     */
    okLabel?: string
    /**
     * Define o texto do botão de cancelamento.
     * @default "Cancelar"
     */
    cancelLabel?: string
    /**
     * Define a função a ser executada ao clicar no botão de confirmação.
     * @default () => {}
     */
    okCallback?: () => void
    /**
     * Define a função a ser executada ao clicar no botão de cancelamento.
     * @default () => {}
     */
    cancelCallback?: () => void
    /**
     * Define se a tecla ESC será habilitada para fechar a caixa de diálogo.
     * @default true
     */
    escEnabled?: boolean
    /**
     * Define o tipo de foco a ser aplicado ao abrir a caixa de diálogo.
     * @values
     * - `"none"`: Nenhum foco será aplicado.
     * - `"ok"`: O foco será aplicado no botão de confirmação.
     * - `"cancel"`: O foco será aplicado no botão de cancelamento.
     * @default "none"
     */
    focusType?: 'none' | 'ok' | 'cancel'
    /**
     * Define o elemento a ser focado quando fechar a caixa de diálogo.
     * @default null
     */
    elementFocus?: HTMLElement | null
    /**
     * Define o elemento a ser focado quando botão de confirmação for clicado.
     * @default null
     */
    elementFocusOK?: HTMLElement | null
    /**
     * Define o elemento a ser focado quando botão de cancelamento for clicado.
     * @default null
     */
    elementFocusCancel?: HTMLElement | null
    /**
     * Define se o botão de fechar será exibido.
     * @default false
     */
    showCloseButton?: boolean
  }>(),
  {
    question: false,
    extended: false,
    message: '',
    title: '',
    okLabel: '',
    cancelLabel: '',
    okCallback: () => {},
    cancelCallback: () => {},
    escEnabled: true,
    elementFocus: null,
    elementFocusOK: null,
    elementFocusCancel: null,
    showCloseButton: false
  }
)

const maxWidth = computed(() => {
  if (props.message.length <= 80) return '350px'
  return '600px'
})

//Computeds
const treatedMessage = computed(() => {
  return props.message.replace(/[\r\n|\r|\n]/g, '<br>')
})

//HTML Refs
const okButtonRef: Ref<any> = ref()
const cancelButtonRef: Ref<any> = ref()

//Reactives
const show = ref(false)
// card-title
const classCardTitle = ref('')
const classIconTitle = ref('')
const iconTitle = ref('')
// card-actions
const showCancelBtn = ref(false)
const btnOKColor = ref('#666666')
const btnCancelColor = ref('#666666')
const appliedOkLabel = ref('')
const appliedCancelLabel = ref('')

//Watchers
watch(show, (newValue) => {
  if (newValue) {
    nextTick(() => {
      setFocus()
    })
    return
  }

  document.dispatchEvent(new CustomEvent('afterClose'))
})

//Methods

function setTypeConfig(type: string) {
  switch (type) {
    case 'info':
      setInfoConfig()
      break
    case 'success':
      setSuccessConfig()
      break
    case 'alert':
      setAlertConfig()
      break
    case 'error':
      setErrorConfig()
      break
    case 'question':
      setQuestionConfig()
      break
  }
}

function setInfoConfig() {
  classCardTitle.value = 'bg-blue t-message-dialog__card-title--extended'
  classIconTitle.value = 't-message-dialog__icon--rotate-180'
  iconTitle.value = 'mdi-information-outline'
  showCancelBtn.value = false
  btnOKColor.value = '#2196F3'
  appliedOkLabel.value = props.okLabel ? props.okLabel : 'OK'
}

function setSuccessConfig() {
  classCardTitle.value = 'bg-green t-message-dialog__card-title--extended'
  classIconTitle.value = ''
  iconTitle.value = 'mdi-check-circle-outline'
  showCancelBtn.value = props.question
  btnOKColor.value = '#4CAF50'
  btnCancelColor.value = '#4CAF50'
  appliedCancelLabel.value = props.cancelLabel ? props.cancelLabel : 'NÃO'
  const defaultLabel = props.question ? 'SIM' : 'FECHAR'
  appliedOkLabel.value = props.okLabel ? props.okLabel : defaultLabel
}

function setAlertConfig() {
  classCardTitle.value = 'bg-orange t-message-dialog__card-title--extended'
  classIconTitle.value = ''
  iconTitle.value = 'mdi-alert-outline'
  showCancelBtn.value = props.question
  btnOKColor.value = '#FF9800'
  btnCancelColor.value = '#FF9800'
  appliedCancelLabel.value = props.cancelLabel ? props.cancelLabel : 'NÃO'
  const defaultLabel = props.question ? 'SIM' : 'FECHAR'
  appliedOkLabel.value = props.okLabel ? props.okLabel : defaultLabel
}

function setErrorConfig() {
  classCardTitle.value = 'bg-red t-message-dialog__card-title--extended'
  classIconTitle.value = ''
  iconTitle.value = 'mdi-close-circle-outline'
  showCancelBtn.value = props.question
  btnOKColor.value = '#F44336'
  btnCancelColor.value = '#F44336'
  appliedCancelLabel.value = props.cancelLabel ? props.cancelLabel : 'NÃO'
  const defaultLabel = props.question ? 'SIM' : 'FECHAR'
  appliedOkLabel.value = props.okLabel ? props.okLabel : defaultLabel
}

function setQuestionConfig() {
  classCardTitle.value = 'bg-blue t-message-dialog__card-title--extended'
  classIconTitle.value = ''
  iconTitle.value = 'mdi-help-circle-outline'
  showCancelBtn.value = true
  btnOKColor.value = '#2196F3'
  btnCancelColor.value = '#2196F3'
  appliedOkLabel.value = props.okLabel ? props.okLabel : 'SIM'
  appliedCancelLabel.value = props.cancelLabel ? props.cancelLabel : 'NÃO'
}

function setFocus() {
  switch (props.focusType) {
    case 'ok':
      if (okButtonRef.value) {
        okButtonRef.value.$el.focus()
      }
      break
    case 'cancel':
      if (showCancelBtn.value && cancelButtonRef.value) {
        cancelButtonRef.value.$el.focus()
      }
      break
  }
}

function escutarEsc() {
  document.addEventListener('keydown', escEvent)
}

function pararEscutarEsc() {
  document.removeEventListener('keydown', escEvent)
}

function escEvent(event: KeyboardEvent) {
  if (event.key !== 'Escape') return

  if (props.escEnabled) {
    props.question ? choose(false) : choose(true)
  }
}

function choose(value: boolean) {
  value ? props.okCallback() : props.cancelCallback()
  show.value = false

  focusAfterClose(value)
}

function evClickCloseButton() {
  choose(!showCancelBtn.value)
}

function focusAfterClose(chooseValue: boolean) {
  if (chooseValue && props.elementFocusOK) {
    nextTick(() => props.elementFocusOK!.focus())
    return
  }

  if (!chooseValue && props.elementFocusCancel) {
    nextTick(() => props.elementFocusCancel!.focus())
    return
  }

  if (props.elementFocus) {
    nextTick(() => props.elementFocus!.focus())
  }
}

onMounted(() => {
  show.value = true
  setTypeConfig(props.type)
  escutarEsc()
})

onBeforeUnmount(() => {
  pararEscutarEsc()
})
</script>

<style scoped>
.t-message-dialog__close-button {
  padding: 0;
  position: absolute;
  top: 8px;
  right: 8px;
}

.t-message-dialog__titulo {
  margin-top: 15px;
  font-family: inherit;
  font-weight: bolder;
  font-size: 18px;
  color: #808080;
}

.t-message-dialog__mensagem {
  font-family: inherit;
  font-weight: normal;
  font-size: 16px;
  color: #808080;
  margin-top: 10px;
}

.t-message-dialog__card-title--extended {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  padding: 0 !important;
}

.t-message-dialog__icon--rotate-180 {
  transform: rotate(180deg);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

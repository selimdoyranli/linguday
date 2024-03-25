import type { UseTtsTypes } from './use-tts.composable.types'

export default (): UseTtsTypes => {
  const isSpeaking = ref(false)

  const speak = (text: string, locale: string = 'en-US'): void => {
    isSpeaking.value = true

    const speech = new SpeechSynthesisUtterance()
    speech.text = text
    speech.lang = locale

    window.speechSynthesis.speak(speech)

    speech.onend = () => {
      isSpeaking.value = false
    }
  }

  return { speak, isSpeaking }
}

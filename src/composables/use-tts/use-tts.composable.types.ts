export type UseTtsTypes = {
  speak: (text: string, locale: string) => void
  isSpeaking: Ref<boolean>
}

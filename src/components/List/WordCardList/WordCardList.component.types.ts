export type RunSpeakTypes = {
  id: number
  locale: 'en' | 'tr'
  inDialog?: boolean
  wordIndexInDialog?: number | null
}

export type SetIsSpeakingClassTypes = {
  id: number
  locale: 'en' | 'tr'
  inDialog?: boolean
  wordIndexInDialog?: number | null
}

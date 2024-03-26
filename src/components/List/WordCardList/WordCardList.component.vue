<template lang="pug">
.word-card-list
  .card.word-card-list-card(v-for="(item, index) in words" :key="index")
    .card__inner.word-card-list-card__inner
      // Main Locale
      // Card item
      .word-card-list-card-item
        // Card item icon
        .word-card-list-card-item__icon
          AppIcon(:name="`flag:${item.locale === mainLocale ? 'gb' : item.locale}-4x3`" :width="24" :height="24")
        // Card item content
        .word-card-list-card-item__content
          strong.word-card-list-card-title
            span.word-card-list-card-title__value
              li {{ item.title }}

      // Locales
      template(v-for="(localeItem, localeIndex) in item.items" :key="localeIndex")
        // Card item
        .word-card-list-card-item
          // Card item icon
          .word-card-list-card-item__icon
            AppIcon(:name="`flag:${localeItem.locale}-4x3`" :width="24" :height="24")
          // Card item content
          .word-card-list-card-item__content
            strong.word-card-list-card-title
              span.word-card-list-card-title__value(:class="{ 'word-card-list-card-title__value--multiple': localeItem.words.length > 1 }")
                template(v-if="localeItem.words.length > 1")
                  li(@click="openWordDetailDialog(item.id)")
                    | {{ localeItem.words[0].title }}
                    span.word-card-list-card-badge +{{ localeItem.words.length - 1 }}

                template(v-else)
                  template(v-for="(word, wordIndex) in localeItem.words" :key="wordIndex")
                    li {{ word.title }}

      // Actions
      .word-card-list-card__actionButtons
        button.word-card-list-card-text-to-speech-button(:data-tts="`${item.id}-en`" @click="runSpeak({ id: item.id, locale: 'en' })")
          .card__icon.word-card-list-card-text-to-speech-button__icon
            AppIcon(name="tabler:volume" :width="16" :height="16")
          span.word-card-list-card-text-to-speech-button__title EN

        button.word-card-list-card-text-to-speech-button(:data-tts="`${item.id}-tr`" @click="runSpeak({ id: item.id, locale: 'tr' })")
          .card__icon.word-card-list-card-text-to-speech-button__icon
            AppIcon(name="tabler:volume" :width="16" :height="16")
          span.word-card-list-card-text-to-speech-button__title TR

// Word Detail Dialog
ClientOnly
  .word-detail-dialog
    VsDialog(v-model="isOpenWordDetailDialog")
      template(#header)
        h2.word-detail-dialog__title {{ activeWord.title }}

      .word-detail-dialog__inner
        // Main Locale
        // Card item
        .word-card-list-card-item
          // Card item icon
          .word-card-list-card-item__icon
            AppIcon(:name="`flag:gb-4x3`" :width="24" :height="24")
          // Card item content
          .word-card-list-card-item__content
            strong.word-card-list-card-title
              span.word-card-list-card-title__value
                li {{ activeWord.title }}

            // Tts button
            button.word-card-list-card-text-to-speech-button(
              :data-tts="`inDialog-${activeWord.id}-en`"
              @click="runSpeak({ id: activeWord.id, locale: 'en', inDialog: true })"
            )
              .card__icon.word-card-list-card-text-to-speech-button__icon
                AppIcon(name="tabler:volume" :width="16" :height="16")
              span.word-card-list-card-text-to-speech-button__title EN

            // Descriptions
            template(v-for="(wordDescription, wordDescriptionIndex) in activeWord.descriptions" :key="wordDescriptionIndex")
              p.word-card-list-card__description {{ wordDescription }}

        // Locales
        template(v-for="(localeItem, localeIndex) in activeWord.items" :key="localeIndex")
          // Card item
          .word-card-list-card-item
            // Card item icon
            .word-card-list-card-item__icon
              AppIcon(:name="`flag:${localeItem.locale === mainLocale ? 'gb' : localeItem.locale}-4x3`" :width="24" :height="24")
            // Card item content
            .word-card-list-card-item__content
              template(v-for="(word, wordIndex) in localeItem.words" :key="wordIndex")
                strong.word-card-list-card-title
                  span.word-card-list-card-title__value
                    li {{ word.title }}

                // Tts button
                button.word-card-list-card-text-to-speech-button(
                  :data-tts="`inDialog-${activeWord.id}-${wordIndex}-${localeItem.locale}`"
                  @click="runSpeak({ id: activeWord.id, locale: localeItem.locale, inDialog: true, wordIndexInDialog: wordIndex })"
                )
                  .card__icon.word-card-list-card-text-to-speech-button__icon
                    AppIcon(name="tabler:volume" :width="16" :height="16")
                  span.word-card-list-card-text-to-speech-button__title {{ localeItem.locale.toUpperCase() }}

                // Descriptions
                template(v-for="(wordDescription, wordDescriptionIndex) in word.descriptions" :key="wordDescriptionIndex")
                  p.word-card-list-card__description {{ wordDescription }}
</template>

<script lang="ts" setup>
import type { RunSpeakTypes, SetIsSpeakingClassTypes } from './WordCardList.component.types'

const mainLocale = 'en'

const { speak, isSpeaking } = useTts()

const runSpeak = ({ id, locale, inDialog, wordIndexInDialog }: RunSpeakTypes) => {
  const foundWord = words.find(word => word.id === id)

  if (!foundWord) return

  const localeItems = foundWord.items.find(item => item.locale === locale)

  let titlesToSpeak = ''

  if (locale === mainLocale) {
    titlesToSpeak = foundWord.title
  } else {
    if (localeItems) {
      titlesToSpeak = localeItems.words[0].title

      if (inDialog && wordIndexInDialog) {
        titlesToSpeak = localeItems.words[wordIndexInDialog].title
      }
    }
  }

  const getSpeakLocale = () => {
    if (locale === mainLocale) {
      return 'en-US'
    }

    if (locale === 'tr') {
      return 'tr-TR'
    }

    return 'en-US'
  }

  speak(titlesToSpeak, getSpeakLocale())

  setIsSpeakingClass({ id, locale, inDialog, wordIndexInDialog })
}

const setIsSpeakingClass = ({ id, locale, inDialog, wordIndexInDialog }: SetIsSpeakingClassTypes) => {
  let ttsButtons

  if (inDialog) {
    if (locale == mainLocale) {
      ttsButtons = document.querySelectorAll(`.word-card-list-card-text-to-speech-button[data-tts="inDialog-${id}-${locale}"]`)
    } else {
      ttsButtons = document.querySelectorAll(
        `.word-card-list-card-text-to-speech-button[data-tts="inDialog-${id}-${wordIndexInDialog}-${locale}"]`
      )
    }
  } else {
    ttsButtons = document.querySelectorAll(`.word-card-list-card-text-to-speech-button[data-tts="${id}-${locale}"]`)
  }

  if (isSpeaking.value) {
    ttsButtons?.forEach(button => {
      button?.classList.add('isSpeaking')
    })
  } else {
    ttsButtons?.forEach(button => {
      button?.classList.remove('isSpeaking')
    })
  }
}

watch(
  () => isSpeaking.value,
  value => {
    const ttsButtons = document.querySelectorAll('.word-card-list-card-text-to-speech-button')

    if (value) {
      ttsButtons.forEach(button => {
        button.classList.add('disabled')
      })
    } else {
      ttsButtons.forEach(button => {
        button.classList.remove('isSpeaking')
        button.classList.remove('disabled')
      })
    }
  }
)

const isOpenWordDetailDialog = ref(false)
const activeWord = ref({})

const openWordDetailDialog = (id: number) => {
  isOpenWordDetailDialog.value = true

  const foundWord = words.find(word => word.id === id) || {}

  activeWord.value = foundWord
}

const words = [
  {
    id: 0,
    locale: 'en',
    title: 'Social Gathering',
    descriptions: [
      'We are planning a social gathering at the community center next Saturday.',
      'Our company organizes regular social gatherings to promote team bonding.'
    ],
    items: [
      {
        locale: 'tr',
        words: [
          { title: 'Meclis', descriptions: [] },
          { title: 'Dostluk veya beraberliği teşvik amacıyla toplanma', descriptions: [] }
        ]
      }
    ]
  },
  {
    id: 1,
    locale: 'en',
    title: 'Bring',
    descriptions: [],
    items: [
      {
        locale: 'tr',
        words: [{ title: 'Getirmek', descriptions: [] }]
      }
    ]
  },
  {
    id: 2,
    locale: 'en',
    title: 'Confidence',
    descriptions: [],
    items: [
      {
        locale: 'tr',
        words: [{ title: 'Güven', descriptions: [] }]
      }
    ]
  },
  {
    id: 3,
    locale: 'en',
    title: 'Ability',
    descriptions: [],
    items: [
      {
        locale: 'tr',
        words: [{ title: 'Yetenek', descriptions: [] }]
      }
    ]
  },
  {
    id: 4,
    locale: 'en',
    title: 'Mix',
    descriptions: [],
    items: [
      {
        locale: 'tr',
        words: [{ title: 'Karıştırmak', descriptions: [] }]
      }
    ]
  },
  {
    id: 5,
    locale: 'en',
    title: 'Pick up',
    descriptions: ['I need to pick up some groceries on my way home from work.'],
    items: [
      {
        locale: 'tr',
        words: [
          { title: 'Seçmek', descriptions: [] },
          { title: 'Toplamak', descriptions: [] },
          { title: 'Yerden almak', descriptions: [] }
        ]
      }
    ]
  },
  {
    id: 6,
    locale: 'en',
    title: 'Rush',
    descriptions: [],
    items: [
      {
        locale: 'tr',
        words: [{ title: 'Baskın', descriptions: [] }]
      }
    ]
  }
]
</script>

<style lang="scss" src="./WordCardList.component.scss"></style>

<template lang="pug">
ClientOnly
  .word-card-list
    .card.word-card-list-card(v-for="(item, index) in words" :key="index")
      .card__inner.word-card-list-card__inner
        template(v-for="(localeItem, localeIndex) in item.items" :key="localeIndex")
          strong.word-card-list-card-title
            .word-card-list-card-title__icon
              AppIcon(:name="`flag:${localeItem.locale === 'en' ? 'gb' : 'tr'}-4x3`" :width="24" :height="24")
            span.word-card-list-card-title__value
              li(v-for="(word, wordIndex) in localeItem.words" :key="wordIndex") {{ word.title }}

        .word-card-list-card__actionButtons
          button.word-card-list-card-text-to-speech-button(:data-tts="`${item.id}-en`" @click="runSpeak({ id: item.id, locale: 'en' })")
            .card__icon.word-card-list-card-text-to-speech-button__icon
              AppIcon(name="tabler:volume" :width="16" :height="16")
            span.word-card-list-card-text-to-speech-button__title EN

          button.word-card-list-card-text-to-speech-button(:data-tts="`${item.id}-tr`" @click="runSpeak({ id: item.id, locale: 'tr' })")
            .card__icon.word-card-list-card-text-to-speech-button__icon
              AppIcon(name="tabler:volume" :width="16" :height="16")
            span.word-card-list-card-text-to-speech-button__title TR
</template>

<script lang="ts" setup>
import type { RunSpeakTypes, SetIsSpeakingClassTypes } from './WordCardList.component.types'

const { speak, isSpeaking } = useTts()

const runSpeak = ({ id, locale }: RunSpeakTypes) => {
  const foundWord = words.find(word => word.id === id)

  if (!foundWord) return

  const localeItems = foundWord.items.find(item => item.locale === locale)

  if (!localeItems) return

  const titlesToSpeak = localeItems.words.map(word => word.title).join(', ')

  const getSpeakLocale = () => {
    if (locale === 'en') {
      return 'en-US'
    }

    if (locale === 'tr') {
      return 'tr-TR'
    }

    return 'en-US'
  }

  speak(titlesToSpeak, getSpeakLocale())

  setIsSpeakingClass({ id, locale })
}

const setIsSpeakingClass = ({ id, locale }: SetIsSpeakingClassTypes) => {
  if (isSpeaking.value) {
    document.querySelector(`.word-card-list-card-text-to-speech-button[data-tts="${id}-${locale}"]`)?.classList.add('isSpeaking')
  } else {
    document.querySelector(`.word-card-list-card-text-to-speech-button[data-tts="${id}-${locale}"]`)?.classList.remove('isSpeaking')
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

const words = [
  {
    id: 0,
    items: [
      {
        locale: 'en',
        words: [{ title: 'Social Gathering', description: '' }]
      },
      {
        locale: 'tr',
        words: [
          { title: 'Meclis', description: '' },
          { title: 'Dostluk veya beraberliği teşvik amacıyla toplanma', description: '' }
        ]
      }
    ]
  },
  {
    id: 1,
    items: [
      {
        locale: 'en',
        words: [{ title: 'Bring', description: '' }]
      },
      {
        locale: 'tr',
        words: [{ title: 'Getirmek', description: '' }]
      }
    ]
  },
  {
    id: 2,
    items: [
      {
        locale: 'en',
        words: [{ title: 'Confidence', description: '' }]
      },
      {
        locale: 'tr',
        words: [{ title: 'Güven', description: '' }]
      }
    ]
  },
  {
    id: 3,
    items: [
      {
        locale: 'en',
        words: [{ title: 'Ability', description: '' }]
      },
      {
        locale: 'tr',
        words: [{ title: 'Yetenek', description: '' }]
      }
    ]
  },
  {
    id: 4,
    items: [
      {
        locale: 'en',
        words: [{ title: 'Mix', description: '' }]
      },
      {
        locale: 'tr',
        words: [{ title: 'Karıştırmak', description: '' }]
      }
    ]
  },
  {
    id: 5,
    items: [
      {
        locale: 'en',
        words: [{ title: 'Pick up', description: '' }]
      },
      {
        locale: 'tr',
        words: [{ title: 'Seçmek', description: '' }]
      }
    ]
  },
  {
    id: 6,
    items: [
      {
        locale: 'en',
        words: [{ title: 'Rush', description: '' }]
      },
      {
        locale: 'tr',
        words: [{ title: 'Baskın', description: '' }]
      }
    ]
  }
]
</script>

<style lang="scss" src="./WordCardList.component.scss"></style>

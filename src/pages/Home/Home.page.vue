<template lang="pug">
.page.home-page
  h1.home-page__title {{ message.title }}
  p.home-page__description {{ message.description }}
</template>

<script lang="ts" setup>
import type { WelcomeMessageTypes } from '@/types'

definePageMeta({
  layout: 'default'
})

const message = ref<WelcomeMessageTypes>({
  title: 'Daily linguistic things.',
  description: 'Discover things related to the language you want to learn, such as daily idioms, words, and more'
})
</script>

<style lang="scss" src="./Home.page.scss"></style>

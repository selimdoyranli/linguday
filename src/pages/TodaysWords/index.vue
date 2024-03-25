<template lang="pug">
.page.todays-words-page
  .container
    .page-head
      .page-head__icon
        AppIcon(name="tabler:abc" :width="46" :height="46")
      h1.page-head__title Günün Kelimeleri
      p.page-head__description İngilizce - Türkçe kelimelere bak ve kelime dağarcığını geliştir. Her gün yeni kelimeler gelir.

    WordCardList
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default'
})
</script>

<style lang="scss" src="./TodaysWords.page.scss"></style>

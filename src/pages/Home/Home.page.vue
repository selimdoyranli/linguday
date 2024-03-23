<template lang="pug">
.page.home-page
  .container
    h1.home-page__title {{ $t('app.slogan') }}
    p.home-page__description {{ $t('app.description') }}

    AppToolList
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default'
})
</script>

<style lang="scss" src="./Home.page.scss"></style>

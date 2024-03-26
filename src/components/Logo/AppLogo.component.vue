<template lang="pug">
NuxtLink.app-logo(:to="localePath('/')" :title="$t('app.name')")
  img.app-logo__img(src="@/assets/media/core/logo/linguday-logo.png" alt="4in1crop" width="auto" height="28px")
  span.app-logo__title {{ $t('app.name') }}
</template>

<style lang="scss" src="./AppLogo.component.scss"></style>

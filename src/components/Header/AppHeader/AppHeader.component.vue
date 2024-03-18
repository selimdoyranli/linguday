<template lang="pug">
header.header.app-header
  AppLogo

  .app-header__actions
    .app-header-action-item
      VsButton(color="dark" size="small" active @click="$emit('on-click-credits-dialog')")
        AppIcon(name="charm:github")
        span.color-text-02.d-none.d-lg-inline-block.ms-0.ms-lg-1 Created by @selimdoyranli
</template>

<style lang="scss" src="./AppHeader.component.scss"></style>

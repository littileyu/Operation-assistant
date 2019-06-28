<template>
  <div class="search">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.search {
  display: flex;
  flex-wrap: wrap;
  padding: $gutter;
  padding-bottom: 0;
  margin-bottom: $gutter-big;
  background-color: $color-background-l;
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: $gutter;
    margin-bottom: $gutter;
    &:last-child {
      margin-right: 0;
    }
    .title {
      white-space: nowrap;
    }
    .input + button {
      margin-left: 10px;
    }
  }
}
</style>

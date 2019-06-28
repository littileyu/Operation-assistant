<template>
  <h1 class="chart-title">
    <slot></slot>
  </h1>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.chart-title {
  color: #111;
  background-color: rgb(250, 250, 250);
  background-image: linear-gradient(rgb(250, 250, 250), rgb(230, 230, 230));
  font-size: $font-size-medium;
  font-weight: normal;
  padding: $gutter;
  text-align: center;
}
</style>

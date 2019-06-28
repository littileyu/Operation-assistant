<template>
  <div class="chart-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.chart-container {
  padding: 10px;
  background-color: #fff;
  border: 1px solid $color-border;
  .chart {
    height: 100%;
  }
}
</style>

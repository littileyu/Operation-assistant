<template>
  <div class="o-circle">
    <div class="text" v-show="title">
      <p v-show="!desc" class="percent">{{percentage}}%</p>
      <p class="title">{{title}}</p>
      <p v-show="desc" class="desc">{{desc}}</p>
    </div>
    <o-progress type="circle" :stroke-color="strokeColor" :stroke-width="strokeWidth" :width="width" :percentage="percentage" :show-text="!title"></o-progress>
  </div>
</template>

<script>
import OProgress from 'base/o-progress/o-progress'

export default {
  props: {
    strokeWidth: {
      type: Number,
      default: 6
    },
    width: {
      type: Number,
      default: 126
    },
    percentage: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: [String, Number],
      default: ''
    },
    strokeColor: {
      type: String,
      default: ''
    }
  },
  components: {
    OProgress
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.o-circle {
  position: relative;
  display: inline-block;
}
.text {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  transform: translateY(-50%);
}
.percent {
  color: $color-theme;
  font-size: $font-size-large-s;
}
.title, .desc {
  color: $color-text;
  font-size: $font-size-small;
  margin-top: 5px;
}
</style>

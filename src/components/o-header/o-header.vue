<template>
  <div class="o-header">
    <router-link tag="div" class="logo" :to="{name: 'homePage', params: {text: '首页'}}" @click.native="addToTop">
      <h1 class="text">阿喔优品</h1>
    </router-link>
    <div class="right">
      <!-- <div class="item-badge">
        <el-badge :value="12">
          <i class="iconfont icon-lingdang" title="消息"></i>
        </el-badge>
      </div> -->
      <div class="item-user">
        <p class="text">李小白</p>
        <i class="icon iconfont icon-logout" title="退出"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {addToTopMixin} from 'common/js/mixin'

export default {
  mixins: [addToTopMixin]
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";

$height: 75px;

.o-header {
  position: relative;
  height: $height;
  background-color: #fff;
  display: flex;
}
.logo {
  width: 220px;
  padding: 0 20px;
  text-align: center;
  line-height: $height;
  .text {
    font-size: 24px;
    color: $color-theme-sub;
    cursor: pointer;
    &:hover {
      color: $color-theme;
    }
  }
}
.right {
  flex: 1;
  padding: 0 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .item-badge {
    cursor: pointer;
    margin-right: 40px;
    .icon-lingdang {
      font-size: 22px;
      color: $color-theme-sub;
    }
  }
  .item-user {
    display: flex;
    justify-content: center;
    align-items: baseline;
    .text {
      font-size: 22px;
    }
    .icon {
      color: $color-theme-sub;
      font-size: 20px;
      padding: 5px;
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
</style>

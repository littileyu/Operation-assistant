<template>
  <div class="o-tabs">
    <ul class="tab-list" ref="tabList">
      <router-link
        class="tab-item"
        v-for="(tab, index) in tabList" :key="index"
        :class="activeCls(tab)"
        @click.native="setActive" :to="tab.fullPath">
        <span class="title" :title="tab.text">{{tab.text}}</span>
        <i class="icon iconfont icon-reload" @click.stop.prevent="reload(tab)"></i>
        <i class="icon iconfont icon-close" v-show="tab.canDel" @click.stop.prevent="removeTab(index)"></i>
      </router-link>
    </ul>
    <span class="tab-clear" @click="clearTab" title="清空标签">
      <i class="icon iconfont icon-qingkong"></i>
    </span>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

// 单个标签的宽度
const singleItemWidth = 150

export default {
  data() {
    return {
      maxTabsNum: 5
    }
  },
  computed: {
    ...mapGetters([
      'tabList',
      'currentTab'
    ])
  },
  methods: {
    activeCls(tab) {
      if (tab.fullPath === this.currentTab.fullPath) {
        return 'active'
      } else {
        return ''
      }
    },
    setActive(e) {
      const text = e.target.innerText
      const fullPath = this.$route.fullPath
      const canDel = (fullPath !== '/')
      let tab = {
        text,
        fullPath,
        canDel
      }
      this.setCurrentTab(tab)
    },
    removeTab(index) {
      let list = this.tabList
      if (this.currentTab.fullPath === this.tabList[index].fullPath) {
        let newTab = this.tabList[index - 1]
        this.setCurrentTab(newTab)
      }
      list.splice(index, 1)
      this.setTabList(list)
    },
    reload(tab) {
      this.$emit('reload', tab)
    },
    clearTab() {
      let list = this.tabList.slice(0, 1)
      this.setTabList(list)
      this.setCurrentTab(list[0])
    },
    _getMaxTabsNum() {
      let contentWidth = this.$refs.tabList.getBoundingClientRect().width
      let maxNum = Math.floor(contentWidth / singleItemWidth)
      this.maxTabsNum = maxNum
    },
    ...mapMutations({
      setTabList: 'SET_TAB_LIST',
      setCurrentTab: 'SET_CURRENT_TAB'
    })
  },
  created() {
    if (this.$route.fullPath !== this.currentTab.fullPath) {
      this.$router.replace(this.currentTab.fullPath)
    }
  },
  mounted() {
    this._getMaxTabsNum()
  },
  watch: {
    currentTab(newValue) {
      this.$router.push(newValue.fullPath)
    },
    tabList(newList) {
      if (newList.length > this.maxTabsNum) {
        let list = newList.slice()
        list.splice(1, list.length - this.maxTabsNum)
        this.setTabList(list)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";

.o-tabs {
  position: relative;
  padding-right: 50px;
}
.tab-list {
  display: flex;
  align-items: center;
  background-color: $color-background-ld;
}
.tab-item {
  font-size: 0;
  height: 50px;
  line-height: 50px;
  padding: 0 $gutter;
  margin-right: $gutter;
  &:last-child {
    margin-right: 0;
  }
  &.active {
    color: $color-theme;
    background-color: #fff;
  }
  .title {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    font-size: $font-size-medium;
    width: 4em;
    @include no-wrap;
  }
  .icon {
    cursor: pointer;
    font-size: 12px;
    padding: 2px;
    border-radius: 50%;
    margin-left: 10px;
    transition: 0.1s;
    &:hover {
      color: #fff;
      background-color: $color-text;
      border-radius: 50%;
    }
  }
}
.tab-clear {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: darken(#e4e8f1, 10%);
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: darken(#e4e8f1, 15%);
  }
}
</style>

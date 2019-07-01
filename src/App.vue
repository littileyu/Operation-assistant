<template>
  <div class="wrapper" id="app">
    <div class="header">
      <o-header></o-header>
    </div>
    <div class="main">
      <div class="nav-wrapper">
        <nav-menu></nav-menu>
      </div>
      <div class="content-wrapper">
        <div class="tabs">
          <o-tabs @reload="reload"></o-tabs>
        </div>
        <div class="content">
          <div class="content-inner">
            <keep-alive>
              <router-view ref="rootView"></router-view>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OHeader from "components/o-header/o-header";
import NavMenu from "components/nav-menu/nav-menu";
import OTabs from "components/o-tabs/o-tabs";
import { mapGetters } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapGetters(["currentTab"])
  },
  methods: {
    reload(tab) {
      if (tab.fullPath !== this.currentTab.fullPath) {
        return;
      }
      // this.$refs.rootView.fetchData()
    }
  },
  components: {
    NavMenu,
    OHeader,
    OTabs
  }
};
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main {
  position: absolute;
  top: 75px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: $gutter;
  background-color: $color-background-l;
}
.nav-wrapper {
  width: 240px;
  flex: 0 0 240px;
  padding-right: $gutter;
}
.content-wrapper {
  position: relative;
  flex: 1;
  height: 100%;
}
.content {
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  padding: $gutter;
  background-color: #fff;
}
</style>

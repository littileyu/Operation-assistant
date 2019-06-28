<template>
  <div class="nav-menu">
    <el-menu :router="true" :unique-opened="true">
      <el-submenu index="1">
        <template slot="title"><i class="iconfont icon-zhengti"></i>整体运营</template>
        <el-menu-item-group>
          <template slot="title">运营报告</template>
          <el-menu-item index="1-1" @click.native="addToTop" :route="{path: '/dailyPaper'}">总部日报</el-menu-item>
          <el-menu-item index="1-2" @click.native="addToTop" :route="{path: '/storeEvaluation'}">门店评估</el-menu-item>
          <el-menu-item index="1-3" @click.native="addToTop" :route="{path: '/staffReport'}">人员报告</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">业务监控</template>
          <el-menu-item index="1-4" @click.native="addToTop" :route="{path: '/purchaseReport'}">采购报告</el-menu-item>
          <el-menu-item index="1-5" @click.native="addToTop" :route="{path: '/distributionReport'}">配送报告</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="iconfont icon-huopin"></i>货品管理</template>
        <el-menu-item-group>
          <template slot="title">货品概况</template>
          <el-menu-item index="2-1" @click.native="addToTop" :route="{path: '/inventoryReport'}">库存报告</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="iconfont icon-huiyuan"></i>会员分析</template>
        <el-menu-item-group>
          <template slot="title">精准分析</template>
          <el-menu-item index="3-1" @click.native="addToTop" :route="{path: '/memberAll'}">会员概况</el-menu-item>
          <el-menu-item index="3-2" @click.native="addToTop" :route="{path: '/memberRate'}">会员排行</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="iconfont icon-mendian"></i>门店管理</template>
        <el-menu-item-group>
          <template slot="title">运营报告</template>
          <el-menu-item index="4-1" @click.native="addToTop" :route="{path: '/storeDaily'}">门店日报</el-menu-item>
          <el-menu-item index="4-2" @click.native="addToTop" :route="{path: '/memberAll'}">会员分析</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">业务管理</template>
          <el-menu-item index="4-2" @click.native="addToTop" :route="{path: '/returnAnalysis'}">退货分析</el-menu-item>
          <el-menu-item index="4-2" @click.native="addToTop" :route="{path: '/discountMonitor'}">折让监控</el-menu-item>
          <el-menu-item index="4-3" @click.native="addToTop" :route="{path: '/reference'}">调货参考方案</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="iconfont icon-gongju"></i>其他工具</template>
        <el-menu-item-group>
          <template slot="title">管理类工具</template>
          <el-menu-item index="5-1" @click.native="addToTop" :route="{path: '/salesManagement'}">销售任务管理</el-menu-item>
          <el-menu-item index="5-2" @click.native="addToTop" :route="{path: '/personnelInfo'}">人员信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="iconfont icon-peizhi"></i>参数配置</template>
        <el-menu-item index="6-1" @click.native="addToTop" :route="{path: '/salesManagement'}">销售任务管理</el-menu-item>
        <el-menu-item index="6-2" @click.native="addToTop" :route="{path: '/personnelInfo'}">人员信息</el-menu-item>
        <el-menu-item index="6-3" @click.native="addToTop" :route="{path: '/employeeTask'}">员工销售任务制定</el-menu-item>
      </el-submenu>
    </el-menu>
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
  .nav-menu {
    position: relative;
    background-color: #fff;
    border-radius: $border-radius;
    max-height: 100%;
    overflow: auto;
  }
  .logo {
    height: 100px;
    line-height: 100px;
    text-align: center;
    border-bottom: 1px solid $color-border;
    .text {
      color: $color-theme;
      font-size: $font-size-large;
      font-weight: normal;
    }
  }
  .menu-content {
    position: absolute;
    top: 100px;
    bottom: 0;
    width: 100%;
    padding-top: 20px;
    overflow-y: auto;
  }
  .el-submenu .iconfont {
    display: inline-block;
    vertical-align: baseline;
    line-height: 1;
    width: 24px;
    text-align: center;
    margin-right: 5px;
  }
</style>

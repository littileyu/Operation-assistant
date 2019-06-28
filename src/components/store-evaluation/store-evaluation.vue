<!-- 门店评估 -->
<template>
  <div class="store-evaluation">
    <el-row :gutter="12" class="eva-list">
      <el-col :lg="12" class="eva-item" v-for="(store, index) in stores" :key="index">
        <chart-title>{{store.name}}评估得分为：{{store.totalShopScore}}分，评分结果：{{store.scoreRes}}</chart-title>
        <chart-container>
          <chart :loading="loading" :resizable="true" :option="store.option"></chart>
        </chart-container>
        <chart-title class="subtitle">
          30天内实时滚动运营健康评估指标评分明细
          <router-link :to="{name: 'singleEvaluation', params: {text: store.name, shopId: store.id, shopName: store.name}}" @click.native="addToTop">[点击查看详情]</router-link>
        </chart-title>
        <div class="table">
          <el-table
            :data="store.tableData"
            v-loading="loading"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="指标名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="value"
              label="实际值"
              width="120">
            </el-table-column>
            <el-table-column
              prop="score"
              label="评分"
              width="80">
            </el-table-column>
            <el-table-column
              prop="desc"
              label="说明">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartTitle from 'base/chart-title/chart-title'
import ChartContainer from 'base/chart-container/chart-container'
import {addToTopMixin} from 'common/js/mixin'
import Chart from 'vue-echarts-v3/src/full.vue'
import {getShopsData} from 'api/store-evaluation'
import {ERR_OK} from 'api/config'
import {radarChartColor} from 'common/js/chartColor'

export default {
  mixins: [addToTopMixin],
  data() {
    return {
      loading: true,
      radarReady: {
        color: radarChartColor,
        tooltip: {}
      },
      stores: []
    }
  },
  methods: {
    fetchData() {
      this._getShopsData()
    },
    _getShopsData() {
      this.loading = true
      getShopsData().then((res) => {
        if (res.code === ERR_OK) {
          this.loading = false
          this.stores = this._normalizeResult(res.results)
        }
      })
    },
    _normalizeResult(list) {
      for (let item of list) {
        item.option = Object.assign({}, this.radarReady, item.option)
      }
      return list
    }
  },
  components: {
    ChartTitle,
    ChartContainer,
    Chart
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.pagination {
  padding: $gutter;
  background-color: $color-background-l;
  margin-bottom: $gutter-big;
}
.el-col {
  margin-bottom: $gutter;
}
.eva-item {
  .chart-container {
    height: 300px;
  }
}
.subtitle {
  background-color: lighten($color-background-d, 5%);
}
</style>

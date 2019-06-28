<!-- 单个门店评估 -->
<template>
  <div class="single-evaluation">
    <div class="search-wrapper">
      <search>
        <div class="search__item">
          <span class="text">门店：</span>
          <div class="input">
            <el-select v-model="shopId" placeholder="请选择">
              <el-option
                v-for="shop in shops"
                :key="shop.id"
                :label="shop.value"
                :value="shop.id">
              </el-option>
            </el-select>
          </div>
          <el-button type="primary" @click="query">查询</el-button>
        </div>
      </search>
    </div>
    <el-row :gutter="12" class="content">
      <el-col :lg="12" class="content__left">
        <div class="eva-radar">
          <chart-title>{{shopName}}实时运营评估</chart-title>
          <chart-container>
            <chart :resizable="true" :loading="chart.storeLoading" :option="chart.storeRadar.option"></chart>
          </chart-container>
        </div>
        <div class="eva-month">
          <chart-title>{{shopName}}最近30天门店评估情况</chart-title>
          <chart-container>
            <chart :resizable="true" :loading="chart.storeLoading" :option="chart.storeMonth.option"></chart>
          </chart-container>
        </div>
        <div class="eva-tb">
          <chart-title>门店运营评估得分：{{shopTotalScore}}，结果：{{shopScoreRes}}</chart-title>
          <div class="table">
            <el-table
              :data="shopTableData"
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
                width="120">
              </el-table-column>
              <el-table-column
                prop="desc"
                label="说明">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :lg="12" class="content__right">
        <div class="eva-radar">
          <chart-title>{{shopName}}实时人员评估</chart-title>
          <chart-container>
            <chart :resizable="true" :loading="chart.memberLoading" :option="chart.memberRadar.option"></chart>
          </chart-container>
        </div>
        <div class="eva-month">
          <chart-title>{{shopName}}最近30天人员评估情况</chart-title>
          <chart-container>
            <chart :resizable="true" :loading="chart.memberLoading" :option="chart.memberMonth.option"></chart>
          </chart-container>
        </div>
        <div class="eva-tb">
          <chart-title>人员运营评估得分：{{employeeTotalScore}}，结果：{{employeeScoreRes}}</chart-title>
          <div class="table">
            <div class="table">
              <el-table
                :data="employeeTableData"
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
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="desc"
                  label="说明">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from 'base/search/search'
import Chart from 'vue-echarts-v3/src/full'
import ChartTitle from 'base/chart-title/chart-title'
import ChartContainer from 'base/chart-container/chart-container'
import {getAssessEmployee, getAssessShop} from 'api/single-evaluation'
import {ERR_OK} from 'api/config'
import {getShopListMixin} from 'common/js/mixin'
import {radarChartColor} from 'common/js/chartColor'

export default {
  mixins: [getShopListMixin],
  data() {
    return {
      chart: {
        storeLoading: true,
        memberLoading: true,
        storeRadar: {
          ready: {
            color: radarChartColor
          },
          option: {
            tooltip: {},
            radar: {
              name: {
                textStyle: {
                  color: '#fff',
                  backgroundColor: '#999',
                  borderRadius: 3,
                  padding: [3, 5]
                }
              },
              indicator: []
            },
            series: [
              {
                type: 'radar',
                data: []
              }
            ]
          }
        },
        storeMonth: {
          ready: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            }
          },
          option: {
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: []
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value} 分'
              },
              axisPointer: {
                snap: true
              }
            },
            series: []
          }
        },
        memberRadar: {
          ready: {
            color: radarChartColor
          },
          option: {
            tooltip: {},
            radar: {
              name: {
                textStyle: {
                  color: '#fff',
                  backgroundColor: '#999',
                  borderRadius: 3,
                  padding: [3, 5]
                }
              },
              indicator: []
            },
            series: [
              {
                type: 'radar',
                data: []
              }
            ]
          }
        },
        memberMonth: {
          ready: {
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value} 分'
              },
              axisPointer: {
                snap: true
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            }
          },
          option: {
            series: []
          }
        }
      },
      // shopId: 9998,
      shopId: this.$route.params.shopId,
      shopTotalScore: '',
      shopScoreRes: '',
      employeeTotalScore: '', // 人员评估总分
      employeeScoreRes: '', // 人员评估结果
      shopTableData: [],    // 门店运营评估
      employeeTableData: [], // 人员运营评估
      shopName: this.$route.params.shopName
    }
  },
  methods: {
    fetchData() {
      this._getAssessEmployee()
      this._getAssessShop()
      this._getShopOptions()
      this._getShopName()
    },
    _getAssessEmployee() {
      let params = {
        shopId: this.shopId
      }
      this.chart.memberLoading = true
      getAssessEmployee(params).then((res) => {
        if (res.code === ERR_OK) {
          this.chart.memberLoading = false
          this.employeeTableData = res.result.tableData
          this.employeeTotalScore = res.result.totalShopScore
          this.employeeScoreRes = res.result.scoreRes
          this.chart.memberMonth.option = Object.assign({}, this.chart.memberMonth.ready, res.result.options[0])
          this.chart.memberRadar.option = Object.assign({}, this.chart.memberRadar.ready, res.result.options[1])
        }
      })
    },
    _getAssessShop() {
      let params = {
        shopId: this.shopId
      }
      this.chart.storeLoading = true
      getAssessShop(params).then((res) => {
        if (res.code === ERR_OK) {
          this.chart.storeLoading = false
          this.shopTableData = res.result.tableData
          this.shopTotalScore = res.result.totalShopScore
          this.shopScoreRes = res.result.scoreRes
          this.chart.storeMonth.option = Object.assign({}, this.chart.storeMonth.ready, res.result.options[0])
          this.chart.storeRadar.option = Object.assign({}, this.chart.storeRadar.ready, res.result.options[1])
        }
      })
    },
    query() {
      this.fetchData()
    },
    _getShopName() {
      for (let shop of this.shops) {
        if (shop.id === this.shopId) {
          this.shopName = shop.value
        }
      }
    }
  },
  components: {
    Search,
    Chart,
    ChartTitle,
    ChartContainer
  },
  created() {
    this.fetchData()
  },
  activated() {
    if (this.$route.params.shopId && this.$route.params.shopId !== this.shopId) {
      this.shopId = this.$route.params.shopId
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

$chartHeight: 300px;

.eva-radar {
  margin-bottom: $gutter;
  .chart-container {
    height: $chartHeight;
  }
}
.eva-tb {
  margin-bottom: $gutter;
}
.eva-month {
  .chart-container {
    height: $chartHeight;
  }
}
</style>

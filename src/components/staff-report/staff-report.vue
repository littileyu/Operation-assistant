<!-- 人员报告 -->
<template>
  <div class="staff-report">
    <el-row :gutter="12" class="card-row">
      <el-col class="card-col" :sm="12" :md="8" :lg="6">
        <div class="card-item">
          <p class="item__hd">
            <span class="item__title">在职人数</span>
          </p>
          <div class="item__bd">
            <span class="item__num">{{monthData.empNum}}</span>
            <span class="item__unit">人</span>
          </div>
          <router-link
            class="item__ft"
            :to="{name: 'personnelInfo', params: {text: '人员信息'}}"
            @click.native="addToTop">
            <span class="item__text">查看详情</span>
            <i class="item__icon el-icon-arrow-right"></i>
          </router-link>
        </div>
      </el-col>
      <el-col class="card-col" :sm="12" :md="8" :lg="6">
        <div class="card-item">
          <p class="item__hd">
            <span class="item__title">本月人均贡献</span>
          </p>
          <div class="item__bd">
            <span class="item__num">{{monthData.avgEmpSales}}</span>
            <span class="item__unit">元/人</span>
          </div>
          <router-link
            class="item__ft"
            :to="{name: 'storeEvaluation', params: {text: '门店评估'}}"
            @click.native="addToTop">
            <span class="item__text">查看详情</span>
            <i class="item__icon el-icon-arrow-right"></i>
          </router-link>
        </div>
      </el-col>
      <el-col class="card-col" :sm="12" :md="8" :lg="6">
        <div class="card-item">
          <p class="item__hd">
            <span class="item__title">本月每日人均接待客单</span>
          </p>
          <div class="item__bd">
            <span class="item__num">{{monthData.avgEmpOrderNum}}</span>
            <span class="item__unit">单/人</span>
          </div>
          <router-link
            class="item__ft"
            :to="{name: 'storeEvaluation', params: {text: '门店评估'}}"
            @click.native="addToTop">
            <span class="item__text">查看详情</span>
            <i class="item__icon el-icon-arrow-right"></i>
          </router-link>
        </div>
      </el-col>
      <el-col class="card-col" :sm="12" :md="8" :lg="6">
        <div class="card-item">
          <p class="item__hd">
            <span class="item__title">本月平均连带率</span>
          </p>
          <div class="item__bd">
            <span class="item__num">{{monthData.categoryRate}}</span>
            <span class="item__unit">件/单</span>
          </div>
          <router-link
            class="item__ft"
            :to="{name: 'storeEvaluation', params: {text: '门店评估'}}"
            @click.native="addToTop">
            <span class="item__text">查看详情</span>
            <i class="item__icon el-icon-arrow-right"></i>
          </router-link>
        </div>
      </el-col>
      <el-col class="card-col" :sm="12" :md="8" :lg="6">
        <div class="card-item">
          <p class="item__hd">
            <span class="item__title">本月平均客单价</span>
          </p>
          <div class="item__bd">
            <span class="item__num">{{monthData.unitPrice}}</span>
            <span class="item__unit">元/单</span>
          </div>
          <router-link
            class="item__ft"
            :to="{name: 'customerAnalysis', params: {text: '客单分析'}}"
            @click.native="addToTop">
            <span class="item__text">查看详情</span>
            <i class="item__icon el-icon-arrow-right"></i>
          </router-link>
        </div>
      </el-col>
    </el-row>
    <div class="sales-amount">
      <chart-title>公司全体门店人员最近30天销售贡献分布</chart-title>
      <chart-container>
        <chart :loading="chart.loading" :resizable="true" :option="chart.amount.option"></chart>
      </chart-container>
    </div>
    <el-row :gutter="12">
      <el-col :lg="12">
        <div class="member-eva">
          <chart-title>公司整体人员评估(30天内数据)</chart-title>
          <chart-container>
            <chart :loading="chart.loading" :resizable="true" :option="chart.eva.option"></chart>
          </chart-container>
        </div>
      </el-col>
      <el-col :lg="12">
        <div class="member-sales">
          <chart-title>员工最近30天销售分</chart-title>
          <chart-container>
            <chart :loading="chart.loading" :resizable="true" :option="chart.member.option"></chart>
          </chart-container>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {addToTopMixin} from 'common/js/mixin'
import Chart from 'vue-echarts-v3/src/full'
import ChartTitle from 'base/chart-title/chart-title'
import ChartContainer from 'base/chart-container/chart-container'
import {ERR_OK} from 'api/config'
import {getMonthData, getOptions} from 'api/staff-report'
import {chartColor, radarChartColor} from 'common/js/chartColor'

export default {
  mixins: [addToTopMixin],
  data() {
    return {
      chart: {
        chartColor: {
          color: chartColor
        },
        radarColor: {
          color: radarChartColor
        },
        loading: true,
        amount: {
          ready: {
            grid: {
              left: '3%',
              right: '7%',
              bottom: '3%',
              containLabel: true
            },
            tooltip: {
              showDelay: 0,
              formatter: function (params) {
                if (params.value.length > 1) {
                  return params.seriesName + ' :<br/>' + params.value[0] + '个 ' + params.value[1] + '元 '
                } else {
                  return params.seriesName + ' :<br/>' + params.name + ' : ' + params.value
                }
              },
              axisPointer: {
                show: true,
                type: 'cross',
                lineStyle: {
                  type: 'dashed',
                  width: 1
                }
              }
            },
            xAxis: [
              {
                name: '数量',
                type: 'value',
                scale: true,
                axisLabel: {
                  formatter: '{value}'
                },
                splitLine: {
                  show: false
                }
              }
            ],
            yAxis: [
              {
                name: '金额',
                type: 'value',
                scale: true,
                axisLabel: {
                  formatter: '{value}'
                },
                splitLine: {
                  show: false
                }
              }
            ]
          },
          option: {
            series: []
          }
        },
        eva: {
          ready: {
            tooltip: {}
          },
          option: {
            series: []
          }
        },
        member: {
          ready: {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            }
          },
          option: {
            series: []
          }
        }
      },
      monthData: [] // 人员报告基本数据
    }
  },
  methods: {
    fetchData() {
      this._getMonthData()
      this._getOptions()
    },
    _getMonthData() { // get人员报告基本数据
      getMonthData().then((res) => {
        if (res.code === ERR_OK) {
          this.monthData = res.data
        }
      })
    },
    _getOptions() {
      this.chart.loading = true
      getOptions().then((res) => {
        if (res.code === ERR_OK) {
          this.chart.loading = false
          this.chart.amount.option = Object.assign({}, this.chart.chartColor, this.chart.amount.ready, res.options[0])
          this.chart.eva.option = Object.assign({}, this.chart.radarColor, this.chart.eva.ready, res.options[1])
          this.chart.member.option = Object.assign({}, this.chart.chartColor, this.chart.member.ready, res.options[2])
        }
      })
    }
  },
  components: {
    Chart,
    ChartTitle,
    ChartContainer
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
  margin-bottom: 20px;
}
.card-row {
  .card-col {
    margin-bottom: $gutter;
    @media (min-width: 1600px) {
      width: 20%;
    }
  }
}
.card-item {
  border: 1px solid $color-border;
  .item__hd {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: $font-size-small;
  }
  .item__bd {
    text-align: center;
    font-size: $font-size-large-x;
    padding: 20px 0;
    border-color: $color-border;
    border-width: 1px 0;
    border-style: solid;
  }
  .item__unit {
    font-size: $font-size-small;
  }
  .item__ft {
    display: flex;
    justify-content: space-between;
    font-size: $font-size-medium;
    padding: 6px 10px;
    &:hover {
      background-color: $color-background-l;
    }
  }
  .item__icon {
    font-size: 12px;
  }
}
.sales-amount {
  margin-bottom: $gutter;
  .chart-container {
    height: 300px;
  }
}
.member-eva,
.member-sales {
  .chart-container {
    height: 400px;
  }
}
</style>

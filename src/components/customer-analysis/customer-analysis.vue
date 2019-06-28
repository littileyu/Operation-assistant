<!-- 昨日客单分析 -->
<template>
  <div class="customer-analysis">
    <div class="search-wrapper">
      <search>
        <div class="search__item">
          <span class="title">门店：</span>
          <div class="input">
            <el-select v-model="shopId" clearable placeholder="请选择">
              <el-option
                v-for="item in shops"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </search>
    </div>

    <chart-title class="content-title">{{shopName}}{{yesterday}}共计成交{{baseData.orderNum}}单，平均客单价{{baseData.unitPrice}}元，购物连带率{{baseData.categoryRate}}，店员均价{{baseData.guiderUnitPrice}}，每小时订单数：{{baseData.hourOrderNum}}</chart-title>
    <el-row class="content__top" :gutter="12">
      <el-col :md="12" :lg="9">
        <div class="sales-category">
          <chart-container>
            <chart :loading="chart.category.loading" :resizable="true" :option="chart.category.option"></chart>
          </chart-container>
        </div>
      </el-col>
      <el-col :md="12" :lg="5">
        <chart-container class="circle-container">
          <o-circle
            strokeColor="#fc5c7d"
            :stroke-width="10"
            :width="156"
            :percentage="78"
            title="平均客单价"
            :desc="'￥' + baseData.unitPrice"></o-circle>
        </chart-container>
      </el-col>
      <el-col :md="12" :lg="5">
        <chart-container class="circle-container">
          <o-circle
            strokeColor="#c94b4b"
            :stroke-width="10"
            :width="156"
            :percentage="78"
            title="购物连带率"
            :desc="baseData.categoryRate"></o-circle>
        </chart-container>
      </el-col>
      <el-col :md="12" :lg="5">
        <chart-container class="circle-container">
          <o-circle
            strokeColor="#fc4a1a"
            :stroke-width="10"
            :width="156"
            :percentage="78"
            title="店员均价"
            :desc="baseData.guiderUnitPrice"></o-circle>
        </chart-container>
      </el-col>
    </el-row>
    <el-row class="content__bottom" :gutter="12">
      <el-col :lg="12">
        <div class="sales-time">
          <chart-title>客单及成交时段分布</chart-title>
          <chart-container>
            <chart :resizable="true" :option="chart.time.option"></chart>
          </chart-container>
        </div>
      </el-col>
      <el-col :lg="12">
        <div class="sales-amount">
          <chart-title>客单成交数量和金额分布</chart-title>
          <chart-container>
            <chart :resizable="true" :option="chart.amount.option"></chart>
          </chart-container>
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
import OCircle from 'base/o-circle/o-circle'
import {formatDate} from 'common/js/date'
import {getBaseData, getCustomerOptions} from 'api/customer-analysis'
import {ERR_OK} from 'api/config'
import {chartColor, lineChartColor} from 'common/js/chartColor'
import {getShopListMixin} from 'common/js/mixin'

export default {
  mixins: [getShopListMixin],
  data() {
    return {
      shopId: this.$route.params.shopId || null,
      shopName: this.$route.params.shopName || '全店',
      baseData: {
        unitPrice: 0,
        categoryRate: 0,
        orderNum: 0,
        hourOrderNum: 0,
        guiderUnitPrice: 0
      },
      chart: {
        chartColor: {
          color: chartColor
        },
        lineColor: {
          color: lineChartColor
        },
        category: {
          loading: true,
          ready: {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            }
          },
          option: {
            series: []
          }
        },
        doubleLoading: true,
        time: {
          ready: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            legend: {
              data: ['客流量', '客单价']
            },
            yAxis: [
              {
                type: 'value',
                name: '客流量',
                axisLabel: {
                  formatter: '{value}'
                }
              },
              {
                type: 'value',
                name: '客单价',
                axisLabel: {
                  formatter: '{value}'
                }
              }
            ]
          },
          option: {
            series: []
          }
        },
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
        }
      }
    }
  },
  methods: {
    fetchData() {
      this._getShopOptions()
      this.search()
    },
    _getYesterday() {
      let date = new Date()
      date.setDate(date.getDate() - 1)
      this.yesterday = formatDate('yyyy-MM-dd', date)
    },
    _getBaseData() {
      this.chart.category.loading = true
      getBaseData(this.shopId).then((res) => {
        if (res.code === ERR_OK) {
          this.baseData.unitPrice = res.data.data.unitPrice
          this.baseData.categoryRate = res.data.data.categoryRate
          this.baseData.orderNum = res.data.data.orderNum
          this.baseData.hourOrderNum = res.data.data.hourOrderNum
          this.baseData.guiderUnitPrice = res.data.data.guiderUnitPrice

          this.chart.category.loading = false
          this.chart.category.option = Object.assign({}, this.chart.category.ready, this.chart.chartColor, res.data.option)
        }
      })
    },
    _getCustomerOptions() {
      this.doubleLoading = true
      getCustomerOptions(this.shopId).then((res) => {
        if (res.code === ERR_OK) {
          this.doubleLoading = false
          this.chart.time.option = Object.assign({}, this.chart.lineColor, this.chart.time.ready, res.options[0])
          this.chart.amount.option = Object.assign({}, this.chart.chartColor, this.chart.amount.ready, res.options[1])
        }
      })
    },
    _getShopName() {
      if (this.shopId === null || this.shopId === '') {
        this.shopName = '全店'
      } else {
        for (let shop of this.shops) {
          if (shop.id === this.shopId) {
            this.shopName = shop.value
          }
        }
      }
    },
    search() {
      this._getShopName()
      this._getBaseData()
      this._getCustomerOptions()
    }
  },
  components: {
    Search,
    Chart,
    ChartTitle,
    ChartContainer,
    OCircle
  },
  created() {
    this._getYesterday()
    this.fetchData()
  },
  activated() {
    if (this.$route.params.shopId && this.$route.params.shopId !== this.shopId) {
      this.shopId = this.$route.params.shopId
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.el-col {
  margin-top: $gutter;
}
.content__top {
  .chart-container {
    height: 300px;
  }
}
.circle-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content__bottom {
  .chart-container {
    height: 340px;
  }
}
</style>

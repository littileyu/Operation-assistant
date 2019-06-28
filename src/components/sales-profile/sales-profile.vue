<!-- 月销售概况 -->
<template>
  <div class="sales-profile">
    <div class="search-wrapper">
      <search>
        <div class="search__item">
          <el-radio class="radio" v-model="type" label="DAY">日期</el-radio>
          <el-radio class="radio" v-model="type" label="MONTH">月份</el-radio>
        </div>
        <div class="search__item" v-show="type==='DAY'">
          <div class="input">
            <el-date-picker
              v-model="day"
              type="date"
              :clearable="false"
              placeholder="选择日期"
              :picker-options="pickOptions">
            </el-date-picker>
          </div>
        </div>
        <div class="search__item" v-show="type==='MONTH'">
          <div class="input">
            <el-date-picker
              v-model="month"
              type="month"
              :clearable="false"
              placeholder="选择月"
              :picker-options="pickOptions">
            </el-date-picker>
          </div>
        </div>
        <div class="search__item">
          <el-button type="primary" @click="fetchData">查询</el-button>
        </div>
      </search>
    </div>
    <chart-title class="content-title">累计销售完成{{baseData.totalSales}}元，销售额{{baseData.salesUpRate}}%，客流量{{baseData.mCountUpRate}}%，客单价{{baseData.unitPriceUpRate}}%</chart-title>
    <el-row class="content__top" :gutter="12">
      <el-col :lg="12">
        <div class="sales-store">
          <chart-title>各门店销售任务，完成及毛利</chart-title>
          <chart-container>
            <chart :loading="chart.loading" :resizable="true" :option="chart.store.option"></chart>
          </chart-container>
        </div>
      </el-col>
      <el-col :lg="12">
        <div class="sales-month">
          <chart-title>客流客单对照</chart-title>
          <chart-container>
            <chart :loading="chart.loading" :resizable="true" :option="chart.month.option"></chart>
          </chart-container>
        </div>
      </el-col>
    </el-row>
    <el-row class="content__bottom" :gutter="12">
      <el-col :md="12" :lg="8">
        <div class="sales-category">
          <chart-title>各类别销售及毛利对照</chart-title>
          <chart-container>
            <chart :loading="chart.loading" :resizable="true" :option="chart.category.option"></chart>
          </chart-container>
        </div>
      </el-col>
      <el-col :md="12" :lg="8">
        <div class="sales-amount">
          <chart-title>销售贡献TOP10</chart-title>
          <chart-container>
            <chart :loading="chart.loading" :resizable="true" :option="chart.amount.option"></chart>
          </chart-container>
        </div>
      </el-col>
      <el-col :md="12" :lg="8">
        <div class="sales-profit">
          <chart-title>毛利贡献TOP10</chart-title>
          <chart-container>
            <chart :loading="chart.loading" :resizable="true" :option="chart.profit.option"></chart>
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
import {formatDate} from 'common/js/date'
import {getSalesData} from 'api/sales-profile'
import {ERR_OK} from 'api/config'
import {barChartColor} from 'common/js/chartColor'

export default {
  data() {
    return {
      pickOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      day: new Date(),
      month: new Date(),
      lastType: this.$route.params.salesType || 'DAY',
      type: this.$route.params.salesType || 'DAY',
      baseData: {
        totalSales: 0,
        salesUpRate: '',
        mCountUpRate: '',
        unitPriceUpRate: ''
      },
      chart: {
        loading: true,
        barColor: {
          color: barChartColor
        },
        store: {
          ready: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '2%',
              right: '5%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
            }
          },
          option: {
            series: []
          }
        },
        month: {
          option: {
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
              data: ['上月客流', '本月客流', '同期客流', '上月客单价', '本月客单价', '同期客单价']
            },
            xAxis: [
              {
                type: 'category',
                data: ['01', '02', '03', '04', '05', '06'],
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '客流量',
                axisLabel: {
                  formatter: '{value} '
                }
              },
              {
                type: 'value',
                name: '客单价',
                axisLabel: {
                  formatter: '{value} '
                }
              }
            ],
            series: [
              {
                name: '上月客流',
                type: 'bar',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7]
              },
              {
                name: '本月客流',
                type: 'bar',
                data: [135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
              },
              {
                name: '同期客流',
                type: 'bar',
                data: [23.2, 25.6, 76.7, 135.6, 162.2, 32.6]
              },
              {
                name: '上月客单价',
                type: 'line',
                yAxisIndex: 1,
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2]
              },
              {
                name: '本月客单价',
                type: 'line',
                yAxisIndex: 1,
                data: [20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
              },
              {
                name: '同期客单价',
                type: 'line',
                yAxisIndex: 1,
                data: [4.5, 6.3, 10.2, 20.3, 23.4, 23.0]
              }
            ]
          }
        },
        category: {
          ready: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '5%',
              bottom: '3%',
              top: '80',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.2]
            }
          },
          option: {
            series: []
          }
        },
        amount: {
          ready: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '2%',
              right: '5%',
              bottom: '3%',
              top: '20',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.5]
            }
          },
          option: {
            series: []
          }
        },
        profit: {
          ready: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '2%',
              right: '5%',
              bottom: '3%',
              top: '20',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.5]
            }
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
      this._getSalesData()
    },
    _getRate(rate) {
      if (rate < 0) {
        return `下降${-rate}`
      } else {
        return `上升${rate}`
      }
    },
    _getSalesData() {
      this.chart.loading = true
      let params = {
        type: this.type,
        dateStr: this.type === 'DAY' ? formatDate('yyyy-MM-dd', this.day) : formatDate('yyyy-MM', this.month)
      }
      getSalesData(params).then((res) => {
        if (res.code === ERR_OK) {
          this.baseData.mCountUpRate = this._getRate(res.result.mCountUpRate)
          this.baseData.unitPriceUpRate = this._getRate(res.result.unitPriceUpRate)
          this.baseData.totalSales = res.result.totalSales
          this.baseData.salesUpRate = this._getRate(res.result.salesUpRate)

          this.chart.loading = false
          this.chart.store.option = Object.assign({}, this.chart.barColor, this.chart.store.ready, res.result.options[0])
          this.chart.category.option = Object.assign({}, this.chart.barColor, this.chart.category.ready, res.result.options[1])
          this.chart.amount.option = Object.assign({}, this.chart.barColor, this.chart.amount.ready, res.result.options[2])
          this.chart.profit.option = Object.assign({}, this.chart.barColor, this.chart.profit.ready, res.result.options[3])
        }
      })
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
    if (this.$route.params.salesType) {
      this.type = this.$route.params.salesType
    }
    if (this.type !== this.lastType) {
      this.fetchData()
    }
  },
  deactivated() {
    this.lastType = this.type
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
    height: 600px;
  }
}
.content__bottom {
  .chart-container {
    height: 400px;
  }
}
</style>

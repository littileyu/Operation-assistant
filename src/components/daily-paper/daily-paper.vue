<!-- 总部日报 -->
<template>
  <div class="daily-paper">
    <div class="top-nav">
      <router-link :to="{name: 'storeDaily', params: {text: '门店日报'}}" @click.native="addToTop">
        <el-button type="primary">查看门店日报</el-button>
      </router-link>
      <router-link :to="{name: 'staffReport', params: {text: '人员报告'}}" @click.native="addToTop">
        <el-button type="primary">查看人员报告</el-button>
      </router-link>
      <router-link :to="{name: 'distributionReport', params: {text: '配送报告'}}" @click.native="addToTop">
        <el-button type="primary">查看配送报告</el-button>
      </router-link>
      <router-link :to="{name: 'purchaseReport', params: {text: '采购报告'}}" @click.native="addToTop">
        <el-button type="primary">查看采购报告</el-button>
      </router-link>
      <router-link :to="{name: 'salesProfile', params: {text: '销售概况', salesType: 'DAY'}}" @click.native="addToTop">
        <el-button type="primary">查看销售概况</el-button>
      </router-link>
      <router-link :to="{name: 'storeEvaluation', params: {text: '门店评估'}}" @click.native="addToTop">
        <el-button type="primary">查看门店评估</el-button>
      </router-link>
      <router-link :to="{name: 'memberAll', params: {text: '会员概况'}}" @click.native="addToTop">
        <el-button type="primary">查看会员概况</el-button>
      </router-link>
    </div>

    <chart-title class="content-title">[{{yesterday}}]销售共计: {{baseData.totalSales}}元</chart-title>

    <el-row :gutter="12">
      <el-col :lg="12">
        <div class="sales-store">
          <chart-title>各门店销售完成状况</chart-title>
          <chart-container>
            <chart :loading="chart.loading" :resizable="true" :option="chart.store.option"></chart>
          </chart-container>
        </div>
      </el-col>
      <el-col :lg="12">
        <div class="sales-customer">
          <chart-title>昨日整体客流[{{baseData.yestodayCount}}]人，同比去年{{upCountRate}}，客单价[{{baseData.yestodayUnitPrice}}]同比{{upPriceRate}}</chart-title>
          <chart-container>
            <chart :loading="chart.loading" :resizable="true" :option="chart.customer.option"></chart>
          </chart-container>
        </div>
      </el-col>
    </el-row>

    <div class="sales-circle">
      <ul class="circle__list">
        <li class="circle__item" @click="showReturnDialog">
          <o-circle :stroke-width="10" :width="150" :percentage="baseData.avgReturnRate" title="平均退货率" strokeColor="#2b82be"></o-circle>
        </li>
        <li class="circle__item" @click="showLackDialog">
          <o-circle :stroke-width="10" :width="150" :percentage="baseData.avgOutStockRate" title="平均缺货率" strokeColor="#76ddfb"></o-circle>
        </li>
        <li class="circle__item" @click="showDiscountDialog">
          <o-circle :stroke-width="10" :width="150" :percentage="baseData.avgDiscountRate" title="平均折扣率" strokeColor="#2b82be"></o-circle>
        </li>
        <li class="circle__item" @click="showUnsalableDialog">
          <o-circle :stroke-width="10" :width="150" :percentage="baseData.avgUnSaleRate" title="平均滞销率" strokeColor="#76ddfb"></o-circle>
        </li>
      </ul>
    </div>

    <el-row :gutter="12">
      <el-col :md="12">
        <div class="sales-category">
          <chart-title>类别销售分布</chart-title>
          <chart-container>
            <chart :loading="chart.loading" :resizable="true" :option="chart.category.option" @click="showCategoryDialog"></chart>
          </chart-container>
        </div>
      </el-col>
      <el-col :md="12">
        <div class="sales-member">
          <chart-title>昨日会员概况</chart-title>
          <chart-container>
            <chart :loading="chart.loading" :resizable="true" :option="chart.member.option" @click="showMemberDialog"></chart>
          </chart-container>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="各门店折扣率" :visible.sync="dialog.discount.visible">
      <div class="chart-dialog chart-dialog--discount">
        <chart :resizable="true" :option="dialog.discount.option"></chart>
      </div>
    </el-dialog>
    <el-dialog title="各门店退货率" :visible.sync="dialog.return.visible">
      <div class="chart-dialog chart-dialog--return">
        <chart :resizable="true" :option="dialog.return.option"></chart>
      </div>
    </el-dialog>
    <el-dialog title="各门店缺货率" :visible.sync="dialog.lack.visible">
      <div class="chart-dialog chart-dialog--return">
        <chart :resizable="true" :option="dialog.lack.option"></chart>
      </div>
    </el-dialog>
    <el-dialog title="各门店滞销率" :visible.sync="dialog.unsalable.visible">
      <div class="chart-dialog chart-dialog--unsalable">
        <chart :resizable="true" :option="dialog.unsalable.option"></chart>
      </div>
    </el-dialog>
    <el-dialog title="各品牌销售明细" :visible.sync="dialog.category.visible">
      <div class="chart-dialog chart-dialog--category">
        <chart :loading="dialog.category.loading" :resizable="true" :option="dialog.category.option"></chart>
      </div>
    </el-dialog>
    <el-dialog :title="dialog.member.title" :visible.sync="dialog.member.visible">
      <div class="chart-dialog chart-dialog--member">
        <chart :loading="dialog.member.loading" :resizable="true" :option="dialog.member.option"></chart>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Chart from 'vue-echarts-v3/src/full'
import ChartTitle from 'base/chart-title/chart-title'
import ChartContainer from 'base/chart-container/chart-container'
import OCircle from 'base/o-circle/o-circle'
import {formatDate} from 'common/js/date'
import {addToTopMixin} from 'common/js/mixin'
import {barChartColor, chartColor, lineChartColor} from 'common/js/chartColor'
import {getChartOptions, getCategoryDialogOption, getRatesDialogOptions, getMemberDialogOptions} from 'api/daily-paper'
import {ERR_OK} from 'api/config'

export default {
  mixins: [addToTopMixin],
  data() {
    return {
      baseData: {
        yestodayCount: 0,
        upCountRate: '',
        yestodayUnitPrice: 0,
        upPriceRate: '',
        totalSales: 0,
        avgReturnRate: 0,
        avgOutStockRate: 0,
        avgDiscountRate: 0,
        avgUnSaleRate: 0
      },
      chart: {
        barColor: {
          color: barChartColor
        },
        pieColor: {
          color: chartColor
        },
        lineColor: {
          color: lineChartColor
        },
        loading: true,
        store: {
          ready: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['昨日实销', '同期实销']
            },
            grid: {
              left: '3%',
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
        customer: {
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
              data: ['客流量', '同期客流', '客单价', '同期客单价']
            },
            grid: {
              left: '3%',
              right: '3%',
              bottom: '3%',
              containLabel: true
            },
            yAxis: [
              {
                type: 'value',
                name: '客流',
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
        category: {
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
        member: {
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
        }
      },
      dialog: {
        lineReady: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          }
        },
        return: {
          visible: false,
          option: {
            series: []
          }
        },
        lack: {
          visible: false,
          option: {
            series: []
          }
        },
        discount: {
          visible: false,
          option: {
            series: []
          }
        },
        unsalable: {
          visible: false,
          option: {
            series: []
          }
        },
        category: {
          visible: false,
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
        member: {
          visible: false,
          title: '各门店会员情况',
          loading: true,
          ready: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            }
          },
          option: {
            series: []
          },
          options: []
        }
      }
    }
  },
  computed: {
    upCountRate() {
      return this._getTrend(this.baseData.upCountRate)
    },
    upPriceRate() {
      return this._getTrend(this.baseData.upPriceRate)
    }
  },
  methods: {
    fetchData() {
      this._getChartOptions()
      this._getRatesDialogOptions()
    },
    showReturnDialog() {
      this.dialog.return.visible = true
    },
    showLackDialog() {
      this.dialog.lack.visible = true
    },
    showDiscountDialog() {
      this.dialog.discount.visible = true
    },
    showUnsalableDialog() {
      this.dialog.unsalable.visible = true
    },
    showCategoryDialog(params) {
      this.dialog.category.visible = true
      this._getCategoryDialogOption(params.name)
    },
    showMemberDialog(params) {
      this.dialog.member.title = `各门店${params.name}情况`
      this.dialog.member.visible = true
      if (!this.dialog.member.options.length) {
        this._getMemberDialogOptions(params.dataIndex).then((index) => {
          this._setMemberDialogOption(index)
        })
      } else {
        this._setMemberDialogOption(params.dataIndex)
      }
    },
    _setMemberDialogOption(index) {
      this.dialog.member.loading = false
      this.dialog.member.option = Object.assign({}, this.dialog.member.ready, this.dialog.member.options[index])
    },
    getYesterday() {
      let date = new Date()
      date.setDate(date.getDate() - 1)
      this.yesterday = formatDate('yyyy-MM-dd', date)
    },
    _getTrend(str) {
      return str.charAt(0) === '-' ? `下降${str.slice(1)}` : `上涨${str}`
    },
    _getChartOptions() {
      getChartOptions().then((res) => {
        if (res.code === ERR_OK) {
          this.baseData.yestodayCount = res.yestodayCount
          this.baseData.upCountRate = res.upCountRate
          this.baseData.yestodayUnitPrice = res.yestodayUnitPrice
          this.baseData.upPriceRate = res.upPriceRate
          this.baseData.totalSales = res.totalSales

          this.chart.loading = false
          this.chart.store.option = Object.assign({}, this.chart.barColor, this.chart.store.ready, res.options[0])
          this.chart.customer.option = Object.assign({}, this.chart.barColor, this.chart.customer.ready, res.options[1])
          this.chart.category.option = Object.assign({}, this.chart.pieColor, this.chart.category.ready, res.options[2])
          this.chart.member.option = Object.assign({}, this.chart.barColor, this.chart.member.ready, res.options[3])
        }
      })
    },
    _getCategoryDialogOption(category) {
      this.dialog.category.loading = true
      getCategoryDialogOption(category).then((res) => {
        if (res.code === ERR_OK) {
          this.dialog.category.loading = false
          this.dialog.category.option = Object.assign({}, this.chart.pieColor, this.dialog.category.ready, res.option)
        }
      })
    },
    _getRatesDialogOptions() {
      getRatesDialogOptions().then((res) => {
        if (res.code === ERR_OK) {
          this.baseData.avgReturnRate = res.avgReturnRate
          this.baseData.avgOutStockRate = res.avgOutStockRate
          this.baseData.avgDiscountRate = res.avgDiscountRate
          this.baseData.avgUnSaleRate = res.avgUnSaleRate

          this.dialog.return.option = Object.assign({}, this.chart.lineColor, this.dialog.lineReady, res.options[0])
          this.dialog.lack.option = Object.assign({}, this.chart.lineColor, this.dialog.lineReady, res.options[1])
          this.dialog.discount.option = Object.assign({}, this.chart.lineColor, this.dialog.lineReady, res.options[2])
          this.dialog.unsalable.option = Object.assign({}, this.chart.lineColor, this.dialog.lineReady, res.options[3])
        }
      })
    },
    _getMemberDialogOptions(index) {
      this.dialog.member.loading = true
      return new Promise((resolve, reject) => {
        getMemberDialogOptions().then((res) => {
          if (res.code === ERR_OK) {
            this.dialog.member.options = res.options
            resolve(index)
          }
        })
      })
    }
  },
  components: {
    OCircle,
    Chart,
    ChartTitle,
    ChartContainer
  },
  created() {
    this.getYesterday()
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.top-nav {
  padding: $gutter;
  background-color: $color-background-l;
  margin-bottom: $gutter-big;
}
.el-col {
  margin-top: $gutter;
}
.sales-store,
.sales-customer {
  .chart-container {
    height: 400px;
  }
}
.sales-circle {
  padding: $gutter;
  background-color: #fff;
  border: 1px solid $color-border;
  margin-top: $gutter;
  .circle__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .circle__item {
    cursor: pointer;
  }
}
.sales-category,
.sales-member {
  .chart-container {
    height: 300px;
  }
}
.chart-dialog {
  height: 400px;
}
</style>

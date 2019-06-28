<!-- 折让监控 -->
<template>
  <div class="discount-monitor">
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
    <div class="content">
      <chart-title class="content-title">{{shopName}}{{thisMonth}}月平均折扣为：{{baseData.discountRate}}%，平均费销比为：{{baseData.avgRate}}%</chart-title>
      <el-row :gutter="12" class="content-top">
        <el-col :lg="12">
          <div class="sales-way">
            <chart-title>收银优惠方式</chart-title>
            <chart-container>
              <chart :loading="chart.loading" @click="showPriceDialog" :resizable="true" :option="chart.way.option"></chart>
            </chart-container>
          </div>
        </el-col>
        <el-col :lg="12">
          <div class="sales-category">
            <chart-title>各类别实销金额折让金额及平均折扣</chart-title>
            <chart-container>
              <chart :loading="chart.loading" @click="changeBrandOption" :resizable="true" :option="chart.category.option"></chart>
            </chart-container>
          </div>
        </el-col>
      </el-row>
      <div class="sales-brand">
        <chart-title>按类别各品牌同单销售金额、折让金额、同单平均折扣分析</chart-title>
        <chart-container>
          <chart :loading="chart.loading || chart.brand.loading" @click="showSalesDialog" :resizable="true" :option="chart.brand.option"></chart>
        </chart-container>
      </div>
    </div>
    <el-dialog :title="dialog.price.title" :visible.sync="dialog.price.visible">
      <div class="chart-dialog">
        <chart :loading="dialog.price.loading" :resizable="true" :option="dialog.price.option"></chart>
      </div>
    </el-dialog>
    <el-dialog :title="dialog.sales.title" :visible.sync="dialog.sales.visible">
      <div class="dialog__tb">
        <el-table
          :data="dialog.sales.tableData"
          v-loading="dialog.sales.tableLoading"
          border
          height="600"
          show-summary
          :summary-method="getSummaries"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="sn"
            label="单号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="时间"
            width="150">
            <template scope="scope">
              {{transformDates(scope.row.createDate)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            label="会员手机号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="memberName"
            label="会员名"
            width="150">
          </el-table-column>
          <el-table-column
            label="条码"
            width="150">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.brandSalesItems">
                  {{good.barCode}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            width="250">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.brandSalesItems">
                  {{good.name}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="标价"
            width="100">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.brandSalesItems">
                  {{good.price}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="售价"
            width="100">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.brandSalesItems">
                  {{good.salesPrice}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="销售数量"
            width="100">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.brandSalesItems">
                  {{good.quantity}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="退货数量"
            width="100">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.brandSalesItems">
                  {{good.returnQuantity}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="销售金额"
            width="120">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.brandSalesItems">
                  {{(good.quantity * good.salesPrice).toFixed(2)}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="退货金额"
            width="120">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.brandSalesItems">
                  {{(good.returnQuantity * good.salesPrice).toFixed(2)}}
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Search from 'base/search/search'
import Chart from 'vue-echarts-v3/src/full'
import ChartTitle from 'base/chart-title/chart-title'
import ChartContainer from 'base/chart-container/chart-container'
import {formatDate} from 'common/js/date'
import {getShopListMixin} from 'common/js/mixin'
import {ERR_OK} from 'api/config'
import {getChartOptions, getBrandOption, getSalesList} from 'api/discount-monitor'
import {chartColor, barChartColor} from 'common/js/chartColor'

export default {
  mixins: [getShopListMixin],
  data() {
    return {
      shopId: this.$route.params.shopId || null,
      shopName: this.$route.params.shopName || '全店',
      baseData: {},
      category: '',
      chart: {
        loading: true,
        pieColor: {
          color: chartColor
        },
        barColor: {
          color: barChartColor
        },
        way: {
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
        category: {
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
            grid: {
              left: '3%',
              right: '3%',
              bottom: '3%',
              containLabel: true
            },
            legend: {
              data: ['销售金额', '折让金额', '平均折让']
            },
            yAxis: [
              {
                type: 'value',
                name: '金额',
                axisLabel: {
                  formatter: '{value}'
                }
              },
              {
                type: 'value',
                name: '折让',
                axisLabel: {
                  formatter: '{value}%'
                }
              }
            ]
          },
          option: {
            series: []
          }
        },
        brand: {
          loading: false,
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
              data: ['销售金额', '折让金额', '平均折让']
            },
            yAxis: [
              {
                type: 'value',
                name: '金额',
                axisLabel: {
                  formatter: '{value}'
                }
              },
              {
                type: 'value',
                name: '折让率',
                axisLabel: {
                  formatter: '{value}%'
                }
              }
            ]
          },
          option: {
            series: []
          }
        }
      },
      dialog: {
        price: {
          visible: false,
          title: '收银员操作分析',
          loading: false,
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
            yAxis: [
              {
                type: 'value',
                name: '金额',
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
        sales: {
          visible: false,
          title: '同单销售明细',
          tableLoading: true,
          tableData: []
        }
      }
    }
  },
  methods: {
    fetchData() {
      this._getShopOptions()
      this.search()
    },
    showPriceDialog(params) {
      this.dialog.price.visible = true
    },
    showSalesDialog(params) {
      this.dialog.sales.visible = true
      this.dialog.sales.tableLoading = true
      let apiParams = {
        shopId: this.shopId,
        category: this.category,
        brand: params.name
      }
      getSalesList(apiParams).then((res) => {
        if (res.code === ERR_OK) {
          this.dialog.sales.tableLoading = false
          this.dialog.sales.tableData = res.list
        }
      })
    },
    transformDates(timeStamp) {
      let date = new Date(timeStamp)
      return formatDate('yyyy-MM-dd', date)
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 9) {
          let sum = 0
          data.forEach(item => {
            let itemSum = 0
            item.brandSalesItems.forEach(good => {
              itemSum += good.quantity
            })
            sum += itemSum
          })
          sums[index] = sum
          return
        }
        if (index === 10) {
          let sum = 0
          data.forEach(item => {
            let itemSum = 0
            item.brandSalesItems.forEach(good => {
              itemSum += good.returnQuantity
            })
            sum += itemSum
          })
          sums[index] = sum
          return
        }
        if (index === 11) {
          let sum = 0
          data.forEach(item => {
            let itemSum = 0
            item.brandSalesItems.forEach(good => {
              itemSum += Number((good.quantity * good.salesPrice).toFixed(2))
            })
            sum += itemSum
          })
          sums[index] = sum.toFixed(2)
          return
        }
        if (index === 12) {
          let sum = 0
          data.forEach(item => {
            let itemSum = 0
            item.brandSalesItems.forEach(good => {
              itemSum += Number((good.returnQuantity * good.salesPrice).toFixed(2))
            })
            sum += itemSum
          })
          sums[index] = sum.toFixed(2)
          return
        }
      })
      return sums
    },
    _getChartOptions() {
      this.chart.loading = true
      getChartOptions(this.shopId).then((res) => {
        if (res.code === ERR_OK) {
          this.baseData.discountRate = res.result.discountRate
          this.baseData.avgRate = res.result.avgRate

          this.chart.loading = false
          this.category = res.result.defautlCategory
          this.chart.way.option = Object.assign({}, this.chart.pieColor, this.chart.way.ready, res.result.options[0])
          this.chart.category.option = Object.assign({}, this.chart.barColor, this.chart.category.ready, res.result.options[1])
          this.chart.brand.option = Object.assign({}, this.chart.barColor, this.chart.brand.ready, res.result.options[2])
          this.dialog.price.option = Object.assign({}, this.chart.barColor, this.dialog.price.ready, res.result.options[3])
        }
      })
    },
    _getBrandOption(shopId, category) {
      this.chart.brand.loading = true
      getBrandOption(shopId, category).then((res) => {
        if (res.code === ERR_OK) {
          this.chart.brand.loading = false
          this.chart.brand.option = Object.assign({}, this.chart.barColor, this.chart.brand.ready, res.options)
        }
      })
    },
    changeBrandOption(params) {
      this._getBrandOption(this.shopId, params.name)
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
      this._getChartOptions()
    }
  },
  components: {
    Search,
    Chart,
    ChartTitle,
    ChartContainer
  },
  created() {
    this.thisMonth = formatDate('yyyy-MM')
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

.discount-monitor {
  .chart-dialog {
    height: 300px;
  }
}
.content-title {
  margin-bottom: $gutter;
}
.sales-way,
.sales-category {
  margin-bottom: $gutter;
  .chart-container {
    height: 300px;
  }
}
.sales-brand {
  .chart-container {
    height: 300px;
  }
}
.dialog__tb {
  padding: 30px 20px;
  .tb__rowspan {
    margin-left: -18px;
    margin-right: -18px;
  }
  .tb__cell {
    padding-left: 18px;
    padding-right: 18px;
    line-height: 40px;
    border-bottom: 1px solid #dfe6ec;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>

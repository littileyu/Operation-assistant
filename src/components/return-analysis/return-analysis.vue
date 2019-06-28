<!-- 退货分析 -->
<template>
  <div class="return-analysis">
    <div class="search-wrapper">
      <search>
        <div class="search__item">
          <span class="title">门店：</span>
          <div class="input">
            <el-select v-model="shopId" clearable placeholder="请选择">
              <el-option
                v-for="shop in shops"
                :key="shop.id"
                :label="shop.value"
                :value="shop.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="search__item">
          <span class="title">月份：</span>
          <div class="input">
            <el-date-picker
              v-model="monthValue"
              :default-value="monthValue"
              type="month"
              :clearable="false"
              placeholder="选择月">
            </el-date-picker>
          </div>
        </div>
        <div class="search__item">
          <el-button type="primary" @click="query">查询</el-button>
        </div>
      </search>
    </div>
    <div class="content">
      <chart-title class="content-title">{{shopName}}{{monthNum}}月退货金额为：{{totalReturnPrice}}元，退货率为：{{returnRate}}%</chart-title>
      <div class="return-category">
        <chart-title>{{shopName}}{{monthNum}}月各类别退货金额及退货率</chart-title>
        <chart-container>
          <div class="no-chartdata" v-if="chart.category.nodata">
            暂时还没有数据
          </div>
          <chart v-else :loading="chartLoading" @click="showBrandDialog" :resizable="true" :option="chart.category.option"></chart>
        </chart-container>
      </div>
      <el-row :gutter="12">
        <el-col :lg="12">
          <div class="return-month">
            <chart-title>{{shopName}}{{monthNum.slice(0,4)}}年度退货率走势</chart-title>
            <chart-container>
              <chart :loading="chartLoading" :resizable="true" :option="chart.month.option"></chart>
            </chart-container>
          </div>
        </el-col>
        <el-col :lg="12">
          <div class="return-rate">
            <chart-title>本月退货品牌TOP10</chart-title>
            <chart-container>
              <chart :loading="chartLoading" @click="showSalesDialog" :resizable="true" :option="chart.rate.option"></chart>
            </chart-container>
          </div>
        </el-col>
      </el-row>
      <div class="return-goods">
        <chart-title>退货清单</chart-title>
        <div class="goods__tb">
          <el-table
            :data="tableData"
            v-loading="returnsListLoading"
            border
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="barCode"
              label="条码">
            </el-table-column>
            <el-table-column
              prop="memberName"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="returnQuantity"
              label="退货数量">
            </el-table-column>
            <el-table-column
              prop="returnPrice"
              label="退货金额">
            </el-table-column>
            <el-table-column
              prop="username"
              label="会员手机号">
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="page.pageNumber"
              :page-size="page.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="page.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="dialog.brand.title" :visible.sync="dialog.brand.visible">
      <div class="chart-dialog">
        <chart :resizable="true" :option="dialog.brand.option"></chart>
      </div>
    </el-dialog>
    <el-dialog @close="closeBrandSalesDialog" :title="dialog.sales.title" :visible.sync="dialog.sales.visible">
      <div class="dialog__tb">
        <el-table
          :data="dialog.sales.tableData"
          border
          :summary-method="getSummaries"
          show-summary
          v-loading="BrandSalesLoading"
          height="500"
          style="width: 100%">
          <el-table-column
            prop="index"
            label="序号"
            width="70">
          </el-table-column>
          <el-table-column
            prop="sn"
            label="单号"
            width="150">
          </el-table-column>
          <el-table-column
            label="时间"
            width="120">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell">
                  {{transformDates(scope.row.createDate)}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="memberName"
            label="会员名称"
            width="160">
          </el-table-column>
          <el-table-column
            prop="username"
            label="会员手机号"
            width="130">
          </el-table-column>
          <el-table-column
            label="条码"
            width="200">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="value in scope.row.brandSalesItems">
                  {{value.barCode}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            width="230">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.brandSalesItems">
                  {{good.name}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="原价"
            width="120">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.brandSalesItems">
                  {{good.price}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="零售单价"
            width="120">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.brandSalesItems">
                  {{good.salesPrice}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="购买数量"
            width="120">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.brandSalesItems">
                  {{good.quantity}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="已退数量"
            width="120">
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
            label="退款金额"
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
        <div class="pagination">
          <el-pagination
            @current-change="handleCurrentChangeBrandSales"
            :current-page="BrandSalesPage.pageNumber"
            :page-size="BrandSalesPage.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="BrandSalesPage.total">
          </el-pagination>
        </div>
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
import {ERR_OK} from 'api/config'
import {getReturnsData, getReturnsList, getBrandSales, getBrandCategory} from 'api/return-analysis'
import {getShopListMixin} from 'common/js/mixin'

export default {
  mixins: [getShopListMixin],
  data() {
    return {
      chart: {
        category: {
          nodata: false,
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
              // data: ['时销金额', '退货金额', '退货率']
              data: []
            },
            xAxis: [
              {
                type: 'category',
                data: [],
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
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
                name: '退货率',
                axisLabel: {
                  formatter: '{value}%'
                }
              }
            ],
            series: []
          }
        },
        month: {
          option: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            xAxis: {
              type: 'category',
              axisLabel: {
                formatter: '{value}月'
              },
              data: []
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value}%'
              },
              axisPointer: {
                snap: true
              }
            },
            series: [
              {
                name: '退货率',
                type: 'line',
                smooth: true,
                data: []
              }
            ]
          }
        },
        rate: {
          option: {
            noDataLoadingOption: {
              text: '暂无数据',
              effect: 'bubble',
              effectOption: {
                effect: {
                  n: 0
                }
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [{
              name: '退货品牌',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]
          }
        }
      },
      dialog: {
        brand: {
          visible: false,
          title: '各品牌退货分析',
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
              data: []
            },
            xAxis: [
              {
                type: 'category',
                data: [],
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
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
                name: '退货率',
                axisLabel: {
                  formatter: '{value}%'
                }
              }
            ],
            series: [
              {
                name: '时销金额',
                type: 'bar',
                data: [20, 49, 70, 23, 26]
              },
              {
                name: '退货金额',
                type: 'bar',
                data: [2, 4, 7, 2, 5]
              },
              {
                name: '退货率',
                type: 'line',
                yAxisIndex: 1,
                data: [2.0, 2.2, 3.3, 4.5, 6.3]
              }
            ]
          }
        },
        sales: {
          visible: false,
          title: '品牌销售明细表',
          tableData: []
        }
      },
      month: (new Date()).getMonth() + 1,
      monthNum: formatDate('yyyy-MM', this.monthValue),
      totalReturnPrice: 0,
      monthValue: new Date(),
      returnRate: 0,
      page: { // 退货清单分页
        pageNumber: 1,
        pageSize: 20,
        total: 0
      },
      BrandSalesPage: { // 退货品牌TOP10-弹出品牌销售明细 分页
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      BrandSalesLoading: true,
      returnsListLoading: true,
      BrandSalesBrandName: '',
      chartLoading: true,
      shopName: this.$route.params.shopName || '全店',
      shopId: this.$route.params.shopId || null,
      tableData: [
        {
          barcode: 69079,
          name: '惠氏',
          num: 2,
          count: 984,
          vipcode: 888
        },
        {
          barcode: 69079,
          name: '惠氏',
          num: 2,
          count: 984,
          vipcode: 888
        },
        {
          barcode: 69079,
          name: '惠氏',
          num: 2,
          count: 984,
          vipcode: 888
        }
      ]
    }
  },
  computed: {
    thisYear() {
      return formatDate('yyyy')
    },
    thisMonth() {
      return formatDate('yyyy-MM')
    },
    transformDate(timeStamp) {
      return formatDate('yyyy-MM-dd', timeStamp)
    }
  },
  methods: {
    fetchData() {
      this._getShopOptions()
      this.query()
    },
    closeBrandSalesDialog() { // 关闭 退货品牌TOP10-弹出品牌销售明细
      this.BrandSalesPage.pageNumber = 1
    },
    transformDates(timeStamp) {
      let date = new Date(timeStamp)
      return formatDate('yyyy-MM-dd', date)
    },
    _getReturnsData() {  // get退货分析
      this.chartLoading = true
      this.chart.category.nodata = false
      getReturnsData({
        month: this.monthNum,
        shopId: this.shopId
      }).then((res) => {
        if (res.code === ERR_OK) {
          this.chartLoading = false
          this.returnRate = res.result.data.returnRate // 退货金额
          this.totalReturnPrice = res.result.data.totalReturnPrice // 退货率
          this.chart.category.option.series = res.result.options[0].series // 各类别退货金额及退货率
          this.chart.category.nodata = this.chart.category.option.series.every((item) => {
            return !item.data || item.data.length === 0
          })
          this.chart.category.option.xAxis = res.result.options[0].xAxis
          for (let i in res.result.options[0].series) {
            this.chart.category.option.legend.data.push(res.result.options[0].series[i].name)
          }
          this.chart.month.option.series = res.result.options[1].series // 年度退货率走势
          this.chart.month.option.xAxis = res.result.options[1].xAxis
          this.chart.rate.option.xAxis = res.result.options[2].xAxis // 本月退货品牌TOP10
          this.chart.rate.option.series = res.result.options[2].series
        }
      })
    },
    _normalizeList(page) { // 计算分页的索引
      let list = page.list
      let pageNum = page.pageNum
      let pageSize = page.pageSize
      list.forEach((item, index) => {
        item.index = (pageNum - 1) * pageSize + 1 + index
      })
      return list
    },
    _getReturnsList() { // get -退货清单
      let params = {
        month: this.monthNum,
        shopId: this.shopId,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      this.returnsListLoading = true
      getReturnsList(params).then((res) => {
        if (res.code === ERR_OK) {
          this.returnsListLoading = false
          this.tableData = this._normalizeList(res.page)
          this.page.total = res.page.total
        }
      })
    },
    _getBrandSales(name) { // get退货品牌TOP10-弹出品牌销售明细
      let params = {
        month: this.monthNum,
        brand: name,
        pageNumber: this.BrandSalesPage.pageNumber,
        pageSize: this.BrandSalesPage.pageSize
      }
      this.BrandSalesLoading = true
      getBrandSales(params).then((res) => {
        if (res.code === ERR_OK) {
          this.BrandSalesLoading = false
          this.dialog.sales.tableData = this._normalizeList(res.page)
          this.dialog.sales.tableData.goods = res.page.list.brandSalesItem
          this.BrandSalesPage.pageNumber = res.page.pageNum
          this.BrandSalesPage.pageSize = res.page.pageSize
          this.BrandSalesPage.total = res.page.total
        }
      })
    },
    _getBrandCategory(category) {
      let params = {
        category: category,
        month: this.monthNum
      }
      getBrandCategory(params).then((res) => {
        if (res.code === ERR_OK) {
          this.dialog.brand.option.series = res.option.series
          this.dialog.brand.option.xAxis = res.option.xAxis
          res.option.series.forEach(e => {
            this.dialog.brand.option.legend.data.push(e.name)
          })
        }
      })
    },
    query() {
      this._getShopName()
      this.monthNum = formatDate('yyyy-MM', this.monthValue)
      this._getReturnsData()
      this._getReturnsList()
    },
    handleCurrentChange(pageNum) {
      this.page.pageNumber = pageNum
      this._getReturnsList()
    },
    handleCurrentChangeBrandSales(pageNum) { // 退货品牌TOP10-弹出品牌销售明细 分页
      this.BrandSalesPage.pageNumber = pageNum
      this._getBrandSales(this.BrandSalesBrandName)
    },
    showBrandDialog(params) {
      this._getBrandCategory(params.name)
      this.dialog.brand.visible = true
    },
    showSalesDialog(params) {
      this._getBrandSales(params.name)
      this.BrandSalesBrandName = params.name
      this.dialog.sales.visible = true
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 9) { // 购买数量合计
          let sum = 0
          data.forEach(item => {
            item.brandSalesItems.forEach(e => {
              sum += e.quantity
            })
          })
          sums[index] = sum
        }
        if (index === 10) { // 已退数量合计
          let sum = 0
          data.forEach(item => {
            item.brandSalesItems.forEach(e => {
              sum += e.returnQuantity
            })
          })
          sums[index] = sum
        }
        if (index === 11) { // 销售金额合计
          let sum = 0
          data.forEach(item => {
            item.brandSalesItems.forEach(e => {
              sum += e.quantity * e.salesPrice
            })
          })
          sums[index] = sum.toFixed(2)
        }
        if (index === 12) { // 退款金额合计
          let sum = 0
          data.forEach(item => {
            item.brandSalesItems.forEach(e => {
              sum += e.returnQuantity * e.salesPrice
            })
          })
          sums[index] = sum.toFixed(2)
        }
      })
      return sums
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
      this.query()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.return-category {
  margin-top: $gutter;
  margin-bottom: $gutter;
  .chart-container {
    height: 300px;
  }
}
.return-month,
.return-rate {
  margin-bottom: $gutter;
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
    border-bottom: 1px solid #dfe6ec;
    &:last-child {
      border-bottom: none;
    }
  }
}
.chart-dialog {
  height: 300px;
}
.no-chartdata {
  display: flex;
  justify-content: center;
  align-items:center;
  height: 100%;
}
</style>

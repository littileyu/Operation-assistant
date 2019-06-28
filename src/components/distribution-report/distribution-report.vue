<!-- 配送报告 -->
<template>
  <div class="distribution-report">
    <el-row :gutter="12" class="content-row">
      <el-col :lg="12" class="dis-allstore">
        <chart-title>仓库库存结构</chart-title>
        <chart-container>
          <chart :loading="chart.chartLoading" @click="showCategoryDialog" :resizable="true" :option="chart.allStore.option"></chart>
        </chart-container>
      </el-col>
      <el-col :lg="12" class="dis-category">
        <chart-title>仓库进销存</chart-title>
        <chart-container>
          <chart :loading="chart.chartLoading" :resizable="true" :option="chart.category.option"></chart>
        </chart-container>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="content-row">
      <el-col :lg="12" class="dis-everystore">
        <chart-title>各门店库存结构</chart-title>
        <chart-container>
          <chart :loading="chart.chartLoading" @click="showStoreDialog" :resizable="true" :option="chart.everyStore.option"></chart>
        </chart-container>
      </el-col>
      <!-- <el-col :lg="12" class="dis-order">
        <chart-title>昨日仓库配出订单[45]单</chart-title>
        <chart-container>
          <chart :loading="chart.chartLoading" @click="showDeliveryDialog" :resizable="true" :option="chart.order.option"></chart>
        </chart-container>
      </el-col> -->
      <el-col :lg="12" class="dis-tb">
        <div class="tb__list">
          <el-tabs @tab-click="switchTab">
            <el-tab-pane label="异常条码">
              <div class="tb__data">
                <el-table
                  :data="tabs.unusual.list"
                  border
                  v-loading="tabs.unusual.loading"
                  height="380"
                  style="width: 100%">
                  <el-table-column
                    prop="index"
                    width="80"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    prop="barCode"
                    label="商品条码"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="商品名称"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="productCategory"
                    label="商品类别"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="stock"
                    label="库存数量"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="price"
                    label="零售单价"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="quentyTotal"
                    label="库存金额"
                    width="120">
                  </el-table-column>
                </el-table>
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="tabs.unusual.pageNumber"
                  :page-size="tabs.pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="tabs.unusual.total">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="库存预警">
              <div class="tb__data">
                <el-table
                  :data="tabs.warn.list"
                  border
                  v-loading="tabs.warn.loading"
                  height="380"
                  style="width: 100%">
                  <el-table-column
                    prop="index"
                    width="80"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    prop="barCode"
                    label="商品条码"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="商品名称"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="productCategory"
                    label="商品类别"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="stock"
                    label="库存数量"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="price"
                    label="零售单价"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="quentyTotal"
                    label="库存金额"
                    width="120">
                  </el-table-column>
                </el-table>
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="tabs.unusual.pageNumber"
                  :page-size="tabs.pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="tabs.warn.total">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="滞销条码">
              <div class="tb__data">
                <el-table
                  :data="tabs.unsale.list"
                  border
                  v-loading="tabs.unsale.loading"
                  height="380"
                  style="width: 100%">
                  <el-table-column
                    prop="index"
                    width="80"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    prop="barCode"
                    label="商品条码"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="商品名称"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="productCategory"
                    label="商品类别"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="days"
                    label="滞销天数"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="stock"
                    label="库存数量"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="price"
                    label="零售单价"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="quentyTotal"
                    label="库存金额"
                    width="120">
                  </el-table-column>
                </el-table>
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="tabs.unusual.pageNumber"
                  :page-size="tabs.pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="tabs.unsale.total">
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>

    <el-dialog :title="dialog.category.title" :visible.sync="dialog.category.visible">
      <div class="chart-dialog chart-dialog--category">
        <chart :option="dialog.category.option"></chart>
      </div>
    </el-dialog>
    <el-dialog :title="dialog.store.title" @close="_closeDialog()" :visible.sync="dialog.store.visible">
      <div class="dialog__tb">
        <el-table
          :data="dialog.store.tableData"
          border
          v-loading="dialog.store.loading"
          style="width: 100%">
          <el-table-column
            prop="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="productCategory"
            label="商品分类"
            width="120">
          </el-table-column>
          <el-table-column
            prop="bar_code"
            label="条码"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="stock"
            label="库存数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="price"
            label="零售单价"
            width="120">
          </el-table-column>
          <el-table-column
            prop="quentyTotal"
            label="库存金额"
            width="120">
          </el-table-column>
          <el-table-column
            prop="date"
            label="月销量数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="date"
            label="缺货数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="date"
            label="最近配送时间"
            width="130">
          </el-table-column>
          <el-table-column
            prop="date"
            label="距今"
            width="120">
          </el-table-column>
          <el-table-column
            label="类别"
            width="120">
            <template scope="scope">
              {{_typeTransform(scope.row.type)}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="dialogHandleCurrentChange"
          :current-page="dialog.store.page.pageNumber"
          :page-size="dialog.store.page.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="dialog.store.page.total">
        </el-pagination>
      </div>
    </el-dialog>
    <el-dialog :title="dialog.delivery.title" :visible.sync="dialog.delivery.visible">
      <div class="dialog__tb">
        <el-table
          :data="dialog.delivery.tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="vipcode"
            label="卡号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
            width="100">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="150">
          </el-table-column>
          <el-table-column
            prop="birthday"
            label="生日"
            width="120">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机"
            width="150">
          </el-table-column>
          <el-table-column
            prop="lastBuy"
            label="最近一次购物时间"
            width="150">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Chart from 'vue-echarts-v3/src/full'
import ChartTitle from 'base/chart-title/chart-title'
import ChartContainer from 'base/chart-container/chart-container'
import {addToTopMixin} from 'common/js/mixin'
import {chartColor, barChartColor} from 'common/js/chartColor'
import {getDistributionReport, getCategoryStockDialog, getOptionsDetailDialog, getStockSpec} from 'api/distribution-report'
import {ERR_OK} from 'api/config'
import {normalizePage} from 'common/js/util'

export default {
  mixins: [addToTopMixin],
  data() {
    return {
      shopName: '',
      tabsIndex: [0],
      tabs: {
        tabType: 'unusual', // 库存异常分类
        tabLoading: true,
        pageSize: 10,
        unusual: {
          pageNumber: 1,
          total: 1,
          list: [],
          loading: true
        },
        warn: {
          pageNumber: 1,
          total: 1,
          list: [],
          loading: true
        },
        unsale: {
          pageNumber: 1,
          total: 1,
          list: [],
          loading: true
        }
      },
      chart: {
        chartLoading: true,
        pieColor: {
          color: chartColor
        },
        barColor: {
          color: barChartColor
        },
        allStore: {
          ready: {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
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
                type: 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value'
            }
          },
          option: {
            series: []
          }
        },
        everyStore: {
          ready: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value'
            }
          },
          option: {
            series: []
          }
        },
        order: {
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
            legend: {
              data: ['昨日收到订单数', '昨日调出订单数', '累计未审单据数', '月单据审核率']
            },
            xAxis: [
              {
                type: 'category',
                data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '数量',
                axisLabel: {
                  formatter: '{value}'
                }
              },
              {
                type: 'value',
                name: '百分比',
                max: 100,
                axisLabel: {
                  formatter: '{value}%'
                }
              }
            ],
            series: [
              {
                name: '昨日收到订单数',
                type: 'bar',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
              },
              {
                name: '昨日调出订单数',
                type: 'bar',
                data: [2.0, 4.9, 7.2, 23.2, 25.5, 75.7, 135.5, 152.2, 32.5, 22.2, 5.4, 3.3]
              },
              {
                name: '累计未审单据数',
                type: 'bar',
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
              },
              {
                name: '月单据审核率',
                type: 'line',
                yAxisIndex: 1,
                data: [2.0, 2.8, 3.8, 4.4, 7.3, 8.3, 20.3, 20.4, 22.0, 16.4, 12.0, 6.3]
              }
            ]
          }
        }
      },
      dialog: {
        category: {
          visible: false,
          title: '各类别库存列表',
          ready: {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            chartLoading: true
          },
          option: {
            series: [{
              name: '库存分布',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {
                  value: 49595,
                  name: '食品'
                },
                {
                  value: 6867,
                  name: '洗护用品'
                },
                {
                  value: 6384,
                  name: '床品内衣'
                },
                {
                  value: 6045,
                  name: '纸尿裤'
                },
                {
                  value: 5268,
                  name: '喂养用品'
                }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]
          }
        },
        store: {
          page: {
            pageNumber: 1,
            pageSize: 10,
            total: 0
          },
          loading: true,
          visible: false,
          title: '库存明细列表',
          tableData: []
        },
        delivery: {
          visible: false,
          title: '配出订单',
          tableData: [
            {
              code: '20170918001',
              to: '测试01店',
              from: '测试09店',
              state: '未审核',
              date: '2017-09-18',
              remark: ''
            },
            {
              code: '20170918002',
              to: '测试01店',
              from: '测试09店',
              state: '未审核',
              date: '2017-09-18',
              remark: ''
            }
          ]
        }
      },
      tableData: []
    }
  },
  methods: {
    fetchData() {
      this._getDistributionReport()
      this._getStockSpec()
    },
    showCategoryDialog(params) {
      this._getCategoryStockDialog(params.name)
      this.dialog.category.visible = true
    },
    showStoreDialog(val) {
      this.shopName = val.name
      this._getOptionsDetailDialog(val.name)
      this.dialog.store.visible = true
    },
    showDeliveryDialog() {
      this.dialog.delivery.visible = true
    },
    _getDistributionReport() {
      this.chart.chartLoading = true
      getDistributionReport().then((res) => {
        if (res.code === ERR_OK) {
          this.chart.chartLoading = false
          this.chart.allStore.option = Object.assign({}, this.chart.pieColor, this.chart.allStore.ready, res.options[0])
          this.chart.everyStore.option = Object.assign({}, this.chart.barColor, this.chart.everyStore.ready, res.options[1])
          this.chart.category.option = Object.assign({}, this.chart.barColor, this.chart.category.ready, res.options[2])
          this.chart.order.option = Object.assign({}, this.chart.barColor, this.chart.order.ready, res.options[3])
        }
      })
    },
    _getCategoryStockDialog(monthName) { // GET 整体运营-配送报告-仓库库存结构-弹出分类库存分布
      let params = {
        monthName: monthName
      }
      getCategoryStockDialog(params).then((res) => {
        if (res.code === ERR_OK) {
          this.dialog.category.option = Object.assign({}, this.chart.pieColor, this.dialog.category.ready, res.options)
        }
      })
    },
    _getOptionsDetailDialog(shopName = this.shopName) {
      console.log(shopName)
      let params = {
        shopName: shopName,
        pageSize: this.dialog.store.page.pageSize,
        pageNumber: this.dialog.store.page.pageNumber
      }
      this.dialog.store.loading = true
      getOptionsDetailDialog(params).then((res) => { // get 各门店库存结构 弹窗
        if (res.code === ERR_OK) {
          this.dialog.store.tableData = normalizePage(res.pageInfo)
          this.dialog.store.loading = false
          this.dialog.store.page.total = res.pageInfo.total
        }
      })
    },
    _getStockSpec() { // get 配送报告_各门店库存异常
      let params = {
        type: this.tabs.tabType,
        pageNumber: this.tabs[this.tabs.tabType].pageNumber,
        pageSize: this.tabs.pageSize
      }
      this.tabs[this.tabs.tabType].loading = true
      getStockSpec(params).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res)
          this.tabs[this.tabs.tabType].list = normalizePage(res.pageInfo)
          this.tabs[this.tabs.tabType].total = res.pageInfo.total
          this.tabs[this.tabs.tabType].loading = false
        }
      })
    },
    _typeTransform(type) { // 后台传的type是英文 把它变成中文
      let Type
      switch (type) {
        case 'beyondCount':
          Type = '库存超标'
          break
        case 'notSalesCount':
          Type = '无销售'
          break
        case '1month':
          Type = '一月以内'
          break
        case '1-3months':
          Type = '1-3月'
          break
        case '3-6months':
          Type = '3-6月'
          break
        case '6-12months':
          Type = '6-12月'
          break
      }
      return Type
    },
    dialogHandleCurrentChange(num) {
      this.dialog.store.page.pageNumber = num
      this._getOptionsDetailDialog(this.shopName)
    },
    handleCurrentChange(num) {
      this.tabs[this.tabs.tabType].pageNumber = num
      this._getStockSpec()
    },
    _closeDialog() { // 关闭dialog时 pagenum = 1
      this.dialog.store.page.pageNumber = 1
    },
    switchTab(val) {
      let tabsTypes = ['unusual', 'warn', 'unsale']
      this.tabs.tabType = tabsTypes[val.index]
      if (Number(val.index) in this.tabsIndex) {
        return
      }
      this.tabsIndex.push(Number(val.index))
      this._getStockSpec()
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

.el-col {
  margin-bottom: $gutter;
}
.dis-allstore,
.dis-category {
  .chart-container {
    height: 400px;
  }
}
.dis-everystore{
  .chart-container {
    height: 400px;
  }
}
.chart-dialog {
  height: 300px;
}
.dialog__tb {
  padding: 30px 20px;
}
</style>

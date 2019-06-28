<!-- 采购报告 -->
<template>
  <div class="purchase-report">
    <chart-title class="content-title">30日内采购总额为[{{baseData.totalPurchase}}元], 销售额为[{{baseData.totalSales}}元],采销比为[{{baseData.rate}}%]</chart-title>
    <div class="content">
      <el-row class="content__row" :gutter="12">
        <el-col :lg="12">
          <div class="pur-sku">
            <chart-title>30内引进新SKU</chart-title>
            <chart-container>
              <chart :resizable="true" :loading="chart.loading" :option="chart.sku.option"></chart>
            </chart-container>
          </div>
        </el-col>
        <el-col :lg="12">
          <div class="pur-newstatus">
            <chart-title>90天内引入的新品动销状态监控</chart-title>
            <chart-container>
              <chart :resizable="true" :loading="chart.loading" @click="showPinProductsDialog" :option="chart.newStatus.option"></chart>
            </chart-container>
          </div>
        </el-col>
      </el-row>

      <el-row class="content__row" :gutter="12">
        <el-col :lg="12">
          <div class="pur-band">
            <chart-title>30天内引入新品价格带分析[点击可查看库存分布及销量]</chart-title>
            <chart-container>
              <chart :resizable="true" :loading="chart.loading" @click="showInventoryDialog" :option="chart.band.option"></chart>
            </chart-container>
          </div>
        </el-col>
        <el-col :lg="12">
          <div class="pur-partstatus">
            <chart-title>食品、纸尿裤、洗护用品、喂养用品类库存状态分布及缺货率监控</chart-title>
            <chart-container>
              <chart :resizable="true" :loading="chart.loading" :option="chart.partStatus.option"></chart>
            </chart-container>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="12">
        <el-col :lg="12">
          <div class="pur-price">
            <chart-title>最新采购价格波动监控</chart-title>
            <chart-container>
              <chart :resizable="true" :loading="chart.loading" :option="chart.price.option"></chart>
            </chart-container>
          </div>
        </el-col>
        <el-col :lg="12">
          <div class="pur-match">
            <chart-title>采购匹配度监控</chart-title>
            <chart-container>
              <chart :resizable="true" :loading="chart.loading" :option="chart.match.option"></chart>
            </chart-container>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog :title="dialog.inventory.title" :visible.sync="dialog.inventory.visible">
      <div class="dialog__tb">
        <el-table
          :data="dialog.inventory.tableData"
          v-loading="dialog.inventory.tableLoading"
          border
          height="600"
          style="width: 100%">
          <el-table-column
            prop="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="barCode"
            label="条码"
            width="150">
          </el-table-column>
          <el-table-column
            prop="id"
            label="商品id"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="category"
            label="类别"
            width="120">
          </el-table-column>
          <el-table-column
            prop="brand"
            label="品牌"
            width="150">
          </el-table-column>
          <el-table-column
            prop="supplier"
            label="供应商"
            width="120">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="采购日期"
            width="120">
            <template scope="scope">
              {{transformDates(scope.row.createDate)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="stock"
            label="库存"
            width="100">
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="采购数量"
            width="100">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="100">
          </el-table-column>
          <el-table-column
            prop="memo"
            label="备注"
            width="150">
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @current-change="handleInventoryChange"
            :current-page="dialog.inventory.page.pageNumber"
            :page-size="dialog.inventory.page.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="dialog.inventory.page.total">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
    <el-dialog :title="dialog.pinProducts.title" :visible.sync="dialog.pinProducts.visible">
      <div class="dialog__tb">
        <el-table
          :data="dialog.pinProducts.tableData"
          v-loading="dialog.pinProducts.tableLoading"
          border
          height="600"
          style="width: 100%">
          <el-table-column
            prop="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="id"
            label="商品id"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="category"
            label="类别"
            width="120">
          </el-table-column>
          <el-table-column
            prop="brand"
            label="品牌"
            width="150">
          </el-table-column>
          <el-table-column
            prop="supplier"
            label="供应商"
            width="120">
          </el-table-column>
          <el-table-column
            prop="salesIn90Days"
            label="90天销量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="stock"
            label="库存"
            width="100">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="100">
          </el-table-column>
          <el-table-column
            prop="memo"
            label="备注"
            width="150">
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @current-change="handlePinProductsChange"
            :current-page="dialog.pinProducts.page.pageNumber"
            :page-size="dialog.pinProducts.page.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="dialog.pinProducts.page.total">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Chart from 'vue-echarts-v3/src/full'
import ChartTitle from 'base/chart-title/chart-title'
import ChartContainer from 'base/chart-container/chart-container'
import {getChartOptions, getPurchaseProducts, getPinProducts} from 'api/purchase-report'
import {ERR_OK} from 'api/config'
import {chartColor, barChartColor} from 'common/js/chartColor'
import {formatDate} from 'common/js/date'
import {normalizePage} from 'common/js/util'

export default {
  data() {
    return {
      baseData: {},
      chart: {
        loading: true,
        chartColor: {
          color: chartColor
        },
        barColor: {
          color: barChartColor
        },
        sku: {
          ready: {
            tooltip: {
              formatter: '{a} <br/>{b} : {c}'
            }
          },
          option: {
            series: []
          }
        },
        band: {
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
        newStatus: {
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
              data: ['新品动销条码数', '新品不动销条码数', '动销比']
            },
            yAxis: [
              {
                type: 'value',
                name: '条码数量',
                axisLabel: {
                  formatter: '{value}'
                }
              },
              {
                type: 'value',
                name: '动销比',
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
        partStatus: {
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
                name: '条码数量',
                axisLabel: {
                  formatter: '{value}'
                }
              },
              {
                type: 'value',
                name: '缺货率',
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
        price: {
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
            xAxis: [
              {
                type: 'value'
              }
            ]
          },
          option: {
            series: []
          }
        },
        match: {
          ready: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['销售占比', '库存占比']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'value',
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
        inventory: {
          visible: false,
          title: '库存明细',
          priceRange: '',
          tableLoading: true,
          tableData: [],
          page: {
            pageSize: 20,
            pageNumber: 1,
            total: 0
          }
        },
        pinProducts: {
          visible: false,
          title: '库存明细',
          category: '',
          type: '',
          types: ['PIN', 'NOT_PIN'],
          tableLoading: true,
          tableData: [],
          page: {
            pageSize: 20,
            pageNumber: 1,
            total: 0
          }
        }
      }
    }
  },
  methods: {
    fetchData() {
      this._getChartOptions()
      this.dialog.inventory.page.pageNumber = 1
      this.dialog.pinProducts.page.pageNumber = 1
    },
    showInventoryDialog(params) {
      this.dialog.inventory.visible = true
      this.dialog.inventory.title = `${params.name}库存明细`
      this.dialog.inventory.page.pageNumber = 1
      this.dialog.inventory.priceRange = params.name
      this._getPurchaseProducts()
    },
    showPinProductsDialog(params) {
      this.dialog.pinProducts.visible = true
      this.dialog.pinProducts.title = `${params.name}库存明细`
      this.dialog.pinProducts.page.pageNumber = 1
      this.dialog.pinProducts.category = params.name
      this.dialog.pinProducts.type = this.dialog.pinProducts.types[params.seriesIndex]
      this._getPinProducts()
    },
    _getPurchaseProducts() {
      this.dialog.inventory.tableLoading = true
      let params = {
        priceRange: this.dialog.inventory.priceRange,
        pageNumber: this.dialog.inventory.page.pageNumber
      }
      getPurchaseProducts(params).then((res) => {
        if (res.code === ERR_OK) {
          this.dialog.inventory.page.total = res.pageInfo.total

          this.dialog.inventory.tableLoading = false
          this.dialog.inventory.tableData = normalizePage(res.pageInfo)
        }
      })
    },
    _getPinProducts() {
      this.dialog.pinProducts.tableLoading = true
      let params = {
        category: this.dialog.pinProducts.category,
        type: this.dialog.pinProducts.type,
        pageNumber: this.dialog.pinProducts.page.pageNumber
      }
      getPinProducts(params).then((res) => {
        if (res.code === ERR_OK) {
          this.dialog.pinProducts.page.total = res.page.total

          this.dialog.pinProducts.tableLoading = false
          this.dialog.pinProducts.tableData = normalizePage(res.page)
        }
      })
    },
    handleInventoryChange(pageNum) {
      this.dialog.inventory.page.pageNumber = pageNum
      this._getPurchaseProducts()
    },
    handlePinProductsChange(pageNum) {
      this.dialog.pinProducts.page.pageNumber = pageNum
      this._getPinProducts()
    },
    transformDates(timeStamp) {
      let date = new Date(timeStamp)
      return formatDate('yyyy-MM-dd', date)
    },
    _getChartOptions() {
      this.chart.loading = true
      getChartOptions().then((res) => {
        if (res.code === ERR_OK) {
          this.baseData.totalSales = res.result.totalSales
          this.baseData.totalPurchase = res.result.totalPurchase
          this.baseData.rate = res.result.rate

          this.chart.loading = false
          this.chart.sku.option = Object.assign({}, this.chart.chartColor, this.chart.sku.ready, res.result.options[0])
          this.chart.newStatus.option = Object.assign({}, this.chart.barColor, this.chart.newStatus.ready, res.result.options[1])
          this.chart.band.option = Object.assign({}, this.chart.chartColor, this.chart.band.ready, res.result.options[2])
          this.chart.partStatus.option = Object.assign({}, this.chart.barColor, this.chart.partStatus.ready, res.result.options[3])
          this.chart.price.option = Object.assign({}, this.chart.barColor, this.chart.price.ready, res.result.options[4])
          this.chart.match.option = Object.assign({}, this.chart.barColor, this.chart.match.ready, res.result.options[5])
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

.el-col {
  margin-top: $gutter;
}
.pur-sku,
.pur-newstatus {
  .chart-container{
    height: 400px;
  }
}
.pur-band,
.pur-partstatus {
  .chart-container {
    height: 350px;
  }
}
.pur-price,
.pur-match {
  .chart-container {
    height: 350px;
  }
}
.dialog__tb {
  padding: 30px 20px;
}
</style>

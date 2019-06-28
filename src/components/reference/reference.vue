<!-- 调货参考方案 -->
<template>
  <div class="reference">
    <div class="search-wrapper">
      <search>
        <div class="search__item">
          <span class="title">门店：</span>
          <div class="input">
            <el-select v-model="shopId">
              <el-option
                v-for="item in shops"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="search__item">
          <span class="title">类别：</span>
          <div class="input">
            <el-select v-model="category" clearable placeholder="请选择">
              <el-option
                v-for="item in categorys"
                :key="item.id"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="search__item">
          <span class="title">品牌：</span>
          <div class="input">
            <el-select v-model="brand" clearable placeholder="请选择">
              <el-option
                v-for="item in brands"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="search__item">
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </search>
    </div>
    <div class="result">
      <div class="result__tb">
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          height="600"
          border
          style="width: 100%">
          <el-table-column
            prop="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            label="条码"
            width="150">
            <template scope="scope">
              <p class="cell-link" @click="showYearDialog(scope)">{{scope.row.barCode}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="250">
          </el-table-column>
          <el-table-column
            prop="monthQuantity"
            label="月销量"
            width="100">
          </el-table-column>
          <el-table-column
            prop="outStock"
            label="缺货数量"
            width="100">
          </el-table-column>
          <el-table-column
            label="他店库存合计"
            width="100">
            <template scope="scope">
              <p class="cell-link" @click="showStockDialog(scope)">{{scope.row.otherStock}}</p>
            </template>
          </el-table-column>
          <el-table-column v-for="(store, index) in formHead" :key="store" :label="store">
            <el-table-column
              label="库存"
              width="100">
              <template scope="scope">
                {{scope.row.allocationItems[index].stock}}
              </template>
            </el-table-column>
            <el-table-column
              label="销量"
              width="100">
              <template scope="scope">
                {{scope.row.allocationItems[index].monthQuantity}}
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
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
    <el-dialog :title="dialog.year.title" :visible.sync="dialog.year.visible">
      <div class="chart-dialog chart-dialog--year">
        <chart :resizable="true" :loading="dialog.year.loading" :option="dialog.year.option"></chart>
      </div>
    </el-dialog>
    <el-dialog :title="dialog.stock.title" :visible.sync="dialog.stock.visible">
      <div class="chart-dialog chart-dialog--stock">
        <chart :resizable="true" :loading="dialog.stock.loading" :option="dialog.stock.option"></chart>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Search from 'base/search/search'
import Chart from 'vue-echarts-v3/src/full'
import {getSelectOptions} from 'api/select'
import {getReferenceList, getLineOption, getStockOption} from 'api/reference'
import {ERR_OK} from 'api/config'
import {lineChartColor, barChartColor} from 'common/js/chartColor'
import {normalizePage} from 'common/js/util'

export default {
  data() {
    return {
      shopId: this.$route.params.shopId || null,
      shops: [],
      category: null,
      categorys: [],
      brand: null,
      brands: [],
      page: {
        pageNumber: 1,
        total: 0,
        pageSize: 20
      },
      dialog: {
        year: {
          visible: false,
          title: '销售对照',
          loading: true,
          ready: {
            color: lineChartColor,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            yAxis: {
              type: 'value',
              axisPointer: {
                snap: true
              },
              axisLabel: {
                formatter: '￥{value}'
              }
            }
          },
          option: {
            series: []
          }
        },
        stock: {
          visible: false,
          title: '各店库存及销售状态',
          loading: true,
          ready: {
            color: barChartColor,
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
            yAxis: [
              {
                type: 'value'
              }
            ]
          },
          option: {
            series: []
          }
        }
      },
      tableData: [],
      tableLoading: true,
      formHead: []
    }
  },
  methods: {
    fetchData() {
      this._getSelectOptions()
      this.search()
    },
    showYearDialog(scope) {
      this.dialog.year.title = `${scope.row.name}今年去年销售对照`
      this.dialog.year.visible = true
      this.dialog.year.loading = true
      let params = {
        shopId: this.shopId,
        barCode: scope.row.barCode
      }
      getLineOption(params).then((res) => {
        if (res.code === ERR_OK) {
          this.dialog.year.loading = false
          this.dialog.year.option = Object.assign({}, this.dialog.year.ready, res.option)
        }
      })
    },
    showStockDialog(scope) {
      console.log(scope)
      this.dialog.stock.title = `${scope.row.name}各店库存及销售状态`
      this.dialog.stock.visible = true
      this.dialog.stock.loading = true
      let params = {
        shopId: this.shopId,
        barCode: scope.row.barCode
      }
      getStockOption(params).then((res) => {
        if (res.code === ERR_OK) {
          this.dialog.stock.loading = false
          this.dialog.stock.option = Object.assign({}, this.dialog.stock.ready, res.option)
        }
      })
    },
    _getSelectOptions() {
      getSelectOptions('SHOP').then((res) => {
        if (res.code === ERR_OK) {
          this.shops = res.options
        }
      })
      getSelectOptions('CATEGORY').then((res) => {
        if (res.code === ERR_OK) {
          this.categorys = res.options
        }
      })
      getSelectOptions('BRAND').then((res) => {
        if (res.code === ERR_OK) {
          this.brands = res.options
        }
      })
    },
    _getReferenceList() {
      this.tableLoading = true
      let params = {
        shopId: this.shopId,
        category: this.category,
        brand: this.brand,
        pageNumber: this.page.pageNumber
      }
      getReferenceList(params).then((res) => {
        if (res.code === ERR_OK) {
          this.tableLoading = false
          this.tableData = normalizePage(res.page)
          this.page.total = res.page.total
          this.formHead = this.tableData[0].allocationItems.map(v => v.shop)
          if (!this.shopId) {
            this.shopId = this.tableData[0].shopId
          }
        }
      })
    },
    search() {
      this.page.pageNumber = 1
      this._getReferenceList()
    },
    handleCurrentChange(pageNum) {
      this.page.pageNumber = pageNum
      this._getReferenceList()
    }
  },
  components: {
    Search,
    Chart
  },
  created() {
    this.fetchData()
  },
  activated() {
    if (this.$route.params.shopId && this.$route.params.shopId !== this.shopId) {
      this.shopId = this.$route.params.shopId
      this._getReferenceList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.search-wrapper {
  margin-bottom: 20px;
}
.cell-link {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 40px;
  padding: 0 18px;
  cursor: pointer;
  background-color: $color-background-l;
  transition: 0.3s;
  &:hover {
    background-color: darken($color-background-l, 5%);
  }
}
.chart-dialog {
  height: 300px;
}
</style>

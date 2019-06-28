<!-- 销售任务管理 -->
<template>
  <div class="sales-management">
    <div class="search-wrapper">
      <search>
        <div class="search__item">
          <span class="text">门店：</span>
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
              v-model="month"
              type="month"
              :clearable="false"
              placeholder="选择月">
            </el-date-picker>
          </div>
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </search>
    </div>
    <div class="content">
      <chart-title>{{shopName}}[{{formatMonth}}月]任务明细</chart-title>
      <div class="content__tb">
        <el-table
          v-loading="tableLoading"
          :data="taskList"
          border
          height="600"
          style="width: 100%">
          <el-table-column
            prop="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            label="门店编号"
            width="150">
            <template scope="scope">
              <p class="cell-link" @click="showYearDialog(scope)">{{scope.row.id}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="shop"
            label="店名"
            width="150">
          </el-table-column>
          <el-table-column
            label="面积"
            width="150">
            <template scope="scope">
              <div class="cell-input" v-if="scope.row.editFlag">
                <el-input v-model.trim="scope.row.area"></el-input>
              </div>
              <div class="cell-text" v-else>
                {{scope.row.area}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="人数"
            width="150">
            <template scope="scope">
              <div class="cell-input" v-if="scope.row.editFlag">
                <el-input v-model.trim.number="scope.row.empNum"></el-input>
              </div>
              <div class="cell-text" v-else>
                {{scope.row.empNum}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="lastMonthSales"
            label="上月销售额"
            width="150">
          </el-table-column>
          <el-table-column
            prop="avgThreeMonthSales"
            label="前3个月平均销售"
            width="150">
          </el-table-column>
          <el-table-column
            prop="lastYearNowMonth"
            label="去年同期销售"
            width="150">
          </el-table-column>
          <el-table-column
            label="本月任务"
            width="150">
            <template scope="scope">
              <div class="cell-input" v-if="scope.row.editFlag">
                <el-input v-model.trim="scope.row.salesTask"></el-input>
              </div>
              <div class="cell-text" v-else>
                {{scope.row.salesTask}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            width="250">
            <template scope="scope">
              <div class="cell-input" v-if="scope.row.editFlag">
                <el-input v-model="scope.row.memo"></el-input>
              </div>
              <div class="cell-text" v-else>
                {{scope.row.memo}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="编辑"
            width="100">
            <template scope="scope">
              <el-button
                @click.prevent="changeRow(scope.$index, scope.row)"
                type="primary"
                size="small">{{scope.row.editFlag ? '提交' : '修改'}}</el-button>
            </template>
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
        <chart :loading="dialog.year.loading" :resizable="true" :option="dialog.year.option"></chart>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Search from 'base/search/search'
import Chart from 'vue-echarts-v3/src/full'
import ChartTitle from 'base/chart-title/chart-title'
import {formatDate} from 'common/js/date'
import {getShopTasks, updateShopTask, getSalesTrend} from 'api/sales-management'
import {ERR_OK} from 'api/config'
import {lineChartColor} from 'common/js/chartColor'
import {taskMixin} from 'common/js/mixin'

export default {
  mixins: [taskMixin],
  data() {
    return {
      dialog: {
        lineColor: {
          color: lineChartColor
        },
        year: {
          visible: false,
          title: '门店销售状况',
          loading: true,
          ready: {
            legend: {
              data: ['去年', '今年']
            },
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
        }
      },
      taskList: []
    }
  },
  methods: {
    fetchData() {
      this._getShopOptions()
      this.search()
    },
    showYearDialog(scope) {
      this.dialog.year.visible = true
      this._getSalesTrend(scope.row.id)
    },
    _getShopTasks() {
      this.tableLoading = true
      let params = {
        type: 'SHOP',
        shopId: this.shopId,
        month: formatDate('yyyy-MM', this.month),
        pageNumber: this.page.pageNumber
      }
      getShopTasks(params).then((res) => {
        if (res.code === ERR_OK) {
          this.tableLoading = false
          this.page.total = res.data.page.total
          this.taskList = this._normalizePage(res.data.page)
        }
      })
    },
    _getSalesTrend(shopId) {
      this.dialog.year.loading = true
      getSalesTrend(shopId).then((res) => {
        if (res.code === ERR_OK) {
          this.dialog.year.loading = false
          this.dialog.year.option = Object.assign({}, this.dialog.year.ready, this.dialog.lineColor, res.option)
        }
      })
    },
    handleCurrentChange(pageNum) {
      this.page.pageNumber = pageNum
      this._getShopTasks()
    },
    search() {
      this._getShopTasks()
      this.formatMonth = formatDate('yyyy-MM', this.month)
      this._getShopName()
    },
    changeRow(index, row) {
      if (!row.editFlag) {
        row.editFlag = true
      } else {
        let params = [
          {
            id: row.id,
            salesTask: row.salesTask,
            empNum: row.empNum,
            area: row.area,
            memo: row.memo
          }
        ]
        let data = {
          month: this.formatMonth,
          params: JSON.stringify(params)
        }
        updateShopTask(data).then((res) => {
          if (res.code === ERR_OK) {
            this.$message({
              showClose: true,
              type: 'success',
              message: res.msg
            })
            row.editFlag = false
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: res.errMsg || res.msg
            })
          }
        })
      }
    }
  },
  components: {
    Search,
    Chart,
    ChartTitle
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

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

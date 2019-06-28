<!-- 员工销售任务制定 -->
<template>
  <div class="employee-task">
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
            prop="shop"
            label="门店"
            width="150">
          </el-table-column>
          <el-table-column
            prop="id"
            label="员工编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="员工姓名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="username"
            label="员工用户名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="lastMonthSales"
            label="上月销售额"
            width="150">
          </el-table-column>
          <el-table-column
            prop="avgThreeMonthSales"
            label="前三月均销"
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
  </div>
</template>

<script>
import Search from 'base/search/search'
import ChartTitle from 'base/chart-title/chart-title'
import {taskMixin} from 'common/js/mixin'
import {getEmployeeTasks, updateEmployeeTask} from 'api/employee-task'
import {ERR_OK} from 'api/config'
import {formatDate} from 'common/js/date'

export default {
  mixins: [taskMixin],
  data() {
    return {
      taskList: []
    }
  },
  methods: {
    fetchData() {
      this._getShopOptions()
      this.search()
    },
    _getEmployeeTasks() {
      this.tableLoading = true
      let params = {
        type: 'EMPLOYEE',
        shopId: this.shopId,
        month: formatDate('yyyy-MM', this.month),
        pageNumber: this.page.pageNumber
      }
      getEmployeeTasks(params).then((res) => {
        if (res.code === ERR_OK) {
          this.tableLoading = false
          this.page.total = res.data.page.total
          this.taskList = this._normalizePage(res.data.page)
        }
      })
    },
    handleCurrentChange(pageNum) {
      this.page.pageNumber = pageNum
      this._getEmployeeTasks()
    },
    changeRow(index, row) {
      if (!row.editFlag) {
        row.editFlag = true
      } else {
        let params = [
          {
            id: row.id,
            salesTask: row.salesTask
          }
        ]
        let data = {
          month: this.formatMonth,
          params: JSON.stringify(params)
        }
        updateEmployeeTask(data).then((res) => {
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
    },
    search() {
      this._getEmployeeTasks()
      this.formatMonth = formatDate('yyyy-MM', this.month)
      this._getShopName()
    }
  },
  components: {
    Search,
    ChartTitle
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
</style>

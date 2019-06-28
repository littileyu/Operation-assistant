<template>
  <div class="personnel-info">
    <div class="search-wrapper">
      <search>
        <div class="search__item">
          <span class="title">门店：</span>
          <div class="input">
            <el-select v-model="shopId" clearable>
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
          <span class="title">关键字：</span>
          <div class="input">
            <el-input v-model="keyword" placeholder="请输入员工姓名或用户名" @keyup.enter.native="search"></el-input>
          </div>
        </div>
        <div class="search__item">
          <span class="title">账号是否启用：</span>
          <div class="input">
            <el-radio class="radio" v-model="isEnabled" :label="true">是</el-radio>
            <el-radio class="radio" v-model="isEnabled" :label="false">否</el-radio>
          </div>
        </div>
        <div class="search__item">
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </search>
    </div>
    <div class="content">
      <chart-title>人员信息统计表</chart-title>
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
              prop="shop"
              label="门店"
              width="100">
            </el-table-column>
            <el-table-column
              prop="id"
              label="人员编号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
              width="250">
            </el-table-column>
            <el-table-column
              prop="department"
              label="部门"
              width="120">
            </el-table-column>
            <el-table-column
              label="职务"
              width="120">
              <template scope="scope">
                {{scope.row.type === 1 ? '导购员' : '收银员'}}
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
  </div>
</template>

<script>
import Search from 'base/search/search'
import ChartTitle from 'base/chart-title/chart-title'
import {getShopListMixin} from 'common/js/mixin'
import {ERR_OK} from 'api/config'
import {getEmployees} from 'api/personnel-info'
import {normalizePage} from 'common/js/util'

export default {
  mixins: [getShopListMixin],
  data() {
    return {
      keyword: '',
      isEnabled: true,
      page: {
        pageNumber: 1,
        total: 0,
        pageSize: 20
      },
      tableLoading: true,
      tableData: []
    }
  },
  methods: {
    fetchData() {
      this._getShopOptions()
      this.search()
    },
    _getEmployees() {
      this.tableLoading = true
      let params = {
        shopId: this.shopId,
        keyword: this.keyword,
        isEnabled: this.isEnabled,
        pageNumber: this.page.pageNumber
      }
      getEmployees(params).then((res) => {
        if (res.code === ERR_OK) {
          this.tableLoading = false
          this.page.total = res.page.total
          this.tableData = normalizePage(res.page)
        }
      })
    },
    handleCurrentChange(pageNum) {
      this.page.pageNumber = pageNum
      this._getEmployees()
    },
    search() {
      this.page.pageNumber = 1
      this._getEmployees()
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
@import "~common/scss/variable";

.content {
  &__title {
    text-align: center;
    font-size: $font-size-medium-x;
    color: #fff;
    background-color: $color-background-d;
    padding: 10px;
  }
}
</style>

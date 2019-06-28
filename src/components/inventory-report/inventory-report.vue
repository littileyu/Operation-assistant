<!-- 库存报告 -->
<template>
  <div class="invertory-report">
    <div class="search-wrapper">
      <search>
        <div class="search__item">
          <span class="title">关键字：</span>
          <div class="input">
            <el-input  v-model="input"  @keyup.enter.native="query"></el-input>
          </div>
        </div>
        <div class="search__item">
          <el-button @click="query" type="primary">查询</el-button>
        </div>
      </search>
    </div>
    <div class="content">
      <el-tabs @tab-click="switchTab">
        <el-tab-pane label="按门店汇总">
          <div class="content__tb">
            <el-table
              :data="tableData[0].list"
              v-loading="tableData[0].loading"
              border
              height="600"
              style="width: 100%">
              <el-table-column
                prop="index"
                label="序号"
                width="80">
              </el-table-column>
              <el-table-column
                prop="name"
                label="门店"
                width="200">
              </el-table-column>
              <el-table-column
                prop="totalStock"
                label="库存数量"
                width="180">
              </el-table-column>
              <el-table-column
                prop="totalCost"
                label="成本金额"
                width="180">
              </el-table-column>
              <el-table-column
                prop="totalPrice"
                label="售价金额"
                width="180">
              </el-table-column>
              <el-table-column
                prop="remainDay"
                label="售价可用天数"
                width="180">
              </el-table-column>
              <el-table-column
                prop="lastMonthSales"
                label="上月销售"
                width="180">
              </el-table-column>
              <el-table-column
                prop="avgThreeMonthSales"
                label="前三月均售"
                width="180">
              </el-table-column>
              <el-table-column
                prop="avgSixMonthSales"
                label="前六月均售"
                width="200"
                >
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="tableData[0].pageNumber"
                :page-size="page.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="tableData[0].total">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="按类别汇总">
          <el-table
            :data="tableData[1].list"
            v-loading="tableData[1].loading"
            border
            height="600"
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="name"
              label="类别"
              width="200">
            </el-table-column>
            <el-table-column
              prop="totalStock"
              label="库存数量"
              width="180">
            </el-table-column>
            <el-table-column
              prop="totalCost"
              label="成本金额"
              width="180">
            </el-table-column>
            <el-table-column
              prop="totalPrice"
              label="售价金额"
              width="180">
            </el-table-column>
            <el-table-column
              prop="remainDay"
              label="售价可用天数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="lastMonthSales"
              label="上月销售"
              width="180">
            </el-table-column>
            <el-table-column
              prop="avgThreeMonthSales"
              label="前三月均售"
              width="180">
            </el-table-column>
            <el-table-column
              prop="avgSixMonthSales"
              label="前六月均售"
              width="200"
              >
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="tableData[1].pageNumber"
              :page-size="page.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="tableData[1].total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="按品牌汇总">
          <el-table
            :data="tableData[2].list"
            v-loading="tableData[2].loading"
            border
            height="600"
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="name"
              label="品牌"
              width="200">
            </el-table-column>
            <el-table-column
              prop="totalStock"
              label="库存数量"
              width="180">
            </el-table-column>
            <el-table-column
              prop="totalCost"
              label="成本金额"
              width="180">
            </el-table-column>
            <el-table-column
              prop="totalPrice"
              label="售价金额"
              width="180">
            </el-table-column>
            <el-table-column
              prop="remainDay"
              label="售价可用天数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="lastMonthSales"
              label="上月销售"
              width="180">
            </el-table-column>
            <el-table-column
              prop="avgThreeMonthSales"
              label="前三月均售"
              width="180">
            </el-table-column>
            <el-table-column
              prop="avgSixMonthSales"
              label="前六月均售"
              width="200"
              >
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="tableData[2].pageNumber"
              :page-size="page.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="tableData[2].total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="按供应商汇总">
          <el-table
            :data="tableData[3].list"
            v-loading="tableData[3].loading"
            border
            height="600"
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="name"
              label="供应商"
              width="200">
            </el-table-column>
            <el-table-column
              prop="totalStock"
              label="库存数量"
              width="180">
            </el-table-column>
            <el-table-column
              prop="totalCost"
              label="成本金额"
              width="180">
            </el-table-column>
            <el-table-column
              prop="totalPrice"
              label="售价金额"
              width="180">
            </el-table-column>
            <el-table-column
              prop="remainDay"
              label="售价可用天数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="lastMonthSales"
              label="上月销售"
              width="180">
            </el-table-column>
            <el-table-column
              prop="avgThreeMonthSales"
              label="前三月均售"
              width="180">
            </el-table-column>
            <el-table-column
              prop="avgSixMonthSales"
              label="前六月均售"
              width="200"
              >
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="tableData[3].pageNumber"
              :page-size="page.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="tableData[3].total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="按条码汇总">
          <el-table
            :data="tableData[4].list"
            v-loading="tableData[4].loading"
            border
            height="600"
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="name"
              label="条码"
              width="200">
            </el-table-column>
            <el-table-column
              prop="totalStock"
              label="库存数量"
              width="180">
            </el-table-column>
            <el-table-column
              prop="totalCost"
              label="成本金额"
              width="180">
            </el-table-column>
            <el-table-column
              prop="totalPrice"
              label="售价金额"
              width="180">
            </el-table-column>
            <el-table-column
              prop="remainDay"
              label="售价可用天数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="lastMonthSales"
              label="上月销售"
              width="180">
            </el-table-column>
            <el-table-column
              prop="avgThreeMonthSales"
              label="前三月均售"
              width="180">
            </el-table-column>
            <el-table-column
              prop="avgSixMonthSales"
              label="前六月均售"
              width="200"
              >
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="tableData[4].pageNumber"
              :page-size="page.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="tableData[4].total">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Search from 'base/search/search'
import ChartTitle from 'base/chart-title/chart-title'
import {ERR_OK} from 'api/config'
import {getStockStatis} from 'api/inventory-report'

export default {
  data() {
    return {
      type: 'store',
      tableData: [
        {
          list: [], // 按门店汇总
          loading: true,
          total: 0,
          pageNumber: 1
        },
        {
          list: [], // 按类别汇总
          loading: true,
          total: 0,
          pageNumber: 1
        },
        {
          list: [], // 按品牌汇总
          loading: true,
          total: 0,
          pageNumber: 1
        },
        {
          list: [], // 按供应商汇总
          loading: true,
          total: 0,
          pageNumber: 1
        },
        {
          list: [], // 按条码汇总
          loading: true,
          total: 0,
          pageNumber: 1
        }
      ],
      shopId: null,
      shops: [],
      input: '',
      tabIndex: 0,
      tabs: [0],
      page: {
        total: 0,
        pageNumber: 1,
        pageSize: 20
      },
      queryType: 'SHOP'
    }
  },
  methods: {
    fetchData() {
      this.tabs = []
      this._getStockStatis()
    },
    _getStockStatis(keyword = '') {
      let params = {
        type: this.queryType,
        pageNumber: this.tableData[this.tabIndex].pageNumber,
        pageSize: this.page.pageSize,
        keyword: keyword
      }
      this.tableData[this.tabIndex].loading = true
      getStockStatis(params).then((res) => {
        if (res.code === ERR_OK) {
          this.tableData[this.tabIndex].loading = false
          this.shops = res.page.list
          this.tableData[this.tabIndex].list = this._normalizeList(res.page)
          this.tableData[this.tabIndex].total = res.page.total
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
    handleCurrentChange(pageNum) { // 分页
      this.tableData[this.tabIndex].pageNumber = pageNum
      this._getStockStatis()
    },
    switchTab(val) { // 切换tab val.index = tab的索引
      let types = ['SHOP', 'CATEGORY', 'BRAND', 'SUPPLIER', 'BARCODE']
      this.queryType = types[val.index]
      this.tabIndex = val.index
      for (let tab in this.tabs) {
        if (this.tabs[tab] === Number(val.index)) {
          return
        }
      }
      this.tableData[val.index].loading = true
      this.tabs.push(Number(val.index))
      this._getStockStatis()
    },
    query() { // 查询按钮
      this._getStockStatis(this.input)
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

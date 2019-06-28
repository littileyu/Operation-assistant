<!-- 会员排行 -->
<template>
  <div class="member-rate">
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
          <span class="title">日期：</span>
          <div class="input">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
          </div>
        </div>
        <div class="search__item">
          <el-button type="primary" @click="getMembers">查询</el-button>
        </div>
      </search>
    </div>
    <div class="result">
      <chart-title>会员排行</chart-title>
      <div class="result__tb">
        <el-table
          v-loading="tableLoading"
          :data="memberList"
          height="600"
          border
          style="width: 100%">
          <el-table-column
            prop="num"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            label="卡号"
            width="140">
            <template scope="scope">
              <router-link
                class="cell-link"
                :to="{ name: 'memberSingle', params: {text: '会员单体画像', memberId: scope.row.id} }"
                @click.native="addToTop">{{scope.row.card}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="140">
          </el-table-column>
          <el-table-column
            prop="paid"
            label="消费金额"
            width="120">
          </el-table-column>
          <el-table-column
            prop="point"
            label="现有积分"
            width="120">
          </el-table-column>
          <el-table-column
            prop="usedPoint"
            label="冲减积分"
            width="120">
          </el-table-column>
          <el-table-column
            prop="username"
            label="手机号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page.pageNumber"
          :page-size="20"
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
import {formatDate} from 'common/js/date'
import {ERR_OK} from 'api/config'
import {getMemberList} from 'api/member-rate'
import {getSelectOptions} from 'api/select'
import {addToTopMixin} from 'common/js/mixin'

export default {
  mixins: [addToTopMixin],
  data() {
    return {
      shopId: null,
      shops: [],
      category: null,
      categorys: [],
      brand: null,
      brands: [],
      dateRange: [],
      page: {
        total: 0,
        pageNumber: 1
      },
      memberList: [],
      tableLoading: true
    }
  },
  computed: {
    beginDate() {
      if (this.dateRange[0]) {
        return formatDate('yyyy-MM-dd', this.dateRange[0])
      } else {
        return null
      }
    },
    endDate() {
      if (this.dateRange[0]) {
        return formatDate('yyyy-MM-dd', this.dateRange[1])
      } else {
        return null
      }
    }
  },
  methods: {
    fetchData() {
      this.getMembers()
      this._getSelectOptions()
    },
    _getMemberList() {
      this.tableLoading = true
      getMemberList(this.shopId, this.category, this.brand, this.beginDate, this.endDate, this.page.pageNumber).then((res) => {
        if (res.code === ERR_OK) {
          this.page.total = res.page.total
          this.memberList = res.page.list
          this.tableLoading = false
        }
      }).catch((err) => {
        console.log(err)
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
    getMembers() {
      this.page.pageNumber = 1
      this._getMemberList()
    },
    handleCurrentChange(pageNum) {
      this.page.pageNumber = pageNum
      this._getMemberList()
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
</style>

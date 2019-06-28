<!-- 整体会员结构 -->
<template>
  <div class="member-all">
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
          <el-button type="primary" @click="_getMembersOptions">查询</el-button>
        </div>
        <router-link class="search__item" :to="{name: 'memberRate', params: {text: '会员排行'}}" @click.native="addToTop">
          <el-button type="info">会员消费排行</el-button>
        </router-link>
        <div class="search__item">
          <span class="search__tips">活跃会员为90天内有消费的会员</span>
        </div>
      </search>
    </div>
    <el-row class="member-list" :gutter="12">
      <el-col :md="12" :lg="8" class="member-item">
        <chart-title>活跃会员购物分类分布</chart-title>
        <chart-container>
          <chart :loading="chart.loading" @click="setBrandOption" :resizable="true" :option="chart.category.option"></chart>
        </chart-container>
      </el-col>
      <el-col :md="12" :lg="8" class="member-item">
        <chart-title>{{chart.brand.title}}</chart-title>
        <chart-container>
          <chart :loading="chart.brand.loading" :resizable="true" :option="chart.brand.option"></chart>
        </chart-container>
      </el-col>
      <el-col :md="12" :lg="8" class="member-item">
        <chart-title>活跃会员宝宝年龄分布</chart-title>
        <chart-container>
          <chart :loading="chart.loading" :resizable="true" :option="chart.baby.option"></chart>
        </chart-container>
      </el-col>
      <el-col :md="12" :lg="8" class="member-item">
        <chart-title>会员整体结构</chart-title>
        <chart-container>
          <chart :loading="chart.loading" :resizable="true" :option="chart.member.option"></chart>
        </chart-container>
      </el-col>
      <el-col :md="12" :lg="8" class="member-item">
        <chart-title>活跃会员购买频率分布</chart-title>
        <chart-container>
          <chart :loading="chart.loading" :resizable="true" :option="chart.rate.option"></chart>
        </chart-container>
      </el-col>
      <el-col :md="12" :lg="8" class="member-item">
        <chart-title>活跃会员购物金额分布</chart-title>
        <chart-container>
          <chart :loading="chart.loading" @click="showMemberDialog" :resizable="true" :option="chart.price.option"></chart>
        </chart-container>
      </el-col>
    </el-row>
    <el-dialog title="库存明细列表" :visible.sync="dialog.member.visible">
      <div class="dialog__tb">
        <el-table
          :data="dialog.member.tableData"
          border
          style="width: 100%">
          <el-table-column
            type="index"
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
import Search from 'base/search/search'
import Chart from 'vue-echarts-v3/src/full'
import ChartTitle from 'base/chart-title/chart-title'
import ChartContainer from 'base/chart-container/chart-container'
import {addToTopMixin, getShopListMixin} from 'common/js/mixin'
import {chartColor} from 'common/js/chartColor'
import {getMembersOptions, getBrandOption} from 'api/member-all'
import {ERR_OK} from 'api/config'

export default {
  mixins: [addToTopMixin, getShopListMixin],
  data() {
    return {
      chart: {
        pieColor: {
          color: chartColor
        },
        loading: true,
        pieReady: {
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          }
        },
        category: {
          option: {
            series: []
          }
        },
        brand: {
          title: '默认活跃会员品牌分布',
          loading: true,
          option: {
            series: []
          }
        },
        baby: {
          option: {
            series: []
          }
        },
        member: {
          option: {
            series: []
          }
        },
        rate: {
          option: {
            series: []
          }
        },
        price: {
          option: {
            series: []
          }
        }
      },
      dialog: {
        member: {
          visible: false,
          tableData: [
            {
              vipcode: '8889001',
              name: '阿克曼',
              gender: '男',
              address: '临冬城',
              birthday: '1995-01-01',
              phone: '15656565656',
              lastBuy: '2016-04-05'
            },
            {
              vipcode: '8889002',
              name: '阿克曼',
              gender: '男',
              address: '临冬城',
              birthday: '1995-01-01',
              phone: '15656565656',
              lastBuy: '2016-04-05'
            }
          ]
        }
      }
    }
  },
  methods: {
    fetchData() {
      this._getShopOptions()
      this._getMembersOptions()
    },
    showMemberDialog(params) {
      this.dialog.member.visible = true
    },
    _getMembersOptions() {
      this.chart.loading = true
      this.chart.brand.loading = true
      getMembersOptions(this.shopId).then((res) => {
        if (res.code === ERR_OK) {
          this.chart.loading = false
          this.chart.brand.loading = false
          this.chart.price.option = Object.assign({}, this.chart.pieColor, this.chart.pieReady, res.options[0])
          this.chart.rate.option = Object.assign({}, this.chart.pieColor, this.chart.pieReady, res.options[1])
          this.chart.member.option = Object.assign({}, this.chart.pieColor, this.chart.pieReady, res.options[2])
          this.chart.baby.option = Object.assign({}, this.chart.pieColor, this.chart.pieReady, res.options[3])
          this.chart.category.option = Object.assign({}, this.chart.pieColor, this.chart.pieReady, res.options[4])
          this.chart.brand.option = Object.assign({}, this.chart.pieColor, this.chart.pieReady, res.options[5])
        }
      })
    },
    _getBrandOption(shopId, category) {
      this.chart.brand.loading = true
      getBrandOption(shopId, category).then((res) => {
        if (res.code === ERR_OK) {
          this.chart.brand.loading = false
          this.chart.brand.option = Object.assign({}, this.chart.pieColor, this.chart.pieReady, res.options)
        }
      })
    },
    setBrandOption(params) {
      this.chart.brand.title = `${params.name}活跃会员品牌分布`
      this._getBrandOption(this.shopId, params.name)
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
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.search__tips {
  color: $color-text-sub;
  font-size: 12px;
}
.member-item {
  margin-bottom: $gutter;
  .chart-container {
    height: 350px;
  }
}
.dialog__tb {
  padding: 30px 20px;
}
</style>

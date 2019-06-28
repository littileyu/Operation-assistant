<!-- 门店运营日报 -->
<template>
  <div class="store-daily">
    <div class="search-wrapper">
      <search>
        <div class="search__item">
          <span class="text">门店：</span>
          <div class="input">
            <el-select v-model="shopId" placeholder="请选择">
              <el-option
                v-for="shop in shops"
                :key="shop.id"
                :label="shop.value"
                :value="shop.id">
              </el-option>
            </el-select>
          </div>
          <el-button type="primary" @click="search">查询</el-button>
        </div>
        <router-link
          class="search__item"
          :to="{name: 'reference', params: {text: '调货参考方案', shopId: shopId}}"
          @click.native="addToTop">
          <el-button type="info">查看调货参考方案</el-button>
        </router-link>
        <router-link
          class="search__item"
          :to="{name: 'returnAnalysis', params: {text: '退货专题', shopId: shopId, shopName: shopName}}"
          @click.native="addToTop">
          <el-button type="info">查看退货专题</el-button>
        </router-link>
        <router-link
          class="search__item"
          :to="{name: 'discountMonitor', params: {text: '折让专题', shopId: shopId, shopName: shopName}}"
          @click.native="addToTop">
          <el-button type="info">查看折让专题</el-button>
        </router-link>
        <router-link
          class="search__item"
          :to="{name: 'customerAnalysis', params: {text: '客单分析', shopId: shopId, shopName: shopName}}"
          @click.native="addToTop">
          <el-button type="info">查看客单分析</el-button>
        </router-link>
        <router-link
          class="search__item"
          :to="{name: 'singleEvaluation', params: {text: '门店评估', shopId: shopId, shopName: shopName}}"
          @click.native="addToTop">
          <el-button type="info">查看门店评估</el-button>
        </router-link>
      </search>
    </div>
    <div class="content">
      <el-row class="content__row" :gutter="12">
        <el-col :lg="12">
          <div class="store-sales">
            <div class="sales-day">
              <chart-title>昨日任务：64000， 完成：21517</chart-title>
              <chart-container>
                <div class="progress">
                  <el-progress :text-inside="true" :stroke-width="24" :percentage="70"></el-progress>
                </div>
              </chart-container>
            </div>
            <div class="sales-month">
              <chart-title>{{month}}月任务：64000， 完成：21517</chart-title>
              <chart-container>
                <div class="progress">
                  <el-progress :text-inside="true" :stroke-width="24" :percentage="70"></el-progress>
                </div>
              </chart-container>
            </div>
          </div>
        </el-col>
        <el-col :lg="12">
          <div class="store-item store-customer">
            <chart-title>客流及客单价</chart-title>
            <chart-container>
              <chart :loading="chart.loading" :resizable="true" :option="chart.customer.option"></chart>
            </chart-container>
          </div>
        </el-col>
      </el-row>
      <el-row class="content__row" :gutter="12">
        <el-col :md="12" :lg="8">
          <div class="store-operate">
            <chart-title>门店运营监控指标</chart-title>
            <ul class="info__list">
              <li class="info__item">
                <span class="info__title">成交金额</span>
                <span class="info__desc">{{baseData.yestodaySales}}</span>
              </li>
              <li class="info__item">
                <span class="info__title">成交单数</span>
                <span class="info__desc">{{baseData.orderNum}}单</span>
              </li>
              <li class="info__item">
                <span class="info__title">客单价</span>
                <span class="info__desc">{{baseData.unitPrice}}元</span>
              </li>
              <li class="info__item">
                <span class="info__title">购物连带率</span>
                <span class="info__desc">{{baseData.categoryRate}}件/单</span>
              </li>
              <li class="info__item">
                <span class="info__title">营业面积</span>
                <span class="info__desc">{{baseData.rea}}平方米</span>
              </li>
              <li class="info__item">
                <span class="info__title">坪效</span>
                <span class="info__desc">{{baseData.areaPrice}}元/平方米</span>
              </li>
              <li class="info__item">
                <span class="info__title">出勤人员</span>
                <span class="info__desc">{{baseData.empNum}}人</span>
              </li>
              <li class="info__item">
                <span class="info__title">人均销售</span>
                <span class="info__desc">{{baseData.avgEmpSales}}元</span>
              </li>
              <li class="info__item">
                <span class="info__title">人均每平米贡献</span>
                <span class="info__desc">{{baseData.avgEmpAreaSales}}元</span>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :md="12" :lg="8">
          <div class="sales-category">
            <chart-title>销售类别分布</chart-title>
            <chart-container>
              <chart :loading="chart.loading" :resizable="true" :option="chart.category.option"></chart>
            </chart-container>
          </div>
        </el-col>
        <el-col :md="12" :lg="8">
          <div class="sales-amount">
            <chart-title>销售客单分布</chart-title>
            <chart-container>
              <chart :loading="chart.loading" :resizable="true" :option="chart.amount.option"></chart>
            </chart-container>
          </div>
        </el-col>
      </el-row>
      <div class="content__bottom">
        <div class="sales-rate">
          <el-tabs @tab-click="handleTabClick">
            <el-tab-pane label="畅销商品">
              <div class="tb__data">
                <el-table
                  v-loading="rateList.SELLING.loading"
                  :data="rateList.SELLING.list"
                  border
                  :height="tableHeight"
                  style="width: 100%">
                  <el-table-column
                    prop="index"
                    label="序号"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="barCode"
                    label="商品条码"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="商品名称"
                    width="300">
                  </el-table-column>
                  <el-table-column
                    prop="totalStock"
                    label="总库存"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="salesCount"
                    label="销售数量"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="totalCost"
                    label="总成本"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="sales"
                    label="销售额"
                    width="120">
                  </el-table-column>
                </el-table>
              </div>
              <div class="pagination">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="rateList['SELLING'].pageNumber"
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="rateList['SELLING'].total">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="滞销商品">
              <div class="tb__data">
                <el-table
                  v-loading="rateList.UNSALE.loading"
                  :data="rateList.UNSALE.list"
                  border
                  :height="tableHeight"
                  style="width: 100%">
                  <el-table-column
                    prop="index"
                    label="序号"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="barCode"
                    label="商品条码"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="商品名称"
                    width="300">
                  </el-table-column>
                  <el-table-column
                    prop="totalStock"
                    label="总库存"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="days"
                    label="滞销天数"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="totalCost"
                    label="总成本"
                    width="120">
                  </el-table-column>
                </el-table>
              </div>
              <div class="pagination">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="rateList['UNSALE'].pageNumber"
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="rateList['UNSALE'].total">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="缺货商品">
              <div class="tb__data">
                <el-table
                  v-loading="rateList.OUTSTOCK.loading"
                  :data="rateList.OUTSTOCK.list"
                  border
                  :height="tableHeight"
                  style="width: 100%">
                  <el-table-column
                    prop="index"
                    label="序号"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="barCode"
                    label="商品条码"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="商品名称"
                    width="300">
                  </el-table-column>
                  <el-table-column
                    prop="stock"
                    label="库存"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="outStock"
                    label="缺货数量"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="monthQuantity"
                    label="月销量"
                    width="120">
                  </el-table-column>
                </el-table>
              </div>
              <div class="pagination">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="rateList['OUTSTOCK'].pageNumber"
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="rateList['OUTSTOCK'].total">
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from 'base/search/search'
import Chart from 'vue-echarts-v3/src/full'
import ChartTitle from 'base/chart-title/chart-title'
import ChartContainer from 'base/chart-container/chart-container'
import {addToTopMixin} from 'common/js/mixin'
import {ERR_OK} from 'api/config'
import {getBaseData, getChartOptions, getRateList} from 'api/store-daily'
import {barChartColor, chartColor} from 'common/js/chartColor'
import {normalizePage} from 'common/js/util'
import {getSelectOptions} from 'api/select'

export default {
  mixins: [addToTopMixin],
  data() {
    return {
      shopId: null,
      shopName: '',
      shops: [],
      tableHeight: 450,
      baseData: {},
      chart: {
        barColor: {
          color: barChartColor
        },
        pieColor: {
          color: chartColor
        },
        loading: true,
        pieReady: {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          }
        },
        customer: {
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
              data: ['客流量', '客单价']
            },
            yAxis: [
              {
                type: 'value',
                name: '客流量',
                axisLabel: {
                  formatter: '{value}'
                }
              },
              {
                type: 'value',
                name: '客单价',
                axisLabel: {
                  formatter: '{value}'
                }
              }
            ]
          },
          option: {
            series: []
          }
        },
        category: {
          option: {
            series: []
          }
        },
        amount: {
          option: {
            series: []
          }
        }
      },
      // 畅销 滞销 缺货
      types: ['SELLING', 'UNSALE', 'OUTSTOCK'],
      currentType: 'SELLING',
      tabs: [0],
      rateList: {
        SELLING: {
          loading: true,
          pageNumber: 1,
          total: 0,
          list: []
        },
        UNSALE: {
          loading: true,
          pageNumber: 1,
          total: 0,
          list: []
        },
        OUTSTOCK: {
          loading: true,
          pageNumber: 1,
          total: 0,
          list: []
        }
      },
      pageSize: 10
    }
  },
  computed: {
    baseDayPercent() {
      return this._getPercent(this.baseData.yestodaySales, this.baseData.dayTask)
    },
    baseMonthPercent() {
      return this._getPercent(this.baseData.monthSales, this.baseData.monthTask)
    }
  },
  methods: {
    async fetchData() {
      await this._getShopOptions()
      this.search()
    },
    _getShopOptions() {
      return new Promise((resolve, reject) => {
        getSelectOptions('SHOP').then((res) => {
          if (res.code === ERR_OK) {
            this.shops = res.options
            this.shopId = this.shops[0].id
            resolve(this.shopId)
          }
        })
      })
    },
    _getPercent(num = 0, count = 0) {
      if (count === 0) {
        return 100
      }
      return Number((num / count).toFixed(2))
    },
    _getMonth() {
      let time = new Date()
      this.month = time.getMonth() + 1
    },
    _getBaseData() {
      getBaseData(this.shopId).then((res) => {
        if (res.code === ERR_OK) {
          this.baseData = res.data
        }
      })
    },
    _getChartOptions() {
      this.chart.loading = true
      getChartOptions(this.shopId).then((res) => {
        if (res.code === ERR_OK) {
          this.chart.loading = false
          this.chart.customer.option = Object.assign({}, this.chart.barColor, this.chart.customer.ready, res.options[0])
          this.chart.category.option = Object.assign({}, this.chart.pieColor, this.chart.pieReady, res.options[1])
          this.chart.amount.option = Object.assign({}, this.chart.pieColor, this.chart.pieReady, res.options[2])
        }
      })
    },
    _getRateList() {
      let params = {
        type: this.currentType,
        shopId: this.shopId,
        pageSize: this.pageSize,
        pageNumber: this.rateList[this.currentType].pageNumber
      }
      this.rateList[this.currentType].loading = true
      getRateList(params).then((res) => {
        if (res.code === ERR_OK) {
          this.rateList[this.currentType].loading = false
          this.rateList[this.currentType].total = res.page.total
          this.rateList[this.currentType].list = normalizePage(res.page)
        }
      })
    },
    _getShopName() {
      for (let shop of this.shops) {
        if (shop.id === this.shopId) {
          this.shopName = shop.value
        }
      }
    },
    search() {
      this.tabs = [0]
      for (let key of Object.keys(this.rateList)) {
        this.rateList[key].pageNumber = 1
      }
      this._getShopName()
      this._getBaseData()
      this._getChartOptions()
      this._getRateList()
    },
    handleTabClick(tab, event) {
      this.currentType = this.types[tab.index]
      let tabIndex = Number(tab.index)
      if (tabIndex in this.tabs) {
        return
      }
      this.tabs.push(tabIndex)
      this._getRateList()
    },
    handleCurrentChange(pageNum) {
      this.rateList[this.currentType].pageNumber = pageNum
      this._getRateList()
    }
  },
  components: {
    Search,
    Chart,
    ChartTitle,
    ChartContainer
  },
  created() {
    this._getMonth()
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";

.el-col {
  margin-bottom: $gutter;
}
.store-sales {
  .chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 125px;
    .progress {
      width: 100%;
    }
  }
  .sales-day {
    margin-bottom: $gutter;
  }
}
.store-customer {
  .chart-container {
    height: 300px;
  }
}

$itemHeight: 30px;

.store-operate {
  .info__list {
    height: 300px;
    background-color: #fff;
    background-image: repeating-linear-gradient(#fff, #fff $itemHeight, $color-background-l $itemHeight, $color-background-l 2*$itemHeight);
    border: 1px solid $color-border;
  }
  .info__item {
    display: flex;
    line-height: $itemHeight;
    font-size: $font-size-small;
    .info__title {
      width: 40%;
      padding: 0 20px 0 30px;
      @include no-wrap;
    }
    .info__desc {
      width: 60%;
      padding: 0 20px;
      @include no-wrap;
    }
  }
}
.sales-category,
.sales-amount {
  .chart-container {
    height: 300px;
  }
}
</style>

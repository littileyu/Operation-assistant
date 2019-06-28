<!-- 会员单体画像 -->
<template>
  <div class="member-single">
    <el-row :gutter="12" class="content-top">
      <el-col :lg="12" class="member-item member-info">
        <chart-title>会员基本信息档案</chart-title>
        <ul class="info__list">
          <li class="info__item">
            <span class="info__title">卡号</span>
            <span class="info__desc">{{baseInfo.card}}</span>
          </li>
          <li class="info__item">
            <span class="info__title">姓名</span>
            <span class="info__desc">{{baseInfo.name}}</span>
          </li>
          <li class="info__item">
            <span class="info__title">手机号</span>
            <span class="info__desc">{{baseInfo.username}}</span>
          </li>
          <li class="info__item">
            <span class="info__title">身份</span>
            <span class="info__desc">{{baseRole}}</span>
          </li>
          <li class="info__item">
            <span class="info__title">地址</span>
            <span class="info__desc">{{baseInfo.address}}</span>
          </li>
          <li class="info__item">
            <span class="info__title">等级</span>
            <span class="info__desc">{{baseInfo.gradeName}}</span>
          </li>
          <li class="info__item">
            <span class="info__title">积分</span>
            <span class="info__desc">{{baseInfo.point}}</span>
          </li>
          <li class="info__item">
            <span class="info__title">余额</span>
            <span class="info__desc">{{baseInfo.balance}}</span>
          </li>
          <li class="info__item">
            <span class="info__title">宝宝性别</span>
            <span class="info__desc">{{baseBabySex}}</span>
          </li>
          <li class="info__item">
            <span class="info__title">宝宝生日</span>
            <span class="info__desc">{{baseBabyBirthday}}</span>
          </li>
          <li class="info__item">
            <span class="info__title">宝宝预产期</span>
            <span class="info__desc">{{baseExBabyBirth}}</span>
          </li>
          <li class="info__item">
            <span class="info__title">宝宝身份证</span>
            <span class="info__desc">{{baseInfo.babyIdent}}</span>
          </li>
          <li class="info__item">
            <span class="info__title">备注</span>
            <span class="info__desc">{{baseInfo.memo}}</span>
          </li>
        </ul>
      </el-col>
      <el-col :lg="12" class="member-item member-value">
        <chart-title>会员价值分析</chart-title>
        <chart-container>
          <chart :loading="chart.loading" :resizable="true" :option="chart.value.option"></chart>
        </chart-container>
      </el-col>
      <el-col :lg="12" class="member-item member-category">
        <chart-title>会员购物类别分布</chart-title>
        <chart-container>
          <chart :loading="chart.loading" :resizable="true" :option="chart.category.option"></chart>
        </chart-container>
      </el-col>
      <el-col :lg="12" class="member-item member-brand">
        <chart-title>购物品牌喜好排行TOP10</chart-title>
        <chart-container>
          <chart :loading="chart.loading" :resizable="true" :option="chart.brand.option"></chart>
        </chart-container>
      </el-col>
    </el-row>
    <div class="member-shopping">
      <chart-title>会员:{{baseInfo.name}}[{{baseInfo.card}}]历史消费明细表，累计消费：{{totalPrice}}元，累计折让金额：{{totalActualPrice}}元</chart-title>
      <div class="shopping__tb">
        <el-table
          v-loading="tableLoading"
          :data="buylist"
          border
          height="500"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="sn"
            label="单号"
            width="140">
          </el-table-column>
          <el-table-column
            label="销售时间"
            width="150">
            <template scope="scope">
              {{_formatDate(scope.row.createDate)}}
            </template>
          </el-table-column>
          <el-table-column
            label="条码"
            width="150">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.items">
                  {{good.barCode}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            width="300">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.items">
                  {{good.name}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="原价"
            width="120">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.items">
                  {{good.price}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="折让价"
            width="120">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.items">
                  {{good.actualPrice}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="销售数量"
            width="120">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.items">
                  {{good.quantity}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="销售金额"
            width="120">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.items">
                  {{(good.quantity * good.price).toFixed(2)}}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="折让金额"
            width="120">
            <template scope="scope">
              <div class="tb__rowspan">
                <div class="tb__cell" v-for="good in scope.row.items">
                  {{(good.quantity * good.actualPrice).toFixed(2)}}
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'vue-echarts-v3/src/full'
import ChartTitle from 'base/chart-title/chart-title'
import ChartContainer from 'base/chart-container/chart-container'
import {ERR_OK} from 'api/config'
import {getMemberInfo} from 'api/member-single'
import {formatDate} from 'common/js/date'
import {radarChartColor, chartColor, barChartColor} from 'common/js/chartColor'

export default {
  data() {
    return {
      memberId: this.$route.params.memberId,
      baseInfo: {},
      chart: {
        loading: true,
        radarColor: {
          color: radarChartColor
        },
        chartColor: {
          color: chartColor
        },
        barColor: {
          color: barChartColor
        },
        value: {
          ready: {
            tooltip: {}
          },
          option: {
            series: []
          }
        },
        category: {
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
        brand: {
          ready: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              top: '20',
              left: '2%',
              right: '5%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.02]
            }
          },
          option: {
            series: []
          }
        }
      },
      buylist: [],
      tableLoading: true
    }
  },
  computed: {
    baseRole() {
      let guardian = this.baseInfo.guardian
      return guardian === '0' ? '爷爷' : guardian === '1' ? '奶奶' : guardian === '2' ? '父亲' : guardian === '3' ? '母亲' : ''
    },
    baseBabySex() {
      let sex = this.baseInfo.babySex
      return sex === '0' ? '男' : sex === '1' ? '女' : ''
    },
    baseBabyBirthday() {
      let time = this.baseInfo.babyBirthday
      if (time) {
        return formatDate('yyyy-MM-dd', time)
      }
      return ''
    },
    baseExBabyBirth() {
      let time = this.baseInfo.exBabyBirth
      if (time) {
        return formatDate('yyyy-MM-dd', time)
      }
      return ''
    },
    totalPrice() {
      let list = this.buylist
      let sum = 0
      for (let order of list) {
        for (let item of order.items) {
          sum += Number((item.price * item.quantity).toFixed(2))
        }
      }
      return sum.toFixed(2)
    },
    totalActualPrice() {
      let list = this.buylist
      let sum = 0
      for (let order of list) {
        for (let item of order.items) {
          sum += Number((item.actualPrice * item.quantity).toFixed(2))
        }
      }
      return sum.toFixed(2)
    }
  },
  methods: {
    fetchData() {
      this._getMemberInfo()
    },
    _formatDate(timeStamp) {
      let date = new Date(timeStamp)
      return formatDate('yyyy-MM-dd', date)
    },
    _getMemberInfo() {
      this.chart.loading = true
      this.tableLoading = true
      getMemberInfo(this.memberId).then((res) => {
        if (res.code === ERR_OK) {
          this.chart.loading = false
          this.tableLoading = false
          this.baseInfo = res.data.baseInfo
          this.chart.category.option = Object.assign({}, this.chart.chartColor, this.chart.category.ready, res.data.categoryOption)
          this.chart.brand.option = Object.assign({}, this.chart.barColor, this.chart.brand.ready, res.data.brandOption)
          this.chart.value.option = Object.assign({}, this.chart.radarColor, this.chart.value.ready, res.data.memberValueOption)
          this.buylist = res.data.consumptions
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
  },
  activated() {
    if (this.$route.params.memberId && this.$route.params.memberId !== this.memberId) {
      this.memberId = this.$route.params.memberId
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";

$infoHeight: 400px;

.member-item {
  margin-bottom: $gutter;
}
.member-info {
  .info__list {
    height: $infoHeight;
    background-color: #fff;
    background-image: repeating-linear-gradient(#fff, #fff 30px, $color-background-l 30px, $color-background-l 60px);
    border: 1px solid $color-border;
  }
  .info__item {
    display: flex;
    line-height: 30px;
    font-size: $font-size-small;
    .info__title {
      width: 35%;
      padding: 0 20px 0 40px;
      @include no-wrap;
    }
    .info__desc {
      width: 65%;
      padding: 0 20px;
      @include no-wrap;
    }
  }
}
.member-value {
  .chart-container {
    height: $infoHeight;
  }
}
.member-category,
.member-brand {
  .chart-container {
    height: 400px;
  }
}
.shopping__tb {
  .tb__rowspan {
    margin-left: -18px;
    margin-right: -18px;
  }
  .tb__cell {
    padding-left: 18px;
    padding-right: 18px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid $color-border;
    @include no-wrap;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>

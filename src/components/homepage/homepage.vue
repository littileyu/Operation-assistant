<template>
  <div class="homepage">
    <el-row :gutter="12" class="field-row">
      <el-col class="field-col" :sm="12" :md="8" :lg="6">
        <router-link
          tag="li"
          :to="{name: 'dailyPaper', params: {text: '总部日报'}}"
          @click.native="addToTop"
          class="field-item">
          <div class="field-item__hd">
            <p class="title">昨日销售总额</p>
            <p class="info">完成率{{baseData.yestodayRate}}</p>
          </div>
          <div class="field-item__bd" :class="trendCls(baseData.beforeYestodaySales, baseData.yestodaySales)">
            <span class="num">￥{{baseData.yestodaySales}}</span>
            <i class="icon iconfont" :class="iconTrend(baseData.beforeYestodaySales, baseData.yestodaySales)"></i>
          </div>
        </router-link>
      </el-col>
      <el-col class="field-col" :sm="12" :md="8" :lg="6">
        <router-link
          tag="li"
          :to="{name: 'salesProfile', params: {text: '销售概况', salesType: 'DAY'}}"
          @click.native="addToTop"
          class="field-item">
          <div class="field-item__hd">
            <p class="title">昨日毛利</p>
            <p class="info">毛利率{{baseData.yestodayProfitRate}}</p>
          </div>
          <div class="field-item__bd" :class="trendCls(baseData.beforeYestodayProfit, baseData.yestodayProfit)">
            <span class="num">￥{{baseData.yestodayProfit}}</span>
            <i class="icon iconfont" :class="iconTrend(baseData.beforeYestodayProfit, baseData.yestodayProfit)"></i>
          </div>
        </router-link>
      </el-col>
      <el-col class="field-col" :sm="12" :md="8" :lg="6">
        <router-link
          tag="li"
          :to="{name: 'salesProfile', params: {text: '销售概况', salesType: 'MONTH'}}"
          @click.native="addToTop"
          class="field-item">
          <div class="field-item__hd">
            <p class="title">本月销售总额</p>
            <p class="info">完成率{{baseData.monthRate}}</p>
          </div>
          <div class="field-item__bd" :class="trendCls(baseData.lastMonthSales, baseData.monthSales)">
            <span class="num">￥{{baseData.monthSales}}</span>
            <i class="icon iconfont" :class="iconTrend(baseData.lastMonthSales, baseData.monthSales)"></i>
          </div>
        </router-link>
      </el-col>
      <el-col class="field-col" :sm="12" :md="8" :lg="6">
        <router-link
          tag="li"
          :to="{name: 'salesProfile', params: {text: '销售概况', salesType: 'MONTH'}}"
          @click.native="addToTop"
          class="field-item">
          <div class="field-item__hd">
            <p class="title">本月毛利</p>
            <p class="info">毛利率{{baseData.monthProfitRate}}</p>
          </div>
          <div class="field-item__bd" :class="trendCls(baseData.lastMonthProfit, baseData.monthProfit)">
            <span class="num">￥{{baseData.monthProfit}}</span>
            <i class="icon iconfont" :class="iconTrend(baseData.lastMonthProfit, baseData.monthProfit)"></i>
          </div>
        </router-link>
      </el-col>
      <el-col class="field-col" :sm="12" :md="8" :lg="6">
        <router-link
          tag="li"
          :to="{name: 'customerAnalysis', params: {text: '昨日客单分析'}}"
          @click.native="addToTop"
          class="field-item">
          <div class="field-item__hd">
            <p class="title">昨日客流量</p>
            <p class="info">{{upMemberCount}}</p>
          </div>
          <div class="field-item__bd" :class="trendCls(baseData.yestodayMemberCount2, baseData.yestodayMemberCount)">
            <span class="num">{{baseData.yestodayMemberCount}}</span>
            <i class="icon iconfont" :class="iconTrend(baseData.yestodayMemberCount2, baseData.yestodayMemberCount)"></i>
          </div>
        </router-link>
      </el-col>
    </el-row>
    <el-row class="sales-row" :gutter="12">
      <el-col :lg="16">
        <div class="sales-month">
          <chart-title>当月销售情况</chart-title>
          <chart-container>
            <chart :loading="chart.month.loading" :resizable="true" :option="chart.month.option"></chart>
          </chart-container>
        </div>
      </el-col>
      <el-col :lg="8">
        <div class="sales-target">
          <chart-title class="target__task">{{today}} 任务要求：<span class="num">￥{{baseData.todayTask}}</span></chart-title>
          <div class="target__data">
            <chart-title>今日实时运营监控指标</chart-title>
            <div class="list">
              <div class="list__hd">
                <div class="list__row">
                  <span class="list__cell cell-left">NO</span>
                  <span class="list__cell cell-center">项目名称</span>
                  <span class="list__cell cell-right">实际值</span>
                </div>
              </div>
              <ul class="list__bd">
                <li class="list__row">
                  <span class="list__cell cell-left">1</span>
                  <span class="list__cell cell-center">实时销售金额</span>
                  <span class="list__cell cell-right">￥{{target.todaySales}}</span>
                </li>
                <li class="list__row">
                  <span class="list__cell cell-left">2</span>
                  <span class="list__cell cell-center">实时毛利</span>
                  <span class="list__cell cell-right">￥{{target.todayProfit}}</span>
                </li>
                <li class="list__row">
                  <span class="list__cell cell-left">3</span>
                  <span class="list__cell cell-center">目标完成率</span>
                  <span class="list__cell cell-right">{{target.completeRate}}</span>
                </li>
                <li class="list__row">
                  <span class="list__cell cell-left">4</span>
                  <span class="list__cell cell-center">剩余金额</span>
                  <span class="list__cell cell-right">￥{{target.remainTask}}</span>
                </li>
                <li class="list__row">
                  <span class="list__cell cell-left">5</span>
                  <span class="list__cell cell-center">剩余时间</span>
                  <span class="list__cell cell-right">{{remainTime()}}</span>
                </li>
                <li class="list__row">
                  <span class="list__cell cell-left">6</span>
                  <span class="list__cell cell-center">客流量</span>
                  <span class="list__cell cell-right">{{target.todayMemberCount}}人</span>
                </li>
                <li class="list__row">
                  <span class="list__cell cell-left">7</span>
                  <span class="list__cell cell-center">客单价</span>
                  <span class="list__cell cell-right">{{target.unitPrice}}元/单</span>
                </li>
                <li class="list__row">
                  <span class="list__cell cell-left">8</span>
                  <span class="list__cell cell-center">购物连带率</span>
                  <span class="list__cell cell-right">{{target.categoryRate}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="circle-row">
      <el-col :md="12" :lg="6" class="circle-col">
        <div class="circle-item" @click="showDialog('discount')">
          <o-circle :stroke-width="10" :width="156" :percentage="baseData.discountRate" title="昨日折扣率" strokeColor="#fc5c7d"></o-circle>
        </div>
      </el-col>
      <el-col :md="12" :lg="6" class="circle-col">
        <div class="circle-item" @click="showDialog('return')">
          <o-circle :stroke-width="10" :width="156" :percentage="baseData.returnRate" title="昨日退货率" strokeColor="#c94b4b"></o-circle>
        </div>
      </el-col>
      <el-col :md="12" :lg="6" class="circle-col">
        <div class="circle-item" @click="showDialog('lack')">
          <o-circle :stroke-width="10" :width="156" :percentage="baseData.outStockRate" title="缺货率" strokeColor="#fc4a1a"></o-circle>
        </div>
      </el-col>
      <el-col :md="12" :lg="6" class="circle-col">
        <div class="circle-item" @click="showDialog('unsalable')">
          <o-circle :stroke-width="10" :width="156" :percentage="baseData.unSaleRate" title="滞销率" strokeColor="#f7b733"></o-circle>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="各门店昨日折扣率" :visible.sync="dialog.discount.visible">
      <div class="chart-dialog">
        <chart :resizable="true" :option="dialog.discount.option"></chart>
      </div>
    </el-dialog>
    <el-dialog title="各门店昨日退货率" :visible.sync="dialog.return.visible">
      <div class="chart-dialog">
        <chart :resizable="true" :option="dialog.return.option"></chart>
      </div>
    </el-dialog>
    <el-dialog title="各门店缺货率" :visible.sync="dialog.lack.visible">
      <div class="chart-dialog">
        <chart :resizable="true" :option="dialog.lack.option"></chart>
      </div>
    </el-dialog>
    <el-dialog title="各门店滞销率" :visible.sync="dialog.unsalable.visible">
      <div class="chart-dialog">
        <chart :resizable="true" :option="dialog.unsalable.option"></chart>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import OCircle from "base/o-circle/o-circle";
import Chart from "vue-echarts-v3/src/full";
import ChartTitle from "base/chart-title/chart-title";
import ChartContainer from "base/chart-container/chart-container";
import { addToTopMixin } from "common/js/mixin";
import { formatDate } from "common/js/date";
import { barChartColor, lineChartColor } from "common/js/chartColor";
import {
  getTarget,
  getBaseData,
  getMonthChartOption,
  getPChartOptions
} from "api/homepage";
import { ERR_OK } from "api/config";

export default {
  mixins: [addToTopMixin],
  data() {
    return {
      // 基本数值
      baseData: {},
      // 今日实时运营监控指标
      target: {},
      chart: {
        barColor: {
          color: barChartColor
        },
        lineColor: {
          color: lineChartColor
        },
        month: {
          loading: true,
          ready: {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                crossStyle: {
                  color: "#999"
                }
              }
            },
            legend: {
              data: ["本期销售", "月累计销售"]
            }
          },
          option: {
            series: []
          }
        }
      },
      dialog: {
        lineReady: {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999"
              }
            }
          }
        },
        discount: {
          visible: false,
          option: {
            series: []
          }
        },
        return: {
          visible: false,
          option: {
            series: []
          }
        },
        lack: {
          visible: false,
          option: {
            series: []
          }
        },
        unsalable: {
          visible: false,
          option: {
            series: []
          }
        }
      }
    };
  },
  computed: {
    upMemberCount() {
      let count = this.baseData.upMemberCount;
      if (count > 0) {
        return `上升：${count}`;
      } else if (count < 0) {
        return `下降：${-count}`;
      } else {
        return "持平";
      }
    }
  },
  methods: {
    fetchData() {
      this._getBaseData();
      this._getTarget();
      this.remainTime();
      this._getMonthChartOption();
      this._getPChartOptions();
    },
    showDialog(item) {
      this.dialog[item].visible = true;
    },
    remainTime() {
      let time = new Date();
      let h = 23 - time.getHours();
      let m = 59 - time.getMinutes();
      return `${h}小时${m}分钟`;
    },
    trendCls(oldData, newData) {
      return newData > oldData
        ? "is-rise"
        : newData < oldData ? "is-fall" : "is-equal";
    },
    iconTrend(oldData, newData) {
      return newData > oldData
        ? "icon-shangsheng"
        : newData < oldData ? "icon-xiajiang" : "icon-chiping";
    },
    _getBaseData() {
      getBaseData().then(res => {
        if (res.code === ERR_OK) {
          this.baseData = res.data;
        }
      });
    },
    _getTarget() {
      getTarget().then(res => {
        if (res.code === ERR_OK) {
          this.target = res.target;
        }
      });
    },
    _getMonthChartOption() {
      getMonthChartOption().then(res => {
        if (res.code === ERR_OK) {
          this.chart.month.option = Object.assign(
            {},
            this.chart.barColor,
            this.chart.month.ready,
            res.option
          );
          this.chart.month.loading = false;
        }
      });
    },
    _getPChartOptions() {
      getPChartOptions().then(res => {
        if (res.code === ERR_OK) {
          this.dialog.discount.option = Object.assign(
            {},
            this.chart.lineColor,
            this.dialog.lineReady,
            res.options[0]
          );
          this.dialog.return.option = Object.assign(
            {},
            this.chart.lineColor,
            this.dialog.lineReady,
            res.options[1]
          );
          this.dialog.lack.option = Object.assign(
            {},
            this.chart.lineColor,
            this.dialog.lineReady,
            res.options[2]
          );
          this.dialog.unsalable.option = Object.assign(
            {},
            this.chart.lineColor,
            this.dialog.lineReady,
            res.options[3]
          );
        }
      });
    }
  },
  components: {
    OCircle,
    Chart,
    ChartTitle,
    ChartContainer
  },
  created() {
    this.today = formatDate("yyyy-MM-dd");
    // this.fetchData()
  },
  mounted() {
    clearInterval(timer);
    let timer = setInterval(() => {
      this._getTarget();
      this.remainTime();
    }, 1000 * 60);
  }
};
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";

.field-row {
  .field-col {
    margin-bottom: $gutter;
    @media (min-width: 1600px) {
      width: 20%;
    }
  }
  .field-item {
    background-color: #fff;
    border: 1px solid $color-border;
    cursor: pointer;
    &:hover,
    &:hover .field-item__hd {
      border-color: darken($color-border, 10%);
    }
  }
  .field-item__hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $gutter;
    border-bottom: 1px solid $color-border;
    .title {
      font-size: $font-size-medium;
      color: $color-text;
      line-height: 20px;
    }
    .info {
      font-size: $font-size-small;
      color: #fff;
      background-color: $color-background-d;
      padding: 0 10px;
      line-height: 22px;
      border-radius: 11px;
    }
  }
  .field-item__bd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 15px;
    &.is-rise {
      color: $color-theme;
    }
    .num {
      font-size: $font-size-large-s;
    }
    .icon {
      font-size: $font-size-large-x;
    }
  }
}
.sales-row {
  .sales-month {
    margin-bottom: $gutter;
    .chart-container {
      height: 412px;
    }
  }
  .sales-target {
    .target__data {
      margin-top: $gutter;
      margin-bottom: $gutter;
      .list {
        border: 1px solid $color-border;
      }
      .list__hd {
        font-weight: bold;
        .list__row {
          height: 40px;
          border-bottom: 1px solid $color-border;
        }
      }
      .list__row {
        font-size: 0;
      }
      .list__cell {
        display: inline-block;
        padding: 0 10px;
        font-size: $font-size-medium;
        line-height: 40px;
        &.cell-left {
          width: 20%;
          text-align: center;
        }
        &.cell-center,
        &.cell-right {
          width: 40%;
        }
      }
    }
  }
}
.circle-row {
  border: 1px solid $color-border;
  padding: $gutter 0;
  .circle-col {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
  }
  .circle-item {
    cursor: pointer;
  }
}
.chart-dialog {
  height: 300px;
}
</style>

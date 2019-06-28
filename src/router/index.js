import Vue from 'vue'
import Router from 'vue-router'
// 首页
import HomePage from 'components/homepage/homepage'
// 总部日报
import DailyPaper from 'components/daily-paper/daily-paper'
// 销售概况
import SalesProfile from 'components/sales-profile/sales-profile'
// 门店评估
import StoreEvaluation from 'components/store-evaluation/store-evaluation'
// 单个门店评估
import SingleEvaluation from 'components/single-evaluation/single-evaluation'
// 人员报告
import StaffReport from 'components/staff-report/staff-report'
// 采购报告
import PurchaseReport from 'components/purchase-report/purchase-report'
// 配送报告
import DistributionReport from 'components/distribution-report/distribution-report'
// 库存报告
import InventoryReport from 'components/inventory-report/inventory-report'
// 整体会员结构
import MemberAll from 'components/member-all/member-all'
// 会员排行
import MemberRate from 'components/member-rate/member-rate'
// 会员单体画像
import MemberSingle from 'components/member-single/member-single'
// 门店运营日报
import StoreDaily from 'components/store-daily/store-daily'
// 退货分析
import ReturnAnalysis from 'components/return-analysis/return-analysis'
// 折让监控
import DiscountMonitor from 'components/discount-monitor/discount-monitor'
// 调货参考方案
import Reference from 'components/reference/reference'
// 销售任务管理
import SalesManagement from 'components/sales-management/sales-management'
// 员工销售任务制定
import EmployeeTask from 'components/employee-task/employee-task'
// 人员信息/人员档案维护
import PersonnelInfo from 'components/personnel-info/personnel-info'
// 人员信息修改/添加人员
import PersonnelModify from 'components/personnel-modify/personnel-modify'
// 昨日客单分析
import CustomerAnalysis from 'components/customer-analysis/customer-analysis'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage
    },
    {
      path: '/dailyPaper',
      name: 'dailyPaper',
      component: DailyPaper
    },
    {
      path: '/salesProfile',
      name: 'salesProfile',
      component: SalesProfile
    },
    {
      path: '/storeEvaluation',
      name: 'storeEvaluation',
      component: StoreEvaluation
    },
    {
      path: '/singleEvaluation',
      name: 'singleEvaluation',
      component: SingleEvaluation
    },
    {
      path: '/staffReport',
      name: 'staffReport',
      component: StaffReport
    },
    {
      path: '/purchaseReport',
      name: 'purchaseReport',
      component: PurchaseReport
    },
    {
      path: '/distributionReport',
      name: 'distributionReport',
      component: DistributionReport
    },
    {
      path: '/inventoryReport',
      name: 'inventoryReport',
      component: InventoryReport
    },
    {
      path: '/memberAll',
      name: 'memberAll',
      component: MemberAll
    },
    {
      path: '/memberRate',
      name: 'memberRate',
      component: MemberRate
    },
    {
      path: '/memberSingle',
      name: 'memberSingle',
      component: MemberSingle
    },
    {
      path: '/storeDaily',
      name: 'storeDaily',
      component: StoreDaily
    },
    {
      path: '/returnAnalysis',
      name: 'returnAnalysis',
      component: ReturnAnalysis
    },
    {
      path: '/discountMonitor',
      name: 'discountMonitor',
      component: DiscountMonitor
    },
    {
      path: '/reference',
      name: 'reference',
      component: Reference
    },
    {
      path: '/salesManagement',
      name: 'salesManagement',
      component: SalesManagement
    },
    {
      path: '/employeeTask',
      name: 'employeeTask',
      component: EmployeeTask
    },
    {
      path: '/personnelInfo',
      name: 'personnelInfo',
      component: PersonnelInfo
    },
    {
      path: '/personnelModify',
      name: 'personnelModify',
      component: PersonnelModify
    },
    {
      path: '/customerAnalysis',
      name: 'customerAnalysis',
      component: CustomerAnalysis
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

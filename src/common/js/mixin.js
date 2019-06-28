import {mapGetters, mapMutations} from 'vuex'
import {getSelectOptions} from 'api/select'
import {ERR_OK} from 'api/config'
import {formatDate} from 'common/js/date'

export const addToTopMixin = {
  computed: {
    ...mapGetters([
      'tabList'
    ])
  },
  methods: {
    addToTop(e) {
      const text = this.$route.params.text || e.target.innerText
      const fullPath = this.$route.fullPath
      let tab = {
        text,
        fullPath,
        canDel: true
      }
      let list = this.tabList
      for (let item of list) {
        if (item.fullPath === tab.fullPath) {
          item.text = tab.text
          this.setCurrentTab(tab)
          return
        }
      }
      list.push(tab)
      this.setTabList(list)
      this.setCurrentTab(tab)
    },
    ...mapMutations({
      setTabList: 'SET_TAB_LIST',
      setCurrentTab: 'SET_CURRENT_TAB'
    })
  }
}

export const getShopListMixin = {
  data() {
    return {
      shopId: null,
      shops: []
    }
  },
  methods: {
    _getShopOptions() {
      getSelectOptions('SHOP').then((res) => {
        if (res.code === ERR_OK) {
          this.shops = res.options
        }
      })
    }
  }
}

export const taskMixin = {
  data() {
    return {
      shopId: null,
      shops: [],
      shopName: '全店',
      month: new Date(),
      formatMonth: this.getThisMonth(),
      page: {
        total: 0,
        pageNumber: 1,
        pageSize: 20
      },
      tableLoading: true
    }
  },
  methods: {
    getThisMonth() {
      return formatDate('yyyy-MM')
    },
    _getShopOptions() {
      getSelectOptions('SHOP').then((res) => {
        if (res.code === ERR_OK) {
          this.shops = res.options
        }
      })
    },
    _normalizePage(page) {
      let list = page.list
      let pageNum = page.pageNum
      let pageSize = page.pageSize
      list.forEach((item, index) => {
        item.index = (pageNum - 1) * pageSize + 1 + index
        item.memo = item.memo || ''
        item.editFlag = false
      })
      return list
    },
    _getShopName() {
      if (this.shopId === null || this.shopId === '') {
        this.shopName = '全店'
      } else {
        for (let shop of this.shops) {
          if (shop.id === this.shopId) {
            this.shopName = shop.value
          }
        }
      }
    }
  }
}

<!--具体用法看 19行-->
<template>
  <a-pagination
    v-model="page"
    :page-size-options="pageSizeOptions"
    :total="total"
    show-size-changer
    :page-size="limit"
    @showSizeChange="onShowSizeChange"
    class="pagination"
    :show-quick-jumper="showquickjumper"
    @change="onPageChange"
  >
    <template slot="buildOptionText" slot-scope="props">
      <span v-if="props.value !== total">{{ props.value }}条/页</span>
      <span v-if="props.value === total">全部</span>
    </template>
  </a-pagination>
</template>
<script>
/**
 * <Pagination :total="total" @loadData="loadData" :current="current" pageSize="pageSize"></Pagination>
 * @param number total //数据总数
 * @param loadData function //使用组件必传@loadData,
 * @param current number //当前页数
 * @param pageSize number //pageSize
 * 在父组件
 * <Pagination @loadData="loadData"></Pagination>
 * methods:{
 *  loadData(obj){
 *      console.log(obj);
        const {page,pageSize} = obj;
        this.current = page;
        this.pageSize = pageSize;
        this.getList();//请求表格方法,到时替换成自己的
 *  }
 * }
 */
export default {
  props: ["total", "current", "pageSize", "pageSizeOpts","showquickjumper"],
  data() {
    return {
      pageSizeOptions: [],
      // pageSize: 5,
      // current: 1,
    };
  },
  mounted() {
    this.pageSizeOptions = this.pageSizeOpts
      ? this.pageSizeOpts
      : ["5", "10", "20", "30", "40", "50"];
  },
  created() {
  },
  watch: {
    pageSizeOptions(newVal, oldVal) {
    },
  },
  computed: {
    // pageTotal() {
    //   return this.total;
    // },
    page: {
      get: function () {
        return this.current;
      },
      set: function (val) {},
    },
    limit: {
      get: function () {
        return this.pageSize;
      },
    },
  },
  methods: {
    onPageChange(page, pageSize) {
      // this.current = page;
      const obj = { page: page, pageSize: pageSize };
      this.$emit("loadData", obj);
    },
    onShowSizeChange(page, pageSize) {
      // this.current = page;
      const obj = { page: 1, pageSize: pageSize };
      this.$emit("loadData", obj);
    },
  },
};
</script>
<style lang="less" scoped>
.pagination {
  margin-top: 0.16rem;
  display: flex;
  justify-content: flex-end;
}
</style>
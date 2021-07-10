<template>
  <div class="tenant-manage">
    <div v-show="!toggleShow">
      <a-card>
        <a-form-model
          layout="inline"
          :model="formState"
          @submit="onSearch"
          @submit.native.prevent
        >
          <a-form-model-item label="名称">
            <a-input
              v-model="formState.tenantName"
              placeholder="请输入租户名称"
            >
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              type="primary"
              html-type="submit"
              shape="circle"
              style="margin-right: 0.16rem"
            >
              <a-icon type="search" />
            </a-button>
            <a-button type="default" shape="circle" @click="onClear">
              <a-icon type="redo" />
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-card>
      <a-card style="margin-top: 0.16rem">
        <template slot="title">
          <a-button type="primary" @click="onAddPage">创建租户</a-button>
        </template>
        <a-table
          :columns="columns"
          :data-source="data"
          rowKey="tenantId"
          bordered
          :pagination="false"
        >
          <template slot="roles" slot-scope="text, record">
            <a-tag v-for="(item, i) in record.roles" :key="i">
              {{item.systemName}}
            </a-tag>
          </template>
          <template slot="action" slot-scope="text, record">
            <a-button type="link"><a-icon type="edit" />编辑</a-button>
            <a-divider type="vertical" />
            <a-button
              type="link"
              style="color: #ff7875"
              @click="onDelFunc(record)"
            >
              <a-icon
                type="delete"
                theme="twoTone"
                two-tone-color="#eb2f96"
              />删除</a-button
            >
          </template>
        </a-table>
        <Pagination
          :total="total"
          @loadData="loadData"
          :current="current"
          :pageSize="pageSize"
        />
      </a-card>
    </div>
    <router-view v-show="toggleShow"></router-view>
  </div>
</template>
<script >
import Pagination from "@/components/Pagination";
import listMixin from "@/mixins/listMixin";
import { tenantList, systemList } from "@/api/tenant";
const columns = [
  {
    dataIndex: "tenantName",
    key: "tenantName",
    title: "租户名称",
    align: "center",
  },
  {
    title: "系统权限",
    dataIndex: "roles",
    key: "roles",
    align: "center",
    scopedSlots: { customRender: "roles" },
  },
  {
    title: "租户管理员",
    dataIndex: "adminAccountName",
    key: "adminAccountName",
    align: "center",
  },
  {
    title: "创建时间",
    dataIndex: "createdTime",
    key: "createdTime",
    align: "center",
  },

  {
    title: "操作",
    key: "action",
    align: "center",
    scopedSlots: { customRender: "action" },
  },
];

const data = [];

export default {
  components: {
    Pagination,
  },
  computed: {
    toggleShow: function () {
      return this.$route.meta.show;
    },
  },
  mounted() {
    this.getSystemList();
  },
  mixins: [listMixin],
  methods: {
    async getSystemList() {
      const { data } = await systemList();
      if (data.code === "0") {
        this.rolesList = data.data;
      }
    },
    async getList() {
      const _this = this
      const obj = {
        curPage: this.current,
        pageSize: this.pageSize,
        tenantName: this.formState.tenantName,
      };
      const { data } = await tenantList(obj);
      if (data.code === "0") {
        this.total = data.total;
        this.data = data.data;
        this.data.forEach(item=>{
          item.roles = []
          item.tenantSystemEntityList.forEach(subItem=>{
            item.roles = _this.rolesList.filter(e=>e.systemCode===subItem.systemCode)
          })
        })
      } else this.$msg.error(data.msg);
    },
    onSearch() {
     this.current = 1;
     this.getList()
    },
    onClear() {
      this.formState.name = "";
      this.getList()
    },
    onDelFunc() {},
    onAddPage() {
      this.$router.push({
        path: "/tenantManage/modifyTenantManage",
      });
    },
  },
  data() {
    return {
      formState: {
        tenantName: "",
      },
      columns,
      data,
      total: 0,
      rolesList: [],
    };
  },
};
</script>

<style lang="less" scoped>
.tenant-manage {
  // height: calc(100% - 128px);
  overflow-y: auto;
}
</style>
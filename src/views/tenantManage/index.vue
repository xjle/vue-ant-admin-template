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
            <a-input v-model="formState.name" placeholder="请输入租户名称">
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
          rowKey="id"
          bordered
          :pagination="false"
        >
          <template slot="roles" slot-scope="text, record">
            <a-tag v-for="(item, i) in record.roles" :key="i">
              {{ item }}
            </a-tag>
          </template>
          <template slot="action" slot-scope="text, record">
            <a-button type="link"><a-icon type="edit" />编辑</a-button>
            <!-- theme="twoTone"
              two-tone-color="#eb2f96" -->
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
const columns = [
  {
    dataIndex: "name",
    key: "name",
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
    dataIndex: "manage",
    key: "manage",
    align: "center",
  },
  {
    title: "创建时间",
    dataIndex: "creatTime",
    key: "creatTime",
    align: "center",
  },

  {
    title: "操作",
    key: "action",
    align: "center",
    scopedSlots: { customRender: "action" },
  },
];

const data = [
  {
    id: "1",
    name: "东风本田有限公司",
    manage: "张三",
    creatTime: "2020-12-30 12:20:00",
    roles: ["资产平台", "开发平台", "开放平台", "运营平台", "采集平台"],
  },
  {
    id: "2",
    name: "东风风神有限公司",
    manage: "里斯",
    creatTime: "2020-12-30 12:20:00",
    roles: ["资产平台", "开发平台", "开放平台"],
  },
];

export default {
  components: {
    Pagination,
  },
  computed:{
    toggleShow: function() { return this.$route.meta.show }
  },
  mixins: [listMixin],
  methods: {
    getList() {
      console.log("getList");
      
    },
    onSearch() {
      console.log(this.formState.name);
    },
    onClear() {
      this.formState.name = "";
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
        name: "",
      },
      columns,
      data,
      total: 10,
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
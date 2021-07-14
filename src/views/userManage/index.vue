<template>
  <div class="user-manage">
    <a-card>
      <a-form-model
        layout="inline"
        :model="formState"
        @submit="onSearch"
        @submit.native.prevent
        :label-col="{
          sm: { span: 6 },
          md: { span: 6 },
          xl: { span: 6 },
          xxl: { span: 6 },
        }"
        :wrapper-col="{ span: 18 }"
      >
        <a-row style="margin-bottom: 0.16rem">
          <a-col :span="8">
            <a-form-model-item label="编码">
              <a-input
                class="width-input"
                v-model="formState.code"
                placeholder="请输入编码"
              >
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="名称">
              <a-input
                class="width-input"
                v-model="formState.name"
                placeholder="请输入名称"
              >
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="邮箱">
              <a-input
                class="width-input"
                v-model="formState.email"
                placeholder="请输入邮箱"
              >
              </a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="组织">
              <a-input
                class="width-input"
                v-model="formState.organize"
                placeholder="请输入组织"
              >
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="租户管理">
              <a-select
                placeholder="选择是否租户管理员"
                v-model="formState.isFlag"
                class="width-input"
                ref="select"
              >
                <a-select-option value="">全部</a-select-option>
                <a-select-option
                  v-for="item in selectList"
                  :key="item.keyCode"
                  :value="item.keyCode"
                  >{{ item.keyValue }}</a-select-option
                >
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item
              :label-col="{
                sm: { span: 6 },
                md: { span: 6 },
                xl: { span: 6 },
                xxl: { span: 6 },
              }"
              :wrapper-col="{ span: 10 }"
              style="text-align:right;"
            >
              <a-button
                type="primary"
                shape="circle"
                html-type="submit"
                style="margin-right: 0.16rem"
              >
                <a-icon type="search" />
              </a-button>
              <a-button type="default" shape="circle" @click="onClear">
                <a-icon type="redo" />
              </a-button>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <a-card style="margin-top: 0.16rem">
      <template #title>
        <a-button type="primary">同步用户</a-button>
      </template>
      <a-table
        :columns="columns"
        :data-source="data"
        rowKey="id"
        bordered
        :pagination="false"
      >
      </a-table>
      <Pagination
        :total="total"
        @loadData="loadData"
        :current="current"
        :pageSize="pageSize"
      />
    </a-card>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import listMixin from "@/mixins/listMixin";
const columns = [
  {
    dataIndex: "code",
    key: "code",
    title: "用户编码",
    align: "center",
  },
  {
    title: "用户名称",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "电话",
    dataIndex: "phone",
    key: "phone",
    align: "center",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
    align: "center",
  },
  {
    title: "组织名称",
    dataIndex: "organizeName",
    key: "organizeName",
    align: "center",
  },
  {
    title: "租户管理员",
    dataIndex: "isManage",
    key: "isManage",
    align: "center",
    customRender: (text, record, index) =>
      `${text ? `是（${record.manage}）` : "否"}`,
  },
];

const data = [
  {
    id: "s0",
    code: "DFL00001",
    name: "张三",
    phone: "13987654321",
    email: "hhhwww@dfl.com.cn",
    organizeName: "东风风神",
    isManage: true,
    manage: "东风风神有限公司",
  },
  {
    id: "s1",
    code: "DFV00001",
    name: "李四",
    phone: "13123456789",
    email: "YYY@dfv.com.cn",
    organizeName: "东风本田",
    isManage: false,
    manage: "",
  },
];
export default {
  components: {
    Pagination,
  },
  mixins: [listMixin],
  data() {
    return {
      total: 10,
      columns,
      data,
      formState: {
        code: "",
        email: "",
        isFlag: "",
        organize: "",
        name: "",
      },
      selectList: [
        { keyCode: "1", keyValue: "是" },
        { keyCode: "0", keyValue: "否" },
      ],
    };
  },
  methods: {
    onClear() {
      this.formState.code = "";
      // this.formState.email = "";
      this.formState.isFlag = "";
      // this.formState.name = "";
      // this.formState.organize = "";
    },
    onDelFunc(data) {
      console.log(data);
    },
    onSearch() {
      console.log(5555);
    },
    getList() {
      console.log("getList");
    },
  },
};
</script>

<style lang="less" scoped>
.user-manage {
  height: 100%;
  overflow-y: auto;
  padding: 0.16rem;
  .ant-form-item {
    width: 100%;
  }
}
.width-input {
  width: 200px;
}
</style>
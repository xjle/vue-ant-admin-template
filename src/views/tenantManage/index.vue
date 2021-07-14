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
          <template slot="tenantSystemEntityList" slot-scope="text, record">
            <a-tag @click="onEdit(record)" v-for="(item, i) in record.tenantSystemEntityList" :key="i">
              {{ item.systemName }}
            </a-tag>
          </template>
          <template slot="action" slot-scope="text, record">
            <a-button type="link" @click="onEdit(record)"
              ><a-icon type="edit" />编辑</a-button
            >
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
    <!-- <router-view v-show="toggleShow"></router-view> -->
    <addModel ref="addModelRef" />
  </div>
</template>
<script >
import Pagination from "@/components/Pagination";
import addModel from "./components/addModel.vue";
import listMixin from "@/mixins/listMixin";
import { tenantList, systemList, delTenant } from "@/api/tenant";
const columns = [
  {
    dataIndex: "tenantName",
    key: "tenantName",
    title: "租户名称",
    align: "center",
  },
  {
    title: "系统权限",
    dataIndex: "tenantSystemEntityList",
    key: "tenantSystemEntityList",
    align: "center",
    scopedSlots: { customRender: "tenantSystemEntityList" },
    width: "6rem",
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
    addModel,
  },
  computed: {
    toggleShow: function () {
      return this.$route.meta.show;
    },
  },
  mounted() {
    if (!this.toggleShow) {
      this.getSystemList();
    }
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
      const _this = this;
      const obj = {
        curPage: this.current,
        pageSize: this.pageSize,
        tenantName: this.formState.tenantName,
      };
      const { data } = await tenantList(obj);
      if (data.code === "0") {
        this.total = data.total;
        this.data = data.data;
        this.data.forEach((item) => {
          for (let i = 0; i < this.rolesList.length; i++) {
            const e = this.rolesList[i];
            for (let j = 0; j < item.tenantSystemEntityList.length; j++) {
              const subItem = item.tenantSystemEntityList[j];
              if (e.systemCode === subItem.systemCode) {
                subItem.systemName = e.systemName;
              }
            }
          }
        });
      } else this.$msg.error(data.msg);
    },
    onSearch() {
      this.current = 1;
      this.getList();
    },
    onClear() {
      this.formState.tenantName = "";
      this.getList();
    },
    onDelFunc({ tenantId, tenantName }) {
      const _this = this;
      const obj = {
        title: "删除",
        content: `您确定要删除${tenantName}吗?`,
        onOk() {
          delTenant({ tenantId: tenantId }).then((res) => {
            if (res.data.code === "0") {
              _this.$msg.success(res.data.msg);
              _this.getList();
            } else {
              _this.$msg.error(res.data.msg);
            }
          });
        },
        onCancel() {
          console.log("xixi");
        },
      };
      this.$showConfirm(obj);
    },
    onAddPage() {
      this.$nextTick(() => {
        this.$refs.addModelRef.getSystemList();
        this.$refs.addModelRef.title = '创建新租户';
        this.$refs.addModelRef.edit = false;
        this.$refs.addModelRef.showVisible = true;
      });
    },
    onEdit(data) {
      this.$nextTick(() => {
        this.$refs.addModelRef.title = '编辑租户';
        this.$refs.addModelRef.edit = true;
        this.$refs.addModelRef.showVisible = true;
        this.$refs.addModelRef.setFunc(data);
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
  height: 100%;
  overflow-y: auto;
  padding: 0.16rem;
  margin-bottom: 0.36rem;
  .ant-tag{
     height: 0.4rem;
    line-height: 0.4rem;
    font-size: 12px;
    margin-bottom: 0.08rem;
    cursor: pointer;
  }
}

</style>
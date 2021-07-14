<template>
  <!-- 暂时不使用 -->
  <!-- 开发多租户管理列表页面，开发新增多租户列表页面 -->
  <a-card>
    <a-form
      :form="form"
      :label-col="{
        sm: { span: 3 },
        md: { span: 3 },
        xl: { span: 3 },
        xxl: { span: 3 },
      }"
      :wrapper-col="{ span: 8 }"
      @submit="onSubmit"
    >
      <a-form-item label="租户编码">
        <a-input
          v-decorator="[
            `tenantCode`,
            {
              rules: [
                {
                  required: true,
                  message: '请输入租户编码',
                  whitespace: true,
                },
              ],
            },
          ]"
          placeholder="请输入租户编码"
        ></a-input>
      </a-form-item>
      <a-form-item label="租户名称">
        <a-input
          v-decorator="[
            `tenantName`,
            {
              rules: [
                {
                  required: true,
                  message: '请输入租户名称',
                  whitespace: true,
                },
              ],
            },
          ]"
          placeholder="请输入租户名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="租户管理员">
        <a-tree-select
          show-search
          placeholder="请选择租户管理员"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="treeData"
          tree-node-filter-prop="title"
          tree-default-expand-all
          v-decorator="[
            `adminAccount`,
            {
              rules: [
                {
                  required: true,
                  message: '请选择租户管理员',
                },
              ],
              initialValue: 's0',
            },
          ]"
        >
          <template #title>
            <p>{{ title }}</p>
          </template>
        </a-tree-select>
      </a-form-item>
      <a-form-item
        label="系统访问权限"
        :label-col="{
          sm: { span: 3 },
          md: { span: 3 },
          xl: { span: 3 },
          xxl: { span: 3 },
        }"
        :wrapper-col="{ span: 8 }"
      >
        <a-checkbox-group
          v-decorator="[
            `systemCodes`,
            {
              rules: [
                {
                  required: true,
                  message: '请选择系统权限',
                },
              ],
            },
          ]"
          @change="handleChange"
          placeholder="请选择系统访问权限"
          style="width: 100%"
        >
          <a-row>
            <a-col
              v-for="(item, i) in checkList"
              :key="item.systemCode"
              :span="24"
              :class="item.resourceNeedFlag ? 'page-col' : ''"
            >
              <a-checkbox :value="item.systemCode"
                >{{ item.systemName }}
              </a-checkbox>
              <a-card
                v-if="item.resourceNeedFlag && item.showFlag"
                style="width: 100%"
                class="system-list-card"
              >
                <a-row
                  v-if="item.resourceDiskLimit && item.resourceDiskLimit > 0"
                  type="flex"
                  justify="space-between"
                >
                  <a-form-item
                    label="分配存储资源"
                    :label-col="{
                      sm: { span: 12 },
                      md: { span: 12 },
                      xl: { span: 12 },
                      xxl: { span: 12 },
                    }"
                    :wrapper-col="{ span: 1 }"
                  >
                    <a-input-number
                      v-decorator="[
                        `systemList${i + 1}.resourceDisk`,
                        {
                          rules: [
                            {
                              required: true,
                              message: '请输入值',
                            },
                          ],
                          initialValue: 1,
                        },
                      ]"
                      :min="1"
                      style="width: 100px"
                    />
                  </a-form-item>
                  <a-form-item>
                    <a-select
                      style="width: 60px"
                      v-decorator="[
                        `systemList${i + 1}.resourceDiskValue`,
                        {
                          rules: [{ required: true, message: '请选择单位' }],
                          initialValue: 'G',
                        },
                      ]"
                    >
                      <a-select-option
                        v-for="item in selectList"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.value }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-row>
                <a-row
                  type="flex"
                  v-if="
                    (item.resourceMemoryLimit &&
                      item.resourceMemoryLimit > 0) ||
                    (item.resourceCpuLimit && item.resourceCpuLimit > 0)
                  "
                  style="color: rgba(0, 0, 0, 0.85)"
                  justify="space-between"
                >
                  分配计算资源</a-row
                >
                <a-row
                  type="flex"
                  justify="space-between"
                  v-if="
                    item.resourceMemoryLimit && item.resourceMemoryLimit > 0
                  "
                  style="width: 100%"
                >
                  <a-form-item
                    :label-col="{
                      sm: { span: 17 },
                      md: { span: 17 },
                      xl: { span: 17 },
                      xxl: { span: 17 },
                    }"
                    :wrapper-col="{ span: 6 }"
                    label="内存"
                  >
                    <a-input-number
                      v-decorator="[
                        `systemList${i + 1}.resourceMemory`,
                        {
                          rules: [
                            {
                              required: true,
                              message: '请输入值',
                            },
                          ],
                          initialValue: 1,
                        },
                      ]"
                      :min="1"
                      style="width: 100px"
                    />
                  </a-form-item>
                  <a-form-item>
                    <a-select
                      style="width: 60px"
                      v-decorator="[
                        `systemList${i + 1}.resourceMemoryValue`,
                        {
                          rules: [{ required: true, message: '请选择单位' }],
                          initialValue: 'G',
                        },
                      ]"
                    >
                      <a-select-option
                        v-for="item in selectList"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.value }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-row>

                <a-row
                  type="flex"
                  justify="space-between"
                  v-if="item.resourceCpuLimit && item.resourceCpuLimit > 0"
                  style="width: 100%"
                >
                  <a-form-item
                    :label-col="{
                      sm: { span: 17 },
                      md: { span: 17 },
                      xl: { span: 17 },
                      xxl: { span: 17 },
                    }"
                    :wrapper-col="{ span: 6 }"
                    label="CPU"
                  >
                    <a-input-number
                      v-decorator="[
                        `systemList${i + 1}.resourceCpu`,
                        {
                          rules: [
                            {
                              required: true,
                              message: '请输入值',
                            },
                          ],
                          initialValue: 1,
                        },
                      ]"
                      :min="1"
                      style="width: 100px"
                    />
                  </a-form-item>
                  core
                </a-row>
              </a-card>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item
        style="text-align: center"
        :label-col="{
          sm: { span: 8 },
          md: { span: 8 },
          xl: { span: 8 },
          xxl: { span: 8 },
        }"
        :wrapper-col="{ span: 8 }"
      >
        <a-button type="primary" html-type="submit">保存</a-button>
        <a-button style="margin-left: 0.16rem" @click="onGoBack">返回</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script >
import { systemList,insertTenant } from "@/api/tenant";
const treeData = [
  {
    title: "组织架构1",
    disableCheckbox: true,
    disabled: true,
    value: "1",
    children: [
      {
        title: "张三",
        value: "s0",
        key: "s0",
      },
      {
        title: "李四",
        value: "s1",
        key: "s1",
      },
      {
        title: "王五",
        value: "s2",
        key: "s2",
      },
    ],
  },
  {
    title: "组织架构2",
    disableCheckbox: true,
    disabled: true,
    value: "2",
    children: [
      {
        title: "赵六",
        value: "s3",
        key: "s3",
      },
      {
        title: "魏七",
        value: "s4",
        key: "s4",
      },
    ],
  },
];
const checkList = [
  {
    systemCode: "1",
    systemName: "1",
    resourceNeedFlag: 1,
    createType: 1,
    databaseFile: "1",
    applicationFile: "1",
    resourceCpuLimit: "1",
    resourceMemoryLimit: "1",
    resourceDiskLimit: "1",
    enabled: 1,
    createdBy: null,
    createdTime: "2021-07-09 11:23:41",
    lastUpdatedBy: null,
    lastUpdatedTime: null,
    showFlag: false,
  },
  {
    systemCode: "2",
    systemName: "数据资产平台",
    resourceNeedFlag: 0,
    createType: null,
    databaseFile: null,
    applicationFile: null,
    resourceCpuLimit: "0",
    resourceMemoryLimit: "0",
    resourceDiskLimit: "0",
    enabled: 1,
    createdBy: "1",
    createdTime: "2021-07-12 09:04:11",
    lastUpdatedBy: null,
    lastUpdatedTime: null,
    showFlag: false,
  },
  {
    systemCode: "3",
    systemName: "数据开发平台",
    resourceNeedFlag: 1,
    createType: null,
    databaseFile: null,
    applicationFile: null,
    resourceCpuLimit: "1",
    resourceMemoryLimit: "1",
    resourceDiskLimit: "1",
    enabled: 1,
    createdBy: "1",
    createdTime: "2021-07-12 09:05:02",
    lastUpdatedBy: null,
    lastUpdatedTime: null,
    showFlag: false,
  },
  {
    systemCode: "4",
    systemName: "开放平台",
    resourceNeedFlag: 0,
    createType: null,
    databaseFile: null,
    applicationFile: null,
    resourceCpuLimit: "0",
    resourceMemoryLimit: "0",
    resourceDiskLimit: "0",
    enabled: 1,
    createdBy: "1",
    createdTime: "2021-07-12 09:05:35",
    lastUpdatedBy: null,
    lastUpdatedTime: null,
    showFlag: false,
  },
  {
    systemCode: "5",
    systemName: "运营平台",
    resourceNeedFlag: 0,
    createType: null,
    databaseFile: null,
    applicationFile: null,
    resourceCpuLimit: "0",
    resourceMemoryLimit: "0",
    resourceDiskLimit: "0",
    enabled: 1,
    createdBy: "1",
    createdTime: "2021-07-12 09:05:53",
    lastUpdatedBy: null,
    lastUpdatedTime: null,
    showFlag: false,
  },
  {
    systemCode: "6",
    systemName: "采集与交换平台",
    resourceNeedFlag: 1,
    createType: null,
    databaseFile: null,
    applicationFile: null,
    resourceCpuLimit: "0",
    resourceMemoryLimit: "0",
    resourceDiskLimit: "1",
    enabled: 1,
    createdBy: "1",
    createdTime: "2021-07-12 09:06:30",
    lastUpdatedBy: null,
    lastUpdatedTime: null,
    showFlag: false,
  },
];
const selectList = [{ value: "M" }, { value: "G" }, { value: "T" }];
export default {
  data() {
    return {
      treeData,
      selectList,
      checkList,
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    // this.form.getFieldDecorator("systemList", {
    //   initialValue: [],
    //   preserve: true,
    // });
  },
  mounted() {
    // this.getSystemList()
  },
  methods: {
    async getSystemList() {
      const { data } = await systemList();
      if (data.code === "0") {
        this.checkList = data.data;
        this.checkList.forEach((item) => {
          item.showFlag = false;
        });
      }
    },
    onGoBack() {
      this.checkList.forEach((item) => {
        item.showFlag = false;
      });
      this.$router.go(-1);
    },
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.famtFunc(values);
        }
      });
    },
    famtFunc(values) {
      // 数据格式，
      const arr = [];
      values.systemCodes.forEach((item) => {
        for (const key in values) {
          if (key === `systemList${item}`) {
            arr.push({
              systemCode: item,
              resourceCpu: values[`${key}`].resourceCpu,
              resourceMemory:values[`${key}`].resourceMemory,
              resourceDisk: values[`${key}`].resourceDisk,
            });
          }
        }
      });
      const obj = {
        tenantCode: values.tenantCode,
        tenantName: values.tenantName,
        adminAccount: values.adminAccount,
        adminAccountName: "张三",
        tenantSystemEntityList: arr,
      };
      this.insertTenantFunc(obj)
    },
    async insertTenantFunc(obj){
      const {data } = await insertTenant(obj)
      console.log(data);
    },
    handleChange(value) {
      this.checkList.map((item) => {
        if (value.includes(item.systemCode)) {
          item.showFlag = true;

          // const { form } = this;
          // const systemList = form.getFieldValue("systemList");
          // const nextKeys = systemList.concat(item.systemCode);
          // form.setFieldsValue({
          //   systemList: nextKeys,
          // });
        } else {
          item.showFlag = false;
          // const { form } = this;
          // const size1 = form.getFieldValue("systemList");

          // form.setFieldsValue({
          //   systemList: size1.filter(
          //     (subItem, index) => subItem !== item.systemCode
          //   ),
          // });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.modify-page {
  .width-input {
    width: 200px !important;
  }
}
</style>
<style lang="less">
.modify-page {
  .page-col {
    .ant-card {
      margin-top: 0.16rem;
      .ant-card-body {
        padding: 0 0 0 0.32rem; //
      }
    }
  }
}
.system-list-card {
  .ant-form-explain {
    width: 100px !important;
  }
}
</style>


<template>
<!-- 编辑多租户接口联调 -->
<!-- 完善布局 -->
  <!-- :footer="null" -->
  <div class="modify-page">
    <a-modal
      :title="title"
      :visible="showVisible"
      width="60%"
      :bodyStyle="{ maxHeight: '500px', overflowY: 'auto' }"
      :maskClosable="false"
      :destroyOnClose="true"
      :centered="true"
      @cancel="handleCancel"
      @ok="handleOk"
    >
      <a-form
        :form="form"
        :label-col="{
          sm: { span: 6 },
          md: { span: 6 },
          xl: { span: 6 },
          xxl: { span: 6 },
        }"
        :wrapper-col="{ span: 12 }"
      >
        <!--   @submit="onSubmit" -->
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
                initialValue: 1,
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
            sm: { span: 6 },
            md: { span: 6 },
            xl: { span: 6 },
            xxl: { span: 6 },
          }"
          :wrapper-col="{ span: 12 }"
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
                    justify="start"
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
                          `systemList${item.systemCode}.resourceDisk`,
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
                          `systemList${item.systemCode}.resourceDiskValue`,
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
                    justify="start"
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
                          `systemList${item.systemCode}.resourceMemory`,
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
                    <a-form-item style="padding-left: 0.78rem;">
                      <a-select
                        style="width: 60px"
                        v-decorator="[
                          `systemList${item.systemCode}.resourceMemoryValue`,
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
                    justify="start"
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
                          `systemList${item.systemCode}.resourceCpu`,
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
                    <a-form-item style="padding-left:0.88rem;">core</a-form-item>
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
          <!-- <a-button type="primary" html-type="submit">保存</a-button> -->
          <!-- @click="onGoBack" -->
          <!-- <a-button style="margin-left: 0.16rem" >返回</a-button> -->
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script >
import { systemList, insertTenant, updateTenant } from "@/api/tenant";
const treeData = [
  {
    title: "组织架构1",
    disableCheckbox: true,
    disabled: true,
    value: "s1",
    children: [
      {
        title: "张三",
        value: 1,
        key: 1,
      },
      {
        title: "李四",
        value: 2,
        key: 2,
      },
      {
        title: "王五",
        value: 3,
        key: 3,
      },
    ],
  },
  {
    title: "组织架构2",
    disableCheckbox: true,
    disabled: true,
    value: "s2",
    children: [
      {
        title: "赵六",
        value: 4,
        key: 4,
      },
      {
        title: "魏七",
        value: 5,
        key: 5,
      },
    ],
  },
];
const checkList = [];
const selectList = [{ value: "M" }, { value: "G" }, { value: "T" }];
export default {
  data() {
    return {
      title: "创建租户",
      edit: false,
      showVisible: false,
      treeData,
      selectList,
      checkList,
      queryId: "",
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted() {
    // this.getSystemList()
  },
  methods: {
    async getSystemList() {
      // 获取系统权限
      const { data } = await systemList();
      if (data.code === "0") {
        this.checkList = data.data;
        this.checkList.forEach((item) => {
          item.showFlag = false;
        });
      }
    },
    handleCancel() {
      //取消按钮
      this.checkList.forEach((item) => {
        item.showFlag = false;
      });
      this.queryId = "";
      this.edit = false;
      this.showVisible = false;
    },
    handleOk(e) {
      // 点击确定
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.famtFunc(values);
        }
      });
    },
    famtFunc(values) {
      // 数据格式，
      // 因为foreach 异步导致数据分开
      const arr = [];
      for (let j = 0; j < values.systemCodes.length; j++) {
        const item = values.systemCodes[j];
        arr.push({ systemCode: item.toString() });
        for (const key in values) {
          if (key === `systemList${item}`) {
            for (let i = 0; i < arr.length; i++) {
              const subItem = arr[i];
              if (subItem.systemCode == item) {
                subItem.resourceCpu = values[`${key}`].resourceCpu
                  ? values[`${key}`].resourceCpu.toString()
                  : "";
                subItem.resourceMemory = values[`${key}`].resourceMemory
                  ? values[`${key}`].resourceMemory.toString()
                  : "";
                subItem.resourceDisk = values[`${key}`].resourceDisk
                  ? values[`${key}`].resourceDisk.toString()
                  : "";
              }
            }
          }
        }
      }
      const obj = {
        tenantCode: values.tenantCode,
        tenantName: values.tenantName,
        adminAccount: values.adminAccount,
        adminAccountName: "张三",
        tenantSystemEntityList: arr,
      };
      if (arr.length === values.systemCodes.length) {
        // 添加保障
        if (this.edit) {
          if (this.queryId) {
            obj.tenantId = this.queryId;
          }
          this.updateTenantFunc(obj);
        } else {
          this.insertTenantFunc(obj);
        }
      }
    },
    async updateTenantFunc(obj) {
      // 编辑
      const { data } = await updateTenant(obj);
      if (data.code === "0") {
        this.$msg.success(data.msg);
        this.showFunc();
      } else this.$msg.error(data.msg);
    },
    async insertTenantFunc(obj) {
      // 插入信息接口
      const { data } = await insertTenant(obj);
      if (data.code === "0") {
        this.$msg.success(data.msg);
        this.showFunc();
      } else this.$msg.error(data.msg);
    },
    showFunc() {
      // 调用接口后
      this.checkList = [];
      this.showVisible = false;
      this.edit = false;
      this.queryId = "";
      this.$parent.getList();
    },
    handleChange(value) {
      // 多选框切换，判断是否展示数据
      this.checkList.map((item) => {
        if (value.includes(item.systemCode)) {
          item.showFlag = true;
        } else {
          item.showFlag = false;
        }
      });
    },
    async setFunc(data) {
      await this.getSystemList();
      this.queryId = data.tenantId;
      let systemCodes = [];
      let systemList = [];
      for (let i = 0; i < data.tenantSystemEntityList.length; i++) {
        // 这里是回显多选框数据
        const element = data.tenantSystemEntityList[i];
        systemCodes.push(element.systemCode);
        for (let j = 0; j < this.checkList.length; j++) {
          const item = this.checkList[j];
          if (item.systemCode === element.systemCode) {
            item.showFlag = true;
            if (item.resourceNeedFlag && item.resourceNeedFlag > 0) {
              systemList.push(`systemList${item.systemCode}`);
            }
          }
        }
      }
      const obj = {
        tenantCode: data.tenantCode,
        tenantName: data.tenantName,
        adminAccount: data.adminAccount,
        systemCodes,
      };
      this.form.setFieldsValue(obj);
      this.$nextTick(() => {
        for (let i = 0; i < systemList.length; i++) {
          // 这里回显资源数据
          const item = systemList[i];
          for (let j = 0; j < data.tenantSystemEntityList.length; j++) {
            const element = data.tenantSystemEntityList[j];
            if (item.indexOf(element.systemCode) > 0) {
              obj[`${item}`] = {
                resourceDisk: element.resourceDisk
                  ? parseInt(element.resourceDisk)
                  : null,
                resourceCpu: element.resourceCpu
                  ? parseInt(element.resourceCpu)
                  : null,
                resourceMemory: element.resourceMemory
                  ? parseInt(element.resourceMemory)
                  : null,
              };
            }
          }
        }
        this.form.setFieldsValue(obj);
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


<template>
  <a-card class="modify-page">
    <a-form
      :form="form"
      :label-col="{
        sm: { span: 3 },
        md: { span: 3 },
        xl: { span: 3 },
        xxl: { span: 3 },
      }"
      :wrapper-col="{ span: 6 }"
      @submit="onSubmit"
    >
      <a-form-item label="租户">
        <a-input
          v-decorator="[
            `name`,
            {
              rules: [
                {
                  required: true,
                  message: '请输入租户名称',
                  whitespace:true
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
            `user`,
            {
              rules: [
                {
                  required: true,
                  message: '请选择租户管理员',
                 
                },
              ],
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
            `roles`,
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
            <a-col :span="24"
              ><a-checkbox value="1"> 数据资产平台 </a-checkbox>
            </a-col>
            <a-col :span="24" class="page-col">
              <a-checkbox value="2"> 数据开发平台 </a-checkbox>

              <a-card v-if="flag2">
                <a-form-model  ref="formmodel" :model="formmodel" layout="inline" :rules="rules">
                  <a-row>
                    <!-- <a-form-model-item style="color: rgba(0, 0, 0, 0.85)"
                      >分配存储资源</a-form-model-item
                    > -->
                    <a-form-model-item prop="name" label="分配存储资源">
                      <a-input-number :min="1" style="width: 100px" />
                    </a-form-model-item>
                    <a-form-model-item prop="selectValue">
                      <a-select style="width: 60px">
                        <a-select-option
                          v-for="item in selectList"
                          :key="item.value"
                          :value="item.value"
                        >
                          {{ item.value }}
                        </a-select-option>
                      </a-select>
                    </a-form-model-item>
                  </a-row>
                  <a-row>
                    <a-col :span="24" style="color: rgba(0, 0, 0, 0.85)" >
                      分配计算资源
                    </a-col>
                    <a-col :span="24" :push="4">
                      <a-form-model-item label="内存" prop="name1">
                        <a-input-number :min="1" style="width: 100px" />
                      </a-form-model-item>
                      <a-form-model-item prop="selectValue1">
                        <a-select style="width: 60px">
                          <a-select-option
                            v-for="item in selectList"
                            :key="item.value"
                            :value="item.value"
                          >
                            {{ item.value }}
                          </a-select-option>
                        </a-select>
                      </a-form-model-item>
                    </a-col>
                    <a-col :span="24" :push="4">
                      <a-form-model-item label="CPU" prop="name2">
                        <a-input-number :min="1" style="width: 100px" />
                      </a-form-model-item>
                      <a-form-model-item> core </a-form-model-item>
                    </a-col>
                  </a-row>
                </a-form-model>
              </a-card>
            </a-col>
            <a-col :span="24"
              ><a-checkbox value="3"> 开放平台 </a-checkbox>
            </a-col>
            <a-col :span="24"
              ><a-checkbox value="4"> 运营平台 </a-checkbox>
            </a-col>
            <a-col :span="24" class="page-col">
              <a-checkbox value="5"> 采集与交换平台 </a-checkbox>
              <a-card v-if="flag5">
                <a-form-model
                ref="formmodel"
                  :model="formmodel1"
                  layout="inline"
                  :rules="rules1"
                >
                  <!-- <a-form-model-item style="color: rgba(0, 0, 0, 0.85)"
                    >分配存储资源</a-form-model-item
                  > -->
                  <a-form-model-item prop="name" label="分配存储资源">
                    <a-input-number
                      v-model="formmodel1.name"
                      :min="1"
                      style="width: 100px"
                    />
                  </a-form-model-item>
                  <a-form-model-item prop="selectValue">
                    <a-select
                      style="width: 60px"
                      v-model="formmodel1.selectValue"
                    >
                      <a-select-option
                        v-for="item in selectList"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.value }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-form-model>
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
    id: "s0",
    name: "数据资产平台",
  },
  {
    id: "s1",
    name: "数据开发平台",
  },
  {
    id: "s2",
    name: "开放平台",
  },
  {
    id: "s3",
    name: "运营平台",
  },
  {
    id: "s4",
    name: "采集与交换平台",
  },
];
const selectList = [{ value: "M" }, { value: "G" }, { value: "T" }];
export default {
  data() {
    return {
      treeData,
      selectList,
      checkList,
      horizontal: "horizontal",
      flag2: false,
      flag5: false,
      formmodel: {
        name: "",
        selectValue: "",
      },
      rules: {
        name: [{ required: true, message: "请输入存储值" }],
        selectValue: [{ required: true, message: "请选择存储单位" }],
        name1: [{ required: true, message: "请输入存储值" }],
        selectValue1: [{ required: true, message: "请选择存储单位" }],
        name2: [{ required: true, message: "请输入存储值" }],
      },
      formmodel1: {
        name: "",
        selectValue: "",
      },
      rules1: {
        name: [{ required: true, message: "请输入存储值", trigger: "blur" }],
        selectValue: [{ required: true, message: "请选择存储单位" }],
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    onGoBack() {
      this.$router.go(-1);
    },
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$refs.formmodel.validate((valid) => {
            if (valid) {
              console.log(values);
            } 
          });
        }
      });
    },
    handleChange(value) {
      if (value.includes("2")) {
        this.flag2 = true;
      } else {
        this.flag2 = false;
      }
      if (value.includes("5")) {
        this.flag5 = true;
      } else {
        this.flag5 = false;
      }
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
        padding: 0 0 0 0.32rem;//
      }
    }
  }
}
</style>


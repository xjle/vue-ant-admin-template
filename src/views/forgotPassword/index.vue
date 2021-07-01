<template>
  <div>
    <a-modal
    :visible="visible"
    :footer="null"
    :closable="false"
    :keyboard="false"
    :maskClosable="false"
    :destroyOnClose="true"
    :centered="true"
  >
    <template slot="title">
      <p
        style="text-align: center; margin: 0; font-size: 16px; font-weight: 700"
      >
        {{ title }}
      </p>
    </template>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
      :label-col="{
        sm: { span: 6 },
        md: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 6 },
      }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item label="账号">
        <a-input
          v-decorator="[
            'account',
            {
              rules: [{ required: true, message: '请输入您的账号!',whitespace:true }],
            },
          ]"
          placeholder="请输入内容"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item label="用户姓名">
        <a-input
          v-decorator="[
            'userName',
            {
              rules: [{ required: true, message: '请输入您的用户名!',whitespace:true }],
            },
          ]"
          placeholder="请输入内容"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [{ required: true, message: '请输入您的邮箱!',whitespace:true }],
            },
          ]"
          placeholder="请输入内容"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item
        style="text-align: center"
        :label-col="{
          sm: { span: 6 },
          md: { span: 6 },
          xl: { span: 6 },
          xxl: { span: 6 },
        }"
        :wrapper-col="{ span: 24 }"
      >
        <a-button type="primary" html-type="submit" class="login-form-button">
          找回
        </a-button>
        <a-button
          style="margin-left: 0.16rem"
          @click="onReset"
          class="login-form-button"
        >
          取消
        </a-button>
      </a-form-item>
    </a-form>
    
  </a-modal>
  <!-- <ReminderTip ref="reminderTipRef" textTitle="登录失败" title="温馨提示" text="账号错误"/> -->
  </div>
</template>
<script>
export default {
  components:{
    
  },
  data() {
    return {
      visible: true,
      title: "找回密码",
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
        }
      });
    },
    onReset() {
     this.$router.go(-1)
    },
  },
};
</script>
<style lang="less" scoped>
</style>

<template>
  <a-modal
    :visible="visible"
    title="修改密码"
    okText="提交"
    width="600px"
    :destroyOnClose="true"
    @ok="handlePwdOk"
    @cancel="handlePwdCancel"
  >
    <a-form
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item
        has-feedback
        label="旧密码"
      >
        <a-input
          v-decorator="[
            'oldPassword',
            {
              rules: [{ required: true,message:'请输入旧密码',whitespace:true }],
            },
          ]"
          placeholder="请输入旧密码"
          type="password"
        >
        </a-input>
      </a-form-item>
      <a-form-item
        has-feedback
        label="新密码"
      >
        <a-input
          v-decorator="[
            'newPassword1',
            {
              rules: [{ required: true,message:'请输入新密码',whitespace:true }],
            },
          ]"
          type="password"
          placeholder="请输入新密码"
        >
        </a-input>
      </a-form-item>
      <a-form-item
        has-feedback
        
        label="再次输入新密码"
      >
        <a-input
          v-decorator="[
            'newPassword2',
            {
              rules: [{ required: true,message:'请再次确认密码',whitespace:true }],
            },
          ]"
          type="password"
          placeholder="请再次确认新密码"
          
        >
        </a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      title: "修改密码",
      form: this.$form.createForm(this),
    
    };
  },
  methods: {
    handlePwdOk(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          // this.requestUpdateUserInfo(values);
        }
      });
    },
    handlePwdCancel() {
      this.visible = false;
    },
    
  },
};
</script>
<style lang="less" scoped>

</style>
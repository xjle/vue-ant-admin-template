<template>
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
            'username',
            {
              rules: [{ required: true, message: '请输入您的用户名!',whitespace:true }],
            },
          ]"
          placeholder="用户名"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item label="密码">
        <a-input-password
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '请输入您的密码!',whitespace:true }],
            },
          ]"
          type="password"
          placeholder="密码"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input-password>
      </a-form-item>
      <a-form-item label="验证码">
        <div style="display: flex; justify-content: space-between">
          <div>
            <a-input
              v-decorator="[
                'captcha',
                {
                  rules: [{ required: true, message: '请输入验证码!',whitespace:true }],
                },
              ]"
              placeholder="验证码"
              style="width: 80%"
            >
            </a-input>
          </div>
          <div>
            <img
              :src="'/portal-admin-api/login/captcha?captchaId=' + captchaId"
              alt="请重新点击验证码"
              @click="getCaptchaId"
              style="cursor: pointer"
            />
          </div>
        </div>
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
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
          icon="login"
        >
          登录
        </a-button>
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
        <router-link to="/forgotPassword">忘记密码</router-link>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { login } from "@/api/login";
export default {
  data() {
    return {
      visible: true,
      title: "数据中台",
      captchaId: "",
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    this.$msg.destroy();
    this.$store.commit("SET_USERINFO", {});
    this.getCaptchaId();
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.password = this.$rsaUtil(values.password);
          values.captchaId = this.captchaId;
          this.loginFunc(values);
        }
      });
    },
    async loginFunc(values) {
      const { data } = await login(values);
      try {
        if (data.code === "0") {
          this.$msg.destroy();
          this.$msg.success("登录成功！");
          this.$store.commit("SET_ISLOGIN", true);
          this.$router.push("/");
        } else {
          this.$msg.destroy();
          this.$store.commit("SET_ISLOGIN", false);
          this.$msg.error(data.msg);
          this.getCaptchaId();
          this.form.resetFields("captcha");
        }
      } catch {
        this.$msg.destroy();
        this.$msg.error("网络错误");
      }
    },
    getCaptchaId() {
      //生成随机32位数发给后端,根据32位数获取验证码图片
      let $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      let maxPos = $chars.length;
      let pwd = "";
      for (let i = 0; i < 32; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      this.captchaId = pwd;
    },
  },
};
</script>
<style lang="less" scoped>
.login-form-button {
  width: 70%;
}
</style>

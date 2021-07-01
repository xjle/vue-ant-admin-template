<template>
  <div>
    <a-dropdown class="app-info">
      <template #overlay>
        <a-menu>
          <a-menu-item key="1" @click="onChagnePassword">修改密码</a-menu-item>
          <a-menu-item key="2" @click="onLogout">登出</a-menu-item>
        </a-menu>
      </template>
      <a-button style="margin-right: 0.32rem">
        <a-icon type="user"></a-icon>
        yjl
        <a-icon type="down" />
      </a-button>
    </a-dropdown>
    <ChagePassword ref="chagePasswordRef"/>
  </div>
</template>
<script>
import { logout } from "@/api/login";
import ChagePassword from '@/components/ChagePassword'
export default {
  data() {
    return {};
  },
  components:{ChagePassword},
  methods: {
    onLogout() {
      const _this = this;
      const obj = {
        title: "退出登录",
        content: "您确定要退出登录吗?",
        onOk() {
          localStorage.removeItem("isLogin");
          logout().then((res) => {
            _this.$msg.destroy();
            _this.$msg.success("登出成功");
            _this.$router.push("/login");
            _this.$store.commit("SET_ISLOGIN", false);
            _this.$store.commit("SET_USERINFO", {});
          });
        },
        onCancel() {},
      };
      this.$showConfirm(obj);
    },
    onChagnePassword(){
      this.$refs.chagePasswordRef.visible = true
    }
  },
};
</script>
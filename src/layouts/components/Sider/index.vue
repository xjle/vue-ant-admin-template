<template>
  <a-menu
    theme="dark"
    mode="inline"
    @click="menuClick"
    :default-selected-keys="[this.$route.path.split('/')[1]]"
  >
    <a-menu-item v-for="item in menuList" :key="item.name">
      <!-- <a-icon type="user" /> -->
      <router-link :to="item.path"
        >{{ item.title }}</router-link
      >
    </a-menu-item>
  </a-menu>
</template>
<script >
const menuList = [
  {
    title: "多租户管理",
    id: "tenant_manage",
    path: "/tenantManage",
    name: "tenantManage",
    menuCode: "tenant_manage",
  },
  {
    title: "用户管理",
    id: "user_manager",
    path: "/userManage",
    name: "userManage",
    menuCode: "user_manage",
  },
];

export default {
  methods: {
    menuClick(e) {
      // this.defaultSelectedKeys = e.keyPath;
      // this.$store.commit(
      //   "RESET_DEFAULT_SELECTEDKEYS",
      //   this.defaultSelectedKeys
      // );
    },
  },
  data() {
    return {
      menuList,
    };
  },
};
</script>

<style lang="less" scoped>
</style>
<template>
  <div>
    <a-menu
      :default-selected-keys="[this.$route.path.split('/')[1]]"
      mode="inline"
      theme="dark"
    >
      <template v-for="item in menuList">
        <a-sub-menu
          v-if="item.children && item.children.length > 0"
          :key="item.id"
        >
          <span slot="title">
            <a-icon type="appstore" />
            <span>{{ item.title }}</span>
          </span>
          <a-menu-item v-for="subItem in item.children" :key="subItem.id">
            <router-link :to="subItem.path">
              <a-icon type="appstore" />
              <span>{{ subItem.title }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="item.id">
          <router-link :to="item.path">
            <a-icon type="appstore" />
            <span> {{ item.title }}</span>
          </router-link>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
const menuList = [
  {
    title: "多租户管理",
    id: "tenant_manage",
    path: "/tenantManage",
    name: "tenantManage",
    menuCode: "tenant_manage",
    children: [
      // {
      //   title: "多租户管理d",
      //   id: "tenant_manage2",
      //   path: "/tenantManage",
      //   name: "tenantManage",
      //   menuCode: "tenant_manage",
      // },
      // {
      //   title: "多租户管理f",
      //   id: "tenant_manage3",
      //   path: "/tenantManage",
      //   name: "tenantManage",
      //   menuCode: "tenant_manage",
      // },
    ],
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
  data() {
    return {
      menuList,
    };
  },
  mounted(){
    console.log(this.$route.path,'yjl');
  },
  methods: {},
};
</script>
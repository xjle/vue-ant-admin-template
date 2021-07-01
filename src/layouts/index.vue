<template>
  <a-layout class="app-wapper">
    <!-- 侧边栏 -->
    <a-layout-sider
      class="app-sider"
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo">中台管理</div>
      <Sider />
    </a-layout-sider>
    <a-layout>
      <!-- 导航条 -->
      <a-layout-header class="app-header">
        <a-row type="flex" justify="space-between">
          <a-col>
            <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
            />
          </a-col>
          <a-col>
            <Header class="header" />
          </a-col>
        </a-row>
      </a-layout-header>
      <!-- 内容 -->
      <a-layout-content
        :style="{
          padding: '0.16rem',
        }"
      >
        <a-breadcrumb class="app-breadcrumb" :routes="routes">
          <template
            slot="itemRender"
            slot-scope="{ route, params, routes, paths }"
          >
            <span v-if="routes.length === 1">
              {{ route.meta.title }}
            </span>
            <router-link v-else :to="`${route.path}`">
              {{ route.meta.title }}
            </router-link>
          </template>
        </a-breadcrumb>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Header from "./components/Header/index.vue";
import Sider from "./components/Sider/index.vue";
export default {
  components: {
    Header,
    Sider,
  },
   created() {
    this.routes = this.$route.matched.filter((item) => item.meta.title);
  },
  data() {
    return {
      collapsed: false,
      routes:[]
    };
  },
   watch: {
    // 监听路由变化
    $route(e) {
      this.routes = e.matched.filter((items) => items.meta.title);
    },
  },
};
</script>

<style lang="less" scoped>
.app-wapper {
  .app-sider {
    .logo {
      line-height: 46px;
      text-align: center;
      color: #fff;
      height: 46px;
      background: rgba(255, 255, 255, 0.3);
    }
    left: 0;
    height: 100vh;
    overflow: auto;
  }
  .app-header {
    padding: 0;
    background: #fff;
    .header {
      padding: 0 0.32rem;
    }
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transform: color 0.3s;
    }
  }
  .app-breadcrumb {
    height: 32px;
    line-height: 32px;
    margin-bottom: 0.16rem;
  }
}
</style>

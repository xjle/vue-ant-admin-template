<template>
  <a-result
    status="404"
    title="404"
    sub-title="该页面不存在!"
  >
    <template #extra>
      <a-button type="primary">
          <router-link to="/home">返回首页</router-link>
      </a-button>
    </template>
  </a-result>
</template>
<template>
  <a-modal
    :visible="visible"
    :closable="false"
    :keyboard="false"
    :maskClosable="false"
    :destroyOnClose="true"
    :centered="true"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <template slot="title">
      <p
        style="text-align: center; margin: 0; font-size: 16px; font-weight: 700"
      >
        {{ title }}
      </p>
    </template>
   <p style="text-align: center;">{{textTitle}}：{{text}}</p>
  </a-modal>
</template>
<script>
export default {
  props:['title','text','textTitle'],
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    handleCancel(){
      this.visible = false
      // this.text = ''
      // this.title = ''
    },
    handleOk(){
      this.handleCancel()
    }
  },
};
</script>
<style lang="less" scoped>
</style>

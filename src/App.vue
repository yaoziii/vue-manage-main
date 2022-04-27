<template>
  <ElConfigProvider :locale="locale">
    <div class="common-layout">
      <router-view />
    </div>
  </ElConfigProvider>
</template>
<script>
import { ElConfigProvider } from "element-plus";
import zhTw from "element-plus/es/locale/lang/zh-tw";
export default {
  name: "app",
  components: {
    ElConfigProvider,
  },
  data() {
    return {
      locale: zhTw,
    };
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

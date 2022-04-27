<template>
  <div class="app-wrapper">
    <div class="drawer-bg">
      <div class="main-container">
        <div>
          <Navbar />
        </div>
        <AppMain />
      </div>
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar } from "./components";
export default {
  name: "main-layout",
  components: {
    AppMain,
    Navbar,
  },
};
</script>

<style></style>

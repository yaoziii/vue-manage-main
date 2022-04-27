<template>
  <el-tabs type="border-card" v-model="currentTabs" class="tabs">
    <el-tab-pane
      class="tab"
      :label="tab.label"
      :name="tab.name"
      v-for="tab in tabs"
      :key="tab.label"
    >
      <GenerallyData1
        v-if="tab.name === 'GenerallyData1'"
        v-bind="$attrs"
        @handleSubmitData1="handleSubmitData1Form"
        @getSpecifyCustomerModel="getSpecifyCustomerModel"
        @getContactModel="getContactModel"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import GenerallyData1 from "@/components/GenerallyData1.vue";
export default {
  name: "common-tabs",
  components: { GenerallyData1 },
  data() {
    return {
      tabs: [
        { label: "一般資料1", name: "GenerallyData1" },
        { label: "一般資料2", name: "TopForm" },
        { label: "一般資料3", name: "TopForm" },
        { label: "機密資料4", name: "TopForm" },
        { label: "已排工令5", name: "TopForm" },
        { label: "訂單排程", name: "TopForm" },
      ],
      currentTabs: "GenerallyData1",
    };
  },
  methods: {
    // 帶入 tabs name 參數,切換tab
    tabClick(item) {
      this.currentTabs = item;
    },
    handleSubmitData1Form(val) {
      this.$emit("handleSubmitData1", val);
    },
    getSpecifyCustomerModel(val) {
      this.$emit("SpecifyCustomerModel", val);
    },
    getContactModel(val) {
      this.$emit("contactModel", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  ::v-deep .el-tabs__content {
    padding: 30px 15px;
  }
}
</style>

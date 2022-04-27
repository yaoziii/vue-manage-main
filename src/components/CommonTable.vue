<template>
  <div class="common-table">
    <el-table
      :data="$attrs.tableData"
      border
      stripe
      @row-click="handlePassRowData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序"
        align="center"
        :index="indexMethod"
      ></el-table-column>
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        align="center"
        :min-width="item.width ? item.width : 125"
      >
        <template #default="scope">
          {{ scope.row[item.prop] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CommonTable",
  props: {
    tableLabel: Array,
  },
  data() {
    return {};
  },
  methods: {
    // 傳遞 table 資料回父層頁面
    handlePassRowData(row) {
      this.$emit("passTableData", row);
    },
    // 列表序號自增 1
    indexMethod(index) {
      return index + 1;
    },
  },
};
</script>

<style>
</style>
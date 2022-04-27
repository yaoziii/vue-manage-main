<template>
  <el-dialog v-model="dialogTopFormTable" title="請選擇客戶">
    <CommonTable
      :tableLabel="topFormTableLabel"
      :tableData="tableData"
      @passTableData="passTableData"
    />
  </el-dialog>
  <el-dialog v-model="dialogTableCs" title="請選擇指送客戶">
    <CommonTable
      :tableLabel="tableLabel"
      :tableData="$attrs.csData"
      @passTableData="getCsData"
    />
  </el-dialog>
  <el-dialog v-model="dialogTableCn" title="請選擇聯絡人">
    <CommonTable
      :tableLabel="tableLabel"
      :tableData="$attrs.cnData"
      @passTableData="getCnData"
    />
  </el-dialog>
  <el-form
    :model="generallyDataForm"
    ref="generallyDataFormRef"
    :rules="rules"
    label-width="100px"
  >
    <el-row :gutter="20">
      <el-col :lg="18" :md="24">
        <el-row :gutter="20">
          <el-col :lg="14" :md="24">
            <el-row :gutter="20">
              <el-col :lg="12" :md="24" :sm="24">
                <el-form-item label="指送客戶">
                  <el-input v-model="generallyDataForm.referCustomers">
                    <template #append>
                      <el-button @click="handleCsCustomers">
                        <el-icon><more-filled /></el-icon>
                      </el-button>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="12" :md="24">
                <el-form-item label="訂單種類">
                  <el-select
                    v-model="generallyDataForm.typeOptionsValue"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in generallyDataForm.typeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="24" :md="24">
                <el-form-item label="指送住址">
                  <el-input v-model="generallyDataForm.referAddrs">
                    <template #append>
                      <el-button @click="dialogTableVisible = true">
                        <el-icon><more-filled /></el-icon>
                      </el-button>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :lg="12" :md="24">
                <el-form-item label="客戶單號">
                  <el-input v-model="generallyDataForm.customerOrderNumber" />
                </el-form-item>
              </el-col>
              <el-col :lg="12" :md="24">
                <el-form-item label="預定交期" prop="targetDate">
                  <el-date-picker
                    v-model="generallyDataForm.targetDate"
                    type="date"
                    placeholder="選擇日期"
                    style="width: 100%"
                    format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :lg="12" :md="24">
                <el-form-item label="聯絡人員">
                  <el-input v-model="generallyDataForm.contactPerson">
                    <template #append>
                      <el-button @click="handleCnCustomers">
                        <el-icon><more-filled /></el-icon>
                      </el-button>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="12" :md="24">
                <el-form-item label="組合圖號">
                  <el-input v-model="generallyDataForm.combinationDrawing">
                    <template #append>
                      <el-button @click="dialogTableVisible = true">
                        <el-icon><more-filled /></el-icon>
                      </el-button>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :lg="12" :md="24">
                <el-form-item label="業務人員">
                  <el-select
                    v-model="generallyDataForm.salesMan"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in generallyDataForm.salesMan"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :lg="12" :md="24">
                <el-form-item label="投單交期">
                  <el-input v-model="generallyDataForm.deliveryTime">
                    <template #append>
                      <el-button @click="dialogTableVisible = true">
                        <el-icon><more-filled /></el-icon>
                      </el-button>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="訂單備註">
                  <el-input
                    type="textarea"
                    v-model="generallyDataForm.remark_q"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :lg="10" :md="24">
            <el-form-item label="形式規格">
              <el-input v-model="generallyDataForm.formSpecification" />
            </el-form-item>

            <el-form-item label="出貨方式">
              <el-input v-model="generallyDataForm.shippingMethod">
                <template #append>
                  <el-button @click="dialogTableVisible = true">
                    <el-icon><more-filled /></el-icon>
                  </el-button>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="製單人員">
              <el-input v-model="generallyDataForm.prepared" disabled />
            </el-form-item>
            <el-form-item label="製造工號">
              <el-input v-model="generallyDataForm.manufacturingNumber" />
            </el-form-item>
            <el-form-item label="主排月份">
              <el-input />
            </el-form-item>
            <el-form-item label="總重小位數">
              <el-input-number style="width: 100%" />
            </el-form-item>
            <el-form-item label="產品總重">
              <el-input disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
      <el-col :lg="6" :md="24">
        <el-row justify="center">
          <div class="image-preview">
            <div class="demonstration mb-2">圖檔</div>
            <!-- url 加上 Math.random 亂數函式 ,避免緩存導致不更新-->
            <el-image
              style="width: 300px; height: 300px"
              :src="$attrs.url ? updateUrl() : ''"
              :preview-src-list="[`${baseUrl}/${$attrs.url}?${Math.random()}`]"
              :initial-index="4"
              fit="cover"
            />
          </div>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import CommonTable from "@/components/CommonTable.vue";
import { MoreFilled } from "@element-plus/icons-vue";

export default {
  components: {
    MoreFilled,
    CommonTable,
  },
  // 禁止 Attribute 繼承
  inheritAttrs: false,
  props: {
    csTableData: Array,
  },
  data() {
    return {
      generallyDataForm: {
        referCustomers: "",
        typeOptionsValue: "O:訂單",
        typeOptions: [
          {
            value: "O:訂單",
            label: "O:訂單",
          },
          {
            value: "M:試作單",
            label: "M:試作單",
          },
          {
            value: "R:補料",
            label: "R:補料",
          },
        ],
        contactPerson: "",
        referAddrs: "",
        shippingMethod: "",
        customerOrderNumber: "",
        targetDate: "",
        prepared: "",
        formSpecification: "",
        combinationDrawing: "",
        manufacturingNumber: "",
        salesMan: "",
        deliveryTime: "",
        remark_q: "",
        remark_d: "",
      },
      dialogTableCs: false,
      dialogTableCn: false,
      dialogTopFormTable: false,

      tableLabel: [
        {
          prop: "name",
          label: "名稱",
          width: 200,
        },
        {
          prop: "address",
          label: "住址",
          width: 400,
        },
        {
          prop: "phone",
          label: "電話",
          width: 200,
        },
      ],
      baseUrl: process.env.VUE_APP_BASE_API,
      rules: {
        targetDate: [
          { required: true, message: "請選擇日期", trigger: "blur" },
        ],
      },
    };
  },
  // 監聽表單值的變化,向父層傳遞
  watch: {
    generallyDataForm: {
      handler(val) {
        this.$emit("handleSubmitData1", val);
      },
      deep: true,
    },
    "$attrs.cadMetaModel": {
      handler() {
        this.updateUrl();
      },
      deep: true,
    },
  },
  methods: {
    // 打開客戶資料彈窗
    handleCsCustomers() {
      // 如果 csTableData 沒有值,發送 handleTable 事件回父層
      if (!this.csTableData.length) {
        this.$emit("handleTable");
      } else {
        this.dialogTableCs = true;
      }
    },
    // 打開聯絡人資料彈窗
    handleCnCustomers() {
      this.dialogTableCn = true;
    },
    // 取得客戶名稱與地址
    getCsData(val) {
      this.generallyDataForm.referCustomers = val.name;
      this.generallyDataForm.referAddrs = val.address;
      this.$emit("getSpecifyCustomerModel", val);
      this.dialogTableCs = false;
    },
    // 取得聯絡人
    getCnData(val) {
      this.generallyDataForm.contactPerson = val.name;
      this.$emit("getContactModel", val);
      this.dialogTableCn = false;
    },
    // 更新點擊的圖片 URL
    updateUrl() {
      return `${this.baseUrl}/${this.$attrs.url}?${Math.random()}`;
    },
  },
};
</script>

<style scoped>
.mr-1 {
  margin-right: 8px;
}
.mb-2 {
  margin-bottom: 16px;
}

.el-form-item.el-form-item__label {
  color: red;
  display: flex;
  justify-content: space-between;
}
</style>

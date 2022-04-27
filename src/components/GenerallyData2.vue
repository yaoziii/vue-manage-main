<template>
  <el-dialog v-model="dialogDatePick" title="請選擇日期">
    <el-calendar v-model="value" />
  </el-dialog>
  <el-dialog v-model="dialogTableVisible" title="請選擇客戶">
    <el-table :data="gridData">
      <el-table-column property="date" label="Date" width="150" />
      <el-table-column property="name" label="Name" width="200" />
      <el-table-column property="address" label="Address" />
    </el-table>
  </el-dialog>
  <el-form :model="generallyDataForm">
    <el-row :gutter="20">
      <el-col :lg="12" :md="24">
        <el-row justify="space-between">
          <el-form-item label="指送客戶">
            <el-input v-model="generallyDataForm.referCustomers">
              <template #append>
                <el-button @click="dialogTableVisible = true">
                  <el-icon><more-filled /></el-icon>
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="種類">
            <el-select v-model="generallyDataForm.typeOptionsValue">
              <el-option
                v-for="item in generallyDataForm.typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="聯絡人">
            <el-input v-model="generallyDataForm.contactPerson">
              <template #append>
                <el-button @click="dialogTableVisible = true">
                  <el-icon><more-filled /></el-icon>
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :lg="16" :md="18">
            <el-form-item label="指送住址" class="mr-1">
              <el-input v-model="generallyDataForm.referAddrs">
                <template #append>
                  <el-button @click="dialogTableVisible = true">
                    <el-icon><more-filled /></el-icon>
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="18">
            <el-form-item label="出貨方式">
              <el-input v-model="generallyDataForm.shippingMethod">
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
          <el-form-item label="客戶單號c" class="mr-1">
            <el-input v-model="generallyDataForm.customerOrderNumber" />
          </el-form-item>
          <el-form-item label="預定交期d" class="mr-1" required>
            <el-input v-model="generallyDataForm.scheduledDelivery">
              <template #append>
                <el-button @click="dialogTableVisible = true">
                  <el-icon><more-filled /></el-icon>
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="製單人" class="mr-1">
            <el-input v-model="generallyDataForm.prepared" disabled />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="形式規格" class="mr-1">
            <el-input v-model="generallyDataForm.formSpecification" />
          </el-form-item>
          <el-form-item label="組合圖號" class="mr-1">
            <el-input v-model="generallyDataForm.combinationDrawing">
              <template #append>
                <el-button @click="dialogTableVisible = true">
                  <el-icon><more-filled /></el-icon>
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="製造工號">
            <el-input v-model="generallyDataForm.manufacturingNumber" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="業務員" class="mr-1">
            <el-select v-model="value" placeholder="Select">
              <el-option
                v-for="item in salesMan"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="投單交期f" class="mr-1">
            <el-input v-model="generallyDataForm.deliveryTime">
              <template #append>
                <el-button @click="dialogTableVisible = true">
                  <el-icon><more-filled /></el-icon>
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="備註(q)">
              <el-input type="textarea" v-model="generallyDataForm.remark_d" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="備註(d)">
              <el-input type="textarea" v-model="generallyDataForm.remark_d" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
      <el-col :lg="6" :md="12">
      </el-col>
      <el-col :lg="6" :md="12">
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { MoreFilled } from "@element-plus/icons-vue";

export default {
  components: {
    MoreFilled,
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
        scheduledDelivery: "",
        prepared: "",
        formSpecification: "",
        combinationDrawing: "",
        manufacturingNumber: "",
        salesMan: [],
        deliveryTime: "",
        remark_q: "",
        remark_d: "",
        images:'',
      },
      dialogDatePick: false,
      dialogTableVisible: false,
    };
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
</style>
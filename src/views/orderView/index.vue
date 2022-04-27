<template>
  <div class="main-order">
    <!-- 客戶 table 彈窗 -->
    <el-dialog
      v-model="dialogTopFormTable"
      title="請選擇客戶"
      :width="dialogWidth"
    >
      <CommonTable
        :tableLabel="topFormTableLabel"
        :tableData="tableData"
        @passTableData="passTableData"
      />
    </el-dialog>
    <!--  產品 table 彈窗 -->
    <el-dialog
      v-model="dialogProductsTable"
      :width="dialogWidth"
      title="請選擇產品"
    >
      <CommonTable
        :tableLabel="productsTableLabel"
        :tableData="productsList"
        @passTableData="passProductData"
      />
      <Pagination
        v-show="total > 0"
        :total="total"
        v-model:page="listQuery.page"
        v-model:limit="listQuery.limit"
        @pagination="getPagedProducts"
      />
    </el-dialog>
    <!-- 圖片計價彈窗 -->
    <el-dialog v-model="dialogCalcForm" :width="dialogWidth">
      <CalcForm
        :cadMetaModel="cadMetaModel"
        :prodId="tempData.prodId"
        :productsData="productsData.list"
        @updateTotal="handleUpdateTotal"
        @closeDialog="handleCloseCalcForm"
      />
    </el-dialog>
    <div>
      <!-- top form 表單 -->
      <el-card class="top-form-card">
        <el-form
          :model="topFormData"
          ref="topFormRef"
          :rules="rules"
          class="demo-ruleForm"
          label-width="auto"
        >
          <el-row :gutter="20">
            <el-col :lg="8" :sm="24">
              <el-form-item label="訂單號碼">
                <el-input v-model="topFormData.orderId" />
              </el-form-item>
            </el-col>
            <el-col :lg="8" :sm="24">
              <el-form-item label="訂單日期" prop="orderDate">
                <el-date-picker
                  v-model="topFormData.orderDate"
                  type="date"
                  placeholder="選擇日期"
                  style="width: 100%"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :sm="24">
              <el-form-item label="訂單狀態">
                <el-input v-model="topFormData.orderCategory" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :lg="8" :sm="24">
              <el-form-item label="客戶編號" prop="clientNumber">
                <el-input v-model="topFormData.clientNumber">
                  <template #append>
                    <el-button @click="handleTopFormTable">
                      <el-icon><more-filled /></el-icon>
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :sm="24">
              <el-input v-model="topFormData.clientName" disabled />
            </el-col>
            <el-col :lg="8" :sm="24">
              <el-form-item>
                <el-checkbox-group v-model="topFormData.checkList">
                  <el-checkbox label="取消訂單" name="checkList" />
                  <el-checkbox label="整單結案" name="checkList" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>

    <!-- tbas 元件 -->
    <el-card>
      <CommonTabs
        :csData="csData"
        :cnData="cnData"
        :csTableData="csTableData"
        :url="tempData.url"
        :cadMetaModel="cadMetaModel"
        @handleTable="handleTableChange"
        @handleSubmitData1="handleSubmitData1"
        @SpecifyCustomerModel="handleSpecifyCustomerModel"
        @contactModel="handleContactModel"
      />
    </el-card>

    <!-- 新增 Table 列表 -->
    <el-button class="d-flex" style="margin: 10px 0" @click="handleMainTable"
      >新增</el-button
    >

    <!-- 產品列表 -->
    <el-card>
      <div class="order-table">
        <el-table
          :data="productsData.list"
          @row-click="handleRowClick"
          stripe
          border
          align="center"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            type="index"
            :index="indexMethod"
            label="序"
            min-width="80"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="prodId"
            label="產品編號"
            min-width="100"
          >
            <template #default="scope">
              {{ scope.row.prodId }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="prodName"
            label="品名"
            min-width="150"
          >
            <template #default="scope">
              {{ scope.row.prodName }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="prodName"
            label="預定交期"
            min-width="200"
          >
            <template #default="scope">
              <el-date-picker
                v-model="scope.row.prodTargetDate"
                type="date"
                placeholder="選擇日期"
                style="width: 100%"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column
            prop="prodSpec"
            label="規格"
            min-width="150"
            align="center"
          >
            <template #default="scope">
              {{ scope.row.prodSpec }}
            </template>
          </el-table-column>
          <el-table-column
            prop="prodCost"
            label="產品價格"
            min-width="150"
            align="center"
          />
          <el-table-column
            prop="prodQty"
            label="產品數量"
            min-width="150"
            align="center"
          >
            <template #default="scope">
              <el-input-number
                v-model="scope.row.prodQty"
                @change="handleQtyChange"
                placeholder="請輸入產品數量"
                :min="1"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            prop="subTotal"
            label="小計"
            min-width="150"
            align="center"
          >
            <template #default="scope">
              {{ scope.row.subTotal }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            prop="upload"
            min-width="300"
            align="center"
          >
            <template #default="scope">
              <div class="operate-row">
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  :action="imgUrl"
                  :auto-upload="false"
                  :data="{
                    savePath: this.savePath.url,
                    prodId: scope.row.prodId,
                    isReset: this.isReset,
                  }"
                  multiple
                  :limit="2"
                  :on-progress="uploadImageProcess"
                  :on-success="handleImageSuccess"
                  :on-change="checkUploadImage"
                >
                  <el-button type="primary">上傳</el-button>
                  <template #tip>
                    <div class="el-upload__tip">請上傳 Dwg / Dxf 格式圖片</div>
                  </template>
                </el-upload>
                <el-button
                  type="info"
                  @click="handleDialogCalcForm(scope.row.prodId)"
                  >計價</el-button
                >
                <el-button
                  type="danger"
                  @click="handleRemoveItem(scope.$index, scope.row)"
                  >刪除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="productsData.list.length > 0" class="total">
          合計: {{ totalPrice }}
        </div>
      </div>
    </el-card>
    <el-button type="success" @click="handleSubmit" style="margin: 10px 0"
      >送出</el-button
    >
  </div>
</template>

<script>
// @ is an alias to /src
import CommonTabs from "@/components/CommonTabs.vue";
import CommonTable from "@/components/CommonTable.vue";
import Pagination from "@/components/Pagination.vue";
import CalcForm from "@/components/CalcForm.vue";
import { MoreFilled } from "@element-plus/icons-vue";
import {
  getCustomers,
  getPagedProducts,
  postCalcLineItem,
  saveData,
  getCadInfo,
} from "@/api/placeOrder";
import { ElMessage, ElMessageBox } from "element-plus";
import { vueWindowSizeMixin } from "vue-window-size/option-api";
export default {
  name: "MainView",
  components: {
    CommonTabs,
    CommonTable,
    Pagination,
    MoreFilled,
    CalcForm,
  },
  // 引用 window-size 套件
  mixins: [vueWindowSizeMixin()],
  data() {
    return {
      dialogWidth: "",
      topFormTableLabel: [
        {
          prop: "id",
          label: "客戶編號",
          width: 80,
        },
        {
          prop: "customerName",
          label: "客戶名稱",
          width: 200,
        },
        {
          prop: "contactPerson",
          label: "聯絡人",
          width: 200,
        },
        {
          prop: "tel",
          label: "電話",
          width: 200,
        },
        {
          prop: "customerShortName",
          label: "客戶簡稱",
          width: 200,
        },
        {
          prop: "quickSearch",
          label: "快速搜尋",
          width: 200,
        },
      ],
      topFormData: {
        orderId: "",
        orderDate: "",
        orderCategory: "",
        checkList: [],
        clientNumber: "",
        clientName: "",
        customer: {
          id: "",
          customerName: "",
          address: "",
        },
      },
      rules: {
        orderDate: [{ required: true, message: "請選擇日期", trigger: "blur" }],
        clientNumber: [
          { required: true, message: "請選擇客戶", trigger: "blur" },
        ],
      },

      csTableData: [],
      cnTableData: [],
      csData: null,
      cnData: null,

      dialogTopFormTable: false,
      dialogProductsTable: false,
      dialogCalcForm: false,

      tableLabel: [
        {
          prop: "id",
          label: "序",
          width: 80,
        },
        {
          prop: "originalLine",
          label: "原始項次",
          width: 200,
        },
        {
          prop: "customerDrawing",
          label: "客戶圖號",
          width: 200,
        },
        {
          prop: "productNumber",
          label: "產品編號",
          width: 200,
        },
        {
          prop: "scheduledDelivery",
          label: "預定交期",
          width: 200,
        },
        {
          prop: "quantityOrder",
          label: "訂單數量",
          width: 200,
        },
        {
          prop: "prodName",
          label: "品名",
          width: 320,
        },
        {
          prop: "specification",
          label: "規格",
          width: 240,
        },
      ],
      productsTableLabel: [
        {
          prop: "prodId",
          label: "產品編號",
          width: 100,
        },
        {
          prop: "prodName",
          label: "品名",
          width: 300,
        },
        {
          prop: "prodSpec",
          label: "規格",
          width: 200,
        },
        {
          prop: "prodCost",
          label: "產品價格",
          width: 200,
        },
      ],
      tableData: [],
      specifyCustomerModel: {},
      contactModel: {},

      totalPrice: 0,
      productsData: {
        list: [],
      },
      productsList: [],
      generallyDataForm: {},

      // Pagination 數據
      total: 0,
      listQuery: {
        page: 1,
        limit: 3,
      },
      // 上傳圖片儲存位置
      savePath: {
        url: "c:\\image",
      },
      // 上傳圖片到後端的 API
      imgUrl: `${process.env.VUE_APP_BASE_API}/order/place-order/upload-file`,
      plus: true,
      imageFlag: false,
      imageUploadPercent: 0,

      // 圖片計價資料
      cadMetaModel: {},

      // 暫存資料
      tempData: {
        url: "",
        index: "",
        prodId: "",
      },
      isReset: false,
    };
  },
  watch: {
    // 監聽點擊的客戶名稱,傳遞對應的值給 tableData
    "topFormData.clientName": function () {
      this.csData = this.csTableData;
      this.cnData = this.cnTableData;
    },
    // 監聽 windows 視窗寬度改變, 並改變彈窗寬度
    $windowWidth: {
      handler(val) {
        if (val <= 500) this.dialogWidth = "100%";
        else if (val > 500 && val < 768) this.dialogWidth = "85%";
        else this.dialogWidth = "70%";
      },
      immediate: true,
    },
  },
  created() {
    // 初始化渲染資料
    this.getCustomers();
  },
  methods: {
    // 取得 customers 資料
    async getCustomers() {
      try {
        const res = await getCustomers();
        const data = await res.data;
        this.tableData = data;
      } catch (error) {
        console.log(error);
      }
    },
    // 取得 PagedProducts 資料
    async getPagedProducts() {
      try {
        const res = await getPagedProducts(this.listQuery);
        const data = await res.data;
        this.productsList = data.data;
        this.total = data.total;
      } catch (error) {
        console.log(error);
      }
    },
    // 發送產品列表數據給後端計算
    async postCalcLineItem() {
      try {
        const res = await postCalcLineItem(this.productsData.list);
        const data = await res.data;
        this.productsData.list = data.lineItemInOrders;
        this.totalPrice = Number(data.total).toFixed();
      } catch (error) {
        console.log(error);
      }
    },

    // 提交表單事件
    handleSubmit() {
      const { orderId, orderDate, orderCategory } = this.topFormData;
      const { name: contactModelName } = this.contactModel;
      const {
        name: specifyCustomerModelName,
        address,
        phone,
      } = this.specifyCustomerModel;
      const {
        contactPerson,
        shippingMethod,
        customerOrderNumber,
        scheduledDelivery,
        deliveryTime,
        remark_q,
      } = this.generallyDataForm;
      const save = {
        orderId: orderId,
        orderDate: orderDate,
        orderCategory: orderCategory,
        customer: {
          id: this.topFormData.clientNumber,
        },
        contactModel: {
          name: contactModelName,
        },
        specifyCustomerModel: {
          name: specifyCustomerModelName,
          address: address,
          phone: phone,
        },
        shippingType: shippingMethod,
        customerOrderNo: customerOrderNumber,
        targetDate: deliveryTime,
        makerOrderPerson: contactPerson,
        startDate: scheduledDelivery,
        mem: remark_q,
        orderDetailModel: {
          lineItemInOrders: this.productsData.list,
          total: this.totalPrice,
        },
      };
      this.$refs.topFormRef.validate((valid) => {
        if (valid) {
          saveData(save)
            .then((res) => {
              console.log(res.data);
              this.$message.success("表單已提交");
            })
            .catch((err) => console.log(err));
        } else {
          this.$message.warning("請填寫必填欄位");
        }
      });
    },
    // 取得圖片計價資訊
    async getCadInfo(prodId) {
      const res = await getCadInfo({ prodId: prodId });
      const data = await res.data;
      this.cadMetaModel = data;
    },
    // 將 table 選取的資料渲染到頁面
    passTableData(val) {
      // 傳遞客戶名稱資料
      this.topFormData.clientName = val.customerName;
      // 傳遞客戶編號資料
      this.topFormData.clientNumber = val.id;
      // 傳遞指送客戶資料
      this.csTableData = val.specifyCustomerModels;
      // 傳遞聯絡人資料
      this.cnTableData = val.contactModels;
      // 關閉彈窗
      this.dialogTopFormTable = false;
    },
    // 將點擊的列表項目加到 ordertable 上
    passProductData(val) {
      this.productsData.list.push(val);
      this.cadMetaModel = val.cadMetaModel;
      this.dialogProductsTable = false;
    },
    // GenerallyData 1 回傳的事件
    handleTableChange() {
      this.handleTopFormTable();
    },
    // 開啟客戶 table 彈窗
    handleTopFormTable() {
      this.dialogTopFormTable = true;
    },
    // 開啟產品列表彈窗,執行 getPagedProducts 請求
    handleMainTable() {
      this.dialogProductsTable = true;
      this.getPagedProducts();
    },
    // 列表序號自增 1
    indexMethod(index) {
      return index + 1;
    },
    // 產品數量更改,執行 postCalcLineItem 請求
    handleQtyChange() {
      this.postCalcLineItem();
    },

    // 上傳圖片前確認是否重新取圖計價
    checkUploadImage(val, fileList) {
      // 重新上傳, 刪除已上傳的圖片
      if (fileList.length > 1) fileList.splice(0, 1);
      if (val.status === "ready") {
        ElMessageBox.confirm("是否重新取圖計價?", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "info",
        })
          .then(() => {
            this.isReset = true;
            this.$refs.upload.submit();
          })
          .catch(() => {
            this.isReset = false;
            this.$refs.upload.submit();
          });
      }
    },
    // 圖片上傳中觸發事件
    uploadImageProcess(file) {
      this.plus = false;
      this.imageFlag = true;
      this.imageUploadPercent = file.percentage.toFixed(0);
    },
    // 圖片上傳完成觸發事件
    handleImageSuccess(res, file) {
      this.plus = false;
      this.imageUploadPercent = 100;
      if (file.status === "success") {
        this.cadMetaModel = res;
        if (this.isReset === true)
          this.productsData.list[this.tempData.index].prodCost = 0;
        this.$message.success("圖片上傳成功!");
      } else {
        this.$message.error("圖片上傳失敗, 請重新上傳");
      }
    },
    // 點擊 table 欄位, 傳送 url 值到 GenerallyData1
    handleRowClick(val) {
      this.tempData.index = this.productsData.list.indexOf(val);
      this.tempData.url = val.url;
      this.tempData.prodId = val.prodId;
    },
    // 接收 子層 GenerallyData1 傳遞的 generallyDataForm 數值,
    handleSubmitData1(val) {
      this.generallyDataForm = val;
    },
    // 接收 子層 GenerallyData1 傳遞的 SpecifyCustomerModel 數值,
    handleSpecifyCustomerModel(val) {
      this.specifyCustomerModel = val;
    },
    // 接收 子層 GenerallyData1 傳遞的 ContactModel 數值,
    handleContactModel(val) {
      this.contactModel = val;
    },
    // 移除 orderTable 列表
    handleRemoveItem(index) {
      ElMessageBox.confirm("確定要刪除?", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.productsData.list.splice(index, 1);
          ElMessage({
            type: "success",
            message: "刪除成功",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消刪除",
          });
        });
    },
    // 開啟計價彈窗
    handleDialogCalcForm(prodId) {
      this.getCadInfo(prodId);
      this.tempData.prodId = prodId;
      this.dialogCalcForm = true;
    },
    // 完成計價, 更新商品價格, 關閉彈窗
    handleUpdateTotal(val) {
      this.productsData.list[this.tempData.index].prodCost = val;
      this.dialogCalcForm = false;
    },
    // 取消計價, 關閉彈窗
    handleCloseCalcForm() {
      this.dialogCalcForm = false;
    },
  },
};
</script>

<style scoped>
.main-order {
  margin: 0 20px;
}
.top-form-card {
  margin: 10px 0;
  padding: 0 24px;
}
.row-bg {
  padding: 10px 10px;
  align-items: center;
}
.d-flex {
  display: flex;
}
.flex-nowrap {
  flex-wrap: nowrap;
}
.flex-column {
  flex-direction: column;
}

.customForm {
  min-width: 320px;
}
.total {
  margin: 20px 0;
  font-size: 24px;
  display: flex;
  justify-content: flex-end;
}
.operate-row {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}

.el-upload__tip {
  font-size: 8px;
  color: #999;
}
</style>

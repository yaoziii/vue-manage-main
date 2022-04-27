<template>
  <el-form :model="cadMetaModel" label-width="auto">
    <el-row :gutter="20">
      <el-col :lg="12">
        <!-- 計價方式 -->
        <el-card shadow="hover">
          <h2 class="title">計價方式</h2>
          <el-radio-group v-model="cadMetaModel.calcType">
            <el-radio label="才數" />
            <el-radio label="重量" />
            <el-radio label="製程" />
            <el-radio label="自定" />
          </el-radio-group>
        </el-card>
      </el-col>
      <el-col :lg="12">
        <!-- 計算結果 -->
        <el-card shadow="hover">
          <h2 class="title">計算結果</h2>
          <el-form-item label="金額小計">
            <el-input v-model="total" disabled></el-input>
          </el-form-item>
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSubmit">確定</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :lg="10">
        <!-- 材料單價 -->
        <el-card shadow="hover">
          <h2 class="title">材料單價</h2>
          <el-row :gutter="20">
            <el-col :lg="12">
              <el-form-item label="長度">
                <el-input
                  v-model="cadMetaModel.materialModel.longWise"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="寬度">
                <el-input
                  v-model="cadMetaModel.materialModel.width"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :lg="12">
              <el-form-item label="厚度">
                <el-input
                  v-model="cadMetaModel.materialModel.thickness"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="材料售價">
                <el-input
                  v-model="cadMetaModel.materialModel.cost"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :lg="12">
              <el-form-item label="材料係數">
                <el-input
                  v-model="cadMetaModel.materialModel.factor"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item>
                <el-checkbox
                  label="是否代料"
                  name="isSubstitute"
                  v-model="cadMetaModel.materialModel.material"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" justify="end">
            <el-col :lg="12">
              <el-form-item label="材料單價">
                <el-input v-model="price" type="number" :step="0.01" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :lg="14">
        <!-- 雷射單價 -->
        <el-card shadow="hover">
          <h2 class="title">雷射單價</h2>
          <el-row :gutter="20">
            <el-col :lg="6">
              <el-form-item label="總線長">
                <el-input
                  v-model="cadMetaModel.laserModel.laserLong"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item label="穿孔數">
                <el-input
                  v-model="cadMetaModel.laserModel.laserHole"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item label="劃線長">
                <el-input type="number" :step="0.01"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item label="打點數">
                <el-input
                  v-model="cadMetaModel.laserModel.laserPoint"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :lg="6">
              <el-form-item label="線長費">
                <el-input
                  v-model="cadMetaModel.laserModel.laserLongPrice"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item label="穿孔費">
                <el-input
                  v-model="cadMetaModel.laserModel.laserHolePrice"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item label="劃線費">
                <el-input type="number" :step="0.01"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item label="打點費">
                <el-input
                  v-model="cadMetaModel.laserModel.laserPointPrice"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :lg="12">
              <el-form-item label="優惠孔費">
                <el-input type="number" :step="0.01"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item>
                <el-checkbox label="是否雷射折扣" name="isSubstitute" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :lg="12">
              <el-form-item label="雷射折扣">
                <el-input type="number" :step="0.01"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="雷射單價">
                <el-input
                  v-model="laserTotal"
                  type="number"
                  :step="0.01"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :lg="12">
        <!-- 折彎單價 -->
        <el-card shadow="hover">
          <h2 class="title">折彎單價</h2>
          <el-row :gutter="20">
            <el-col :lg="6">
              <el-form-item label="折彎數">
                <el-input
                  v-model="cadMetaModel.bendModel.bend"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item label="折彎費">
                <el-input
                  v-model="cadMetaModel.bendModel.bendPrice"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item label="委折費">
                <el-input type="number" :step="0.01"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item label="折彎折扣">
                <el-input
                  v-model="cadMetaModel.bendModel.bendDiscount"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :lg="12">
              <el-form-item>
                <el-checkbox label="是否雷射折扣" name="isSubstitute" />
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="折彎單價">
                <el-input
                  v-model="bendTotal"
                  type="number"
                  :step="0.01"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :lg="12">
        <!-- 沖孔單價 -->
        <el-card shadow="hover">
          <h2 class="title">沖孔單價</h2>
          <el-row :gutter="20">
            <el-col :lg="6">
              <el-form-item label="沖孔數">
                <el-input
                  v-model="cadMetaModel.rushHoleModel.rushHole"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item label="沖孔費">
                <el-input
                  v-model="cadMetaModel.rushHoleModel.rushHolePrice"
                  type="number"
                  :step="0.01"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item label="孔徑">
                <el-input type="number" :step="0.01"></el-input>
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item label="沖孔折扣">
                <el-input type="number" :step="0.01"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :lg="12">
              <el-form-item>
                <el-checkbox label="是否折扣" name="isSubstitute" />
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="沖孔單價">
                <el-input
                  v-model="rushHoleTotal"
                  type="number"
                  :step="0.01"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { postCalcCadPrice, savePriceList } from "../api/placeOrder";
export default {
  name: "calc-form",
  data() {
    return {
      cadMetaModel: {
        // 計價方式
        calcType: "",
        // 材料
        materialModel: {
          // 材料長度
          longWise: 0,
          // 材料寬度
          width: 0,
          // 材料厚度
          thickness: 0,
          // 材料售價
          cost: 0,
          // 材料係數
          factor: 0,
          // 是否代料
          material: true,
          // 材料單價
        },
        // 雷射
        laserModel: {
          // 總線長
          laserLong: 0,
          // 線長費
          laserLongPrice: 0,
          // 穿孔費
          laserHole: 0,
          // 穿孔數
          laserHolePrice: 0,
          // 打點數
          laserPoint: 0,
          // 打點費
          laserPointPrice: 0,
        },
        // 折彎
        bendModel: {
          // 折彎費
          bend: 0,
          // 折彎折扣
          bendDiscount: 0,
          // 折彎費
          bendPrice: 0,
          // 折彎單價
        },
        // 沖孔
        rushHoleModel: {
          // 沖孔數
          rushHole: 0,
          // 沖孔費
          rushHolePrice: 0,
          // 沖孔單價
        },
      },
      bendTotal: 0,
      rushHoleTotal: 0,
      laserTotal: 0,
      price: 0,
      // 計算結果
      total: 0,
    };
  },
  watch: {
    // 監聽 cadMetaModel 表單數值變化, 並呼叫計算結果的 API
    cadMetaModel: {
      deep: true,
      async handler() {
        {
          try {
            const res = await postCalcCadPrice(this.cadMetaModel);
            const data = await res.data;
            this.total = data.total;
            this.bendTotal = data.bendTotal;
            this.rushHoleTotal = data.rushHoleTotal;
            this.laserTotal = data.laserTotal;
            this.price = data.materialTotal;
          } catch (error) {
            console.log(error);
          }
        }
      },
    },
    // 監聽父層傳進來的 cadMetaModel 數據
    "$attrs.cadMetaModel": {
      handler(val) {
        this.cadMetaModel = val;
      },
      deep: true,
      immediate: true,
    },
  },
  // 初次載入傳進來的 cadMetaModel 數據
  // created() {
  //   this.cadMetaModel = this.$attrs.cadMetaModel;
  // },
  methods: {
    // 發送 保存價格 API
    async savePriceList() {
      const cadMetaModel = {
        bendModel: {
          ...this.cadMetaModel.bendModel,
          ...{ bendTotal: this.bendTotal },
        },
        laserModel: {
          ...this.cadMetaModel.laserModel,
          ...{ laserTotal: this.laserTotal },
        },
        rushHoleModel: {
          ...this.cadMetaModel.rushHoleModel,
          ...{ rushHoleTotal: this.rushHoleTotal },
        },
        materialModel: {
          ...this.cadMetaModel.materialModel,
          ...{ price: this.price },
        },
        total: this.total,
      };
      console.log(cadMetaModel);
      const res = await savePriceList(cadMetaModel, {
        prodId: this.$attrs.prodId,
      });
      const data = await res.data;
      if (res.data === true) {
        this.$message.success("已完成計價!");
      }
      console.log("save", data);
    },
    // 觸發表單傳送事件
    handleSubmit() {
      this.savePriceList();
      this.$emit("updateTotal", this.total);
    },
    handleCancel () {
      this.$emit("closeDialog");
    }
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 24px;
  margin-bottom: 20px;
}
.el-card {
  margin-bottom: 10px;
}
</style>
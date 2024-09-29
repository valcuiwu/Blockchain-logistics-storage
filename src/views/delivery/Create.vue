<template>
  <div class="main">
    <a-steps :current="current">
      <a-step title="选择配送快递列表"/>
      <!-- <a-step title="填写申请信息"/> -->
      <a-step title="确认配送信息"/>
      <a-step title="完成申请"/>
    </a-steps>
    <div class="steps-content">
      <div v-if="current === 0">
        <el-table
            :header-cell-style="{textAlign: 'center'}"
            :cell-style="{ textAlign: 'center' }"
            :data="data"
            style="width: 100%"
            >
            <el-table-column
              prop="hash"
              label="哈希地址">
            </el-table-column>
            <!-- <el-table-column
              prop="name"
              label="姓名">
            </el-table-column> -->
            <el-table-column
              prop="phone"
              label="电话">
            </el-table-column>
            <el-table-column
              prop="time"
              label="交易时间">
            </el-table-column>
            <el-table-column
              prop="address"
              label="配送地址">
            </el-table-column>
            
            <el-table-column
              width="300"
              label="操作">
              <template  v-slot="scope">
                <!-- <div style="line-height: 1; font-size: 0;"> -->
                  <el-button size="mini" @click="next(scope.row)">配送</el-button>
                <!-- </div>   -->
              </template>
            </el-table-column>
          </el-table>
        <!-- <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol"> -->
          <!-- <a-form-model-item label="选择司机" required>
            <a-select v-model="selectDriverIndex" placeholder="请选择配送司机">
              <a-select-option :value="index" v-for="(item, index) in drivers" :key="index" :disabled="item.driving">
                {{ item.name }}
                <i class="dis" v-if="item.driving">
                  <a-icon type="close-circle"/>
                  正在途中</i>
              </a-select-option>
            </a-select>
          </a-form-model-item> -->
          <!-- <a-form-model-item label="选择运输车辆" required>
            <a-select v-model="selectVehicleIndex" placeholder="请选择配送车辆">
              <a-select-option :value="index" v-for="(item, index) in vehicles" :key="index" :disabled="item.driving">
                {{ item.type }} : {{ item.number }}
                <i class="dis" v-if="item.driving">
                  <a-icon type="close-circle"/>
                  正在途中</i>
              </a-select-option>
            </a-select>
          </a-form-model-item> -->
          <!--WY1
          <a-form-model-item label="预计交货时间" required>
            <a-date-picker
                v-model="form.time"
                show-time
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
            />
          </a-form-model-item>
          -->
          <!--WY2
          <a-form-model-item label="加急处理">
            <a-switch v-model="form.urgent"/>
          </a-form-model-item>
          <a-form-model-item label="注意事项">
            <a-checkbox-group v-model="form.cares">
              <a-checkbox value="冰柜冷藏" name="type">
                冰柜冷藏
              </a-checkbox>
              <a-checkbox value="注意易碎" name="type">
                注意易碎
              </a-checkbox>
              <a-checkbox value="防止高温" name="type">
                防止高温
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
          -->
          <!--姓名、客户电话、客户地址-->
          <!-- <a-form-model-item label="姓名" required>
            <a-input v-model="form.name"/>
          </a-form-model-item>
          <a-form-model-item label="客户电话" required>
            <a-input v-model="form.phone"/>
          </a-form-model-item>
          <a-form-model-item label="客户地址" required>
            <a-input v-model="form.address" type="textarea" :rows="4"/>
          </a-form-model-item>
         -->

          <!--WY-->
  
          <!--WY-->
          <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
            <!-- <a-button type="primary" @click="next">
              下一步
            </a-button> -->
          </a-form-model-item>
        <!-- </a-form-model> -->
      </div>
      <div v-if="current === 1" class="check">
        <p>哈希地址: {{form.hash}}</p>
        <p>送货司机： {{ form.driver }}</p>
        <p>车牌号码： {{ form.number }}</p>
        <p>交易时间: {{ form.time }}</p>
        <p>电话： {{ form.phone }}</p>
        <p>送货地址： {{ form.address }}</p>  
        <!--WY4
        <p>姓名： {{ form.care }}</p>
        
        <p>交易时间： {{ form.time }}</p>-->
       <!-- <p>加急处理： {{ form.urgent }}</p>
        <p>注意事项： {{ form.care }}</p>
        <p>客户电话： {{ form.phone }}</p>
        <p>客户地址： {{ form.address }}</p>
        <p>预计送达： {{ form.time }}</p>-->
        <a-button type="danger" style="margin-right: 20px" :loading="loading" @click="submit">提交</a-button>
        <a-button @click="current = 0">上一步</a-button>
      </div>
      <div v-if="current === 2">
        <a-result
            status="success"
            title="Submitted Successfully"
            sub-title="Please wait for the administrator to review the delivery request."
        >
          <template #extra>
            <router-link to="/delivery/list">
              <a-button key="console" type="primary">
                Go Console
              </a-button>
            </router-link>
            <a-button key="buy" @click="current = 0">
              Submit Again
            </a-button>
          </template>
        </a-result>
      </div>
    </div>
  </div>
</template>

<script>
import {FindAllCanUse, SaveDistribution} from "../../api/distribution";


export default {

  data() {
    return {
      data:[
        {hash:'QmWmgvXGHkd3DhzCLgTy8uaZU4wrT5kX1LiVNZv7Jys1Za',phone:'1234513',time:'2023-8-21 20:10:23',address:'江苏省南京市江宁区XXX'},
      
        {hash:'QmYBswpdqnxvUK2SHqp5Y6pTeVJLGbwxj1Fk96JpGDQvmS',phone:'12323232',time:'2023-8-21 20:27:43',address:'江苏省镇江市丹徒区XXXX'}],
      data1:[{hash:'QmNRQEzJTc2o38EXgN6ubqarXNw3qQhsZswa4VFgCLp7cU',phone:'1234513',time:'2023-8-21 20:28:05',address:'福建省福州市晋安区XXX'},
      {hash:'QmPpGGSRoJGGKsCGs8CVvXGTERFHF8CSPXiAsME6pWmJTN',phone:'1234513',time:'2023-8-21 20:28:23',address:'江苏省扬州市广陵区XXX'},
      {hash:'QmPqsoUESZjBDknznCQ886ZXxBdKR5WaQPvFBi1AVB1AWa',phone:'1234513',time:'2023-8-21 20:28:40',address:'福建省宁德市屏南县XXX'}],
      loading: false,
      labelCol: {span: 6},
      wrapperCol: {span: 12},
      current: 0,
      selectDriverIndex: 0,
      selectVehicleIndex: 0,
      drivers: [],
      vehicles: [],
      form: {
        id: '',
        did: '',
        vid: '',
        driver: '',
        number: '',
        name:'',
        phone: '',
        address: '',
        hash:'',
        time:'',
        /*WY
        urgent: false,
        cares: [],
        care: '',*/
        //time: '',
        status: 0,
        columns : [
  {
    title: '哈希',
    dataIndex: 'hash',
    key: 'hash',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  
  {
    title: '交易时间',
    dataIndex: 'time',
    key: 'time',
  },
  
  {
    title: '配送地址',
    dataIndex: 'address',
    key: 'address',
  },
  // {
  //   dataIndex: 'email',
  //   key: 'email',
  //   slots: {title: 'customTitle'},
  //   scopedSlots: {customRender: 'email'},
  // },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: {customRender: 'operation'},
  },
]

      },
    }
  },

  mounted() {
    FindAllCanUse().then((res) => {
      if (res.status) {
        this.drivers = res.data.drivers
        this.vehicles = res.data.vehicles
      }
      console.log(this.drivers)
      console.log(this.vehicles)
    })
  },

  methods: {
    next(row) {
      //WY
      //let care = ''
      /*WY
      for (let i = 0; i < this.form.cares.length; i++) {
        care += this.form.cares[i] + ", "
      }*/
      this.form.hash = row.hash
      this.form.time = row.time
      this.form.address = row.address
      this.form.phone = row.phone
      this.form.driver = this.drivers[this.selectDriverIndex].name
      this.form.did = this.drivers[this.selectDriverIndex].id
      this.form.number = this.vehicles[this.selectVehicleIndex].number
      this.form.vid = this.vehicles[this.selectVehicleIndex].id
      //WY
      //this.form.care = care
      this.current = 1
    },
    submit() {
      this.$message.success("提交成功，请等待审核")
      this.loading = true
      this.current = 2

      // SaveDistribution(this.form).then((res) => {
      //   if (res.status) {
      //     setTimeout(() => {
      //       this.loading = false
      //       this.current = 2
      //       this.$message.success("提交成功，请等待审核")
      //     }, 800)
      //   } else {
      //     setTimeout(() => {
      //       this.loading = false
      //       this.$message.error("提交失败")
      //     }, 800)
      //   }
      // })
    },
  },

}
</script>

<style scoped>
.main {
  width: 900px;
/*   position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */

  padding: 35px 35px 15px 35px;
  border-radius: 15px;
  background-clip: padding-box;
  border: #000000 solid 1px;
  margin: 90px auto;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
}

.steps-content {
  margin-top: 40px;
}

.check {
  padding-left: 200px;
}

.check p {
  padding-bottom: 10px;
}

.dis {
  padding-left: 10px;
  font-size: 10px;
  letter-spacing: 1px;
  color: red;
}

</style>
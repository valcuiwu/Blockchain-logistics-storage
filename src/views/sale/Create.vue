<template>
  <div class="main">
    <a-steps :current="current">
      <a-step title="填写信息"></a-step>
      <a-step title="确认信息"/>
      <a-step title="完成"/>
    </a-steps>
    <div class="steps-content">
      <div v-if="current === 0">
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="用户姓名" required>
            <a-input v-model="form.username"/>
          </a-form-model-item>
          <a-form-model-item label="售出商品" required>
            <a-select v-model="selectIndex" placeholder="请选择商品">
              <a-select-option :value="index" v-for="(item, index) in commodityList" :key="index">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="商品数量" required>
            <a-input-number v-model="form.count"/>
          </a-form-model-item>
          <a-form-model-item label="预留电话" required>
            <a-input v-model="form.phone"/>
          </a-form-model-item>
          <a-form-model-item label="收货地址" required>
            <el-select class= "arriveClass" v-model="form.province" placeholder="请选择省份" @change="provinceChange($event)">
              <el-option v-for="(item) in provinceList" :key="item.name" :value="item.name"></el-option>
            </el-select>
            <el-select class= "arriveClass" v-model="city" placeholder="请选择城市" @change="cityChange($event)">
              <el-option v-for="(item) in cityList" :key="item.name" :value="item.name"></el-option>
            </el-select>
            <el-select class= "arriveClass" v-model="area" placeholder="请选择区县">
              <el-option v-for="(item) in countyList" :key="item.name" :value="item.name"></el-option>
            </el-select>
          </a-form-model-item>
          <a-form-model-item label="详细地址">
            <a-input v-model="locate"/>
          </a-form-model-item>
          <a-form-model-item label="备注信息" required>
            <a-input v-model="form.description" type="textarea" :rows="4"/>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
            <a-button type="primary" @click="next">
              下一步
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div v-if="current === 1" class="check">
        <p>用户姓名 {{ form.username }}</p>
        <p>售出商品： {{ form.commodity }}</p>
        <p>商品数量： {{ form.count }}</p>
        <p>预留电话： {{ form.phone }}</p>
        <p>用户地址： {{form.location = form.province+' ' + city + " " + area + '' + locate}}</p>
        <p>备注信息： {{ form.description }}</p>
        <p>交易时间： {{ form.createAt = this.Thistime()}}</p>
        <a-divider orientation="right">
          金额总计： {{ form.price }}
        </a-divider>
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
            <router-link to="/sale/record">
              <a-button key="console" type="primary">
                Go Back
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
import {FindAllCommodity} from "../../api/commodity";
import {SaveSale} from "../../api/sale";
import axios from "axios"
export default {

  data() {
    return {
      locate:'',
      mapApiKey:'map',
      CITY:[],
      XIAN:[],
      loading: false,
      labelCol: {span: 6},
      wrapperCol: {span: 12},
      current: 0,
      selectIndex: 0,
      drivers: [],
      vehicles: [],
      commodityList: [],
      provinceList:[],
      cityList:[],
      countyList:[],
      city:'',
      area:'',
      form: {
        username: '',
        commodity: '',
        phone: '',
        province:'',
        count: 50,
        price: 0,
        description: '',
        location:'',
        createAt:''
      },
    }
  },

  mounted() {
    FindAllCommodity().then((res) => {
      if (res.status) this.commodityList = res.data
    }),
    axios({
      method:"get",
      url:"https://restapi.amap.com/v3/config/district?parameters",
      params:{
          key:"3a708a4ef5e3af28694b1c861985a5ce",
          keyWords:"中国",
          subdistrict:3
      }
    }).then((res)=>{
        this.provinceList = res.data.districts[0].districts  /* 省*/
          /* 进行遍历赋值*/
          /* 市区和县区*/
        let newProvince = this.provinceList
        for(let i = 0; i < newProvince.length; i++){              /* 省级*/
          for(let j = 0; j < newProvince[i].districts.length; j++){       /* 市级*/
              let city = newProvince[i].districts[j].name
              this.CITY.push({id:j+1,name:city,code:i+1})
              for(let k = 0;k<newProvince[i].districts[j].districts.length; k++){/* 县级*/
                  let xian = newProvince[i].districts[j].districts[k].name
                  this.XIAN.push({id:k+1,name:xian,code:j+1,cityCountyName:city})
              }
          }
        }
        for(let m = 0; m < newProvince.length;m++){
            newProvince[m] = {...newProvince[m],...{code:m+1}}
        }
        this.provinceList = newProvince
        // console.log(this.XIAN)
  })
  },

  methods: {
    upload() {
      console.log(this.form)
      axios({
        url: process.env.VUE_APP_BASE_URL + '/api/dataSale',
        data: {
          username: this.form.username,
          commodity: this.form.conmmodity,
          phone: this.form.phone,
          province: this.form.province,
          count: this.form.count,
          price: this.form.price,
          description: this.form.description,
          location: this.form.location,
          createAt: this.form.createAt
        },
        method: 'get'
      }).then((res) => {
        if(res.data["flag"] == false) 
          alert("用户属性不能满足外包解密要求，服务端解密失败")
        else{
          this.localResult.push({ hash: res.data["hash"], data: res.data["res"]})
        }

      })  
    },
    Thistime() { //当前日期
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var mytime=date.toLocaleTimeString();     //获取当前时间
      // myDate.toLocaleString( );
      var time = year + "-" + month + "-" + day+' '+mytime;
      return time;
    },
    provinceChange(that){
      // 根据选中省，匹配市
      let cityCode = 0
      let newCityArry = []
      this.provinceList.forEach((item,index)=>{
          if(item.name == that){
              cityCode = item.code
          }
      })
        // console.log(cityCode)
      if(cityCode){
          this.cityList = []
          this.CITY.forEach((item,index)=>{
              if(item.code == cityCode){
                  this.cityList.push(item)
              }
          })  /* 市匹配成功*/
      }
    },
    cityChange(that){
        let countyCode = 0
        let cityname = ''
        let newCountyArry = []
        this.cityList.forEach((item,index)=>{
            if(item.name == that){
                countyCode = item.id
                cityname = item.name
            }
        })
        if(countyCode){
            this.countyList = []
            this.XIAN.forEach((item,index)=>{
                if(item.code == countyCode && item.cityCountyName == cityname){
                    this.countyList.push(item)
                }
            })
        }
    },
    next() {
      let commodity = this.commodityList[this.selectIndex]
      this.form.price = this.form.count * commodity.price
      this.form.commodity = commodity.name
      console.log(this.form)
      this.current = 1
    },
    submit() {
      console.log(this.form)
      this.loading = true
      SaveSale(this.form).then((res) => {
        if (res.status) {
          setTimeout(() => {
            this.loading = false
            this.current = 2
            this.$message.success("提交成功")
          }, 800)
        } else {
          setTimeout(() => {
            this.loading = false
            this.$message.error("提交失败")
          }, 800)
        }
      })
    },
  },

}
</script>

<style scoped>
.main {
  padding: 50px 180px;
  background: #ffffff;
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

.arriveClass {
  display: block;
  padding: 10px;
}

.main{
  width: 1100px;
  padding: 35px 35px 15px 35px;
  border-radius: 15px;
  background-clip: padding-box;
  border: #000000 solid 1px;
  margin: 10px auto;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
}

</style>
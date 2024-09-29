<template>
  <div>
  <el-row >
    <el-col class="main">
      <a-form-model-item label="选择搜索消息" required>
        <el-select class="arriveClass" v-model="msg" placeholder="请选择消息类型" @change="changeMsg($event)">
          <el-option v-for="(item) in msgType" :key="item" :value="item"></el-option>
        </el-select>
        <el-select class="arriveClass" v-model="queryMsg">
          <el-option v-for="(item) in msgCheckType" :key="item.name" :value="item.name"></el-option>
        </el-select>
      </a-form-model-item>
      <el-button style="margin-left: 10px;" size="small" type="success" v-bind:disabled=!isbuttopndisabled1 @click="search()">搜索</el-button>
    </el-col>

    <!-- <el-col>
      <el-button style="margin-left: 10px;" size="small" type="success" v-bind:disabled=!isbuttopndisabled1 @click="serverDec2()">搜索</el-button>
    </el-col> -->

    <el-col class="main">
      <el-descriptions class="margin-top" title="解密环节" :column="3" :size="size" border></el-descriptions>
      <el-table :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }" :data="localResult2"
        style="width: 100%">
        <el-table-column prop="hash" label="密文">
        </el-table-column>
      </el-table>
      <el-button style="margin-left: 10px;" size="small" type="success" v-bind:disabled=!isbuttopndisabled1 @click="serverDec()">解密</el-button>
    </el-col>
    
    <el-col class="main">
      <el-descriptions class="margin-top" title="解密结果" :column="3" :size="size" border></el-descriptions>
      <el-table :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }" :data="localResult"
        style="width: 100%">
        <el-table-column prop="hash" label="结果" >
        </el-table-column>

      </el-table>
    </el-col>
  </el-row>
  </div>


  
</template>

<script>
import axios from "axios"
import { postDecrypt ,postDecrypt2 } from "@/api/cpabe"
export default {
  name: 'FileUpload',
  computed: {
    isbuttopndisabled1() {
        return !!this.msg && !!this.queryMsg
    },
},

  data() {
    return {
      jiemi: [],
      groupCheckMsg: '请选择消息类型',
      msgCheckType: [],
      msg: '',
      queryMsg: '',
      msgType: ['系统消息', '地区消息'],
      searchResult: [],
      localResult: [
       
      ],
      localResult2: [
       
      ],
      checkboxGroup1: [],
      cities: ['本科生通知', '研究生通知', '博士生通知', '讲师通知', '副教授通知', '教授通知'],
      fileList: [],
      accessList: [],
      form: {
        name: '',
        region1: '',
        region2: '',
        region3: '',
        region4: '',
        userList: [],
        collegeList: [],
        professionList: [],
        roleList: []
      },
      PRO: [],
      ROLE: [],
      // tableData: [{ hash: "1", data: "fjakjfkas1"},{ hash: "2", data: "fjakjfkas2"}],
      finalArry: [],
      radio: '',
      radioName: '',
      userName: '',
      textInfo: [],
      size: 'mini',
    }
  },
  watch: {
    msg: function (newValue, oldV) {
      if (newValue === '系统消息') {
        this.groupCheckMsg = '请选择通知对象'
      }
      else {
        this.groupCheckMsg = '请选择地区通知'
      }
    }
  },
  mounted() {

  },
  methods: {
    changeMsg(that) {
      // queryMsg = ''
      this.msgCheckType = []
      if (that === '系统消息') {
        this.msgCheckType.push({ id: 0, name: '顾客信息' })
        this.msgCheckType.push({ id: 1, name: '店员信息' })
        this.msgCheckType.push({ id: 2, name: '司机信息' })
        this.msgCheckType.push({ id: 3, name: '管理员信息' })
      } else {
        axios({
          method: "get",
          url: "https://restapi.amap.com/v3/config/district?parameters",
          params: {
            key: "3a708a4ef5e3af28694b1c861985a5ce",
            keyWords: "中国",
            subdistrict: 3
          }
        }).then((res) => {
          let provinceList = res.data.districts[0].districts
          console.log(provinceList)
          for (let i = 0; i < provinceList.length; i++) {
            this.msgCheckType.push({ id: i, name: provinceList[i].name })
          }
        })
      }
    },

    serverDec() {
      if(window.sessionStorage.getItem("access")==0){
        this.userid = 0       
      }else if(window.sessionStorage.getItem("access")==1){
        this.userid = 1 
      }else{
        this.userid = 2
      }
      
      //console.log(this.userid)
      console.log(this.userid + ',' + this.queryMsg)
      this.zuhe = this.userid + ',' + this.queryMsg
      let mess = {
        "userid": this.userid,
        "keywordInfo": this.queryMsg
      }
      postDecrypt(mess).then((res) => {
        console.log(res)
        this.localResult = res.data.plaintext.map(hashresult=>({
            hash : hashresult
          }))
        console.log(this.localResult)
        this.$message.success("解密结束")    

      })
      


    },
    search() {
      let mess = {
        "userid": this.userid,
        "keywordInfo": this.queryMsg
      }
      postDecrypt2(mess).then((res) => {
        this.$message.success("共有"+res.data.length+"条搜索结果")        
          this.localResult2 = res.data.map(hashresult=>({
            hash : hashresult
          }))
          this.localResult=res.data.map(hashresult=>({
            hash : ''
          }))
        console.log(this.localResult2)
      })
      
    },
    localDec(row) {
      // alert("解密成功")
      this.localResult = [{
        hash: "QmVaHAevGUFuJmmttHiyoJwxBVZhTQ6xZDKvarMjrX4tRh QmUARreMJyz2ftSNsFupizPf2469CWtsBkL5L4XaWq1iFV"
        , res: "{x=671868283928399512349076122889270905028302428155892357348125903067007986104746478234431285235311933405406665619227933020253111524779925285399674730,y=393505249179208662914688897321465658322127052013569506287165537946232020669443843885264949951683165504749789240266612221002246911547001525616824333}"
      }]

      // this.axios({
      //   url: process.env.VUE_APP_BASE_URL + '/loacalDownload',
      //   data: {
      //     param:row
      //   },
      //   method: 'post'
      // }).then((res) => {
      //   alert("解密成功：" + res.data)
      //   // this.checkboxGroup1 = []
      //   // for(let i=0; i<res.data.length; i++) {
      //   //   this.searchResult.push({ hash: res.data[i]["hash"], data: res.data[i]["data"]})
      //   // }
      // })  
    },
    submit() {
      console.log('keyowrd', this.radioName.name)
      for (let i = 0; i < this.tableData.length; i++) {
        this.finalArry[i] = this.tableData[i]
      }
      console.log('ploicys', this.tableData)
      console.log('Text', this.textInfo)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    msgChange(that) {
      // console.log('BASIC', that)
      // 根据选中学院匹配专业
      let professionCode = 0
      const newProfessionArry = []
      this.form.collegeList.forEach((item, index) => {
        // console.log('THAT', that)
        // console.log('ITEMCODE', item.collegecode)
        // console.log('CODE', this.form.collegeList)
        if (item.name === that) {
          professionCode = item.code
        }
      })
      // console.log(professionCode)
      if (professionCode) {
        this.form.professionList = []
        // console.log('PRO', this.PRO)
        this.PRO.forEach((item, index) => {
          // console.log('COLLEGE', item.collegecode)
          // console.log('PROFESSION', professionCode)
          if (item.code === professionCode) {
            this.form.professionList.push(item)
          }
        })
      }
    },
    professionChange(that) {
      let roleCode = 0
      let professionname = ''
      const newRoleArry = []
      this.form.professionList.forEach((item, index) => {
        if (item.name === that) {
          roleCode = item.id
          professionname = item.name
        }
      })
      if (roleCode) {
        this.form.roleList = []
        this.ROLE.forEach((item, index) => {
          if (item.code === roleCode && item.professionRoleName === professionname) {
            this.form.roleList.push(item)
          }
        })
      }
    },
    addUserInfo() {
      this.tableData.push({ department: this.form.region1, subject: this.form.region2, role: this.form.region3 })
      console.log('submit!', this.tableData)
    },
    radioID(item) {
      this.radioName = item
      console.log(item)
      console.log('AAAA', this.radioName)
      console.log(this.tableData)
    }
  },
  mounted() {

  }
}
</script>

<style>
.blank {
  margin-top: 1%;
  margin-bottom: 1%;
}

.arriveClass {
  /* display: block; */
  padding: 10px;
}
.main{
  width: 90%;
  padding: 15px ;
  border-radius: 15px;
  background-clip: padding-box;
  border: #000000 solid 1px;
  margin:5px  5px  5px  100px;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
}
</style>

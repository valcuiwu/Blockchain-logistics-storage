<template>
  <div class="main">
    <div class="title">权限请求</div>
    <a-table :columns="columns" rowKey="id" :loading="loading">
      <!-- <a-table :columns="columns" :data-source="admins" rowKey="id" :loading="loading"> -->
      <a slot="email" slot-scope="email">{{ email }}</a>
      <span slot="customTitle"><a-icon type="smile-o"/> 邮箱</span>
      <span slot="tags" slot-scope="tags">
      <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
      >
        {{ tag.toUpperCase() }}
      </a-tag>
    </span>
      <span slot="action" slot-scope="text, record, index">
      <a-dropdown>
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">Hover me <a-icon type="down"/></a>
        <a-menu slot="overlay">
          <!--WY-->
      <a-menu-item>
          <a-button type="link" @click="adduser"><a-icon type="act"/>接受</a-button>
        </a-menu-item>
        <a-menu-item>
          <a-button type="link" @click="addVisible = true"><a-icon type="act"/>拒绝</a-button>
        </a-menu-item>
    </a-menu>
  </a-dropdown>
    </span>
    </a-table>

    <a-modal
        title="添加操作员"
        :visible="addVisible"
        @ok="submit"
        @cancel="addVisible = false"
    >
      <a-form-model :model="selectAdmin">
        <a-form-model-item label="邮箱">
          <a-input v-model="selectAdmin.email"/>
        </a-form-model-item>
        <a-form-model-item label="密码">
          <a-input v-model="selectAdmin.password"/>
        </a-form-model-item>
        <!-- 	权限(下拉框) -->
       <a-form-model-item label="权限">
          <el-select v-model="userAuth" class="arriveClass" placeholder="请选择用户权限" @change="checkAuth($event)">
            <el-option v-for="(item) in authorityList" :key="item.value" :value="item.name"></el-option>
          </el-select>
        </a-form-model-item>
        <!-- 管辖地区(下拉框) -->
        <a-form-model-item label="管辖地区">
          <el-select v-model="jurisdiction" class="arriveClass" placeholder="请选择管辖地区">
            <el-option v-for="(item) in msgCheckType" :key="item.name" :value="item.name"></el-option>
          </el-select>
        </a-form-model-item>
        
      </a-form-model>
    </a-modal>

    <a-modal
        title="密码修改"
        :visible="passwordVisible"
        @ok="submit"
        @cancel="passwordVisible = false"
    >
      <a-form-model :model="selectAdmin">
        <a-form-model-item label="密码">
          <a-input v-model="selectAdmin.password"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-modal
        title="邮箱修改"
        :visible="emailVisible"
        @ok="submit"
        @cancel="emailVisible = false"
    >
      <a-form-model :model="selectAdmin">
        <a-form-model-item label="绑定邮箱">
          <a-input v-model="selectAdmin.email"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-modal
        title="权限修改"
        width="500px"
        :visible="rolesVisible"
        @ok="submitRoles"
        @cancel="rolesVisible = false"
    >
      <a-select
          v-model="selectRoles"
          mode="multiple"
          style="width: 100%"
          placeholder="select one country"
          option-label-prop="label"
      >
        <a-select-option :value="item.value"
                         :label="item.value"
                         v-for="(item ,index) in roles"
                         :key="index">
          <span role="img" :aria-label="item.value">🇨🇳</span>{{ item.value + ' (描述: ' + item.description + ')' }}
        </a-select-option>
      </a-select>
    </a-modal>
    <div class="title">员工列表</div>
    <a-table :columns="columns1" :data-source="admins" rowKey="id" :loading="loading">
      <a slot="email" slot-scope="email">{{ email }}</a>
      <span slot="customTitle"><a-icon type="smile-o"/> 邮箱</span>
      <span slot="tags" slot-scope="tags">
      <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
      >
        {{ tag.toUpperCase() }}
      </a-tag>
    </span>
      <span slot="action" slot-scope="text, record, index">
      <a-dropdown>
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">Hover me <a-icon type="down"/></a>
        <a-menu slot="overlay">
          <!--WY-->
          <a-menu-item>
          <a-button type="link" @click="addVisible = true"><a-icon type="act"/> 操作</a-button>
        </a-menu-item>
          <a-menu-item>
          <a-button type="link" @click="updateEmail(index)"><a-icon type="mail"/> 邮箱修改</a-button>
        </a-menu-item>
      <a-menu-item>
        <a-button type="link" @click="updatePassword(index)"><a-icon type="lock"/> 密码修改</a-button>
      </a-menu-item>
      <a-menu-item>
        <a-button type="link" @click="updateRoles(index)"><a-icon type="gateway"/> 权限修改</a-button>
      </a-menu-item>
          <a-menu-item>
        <a-button type="link" @click="remove(record.id)"><a-icon type="delete"/> 删除</a-button>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
    </span>
    </a-table>
  </div>
  
</template>
<script>
import {DeleteAdmin, FindAllAdmin, SaveAdmin} from "../../api/admin";
import {FindAllRole} from "../../api/role";
import axios from "axios"

const columns = [
  //姓名
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    dataIndex: 'email',
    key: 'email',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'email'},
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },
];


export default {

  data() {
    return {
      queryList:[],
      authList:[],
      msgCheckType:[],
      check1:'',
      userAuth:'',
      jurisdiction:'',
      roles: [{name:"Alice",email:'718375890@qq.com',password:'123456',roles:'ROLE_SUPER_ADMIN',createAt:'2023-8-25 20:10:23',area:''},
      {name:"Bob",email:'1570302455@qq.com',password:'123456',roles:'ROLE_SUPER_ADMIN',createAt:'2023-8-25 20:11:01',area:''}],
      admins: [{name:'用户A',email:'1234@163.com',password:'123456',roles:'ROLE_SUPER_ADMIN',createAt:'2023-8-25 20:10:23'},
      {name:'用户B',email:'1234@163.com'},
      {name:'用户C',email:'1234@163.com'}],
      selectRoles: [],
      loading: false,
      addVisible: false,
      emailVisible: false,
      passwordVisible: false,
      rolesVisible: false,
      columns,
      selectAdmin: {},
      authorityList:[{name:'管理员',value:'ROLE_ADMIN'},{name:'销售',value:'ROLE_SALE'},{name:'配送员',value:'ROLE_WAREHOUSE'},{name:'用户',value:'ROLE_CUSTOMER'},],
      columns1 : [
/*         {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        }, */
        {
          dataIndex: 'email',
          key: 'email',
          slots: {title: 'customTitle'},
          scopedSlots: {customRender: 'email'},
        },
        {
          title: '密码',
          dataIndex: 'password',
          key: 'password',
        },        
        {
          title: '权限',
          dataIndex: 'roles',
          key: 'roles',
        },
        {
          title: '添加日期',
          key: 'createAt',
          dataIndex: 'createAt',
          scopedSlots: {customRender: 'createAt'},
        },
      
        {
          title: 'Action',
          key: 'action',
          scopedSlots: {customRender: 'action'},
        },
      ]
    };
  },

  mounted() {
    this.getValue()
    this.query()
    this.auth()
    this.load()
  },

  methods: {
    query() {
      axios({
        url: process.env.VUE_APP_BASE_URL + '/queryRegist',
        method: 'post'
      }).then((res) => {
        console.log(res)
        this.queryList = res.data
      })
    },
    auth() {
      axios({
        url: process.env.VUE_APP_BASE_URL + '/getUser',
        method: 'post',
        data:this.form
      }).then((res) => {
        console.log(res)
        this.authList = res.data
      })
    },
    adduser(){
      this.roles.push(this.admins[0])
     this.admins.shift()
    },
    getValue() {
      // this.msgCheckType = []
      axios({
          method:"get",
          url:"https://restapi.amap.com/v3/config/district?parameters",
          params:{
              key:"3a708a4ef5e3af28694b1c861985a5ce",
              keyWords:"中国",
              subdistrict:3
          }
        }).then((res)=>{
          let provinceList = res.data.districts[0].districts
          // console.log(provinceList);
          for(let i=0; i<provinceList.length; i++) {
            this.msgCheckType.push({id:i,name:provinceList[i].name})
          }
      })
    },

    checkAuth(that){

      this.userAuth=that
      console.log(that)
    },
    
    load() {
      this.loading = true
      FindAllRole().then((res) => {
        if (res.status) this.roles = res.data
      })
      FindAllAdmin().then((res) => {
        setTimeout(() => {
          this.admins = res.data
          this.loading = false
          console.log(this.admins)
        }, 600)
      })
    },

    submit() {
      SaveAdmin(this.selectAdmin).then((res) => {
        if (res.status) this.$message.success("操作员信息更新成功")
        this.addVisible = false
        this.emailVisible = false
        this.rolesVisible = false
        this.passwordVisible = false
        this.load()
      })
    },

    submitRoles() {
      let str = ''
      for (let i = 0; i < this.selectRoles.length; i++) {
        if (i === this.selectRoles.length - 1) {
          str += this.selectRoles[i]
        } else {
          str += this.selectRoles[i] + ";"
        }
      }
      this.selectAdmin.roles = str
      this.submit()
    },

    updateEmail(index) {
      this.emailVisible = true
      this.selectAdmin = this.admins[index]
    },

    updatePassword(index) {
      this.passwordVisible = true
      this.selectAdmin = this.admins[index]
    },

    updateRoles(index) {
      this.rolesVisible = true
      this.selectAdmin = this.admins[index]
      this.selectRoles = this.selectAdmin.roles.split(";")
      console.log(this.selectRoles)
    },

    remove(id) {
      DeleteAdmin(id).then((res) => {
        if (res.status) this.$message.success("操作员删除成功")
        this.load()
      })
    },


  },

};
</script>

<style scoped>
.editable-add-btn {
  margin-bottom: 15px;
}

.main{
  width: 98%;
  padding: 30px;
  border-radius: 10px;
  background-clip: padding-box;
  border: #000000 solid 1px;
  margin: 0px auto;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  letter-spacing: 1px;
  font-size: 20px;
  font-weight: bolder;
  color: #000000;
  margin-bottom: 30px;
}
</style>

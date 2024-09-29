<template>
  <div class="main">
    <div class="title">安全设置</div>
    <a-spin size="large" :spinning="spinning">
      <div>
        <a class="item-title" type="link">用户姓名</a>
        <a-button class="btn" @click="nameVisible = true" type="link">修改</a-button>
        <p class="des">用户姓名：  {{ this.form.username }}</p>
        <a-divider/>
      </div>
      <div>
        <a class="item-title" type="link">账号密码</a>
        <a-button class="btn" @click="passwordVisible = true" type="link">修改</a-button>
        <p class="des">账号密码： {{ show ? this.form.password : '********' }}
          <a @click="show = !show" style="padding-left: 10px">
            <a-icon :type="!show ? 'eye' : 'eye-invisible' "/>
          </a>
        </p>
        <a-divider/>
      </div>
      <div>
        <a class="item-title" type="link">绑定邮箱</a>
        <a-button class="btn" @click="emailVisible = true" type="link">修改</a-button>
        <p class="des">已绑定邮箱： {{ this.form.email }}</p>
        <a-divider/>
      </div>
      <div>
        <a class="item-title" type="link">电话号码</a>
        <a-button class="btn" @click="phoneVisible = true" type="link">修改</a-button>
        <p class="des">电话号码  {{ this.form.phone }}</p>
        <a-divider/>
      </div>

      <div>
        <p class="item-title" >身份属性:</p>
        <p v-if="userID === '0'">admin</p>
        <p v-else-if="userID === '1'">Jiangsu,driver</p>
        <p v-else>customer</p>
        <a-divider/>
      </div>
    </a-spin>
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
          <a-input v-model="selectAdmin.role"/>
        </a-form-model-item>
<!--        <a-form-model-item label="权限">-->
<!--          <el-select v-model="userAuth" class="arriveClass" placeholder="请选择用户权限" @change="checkAuth($event)">-->
<!--            <el-option v-for="(item) in authorityList" :key="item.value" :value="item.name">{{ item.name }}</el-option>-->
<!--          </el-select>-->
<!--        </a-form-model-item>-->
<!--        <a-form-model-item label="权限">-->
<!--          <el-select v-model="userAuth" class="arriveClass" placeholder="请选择用户权限" @change="checkAuth($event)">-->
<!--            <el-option v-for="(item) in authorityList" :key="item" :value="item">{{ item }}</el-option>-->
<!--          </el-select>-->
<!--        </a-form-model-item>-->


      </a-form-model>
    </a-modal>
    <a-modal
        title="用户名修改"
        :visible="nameVisible"
        @ok="submit"
        @cancel="nameVisible = false"
    >
      <a-form-model :model="admin">
        <a-form-model-item label="用户名">
          <a-input v-model="form.username"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
        <a-modal
        title="电话修改"
        :visible="phoneVisible"
        @ok="submit"
        @cancel="phoneVisible = false"
    >
      <a-form-model :model="admin">
        <a-form-model-item label="电话">
          <a-input v-model="form.phone"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-modal
        title="密码修改"
        :visible="passwordVisible"
        @ok="submit"
        @cancel="passwordVisible = false"
    >
      <a-form-model :model="admin">
        <a-form-model-item label="密码">
          <a-input v-model="form.password"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-modal
        title="邮箱修改"
        :visible="emailVisible"
        @ok="submit"
        @cancel="emailVisible = false"
    >
      <a-form-model :model="admin">
        <a-form-model-item label="绑定邮箱">
          <a-input v-model="form.email"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    
    是公司的员工？点击<a-button @click="addVisible = true"><a-icon type="act"/>申请</a-button>
  </div>
</template>

<script>
import axios from "axios"
import {SaveAdmin} from "@/api/admin";
import {AdminSecurity} from "@/api/admin";

export default {
  name: "Me",

  data() {
    return {
      admin: this.$store.state.user.details,
      show: false,
      emailVisible: false,
      passwordVisible: false,
      addVisible:false,
      spinning: false,
      nameVisible:false,
      phoneVisible:false,

      queryList:[],
      authList:[],
      msgCheckType:[],
      check1:'',
      userAuth:'',
      jurisdiction:'',
      selectRoles: [],
      loading: false,
      // addVisible: false,
      // emailVisible: false,
      // passwordVisible: false,
      rolesVisible: false,

      selectAdmin: {
        email: '',
        password: '',
        role: '' // 初始化 role 属性
      },
      // authorityList:['ROLE_SUPER_ADMIN',/*{name:'销售',value:'ROLE_SALE'},*/'ROLE_ADMIN','ROLE_USER',],
      authorityList:[{name:'管理员',value:'ROLE_SUPER_ADMIN'},/*{name:'销售',value:'ROLE_SALE'},*/{name:'配送员',value:'ROLE_ADMIN'},{name:'用户',value:'ROLE_USER'},],
      form: {
        username:'',
        email:this.$store.state.user.details.email,
        password:this.$store.state.user.details.password,
        phone:'',
        role:'',
      },
      userID:window.sessionStorage.getItem("access")
    }
  },

  mounted() {
    console.log(window.sessionStorage.getItem("access"))
    //this.load()
    //QueryUser(this.form).then((res) => {
        //console.log(res)
        // this.form.username = res.username
        // this.form.password = res.password
        // this.form.phone = res.phone
        // this.form.email = res.email
        // this.role = res.role
      //})
  },

  methods: {
    checkAuth(event) {
      const selectedAuth = event.target.value;
      // 在这里处理选择权限的逻辑
      // 更新 form.role 或执行其他操作
      this.selectAdmin.role = selectedAuth;

    },
    queryUser() {
      axios({
        url:  'http://localhost:8080/getUser',
        method: 'post',
        data:this.form
      }).then((res) => {
        // console.log(res)
        this.form.username = res.username
        this.form.password = res.password
        this.form.phone = res.phone
        this.form.username = res.username
        this.role = res.role
      })
    },
    load() {
      this.spinning = true
      setTimeout(() => {
        this.spinning = false
      }, 500)

    },

    submit() {
      console.log(this.selectAdmin); // 打印 selectAdmin 对象
      // console.log(this.selectAdmin.email); // 检查 email 属性
      // console.log(this.selectAdmin.password); // 检查 password 属性
      // console.log(this.selectAdmin.role); // 检查 role 属性

      AdminSecurity(this.selectAdmin)
          .then((res) => {
            console.log(res.data);
            if (res.status) {
              this.$message.success("权限信息修改成功");
              //关闭窗口
              window.close();
            }
          })
          .catch((error) => {
            this.$message.error("权限信息修改失败");
          });
    }

    // submit() {
    //   console.log(this.form)
    //   axios({
    //     url: 'http://localhost:8082/saveUser',
    //     method: 'post',
    //     data:this.form
    //   }).then((res) => {
    //       this.$message.success("账号信息修改成功")
    //     // console.log(res)
    //     // this.authList = res.data
    //   })
    //   SaveAdmin(this.form).then((res) => {
    //     if (res.status) {
    //       this.$message.success("账号信息修改成功")
    //       this.$store.commit('user/saveLoginUser', res.data)
    //     }
    //   })
    //   this.emailVisible = false
    //   this.passwordVisible = false
    //   this.nameVisible = false
    //   this.phoneVisible = false
    //   this.addVisible = false
    //   this.load()
    // },


  }

}
</script>

<style scoped>
.main {
  width: 50%;
/*   position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */

  padding: 45px;
  border-radius: 15px;
  background-clip: padding-box;
  border: #000000 solid 1px;
  margin: 10px auto;
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

.btn {
  float: right;
}

.item-title {
  color: rgba(0, 0, 0, .8);
  line-height: 35px;
}

.item-title:hover {
  color: #5a84fd;
}

.des {
  color: rgba(0, 0, 0, .5);
}
</style>
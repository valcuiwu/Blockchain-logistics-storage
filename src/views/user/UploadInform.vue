<template>
  <div class="main">
    <a-steps :current="current">
      <a-step title="设置访问结构"></a-step>
      <a-step title="确认信息" />
      <a-step title="完成上传" />
    </a-steps>
    <div class="steps-content">

      <div v-if="current === 0">
        <el-table :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }" :data="data1"
          style="width: 100%">
          <el-table-column prop="index" label="序号">
          </el-table-column>
          <el-table-column prop="name" label="命名">
          </el-table-column>
          <el-table-column prop="time" label="创建时间">
          </el-table-column>
          <el-table-column width="300" label="操作">
            <template v-slot="scope">
              <el-button size="mini" @click="next(scope.row)">下一步</el-button>
              <el-button size="mini" @click="nnnext(scope.row)">访问策略</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }"> -->
        <!-- tree -->

        <!-- tree -->
        <!-- <a-button type="primary" @click="next">
            下一步
          </a-button>
        </a-form-model-item> -->
      </div>
      <!-- 确认信息 -->
      <div v-if="current === 1" class="check">
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="消息类型" required>
              <el-select class="arriveClass" v-model="msg" placeholder="选择消息类型" @change="changeMsg($event)">
                <el-option v-for="(item) in msgType" :key="item" :value="item"></el-option>
              </el-select>
              <el-select class="arriveClass" v-model="queryMsg">
                <el-option v-for="(item) in msgCheckType" :key="item.name" :value="item.name"></el-option>
              </el-select>
            </a-form-model-item>
          </a-form-model>
          <a-form-model-item label="消息内容" required>
            <a-input v-model="form.description" type="textarea" :rows="4" />
          </a-form-model-item>
        </a-form-model>
        <!-- <a-button type="danger" style="margin-right: 20px" :loading="loading" @click="submit">下一步</a-button> -->
        <a-button @click="current = 0">上一步</a-button>

        <a-button type="primary" @click="nnext">
          确定上传
        </a-button>

      </div>

      <!-- 完成上传 -->
      <!-- 提交成功页面 -->
      <div class="steps-content"> 
        <div v-if="current === 2">
          <div ref="animationContainer" class="animationContainer" style="transform: scale(0.55);"></div>
          <a-result status="none" title="提交成功">
            {{ this.data111 }}
            <template #extra>

              <!-- <router-link to="/sale/record">
              <a-button key="console" type="primary">
                查看
              </a-button>
            </router-link> -->
              <a-button key="buy" @click="current = 0">
                确定
              </a-button>
            </template>
          </a-result>
        </div>
      </div>
      <!-- 提交成功页面 -->
      <div v-if="current === 3">
        <!-- 访问结构 -->
        <div class="org-tree-container">
          <div class="org-tree" :class="{ horizontal, collapsable }">
            <org-tree-node :data="treeData" :props="props" :horizontal="horizontal" :label-width="labelWidth"
              :collapsable="collapsable" :render-content="renderContent" :label-class-name="labelClassName"
              :selected-class-name="selectedClassName" :selected-key="selectedKey"
              @on-expand="(e, data) => $emit('on-expand', e, data)"
              @on-node-focus="(e, data) => $emit('on-node-focus', e, data)"
              @on-node-click="(e, data) => $emit('on-node-click', e, data)"
              @on-node-mouseover="(e, data) => $emit('on-node-mouseover', e, data)"
              @on-node-mouseout="(e, data) => $emit('on-node-mouseout', e, data)" />
          </div>
          <el-col>
            <a-button key="console" type="primary" @click="back" style="padding=30px">
              返回
            </a-button>
          </el-col>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import render from './node'
import lottie from 'lottie-web';
import {data} from './uData'
import { postEncrypt } from "@/api/cpabe"
export default {

  data() {
    return {
      //MWY
      groupCheckMsg: '请选择消息类型',
      msgCheckType: [],
      msg: '',
      queryMsg: '',
      msgType: ['系统消息', '地区消息'],
      data111: "",
      data1: [{ index: 0, name: '快递管理', time: '2023-8-25 20:00:00' },
      { index: 1, name: '系统信息', time: '2023-8-25 20:00:00' },
      { index: 2, name: '消息通知', time: '2023-8-25 20:00:00' },],
      tableData: [],
      finalArry: [],
      radio: '',
      radioName: '',
      userName: '',
      textInfo: [],
      locate: '',
      loading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      current: 0,
      selectIndex: 0,
      form: {
        hash: '',
        username: '',
        commodity: '',
        phone: '',
        province: '',
        count: 50,
        price: 0,
        description: '',
        location: '',
        createAt: ''
      },
      // vue2-org-tree
      treeData: {
        id: '0',
        label: "or",
        children: [
          {
            id: '1',
            label: "用户",
          },
          {
            id: '2',
            label: "and",
            children: [
              {
                id: '3',
                label: "司机"
              },
              {
                id: '4',
                label: "江苏省"
              }
            ]
          }
        ]
      }
    }
  },
  components: {
    OrgTreeNode: {
      render,
      functional: true
    }
  },
  //MWY
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
  watch: {
  // 监听 current 的值，当它变为 2 时初始化动画
  current(newVal) {
    if (newVal === 2) {
      this.$nextTick(() => {
        this.createAnimation();
      });
    }
  }
},


  mounted() {
    this.createAnimation();
  },

  methods: {
    createAnimation() {
      lottie.loadAnimation({
        container: this.$refs.animationContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: data // 替换为你的动画JSON数据
      });},
    //MWY
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

    //org function
    back() {
      this.current = 0
    },
    next(row) {

      if (row.index === 0) this.PolicyId=0
      else if (row.index === 1) this.PolicyId=1
      else if (row.index === 2) this.PolicyId=2
      this.current = 1
    },
    nnext() {
      // 不完善的提交页面
      console.log("目前的访问权限id:"+sessionStorage.getItem("access"))
      console.log(this.form.description)
      console.log(this.queryMsg)
      console.log(this.PolicyId)
      console.log(this.form.description+','+this.queryMsg+','+this.PolicyId)
      this.zuhe=this.form.description+','+this.PolicyId+','+this.queryMsg
      let mess={
          "data": this.form.description,
          "PolicyId":this.PolicyId,
          "keywordList":this.queryMsg
      }
      postEncrypt(
        mess
        
      ).then((res) => {
        this.data111=res.data[0]
      })
      this.current = 2
    },
    nnnext(row) {
      // 访问树

      if (row.index === 0) this.treeData = {

        id: '0',
        label: "(1,2)",
        children: [
          {
            id: '1',
            label: "Admin",
          },
          {
            id: '2',
            label: "(2,2)",
            children: [
              {
                id: '3',
                label: "Driver"
              },
              {
                id: '4',
                label: "Jiangsu"
              }
            ]
          }
        ]

      }

      else if (row.index === 2) this.treeData = {
        id: '0',
        label: "(1,2)",
        children: [
          {
            id: '1',
            label: "Admin",
          },
          {
            id: '2',
            label: "2 of 3",
            children: [
              {
                id: '3',
                label: "Driver"
              },
              {
                id: '4',
                label: "Jiangsu"
              },
              {
                id: '5',
                label: 'Clerk'
              }
            ]
          }
        ]
      }
      else if (row.index === 1) this.treeData = {
        id: '0',
        label: "(1,4)",
        children: [
          {
            id: '1',
            label: "Admin",
          },
          {
            id: '2',
            label: "Clerk",
          },
          {
            id: '3',
            label: "Driver",
          },
          {
            id: '4',
            label: "Customer",
          }
        ]
      }
      // 不完善的提交页面


      this.current = 3
    },

    // methods: {
    //   Thistime() { //当前日期
    //     var date = new Date();
    //     var year = date.getFullYear();
    //     var month = date.getMonth() + 1;
    //     var day = date.getDate();
    //     var mytime=date.toLocaleTimeString();     //获取当前时间
    //     // myDate.toLocaleString( );
    //     var time = year + "-" + month + "-" + day+' '+mytime;
    //     return time;
    //   },

    submit() {
      // this.loading = true
      // SaveSale(this.form).then((res) => {
      //   if (res.status) {
      //     setTimeout(() => {
      //       this.loading = false
      //       this.current = 2
      //       this.$message.success("提交成功")
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
  props: {
    data: {
      type: Object,
      required: false
    },
    props: {
      type: Object,
      required: false,
      default: () => ({
        label: 'label',
        expand: 'expand',
        children: 'children'
      })
    },
    horizontal: Boolean,
    selectedKey: String,
    collapsable: Boolean,
    renderContent: Function,
    labelWidth: [String, Number],
    labelClassName: [Function, String],
    selectedClassName: [Function, String]
  },
}
</script>

<style lang="less" scoped>
.org-tree-container {
  display: inline-block;
  padding: 15px;
  background-color: #fff;
}

.org-tree {
  // display: inline-block;
  display: table;
  text-align: center;

  &:before,
  &:after {
    content: '';
    display: table;
  }

  &:after {
    clear: both;
  }
}

.org-tree-node,
.org-tree-node-children {
  position: relative;
  margin: 0;
  padding: 0;
  list-style-type: none;

  &:before,
  &:after {
    transition: all .35s;
  }
}

.org-tree-node-label {
  position: relative;
  display: inline-block;

  .org-tree-node-label-inner {
    padding: 10px 15px;
    text-align: center;
    border-radius: 3px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .15);
  }
}

.org-tree-node-btn {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 20px;
  height: 20px;
  z-index: 10;
  margin-left: -11px;
  margin-top: 9px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, .15);
  cursor: pointer;
  transition: all .35s ease;

  &:hover {
    background-color: #e7e8e9;
    transform: scale(1.15);
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
  }

  &:before {
    top: 50%;
    left: 4px;
    right: 4px;
    height: 0;
    border-top: 1px solid #ccc;
  }

  &:after {
    top: 4px;
    left: 50%;
    bottom: 4px;
    width: 0;
    border-left: 1px solid #ccc;
  }

  &.expanded:after {
    border: none;
  }
}

.org-tree-node {
  padding-top: 20px;
  display: table-cell;
  vertical-align: top;

  &.is-leaf,
  &.collapsed {
    padding-left: 10px;
    padding-right: 10px;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 19px;
  }

  &:after {
    left: 50%;
    border-left: 1px solid #ddd;
  }

  &:not(:first-child):before,
  &:not(:last-child):after {
    border-top: 1px solid #ddd;
  }

}

.collapsable .org-tree-node.collapsed {
  padding-bottom: 30px;

  .org-tree-node-label:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 50%;
    height: 20px;
    border-right: 1px solid #ddd;
  }
}

.org-tree>.org-tree-node {
  padding-top: 0;

  &:after {
    border-left: 0;
  }
}

.org-tree-node-children {
  padding-top: 20px;
  display: table;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 20px;
    border-left: 1px solid #ddd;
  }

  &:after {
    content: '';
    display: table;
    clear: both;
  }
}

.horizontal {
  .org-tree-node {
    // display: flex;
    // flex-direction: row;
    // justify-content: flex-start;
    // align-items: center;
    display: table-cell;
    float: none;
    padding-top: 0;
    padding-left: 20px;

    &.is-leaf,
    &.collapsed {
      padding-top: 10px;
      padding-bottom: 10px;
    }

    &:before,
    &:after {
      width: 19px;
      height: 50%;
    }

    &:after {
      top: 50%;
      left: 0;
      border-left: 0;
    }

    &:only-child:before {
      top: 1px;
      border-bottom: 1px solid #ddd;
    }

    &:not(:first-child):before,
    &:not(:last-child):after {
      border-top: 0;
      border-left: 1px solid #ddd;
    }

    &:not(:only-child):after {
      border-top: 1px solid #ddd;
    }

    .org-tree-node-inner {
      display: table;
    }

  }

  .org-tree-node-label {
    display: table-cell;
    vertical-align: middle;
  }

  &.collapsable .org-tree-node.collapsed {
    padding-right: 30px;

    .org-tree-node-label:after {
      top: 0;
      left: 100%;
      width: 20px;
      height: 50%;
      border-right: 0;
      border-bottom: 1px solid #ddd;
    }
  }

  .org-tree-node-btn {
    top: 50%;
    left: 100%;
    margin-top: -11px;
    margin-left: 9px;
  }

  &>.org-tree-node:only-child:before {
    border-bottom: 0;
  }

  .org-tree-node-children {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: flex-start;
    display: table-cell;
    padding-top: 0;
    padding-left: 20px;

    &:before {
      top: 50%;
      left: 0;
      width: 20px;
      height: 0;
      border-left: 0;
      border-top: 1px solid #ddd;
    }

    &:after {
      display: none;
    }

    &>.org-tree-node {
      display: block;
    }
  }
}


.main {
  width: 90%;
  padding: 15px ;
  border-radius: 15px;
  background-clip: padding-box;
  border: #000000 solid 1px;
  margin:5px  auto;
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

.arriveClass {
  display: block;
  padding: 10px;
}

.bg-gray {
  color: gray;
  box-shadow: none !important;
}

.org-tree-container {
  position: relative;
  /*定位*/
  top: 0;
  left: 0;
}

* {
  -webkit-touch-callout: none;
  /*系统默认菜单被禁用*/
  -webkit-user-select: none;
  /*webkit浏览器*/
  -khtml-user-select: none;
  /*早期浏览器*/
  -moz-user-select: none;
  /*火狐*/
  -ms-user-select: none;
  /*IE10*/
  user-select: none;
}

input {
  -webkit-user-select: auto;
  /*webkit浏览器*/
}

textarea {
  -webkit-user-select: auto;
  /*webkit浏览器*/
}

/deep/ .steps-content .animationContainer{
  margin-top: -300px;
}
/deep/ .steps-content .ant-result-icon{
  display: none!important;
}
/deep/ .steps-content  .ant-result{
  padding: 0px 32px 48px!important;
  margin-top: -300px;
}
</style>
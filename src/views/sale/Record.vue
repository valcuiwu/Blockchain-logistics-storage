<template>
  <div class="record_box">
    <a-table :loading="loading" :columns="columns" :data-source="data" rowKey="id">
      <!-- <a slot="company" slot-scope="company">{{ company }}</a> -->
      <span slot="customTitle">哈希地址</span>
      <span slot="action" slot-scope="text, record, index">
        <a-tag color="red" v-if="!record.pay">等待结款</a-tag>
        <a-tag color="green" v-if="record.pay">结款完成</a-tag>
        <a-button v-if="!record.pay" type="link" @click="confirm(record, index)">结款</a-button>
      </span>
    </a-table>

  </div>
</template>

<script>
import {FindAllSale, SaveSale} from "../../api/sale";

const columns = [
  // {
  //    dataIndex: 'hash',
  //   key: 'hash',
  //   slots: {title: 'customTitle'},
  //    scopedSlots: {customRender: 'hash'},
  //  },
   {
     title: '商品',
    dataIndex: 'commodity',
    key: 'commodity',
  },
   {
    title: '数量',
    dataIndex: 'count',
    key: 'count',
  },
   {
    title: '总计',
    dataIndex: 'price',
    key: 'price',
  },
   {
    title: '备注',
    dataIndex: 'description',
    key: 'description',
  },
  {
     title: '开票时间',
    dataIndex: 'createAt',
     key: 'createAt',
  },
   {
     title: '更多操作',
     key: 'action',
     scopedSlots: {customRender: 'action'},
 },
];


const data = [];

export default {

  data() {
    return {
      loading: false,
      data: [],
      columns,
    };
  },

  mounted() {
    this.loadTableData(),
    this.aaa()
  },

  methods: {
    aaa() {
    console.log("aaa")
    },
    loadTableData() {
      this.loading = true
      FindAllSale().then((res) => {
        setTimeout(() => {
          this.loading = false
          this.data = res.data
        }, 600)
      })
    },

    confirm(record, index) {
      let that = this
      this.$confirm({
        title: '销售结款',
        content: '我已确定' + record.company + '的销售金额 ¥' + record.price + '已经打入账户!',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          that.data[index].pay = true
          SaveSale(that.data[index]).then((res) => {
            if (res.status) that.$message.success("销售结款成功")
          })
        },
      });
    },


  },

};
</script>

<style scoped>
.editable-add-btn {
  margin-bottom: 15px;
}

.record_box{
  width: 1300px;
  padding: 35px 35px 15px 35px;
  border-radius: 15px;
  background-clip: padding-box;
  border: #000000 solid 1px;
  margin: 90px auto;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
}
</style>

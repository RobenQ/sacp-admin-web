<template>
  <div class="container">
    <div class="form">
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="SACP_ID：">
          <el-input v-model="form.sacpId" clearable />
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="form.nickName" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column label="SACP_ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.sacpId }}
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickName }}
        </template>
      </el-table-column>
      <el-table-column label="登录IP" align="center">
        <template slot-scope="scope">
          {{ scope.row.host }}
        </template>
      </el-table-column>
      <el-table-column label="登陆时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.startTime }}
        </template>
      </el-table-column>
      <el-table-column label="上次访问时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.lastAccessTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" @click="offLineUser(scope)">强制下线</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllActiveUsers, offLineUser } from '@/api/user'

export default {
  data() {
    return {
      form: {
        sacpId: '',
        nickName: ''
      },
      sacpId: undefined,
      tableData: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const res = await getAllActiveUsers()
      this.tableData = res.result
    },
    async onSubmit() {
      if (this.form.sacpId === '') {
        this.form.sacpId = undefined
      } else {
        for (var i = 0; i < this.tableData.length; i++) {
          var res = this.tableData
          if (res[i].sacpId !== this.form.sacpId) {
            this.tableData.splice(i, 1)
            return
          }
        }
      }
      if (this.form.nickName === '') {
        this.form.nickName = undefined
      } else {
        for (i = 0; i < this.tableData.length; i++) {
          res = this.tableData
          if (res[i].nickName !== this.form.nickName) {
            this.tableData.splice(i, 1)
            return
          }
        }
      }
      await this.init()
    },
    async offLineUser(scope) {
      const sessionid = scope.row.sessionId
      await offLineUser({ sessionId: sessionid })
      this.$message.success('该用户已被强制下线')
      this.init()
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
}
.form{
  width: 100%;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

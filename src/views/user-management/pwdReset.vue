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
          {{ scope.row.member.sacpId }}
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.member.nickName }}
        </template>
      </el-table-column>
      <el-table-column label="角色ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.role.id }}
        </template>
      </el-table-column>
      <el-table-column label="角色名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.role.roleName }}
        </template>
      </el-table-column>
      <el-table-column label="操作(默认密码：sacp111111)" align="center">
        <template slot-scope="scope">
          <el-button type="danger" @click="resetPwd(scope)">密码重置</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMemeberRoleInfo, resetPwd } from '@/api/user'

export default {
  data() {
    return {
      form: {
        sacpId: '',
        nickName: ''
      },
      dialogVisible: false,
      sacpId: undefined,
      radio: 1,
      tableData: {},
      radioList: []
    }
  },
  created() {
    // this.onSubmit()
  },
  methods: {
    async onSubmit() {
      if (this.form.sacpId === '') {
        this.form.sacpId = undefined
      }
      if (this.form.roleId === '') {
        this.form.roleId = undefined
      }
      var res = await getMemeberRoleInfo(this.form)
      this.tableData = res.result
    },
    async resetPwd(scope) {
      const sacpid = scope.row.member.sacpId
      await resetPwd({ sacpId: sacpid })
      this.$message.success('该用户密码重置成功！')
      this.onSubmit()
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

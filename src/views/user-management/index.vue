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
      <el-table-column label="账号状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.member.status }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="warning" @click="resetPwd(scope)">禁言</el-button>
          <el-button type="danger" @click="resetPwd(scope)">冻结</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" title="修改用户角色">
      <el-radio-group v-model="radio">
        <el-radio v-for="(item) in radioList" :key="item.id" :label="item.id" border>{{ item.roleName }}</el-radio>
      </el-radio-group>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="sureRole">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserAndRole } from '@/api/role'
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
      var res = await getUserAndRole(this.form)
      this.tableData = res.result
    },
    async resetPwd() {
      this.$message({
        type: 'success',
        message: '修改成功！'
      })
      this.onSubmit()
      this.dialogVisible = false
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

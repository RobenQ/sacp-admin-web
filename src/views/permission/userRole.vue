<template>
  <div class="container">
    <div class="form">
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="用户ID：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="SACP_ID：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="角色ID：">
          <el-input v-model="form.name" />
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
      <el-table-column
        prop="date"
        label="日期"
        width="180"
        align="center"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
        align="center"
      />
      <el-table-column
        prop="address"
        label="地址"
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
      >
        <el-button type="primary" @click="changeRole">角色</el-button>
        <el-button type="danger" @click="resetPwd">密码重置</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {

      }
    }
  },
  created() {

  },
  methods: {
    onSubmit() {

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
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>

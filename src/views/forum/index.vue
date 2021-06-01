<template>
  <div class="container">
    <div class="form">
      <el-form ref="form" :model="form" :inline="true" label-width="100px">
        <el-form-item label="创作内容ID：">
          <el-input v-model="form.postId" clearable />
        </el-form-item>
        <el-form-item label="版块ID：">
          <el-input v-model="form.forumId" clearable />
        </el-form-item>
        <el-form-item label="创作者昵称：">
          <el-input v-model="form.author" clearable />
        </el-form-item>
        <el-form-item label="发表时间：">
          <el-date-picker
            v-model="form.createTime"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
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
      <el-table-column label="ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="评价者sacp_id" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.sacpId }}
        </template>
      </el-table-column>
      <el-table-column label="版块ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.blockId }}
        </template>
      </el-table-column>
      <el-table-column label="评价内容" align="center">
        <template slot-scope="scope">
          <el-button type="info" plain @click="preContext(scope)">预览</el-button>
        </template>
      </el-table-column>
      <el-table-column label="评价分类（1：提问 | 2：展示）" align="center">
        <template slot-scope="scope">
          {{ scope.row.classifyId }}
        </template>
      </el-table-column>
      <el-table-column label="状态（0：正常 | 1：下线）" align="center">
        <template slot-scope="scope">
          {{ scope.row.idDelete }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="onLine(scope)">恢复</el-button>
          <el-button type="danger" @click="offLine(scope)">下线</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    内容预览-->
    <el-dialog
      :visible.sync="dialogFormVisible"
      title="创作内容预览"
      width="60%"
      heigth="auto"
      :before-close="handleClose"
      center
    >
      <div style="width: 100%;height: 100%">
        <span v-html="context" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { offLinePost, onLinePost, searchPost } from '@/api/forum'

export default {
  name: 'Index',
  data() {
    return {
      form: {
        author: '',
        postId: '',
        forumId: '',
        createTime: []
      },
      value: '',
      tableData: [],
      context: '',
      dialogFormVisible: false,
      toBody: true
    }
  },
  methods: {
    async onSubmit() {
      const res = await searchPost(this.form)
      this.tableData = res.result
    },
    preContext(scope) {
      this.context = scope.row.context
      this.dialogFormVisible = true
    },
    handleClose() {
      this.context = ''
      this.dialogFormVisible = false
    },
    async onLine(scope) {
      await onLinePost(scope.row.id)
      this.onSubmit()
    },
    async offLine(scope) {
      await offLinePost(scope.row.id)
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

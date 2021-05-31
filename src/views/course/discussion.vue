<template>
  <div>
    <div class="container">
      <div class="form">
        <el-form ref="form" :model="form" :inline="true" label-width="100px">
          <el-form-item label="课程ID：">
            <el-input v-model="form.courseId" clearable />
          </el-form-item>
          <el-form-item label="评价者昵称：">
            <el-input v-model="form.author" clearable />
          </el-form-item>
          <el-form-item label="评价时间：">
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
        <el-table-column label="评价者" width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.memberNickname }}
          </template>
        </el-table-column>
        <el-table-column label="课程ID" align="center">
          <template slot-scope="scope">
            {{ scope.row.courseId }}
          </template>
        </el-table-column>
        <el-table-column label="评价时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column label="评价内容" align="center">
          <template slot-scope="scope">
            {{ scope.row.context }}
          </template>
        </el-table-column>
        <el-table-column label="状态（0：正常 | 1：下线）" align="center">
          <template slot-scope="scope">
            {{ scope.row.isDelete }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="onLine(scope)">恢复</el-button>
            <el-button type="danger" @click="offLine(scope)">下线</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { offLineDiscussion, onLineDiscussion, searchDiscussion } from '@/api/course'

export default {
  name: 'Discussion',
  data() {
    return {
      form: {
        author: '',
        courseId: '',
        createTime: []
      },
      value: '',
      tableData: []
    }
  },
  methods: {
    async onSubmit() {
      const res = await searchDiscussion(this.form)
      this.tableData = res.result
    },
    async onLine(scope) {
      await onLineDiscussion(scope.row.id)
      this.onSubmit()
    },
    async offLine(scope) {
      await offLineDiscussion(scope.row.id)
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

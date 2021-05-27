<template>
  <div class="container">
    <div class="form">
      <el-form ref="form" :model="form" :inline="true" label-width="100px">
        <el-form-item label="课程类型：">
          <el-select v-model="form.classifyId" filterable placeholder="请选择" autocomplete="on">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="课程名称：">
          <el-input v-model="form.courseName" clearable />
        </el-form-item>
        <el-form-item label="作者昵称：">
          <el-input v-model="form.author" clearable />
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
      <el-table-column label="类别名称" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.courseName }}
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.classifyName }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
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
</template>

<script>
import { getAllClassify, offLineCourse, onLineCourse, searchCourse } from '@/api/course'

export default {
  name: 'Course',
  data() {
    return {
      form: {
        author: '',
        classifyId: 0,
        courseName: ''
      },
      options: [{
        label: '全部',
        value: 0
      }],
      tableData: {}
    }
  },
  created() {
    this.getAllClassify()
  },
  methods: {
    async getAllClassify() {
      const res = await getAllClassify()
      var datas = res.result
      for (var i = 0; i < datas.length; i++) {
        var data = datas[i]
        console.log(data)
        this.options.push({
          value: data.id,
          label: data.classifyName
        })
      }
    },
    async onSubmit() {
      const res = await searchCourse(this.form)
      var data = res.result
      this.tableData = data
    },
    async onLine(scop) {
      await onLineCourse(scop.row.id)
      this.onSubmit()
    },
    async offLine(scop) {
      await offLineCourse(scop.row.id)
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

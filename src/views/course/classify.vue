<template>
  <div class="container">
    <div class="form">
      <el-form ref="form" :model="form" :inline="true" label-width="100px">
        <el-form-item label="类别ID：">
          <el-input v-model="form.id" clearable />
        </el-form-item>
        <el-form-item label="类别名称：">
          <el-input v-model="form.classifyName" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="width: 100%;padding-left: 20px;padding-bottom: 20px">
      <el-button type="primary" @click="handleAddClassify">添加课程类别</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column label="类别ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="类别名称" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.classifyName }}
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.descr }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑课程类别':'添加课程类别'">
      <el-form :model="classify" label-width="100px" label-position="left">
        <el-form-item label="类别名称：">
          <el-input v-model="classify.classifyName" placeholder="不可与已有类别名称重复" />
        </el-form-item>
        <el-form-item label="类别描述：">
          <el-input v-model="classify.descr" placeholder="请输入类别描述" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmClassify">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllClassify, addClassify, updateClassify, getClassify } from '@/api/course'

export default {
  name: 'Classify',
  data() {
    return {
      form: {
        id: '',
        classifyName: ''
      },
      classify: {
        id: '',
        descr: '',
        classifyName: ''
      },
      dialogVisible: false,
      dialogType: 'new',
      classifyId: undefined,
      tableData: []
    }
  },
  created() {
    this.getAllClassify()
  },
  methods: {
    async getAllClassify() {
      const res = await getAllClassify()
      this.tableData = res.result
    },
    handleAddClassify() {
      this.classify.classifyName = ''
      this.classify.descr = ''
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    async confirmClassify() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        if (!this.classify.classifyName || this.classify.classifyName.trim() === '') {
          this.$notify({
            title: '警告',
            message: '请输入类别名称',
            type: 'warning'
          })
        } else if (!this.classify.descr || this.classify.descr.trim() === '') {
          this.$notify({
            title: '警告',
            message: '请输入类别描述',
            type: 'warning'
          })
        } else {
          await updateClassify(this.classify)
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.dialogVisible = false
          for (let index = 0; index < this.tableData.length; index++) {
            if (this.tableData[index].id === this.classify.id) {
              this.tableData[index].classifyName = this.classify.classifyName
              this.tableData[index].descr = this.classify.descr
            }
          }
        }
      } else {
        if (!this.classify.classifyName || this.classify.classifyName.trim() === '') {
          this.$notify({
            title: '警告',
            message: '请输入类别名称',
            type: 'warning'
          })
        } else if (!this.classify.descr || this.classify.descr.trim() === '') {
          this.$notify({
            title: '警告',
            message: '请输入类别描述',
            type: 'warning'
          })
        } else {
          const { result } = await addClassify(this.classify)
          this.classify.id = result.id
          this.classify.descr = result.descr
          this.classify.classifyName = result.classifyName
          this.tableData.push(this.classify)
          const { descr, classifyName } = this.classify
          this.dialogVisible = false
          this.$notify({
            title: '添加成功',
            dangerouslyUseHTMLString: true,
            message: `
            <div>类别名称: ${classifyName}</div>
            <div>类别描述: ${descr}</div>`,
            type: 'success'
          })
        }
      }
    },
    async onSubmit() {
      if (this.form.id === '') {
        this.form.id = undefined
      }
      if (this.form.classifyName === '') {
        this.form.classifyName = undefined
      }
      var res = await getClassify(this.form)
      this.tableData = res.result
    },
    async edit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.classify.classifyName = scope.row.classifyName
      this.classify.descr = scope.row.descr
      this.classify.id = scope.row.id
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

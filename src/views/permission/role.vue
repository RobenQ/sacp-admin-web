<template>
  <div class="app-container">
    <!--    角色-->
    <el-button type="primary" @click="handleAddRole">创建角色</el-button>
    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border height="400">
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="表达式">
        <template slot-scope="scope">
          {{ scope.row.expression }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间">
        <template slot-scope="scope">
          {{ scope.row.modifyTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="warning" size="small" @click="handleEditPermission(scope)">权限</el-button>
          <!--          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'创建角色'">
      <el-form :model="role" label-width="70px" label-position="left">
        <el-form-item label="名称：">
          <el-input v-model="role.roleName" placeholder="不可与已有角色名称重复" />
        </el-form-item>
        <el-form-item label="表达式：">
          <el-input v-model="role.expression" placeholder="请输入角色表达式" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确认</el-button>
      </div>
    </el-dialog>

    <!--    权限-->
    <el-button type="primary" style="margin-top: 50px" @click="handleAddPermission">创建权限</el-button>
    <el-table :data="permissions" style="width: 100%;margin-top:30px;" border height="550">
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.permissionName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="表达式">
        <template slot-scope="scope">
          {{ scope.row.expression }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间">
        <template slot-scope="scope">
          {{ scope.row.modifyTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit2(scope)">编辑</el-button>
          <!--          <el-button type="danger" size="small" @click="handleDelete2(scope)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible2" :title="dialogType2==='edit'?'编辑权限':'创建权限'">
      <el-form :model="permission" label-width="70px" label-position="left">
        <el-form-item label="名称：">
          <el-input v-model="permission.permissionName" placeholder="不可与已有权限名称重复" />
        </el-form-item>
        <el-form-item label="表达式：">
          <el-input v-model="permission.expression" placeholder="请输入权限表达式" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible2=false">取消</el-button>
        <el-button type="primary" @click="confirmPermission">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog id="dialog3" title="修改角色权限" :visible.sync="transferVisible" width="41%">
      <el-transfer
        v-model="value"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入权限名称"
        :data="data"
        :titles="titles"
      />
      <div style="text-align:center;margin-top: 20px">
        <el-button type="danger" @click="transferVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRolePermission">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getRoutes, getRoles, getPermissions, addRole, addPermission, deleteRole, deletePermission, updateRole, updatePermission, getRolePermissions, confirmRolePermission } from '@/api/role'

export default {
  data() {
    return {
      roleId: undefined,
      titles: ['新权限', '已有权限'],
      data: [],
      value: [],
      filterMethod(query, item) {
        return item.permission.indexOf(query) > -1
      },
      role: {
        id: '',
        roleName: '',
        expression: '',
        modifyTime: ''
      },
      permission: {
        id: '',
        permissionName: '',
        expression: '',
        modifyTime: ''
      },
      routes: [],
      rolesList: [],
      permissions: [],
      dialogVisible: false,
      dialogVisible2: false,
      transferVisible: false,
      dialogType: 'new',
      dialogType2: 'new',
      checkStrictly: false,
      checkStrictly2: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    // this.getRoutes()
    this.getRoles()
    this.getPermissions()
  },
  methods: {
    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data
      this.routes = this.generateRoutes(res.data)
    },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.result
    },
    async getPermissions() {
      const res = await getPermissions()
      this.permissions = res.result
    },

    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title

        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role.roleName = ''
      this.role.expression = ''
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleAddPermission() {
      this.permission.permissionName = ''
      this.permission.expression = ''
      this.dialogType2 = 'new'
      this.dialogVisible2 = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    handleEdit2(scope) {
      this.dialogType2 = 'edit'
      this.dialogVisible2 = true
      this.checkStrictly2 = true
      this.permission = deepClone(scope.row)
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly2 = false
      })
    },
    async handleEditPermission({ $index, row }) {
      // this.$notify({
      //   title: '提示',
      //   message: '暂不支持该功能!',
      //   type: 'warning'
      // })
      const roleId = row.id
      this.roleId = row.id
      this.data = []
      this.value = []
      const res = await getRolePermissions(roleId)
      const res2 = await getPermissions()
      const have = res.result.result.have
      const all = res2.result
      this.data = []
      for (var i = 0; i < all.length; i++) {
        this.data.push({
          label: all[i].permissionName,
          key: all[i].id,
          permission: all[i].permissionName
        })
      }
      for (var j = 0; j < have.length; j++) {
        this.value.push(have[j].id)
      }
      this.transferVisible = true
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除这个角色吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.id)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        })
        .catch(err => { console.error(err) })
    },
    handleDelete2({ $index, row }) {
      this.$confirm('确定删除这个权限吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deletePermission(row.id)
          this.permissions.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        })
        .catch(err => { console.error(err) })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        if (!this.role.roleName || this.role.roleName.trim() === '') {
          this.$notify({
            title: '警告',
            message: '请输入角色名称',
            type: 'warning'
          })
        } else if (!this.role.expression || this.role.expression.trim() === '') {
          this.$notify({
            title: '警告',
            message: '请输入角色描述',
            type: 'warning'
          })
        } else {
          await updateRole(this.role)
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.dialogVisible = false
          for (let index = 0; index < this.rolesList.length; index++) {
            if (this.rolesList[index].id === this.role.id) {
              this.rolesList[index].roleName = this.role.roleName
              this.rolesList[index].expression = this.role.expression
              this.rolesList[index].modifyTime = this.role.modifyTime
            }
          }
        }
      } else {
        if (!this.role.roleName || this.role.roleName.trim() === '') {
          this.$notify({
            title: '警告',
            message: '请输入角色名称',
            type: 'warning'
          })
        } else if (!this.role.expression || this.role.expression.trim() === '') {
          this.$notify({
            title: '警告',
            message: '请输入角色描述',
            type: 'warning'
          })
        } else {
          const { result } = await addRole(this.role)
          this.role = result
          this.rolesList.push(result)
          const { expression, roleName } = this.role
          this.dialogVisible = false
          this.$notify({
            title: '添加成功',
            dangerouslyUseHTMLString: true,
            message: `
            <div>角色名称: ${roleName}</div>
            <div>表达式: ${expression}</div>`,
            type: 'success'
          })
        }
      }
    },
    async confirmPermission() {
      const isEdit = this.dialogType2 === 'edit'

      if (isEdit) {
        if (!this.permission.permissionName || this.permission.permissionName.trim() === '') {
          this.$notify({
            title: '警告',
            message: '请输入权限名称',
            type: 'warning'
          })
        } else if (!this.permission.expression || this.permission.expression.trim() === '') {
          this.$notify({
            title: '警告',
            message: '请输入权限描述',
            type: 'warning'
          })
        } else {
          await updatePermission(this.permission)
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.dialogVisible2 = false
          for (let index = 0; index < this.permissions.length; index++) {
            if (this.permissions[index].id === this.permission.id) {
              this.permissions[index].permissionName = this.permission.permissionName
              this.permissions[index].expression = this.permission.expression
              this.permissions[index].modifyTime = this.permission.modifyTime
            }
          }
        }
      } else {
        if (!this.permission.permissionName || this.permission.permissionName.trim() === '') {
          this.$notify({
            title: '警告',
            message: '请输入权限名称',
            type: 'warning'
          })
        } else if (!this.permission.expression || this.permission.expression.trim() === '') {
          this.$notify({
            title: '警告',
            message: '请输入权限描述',
            type: 'warning'
          })
        } else {
          const { result } = await addPermission(this.permission)
          this.permission = result
          this.permissions.push(result)
          const { expression, permissionName } = this.permission
          this.dialogVisible2 = false
          this.$notify({
            title: '添加成功',
            dangerouslyUseHTMLString: true,
            message: `
            <div>权限名称: ${permissionName}</div>
            <div>表达式: ${expression}</div>`,
            type: 'success'
          })
        }
      }
    },
    async confirmRolePermission() {
      await confirmRolePermission({ 'permissions': this.value, 'roleId': this.roleId })
      this.$message({
        type: 'success',
        message: '修改成功！'
      })
      this.transferVisible = false
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>

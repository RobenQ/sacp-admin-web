<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
    <div class="img-wrap">
      <el-image
        style="width: 500px; height: 400px"
        src="http://sacp.moeneko.top/home"
        :fit="fit"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>

<style scoped>
.img-wrap{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #E3E3E3;
}
</style>

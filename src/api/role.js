import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/getallrole',
    method: 'get'
  })
}

export function getPermissions() {
  return request({
    url: '/getallpermission',
    method: 'get'
  })
}

export function getRolePermissions(roleId) {
  return request({
    url: '/getrolepermission',
    method: 'get',
    params: { roleId }
  })
}

export function confirmRolePermission(data) {
  return request({
    url: '/confirmrolepermission',
    method: 'post',
    data
  })
}

export function addPermission(data) {
  return request({
    url: '/addpermission',
    method: 'post',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/addrole',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: `/updaterole`,
    method: 'post',
    data
  })
}

export function updatePermission(data) {
  return request({
    url: `/updatepromission`,
    method: 'post',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/deleterole`,
    method: 'get',
    params: { id }
  })
}

export function deletePermission(id) {
  return request({
    url: `/deletepermission`,
    method: 'get',
    params: { id }
  })
}

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  roles: state => state.permission.roles,
  tableHeight: state => state.settings.tableHeight,
}
export default getters

function postTransformNode(el) {
  if (el.attrs) {
    el.attrs = el.attrs.filter(({ name }) => name !== 'data-test')
  }
  if (Array.isArray(el.children)) {
    el.children.map(postTransformNode)
  }
}

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.modules = {
          ...options.modules,
          postTransformNode
        }
        return options
      })
  }
}

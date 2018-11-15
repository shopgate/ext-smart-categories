
module.exports = async (context, input) => {
  if (!context.config.smartCategories) {
    return input
  }
  context.config.smartCategories.forEach(categoryConfig => {
    let category = {
      id: categoryConfig.id,
      name: categoryConfig.name,
      parent: {
        id: null,
        name: 'Default-Kategorie'
      },
      path: categoryConfig.name,
      description: categoryConfig.description || '',
      imageUrl: categoryConfig.imageUrl || '',
      externalUrl: categoryConfig.externalUrl || '',
      sort: 1,
      productCount: 1,
      childrenSort: 'manual',
      childrenCount: 0,
      children: []
    }
    if (categoryConfig.beforeId) {
      const index = input.categories.findIndex(c => c.id === categoryConfig.beforeId)
      input.categories.splice(index, 0, category)
    } else if (categoryConfig.afterId) {
      const index = input.categories.findIndex(c => c.id === categoryConfig.afterId)
      input.categories.splice(index + 1, 0, category)
    } else {
      input.categories.push(category)
    }
  })

  return input
}

'use strict'

module.exports = async ({ config }, { categories }) => {
  if (!config.smartCategories) {
    return
  }

  const result = { categories: [ ...categories ] }
  config.smartCategories
    .filter(categoryConfig => categoryConfig.showInCategoryTree !== false)
    .forEach(categoryConfig => {
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
        const index = result.categories.findIndex(c => c.id === categoryConfig.beforeId)
        result.categories.splice(index, 0, category)
      } else if (categoryConfig.afterId) {
        const index = result.categories.findIndex(c => c.id === categoryConfig.afterId)
        result.categories.splice(index + 1, 0, category)
      } else {
        result.categories.push(category)
      }
    })

  return result
}

'use strict'

module.exports = async ({ config }, { smartCategoryId }) => {
  if (!config.smartCategories) {
    return
  }

  const categoryConfig = config.smartCategories.find(c => c.id === smartCategoryId)
  if (!categoryConfig) {
    return
  }

  return {
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
}

'use strict'

module.exports = async ({ config }, { categoryId }) => {
  if (!config.smartCategories) {
    return
  }

  const categoryConfig = config.smartCategories.find(c => c.id === categoryId)
  if (!categoryConfig) {
    return
  }

  return {
    categoryId: null,
    smartCategoryId: categoryId
  }
}

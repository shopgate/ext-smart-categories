
module.exports = async (context, input) => {
  if (input.categoryId && context.config.smartCategories) {
    const smartCategory = context.config.smartCategories.find(category => category.id === input.categoryId)
    if (smartCategory) {
      return {
        categoryId: null,
        filters: smartCategory.filters
      }
    }
  }
  return input
}

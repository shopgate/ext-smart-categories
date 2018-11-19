
module.exports = async (context, input) => {
  if (input.categoryId && context.config.smartCategories) {
    const smartCategory = context.config.smartCategories.find(category => category.id === input.categoryId)
    if (!smartCategory) {
      return input
    }
    const result = {
      categoryId: null,
    }
    if (smartCategory.searchPhrase) {
      result.searchPhrase = smartCategory.searchPhrase;
    }
    if (smartCategory.filters) {
      result.filters = input.filters || {}
      result.filters = { ...result.filters, ...smartCategory.filters };
    }
    if (smartCategory.productIds) {
      result.productIds = smartCategory.productIds;
      result.sort = null
    }
    
    return result
  }
}

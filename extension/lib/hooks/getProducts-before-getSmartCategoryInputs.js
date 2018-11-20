
module.exports = async (context, input) => {
  if (!input.categoryId || !context.config.smartCategories) {
    return input
  }
  
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
    result.filters = { ...smartCategory.filters, ...result.filters }
  }
  if (smartCategory.productIds) {
    result.productIds = smartCategory.productIds;
    result.sort = null
  }
  
  console.log('result: ', result)
  
  return result
}

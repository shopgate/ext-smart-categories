
module.exports = async (context, input) => {
  if (!input.categoryId || !context.config.smartCategories) {
    return
  }

  const smartCategory = context.config.smartCategories.find(category => category.id === input.categoryId)
  if (!smartCategory) {
    return
  }

  const result = {
    categoryId: null
  }
  if (smartCategory.searchPhrase) {
    result.searchPhrase = smartCategory.searchPhrase;
  } else if (!input.searchPhrase && !input.filters) {
    // We can't override the "filters" input of the getFilters pipeline in this hook,
    // because "filters" is both in the input and output of the pipeline, but with different IDs.
    // So in case, we have just a categoryId in the input, let's just get all filters.
    result.searchPhrase = '*'
  }

  return result
}

const chai = require('chai')

const getSmartCategoryFilters = require('./../../lib/getSmartCategoryFilters')

describe('getSmartCategoryFilters', async () => {
  const context = {
    config: {
      smartCategories: [
        {
          id: 'smartSale',
          name: 'SALE',
          description: 'All products that are on sale',
          imageUrl: 'http://www.example.com/img/sale.png',
          externalUrl: 'https://www.example.com/sale/',
          filters: [{
            discount: '{1,0}'
          }]
        },
        {
          id: 'smartMicrosoft',
          name: 'Microsoft',
          description: 'All products from Microsoft',
          imageUrl: 'http://www.example.com/img/microsoft.png',
          externalUrl: 'https://www.example.com/microsoft/',
          filters: [{
            values: ['Microsoft'],
            source: 'manufacturer'
          }]
        },
        {
          id: 'smartUnder10',
          name: 'under 10€',
          filters: [{
            maximum: 10,
            source: 'display_amount'
          }]
        }
      ]
    }
  }

  it('should remove categoryId if it corresponds to a smart category and add the corresponding filters', async () => {
    for (var i = 0; i < context.config.smartCategories.length; i++) {
      const result = await getSmartCategoryFilters(context, { categoryId: context.config.smartCategories[i].id })
      chai.assert.isNull(result.categoryId)
      chai.assert.deepEqual(result.filters, context.config.smartCategories[i].filters)
    }
  })

  it("should pass through the categoryId if it's not a smart category ", async () => {
    const result = await getSmartCategoryFilters(context, { categoryId: 'someNonSmartCategoryId' })
    chai.assert.deepEqual(result.categoryId, 'someNonSmartCategoryId')
    chai.assert.isUndefined(result.filters)
  })

  it('should not fail if there is no smartCategories configuration ', async () => {
    let input = { categoryId: 'someId' }
    const result = await getSmartCategoryFilters({ config: {} }, input)
    chai.assert.deepEqual(result, input)
  })
})

const chai = require('chai')

const setSmartCategoryFilters = require('../../../lib/hooks/getProducts-before-setSmartCategoryInputs')

describe('setSmartCategoryFilters', async () => {
  const context = {
    config: {
      smartCategories: [
        {
          id: 'smartSale',
          name: 'SALE',
          description: 'All products that are on sale',
          imageUrl: 'http://www.example.com/img/sale.png',
          externalUrl: 'https://www.example.com/sale/',
          filters: {
            only_discounted: true
          }
        },
        {
          id: 'smartMicrosoft',
          name: 'Microsoft',
          description: 'All products from Microsoft',
          imageUrl: 'http://www.example.com/img/microsoft.png',
          externalUrl: 'https://www.example.com/microsoft/',
          filters: {
            Marke: {
              values: ['Microsoft'],
              source: 'manufacturer'
            }
          }
        },
        {
          id: 'smartUnder10',
          name: 'under 10€',
          filters: {
            display_amount: {
              maximum: 10,
              source: 'display_amount'
            }
          }
        },
        {
          id: 'led',
          name: 'smart: search for LED',
          searchPhrase: 'LED'
        },
        {
          id: 'productIds',
          name: 'smart: Product IDs',
          productIds: [
            '9624050',
            '6520221',
            '6089108'
          ]
        }
      ]
    }
  }

  it('should remove categoryId if it corresponds to a smart category and add the corresponding filters', async () => {
    for (var i = 0; i < context.config.smartCategories.length; i++) {
      const result = await setSmartCategoryFilters(context, { categoryId: context.config.smartCategories[i].id })
      chai.assert.isNull(result.categoryId)
      chai.assert.deepEqual(result.filters, context.config.smartCategories[i].filters)
      chai.assert.deepEqual(result.searchPhrase, context.config.smartCategories[i].searchPhrase)
      chai.assert.deepEqual(result.productIds, context.config.smartCategories[i].productIds)
    }
  })

  it("should not pass through the categoryId if it's not a smart category ", async () => {
    const result = await setSmartCategoryFilters(context, { categoryId: 'someNonSmartCategoryId' })
    chai.assert.isUndefined(result)
  })

  it('should not fail if there is no smartCategories configuration ', async () => {
    let input = { categoryId: 'someId' }
    const result = await setSmartCategoryFilters({ config: {} }, input)
    chai.assert.isUndefined(result)
  })
})

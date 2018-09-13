const chai = require('chai')

const addSmartCategories = require('./../../lib/addSmartCategories')

describe('addSmartCategories', async () => {
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
          }],
          afterId: '2'
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
          }],
          beforeId: '5'
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

  it('should insert the smart categories at the correct positions', async () => {
    const result = await addSmartCategories(context, { categories: [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
      { id: '5' },
      { id: '6' },
      { id: '7' }
    ] })
    chai.assert.deepEqual(result.categories, [
      { id: '1' },
      { id: '2' },
      {
        id: 'smartSale',
        name: 'SALE',
        parent: { id: null, name: 'Default-Kategorie' },
        path: 'SALE',
        description: 'All products that are on sale',
        imageUrl: 'http://www.example.com/img/sale.png',
        externalUrl: 'https://www.example.com/sale/',
        sort: 1,
        productCount: 1,
        childrenSort: 'manual',
        childrenCount: 0,
        children: []
      },
      { id: '3' },
      { id: '4' },
      {
        id: 'smartMicrosoft',
        name: 'Microsoft',
        parent: { id: null, name: 'Default-Kategorie' },
        path: 'Microsoft',
        description: 'All products from Microsoft',
        imageUrl: 'http://www.example.com/img/microsoft.png',
        externalUrl: 'https://www.example.com/microsoft/',
        sort: 1,
        productCount: 1,
        childrenSort: 'manual',
        childrenCount: 0,
        children: []
      },
      { id: '5' },
      { id: '6' },
      { id: '7' },
      {
        id: 'smartUnder10',
        name: 'under 10€',
        parent: { id: null, name: 'Default-Kategorie' },
        path: 'under 10€',
        description: '',
        imageUrl: '',
        externalUrl: '',
        sort: 1,
        productCount: 1,
        childrenSort: 'manual',
        childrenCount: 0,
        children: []
      }
    ])
  })

  it('should not fail if there is no smartCategories configuration ', async () => {
    const input = { categories: [{ id: '1' }, { id: '2' }] }
    const result = await addSmartCategories({ config: {} }, input)
    chai.assert.deepEqual(result, input)
  })
})

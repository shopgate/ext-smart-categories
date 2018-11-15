# Shopgate Connect - Smart Categories Extension

[![GitHub license](http://dmlc.github.io/img/apache2.svg)](LICENSE)
[![Build Status](https://travis-ci.org/shopgate/ext-smart-categories.svg?branch=master)](https://travis-ci.org/shopgate/ext-smart-categories)
[![Coverage Status](https://coveralls.io/repos/github/shopgate/ext-smart-categories/badge.svg?branch=master)](https://coveralls.io/github/shopgate/ext-smart-categories?branch=master)

Adds support for smart categories, like a "sale" category that automatically contains all products that are on sale for example.

## Configuration

Set the following values in your Shopgate Connect Admin:
* `smartCategories` - (array of objects) each containing the following properties
  * `id` - (text/number, required) Unique ID for the category.
  * `name` - (text, required) Name of the category that will be shown to the end user.
  * `filters` - (object, required) The filters in CloudSearch syntax.
  * `description` - (text, optional) Not diplayed anywhere atm. Just for documentary purposes.
  * `imageUrl` - (text, optional) Link to the category image.
  * `externalUrl` - (text, optional)  Link to the category in the desktop shop.

### Examples

#### All products that are currently on sale:
```json
{
  "smartCategories": [
    {
      "id": "Sale",
      "name": "SALE",
      "filters": {
        "only_discounted": true
      }
    }
  ]
}
```

#### All products from manufacturer "Microsoft":
```json
{
  "smartCategories": [
    {
      "id": "smartMicrosoft",
      "name": "Microsoft",
      "filters": {
        "Marke": {
          "source": "manufacturer",
          "values": ["Microsoft"]
        }
      }
    }
  ]
}

```

#### All products with the property Energieeffizienzklasse = B":
```json
{
  "smartCategories": [
    {
      "id": "smartEnergieeffizienzklasseB",
      "name": "Energieeffizienzklasse B",
      "filters": {
        "Energieeffizienzklasse": {
          "source": "properties",
          "values": ["B"]
        }
      }
    }
  ]
}
```

#### All products under 10€":
```json
{
  "smartCategories": [
    {
      "id": "smartUnder10",
      "name": "Under 10€",
      "filters": {
        "display_amount": {
          "maximum": 1000,
          "minimum": 0
        }
      }
    }
  ]
}
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) file for more information.

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) file for more information.

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License

This extension is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE) file for more information.

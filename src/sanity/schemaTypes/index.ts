// sanity/schema.ts
import { SchemaTypeDefinition } from 'sanity'
import product from '../schemaTypes/product'  // Import your product schema

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product, // Add the product schema here
    // You can add other schemas like 'category', 'author', etc. here
  ],
}

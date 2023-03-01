

import { baseSchema, Schema } from './base/base.schema';




export const SubSampleSchema = Schema(
  {
    string: { type: String },
    number: { type: Number }
  },
  {
    collection: 'subSamples'
  },
  baseSchema
)

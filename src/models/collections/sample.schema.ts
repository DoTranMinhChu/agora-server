

import { mongoose } from '../base.mongo';
import { baseSchema, Schema } from './base/base.schema';




export const SampleSchema = Schema(
  {
    string: { type: String },
    number: { type: Number },
    subSamples: [{
      type: mongoose.Types.ObjectId,
      ref: 'subSamples'
    }]
  },
  {
    collection: 'samples'
  },
  baseSchema
)

import mongoose, { Document, Schema } from 'mongoose';

export interface IWatch extends Document {
  brand: string;
  model: string;
  reference: string;
  price: number;
  movement: string;
  caseSize: number;
  waterResistance: number;
  images: string[];
  specifications: {
    case: string;
    dial: string;
    bracelet: string;
  };
  reviews: {
    userId: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const watchSchema = new Schema<IWatch>(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    reference: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    movement: {
      type: String,
      required: true,
      trim: true,
    },
    caseSize: {
      type: Number,
      required: true,
      min: 0,
    },
    waterResistance: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [{
      type: String,
      required: true,
    }],
    specifications: {
      case: {
        type: String,
        required: true,
      },
      dial: {
        type: String,
        required: true,
      },
      bracelet: {
        type: String,
        required: true,
      },
    },
    reviews: [{
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
watchSchema.index({ brand: 1, model: 1 });
watchSchema.index({ price: 1 });
watchSchema.index({ movement: 1 });
watchSchema.index({ 'specifications.case': 1 });
watchSchema.index({ 'specifications.dial': 1 });
watchSchema.index({ 'specifications.bracelet': 1 });

export const Watch = mongoose.model<IWatch>('Watch', watchSchema); 
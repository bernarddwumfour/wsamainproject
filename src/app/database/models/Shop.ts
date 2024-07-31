import { model, models, Schema, Document, Types } from 'mongoose';  

export interface IShop extends Document {
    name: string;
    address: string;
    products: Types.ObjectId[];  // Array of ObjectIds referencing the Listings model
    owner: string;
}

const ShopSchema = new Schema<IShop>(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Listings'
            }
        ],
        owner: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            versionKey: false,
            virtuals: true,
            transform: (_, ret) => {
                delete ret._id;
            },
        },
    },
);

const Shop = models.Shop || model<IShop>('Shop', ShopSchema);
export default Shop;

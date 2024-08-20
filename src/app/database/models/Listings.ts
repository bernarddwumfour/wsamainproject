import { model, models, Schema, Types } from 'mongoose';  
  
export interface IListings {  
    name: string;  
    description: string;  
    price: number;  
    stock: number;  
    image : string;
    shop: Types.ObjectId;
}  
const ListingsSchema = new Schema<IListings>(  
    {  
        name: {
          type: String,
          required: true
        },  
        description:  {
          type: String,
          required: true
        },  
        price:  {
          type: Number,
          required: true
        },  
        stock:  {
          type: Number,
          required: true
        },  
        image: {  
          type: String,
          required: true
        },
        shop: {
          type: Schema.Types.ObjectId,
          ref: 'Shop',
          required: true  // Ensure each listing is associated with a shop
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
const Listings = models.Listings || model('Listings', ListingsSchema);  
export default Listings;

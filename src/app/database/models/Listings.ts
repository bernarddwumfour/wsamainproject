import { model, models, Schema } from 'mongoose';  
  
export interface IListings {  
    name: string;  
    description: string;  
    price: number;  
    image : string;
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
        image: {  
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
const Listings = models.Listings || model('Listings', ListingsSchema);  
export default Listings;

import connectMongo from "@/app/database/db"
import Listings from "@/app/database/models/Listings"
import { NextResponse } from "next/server"

export async function GET() {
    try {
      await connectMongo();
  
      const listings = await Listings.find();
  
      if (listings && listings.length > 0) {
        return NextResponse.json({ listings }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'No listings found' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }``
  }

export async function POST(request: Request) {
  try {
    const { name,price,description,image } = await request.json();

    if (!(name && price && description && image)) {
      return NextResponse.json({ message: 'Invalid product data' }, { status: 400 });
    }

    await connectMongo();
    const listing = await Listings.create({
        name,
        price,
        description,
        image
    });

    if (listing) {
      return NextResponse.json({ message: 'Listing created successfully' }, { status: 201 });
    } else {
      return NextResponse.json({ message: 'Listing creation failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
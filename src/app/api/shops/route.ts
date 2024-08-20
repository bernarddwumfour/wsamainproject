import connectMongo from "@/app/database/db"
import Shop from "@/app/database/models/Shop";
import { NextResponse } from "next/server"

export async function GET() {
    try {
      await connectMongo();
  
      const shops = await Shop.find();
  
      if (shops && shops.length > 0) {
        return NextResponse.json({ shops }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'No shops found' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }``
  }


  export async function POST(request: Request) {
    try {
      const { name, address , owner } = await request.json();
  
      if (!(name && address && owner)) {
        return NextResponse.json({ message: 'Invalid shop data' }, { status: 400 });
      }
  
      await connectMongo();
      const shop = await Shop.create({
          name,
          address,
          owner
      });
  
      if (shop) {
        return NextResponse.json({ message: 'shop created successfully' }, { status: 201 });
      } else {
        return NextResponse.json({ message: 'shop creation failed' }, { status: 500 });
      }
    } catch (error) {
      console.error('Error creating shop:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
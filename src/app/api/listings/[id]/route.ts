import connectMongo from "@/app/database/db"
import Listings from "@/app/database/models/Listings"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
      await connectMongo();
  
      const listing = await Listings.findById(params.id);
  
      if (!listing) {
        return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
      }
  
      return NextResponse.json({ listing }, { status: 200 });
    } catch (error) {
      console.error('Error retrieving listing:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }




  export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
      await connectMongo();
  
      const { product } = await request.json();
      const listing = await Listings.findByIdAndUpdate(params.id, product, { new: true });
  
      if (!listing) {
        return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Listing updated successfully', listing }, { status: 200 });
    } catch (error) {
      console.error('Error updating listing:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }


  

  export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
      await connectMongo();
  
      const listing = await Listings.findByIdAndDelete(params.id);
  
      if (!listing) {
        return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Listing deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error deleting listing:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
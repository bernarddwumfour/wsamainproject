import { NextResponse } from "next/server"

export async function GET(){

    let listings  = [
        {name : "Item 1",price :300, image  : "image 1"},
        {name : "Item 2",price :300, image  : "image 2"},
        {name : "Item 3",price :300, image  : "image 3"},
        {name : "Item 4",price :300, image  : "image 4"},
    ]
    
    // let listings = listings()

    return NextResponse.json({listings})
}
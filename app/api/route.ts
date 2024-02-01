import { NextResponse } from "next/server";

export const GET = () => {
  try {
    return NextResponse.json("App starting");
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 })
  }
}
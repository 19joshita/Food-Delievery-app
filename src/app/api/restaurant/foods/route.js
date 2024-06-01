import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    const foods = await foodSchema.find();

    return NextResponse.json({ foods, success: true });
  } catch (error) {
    console.error("Error processing request:", error.message);
    return NextResponse.json(
      { error: "Failed to process request", success: false },
      { status: 500 }
    );
  }
};
export const POST = async (request) => {
  try {
    const payload = await request.json();

    if (!mongoose.connection.readyState) {
      await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    const food = new foodSchema(payload);
    const result = await food.save();

    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Error saving food:", error);
    return NextResponse.json(
      { error: "Failed to save food", success: false },
      { status: 500 }
    );
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  }
};

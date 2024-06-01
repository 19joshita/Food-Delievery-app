import mongoose from "mongoose";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";

mongoose.set("strictQuery", true);

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connectionStr);
  }
};
// CORS handler
const setCorsHeaders = (res) => {
  res.headers.append("Access-Control-Allow-Origin", "*");
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
};
// GET request handler
export const GET = async () => {
  await connectDB();
  try {
    const data = await restaurantSchema.find();
    console.log("data", data);
    // setCorsHeaders(data);
    return NextResponse.json({ result: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
};

// POST request handler
export const POST = async (req) => {
  await connectDB();
  try {
    const payload = await req.json();
    let result;
    let success = false;
    if (payload.login) {
      //use it for login api
      result = await restaurantSchema.findOne({
        email: payload.email,
        password: payload.password,
      });
      if (result) {
        success = true;
      }
    } else {
      // use it for sign up
      const restaurant = new restaurantSchema(payload);
      result = await restaurant.save();
      if (result) {
        success = true;
      }
    }
    return NextResponse.json({
      message: "Restaurant created successfully",
      result,
      success: true,
    });
    setCorsHeaders(restaurant);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return NextResponse.json(
      { error: "Failed to create restaurant" },
      { status: 500 }
    );
  }
};

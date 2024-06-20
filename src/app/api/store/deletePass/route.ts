import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Password from "@/models/passwordModel";
import dbconnect from "@/db/dbconnect";
import jwt, { JwtPayload } from "jsonwebtoken";

dbconnect();
export async function DELETE(request: NextRequest) {
  try {
    const { key } = await request.json();
    if (key == null || key.trim() == "") {
      return NextResponse.json(
        { message: "Key cannot be empty" },
        { status: 400 }
      );
    }
    const token = request.cookies.get("token")?.value || "";
    if (token == "")
      return NextResponse.json(
        { message: "No Token Provided" },
        { status: 401 }
      );
    const data = jwt.decode(token) as JwtPayload;
    const userId = data.userID;
    const user = await User.findOne({ _id: userId });
    if (!user)
      return NextResponse.json(
        { message: "Invalid Token Provided" },
        { status: 401 }
      );
    const updatedKey = key.toLowerCase();
    const storeData = await Password.findOne({ user, key: updatedKey });
    if (!storeData)
      return NextResponse.json(
        { message: "No such key found!" },
        { status: 400 }
      );
    await Password.findOneAndDelete({
      user,
      key: updatedKey,
    });
    return NextResponse.json({ message: "Password Deleted!" });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error!!" },
      { status: 500 }
    );
  }
}

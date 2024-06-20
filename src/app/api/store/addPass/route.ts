import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import dbconnect from "@/db/dbconnect";
import jwt, { JwtPayload } from "jsonwebtoken";
import Password from "@/models/passwordModel";
import Cryptr from "cryptr";
dbconnect();
export async function POST(request: NextRequest) {
  const { key, username, password } = await request.json();
  if (
    username == null ||
    username.trim() == "" ||
    password == null ||
    password.trim() == "" ||
    key == null ||
    key.trim() == ""
  ) {
    return NextResponse.json(
      { message: "Username, Key or Password cannot be empty" },
      { status: 400 }
    );
  }
  const token = request.cookies.get("token")?.value || "";
  if (token == "")
    return NextResponse.json({ message: "No Token Provided" }, { status: 401 });
  const data = jwt.decode(token) as JwtPayload;
  const userId = data.userID;
  const user = await User.findOne({ _id: userId });
  if (!user)
    return NextResponse.json(
      { message: "Invalid Token Provided" },
      { status: 401 }
    );
  const updatedKey = key.toLowerCase();
  const cryptr = new Cryptr(updatedKey + process.env.CRYPTR_KEY);
  const enryptedUser = cryptr.encrypt(username);
  const encryptedPass = cryptr.encrypt(password);
  const alreadyExist = await Password.findOne({ user, key: updatedKey });
  if (alreadyExist) {
    return NextResponse.json(
      { message: "Cannot add with same key: " + key },
      { status: 401 }
    );
  }
  const newStore = await Password.create({
    username: enryptedUser,
    password: encryptedPass,
    user,
    key: updatedKey,
  });

  return NextResponse.json({ message: "Key Added Successfully" });
}

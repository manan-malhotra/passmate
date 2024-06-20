import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";
  if (token == "")
    return NextResponse.json({ message: "No Token Provided" }, { status: 401 });
  const response = NextResponse.json({ message: "Logged out!" });
  response.cookies.delete("token");
  return response;
}

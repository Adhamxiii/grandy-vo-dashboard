import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const contacts = await prisma.contact.findMany();
  return new Response(JSON.stringify(contacts), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let body: Record<string, string> = {};

    if (contentType.includes("application/json")) {
      body = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        body[key] = value.toString();
      });
    }

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    });

    const response = NextResponse.json(contact);

    // Add CORS headers to allow requests from any origin
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;

  } catch (error) {
    console.error("Error handling form submission:", error);
    const response = NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );

    // Add CORS headers to error response as well
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}
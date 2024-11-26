import { PrismaClient } from "@prisma/client";

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
  const { name, email, message } = await request.json();

  const newMessage = await prisma.contact.create({
    data: {
      name,
      email,
      message,
    },
  });

  return new Response(JSON.stringify(newMessage), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

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
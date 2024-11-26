import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const projects = await prisma.project.findMany();
    return new Response(JSON.stringify(projects), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const project = await prisma.project.create({
        data: body,
    });
    return new Response(JSON.stringify(project), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function PUT(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const { title, description, videoUrl, duration } = await req.json();

    if (!id) {
        return new Response('Project ID is required', { status: 400 });
    }

    const project = await prisma.project.update({
        where: {
            id
        },
        data: {
            title,
            description,
            videoUrl,
            duration,
        },
    });

    return new Response(JSON.stringify(project), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        console.log("ID to delete:", id);

        if (!id) {
            return new Response("Project ID is required", { status: 400 });
        }

        const project = await prisma.project.delete({
            where: {
                id,
            },
        });

        return new Response(JSON.stringify(project), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("DELETE Error:", error);
        return new Response("Failed to delete project", { status: 500 });
    }
}

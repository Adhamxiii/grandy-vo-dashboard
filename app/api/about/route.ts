import { prisma } from "@/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function withCORS(response: Response) {
  return new Response(response.body, {
    ...response,
    headers: { ...response.headers, ...corsHeaders },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { content, images, numberOfClients, voiceStyles, language } = body;

  if (!content || !images.length) {
    return new Response("Invalid request", { status: 400 });
  }

  const about = await prisma.about.create({
    data: {
      content,
      imageUrl: images[0],
      imageUrl2: images[1],
      clients: numberOfClients,
      voiceStyles: voiceStyles,
      language: language,
    },
  });

  return withCORS(
    new Response(JSON.stringify(about), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  );
}

export async function GET() {
  try {
    const about = await prisma.about.findFirst();

    if (!about) {
      return new Response("About not found", { status: 404 });
    }

    return withCORS(
      new Response(JSON.stringify(about), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
  } catch (error) {
    console.error("Error fetching about data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { content, images, numberOfClients, voiceStyles, language } = body;
  const about = await prisma.about.update({
    where: {
      id: "67460f80dd27439460dd84fa",
    },
    data: {
      content,
      imageUrl: images[0],
      imageUrl2: images[1],
      clients: numberOfClients,
      voiceStyles: voiceStyles,
      language: language,
    },
  });

  return withCORS(
    new Response(JSON.stringify(about), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  );
}

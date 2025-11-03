import { NextRequest } from "next/server";
import { getMockChatResponse } from "@/lib/mockData";

export async function POST(request: NextRequest): Promise<Response> {
  console.log("[CHAT API] Using mock data for frontend-only demo");

  try {
    const { userId, message, sessionId } = await request.json();

    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    // Generate mock session ID if not provided
    const currentSessionId = sessionId || `mock-session-${Date.now()}`;

    // Get mock response based on message content
    console.log("[CHAT API] Generating mock response for message:", message);
    const responseText = getMockChatResponse(message);
    
    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 800));

    return Response.json({
      response: responseText,
      session_id: currentSessionId,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("[CHAT API] Error:", error);
    return Response.json(
      {
        error: "Failed to process chat request",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

import { NextRequest } from "next/server";
import { mockPerksData } from "@/lib/mockData";

export async function POST(request: NextRequest): Promise<Response> {
  console.log("[PERKS API] Using mock data for frontend-only demo");

  try {
    const { userId } = await request.json();

    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    // Return mock data for frontend-only deployment
    console.log("[PERKS API] Returning mock perks data for user:", userId);
    
    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return Response.json(mockPerksData);
  } catch (error) {
    console.error("[PERKS API] Error:", error);
    return Response.json(
      { error: "Failed to fetch perks data" },
      { status: 500 }
    );
  }
}

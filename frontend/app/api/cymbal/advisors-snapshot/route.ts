import { NextRequest } from "next/server";
import { mockAdvisorsData } from "@/lib/mockData";

export async function POST(request: NextRequest): Promise<Response> {
  console.log("[ADVISORS API] Using mock data for frontend-only demo");

  try {
    const { userId } = await request.json();

    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    // Return mock data for frontend-only deployment
    console.log("[ADVISORS API] Returning mock advisors data for user:", userId);
    
    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return Response.json(mockAdvisorsData);
  } catch (error) {
    console.error("[ADVISORS API] Error:", error);
    return Response.json(
      { error: "Failed to fetch advisors data" },
      { status: 500 }
    );
  }
}

import { NextRequest } from "next/server";
import { mockSpendingData } from "@/lib/mockData";

export async function POST(request: NextRequest): Promise<Response> {
  console.log("[SPENDING API] Using mock data for frontend-only demo");

  try {
    const { userId } = await request.json();

    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    // Return mock data for frontend-only deployment
    console.log("[SPENDING API] Returning mock spending data for user:", userId);
    
    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return Response.json(mockSpendingData);
  } catch (error) {
    console.error("[SPENDING API] Error:", error);
    return Response.json(
      { error: "Failed to fetch spending data" },
      { status: 500 }
    );
  }
}

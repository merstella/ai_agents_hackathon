import { NextRequest } from "next/server";
import { mockPortfolioData } from "@/lib/mockData";

export async function POST(request: NextRequest): Promise<Response> {
  console.log("[PORTFOLIO API] Using mock data for frontend-only demo");

  try {
    const { userId } = await request.json();

    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    // Return mock data for frontend-only deployment
    console.log("[PORTFOLIO API] Returning mock portfolio data for user:", userId);
    
    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return Response.json(mockPortfolioData);
  } catch (error) {
    console.error("[PORTFOLIO API] Error:", error);
    return Response.json(
      { error: "Failed to fetch portfolio data" },
      { status: 500 }
    );
  }
}

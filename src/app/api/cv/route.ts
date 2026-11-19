import { cvData } from "@/data/cvData";

export const dynamic = "force-static";

export function GET() {
  return Response.json(cvData);
}

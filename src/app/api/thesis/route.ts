import { thesisData } from "@/data/thesis";

export const dynamic = "force-static";

export function GET() {
  return Response.json(thesisData);
}

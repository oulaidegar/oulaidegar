import { notes } from "@/data/notes";

export const dynamic = "force-static";

export function GET() {
  return Response.json({ count: notes.length, notes });
}

"use client";

import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl =
  process.env.NEXT_PUBLIC_CONVEX_URL ||
  "https://terrific-ptarmigan-453.eu-west-1.convex.cloud";

const convex = new ConvexReactClient(convexUrl);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

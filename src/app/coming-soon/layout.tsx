import { createRedirectShellMetadata } from "@/lib/seo/metadataBuilders";

export const metadata = createRedirectShellMetadata({
  title: "Coming Soon",
  path: "/coming-soon",
});

export default function ComingSoonLayout({ children }: { children: React.ReactNode }) {
  return children;
}

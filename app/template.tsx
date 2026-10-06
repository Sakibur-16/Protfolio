// The old route-transition wrapper lived here. The redesign has no page
// transitions, so this is a pass-through until the file is deleted.
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

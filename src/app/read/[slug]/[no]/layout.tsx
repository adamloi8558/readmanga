export default function ReadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="read-mode min-h-screen">
      {children}
    </div>
  );
}


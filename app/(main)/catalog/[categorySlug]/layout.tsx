type Props = {
  children: React.ReactNode;
};
export default async function Layout({ children }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* ✅ Main Container */}
      {/* <div className="flex gap-6"> */}
      {/* ✅ Sidebar (left side) */}
      {/* <aside className="hidden md:block w-1/4">
          <Sidebar />
        </aside> */}

      {/* ✅ Products Content Area */}
      <main className="flex-1">{children}</main>
      {/* </div> */}
    </section>
  );
}

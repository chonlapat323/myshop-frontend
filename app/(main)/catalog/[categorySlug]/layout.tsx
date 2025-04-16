import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
type Props = {
  children: React.ReactNode;
  params: {
    categorySlug: string;
  };
};
export default function Layout({ children, params }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* ✅ Breadcrumbs */}
      <Breadcrumbs categorySlug={params.categorySlug} />

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

type Props = {
  children: React.ReactNode;
};
export default async function Layout({ children }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <main className="flex-1">{children}</main>
    </section>
  );
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
      <footer className="bg-white/90 backdrop-blur-sm border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-slate-600 text-sm">
            © {new Date().getFullYear()} Filosofía y Sociedad. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          🌟 Essência.me
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
          Sistema SaaS para Médicos de Família e Psiquiatras
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            ✅ Projeto Inicializado!
          </h2>
          <div className="text-left space-y-3 text-gray-600 dark:text-gray-400">
            <p>✅ Next.js 15 + TypeScript</p>
            <p>✅ Tailwind CSS configurado</p>
            <p>✅ Estrutura de pastas criada</p>
            <p>✅ Git configurado</p>
          </div>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm font-mono text-blue-800 dark:text-blue-300">
              Próximo passo: Configurar Prisma + Database 🚀
            </p>
          </div>
        </div>
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Desenvolvido por Dr. Daniel Victor Arantes • CRM GO 9335
        </p>
      </main>
    </div>
  );
}

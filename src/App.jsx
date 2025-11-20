import Calculators from './components/Calculators'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen p-6 md:p-10">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <img
              src="/flame-icon.svg"
              alt="Flames"
              className="w-16 h-16 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Finance Calculator Suite</h1>
          <p className="text-blue-200 mt-2">Quick tools for interest, loans, savings and rent sharing</p>
        </header>

        <main className="max-w-5xl mx-auto relative z-10">
          <Calculators />
        </main>

        <footer className="mt-10 text-center text-blue-300/70 text-sm">
          Built with love. Adjust values to see results instantly after calculate.
        </footer>
      </div>
    </div>
  )
}

export default App
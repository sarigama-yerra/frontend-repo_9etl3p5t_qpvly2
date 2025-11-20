import { useState } from 'react'

export function Section({ title, description, children }) {
  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {description && (
          <p className="text-blue-200/80 text-sm mt-1">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}

export function NumberInput({ label, value, onChange, placeholder, min=0, step="any", suffix }) {
  return (
    <label className="block">
      <span className="text-blue-100 text-sm">{label}</span>
      <div className="mt-1 relative">
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          step={step}
          className="w-full bg-slate-900/60 border border-slate-700 focus:border-blue-500 rounded-lg text-white px-4 py-2 outline-none"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 text-sm">{suffix}</span>
        )}
      </div>
    </label>
  )
}

export function PrimaryButton({ children, onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full mt-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
    >
      {loading ? 'Calculating...' : children}
    </button>
  )
}

export function Result({ items }) {
  if (!items) return null
  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
      <h4 className="text-blue-100 font-semibold mb-2">Result</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {Object.entries(items).map(([k, v]) => (
          <div key={k} className="flex justify-between text-blue-200/90 bg-slate-800/60 rounded px-3 py-2">
            <span className="capitalize">{k.replaceAll('_',' ')}</span>
            <span className="font-mono">{typeof v === 'number' ? v.toLocaleString() : String(v)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function useBackend() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const post = async (path, body) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      const data = await res.json()
      return data
    } catch (e) {
      setError(e.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { baseUrl, loading, error, post }
}

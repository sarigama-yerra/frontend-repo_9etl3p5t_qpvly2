import { useState } from 'react'
import { Section, NumberInput, PrimaryButton, Result, useBackend } from './CalculatorLayout'

export default function Calculators() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <SimpleInterest />
      <CompoundInterest />
      <LoanPayment />
      <SavingsFutureValue />
      <RentSplit />
    </div>
  )
}

function SimpleInterest() {
  const { post, loading, error } = useBackend()
  const [principal, setPrincipal] = useState('1000')
  const [rate, setRate] = useState('5')
  const [years, setYears] = useState('2')
  const [result, setResult] = useState(null)

  const calc = async () => {
    const data = await post('/api/calc/simple-interest', {
      principal: parseFloat(principal || 0),
      annual_rate_percent: parseFloat(rate || 0),
      years: parseFloat(years || 0)
    })
    if (data) setResult(data)
  }

  return (
    <Section title="Simple Interest" description="Quick interest on a fixed principal">
      <div className="space-y-3">
        <NumberInput label="Principal" value={principal} onChange={setPrincipal} suffix="$" />
        <NumberInput label="Annual Rate (%)" value={rate} onChange={setRate} suffix="%" />
        <NumberInput label="Years" value={years} onChange={setYears} />
        <PrimaryButton onClick={calc} loading={loading}>Calculate</PrimaryButton>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <Result items={result} />
      </div>
    </Section>
  )
}

function CompoundInterest() {
  const { post, loading, error } = useBackend()
  const [principal, setPrincipal] = useState('1000')
  const [rate, setRate] = useState('7')
  const [n, setN] = useState('12')
  const [years, setYears] = useState('5')
  const [contrib, setContrib] = useState('50')
  const [result, setResult] = useState(null)

  const calc = async () => {
    const data = await post('/api/calc/compound-interest', {
      principal: parseFloat(principal || 0),
      annual_rate_percent: parseFloat(rate || 0),
      times_per_year: parseInt(n || 1),
      years: parseFloat(years || 0),
      contribution_per_period: parseFloat(contrib || 0)
    })
    if (data) setResult(data)
  }

  return (
    <Section title="Compound Interest" description="Growth with compounding and contributions">
      <div className="space-y-3">
        <NumberInput label="Principal" value={principal} onChange={setPrincipal} suffix="$" />
        <NumberInput label="Annual Rate (%)" value={rate} onChange={setRate} suffix="%" />
        <NumberInput label="Times Per Year" value={n} onChange={setN} />
        <NumberInput label="Years" value={years} onChange={setYears} />
        <NumberInput label="Contribution per Period" value={contrib} onChange={setContrib} suffix="$" />
        <PrimaryButton onClick={calc} loading={loading}>Calculate</PrimaryButton>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <Result items={result} />
      </div>
    </Section>
  )
}

function LoanPayment() {
  const { post, loading, error } = useBackend()
  const [principal, setPrincipal] = useState('250000')
  const [rate, setRate] = useState('6.5')
  const [years, setYears] = useState('30')
  const [ppy, setPpy] = useState('12')
  const [result, setResult] = useState(null)

  const calc = async () => {
    const data = await post('/api/calc/loan-payment', {
      principal: parseFloat(principal || 0),
      annual_rate_percent: parseFloat(rate || 0),
      years: parseFloat(years || 0),
      payments_per_year: parseInt(ppy || 12)
    })
    if (data) setResult(data)
  }

  return (
    <Section title="Loan/Mortgage Payment" description="Payment, totals and interest">
      <div className="space-y-3">
        <NumberInput label="Loan Amount" value={principal} onChange={setPrincipal} suffix="$" />
        <NumberInput label="Annual Rate (%)" value={rate} onChange={setRate} suffix="%" />
        <NumberInput label="Years" value={years} onChange={setYears} />
        <NumberInput label="Payments per Year" value={ppy} onChange={setPpy} />
        <PrimaryButton onClick={calc} loading={loading}>Calculate</PrimaryButton>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <Result items={result} />
      </div>
    </Section>
  )
}

function SavingsFutureValue() {
  const { post, loading, error } = useBackend()
  const [pv, setPv] = useState('1000')
  const [contrib, setContrib] = useState('200')
  const [rate, setRate] = useState('5')
  const [n, setN] = useState('12')
  const [years, setYears] = useState('10')
  const [result, setResult] = useState(null)

  const calc = async () => {
    const data = await post('/api/calc/savings-future-value', {
      present_value: parseFloat(pv || 0),
      contribution_per_period: parseFloat(contrib || 0),
      annual_rate_percent: parseFloat(rate || 0),
      years: parseFloat(years || 0),
      times_per_year: parseInt(n || 1)
    })
    if (data) setResult(data)
  }

  return (
    <Section title="Savings Future Value" description="Project savings over time">
      <div className="space-y-3">
        <NumberInput label="Present Value" value={pv} onChange={setPv} suffix="$" />
        <NumberInput label="Contribution per Period" value={contrib} onChange={setContrib} suffix="$" />
        <NumberInput label="Annual Rate (%)" value={rate} onChange={setRate} suffix="%" />
        <NumberInput label="Times Per Year" value={n} onChange={setN} />
        <NumberInput label="Years" value={years} onChange={setYears} />
        <PrimaryButton onClick={calc} loading={loading}>Calculate</PrimaryButton>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <Result items={result} />
      </div>
    </Section>
  )
}

function RentSplit() {
  const { post, loading, error } = useBackend()
  const [rent, setRent] = useState('2400')
  const [utils, setUtils] = useState('200')
  const [roommates, setRoommates] = useState([
    { name: 'Alice', weight: 1 },
    { name: 'Bob', weight: 1 }
  ])
  const [result, setResult] = useState(null)

  const updateRoommate = (idx, field, value) => {
    setRoommates(prev => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r))
  }

  const addRoommate = () => setRoommates(prev => [...prev, { name: `Roommate ${prev.length+1}`, weight: 1 }])
  const removeRoommate = (idx) => setRoommates(prev => prev.filter((_, i) => i !== idx))

  const calc = async () => {
    const payload = {
      total_rent: parseFloat(rent || 0),
      total_utilities: parseFloat(utils || 0),
      roommates: roommates.map(r => ({ name: r.name, weight: parseFloat(r.weight || 0) }))
    }
    const data = await post('/api/calc/rent-split', payload)
    if (data) setResult(data)
  }

  return (
    <Section title="Rent Split" description="Share rent and utilities fairly by weight">
      <div className="space-y-3">
        <NumberInput label="Total Rent" value={rent} onChange={setRent} suffix="$" />
        <NumberInput label="Total Utilities" value={utils} onChange={setUtils} suffix="$" />

        <div className="space-y-2">
          <p className="text-blue-100 text-sm">Roommates</p>
          {roommates.map((r, idx) => (
            <div key={idx} className="grid grid-cols-5 gap-2 items-end">
              <input
                value={r.name}
                onChange={e => updateRoommate(idx, 'name', e.target.value)}
                className="col-span-3 bg-slate-900/60 border border-slate-700 rounded-lg text-white px-3 py-2"
                placeholder="Name"
              />
              <input
                type="number"
                value={r.weight}
                min={0}
                step="any"
                onChange={e => updateRoommate(idx, 'weight', e.target.value)}
                className="col-span-1 bg-slate-900/60 border border-slate-700 rounded-lg text-white px-3 py-2"
                placeholder="Weight"
              />
              <button onClick={() => removeRoommate(idx)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
            </div>
          ))}
          <button onClick={addRoommate} className="text-blue-300 hover:text-blue-200 text-sm">+ Add roommate</button>
        </div>

        <PrimaryButton onClick={calc} loading={loading}>Calculate</PrimaryButton>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <Result items={result ? {
          total: result.total,
          ...Object.fromEntries(result.roommates.map(r => [r.name, r.amount]))
        } : null} />
      </div>
    </Section>
  )
}

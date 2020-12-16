import React from 'react'

interface BalanceRowInterface {
  name?: string | null
  balance?: number | null
  symbol?: string | null
  className?: string
}

const BalanceRow: React.FC<BalanceRowInterface> = ({ name, balance, symbol, className }) => {
  const round = (original: number | null | undefined) => {
    if (!original) { return original }
    const rounded = parseFloat(original.toFixed(8))
    return rounded === original ? original : rounded
  }

  return (
    <div className={className ? `token ${className}` : 'token'}>
      <h2>{name}</h2>
      <div>
        <span className="balance">{round(balance)}</span>
        <span className="symbol">{symbol}</span>
      </div>
    </div>
  )
}

export default BalanceRow

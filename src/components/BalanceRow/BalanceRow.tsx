import React from 'react'

interface BalanceRowInterface {
  name?: string | null
  balance?: number | null
  symbol?: string | null
  className?: string
  conversion?: number
}

const BalanceRow: React.FC<BalanceRowInterface> = ({ name, balance, symbol, className, conversion }) => {
  const shorten = (original: number | null | undefined) => {
    if (!original) { return original }
    const shorten = parseFloat(original.toFixed(6))
    return shorten === original ? original : shorten
  }

  return (
    <div className={className ? `balance-row ${className}` : 'balance-row'}>
      <h2>{name}</h2>
      <div>
        <span className="balance">{shorten(balance)}</span>
        <span className="symbol">{symbol}</span>
        {(conversion && balance) && <span className="conversion">${Math.round(conversion * balance * 100) / 100} USD</span>}
      </div>
    </div>
  )
}

export default BalanceRow

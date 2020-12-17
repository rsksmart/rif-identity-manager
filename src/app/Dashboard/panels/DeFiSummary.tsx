import React from 'react'
import BalanceRow from '../../../components/BalanceRow/BalanceRow'
import { BaseButton } from '../../../components/Buttons'
import Panel from '../../../components/Panel/Panel'
import { getBalanceName } from '../../../config/getConfig'
import { Token } from '../../state/reducers/defi'

interface DeFiSummaryInterface {
  balance: number | null
  chainId?: number | null
  featuredToken?: Token
  handleButton: () => void
}

const DeFiSummary: React.FC<DeFiSummaryInterface> = ({ balance, chainId, featuredToken, handleButton }) =>
  balance && chainId
    ? (
      <Panel title={<>DeFi Summary</>} className="defi">
        <div className="container balance">
          <div className="columnDobule">
            <BalanceRow
              name="Balance"
              balance={balance}
              symbol={getBalanceName(chainId)}
            />
            {featuredToken && (
              <BalanceRow
                name={featuredToken.name}
                balance={featuredToken.balance}
                symbol={featuredToken.symbol}
              />
            )}
          </div>
        </div>
        <BaseButton onClick={handleButton} className="turquoise">More Defi</BaseButton>
      </Panel>
    )
    : <></>

export default DeFiSummary

type ProductType = 'CNC ' | 'INTRADAY ' | 'MARGIN' | 'MTF' | 'CO' | 'BO'
type TransactionType = 'BUY' | 'SELL'
type ExchangeSegment =
  | 'NSE_EQ'
  | 'NSE_EQ'
  | 'NSE_FNO'
  | 'NSE_CURRENCY'
  | 'BSE_EQ'
  | 'BSE_FNO'
  | 'BSE_CURRENCY'
  | 'MCX_COMM'
type Validity = 'DAY' | 'IOC'
type OrderType = 'LIMIT' | 'MARKET' | 'STOP_LOSS' | 'STOP_LOSS_MARKET'
type OrderStatus =
  | 'TRANSIT'
  | 'PENDING'
  | 'REJECTED'
  | 'CANCELLED'
  | 'TRADED'
  | 'EXPIRED'

type CreateOrder = {
  transactionType: TransactionType
  exchangeSegment: ExchangeSegment
  productType: ProductType
  orderType: OrderType
  validity: Validity
  tradingSymbol: string
  securityId: string
  quantity: number
  /**@todo Evaluate and remove or keep it as constant */
  afterMarketOrder: boolean // true as const
  amoTime: 'OPEN' | 'OPEN_30' | 'OPEN_60' // OPEN as const
}

type Order = {
  orderId: string
  dhanClientId: string
  transactionType: TransactionType
  exchangeSegment: ExchangeSegment
  productType: ProductType
  orderType: OrderType
  orderStatus: OrderStatus
  validity: Validity
  tradingSymbol: string
  securityId: string
  quantity: number
  afterMarketOrder: boolean
  exchangeOrderId?: string
  correlationId?: string
  disclosedQuantity?: number
  price?: number
  triggerPrice?: number
  boProfitValue?: number
  boStopLossValue?: number
  legName?: string
  createTime?: string
  updateTime?: string
  exchangeTime?: string
  drvExpiryDate?: string
  drvOptionType?: string
  drvStrikePrice?: number
  omsErrorCode?: string
  omsErrorDescription?: string
  filled_qty?: number
  algoId?: string
}

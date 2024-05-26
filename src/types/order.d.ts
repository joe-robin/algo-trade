type OrderType = 'CNC ' | 'INTRADAY ' | 'MARGIN' | 'MTF' | 'CO' | 'BO'

type CreateOrder = {
  dhanClientId: string
  transactionType: 'BUY' | 'SELL'
  exchangeSegment:
    | 'NSE_EQ'
    | 'NSE_EQ'
    | 'NSE_FNO'
    | 'NSE_CURRENCY'
    | 'BSE_EQ'
    | 'BSE_FNO'
    | 'BSE_CURRENCY'
    | 'MCX_COMM'
  productType: 'INTRADAY'
  orderType: OrderType
  validity: 'DAY' | 'IOC'
  tradingSymbol: string
  securityId: string
  quantity: number
  /**@todo Evaluate and remove or keep it as constant */
  afterMarketOrder: boolean // true as const
  amoTime: 'OPEN' | 'OPEN_30' | 'OPEN_60' // OPEN as const
}

type OrdersList = {
  dhanClientId: string
  orderId: string
  exchangeOrderId: string
  correlationId: string
  orderStatus: 'PENDING'
  transactionType: 'BUY'
  exchangeSegment: 'NSE_EQ'
  productType: 'INTRADAY'
  orderType: 'MARKET'
  validity: 'DAY'
  tradingSymbol: 'IDFCFIRSTB'
  securityId: '11184'
  quantity: 1
  disclosedQuantity: 0
  price: 0.0
  triggerPrice: 0.0
  afterMarketOrder: true
  boProfitValue: 0.0
  boStopLossValue: 0.0
  legName: 'NA'
  createTime: '2024-05-26 17:18:27'
  updateTime: '2024-05-26 17:18:27'
  exchangeTime: '0001-01-01 00:00:00'
  drvExpiryDate: '0001-01-01'
  drvOptionType: 'NA'
  drvStrikePrice: 0.0
  omsErrorCode: '0'
  omsErrorDescription: ''
  filled_qty: 0
  algoId: '0'
}

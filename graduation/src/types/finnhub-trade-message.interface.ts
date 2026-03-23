export interface FinnhubTradeMessage {
  data: Array<{
    s: string,
    p: number,
    t: number,
    v: number,
    c: null | string[]
  }>,
}
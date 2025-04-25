export interface CartContextTypeProp {
  count: number;
  increase: (qty?: number) => void;
  reset: () => void;
  refresh: () => Promise<void>;
}

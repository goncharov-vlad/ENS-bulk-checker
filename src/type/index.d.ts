type ScanResultItem = {
  name: string
  price: string
  expires: number
};

type ScanResult = ScanResultItem[];

export {
  ScanResult,
  ScanResultItem,
};

interface TableHeaderRecord {
  key: string;
  value: string | number;
  sort: boolean;
}

interface TableRowRecord {
  key: string;
  value: string | number;
  data: unknown;
}

export { TableHeaderRecord, TableRowRecord };

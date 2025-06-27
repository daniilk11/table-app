export interface TableNode {
  nodeId: string;
  data: Record<string, string>;
  children: TableNode[];
}

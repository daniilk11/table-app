
export interface TableNode {
    nodeId: string; 
    data: Record<string, any>;
    children: TableNode[];
  }
  
import type { TableNode } from "../types";

interface RawTableData {
    data: Record<string, string>;
    children?: Record<string, { records?: RawTableData[] } | undefined>;
}

export function normalizeData(data: RawTableData[]): TableNode[] {
    let nodeIdCounter = 0;
  
    function generateNodeId(): string {
      return `${nodeIdCounter++}`;
    }
  
    function normalizeNode(dataItem: RawTableData): TableNode {
      const nodeId = generateNodeId();
      const data = dataItem.data;
      const children: TableNode[] = [];
  
      const rawChildren = (dataItem.children as Record<string, { records?: RawTableData[] } | undefined>) || {};
      for (const child of Object.values(rawChildren)) {
        if (child && Array.isArray(child.records)) {
          for (const record of child.records) {
            children.push(normalizeNode(record));
          }
        }
      } 
    return { nodeId, data, children };
    }
  
    return data.map(normalizeNode);
}

export function removeNode(nodes: TableNode[], targetId: string): TableNode[] {
    const result: TableNode[] = [];
  
    for (const node of nodes) {
      if (node.nodeId === targetId) {
        continue;
      }
  
    const newChildren = removeNode(node.children, targetId);
  
    if (newChildren !== node.children) {
        result.push({ ...node, children: newChildren });
      } else {
        result.push(node);
      }
    }
  
    return result;
}
  
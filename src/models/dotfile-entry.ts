
export interface DotfileEntryDefinition {
  src: string;
  destination: string[];
}

export interface DotfileEntry {
  [key: string]: DotfileEntryDefinition[];
}

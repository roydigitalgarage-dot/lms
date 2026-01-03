export type Algorithm = 'linear-regression' | 'decision-tree' | 'kmeans' | 'neural-network';

export type AlgorithmInfo = {
  id: Algorithm;
  name: string;
  description: string;
  parameters: Parameter[];
};

export type Parameter = {
  id: string;
  name: string;
  description: string;
  type: 'range' | 'number' | 'select';
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  defaultValue: number | string;
};
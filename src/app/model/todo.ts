export interface ITodo {
  id: number;
  title: string;
  desc?: string;
  dueDate: string;
  piority: Piority;
  // Custom for display
  isChecked?: boolean;
}

export enum Piority {
  Low,
  Normal,
  High,
}

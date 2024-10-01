export type TInstructorIndicatores = IInstructorIndicatores[];

export interface IDisciplineIndicatores {
  name: string;
  id: number;
  total_confirmed_class: number;
  total_awaiting_class: number;
  total_invalid_class: number;
}

export interface IInstructorIndicatores {
  id: number;
  name: string;
  disciplines: IDisciplineIndicatores[];
  total_confirmed_class: number;
  total_awaiting_class: number;
  total_invalid_class: number;
}

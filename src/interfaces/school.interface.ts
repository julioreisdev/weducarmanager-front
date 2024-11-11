export interface ISchool {
  id: number;
  corporate_name: string;
  trade_name: string;
  address: string;
  neighborhood: string;
  email: string;
  postal_code: string;
  tax_id: string;
  inep_code: string;
  logo: string;
  additional_field: string;
  instance: number;
}

export interface ISchoolYears {
  id: number;
  series: string;
  stage: string;
  academic_year: number;
  school: number;
  curriculum_matrix: number;
}

export interface ISchoolClass {
  id: number;
  description: string;
  start_time: string;
  end_time: string;
  eja: number;
  shift: number;
  school_year: number;
  room: number;
}

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

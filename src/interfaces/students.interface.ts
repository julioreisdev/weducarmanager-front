export interface IStudentFilters {
  cor?: string | null;
  disturbio?: string | null;
  final_row?: string;
  id_ano_letivo: string;
  id_escola?: string | null;
  id_instancia: string;
  initial_row?: string;
  matricula?: string;
  name?: string;
  order?: string;
  pcd?: string;
  responsavel_nome?: string | null;
  restricao_alimentar?: string | null;
  sexo?: string | null;
  situacao?: string | null;
  transporte_escolar?: string | null;
}

export interface IStudent {
  registration: number;
  census_id?: number | null;
  name: string;
  gender: string;
  color: number;
  color_obj: {
    id: number;
    description: string;
  };
  birth_date: string;
  birthplace: string | null;
  address?: string | null;
  neighborhood?: string | null;
  city: number;
  classe: {
    id: number;
    description: string;
    school_year: {
      id: number;
      description: string;
    };
  };
  description: string;
  date_joined: string;
  date_changed: string;
  aee_check: number;
  allergy_check: number;
  allergy_observations?: string | null;
  birth_certificate?: string | null;
  birth_certificate_issue_date?: string | null;
  birth_certificate_registry?: string | null;
  disability_check: number;
  disability_observations?: string | null;
  disorder_check: number;
  disorder_instructions: string;
  disorder_observations?: string | null;
  father_name: string;
  father_phone: string;
  father_cpf?: string | null;
  father_rg?: string | null;
  food_restriction_check: number;
  food_restriction_observations?: string | null;
  housing: number;
  image_right_check: number;
  instance: number;
  medical_monitoring_check: number;
  medical_monitoring_observations?: string | null;
  medication_check: number;
  medication_observations?: string | null;
  mother_name?: string | null;
  mother_phone?: string | null;
  mother_cpf?: string | null;
  mother_rg?: string | null;
  nis_number?: string | null;
  old_birth_certificate_check: number;
  photo: string;
  physical_activity_restriction_check: number;
  physical_activity_restriction_observations?: string | null;
  responsible_name: string;
  responsible_phone: string;
  responsible_relationship: string;
  responsible_cpf?: string | null;
  responsible_rg?: string | null;
  rg?: string | null;
  student_status: number;
  student_status_obj: {
    id: number;
    description: string;
  };
  sus_number?: string | null;
  school_transport_check: number;
}

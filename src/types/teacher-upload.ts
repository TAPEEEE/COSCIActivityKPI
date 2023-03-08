export interface TeacherUpload {
  user_id: string;
  test: string;
}

export interface TeacherUploadResult {
  result: string;
  message: string;
  data: TeacherData;
}

export interface TeacherData {
  data: {
    user_id: string;
    name: string;
    role: string;
    email: string;
    tel: string;
    register_check: boolean;
  };
}

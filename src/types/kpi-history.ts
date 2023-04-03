export interface KpiHistoryResult {
  result: string;
  message: string;
  data: KpiRequestForHistoryData;
}

export interface KpiHistorytData {
  _id: string;
  id_user: string;
  user_id: string;
  name: string;
  student_id: string;
  id_event: string;
  name_event: string;
  event_img: string;
  event_type: string;
  activity_hour: string;
  start_date: string;
  end_date: string;
  uploaded_img: string[];
  uploaded_pdf: string;
  date_request: string;
  status_request: string;
  type_request: string;
  permissions_request: string;
}

export interface KpiRequestForHistoryData {
  data: KpiHistorytData[];
}

export interface userData {
  id_user: string;
  user_id: string;
  name: string;
}

export interface eventData {
  id_event: string;
  name_event: string;
  detail_event: string;
  start_date: string;
  end_date: string;
  posted_timestamp: string;
  event_type: string;
  event_img: string;
  activity_hour: number;
  event_status: boolean;
  event_img_list: string[];
}

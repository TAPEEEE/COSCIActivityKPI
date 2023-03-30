export interface KpiHistoryResult {
  result: string;
  message: string;
  data: KpiHistorytData;
}

export interface KpiHistorytData {
  _id: string;
  user: userData;
  event: eventData;
  start_date: string;
  end_date: string;
  uploaded_img: string[];
  uploaded_pdf: string;
  date_request: string;
  status_request: string;
  type_request: string;
  permissions_request: string;
}

export interface userGet {
  user_id?: string;
}

export interface KpiRequestForHistory {
  requestData: {
    _id: string;
    user: userData;
    event: eventData;
    start_date: string;
    end_date: string;
    uploaded_img: string[];
    uploaded_pdf: string;
    date_request: string;
    status_request: string;
    type_request: string;
    permissions_request: string;
  };
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

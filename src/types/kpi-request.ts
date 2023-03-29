export interface kpiRequestType {
  id_event?: string;
  start_date?: string;
  end_date?: string;
  status_request?: string;
  type_request?: string;
  uploaded_img?: string[];
  uploaded_pdf?: string;
}

export interface KpiRequestData {
  user: userData;
  event: eventData;
  start_date: string;
  end_date: string;
  uploaded_img: string[];
  uploaded_pdf: string;
  status_request: string;
  type_request: string;
  permissions_request: string;
  _id: string;
  date_request: string;
}

export interface KpiRequestForUsed {
  requestData: {
    user: userData;
    event: eventData;
    start_date: string;
    end_date: string;
    uploaded_img: string[];
    uploaded_pdf: string;
    status_request: string;
    type_request: string;
    permissions_request: string;
    _id: string;
    date_request: string;
  };
}

export interface userData {
  user: {
    id_user: string;
    user_id: string;
    name: string;
  };
}

export interface eventData {
  event: {
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
  };
}

export interface KpiRequestResult {
  result: string;
  message: string;
  data: KpiRequestData;
}

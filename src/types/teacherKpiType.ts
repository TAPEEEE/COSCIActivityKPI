export interface KpiResult {
  result: string;
  message: string;
  data: KpiList;
}

export interface KpiList {
  data: {
    _id?: string;
    name_event?: string;
    detail_event?: string;
    start_date?: string;
    end_date?: string;
    posted_timestamp?: string;
    event_type?: string;
    event_img?: string;
    activity_hour?: number;
    event_status?: boolean;
    permissions_type?: string;
  };
}

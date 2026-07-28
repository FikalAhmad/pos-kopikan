export interface OpenShiftTypes {
  cashier_id: string;
  start_time: Date;
  starting_cash: number;
}

export interface CloseShiftTypes {
  shift_id: string;
  end_time?: Date;
  actual_cash?: number;
  expecting_cash?: number;
  notes?: string;
}

export interface ShiftResponse {
  id: string;
  cashier_id: string;
  start_time: string;
  end_time?: string;
  starting_cash: number;
  actual_cash?: number;
  expected_cash?: number;
  status: "OPEN" | "CLOSED";
  notes?: string;
}

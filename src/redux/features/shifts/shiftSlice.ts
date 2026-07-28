import { createSlice } from "@reduxjs/toolkit";
import { shiftApi } from "../api/shiftsApi";

type ShiftState = {
  cashier_id: string;
  start_time: string;
  end_time?: string;
  starting_cash: number;
  actual_cash?: number;
  expected_cash?: number;
  status: "OPEN" | "CLOSED";
  notes?: string;
};

const initialState: ShiftState = {
  cashier_id: "",
  start_time: "",
  end_time: "",
  starting_cash: 0,
  actual_cash: 0,
  expected_cash: 0,
  status: "OPEN",
  notes: "",
};

const shiftSlice = createSlice({
  name: "shift",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        shiftApi.endpoints.openShift.matchFulfilled,
        (state, action) => {
          if (action.payload?.data) {
            state.cashier_id = action.payload.data.cashier_id;
            state.start_time = action.payload.data.start_time;
            state.starting_cash = action.payload.data.starting_cash;
            state.status = action.payload.data.status;
          }
        },
      )
      .addMatcher(
        shiftApi.endpoints.closeShift.matchFulfilled,
        (state, action) => {
          if (action.payload?.data) {
            state.actual_cash = action.payload.data.actual_cash;
            state.expected_cash = action.payload.data.expected_cash;
            state.status = action.payload.data.status;
            state.end_time = action.payload.data.end_time;
            state.notes = action.payload.data.notes || "";
          }
        },
      );
  },
});

export default shiftSlice.reducer;

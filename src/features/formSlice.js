import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    name: "",
    birth_date: "",
    weight: "",
    academy: "",
    height: "",
    category: "",
    payment_proof: null,
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField(state, action) {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    resetForm(state) {
      state.formData = initialState.formData;
    },
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
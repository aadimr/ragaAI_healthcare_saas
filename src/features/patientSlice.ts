import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodType: string;
  lastVisit: string;
  status: 'Active' | 'Discharged';
  image: string;
}

interface PatientState {
  patients: Patient[];
  viewMode: 'grid' | 'list';
}

const mockPatients: Patient[] = [
  { id: 'P001', name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', age: 45, gender: 'Male', bloodType: 'O+', lastVisit: '2023-10-12', status: 'Active', image: 'https://i.pravatar.cc/150?u=2' },
  { id: 'P002', name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', age: 32, gender: 'Female', bloodType: 'A-', lastVisit: '2023-10-15', status: 'Active', image: 'https://i.pravatar.cc/150?u=1' },
  { id: 'P003', name: 'Robert Johnson', email: 'robert@example.com', phone: '(555) 456-7890', age: 58, gender: 'Male', bloodType: 'B+', lastVisit: '2023-09-28', status: 'Discharged', image: 'https://i.pravatar.cc/150?u=2' },
  { id: 'P004', name: 'Emily Davis', email: 'emily@example.com', phone: '(555) 234-5678', age: 24, gender: 'Female', bloodType: 'AB+', lastVisit: '2023-10-18', status: 'Active', image: 'https://i.pravatar.cc/150?u=4' },
  { id: 'P005', name: 'Michael Wilson', email: 'michael@example.com', phone: '(555) 876-5432', age: 62, gender: 'Male', bloodType: 'O-', lastVisit: '2023-08-05', status: 'Discharged', image: 'https://i.pravatar.cc/150?u=5' },
  { id: 'P006', name: 'Sarah Brown', email: 'sarah@example.com', phone: '(555) 345-6789', age: 29, gender: 'Female', bloodType: 'A+', lastVisit: '2023-10-20', status: 'Active', image: 'https://i.pravatar.cc/150?u=6' },
];

const initialState: PatientState = {
  patients: mockPatients,
  viewMode: 'grid',
};

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setViewMode } = patientSlice.actions;
export default patientSlice.reducer;

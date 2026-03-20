import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode, type Patient } from '../features/patientSlice';
import { LayoutGrid, List as ListIcon, Mail, Phone, Droplet, Activity } from 'lucide-react';
import type { RootState } from '../store';

// Generic Components
import { Card, CardBody } from '../components/ui/Card';
import { Table, type Column } from '../components/ui/Table';
import { Modal } from '../components/ui/Modal';

const Patients = () => {
  const dispatch = useDispatch();
  const { patients, viewMode } = useSelector((state: RootState) => state.patients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const tableColumns: Column<Patient>[] = [
    {
      header: 'Patient',
      accessor: (patient) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full object-cover" src={patient.image} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
            <div className="text-sm text-gray-500">{patient.id} • {patient.gender} • {patient.age} yrs</div>
          </div>
        </div>
      )
    },
    {
      header: 'Contact Details',
      accessor: (patient) => (
        <>
          <div className="flex items-center text-sm text-gray-900 mb-1">
            <Mail className="h-3.5 w-3.5 mr-2 text-gray-400" /> {patient.email}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Phone className="h-3.5 w-3.5 mr-2 text-gray-400" /> {patient.phone}
          </div>
        </>
      )
    },
    {
      header: 'Medical Info',
      accessor: (patient) => (
        <div className="text-sm text-gray-900"><span className="text-rose-500 font-medium">Blood:</span> {patient.bloodType}</div>
      )
    },
    {
      header: 'Last Visit',
      accessor: (patient) => (
        <span className="text-sm text-gray-500">{new Date(patient.lastVisit).toLocaleDateString()}</span>
      )
    },
    {
      header: 'Status',
      accessor: (patient) => (
        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
          patient.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
        }`}>
          {patient.status}
        </span>
      )
    },
    {
      header: 'Actions',
      className: 'text-right',
      accessor: (patient) => (
        <button 
          onClick={() => setSelectedPatient(patient)}
          className="text-primary-600 hover:text-primary-900 transition-colors text-sm font-medium"
        >
          View Details
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Directory</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and view all registered patients</p>
        </div>
        
        {/* Toggle Switch */}
        <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200 inline-flex">
          <button
            onClick={() => dispatch(setViewMode('grid'))}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'grid' 
                ? 'bg-primary-50 text-primary-700' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            Grid
          </button>
          <button
            onClick={() => dispatch(setViewMode('list'))}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'list' 
                ? 'bg-primary-50 text-primary-700' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ListIcon className="h-4 w-4" />
            List
          </button>
        </div>
      </div>

      {/* Render Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {patients.map((patient) => (
            <Card key={patient.id} onClick={() => setSelectedPatient(patient)}>
              <CardBody>
                <div className="flex justify-between items-start mb-4">
                  <img src={patient.image} alt={patient.name} className="h-16 w-16 rounded-full object-cover border-2 border-primary-50" />
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    patient.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {patient.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{patient.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{patient.age} yrs • {patient.gender}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="truncate">{patient.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {patient.phone}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                  <div>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <Droplet className="h-3.5 w-3.5 text-rose-500" /> Blood
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{patient.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <Activity className="h-3.5 w-3.5 text-primary-500" /> Last Visit
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{new Date(patient.lastVisit).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        /* Render List/Table View via generic Table component */
        <Table<Patient>
          data={patients} 
          columns={tableColumns} 
          keyExtractor={(item) => item.id} 
        />
      )}

      {/* Patient Details Modal */}
      <Modal 
        isOpen={!!selectedPatient} 
        onClose={() => setSelectedPatient(null)} 
        title="Patient Details"
      >
        {selectedPatient && (
          <div>
            <div className="flex items-center gap-5 mb-6">
              <img src={selectedPatient.image} alt={selectedPatient.name} className="h-20 w-20 rounded-full object-cover border-4 border-primary-50 shadow-sm" />
              <div>
                <h4 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{selectedPatient.id} • {selectedPatient.gender} • {selectedPatient.age} yrs</p>
                <span className={`inline-flex mt-2 px-2.5 py-1 rounded-full text-xs font-semibold ${
                  selectedPatient.status === 'Active' ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' : 'bg-gray-100 text-gray-600 ring-1 ring-gray-500/20'
                }`}>
                  {selectedPatient.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h5 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Contact & Medical Info</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Email</p>
                  <p className="text-sm font-medium text-gray-900 truncate" title={selectedPatient.email}>{selectedPatient.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> Phone</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPatient.phone}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1.5"><Droplet className="h-3.5 w-3.5" /> Blood Type</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPatient.bloodType}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1.5"><Activity className="h-3.5 w-3.5" /> Last Visit</p>
                  <p className="text-sm font-medium text-gray-900">{new Date(selectedPatient.lastVisit).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Patients;

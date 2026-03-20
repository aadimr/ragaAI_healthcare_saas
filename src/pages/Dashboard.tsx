import { Users, Calendar, DollarSign, Activity } from 'lucide-react';

const stats = [
  { name: 'Total Patients', stat: '4,281', icon: Users, change: '12%', changeType: 'increase' },
  { name: 'Appointments Today', stat: '124', icon: Calendar, change: '5.4%', changeType: 'increase' },
  { name: 'Monthly Revenue', stat: '$142,300', icon: DollarSign, change: '3.2%', changeType: 'decrease' },
  { name: 'Active Doctors', stat: '45', icon: Activity, change: '14%', changeType: 'increase' },
];

const recentPatients = [
  { id: 1, name: 'Jane Cooper', department: 'Cardiology', date: 'Today, 10:00 AM', status: 'Completed' },
  { id: 2, name: 'Cody Fisher', department: 'Neurology', date: 'Today, 11:30 AM', status: 'Waiting' },
  { id: 3, name: 'Esther Howard', department: 'Orthopedics', date: 'Today, 02:00 PM', status: 'Scheduled' },
  { id: 4, name: 'Jenny Wilson', department: 'Pediatrics', date: 'Tomorrow, 09:00 AM', status: 'Scheduled' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-5 sm:p-6 transition-all hover:shadow-md">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-500 truncate">{item.name}</p>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{item.stat}</p>
                  <p className={`text-sm font-medium whitespace-nowrap ${item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.changeType === 'increase' ? '↑' : '↓'} {item.change}
                  </p>
                </div>
              </div>
              <div className={`p-3 rounded-full shrink-0 ${item.changeType === 'increase' ? 'bg-green-50' : 'bg-red-50'}`}>
                <item.icon className={`h-6 w-6 ${item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`} aria-hidden="true" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-100 mt-8">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Appointments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${patient.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        patient.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

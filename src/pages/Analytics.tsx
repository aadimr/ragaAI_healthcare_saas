import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { Users, UserPlus, Activity, TrendingUp, Calendar } from 'lucide-react';

const patientData = [
  { name: 'Jan', patients: 4000, new: 2400 },
  { name: 'Feb', patients: 3000, new: 1398 },
  { name: 'Mar', patients: 2000, new: 9800 },
  { name: 'Apr', patients: 2780, new: 3908 },
  { name: 'May', patients: 1890, new: 4800 },
  { name: 'Jun', patients: 2390, new: 3800 },
  { name: 'Jul', patients: 3490, new: 4300 },
];

const departmentData = [
  { name: 'Cardiology', value: 400 },
  { name: 'Neurology', value: 300 },
  { name: 'Pediatrics', value: 300 },
  { name: 'Orthopedics', value: 200 },
];
const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981'];

const summaryStats = [
  { title: 'Total Patients', value: '24,590', trend: '+12.5%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { title: 'New Registrations', value: '4,300', trend: '+8.2%', icon: UserPlus, color: 'text-pink-600', bg: 'bg-pink-50' },
  { title: 'Retention Rate', value: '94.2%', trend: '+1.1%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Avg. Daily Visits', value: '142', trend: '+3.4%', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const Analytics = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Analytics Overview</h1>
          <p className="mt-2 text-sm text-gray-500">Track and analyze your clinic's performance metrics.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Last 7 Months</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {summaryStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="flex items-center text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  {stat.trend}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-gray-500 text-sm font-medium">{stat.title}</h4>
                <p className="text-3xl font-bold text-gray-900 mt-1 tracking-tight">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 xl:col-span-2 min-w-0 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <div className="h-8 w-2 bg-indigo-500 rounded-full"></div>
              Patient Growth Trajectory
            </h3>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={patientData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 13, dy: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 13}} />
                <Tooltip 
                  cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', padding: '16px 20px', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}
                  itemStyle={{ color: '#111827', fontWeight: 600 }}
                  labelStyle={{ color: '#6b7280', marginBottom: '8px', fontWeight: 500 }}
                />
                <Area type="monotone" dataKey="patients" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorPatients)" activeDot={{ r: 6, strokeWidth: 0, fill: '#6366f1' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 min-w-0 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <div className="h-8 w-2 bg-pink-500 rounded-full"></div>
            Monthly New Registrations
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 13, dy: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 13}} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}} 
                  contentStyle={{ borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', padding: '12px 16px' }} 
                  itemStyle={{ fontWeight: 600, color: '#ec4899' }}
                />
                <Bar dataKey="new" fill="#ec4899" radius={[6, 6, 6, 6]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 min-w-0 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <div className="h-8 w-2 bg-amber-500 rounded-full"></div>
            Distribution by Department
          </h3>
          <div className="h-80 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={110}
                  stroke="#ffffff"
                  strokeWidth={4}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={1000}
                >
                  {departmentData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', padding: '12px 16px' }}
                  itemStyle={{ fontWeight: 600, color: '#1f2937' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  align="center" 
                  layout="horizontal"
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{ fontSize: '13px', color: '#4b5563', paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;

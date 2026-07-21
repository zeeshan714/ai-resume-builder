"use client";

import React, { useState } from 'react';

export default function NHO_Portal() {
  const [activeTab, setActiveTab] = useState('home');
  const [applications, setApplications] = useState([
    { id: 1, name: 'Ali Raza', education: 'Matric (10th)', salary: '30,000 PKR', status: 'Pending' },
    { id: 2, name: 'Ahmad Khan', education: 'Intermediate (12th)', salary: '35,000 PKR', status: 'Approved' }
  ]);
  
  const [form, setForm] = useState({ name: '', phone: '', education: 'Matric (10th)' });
  const [chatMessages, setChatMessages] = useState([
    { sender: 'AI', text: 'Assalam-o-Alaikum! NHO Multan Hiring Portal mein خوش آمدید. Main aap ki kya madad kar sakta hoon?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    
    let salaryText = '30,000 PKR';
    if (form.education.includes('12th')) salaryText = '35,000 PKR';
    else if (form.education.includes('14th')) salaryText = '40,000 PKR';
    else if (form.education.includes('16th')) salaryText = '45,000+ PKR';

    const newApp = {
      id: applications.length + 1,
      name: form.name,
      education: form.education,
      salary: salaryText,
      status: 'Pending'
    };
    setApplications([...applications, newApp]);
    alert('Aap ki application NHO Multan office ke liye kamyabi se jama ho gayi hai!');
    setForm({ name: '', phone: '', education: 'Matric (10th)' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setChatMessages((prev) => [...prev, { sender: 'User', text: userText }]);
    setInputMessage('');

    setTimeout(() => {
      let reply = 'NHO (Nutraceutical Health Organization) Multan mein Khanewal Road, Chowk Kumharan, Al-Noor Hotel ke qareeb waqay hai[cite: 1]. Yahan indoor customer care aur health consultant ka kaam hota hai[cite: 1].';
      
      const lower = userText.toLowerCase();
      if (lower.includes('salary') || lower.includes('tankhuwah')) {
        reply = 'Salary structure: Matric walon ke liye 28,000-30,000+, Inter ke liye 30,000-35,000+, Graduation ke liye 35,000-40,000+, aur Masters ke liye 45,000+ PKR hai[cite: 1]. Saath mein medical aur pension ki sahulat bhi hai[cite: 1]!';
      } else if (lower.includes('location') || lower.includes('pata') || lower.includes('address')) {
        reply = 'Idara Multan mein Khanewal Road, Chowk Kumharan, Al-Noor Hotel ke qareeb hai[cite: 1].';
      } else if (lower.includes('timing') || lower.includes('duty')) {
        reply = 'Duty timing 8 ghante hai, hafte mein Saturday half-day aur Sunday off hota hai[cite: 1].';
      }
      
      setChatMessages((prev) => [...prev, { sender: 'AI', text: reply }]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">NHO Team Hiring Portal (Multan)</h1>
        <nav className="space-x-2">
          <button onClick={() => setActiveTab('home')} className={`px-3 py-1 rounded transition ${activeTab === 'home' ? 'bg-blue-700 font-bold' : 'hover:bg-blue-800'}`}>Home / Details</button>
          <button onClick={() => setActiveTab('apply')} className={`px-3 py-1 rounded transition ${activeTab === 'apply' ? 'bg-blue-700 font-bold' : 'hover:bg-blue-800'}`}>Apply Now</button>
          <button onClick={() => setActiveTab('admin')} className={`px-3 py-1 rounded transition ${activeTab === 'admin' ? 'bg-blue-700 font-bold' : 'hover:bg-blue-800'}`}>Admin Dashboard</button>
          <button onClick={() => setActiveTab('chat')} className={`px-3 py-1 rounded transition ${activeTab === 'chat' ? 'bg-blue-700 font-bold' : 'hover:bg-blue-800'}`}>AI Assistant</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-4xl mx-auto">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Organization Details Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">1. Idaray ki Tafseel (Organization Details)</h2>
              <p className="text-gray-700 mb-4">
                <strong>NHO (Nutraceutical Health Organization)</strong> ek sarkari registered idara hai jo health products aur electronic import/export ka kaam karta hai[cite: 1].
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-bold text-blue-900 mb-1">📍 Location</h3>
                  <p className="text-sm text-gray-700">Multan, Khanewal Road, Chowk Kumharan, Al-Noor Hotel ke qareeb[cite: 1].</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-bold text-blue-900 mb-1">⏰ Duty Timings & Work</h3>
                  <p className="text-sm text-gray-700">Office ke andar customer care aur Health Consultant ka kaam[cite: 1]. 8 ghante duty, Saturday half-day, Sunday off[cite: 1].</p>
                </div>
              </div>
            </div>

            {/* Salary Structure Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">2. Taleem aur Tankhuwah (Salary Structure)</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th className="border p-2.5">Taleem (Education)</th>
                      <th className="border p-2.5">Mahana Tankhuwah</th>
                      <th className="border p-2.5">Facility / Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center hover:bg-gray-50">
                      <td className="border p-2.5 font-medium">10th (Matric)</td>
                      <td className="border p-2.5">28,000 → 30,000+ PKR</td>
                      <td className="border p-2.5 text-green-600 font-semibold">Government Registered[cite: 1]</td>
                    </tr>
                    <tr className="text-center hover:bg-gray-50">
                      <td className="border p-2.5 font-medium">12th (Intermediate)</td>
                      <td className="border p-2.5">30,000 → 35,000+ PKR</td>
                      <td className="border p-2.5">Pension & Retirement[cite: 1]</td>
                    </tr>
                    <tr className="text-center hover:bg-gray-50">
                      <td className="border p-2.5 font-medium">14th (Graduation)</td>
                      <td className="border p-2.5">35,000 → 40,000+ PKR</td>
                      <td className="border p-2.5">Medical Facility[cite: 1]</td>
                    </tr>
                    <tr className="text-center hover:bg-gray-50">
                      <td className="border p-2.5 font-medium">16th (Masters)</td>
                      <td className="border p-2.5">45,000+ PKR</td>
                      <td className="border p-2.5">Har 6 maah baad Promotion[cite: 1]</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Office Environment & Benefits */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">3. Office Environment & Extra Benefits</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                <li><strong>Mahol aur Training:</strong> Naye candidates ke liye professional training ka intezam taake consultancy asaan ho[cite: 1]. Purely indoor, air-conditioned environment[cite: 1].</li>
                <li><strong>Bonuses & Incentives:</strong> Monthly salary ke ilawa target-based bonuses aur performance incentives[cite: 1].</li>
                <li><strong>Growth:</strong> Har 6 mahine baad performance review par promotion ka mauqa[cite: 1].</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'apply' && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">4. Online Team Hiring Form</h2>
            <p className="text-sm text-gray-600 mb-4">Apni details enter karein taake NHO Multan office ke liye application submit ho sakay[cite: 1].</p>
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block font-medium mb-1 text-sm">Aap ka Naam:</label>
                <input 
                  type="text" 
                  value={form.name} 
                  onChange={(e) => setForm({...form, name: e.target.value})} 
                  className="w-full border p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" 
                  placeholder="Poora naam likhein" 
                  required 
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm">Phone Number:</label>
                <input 
                  type="text" 
                  value={form.phone} 
                  onChange={(e) => setForm({...form, phone: e.target.value})} 
                  className="w-full border p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" 
                  placeholder="03XXXXXXXXX" 
                  required 
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm">Taleem (Education):</label>
                <select 
                  value={form.education} 
                  onChange={(e) => setForm({...form, education: e.target.value})} 
                  className="w-full border p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option>10th (Matric)</option>
                  <option>12th (Intermediate)</option>
                  <option>14th (Graduation)</option>
                  <option>16th (Masters)</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-900 text-white p-2.5 rounded-lg font-bold text-sm hover:bg-blue-800 transition">
                Submit Application
              </button>
            </form>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Admin Dashboard (Multan Office)</h2>
            <p className="text-sm text-gray-600 mb-4">Candidates ki list aur un ki applications ka record[cite: 1].</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-blue-50 text-blue-900">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Naam</th>
                    <th className="border p-2">Taleem</th>
                    <th className="border p-2">Tankhuwah</th>
                    <th className="border p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="text-center hover:bg-gray-50">
                      <td className="border p-2">{app.id}</td>
                      <td className="border p-2 font-medium">{app.name}</td>
                      <td className="border p-2">{app.education}</td>
                      <td className="border p-2">{app.salary}</td>
                      <td className="border p-2 font-bold text-green-600">{app.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-lg mx-auto flex flex-col h-[420px]">
            <h2 className="text-xl font-bold text-blue-900 mb-1">AI Assistant (NHO Support)[cite: 1]</h2>
            <p className="text-xs text-gray-500 mb-3">Yahan aap NHO Multan office ki timing, salary ya location ke baray mein pooch sakte hain[cite: 1].</p>
            <div className="flex-1 border border-gray-200 p-3 rounded-lg overflow-y-auto space-y-3 bg-gray-50 mb-3 text-sm">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`p-2.5 rounded-lg max-w-[85%] ${msg.sender === 'AI' ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900 ml-auto'}`}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input 
                type="text" 
                value={inputMessage} 
                onChange={(e) => setInputMessage(e.target.value)} 
                placeholder="Misal: Salary kitni hai ya pata kahan hai?" 
                className="flex-1 border p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" 
              />
              <button type="submit" className="bg-blue-900 text-white px-4 rounded-lg font-bold text-sm hover:bg-blue-800 transition">Bhejein</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
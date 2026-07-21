"use client";

import React, { useState } from 'react';

export default function NHO_Portal() {
  const [activeTab, setActiveTab] = useState('home');
  const [applications, setApplications] = useState([
    { id: 1, name: 'Ali Raza', education: 'Matric (10th)', salary: '30,000', status: 'Pending' },
    { id: 2, name: 'Ahmad Khan', education: 'Intermediate (12th)', salary: '35,000', status: 'Approved' }
  ]);
  
  const [form, setForm] = useState({ name: '', phone: '', education: 'Matric (10th)' });
  const [chatMessages, setChatMessages] = useState([
    { sender: 'AI', text: 'Assalam-o-Alaikum! NHO Portal mein خوش آمدید. Main aap ki kya madad kar sakta hoon?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    const newApp = {
      id: applications.length + 1,
      name: form.name,
      education: form.education,
      salary: form.education.includes('10th') ? '30,000' : '35,000',
      status: 'Pending'
    };
    setApplications([...applications, newApp]);
    alert('Aap ki application kamyabi se jama ho gayi hai!');
    setForm({ name: '', phone: '', education: 'Matric (10th)' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setChatMessages((prev) => [...prev, { sender: 'User', text: userText }]);
    setInputMessage('');

    setTimeout(() => {
      let reply = 'NHO (Nutraceutical Health Organization) Multan mein Khanewal Road, Chowk Kumharan par waqay hai. Office timing 8 ghante hai.';
      if (userText.toLowerCase().includes('salary') || userText.toLowerCase().includes('tankhuwah')) {
        reply = 'Matric ki tankhuwah 28,000 se 30,000, Inter ki 30,000 se 35,000 aur Graduation ki 35,000 se 40,000 hai.';
      } else if (userText.toLowerCase().includes('location') || userText.toLowerCase().includes('pata')) {
        reply = 'Idara Multan mein Khanewal Road, Chowk Kumharan, near Al-Noor Hotel ke paas hai.';
      }
      setChatMessages((prev) => [...prev, { sender: 'AI', text: reply }]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">NHO Official Portal (Multan)</h1>
        <nav className="space-x-2">
          <button onClick={() => setActiveTab('home')} className={`px-3 py-1 rounded transition ${activeTab === 'home' ? 'bg-blue-700 font-bold' : 'hover:bg-blue-800'}`}>Home</button>
          <button onClick={() => setActiveTab('apply')} className={`px-3 py-1 rounded transition ${activeTab === 'apply' ? 'bg-blue-700 font-bold' : 'hover:bg-blue-800'}`}>Apply Now</button>
          <button onClick={() => setActiveTab('admin')} className={`px-3 py-1 rounded transition ${activeTab === 'admin' ? 'bg-blue-700 font-bold' : 'hover:bg-blue-800'}`}>Admin Dashboard</button>
          <button onClick={() => setActiveTab('chat')} className={`px-3 py-1 rounded transition ${activeTab === 'chat' ? 'bg-blue-700 font-bold' : 'hover:bg-blue-800'}`}>AI Assistant</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-4xl mx-auto">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Top Intro Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">NHO - Nutraceutical Health Organization</h2>
              <p className="text-gray-700">Yeh aik sarkari (Government registered) idara hai jis mein pension, retirement aur medical ki sahulat mojood hai.</p>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-bold text-lg text-blue-800 mb-1">📍 Location (Pata)</h3>
                <p className="text-gray-600">Multan, Khanewal Road, Chowk Kumharan, near Al-Noor Hotel.</p>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
                <h3 className="font-bold text-lg text-blue-800 mb-1">⏰ Duty & Timing</h3>
                <p className="text-gray-600">8 ghante duty. Hafte mein Saturday half-day aur Sunday chhutti.</p>
              </div>
            </div>

            {/* Salary Slabs Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-blue-900">💰 Salary Slabs (Tankhuwah)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <span className="font-semibold text-blue-900">10th (Matric):</span> 28,000 → 30,000+
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <span className="font-semibold text-blue-900">12th (Intermediate):</span> 30,000 → 35,000+
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <span className="font-semibold text-blue-900">14th (Graduation):</span> 35,000 → 40,000+
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <span className="font-semibold text-blue-900">16th (Masters):</span> 45,000+
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'apply' && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Online Team Hiring Form</h2>
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Aap ka Naam:</label>
                <input 
                  type="text" 
                  value={form.name} 
                  onChange={(e) => setForm({...form, name: e.target.value})} 
                  className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
                  placeholder="Apna poora naam likhein" 
                  required 
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Phone Number:</label>
                <input 
                  type="text" 
                  value={form.phone} 
                  onChange={(e) => setForm({...form, phone: e.target.value})} 
                  className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
                  placeholder="03XXXXXXXXX" 
                  required 
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Taleem (Education):</label>
                <select 
                  value={form.education} 
                  onChange={(e) => setForm({...form, education: e.target.value})} 
                  className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option>Matric (10th)</option>
                  <option>Intermediate (12th)</option>
                  <option>Graduation (14th)</option>
                  <option>Masters (16th)</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-900 text-white p-2.5 rounded-lg font-bold hover:bg-blue-800 transition">
                Submit Application
              </button>
            </form>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Admin Dashboard - Team Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
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
            <h2 className="text-xl font-bold text-blue-900 mb-2">AI Assistant (NHO Support)</h2>
            <div className="flex-1 border border-gray-200 p-3 rounded-lg overflow-y-auto space-y-3 bg-gray-50 mb-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`p-2.5 rounded-lg max-w-[85%] text-sm ${msg.sender === 'AI' ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900 ml-auto'}`}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input 
                type="text" 
                value={inputMessage} 
                onChange={(e) => setInputMessage(e.target.value)} 
                placeholder="Yahan sawal likhein..." 
                className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
              />
              <button type="submit" className="bg-blue-900 text-white px-4 rounded-lg font-bold hover:bg-blue-800 transition">Bhejein</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
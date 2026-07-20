'use client';

import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  // Form States
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [template, setTemplate] = useState('Modern');
  
  // UI States
  const [loading, setLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState('');
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
      router.push('/login');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleReset = () => {
    setFullName('');
    setJobTitle('');
    setExperience('');
    setSkills('');
    setEducation('');
    setGeneratedResume('');
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          jobTitle,
          skills,
          experience,
          education,
          template,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate resume');
      }

      setGeneratedResume(data.result);
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${fullName} - Resume</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 30px; line-height: 1.6; color: #111; }
              pre { white-space: pre-wrap; font-family: inherit; }
            </style>
          </head>
          <body>
            <pre>${generatedResume}</pre>
            <script>
              window.onload = function() { window.print(); window.close(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b pb-4 border-gray-300 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-blue-500">
            AI Resume Dashboard
          </h1>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-medium"
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            <button
              onClick={handleLogOut}
              className="text-red-500 hover:text-red-600 font-semibold"
            >
              Log Out
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={`p-6 rounded-xl shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Enter Your Details</h2>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
              >
                Clear Form
              </button>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Select Template Style</label>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                  <option value="Modern">Modern Professional</option>
                  <option value="Classic">Classic Executive</option>
                  <option value="Minimal">Minimalist / Clean</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Target Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Skills (Comma separated)"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                />
              </div>

              <div>
                <textarea
                  placeholder="Experience (Work history & achievements)"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  rows={4}
                  required
                />
              </div>

              <div>
                <textarea
                  placeholder="Education (Degrees & Institutes)"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  rows={3}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded font-semibold disabled:bg-blue-400 transition"
              >
                {loading ? 'Generating Resume...' : 'Generate Resume'}
              </button>
            </form>
          </div>

          <div className={`p-6 rounded-xl shadow flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Resume Preview</h2>

              {generatedResume && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCopy}
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm py-1 px-3 rounded font-medium"
                  >
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                  <button
                    onClick={handlePrint}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded font-medium"
                  >
                    Print / PDF
                  </button>
                </div>
              )}
            </div>

            <div className={`whitespace-pre-wrap border rounded p-4 min-h-[420px] flex-grow font-mono text-sm ${darkMode ? 'bg-gray-900 border-gray-700 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-800'}`}>
              {generatedResume || 'Your generated resume will appear here...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
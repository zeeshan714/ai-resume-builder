'use client';

import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    targetJob: '',
    skills: '',
    experience: '',
    education: '',
    template: 'Modern Professional',
  });

  const [resumeHtml, setResumeHtml] = useState('');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResumeHtml(data.resume || '<p>Error generating resume.</p>');
    } catch (err) {
      setResumeHtml('<p>Failed to generate resume.</p>');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-900">AI Resume Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
        >
          Log Out
        </button>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Enter Your Details</h2>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="mt-1 w-full p-2 border rounded border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Target Job Title</label>
              <input
                type="text"
                required
                value={formData.targetJob}
                onChange={(e) => setFormData({ ...formData, targetJob: e.target.value })}
                className="mt-1 w-full p-2 border rounded border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Skills (Comma separated)</label>
              <input
                type="text"
                required
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="mt-1 w-full p-2 border rounded border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience</label>
              <textarea
                rows={3}
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="mt-1 w-full p-2 border rounded border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Education</label>
              <textarea
                rows={3}
                required
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="mt-1 w-full p-2 border rounded border-gray-300"
              />
            </div>
            <button
              type="submit"
              disabled={generating}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {generating ? 'Generating...' : 'Generate Resume'}
            </button>
          </form>
        </div>

        {/* Preview Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Resume Preview</h2>
          <div className="border p-4 rounded min-h-[400px] bg-white">
            {resumeHtml ? (
              <div dangerouslySetInnerHTML={{ __html: resumeHtml }} />
            ) : (
              <p className="text-gray-400">Your generated resume will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
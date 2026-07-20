import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Navbar */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">AI Resume Builder</h1>
        <div className="space-x-4">
          <Link href="/login" className="text-gray-650 hover:text-blue-600 font-medium">Log In</Link>
          <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Sign Up</Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto text-center px-4 py-20 flex-grow flex flex-col justify-center items-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
          Create an <span className="text-blue-600">ATS-Friendly</span> Resume with AI
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Build a professional, tailored resume in seconds. Empowered by AI to help students and job seekers stand out and land interviews.
        </p>
        <Link href="/register" className="bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-md hover:bg-blue-700 transition transform hover:-translate-y-0.5">
          Get Started For Free
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.
      </footer>
    </div>
  );
}
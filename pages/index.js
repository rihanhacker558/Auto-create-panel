import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ username: '', ram: '', adp: '' });
  const [showKey, setShowKey] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [result, setResult] = useState(null);
  const [dark, setDark] = useState(false);

  const handleSubmit = async () => {
    const res = await fetch('/api/create_panel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, key: accessKey })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className={\`min-h-screen flex items-center justify-center transition-colors duration-500 \${dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}\`}>
      <div className={\`bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md \${dark ? 'bg-gray-800' : ''}\`}>
        <h2 className="text-2xl font-bold mb-6 text-center">🚀 Auto Create Pterodactyl Panel</h2>

        <input placeholder="Username" className="border p-2 w-full mb-4 rounded dark:bg-gray-700 dark:border-gray-600"
          value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        <input placeholder="RAM (1-10GB/unli)" className="border p-2 w-full mb-4 rounded dark:bg-gray-700 dark:border-gray-600"
          value={form.ram} onChange={e => setForm({ ...form, ram: e.target.value })} />
        <input placeholder="ADP" className="border p-2 w-full mb-4 rounded dark:bg-gray-700 dark:border-gray-600"
          value={form.adp} onChange={e => setForm({ ...form, adp: e.target.value })} />
        <button onClick={() => setShowKey(true)} className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold p-2 rounded mb-4">
          Konfirmasi
        </button>

        {showKey && (
          <div>
            <input placeholder="Masukkan Key Akses" className="border p-2 w-full mb-4 rounded dark:bg-gray-700 dark:border-gray-600"
              value={accessKey} onChange={e => setAccessKey(e.target.value)} />
            <button onClick={handleSubmit} className="w-full bg-green-500 hover:bg-green-600 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white font-semibold p-2 rounded">
              Submit
            </button>
          </div>
        )}

        <button onClick={() => setDark(!dark)} className="mt-6 w-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold p-2 rounded">
          Switch Theme
        </button>

        {result && (
          <div className="mt-6 text-center">
            {result.status === 'success' ? (
              <div className="bg-green-100 dark:bg-green-800 p-4 rounded shadow">
                <p className="text-green-700 dark:text-green-200 font-semibold">✅ Panel dibuat!</p>
                <p><b>Username:</b> {result.username}</p>
                <p><b>Password:</b> ********</p>
                <p><b>Login Domain:</b> {result.domain_login}</p>
              </div>
            ) : (
              <p className="text-red-600 dark:text-red-300 font-semibold">{result.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
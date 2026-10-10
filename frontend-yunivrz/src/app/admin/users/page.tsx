"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Yunivrz2026!");
  const [roleId, setRoleId] = useState("1");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers = {
        "Accept": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      };

      const [usersRes, rolesRes] = await Promise.allSettled([
        fetch("http://localhost:8000/api/users", { headers }).then(r => r.ok ? r.json() : []),
        fetch("http://localhost:8000/api/roles", { headers }).then(r => r.ok ? r.json() : []),
      ]);

      if (usersRes.status === "fulfilled" && Array.isArray(usersRes.value)) {
        setUsers(usersRes.value);
      }
      if (rolesRes.status === "fulfilled" && Array.isArray(rolesRes.value)) {
        setRoles(rolesRes.value);
        if (rolesRes.value.length > 0) {
          setRoleId(rolesRes.value[0].id.toString());
        }
      }
    } catch (err) {
      console.error("Gagal memuat pengguna:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create User
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role_id: roleId,
          phone
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Gagal membuat pengguna.");
      }

      await fetchData();
      setIsModalOpen(false);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("Yunivrz2026!");
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle Active
  const handleToggleActive = async (user: any) => {
    setActionLoading(user.id);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const newStatus = !user.is_active;
      const res = await fetch(`http://localhost:8000/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ is_active: newStatus })
      });

      if (res.ok) {
        setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_active: newStatus } : u));
      }
    } catch (err) {
      console.error("Gagal update status pengguna:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // Change Role
  const handleChangeRole = async (userId: number, newRoleId: number) => {
    setActionLoading(userId);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ role_id: newRoleId })
      });

      if (res.ok) {
        const updated = await res.json();
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: updated.role, role_id: newRoleId } : u));
      }
    } catch (err) {
      console.error("Gagal ganti role pengguna:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete User
  const handleDeleteUser = async (userId: number, userName: string) => {
    if (!confirm(`Hapus pengguna "${userName}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    setActionLoading(userId);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        }
      });

      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== userId));
      } else {
        const errData = await res.json();
        alert(errData.message || "Gagal menghapus pengguna.");
      }
    } catch (err) {
      console.error("Gagal menghapus pengguna:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // Metrics
  const adminCount = users.filter(u => u.role?.name === 'admin').length;
  const clientCount = users.filter(u => u.role?.name === 'client').length;

  // Filter
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase());

    if (roleFilter === "all") return matchesSearch;
    return matchesSearch && u.role?.name === roleFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2 tracking-tight">
            Pengguna & Peran Akses
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
            Kelola izin akun internal administrator studio dan akun portal klien yang memiliki hak akses sistem.
          </p>
        </motion.div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-[#1C1D22] text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            + Tambah Pengguna Baru
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Semua Pengguna</div>
          <div className="text-2xl font-bold text-gray-900">{users.length} Akun</div>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">Tim Administrator</div>
          <div className="text-2xl font-bold text-purple-700">{adminCount} Admin</div>
          <div className="text-xs text-purple-600/70 mt-1">Akses penuh ke CMS & Dashboard</div>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Pengguna Klien</div>
          <div className="text-2xl font-bold text-blue-700">{clientCount} Klien</div>
          <div className="text-xs text-blue-600/70 mt-1">Akses Portal Klien & Tagihan</div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between bg-white">
          <div className="relative w-full sm:w-80">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama atau email..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50/80 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-500 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold px-3 py-2 text-gray-700 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="all">Semua Peran</option>
              <option value="admin">Administrator</option>
              <option value="client">Klien</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/70 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3.5 text-[11px] font-bold tracking-wider uppercase text-gray-400">Pengguna</th>
                <th className="px-6 py-3.5 text-[11px] font-bold tracking-wider uppercase text-gray-400">Peran Sistem</th>
                <th className="px-6 py-3.5 text-[11px] font-bold tracking-wider uppercase text-gray-400">Kontak</th>
                <th className="px-6 py-3.5 text-[11px] font-bold tracking-wider uppercase text-gray-400">Status</th>
                <th className="px-6 py-3.5 text-[11px] font-bold tracking-wider uppercase text-gray-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                    Memuat data pengguna...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                    {searchQuery ? "Tidak ada pengguna yang cocok." : "Belum ada akun pengguna."}
                  </td>
                </tr>
              ) : filteredUsers.map((user) => {
                const isAdmin = user.role?.name === 'admin';
                return (
                  <tr key={user.id} className="hover:bg-purple-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs uppercase shrink-0 ${
                          isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {user.name ? user.name.slice(0, 2) : "US"}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 flex items-center gap-2">
                            {user.name}
                            {isAdmin && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 text-purple-700 font-bold rounded">
                                Admin
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <select 
                        value={user.role_id || (user.role?.name === 'admin' ? 1 : 2)}
                        onChange={(e) => handleChangeRole(user.id, Number(e.target.value))}
                        disabled={actionLoading === user.id}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border transition-all cursor-pointer ${
                          isAdmin 
                            ? 'bg-purple-50 border-purple-200 text-purple-700' 
                            : 'bg-blue-50 border-blue-200 text-blue-700'
                        }`}
                      >
                        <option value={1}>Administrator</option>
                        <option value={2}>Klien</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 text-xs text-gray-500">
                      {user.phone || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(user)}
                        disabled={actionLoading === user.id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          user.is_active 
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                        title="Klik untuk ubah status aktif/nonaktif"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                        {user.is_active ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          disabled={actionLoading === user.id}
                          className="text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Hapus Pengguna"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div>Menampilkan {filteredUsers.length} dari total {users.length} akun</div>
        </div>
      </div>

      {/* MODAL: TAMBAH PENGGUNA */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Tambah Pengguna Baru</h3>
                  <p className="text-xs text-gray-500">Tentukan peran dan kredensial login akun.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Muhammad Bintang"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Akun</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@yunivrz.com"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Peran / Hak Akses</label>
                    <select 
                      value={roleId}
                      onChange={(e) => setRoleId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900"
                    >
                      <option value="1">Administrator</option>
                      <option value="2">Klien</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nomor HP / WA</label>
                    <input 
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0812..."
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
                  <input 
                    type="text" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 focus:bg-white text-gray-900 font-mono text-xs"
                  />
                </div>

                <div className="pt-3 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2.5 bg-[#1C1D22] hover:bg-gray-800 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
                  >
                    {submitting ? "Menyimpan..." : "Simpan Pengguna"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

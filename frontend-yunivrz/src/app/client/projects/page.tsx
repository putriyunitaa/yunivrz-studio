"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

export default function ClientProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { getWhatsAppUrl } = useSettings();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('http://localhost:8000/api/projects', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded-3xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 tracking-tight mb-2">
          Your Projects
        </h1>
        <p className="text-gray-500">Track and manage all your ongoing and completed projects here.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
        {projects.length === 0 ? (
          <div className="text-center py-20 px-6">
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-8">You haven't started any projects with us yet. Let's create something amazing together.</p>
            <a href={getWhatsAppUrl("Halo Tim Yunivrz Studio, saya ingin memulai proyek baru.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-eclipse-900 text-white font-bold rounded-full hover:bg-eclipse-800 transition-colors">
              Start a New Project
            </a>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {projects.map(project => (
              <div key={project.id} className="p-8 hover:bg-gray-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md">{project.project_code}</span>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md ${
                      project.status === 'completed' ? 'bg-green-100 text-green-700' : 
                      project.status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 max-w-2xl">{project.brief || "No brief provided."}</p>
                </div>
                
                <div className="w-full md:w-48">
                  <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                    <span>Progress</span>
                    <span>{project.progress_percent}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${project.status === 'completed' ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`} 
                      style={{ width: `${project.progress_percent}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

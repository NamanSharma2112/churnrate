"use client";

import { useState, useRef } from "react";
import { useAuthStore } from "@/store/auth";
import { useDashboardStore } from "@/store/dashboard";
import { API_BASE } from "@/lib/api";
import { CloudUploadIcon, File02Icon, CheckmarkCircle01Icon, Loading01Icon } from "hugeicons-react";

export default function ImportPage() {
  const { token } = useAuthStore();
  const { fetchCustomers, fetchDashboard } = useDashboardStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [recentImports, setRecentImports] = useState([
    { id: 1, file: "customers_q3.csv", rows: "12,450", status: "Completed", date: "Today, 10:42 AM" },
  ]);

  const parseCSV = (text: string) => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
    
    return lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      const obj: Record<string, string> = {};
      headers.forEach((header, index) => {
        obj[header] = values[index];
      });
      return obj;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const text = await file.text();
      const data = parseCSV(text);
      
      const formattedCustomers = data.map((row) => ({
        name: row.name || "Unknown",
        email: row.email,
        company: row.company || row.name,
        plan: ["free", "starter", "pro", "enterprise"].includes(row.plan?.toLowerCase()) ? row.plan.toLowerCase() : "free",
        mrr: parseFloat(row.mrr) || 0,
        signupDate: row.signupdate || new Date().toISOString(),
      })).filter(c => c.email); // Only include valid rows with email

      const res = await fetch(`${API_BASE}/api/data/import`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ customers: formattedCustomers }),
      });

      const responseData = await res.json();
      
      if (!res.ok) {
        throw new Error(responseData.message || "Import failed");
      }

      setSuccess(`Successfully imported ${responseData.imported} customers! Skipped ${responseData.skipped}.`);
      setRecentImports([{
        id: Date.now(),
        file: file.name,
        rows: responseData.imported.toString(),
        status: "Completed",
        date: "Just now"
      }, ...recentImports]);
      
      // Refresh global store data
      fetchCustomers();
      fetchDashboard();
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred during import.");
      } else {
        setError("An error occurred during import.");
      }
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Data Import</h1>
          <p className="text-sm text-neutral-500">Import customer data and metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600">
            {loading ? <Loading01Icon size={32} className="animate-spin" /> : <CloudUploadIcon size={32} />}
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">Upload CSV</h3>
          <p className="text-sm text-neutral-500 max-w-sm mb-6">
            Drag and drop your customer data CSV file here, or click to browse. Maximum file size 50MB.
          </p>
          
          {error && <div className="mb-4 text-sm text-red-500 bg-red-50 p-3 rounded-md">{error}</div>}
          {success && <div className="mb-4 text-sm text-emerald-500 bg-emerald-50 p-3 rounded-md">{success}</div>}

          <input 
            type="file" 
            accept=".csv" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
          />
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-lg border-2 border-dashed border-neutral-200 bg-neutral-50 p-12 transition-colors hover:border-indigo-500 hover:bg-indigo-50/50 cursor-pointer flex flex-col items-center justify-center"
          >
             <button disabled={loading} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 shadow-sm disabled:opacity-50">
               {loading ? "Uploading..." : "Select File"}
             </button>
             <span className="text-xs text-neutral-400 mt-4">Required Columns: name, email, company, plan, mrr</span>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm flex flex-col">
          <div className="border-b border-neutral-200 p-5">
            <h3 className="text-lg font-semibold text-neutral-800">Recent Imports</h3>
            <p className="text-sm text-neutral-500">Status of your latest data synchronization</p>
          </div>
          <div className="flex-1 overflow-auto divide-y divide-neutral-100">
            {recentImports.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-5 hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                    <File02Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-800">{job.file}</p>
                    <p className="text-xs text-neutral-500">{job.date} • {job.rows} rows</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                  <CheckmarkCircle01Icon size={14} />
                  {job.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

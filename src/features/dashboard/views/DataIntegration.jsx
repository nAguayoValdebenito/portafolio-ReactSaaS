export default function DataIntegration() {
  return (
    <>
      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter mb-gutter">
        {/* Card 1 – Local Database */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out animate-fade-in-up delay-200">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">dns</span>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
          <h4 className="font-label-md text-label-md text-on-surface mb-1">Local Database</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1">PostgreSQL Core DB</p>
          <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle"></span>
              Connected
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Sync: 10m ago</span>
          </div>
        </div>

        {/* Card 2 – CSV Mass Upload */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out animate-fade-in-up delay-300">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">description</span>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
          <h4 className="font-label-md text-label-md text-on-surface mb-1">CSV Mass Upload</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1">Automated batch processing</p>
          <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle"></span>
              Connected
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Sync: 2h ago</span>
          </div>
        </div>

        {/* Card 3 – ERP API Integration */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out animate-fade-in-up delay-400">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">api</span>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
          <h4 className="font-label-md text-label-md text-on-surface mb-1">ERP API Integration</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1">Real-time SAP sync</p>
          <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle"></span>
              Connected
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Sync: Just now</span>
          </div>
        </div>

        {/* Card 4 – Cloud Storage */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out animate-fade-in-up delay-500">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">cloud</span>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
          <h4 className="font-label-md text-label-md text-on-surface mb-1">Cloud Storage</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 flex-1">AWS S3 Data Lake</p>
          <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle"></span>
              Connected
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Sync: 1h ago</span>
          </div>
        </div>

        {/* Add New Card */}
        <button className="bg-transparent border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all cursor-pointer min-h-[220px] animate-fade-in-up delay-500">
          <span className="material-symbols-outlined text-4xl mb-3">add_circle</span>
          <span className="font-label-md text-label-md">Añadir nueva fuente de datos</span>
        </button>
      </div>

      {/* Security & Audit Section */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-sm overflow-hidden animate-fade-in-up delay-600">
        {/* Security Banner */}
        <div className="bg-secondary-fixed border-b border-outline-variant/30 p-4 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
          </div>
          <div>
            <h4 className="font-label-md text-label-md text-on-secondary-fixed-variant font-bold">Encriptación de Nivel Bancario Activa</h4>
            <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant opacity-80">All data in transit and at rest is secured via AES-256 protocols.</p>
          </div>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant font-semibold">User</th>
                <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant font-semibold">Action</th>
                <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant font-semibold">Timestamp</th>
                <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant font-semibold">IP Address</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-surface">
              <tr className="border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors duration-200">
                <td className="py-4 px-6 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-surface-container-low flex items-center justify-center text-primary font-bold text-xs">JD</div>
                  <span>John Doe</span>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm border border-outline-variant/30">
                    <span className="material-symbols-outlined text-[14px]">login</span>
                    System Login
                  </span>
                </td>
                <td className="py-4 px-6 text-on-surface-variant">Oct 24, 2023 14:32:01 UTC</td>
                <td className="py-4 px-6 font-mono text-xs text-on-surface-variant">192.168.1.104</td>
              </tr>
              <tr className="border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors duration-200">
                <td className="py-4 px-6 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-surface-container-low flex items-center justify-center text-primary font-bold text-xs">SA</div>
                  <span>System API</span>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm border border-outline-variant/30">
                    <span className="material-symbols-outlined text-[14px]">sync</span>
                    ERP Data Sync
                  </span>
                </td>
                <td className="py-4 px-6 text-on-surface-variant">Oct 24, 2023 14:30:00 UTC</td>
                <td className="py-4 px-6 font-mono text-xs text-on-surface-variant">10.0.0.5 (Internal)</td>
              </tr>
              <tr className="border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors duration-200">
                <td className="py-4 px-6 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-surface-container-low flex items-center justify-center text-primary font-bold text-xs">MR</div>
                  <span>Maria Rodriguez</span>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-error-container text-on-error-container font-label-sm text-label-sm border border-error/30">
                    <span className="material-symbols-outlined text-[14px]">download</span>
                    Bulk Export (CSV)
                  </span>
                </td>
                <td className="py-4 px-6 text-on-surface-variant">Oct 24, 2023 13:15:22 UTC</td>
                <td className="py-4 px-6 font-mono text-xs text-on-surface-variant">203.0.113.42</td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors duration-200">
                <td className="py-4 px-6 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-surface-container-low flex items-center justify-center text-primary font-bold text-xs">SA</div>
                  <span>System API</span>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm border border-outline-variant/30">
                    <span className="material-symbols-outlined text-[14px]">database</span>
                    Schema Update
                  </span>
                </td>
                <td className="py-4 px-6 text-on-surface-variant">Oct 24, 2023 12:00:00 UTC</td>
                <td className="py-4 px-6 font-mono text-xs text-on-surface-variant">10.0.0.1 (Internal)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="border-t border-outline-variant/30 p-4 flex justify-between items-center bg-surface-container-lowest">
          <span className="font-body-sm text-body-sm text-on-surface-variant">Showing latest 4 audit logs</span>
          <button className="font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors font-semibold uppercase tracking-wide">
            View Full Audit Trail
          </button>
        </div>
      </div>
    </>
  );
}
'use client';

import { useState } from 'react';
import { DebugPanelProps } from '@/lib/debug';

export function DebugPanel({ title, debugInfo, additionalInfo }: DebugPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="bg-black/95 text-white rounded-lg shadow-2xl border border-gray-700 max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-lg">🐛</span>
            <span className="font-semibold text-sm">{title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-700 rounded text-xs"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? '−' : '+'}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-gray-700 rounded text-xs"
              title="Hide"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-32'}`}>
          <div className="p-3 space-y-2 text-xs">
            {/* Basic Info */}
            <div className="space-y-1">
              <DebugRow label="Slug" value={debugInfo.slug} color="yellow" />
              <DebugRow label="Loading" value={debugInfo.isLoading?.toString()} color="blue" />
              <DebugRow label="Error" value={debugInfo.error ? 'Yes' : 'No'} color={debugInfo.error ? 'red' : 'green'} />
              <DebugRow label="Data" value={debugInfo.data ? 'Loaded' : 'None'} color={debugInfo.data ? 'green' : 'gray'} />
              <DebugRow label="Timestamp" value={debugInfo.timestamp?.split('T')[1]?.split('.')[0]} color="gray" />
            </div>

            {/* Expanded Info */}
            {isExpanded && (
              <>
                {/* API Info */}
                {debugInfo.endpoint && (
                  <div className="mt-3 pt-2 border-t border-gray-700">
                    <div className="text-gray-400 font-semibold mb-1">API Info</div>
                    <DebugRow label="Endpoint" value={debugInfo.endpoint} color="purple" />
                    {debugInfo.data && (
                      <DebugRow 
                        label="Data Keys" 
                        value={Object.keys(debugInfo.data).join(', ')} 
                        color="cyan" 
                      />
                    )}
                  </div>
                )}

                {/* Error Details */}
                {debugInfo.error && (
                  <div className="mt-3 pt-2 border-t border-gray-700">
                    <div className="text-red-400 font-semibold mb-1">Error Details</div>
                    <div className="bg-red-900/30 p-2 rounded text-red-200">
                      <div><strong>Message:</strong> {debugInfo.error.message || 'Unknown'}</div>
                      <div><strong>Status:</strong> {debugInfo.error.status || 'N/A'}</div>
                      {debugInfo.error.url && (
                        <div><strong>URL:</strong> {debugInfo.error.url}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                {additionalInfo && Object.keys(additionalInfo).length > 0 && (
                  <div className="mt-3 pt-2 border-t border-gray-700">
                    <div className="text-gray-400 font-semibold mb-1">Additional Info</div>
                    {Object.entries(additionalInfo).map(([key, value]) => (
                      <DebugRow 
                        key={key} 
                        label={key} 
                        value={typeof value === 'object' ? JSON.stringify(value) : String(value)} 
                        color="orange" 
                      />
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="mt-3 pt-2 border-t border-gray-700 space-y-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => console.log('Debug Info:', { debugInfo, additionalInfo })}
                      className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
                    >
                      Log to Console
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs"
                    >
                      Reload
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        const { testApiEndpoints } = await import('@/lib/api-debug');
                        testApiEndpoints();
                      }}
                      className="px-2 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs"
                    >
                      Test APIs
                    </button>
                    <button
                      onClick={async () => {
                        const { getAvailableAdventures } = await import('@/lib/api-debug');
                        getAvailableAdventures();
                      }}
                      className="px-2 py-1 bg-orange-600 hover:bg-orange-700 rounded text-xs"
                    >
                      List Adventures
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Show button when hidden */}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded-full shadow-lg hover:bg-black/90 transition-all"
          title="Show Debug Panel"
        >
          🐛
        </button>
      )}
    </div>
  );
}

function DebugRow({ label, value, color }: { label: string; value?: string; color: string }) {
  const colorClasses = {
    yellow: 'text-yellow-300',
    blue: 'text-blue-300',
    red: 'text-red-300',
    green: 'text-green-300',
    gray: 'text-gray-300',
    purple: 'text-purple-300',
    cyan: 'text-cyan-300',
    orange: 'text-orange-300',
  };

  return (
    <div className="flex justify-between items-start gap-2">
      <span className="text-gray-400 flex-shrink-0">{label}:</span>
      <span className={`${colorClasses[color as keyof typeof colorClasses] || 'text-white'} text-right break-all`}>
        {value || 'undefined'}
      </span>
    </div>
  );
}

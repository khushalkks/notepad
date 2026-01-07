import React, { useState } from 'react';
import { FileText, Upload, Brain, Download, ZoomIn, ZoomOut, Share2, Printer } from 'lucide-react';

interface MindMapNode {
  title: string;
  children?: MindMapNode[];
}

export default function MindMapGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [mindMapData, setMindMapData] = useState<MindMapNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [zoom, setZoom] = useState(1);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const generateMindMap = async () => {
    if (!file) {
      setError('Please upload a document first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const fileContent = await readFileContent(file);
      
      const response = await fetch("http://localhost:8000/api/mindmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { 
              role: "user", 
              content: `Analyze this document and create a mind map. Return ONLY valid JSON:
{
  "title": "Main Topic",
  "children": [
    {
      "title": "Branch 1",
      "children": [
        {"title": "Sub-topic", "children": []}
      ]
    }
  ]
}

Document: ${fileContent.substring(0, 3000)}` 
            }
          ],
        })
      });

      const data = await response.json();
      
      if (!data.content || !data.content[0]) {
        throw new Error('Invalid response from API');
      }
      
      let text = data.content[0].text;
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      const mindMap = JSON.parse(text) as MindMapNode;
      setMindMapData(mindMap);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate mind map. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          resolve(result);
        } else {
          reject(new Error('Failed to read file as text'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const downloadMindMap = () => {
    if (!mindMapData) return;
    const blob = new Blob([JSON.stringify(mindMapData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mindmap.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderNode = (node: MindMapNode, level: number = 0, index: number = 0): React.ReactNode => {
    if (!node || !node.title) return null;
    
    const colors = [
      'bg-gray-900 border-gray-700',
      'bg-gray-800 border-gray-600',
      'bg-gray-700 border-gray-500',
      'bg-gray-600 border-gray-500',
      'bg-gray-800 border-gray-600'
    ];
    const color = colors[level % colors.length];
    const size = level === 0 ? 'text-2xl px-8 py-6' : level === 1 ? 'text-lg px-6 py-4' : 'text-base px-4 py-3';

    return (
      <div key={`${level}-${index}`} className="flex flex-col items-center">
        <div className={`${color} text-white rounded-xl ${size} shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer max-w-xs text-center font-semibold border-2`}>
          {node.title}
        </div>
        {node.children && node.children.length > 0 && (
          <div className="flex items-start justify-center mt-10 gap-8 flex-wrap">
            {node.children.map((child, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-1 h-10 bg-gray-400 rounded"></div>
                {renderNode(child, level + 1, idx)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-black rounded-2xl shadow-lg">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Mind Map Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Transform your documents into beautiful visual mind maps</p>
        </div>

        {!mindMapData && (
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8 border-2 border-gray-200">
            <div 
              className={`relative border-4 border-dashed rounded-2xl p-12 md:p-16 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-gray-900 bg-gray-100 scale-105' 
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept=".txt,.md,.doc,.docx,.pdf"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer block">
                <div className="mb-6">
                  <div className="inline-block p-6 bg-black rounded-full shadow-xl">
                    <Upload className="w-16 h-16 text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-3">
                  {file ? (
                    <span className="flex items-center justify-center gap-2">
                      <FileText className="w-6 h-6" />
                      {file.name}
                    </span>
                  ) : (
                    'Drop your document here'
                  )}
                </p>
                <p className="text-gray-600 text-lg mb-4">or click to browse</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['TXT', 'MD', 'DOC', 'DOCX', 'PDF'].map((format) => (
                    <span key={format} className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
                      {format}
                    </span>
                  ))}
                </div>
              </label>
            </div>

            {error && (
              <div className="mt-6 bg-red-50 border-2 border-red-400 text-red-800 px-6 py-4 rounded-xl">
                <p className="font-medium">{error}</p>
              </div>
            )}

            <button
              onClick={generateMindMap}
              disabled={loading || !file}
              className="w-full mt-8 bg-black text-white text-xl py-5 px-8 rounded-2xl hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3 font-bold"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-7 w-7 border-b-4 border-white"></div>
                  Creating Mind Map...
                </>
              ) : (
                <>
                  <Brain className="w-7 h-7" />
                  Generate Mind Map
                </>
              )}
            </button>
          </div>
        )}

        {mindMapData && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                    className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all text-gray-800"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setZoom(1)}
                    className="px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all text-gray-800 font-medium"
                  >
                    {Math.round(zoom * 100)}%
                  </button>
                  <button
                    onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                    className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all text-gray-800"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={downloadMindMap}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all shadow-md font-medium"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all shadow-md font-medium"
                  >
                    <Printer className="w-5 h-5" />
                    Print
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
              <div className="overflow-auto" style={{ maxHeight: '700px' }}>
                <div style={{ 
                  transform: `scale(${zoom})`, 
                  transformOrigin: 'top center', 
                  transition: 'transform 0.3s ease',
                  minHeight: '500px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '40px'
                }}>
                  {renderNode(mindMapData)}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setMindMapData(null);
                setFile(null);
                setError('');
              }}
              className="w-full bg-gray-700 text-white py-4 px-6 rounded-2xl hover:bg-gray-600 transition-all shadow-lg font-bold"
            >
              Create New Mind Map
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState, useCallback } from 'react';
import { Editor } from '@monaco-editor/react';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onRun?: (code: string) => Promise<string[]>;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '// Start coding here\nconsole.log("Hello, World!");',
  language = 'javascript',
  onRun,
}) => {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      setError(null);
    }
  };

  const handleRunCode = useCallback(async () => {
    if (!onRun) return;

    setIsRunning(true);
    setOutput([]);
    setError(null);

    try {
      const result = await onRun(code);
      setOutput(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      setOutput([`Error: ${errorMessage}`]);
    } finally {
      setIsRunning(false);
    }
  }, [code, onRun]);

  const handleReset = useCallback(() => {
    setCode(initialCode);
    setOutput([]);
    setError(null);
  }, [initialCode]);

  return (
    <div className="space-y-4">
      <div className="border rounded-xl overflow-hidden shadow-sm">
        <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <select 
            className="bg-gray-700 text-white text-sm rounded-md px-3 py-1 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={language}
            onChange={(e) => e.preventDefault()}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <Editor
          height="400px"
          defaultLanguage={language}
          value={code}
          theme="vs-dark"
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            folding: true,
            lineHeight: 1.5,
            suggestOnTriggerCharacters: true,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>

      <div className="flex justify-between items-center">
        <button 
          className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
            isRunning ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          onClick={handleRunCode}
          disabled={isRunning}
        >
          {isRunning ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Running...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Run Code</span>
            </>
          )}
        </button>

        <div className="flex space-x-2">
          <button 
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      {(output.length > 0 || error) && (
        <div className="mt-4 bg-gray-900 rounded-lg overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 text-white text-sm font-medium flex justify-between items-center">
            <span>Console Output</span>
            {error && (
              <span className="text-red-400 text-xs">Runtime Error</span>
            )}
          </div>
          <div className="p-4 font-mono text-sm">
            {output.map((line, index) => (
              <div 
                key={index} 
                className={`${
                  line.startsWith('Error:') ? 'text-red-400' : 'text-green-400'
                }`}
              >
                {String.fromCharCode(62)} {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
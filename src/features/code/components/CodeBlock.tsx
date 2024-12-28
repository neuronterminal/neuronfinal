import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import { useTheme } from '../hooks/useTheme';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ 
  code, 
  language = 'javascript',
  className = ''
}: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const theme = useTheme();

  useEffect(() => {
    if (preRef.current) {
      Prism.highlightElement(preRef.current);
    }
  }, [code, language]);

  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <pre
        ref={preRef}
        className={`language-${language} p-4 m-0 text-sm leading-relaxed`}
        style={{
          background: theme === 'dark' ? '#0d0208' : '#f8f9fa'
        }}
      >
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
import React from 'react';
import katex from 'katex';

export default function MathRenderer({ content = '', inline = true, className = '' }) {
  if (!content) return null;

  try {
    // If the content already contains $ or $$, parse and render parts
    if (content.includes('$')) {
      const parts = content.split(/(\$\$[\s\S]*?\$\$|\$[^\$]*?\$)/g);
      return (
        <span className={`inline-math-container ${className}`}>
          {parts.map((part, idx) => {
            if (part.startsWith('$$') && part.endsWith('$$')) {
              const rawMath = part.slice(2, -2).trim();
              const html = katex.renderToString(rawMath, { displayMode: true, throwOnError: false });
              return <span key={idx} className="block my-2" dangerouslySetInnerHTML={{ __html: html }} />;
            } else if (part.startsWith('$') && part.endsWith('$')) {
              const rawMath = part.slice(1, -1).trim();
              const html = katex.renderToString(rawMath, { displayMode: false, throwOnError: false });
              return <span key={idx} dangerouslySetInnerHTML={{ __html: html }} />;
            }
            return <span key={idx}>{part}</span>;
          })}
        </span>
      );
    }

    // Direct latex string passed
    const html = katex.renderToString(content, {
      displayMode: !inline,
      throwOnError: false,
    });
    return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (err) {
    return <span className={className}>{content}</span>;
  }
}

import React from 'react'
import {LuCopy ,LuCheck,LuCode} from "react-icons/lu";
import ReactMarkdown from  'react-icons/lu';
import remarkGfm from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {oneLight} from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIResponsePreview = (content)=>{
    if(!content) return null;
    return(
        <div className="max-w-4xl mx-auto">
            <div className="text-[14px] prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                p({ children }) {
                    return <p className="mb-4 leading-5">{children}</p>;
                },
                strong({ children }) {
                    return <strong>{children}</strong>;
                },
                em({ children }) {
                    return <em>{children}</em>;
                },
                 ul({ children }) {
    return <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="list-decimal pl-6 space-y-2 my-4">{children}</ol>;
  },
  li({ children }) {
    return <li className="mb-1">{children}</li>;
  },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4">
        {children}
      </blockquote>
    );
  },
    h1({ children }) {
        return <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>;
    },
    h2({ children }) {
        return <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>;
    },
    h3({ children }) {
        return <h3 className="text-lg font-bold mt-5 mb-2">{children}</h3>;
    },
    h4({ children }) {
        return <h4 className="text-base font-bold mt-4 mb-2">{children}</h4>;
    },

        }}
    />
    </div>
    </div>

    )
}
"use client"

import React, { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import dynamic from "next/dynamic";

type IParams = {
  initialContent: string;
}

const Editor: React.FC<IParams> = ({initialContent}) => {
    const editorRef = useRef(null);
    const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    useEffect(() => {
      if (!editorRef.current) return;

      console.log('Rendering editor with content:', initialContent);

      monacoEditorRef.current = monaco.editor.create(editorRef.current!, {
        value: initialContent,
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: {
          enabled: true, 
        },
        scrollbar: {
          vertical: 'visible', 
          horizontal: 'visible', 
        },
        wordWrap: 'on',
        tabSize: 2, 
        insertSpaces: true, 
        fontSize: 14, 
        fontFamily: 'Courier New, monospace',
        renderWhitespace: 'all', 
        renderLineHighlight: 'all',
        formatOnType: true,
        formatOnPaste: true, 
        folding: true,
        showFoldingControls: 'always', 
        lineNumbers: 'on', 
        roundedSelection: false, 
        autoIndent: 'advanced', 
        suggestOnTriggerCharacters: true, 
        parameterHints: {
          enabled: true, 
        },
        quickSuggestions: {
          other: true,
          comments: true,
          strings: true,
        },
        suggestSelection: 'first', 
        acceptSuggestionOnEnter: 'on', 
      });
  
      // editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function() {
      //   alert('Ctrl+S foi pressionado!');
      // });

      // editor.onDidChangeModelContent(() => {
      // onChange(editor.getValue());
      // });
      
      return () => {
        monacoEditorRef.current?.dispose();
        monacoEditorRef.current = null;
      };
    }, [initialContent]);
    
    return <div ref={editorRef} className="flex w-full h-screen"/>; 
}

export default dynamic(() => Promise.resolve(Editor), { ssr: false });

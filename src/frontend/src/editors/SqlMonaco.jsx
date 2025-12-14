import React, { useRef, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';


export default function SqlMonaco({ value, onChange }){
const monacoRef = useRef();
function editorDidMount(editor, monaco) {
monacoRef.current = monaco;
monaco.languages.register({ id: 'sql_custom' });
monaco.languages.setMonarchTokensProvider('sql_custom', monaco.languages.getEncodedLanguage('sql') || {});
// Basic SQL intellisense: you can push completions from backend into this list
monaco.languages.registerCompletionItemProvider('sql_custom', {
provideCompletionItems: () => {
const suggestions = [
{ label: 'SELECT', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'SELECT' },
{ label: 'FROM', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'FROM' },
{ label: 'WHERE', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'WHERE' }
];
return { suggestions };
}
});
editor.updateOptions({ tabSize: 2, insertSpaces: true });
}


return (
<div style={{height: 360}}>
<MonacoEditor
width="100%"
height="100%"
language="sql"
theme="vs-light"
value={value}
onChange={onChange}
editorDidMount={editorDidMount}
options={{ automaticLayout: true, minimap: { enabled: false } }}
/>
</div>
);
}
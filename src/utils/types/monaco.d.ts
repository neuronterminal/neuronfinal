
declare module '@monaco-editor/react' {
  // Extending the IStandaloneThemeData interface
  interface IStandaloneThemeData {
    base: 'vs' | 'vs-dark' | 'hc-black'; // Correct theme options
  }
}

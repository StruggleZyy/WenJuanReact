declare module 'redux-undo' {
  export const ActionCreators: {
    undo: () => { type: string };
    redo: () => { type: string };
    clearHistory: () => { type: string };
  };
}
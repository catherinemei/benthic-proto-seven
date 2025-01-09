import type { Component } from "solid-js";
import { TraversalOutputComponentKeyboardParentFocus } from "./priority-traversal-parent-focus";

import { aspirinHypergraph } from "./input-aspirin";

const App: Component = () => {
  return (
    <TraversalOutputComponentKeyboardParentFocus
      nodeGraph={aspirinHypergraph}
      showHypergraph={false}
    />
  );
};

export default App;

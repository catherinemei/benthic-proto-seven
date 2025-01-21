import {
  For,
  createSignal,
  Show,
  createMemo,
  onMount,
  onCleanup,
} from "solid-js";
import {
  TraversalOutputProps,
  HypergraphNodeProps,
  RelationNode,
} from "./priority-traversal-types";

/**
 * Component to output the traversal structure to the DOM
 * Contains both the visualization for the traversal structure (optional) and
 * also screen reader output for traversal structure
 */
export function TraversalOutputComponentKeyboardParentFocus(
  props: TraversalOutputProps
) {
  const [currentNodeId, setCurrentNodeId] = createSignal<string | null>(
    props.nodeGraph[0].id
  );

  // Keeps track of traversal history for undo
  const [history, setHistory] = createSignal<string[]>(["0"]);

  // This will store the default paths from the root node to each node
  const [defaultPaths, setDefaultPaths] = createSignal<Map<string, string[]>>(
    new Map()
  );

  // Keep track of list of nodes to show on screen
  const [displayedNodes, setDisplayedNodes] = createSignal<RelationNode[]>([
    props.nodeGraph[0],
  ]);

  const handleNodeClick = (oldId: string, newId: string) => {
    // Possibilities for click interaction on non-parent list
    // 1. Click on an adjacent node (sibling), then focus moves to that sibling node; update history to be on that node
    // 2. Click on belongs to - goes to list of parent nodes in same format
    // 3. Click on contains - goes to first child of current node

    if (oldId === "-1" || newId === "-1" || !oldId || !newId) {
      return;
    }

    const nodeSiblings = findSiblingOfFocusedParent(oldId);
    let finalFocusedNode = newId;

    if (nodeSiblings.includes(newId)) {
      // Case 1
      const curHistory = history();
      curHistory.pop();
      setHistory([...curHistory, newId]);
    } else if (newId === `node-${oldId}-belongsto`) {
      // Case 2
      const oldNodeParentIds = props.nodeGraph[oldId].parents;

      // check for the case where this is at the root
      // if at root, then do nothing
      if (oldNodeParentIds.length === 0) {
        return;
      }

      const oldNodeParents = oldNodeParentIds.map(
        (parentId) => props.nodeGraph[parentId]
      );
      setDisplayedNodes(oldNodeParents);

      // pop last node off history since going up a layer
      const curHistory = history();
      curHistory.pop();
      setHistory([...curHistory]);

      finalFocusedNode = oldNodeParentIds[0];
    } else if (newId === `node-${oldId}-contains`) {
      // Case 3
      const childrenNodeIds = props.nodeGraph[oldId].children;

      // no children, then do nothing
      if (childrenNodeIds.length === 0) {
        return;
      }

      // else navigate to children node and display all children of current node
      setDisplayedNodes(
        childrenNodeIds.map((childId) => props.nodeGraph[childId])
      );

      const curHistory = history();
      setHistory([...curHistory, oldId]);

      finalFocusedNode = childrenNodeIds[0];
    }

    setCurrentNodeId(finalFocusedNode);

    // Moves screen reader focus
    setTimeout(() => {
      const newNode = document.getElementById(`info-${finalFocusedNode}`);

      if (newNode) {
        if (!newNode.hasAttribute("tabindex")) {
          newNode.setAttribute("tabindex", "0");
        }
        newNode.focus();
      }
    }, 0);
  };

  const currentNode = createMemo(() => {
    if (currentNodeId() !== null) {
      return props.nodeGraph[currentNodeId()!];
    }
    return props.nodeGraph[0]; // Default to the first node if none is selected
  });

  const findSiblingOfFocusedParent = (nodeId: string): string[] => {
    if (history().length === 1) {
      return [];
    } else {
      const focusedParent = history()[history().length - 2];
      const allChildrenOfParent = props.nodeGraph[focusedParent].children;
      const siblingsOnly = allChildrenOfParent.filter((childId) => {
        return childId !== nodeId;
      });

      return siblingsOnly;
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp" && event.shiftKey) {
      // Finds current focused element, then
      // Shift + Arrow Up effectively clicks on "belongs to" button for current focused element

      const focusedElement = document.activeElement as HTMLElement;
      const focusedElementId = focusedElement?.id;

      const nodeId = focusedElementId.split("-")[1];

      if (focusedElementId.startsWith("info-")) {
        const parentButton = document.getElementById(
          `node-${nodeId}-belongsto`
        );
        if (parentButton) {
          parentButton.click();
        }
      } else {
        event.preventDefault();
      }

      event.preventDefault();
    } else if (event.key === "ArrowDown" && event.shiftKey) {
      // Shift + Arrow Down effectively clicks on "contains" button for current focused element

      const focusedElement = document.activeElement as HTMLElement;
      const focusedElementId = focusedElement?.id;
      const nodeId = focusedElementId.split("-")[1];

      if (focusedElementId.startsWith("info-")) {
        const childrenButton = document.getElementById(
          `node-${nodeId}-contains`
        );
        if (childrenButton) {
          childrenButton.click();
        }
      } else {
        event.preventDefault();
      }

      event.preventDefault();
    } else if (event.key === "h") {
      const titleSection = document.getElementById(`home`);

      const lastNodeId = history()[history().length - 1];
      const lastNodeElement = document.getElementById(`info-${lastNodeId}`);

      if (lastNodeElement) {
        lastNodeElement.focus();
      } else {
        titleSection?.focus();
      }
    } else if (event.key === "Backspace") {
      setHistory((prev) => {
        const newHistory = [...prev];
        const currentNode = newHistory.pop();
        const previousNodeId = newHistory[newHistory.length - 1];

        if (previousNodeId) {
          // used to announce undo action
          const undoMessage = document.getElementById("undo-text");
          if (undoMessage) {
            undoMessage.focus();
          }

          setCurrentNodeId(previousNodeId);

          // reset focus to previous node after announcement
          setTimeout(() => {
            const newNode = document.getElementById(`info-${previousNodeId}`);
            if (newNode) {
              newNode.focus();
            }
          }, 1000);
        }
        return newHistory;
      });
    } else if (
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowUp" ||
      event.key === "ArrowDown"
    ) {
      const focusedElement = document.activeElement as HTMLElement;
      const focusedElementId = focusedElement?.id;

      if (focusedElementId.startsWith("info-") || focusedElementId === "home") {
        const elmInGroup = Array.from(
          document.querySelectorAll(`#home li`)
        ) as HTMLElement[];

        const currentIndex = elmInGroup.indexOf(focusedElement);
        let newIndex = currentIndex;

        if (
          (event.key === "ArrowLeft" || event.key === "ArrowUp") &&
          currentIndex > 0
        ) {
          newIndex = currentIndex - 1;
        } else if (
          (event.key === "ArrowRight" || event.key === "ArrowDown") &&
          currentIndex < elmInGroup.length - 1
        ) {
          newIndex = currentIndex + 1;
        }

        const newNodeId = elmInGroup[newIndex]?.id.split("info-")[1];
        if (newNodeId) {
          const historyList = history();
          const previousAdjNode = historyList.pop();
          setHistory([...historyList, newNodeId]);
          setCurrentNodeId(newNodeId);
        }
        elmInGroup[newIndex]?.focus();

        event.preventDefault();
      } else if (focusedElementId.startsWith("context")) {
        // Navigating around while on one of the nodes within parent-context list
        const contextElms = Array.from(
          document.querySelectorAll(`#parent-context li`)
        ) as HTMLElement[];

        const currentIndex = contextElms.indexOf(focusedElement);
        let newIndex = currentIndex;

        if (
          (event.key === "ArrowLeft" || event.key === "ArrowUp") &&
          currentIndex > 0
        ) {
          newIndex = currentIndex - 1;
          contextElms[newIndex]?.focus();
        } else if (
          (event.key === "ArrowRight" || event.key === "ArrowDown") &&
          currentIndex < contextElms.length - 1
        ) {
          newIndex = currentIndex + 1;
          contextElms[newIndex]?.focus();
        } else if (
          (event.key === "ArrowLeft" || event.key === "ArrowUp") &&
          currentIndex <= 0
        ) {
          const parentGroup = document.getElementById("parents-group");
          parentGroup?.focus();
        } else if (
          (event.key === "ArrowRight" || event.key === "ArrowDown") &&
          currentIndex >= contextElms.length - 1
        ) {
          const parentGroup = document.getElementById("parents-group");
          parentGroup?.focus();
        }
        event.preventDefault();
      } else if (focusedElementId === "parents-group") {
        // Selecting another parent to focus on
        const contextElms = Array.from(
          document.querySelectorAll(`#option-nodes li`)
        ) as HTMLElement[];
        contextElms[0]?.focus();
        event.preventDefault();
      } else {
        event.preventDefault();
      }
    } else if (event.key === "Enter") {
      const focusedElement = document.activeElement as HTMLElement;
      const focusedElementId = focusedElement?.id;

      if (focusedElementId.startsWith("info-")) {
        const firstChildId = props.nodeGraph[currentNodeId()!].children[0];
        if (firstChildId) {
          // update history list with traversed children node
          setHistory((prev) => [...prev, firstChildId]);

          setCurrentNodeId(firstChildId);

          const newSection = document.getElementById(`info-${firstChildId}`);
          if (newSection) {
            newSection.focus();
          }
        }
      } else if (focusedElementId.startsWith("context")) {
        const newParentId = focusedElementId.split("-")[3];
        let curHistory = history();
        const curNodeId = curHistory.pop();
        const oldParent = curHistory.pop();
        setHistory((prev) => [...curHistory, newParentId, currentNodeId()!]);
        setCurrentNodeId(currentNodeId());

        const newCurrentNodeSection = document.getElementById(
          `info-${currentNodeId()}`
        );
        if (newCurrentNodeSection) {
          newCurrentNodeSection.focus();
        }
      } else {
        event.preventDefault();
      }
    } else {
      event.preventDefault();
    }
  };

  onMount(() => {
    const paths = calculateDefaultPaths(props.nodeGraph);
    setDefaultPaths(paths);

    window.addEventListener("keydown", handleKeyPress);
  });

  onCleanup(() => {
    window.removeEventListener("keydown", handleKeyPress);
  });

  return (
    <Show when={currentNodeId()}>
      <HypergraphNodeComponentKeyboardOnly
        displayedNodes={displayedNodes()}
        node={currentNode()}
        nodeGraph={props.nodeGraph}
        onNodeClick={handleNodeClick}
      />
    </Show>
  );
}

export function HypergraphNodeComponentKeyboardOnly(
  props: HypergraphNodeProps
) {
  return (
    <div>
      <ul id="home" tabindex="0" aria-live="assertive">
        <For
          each={props.displayedNodes}
          fallback={<li style={{ color: "grey" }}>None</li>}
        >
          {(node, idx) => (
            <li
              id={`info-${node.id}`}
              tabindex="0"
              aria-label={`${idx() + 1} of ${props.displayedNodes.length}.  ${
                node.displayName
              }; ${node.descriptionTokens?.longDescription}`}
            >
              <span>
                {node.displayName}: {node.descriptionTokens?.longDescription}
              </span>
              <button
                aria-label={`Contains button for ${node.displayName}. Press to navigate to its children.`}
                onClick={() =>
                  props.onNodeClick(node.id, `node-${node.id}-contains`)
                }
                id={`node-${node.id}-contains`}
              >
                Contains
              </button>
              <button
                aria-label={`Belongs To button for ${node.displayName}. Press to navigate to its parents.`}
                onClick={() =>
                  props.onNodeClick(node.id, `node-${node.id}-belongsto`)
                }
                id={`node-${node.id}-belongsto`}
              >
                Belongs To
              </button>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}

/**
 * Function to calculate the shortest path from root (node "0") to all other nodes.
 * This function uses BFS to explore the graph and generates a map of default paths.
 */
function calculateDefaultPaths(
  nodeGraph: Record<string, any>,
  rootId: string = "0"
) {
  const defaultPaths = new Map<string, string[]>();
  const queue: [string, string[]][] = [[rootId, [rootId]]]; // Tuple of [currentNode, path to currentNode]

  while (queue.length > 0) {
    const [currentNodeId, pathToCurrent] = queue.shift()!;

    // If this node is already visited, skip it
    if (defaultPaths.has(currentNodeId)) continue;

    // Store the path to the current node
    defaultPaths.set(currentNodeId, pathToCurrent);

    // Explore the children of the current node and continue BFS
    const children = nodeGraph[currentNodeId].children;
    for (const childId of children) {
      if (!defaultPaths.has(childId)) {
        queue.push([childId, [...pathToCurrent, childId]]);
      }
    }
  }

  return defaultPaths;
}

import type { SvelteTypes } from "../types/svelte"

const replaceNode = (nodeToReplace: HTMLElement, node?: HTMLElement): void => {
  if (!node) return;
  nodeToReplace.parentElement?.insertBefore(node, nodeToReplace)
  nodeToReplace.remove()
}
/** 
 * Use this to render HTMLElements since Svelte doesn't have a native support for this.
 * Useful for caching elements.
 * */
export const replace: SvelteTypes.Action<HTMLElement | undefined> = (nodeToReplace, node?) => {
  replaceNode(nodeToReplace, node)
  return {
    update: (node) => {
      replaceNode(nodeToReplace, node)
    }
  }
}
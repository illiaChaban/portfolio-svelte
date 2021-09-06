export namespace SvelteTypes {
  export type Action<TArg = never> = (node: HTMLElement, arg: TArg) => {
    update?: (parameters: TArg) => void,
    destroy?: () => void
  } | void
}
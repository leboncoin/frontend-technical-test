declare module '*.svg' {
  export type SVGComponent = React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >;

  export const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >;

  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const content: string;
  export default content;
}

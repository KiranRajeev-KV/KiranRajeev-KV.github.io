import type * as React from 'react'

declare module '*.mdx' {
  import type { MDXComponents } from 'mdx/types.js'
  export const components: MDXComponents
  const MDXContent: (props: { components?: MDXComponents }) => React.JSX.Element
  export default MDXContent
}

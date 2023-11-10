This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

##Dev Notes Instructions

---------------------Work with common layout---------------------

The solution provided is in line with the best practices recommended by the Next.js documentation:

https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts

1. Define a Layout Component
Create a layout component that will be used to wrap your pages. This component should accept a children prop, which will be used to render the specific content for each page. Here's an example of a simple layout component:

// components/layout.js
import React from 'react';
import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';

const Layout = ({ children }) => {
  return (
    <>
      <AppTopbar />
      <main>{children}</main>
      <AppFooter />
    </>
  );
}

export default Layout;

2. Define a Custom App Component
In your _app.tsx file, define a custom App component that uses the getLayout function from each page to wrap the page content with the appropriate layout. If a page does not define a getLayout function, it will default to rendering the page content as is.

// pages/_app.tsx
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageProps: P) => ReactNode
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
 
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />, pageProps)
}

3. Define a Page with a Layout
When defining a page, you can specify a getLayout function that returns the page content wrapped with your layout component. Here's an example:

// pages/index.tsx
import React from 'react';
import Layout from '../components/layout';

const Page = () => {
  return <p>Hello, world!</p>;
}

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Page;

4. Define a Page without a Layout
If a page does not need a layout, simply do not define a getLayout function for that page. The page content will be rendered as is. Here's an example:

// pages/login.tsx
import React from 'react';

const Login = () => {
  return <p>Login page</p>;
}

export default Login;

Remember, the getLayout function is optional. If a page does not define a getLayout function, the _app.tsx file will default to rendering the page content without a layout.

This approach allows you to define a layout on a per-page basis, and even have complex nested layouts if desired. It also enables state persistence between page transitions, providing a Single-Page Application (SPA) experience.

---------------------Work with props of layout---------------------

1. Pass Props to Layout in getLayout Function
When defining the getLayout function for a page, you can pass any props you need to your layout component. In your example, you are passing a currentUser prop to the Layout component:

// pages/index.tsx
Page.getLayout = function getLayout(page: ReactElement, pageProps: any) {
    return <Layout currentUser={pageProps.currentUser}>{page}</Layout>
}

In this case, pageProps is an object containing all the props that were passed to the page component. You can access these props in the getLayout function and pass any of them to your layout component.

2. Access Props in Layout Component
In your layout component, you can access the props passed from the getLayout function just like you would with any other React component. In your example, you are accessing the currentUser prop in the Layout component:

// components/layout.js
const Layout = ({ children, currentUser }) => {
  // You can now use the `currentUser` prop in your layout component
  // ...
}

Here, currentUser is a prop that was passed from the getLayout function in your page component. You can use this prop in your layout component to customize the layout based on the current user.

Remember, you can pass any props you need from your page component to your layout component using this method. This allows you to customize your layout on a per-page basis, based on the props passed to each page.
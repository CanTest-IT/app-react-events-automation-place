import React, { ReactElement } from 'react';
import Layout from '../components/Layout';
import EventList from '../components/eventlist/EventList';
import UserService from '../service/UserService';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../jwt';
import { GetServerSidePropsContext } from 'next';
import { getUserFromToken } from '../utils/getUserFromToken';


export const RTLContext = React.createContext(null);
export const CurrentUserContext = React.createContext(null);

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const user = await getUserFromToken(context);
    return {
      props: {
          currentUser: user
      },
    }
}

const Page = ({ currentUser }) => {
    return <EventList currentUser={currentUser} />;
}

Page.getLayout = function getLayout(page: ReactElement, pageProps: any) {
    return <Layout currentUser={pageProps.currentUser}>{page}</Layout>
}

export default Page;
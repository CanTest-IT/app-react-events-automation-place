import React, { ReactElement } from 'react';
import Layout from '../../components/layout';
import { GetServerSidePropsContext } from 'next';
import { getUserFromToken } from '../../utils/getUserFromToken';

const NewBlankPage = ({ currentUser }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1 style={{ fontSize: '5em' }}>New Blank Page</h1>
            <p style={{ fontSize: '5em', color: '#ff5c13' }}>Siema, {currentUser.name}!</p>
        </div>
    );
}

NewBlankPage.getLayout = function getLayout(page: ReactElement, pageProps: any) {
    return <Layout currentUser={pageProps.currentUser}>{page}</Layout>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const user = await getUserFromToken(context);
    return {
      props: {
          currentUser: user
      },
    }
}

export default NewBlankPage;
import React, { useContext } from 'react';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';

const AppFooter = (props) => {

    const isRTL = true

    return <div className="layout-footer flex align-items-center p-4 shadow-2">
        <Button onClick={() => window.open('https://github.com/CanTest-IT')} type="button" icon="pi pi-github fs-large" className={classNames('p-button-rounded p-button-text p-button-plain', { 'mr-2': !isRTL, 'ml-2': isRTL })}></Button>
        <Button onClick={() => window.open('https://www.facebook.com/cantest.it')} type="button" icon="pi pi-facebook fs-large" className={classNames('p-button-rounded p-button-text p-button-plain', { 'mr-2': !isRTL, 'ml-2': isRTL })}></Button>
    </div>

}

export default AppFooter;

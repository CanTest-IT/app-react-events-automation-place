import React, { useContext, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { MegaMenu } from 'primereact/megamenu';
import { useHistory } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { CSSTransition } from 'react-transition-group';

const AppTopbar = (props) => {

    const isRTL = true
    const history = {} //useHistory();

    // Fixed for 6.1.0
    // eslint-disable-next-line
    const searchPanel = useRef(null)

    useEffect(() => {
        // Fixed for 6.1.0
        /*if (props.searchActive) {
            searchPanel.current.element.focus();
        }*/
    }, [props.searchActive])

    const onInputKeydown = (event) => {
        const key = event.which;

        //escape, tab and enter
        if (key === 27 || key === 9 || key === 13) {
            props.onSearch(false);
        }
    };

    const model = [
        {
            label: 'UI KIT',
            items: [
                [
                    {
                        label: 'UI KIT 1',
                        items: [
                            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', command: () => { history.push('/uikit/formlayout') } },
                            { label: 'Input', icon: 'pi pi-fw pi-check-square', command: () => { history.push('/uikit/input') } },
                            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', command: () => { history.push('/uikit/floatlabel') } },
                            { label: 'Button', icon: 'pi pi-fw pi-mobile', command: () => { history.push('/uikit/button') } },
                            { label: 'File', icon: 'pi pi-fw pi-file', command: () => { history.push('/uikit/file') } }
                        ]
                    }
                ],
                [
                    {
                        label: 'UI KIT 2',
                        items: [
                            { label: 'Table', icon: 'pi pi-fw pi-table', command: () => { history.push('/uikit/table') } },
                            { label: 'List', icon: 'pi pi-fw pi-list', command: () => { history.push('/uikit/list') } },
                            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', command: () => { history.push('/uikit/tree') } },
                            { label: 'Panel', icon: 'pi pi-fw pi-tablet', command: () => { history.push('/uikit/panel') } },
                            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', command: () => { history.push('/uikit/chart') } }
                        ]
                    }
                ],
                [
                    {
                        label: 'UI KIT 3',
                        items: [
                            { label: 'Overlay', icon: 'pi pi-fw pi-clone', command: () => { history.push('/uikit/overlay') } },
                            { label: 'Menu', icon: 'pi pi-fw pi-bars', command: () => { history.push('/uikit/menu') } },
                            { label: 'Message', icon: 'pi pi-fw pi-comment', command: () => { history.push('/uikit/message') } },
                            { label: 'Misc', icon: 'pi pi-fw pi-circle', command: () => { history.push('/uikit/misc') } }
                        ]
                    }
                ]
            ]
        },
        {
            label: 'PAGES',
            items: [
                [
                    {
                        label: 'PAGES 1',
                        items: [
                            { label: 'Access', icon: 'pi pi-fw pi-lock', command: () => { history.push('/access') } },
                            { label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', command: () => { history.push('/pages/calendar') } }
                        ]
                    },
                    {
                        label: 'PAGES 2',
                        items: [
                            { label: 'Crud', icon: 'pi pi-fw pi-pencil', command: () => { history.push('/pages/crud') } },
                            { label: 'Empty Page', icon: 'pi pi-fw pi-circle', command: () => { history.push('/pages/empty') } }

                        ]
                    }
                ],
                [
                    {
                        label: 'PAGES 3',
                        items: [
                            { label: 'Timeline', icon: 'pi pi-fw pi-calendar', command: () => { history.push('/pages/timeline') } },
                            { label: 'Help', icon: 'pi pi-fw pi-question-circle', command: () => { history.push('/pages/help') } }

                        ]
                    },
                    {
                        label: 'PAGES 4',
                        items: [
                            { label: 'Invoice', icon: 'pi pi-fw pi-dollar', command: () => { history.push('/pages/invoice') } },
                            { label: 'Landing', icon: 'pi pi-fw pi-globe', command: () => { history.push('/landing') } }
                        ]
                    }
                ],
                [
                    {
                        label: 'PAGES 5',
                        items: [
                            { label: 'Login', icon: 'pi pi-fw pi-sign-in', command: () => { history.push('/login') } },
                            { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', command: () => { history.push('/notfound') } },
                            { label: 'Error', icon: 'pi pi-fw pi-times-circle', command: () => { history.push('/error') } },
                        ]
                    }
                ],
            ]
        }
    ];

    return (
        <div className="layout-topbar shadow-4">
            <div className="layout-topbar-left">
                <button type="button" style={{ cursor: 'pointer', padding: 40 }} className="layout-topbar-logo p-link" onClick={() => history.push('/')}>
                <svg preserveAspectRatio="xMidYMid meet" data-bbox="-0.011 -0.06 236.741 34.21" viewBox="-0.011 -0.06 236.741 34.21" xmlns="http://www.w3.org/2000/svg" data-type="color" role="img" aria-labelledby="svgcid-5u5zdv-xm1upd"><defs></defs><title id="svgcid-5u5zdv-xm1upd">logo cantest it</title>
                    <g>
                        <g>
                            <path d="M18.19 31.11c.72 0 1.11.48 1.11 1.44S18.91 34 18.19 34H7.78A7.39 7.39 0 0 1 0 26.21V17c0-4.61 3.17-8 7.73-8h6C18.39 9 21 11.71 21 15.94v.57c0 .72-.53 1.16-1.44 1.16s-1.44-.44-1.44-1.16v-.76c0-2.45-1.49-3.84-4.13-3.84h-6.5a4.44 4.44 0 0 0-4.61 4.65v10.13a4.31 4.31 0 0 0 4.61 4.42z" fill="#ffffff" data-color="1"></path>
                            <path d="M49.44 33c0 .77-.48 1.15-1.44 1.15s-1.44-.38-1.44-1.15v-2.47L44 32.69a6.93 6.93 0 0 1-4.32 1.39h-4.45c-4.22 0-6.86-2.54-6.86-6.33v-3.7a6.45 6.45 0 0 1 6.38-6.43h4.56A6 6 0 0 1 43 19.15l3.6 3.17v-5.85c0-3.12-1.78-4.61-4.9-4.61h-9.3c-.72 0-1.1-.48-1.1-1.4S31.68 9 32.4 9H42a7.15 7.15 0 0 1 7.49 7.45zm-2.88-5.33v-2.13l-4.08-3.84a4.8 4.8 0 0 0-3.7-1.49h-3.84a3.67 3.67 0 0 0-3.74 4v3.89c0 2.26 1.58 3.46 3.74 3.46h5.24a5 5 0 0 0 3.4-1.39z" fill="#ffffff" data-color="1"></path>
                            <path d="M79.25 33c0 .77-.48 1.15-1.44 1.15s-1.44-.38-1.44-1.15V16a4.49 4.49 0 0 0-4-4.28h-3.25a5.08 5.08 0 0 0-3.79 1.54l-4.52 4.46V33c0 .77-.48 1.15-1.39 1.15s-1.49-.38-1.49-1.15V10.13c0-.77.48-1.15 1.45-1.15s1.43.38 1.43 1.15v4.27l4-3.94A5.62 5.62 0 0 1 68.59 9H72a7.36 7.36 0 0 1 7.3 7.69z" fill="#ffffff" data-color="1"></path>
                            <path d="M103.39 30.91c.77 0 1.15.48 1.15 1.49s-.38 1.39-1.15 1.39H98c-4.47 0-7-2.35-7-7.29V12.39h-4.6c-.72 0-1.06-.44-1.06-1.35s.34-1.39 1.06-1.39H91v-8.5C91 .38 91.53 0 92.54 0s1.35.38 1.35 1.15v8.5h5.9c.72 0 1.11.48 1.11 1.39s-.39 1.35-1.11 1.35h-5.9v14.2c0 3.12 1.1 4.32 4.17 4.32z" fill="#eb5c20" data-color="2"></path>
                            <path d="M128.3 31.3c.72 0 1.16.48 1.16 1.39s-.39 1.39-1.16 1.39h-10.46a7.25 7.25 0 0 1-7.59-7.53v-9.84a7.42 7.42 0 0 1 7.3-7.71h6.63a7.52 7.52 0 0 1 7.34 7.69v2.88a3.63 3.63 0 0 1-3.22 3.21h-15.17v4.42a4.25 4.25 0 0 0 4.32 4.08zm-1.05-11.09a1.47 1.47 0 0 0 1.39-1.49v-2.49a4.49 4.49 0 0 0-4-4.32h-7.25a4.49 4.49 0 0 0-4.23 4.32v4z" fill="#eb5c20" data-color="2"></path>
                            <path d="M152.93 31.3a3.87 3.87 0 0 0 3.89-4.08 3.83 3.83 0 0 0-3.94-4l-7.2-.29c-4.18-.15-7.11-3-7.11-6.87a6.81 6.81 0 0 1 6.72-6.91h11.77c.72 0 1.1.48 1.1 1.44s-.48 1.54-1.1 1.54L145.2 12a4 4 0 0 0-3.75 4.13 4.07 4.07 0 0 0 4.23 3.87l7.3.24a6.94 6.94 0 0 1-.1 13.87h-12.34c-.72 0-1.1-.48-1.1-1.44s.38-1.39 1.1-1.39z" fill="#eb5c20" data-color="2"></path>
                            <path d="M183.26 30.91c.77 0 1.16.48 1.16 1.49s-.39 1.39-1.16 1.39h-5.37c-4.47 0-7-2.35-7-7.29V12.39h-4.61c-.72 0-1.06-.44-1.06-1.35s.34-1.39 1.06-1.39h4.61v-8.5c0-.77.53-1.15 1.53-1.15s1.35.38 1.35 1.15v8.5h5.9c.72 0 1.11.48 1.11 1.39s-.39 1.35-1.11 1.35h-5.9v14.2c0 3.12 1.1 4.32 4.17 4.32z" fill="#eb5c20" data-color="2"></path>
                            <path d="M192.19 34.08a3 3 0 0 1-3-3 3 3 0 0 1 3-3.07 3.09 3.09 0 0 1 3.07 3.07 3 3 0 0 1-3.07 3z" fill="#eb5c21" data-color="3"></path>
                            <path d="M212.69 31.3c.72 0 1.05.43 1.05 1.25s-.33 1.24-1.05 1.24h-11.77c-.72 0-1.1-.43-1.1-1.24s.38-1.25 1.1-1.25h4.32V12.24h-4.32c-.72 0-1.1-.43-1.1-1.25s.38-1.34 1.1-1.34h7.21V31.3zM208.65 3a1.12 1.12 0 0 1-1.05 1.16h-2.12a1.12 1.12 0 0 1-1-1.16V1a1.07 1.07 0 0 1 1-1.06h2.12A1.07 1.07 0 0 1 208.65 1z" fill="#ffffff" data-color="1"></path>
                            <path d="M235.58 30.91c.77 0 1.15.48 1.15 1.49s-.38 1.39-1.15 1.39h-5.37c-4.47 0-7-2.35-7-7.29V12.39h-4.61c-.72 0-1.06-.44-1.06-1.35s.34-1.39 1.06-1.39h4.61v-8.5c0-.77.53-1.15 1.53-1.15s1.35.38 1.35 1.15v8.5H232c.72 0 1.11.48 1.11 1.39s-.39 1.35-1.11 1.35h-5.9v14.2c0 3.12 1.1 4.32 4.17 4.32z" fill="#ffffff" data-color="1"></path>
                        </g>
                    </g>
                </svg>
                </button>
                <button type="button" style={{ backgroundColor: '#ff5c13' }} className="layout-menu-button shadow-6 p-link" onClick={props.onMenuButtonClick}>
                    <i className="pi pi-chevron-right"></i>
                </button>
                <button type="button" className="layout-topbar-mobile-button p-link">
                    <i className="pi pi-ellipsis-v fs-large" onClick={props.onMobileTopbarButtonClick}></i>
                </button>
            </div>

            <div className={classNames('layout-topbar-right', { 'layout-topbar-mobile-active': props.mobileTopbarActive })}>
                <div className="layout-topbar-actions-left">
                </div>
                <div className="layout-topbar-actions-right">
                    <ul className="layout-topbar-items">
                        <li className="layout-topbar-item layout-search-item">
                            <button className="layout-topbar-action rounded-circle p-link">
                                <i className="pi pi-search fs-large"></i>
                            </button>
                            <CSSTransition classNames="p-toggleable" timeout={{ enter: 1000, exit: 450 }} in={props.searchActive} unmountOnExit>
                                <div className="layout-search-panel p-inputgroup">
                                    <span className="p-inputgroup-addon"><i className="pi pi-search"></i></span>
                                    <InputText type="text" placeholder="Search" onKeyDown={onInputKeydown} />
                                    <span className="p-inputgroup-addon">
                                        <Button type="button" icon="pi pi-times" className="p-button-rounded p-button-text p-button-plain" onClick={() => props.onSearch(false)}></Button>
                                    </span>
                                </div>
                            </CSSTransition>
                        </li>

                        <li className="layout-topbar-item notifications">
                            <button className="layout-topbar-action rounded-circle p-link">
                                <span className="p-overlay-badge">
                                    <i className="pi pi-bell fs-large"></i>
                                    <span className="p-badge p-badge-warning p-badge-dot"></span>
                                </span>
                            </button>

                            <CSSTransition classNames="p-toggleable" timeout={{ enter: 1000, exit: 450 }} in={props.activeTopbarItem === 'notifications'} unmountOnExit>
                                <ul className="layout-topbar-action-panel shadow-6 fadeInDown">
                                    <li className="mb-3">
                                        <span className="px-3 fs-small">You have <b>4</b> new notifications</span>
                                    </li>
                                    <li className="layout-topbar-action-item">
                                        <div className="flex flex-row align-items-center">
                                            <img src="assets/demo/images/avatar/avatar-1.png" alt="" />
                                            <div className={classNames('flex flex-column', { 'ml-3': !isRTL, 'mr-3': isRTL })} style={{ flexGrow: '1' }}>
                                                <div className="flex align-items-center justify-content-between mb-1">
                                                    <span className="fs-small font-bold">Jerome Bell</span>
                                                    <small>42 mins ago</small>
                                                </div>
                                                <span className="fs-small">How to write content about your photographs?</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="layout-topbar-action-item">
                                        <div className="flex flex-row align-items-center">
                                            <img src="assets/demo/images/avatar/avatar-2.png" alt="" />
                                            <div className={classNames('flex flex-column', { 'ml-3': !isRTL, 'mr-3': isRTL })} style={{ flexGrow: '1' }}>
                                                <div className="flex align-items-center justify-content-between mb-1">
                                                    <span className="fs-small font-bold">Cameron Williamson</span>
                                                    <small>48 mins ago</small>
                                                </div>
                                                <span className="fs-small">Start a blog to reach your creative peak.</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="layout-topbar-action-item">
                                        <div className="flex flex-row align-items-center">
                                            <img src="assets/demo/images/avatar/avatar-3.png" alt="" />
                                            <div className={classNames('flex flex-column', { 'ml-3': !isRTL, 'mr-3': isRTL })} style={{ flexGrow: '1' }}>
                                                <div className="flex align-items-center justify-content-between mb-1">
                                                    <span className="fs-small font-bold">Anna Miles</span>
                                                    <small>1 day ago</small>
                                                </div>
                                                <span className="fs-small">Caring is the new marketing</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="layout-topbar-action-item">
                                        <div className="flex flex-row align-items-center">
                                            <img src="assets/demo/images/avatar/avatar-4.png" alt="" />
                                            <div className={classNames('flex flex-column', { 'ml-3': !isRTL, 'mr-3': isRTL })} style={{ flexGrow: '1' }}>
                                                <div className="flex align-items-center justify-content-between mb-1">
                                                    <span className="fs-small font-bold">Arlene Mccoy</span>
                                                    <small>4 day ago</small>
                                                </div>
                                                <span className="fs-small">Starting your traveling blog with Vasco.</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </CSSTransition>
                        </li>
                        <li className="layout-topbar-item app">
                            <button className="layout-topbar-action rounded-circle p-link">
                                <i className="pi pi-table fs-large"></i>
                            </button>

                            <CSSTransition classNames="p-toggleable" timeout={{ enter: 1000, exit: 450 }} in={props.activeTopbarItem === 'apps'} unmountOnExit>
                                <div className="layout-topbar-action-panel shadow-6">
                                    <div className="grid grid-nogutter">
                                        <div className="layout-topbar-action-item col-4">
                                            <button className="flex align-items-center flex-column text-color p-link">
                                                <i className="pi pi-image action indigo-bgcolor white-color"></i>
                                                <span>Products</span>
                                            </button>
                                        </div>
                                        <div className="layout-topbar-action-item col-4">
                                            <button className="flex align-items-center flex-column text-color p-link">
                                                <i className="pi pi-file-pdf action orange-bgcolor white-color"></i>
                                                <span>Reports</span>
                                            </button>
                                        </div>
                                        <div className="layout-topbar-action-item col-4">
                                            <button className="flex align-items-center flex-column text-color p-link">
                                                <i className="pi pi-dollar action teal-bgcolor white-color"></i>
                                                <span>Balance</span>
                                            </button>
                                        </div>
                                        <div className="layout-topbar-action-item col-4">
                                            <button className="flex align-items-center flex-column text-color p-link">
                                                <i className="pi pi-cog action pink-bgcolor white-color"></i>
                                                <span>Settings</span>
                                            </button>
                                        </div>
                                        <div className="layout-topbar-action-item col-4">
                                            <button className="flex align-items-center flex-column text-color p-link">
                                                <i className="pi pi-key action bluegrey-bgcolor white-color"></i>
                                                <span>Credentials</span>
                                            </button>
                                        </div>
                                        <div className="layout-topbar-action-item col-4">
                                            <button className="flex align-items-center justify-content-center flex-column text-color p-link">
                                                <i className="pi pi-sitemap action cyan-bgcolor white-color"></i>
                                                <span>Sitemap</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </CSSTransition>
                        </li>
                        <li className="layout-topbar-item">
                            <button className="layout-topbar-action flex flex-row justify-content-center align-items-center px-2 rounded-circle p-link" onClick={(event) => props.onTopbarItemClick({ originalEvent: event, item: 'profile' })}>
                                <img src="assets/demo/images/avatar/amyelsner.png" alt="avatar" style={{ width: '32px', height: '32px' }} />
                            </button>

                            <CSSTransition classNames="p-toggleable" timeout={{ enter: 1000, exit: 450 }} in={props.activeTopbarItem === 'profile'} unmountOnExit>
                                <ul className="layout-topbar-action-panel shadow-6">
                                    <li className="layout-topbar-action-item">
                                        <button className="flex flex-row align-items-center p-link">
                                            <i className={classNames('pi pi-cog', { 'mr-2': !isRTL, 'ml-2': isRTL })}></i>
                                            <span>Settings</span>
                                        </button>
                                    </li>
                                    <li className="layout-topbar-action-item">
                                        <button className="flex flex-row align-items-center p-link">
                                            <i className={classNames('pi pi-file', { 'mr-2': !isRTL, 'ml-2': isRTL })} ></i>
                                            <span>Terms of Usage</span>
                                        </button>
                                    </li>
                                    <li className="layout-topbar-action-item ">
                                        <button className="flex flex-row align-items-center p-link">
                                            <i className={classNames('pi pi-compass', { 'mr-2': !isRTL, 'ml-2': isRTL })}></i>
                                            <span>Support</span>
                                        </button>
                                    </li>
                                    <li className="layout-topbar-action-item">
                                        <button className="flex flex-row align-items-center p-link">
                                            <i className={classNames('pi pi-power-off', { 'mr-2': !isRTL, 'ml-2': isRTL })}></i>
                                            <span>Logout</span>
                                        </button>
                                    </li>
                                </ul>
                            </CSSTransition>
                        </li>
                        <li className="layout-topbar-item">
                            <button type="button" className="layout-topbar-action rounded-circle p-link" onClick={props.onRightMenuButtonClick}>
                                <i className="pi fs-large pi-arrow-left"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    );

}

export default AppTopbar;

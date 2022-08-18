import { classNames } from 'primereact/utils';
import React, { useCallback, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import nookies from 'nookies';
import { Router } from 'next/router';

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

    const logout = useCallback(() => {
        nookies.destroy(null, 'cantest_token')
        window.location.reload()
    }, [])

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
                <img style={{ width: 200 }} src="assets/logo.png" />
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
                                    <li onClick={logout} className="layout-topbar-action-item">
                                        <button className="flex flex-row align-items-center p-link">
                                            <i className={classNames('pi pi-power-off', { 'mr-2': !isRTL, 'ml-2': isRTL })}></i>
                                            <span>Logout</span>
                                        </button>
                                    </li>
                                </ul>
                            </CSSTransition>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    );

}

export default AppTopbar;

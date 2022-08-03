import { CSSTransition } from 'react-transition-group';
import { classNames } from 'primereact/utils';
import { useContext } from 'react';
import { Tooltip } from 'primereact/tooltip';

const AppInlineMenu = (props) => {

    const isRTL = true
    const menuKey = props.menuKey || 'inline-menu';

    const inlineMenuClassName = classNames('layout-inline-menu', {
        'layout-inline-menu-active': props.inlineMenuActive[props.menuKey]
    }, props.className);

    const isSlim = () => {
        return props.menuMode === 'slim';
    }

    return (
        <div className={inlineMenuClassName} style={props.style}>
            {isSlim() && <Tooltip target=".avatarTooltip" />}

            <button data-pr-tooltip="Amy Elsner" className={classNames('avatarTooltip layout-inline-menu-action p-link flex flex-row align-items-center', { 'p-3 lg:p-1 py-3': props.horizontal, 'p-3': !props.horizontal })} onClick={(e) => props.onInlineMenuClick(e, menuKey)}>
                <img src="assets/demo/images/avatar/amyelsner.png" alt="avatar" style={{ width: '32px', height: '32px', marginRight: 8 }} />
                <span className={classNames('flex flex-column', { 'ml-2': !isRTL, 'mr-2': isRTL })}>
                    <span className="font-bold">Amy Elsner</span>
                    <small>Webmaster</small>
                </span>
                <i className={classNames('layout-inline-menu-icon pi pi-angle-down', { 'ml-auto': !isRTL, 'mr-auto': isRTL })}></i>
            </button>

            <CSSTransition classNames="p-toggleable-content" timeout={{ enter: 1000, exit: 450 }} in={props.inlineMenuActive[menuKey]} unmountOnExit>
                <>
                    <ul className="layout-inline-menu-action-panel">

                        <li className="layout-inline-menu-action-item tooltip" data-pr-tooltip="Logout" >
                            <button className="flex flex-row align-items-center p-link">
                                <i className="pi pi-power-off pi-fw"></i>
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                    {isSlim() && <Tooltip target=".tooltip" />}
                </>
            </CSSTransition>

        </div>
    );
}

export default AppInlineMenu;

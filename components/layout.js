import React, { useState } from 'react';
import AppTopbar from './AppTopbar';
import AppInlineMenu from './AppInlineMenu';
import AppFooter from './AppFooter';
import AppMenu from './AppMenu';
import AppConfig from './AppConfig';
import { useRef, useEffect } from 'react';
import Router from 'next/router';
import classNames from 'classnames';
import PrimeReact from 'primereact/api';
import { CurrentUserContext } from '../pages/index';
import { Tooltip } from 'primereact/tooltip';

const Layout = ({ children, currentUser }) => {

  const [menuMode, setMenuMode] = useState('static');
    const [inlineMenuPosition, setInlineMenuPosition] = useState('bottom');
    const [desktopMenuActive, setDesktopMenuActive] = useState(true);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [colorMode, setColorMode] = useState('dark');
    const [rightMenuActive, setRightMenuActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('filled');
    const [ripple, setRipple] = useState(true);
    const [mobileTopbarActive, setMobileTopbarActive] = useState(false);
    const [menuTheme, setMenuTheme] = useState('dark');
    const [topbarTheme, setTopbarTheme] = useState('dark');
    const [theme, setTheme] = useState('lime');
    const [isInputBackgroundChanged, setIsInputBackgroundChanged] = useState(false);
    const [inlineMenuActive, setInlineMenuActive] = useState({});
    const [newThemeLoaded, setNewThemeLoaded] = useState(false);
    const [searchActive, setSearchActive] = useState(false)
    const copyTooltipRef = useRef();
    let currentInlineMenuKey = useRef(null);
    // const location = useLocation();

    PrimeReact.ripple = true;

    let searchClick;
    let topbarItemClick;
    let menuClick;
    let inlineMenuClick;

    const menu = [
        {
            label: 'Menu', icon: 'pi pi-fw pi-home',
            items: [
                { label: "Events", icon: "pi pi-star", url: "/", target: "_self" },
                { label: "Finances", disabled: true, icon: "pi pi-money-bill", url: "https://www.primefaces.org/primeflex", target: "_blank" },
                { label: "CRM", disabled: true, icon: "pi pi-server", url: "https://www.primefaces.org/primeflex", target: "_blank" },
                { label: "Sales", disabled: true, icon: "pi pi-chart-bar", url: "https://www.primefaces.org/primeflex", target: "_blank" },
                { label: "Insights", disabled: true, icon: "pi pi-list", url: "https://www.primefaces.org/primeflex", target: "_blank" },
                { label: "Blank Page", icon: "pi pi-cog", url: "/blank-page", target: "_self" },
            ],
        }
    ];

    useEffect(() => {
        if (menuMode === 'overlay') {
            hideOverlayMenu()
        }
        if (menuMode === 'static') {
            setDesktopMenuActive(true)
        }
    }, [menuMode])

    useEffect(() => {
        if (!currentUser) Router.push("/login");
    }, [])

    const onMenuThemeChange = (theme) => {
        setMenuTheme(theme)
    }

    const onTopbarThemeChange = (theme) => {
        setTopbarTheme(theme);
    }

    const onThemeChange = (theme) => {
        setTheme(theme);
        const themeLink = document.getElementById('theme-css');
        const themeHref = 'assets/theme/' + theme + '/theme-' + colorMode + '.css';
        replaceLink(themeLink, themeHref);
    }

    const onColorModeChange = (mode) => {
        setColorMode(mode);
        setIsInputBackgroundChanged(true);

        if (isInputBackgroundChanged) {
            if (mode === 'dark') {
                setInputStyle('filled');
            } else {
                setInputStyle('outlined')
            }
        }

        if (mode === 'dark') {
            setMenuTheme('dark');
            setTopbarTheme('dark');
        } else {
            setMenuTheme('light');
            setTopbarTheme('blue');

        }

        const layoutLink = document.getElementById('layout-css');
        const layoutHref = 'assets/layout/css/layout-' + mode + '.css';
        replaceLink(layoutLink, layoutHref);

        const themeLink = document.getElementById('theme-css');
        const urlTokens = themeLink.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = 'theme-' + mode + '.css';
        const newURL = urlTokens.join('/');

        replaceLink(themeLink, newURL, () => {
            setNewThemeLoaded(true);
        });

    }
    const isIE = () => {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent)
    }

    const replaceLink = (linkElement, href, callback) => {
        if (isIE()) {
            linkElement.setAttribute('href', href);

            if (callback) {
                callback();
            }
        }
        else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);

                if (callback) {
                    callback();
                }
            });
        }
    }

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    }

    const onInlineMenuPositionChange = (mode) => {
        setInlineMenuPosition(mode)
    }

    const onMenuModeChange = (mode) => {
        setMenuMode(mode);
    }

    const onRTLChange = () => {
        setRTL(prevState => !prevState);
    }

    const onMenuClick = (event) => {
        menuClick = true;
    }

    const onMenuButtonClick = (event) => {
        menuClick = true;

        if (isDesktop())
            setDesktopMenuActive((prevState) => !prevState);
        else
            setMobileMenuActive((prevState) => !prevState)

        event.preventDefault();

    }

    const onTopbarItemClick = (event) => {
        topbarItemClick = true;
        if (activeTopbarItem === event.item)
            setActiveTopbarItem(null)
        else {
            setActiveTopbarItem(event.item)
        }

        event.originalEvent.preventDefault();
    }

    const onSearch = (event) => {
        searchClick = true;
        setSearchActive(event);
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items && (menuMode === 'overlay' || !isDesktop())) {
            hideOverlayMenu();
        }

        if (!event.item.items && (isHorizontal() || isSlim())) {
            setMenuActive(false)
        }
    }

    const onRootMenuItemClick = (event) => {
        setMenuActive((prevState) => !prevState);
    }

    const onRightMenuButtonClick = () => {
        setRightMenuActive((prevState) => !prevState)
    }

    const onMobileTopbarButtonClick = (event) => {
        setMobileTopbarActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onDocumentClick = (event) => {
        if (!searchClick && event.target.localName !== 'input') {
            setSearchActive(false);
        }

        if (!topbarItemClick) {
            setActiveTopbarItem(null);
        }

        if (!menuClick && (menuMode === 'overlay' || !isDesktop())) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false)
            }
            hideOverlayMenu();
        }

        if (inlineMenuActive[currentInlineMenuKey.current] && !inlineMenuClick) {
            let menuKeys = { ...inlineMenuActive };
            menuKeys[currentInlineMenuKey.current] = false;
            setInlineMenuActive(menuKeys);
        }

        if (!menuClick && (isSlim() || isHorizontal())) {
            setMenuActive(false);
        }

        searchClick = false;
        topbarItemClick = false;
        inlineMenuClick = false;
        menuClick = false;
    }

    const hideOverlayMenu = () => {
        setMobileMenuActive(false)
        setDesktopMenuActive(false)
    }

    const isDesktop = () => {
        return window.innerWidth > 1024;
    }

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    }

    const isSlim = () => {
        return menuMode === 'slim';
    }

    const onInlineMenuClick = (e, key) => {
        let menuKeys = { ...inlineMenuActive };
        if (key !== currentInlineMenuKey.current && currentInlineMenuKey.current) {
            menuKeys[currentInlineMenuKey.current] = false;
        }

        menuKeys[key] = !menuKeys[key];
        setInlineMenuActive(menuKeys);
        currentInlineMenuKey.current = key;
        inlineMenuClick = true;
    }

    const layoutContainerClassName = classNames('layout-wrapper ', 'layout-menu-' + menuTheme + ' layout-topbar-' + topbarTheme, {
        'layout-menu-static': menuMode === 'static',
        'layout-menu-overlay': menuMode === 'overlay',
        'layout-menu-slim': menuMode === 'slim',
        'layout-menu-horizontal': menuMode === 'horizontal',
        'layout-menu-active': desktopMenuActive,
        'layout-menu-mobile-active': mobileMenuActive,
        'layout-topbar-mobile-active': mobileTopbarActive,
        'layout-rightmenu-active': rightMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': !ripple,
        'layout-rtl': false
    });

    if (!currentUser) {
        return <div></div>
    }

    return (
        <CurrentUserContext.Provider value={{ currentUser }}>
          <div className={layoutContainerClassName} onClick={onDocumentClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
    
            <AppTopbar horizontal={isHorizontal()}
              activeTopbarItem={activeTopbarItem}
              onMenuButtonClick={onMenuButtonClick}
              onTopbarItemClick={onTopbarItemClick}
              onRightMenuButtonClick={onRightMenuButtonClick}
              onMobileTopbarButtonClick={onMobileTopbarButtonClick} mobileTopbarActive={mobileTopbarActive}
              searchActive={searchActive} onSearch={onSearch} />
    
            <div className="menu-wrapper" onClick={onMenuClick}>
              <div className="layout-menu-container">
                {(inlineMenuPosition === 'top' || inlineMenuPosition === 'both') && <AppInlineMenu menuKey="top" inlineMenuActive={inlineMenuActive} onInlineMenuClick={onInlineMenuClick} horizontal={isHorizontal()} menuMode={menuMode} />}
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} onRootMenuItemClick={onRootMenuItemClick}
                  menuMode={menuMode} active={menuActive} />
                {(inlineMenuPosition === 'bottom' || inlineMenuPosition === 'both') && <AppInlineMenu menuKey="bottom" inlineMenuActive={inlineMenuActive} onInlineMenuClick={onInlineMenuClick} horizontal={isHorizontal()} menuMode={menuMode} />}
              </div>
            </div>

            <div className="layout-main">
          <div className="layout-content">
          {/* The children prop in the Layout component is used to render the specific content for each page index return. This way, you can wrap any page-specific content with the Layout component, and the content will be rendered in place of {children}. */}
            {children}
          </div>

          <AppFooter colorMode={colorMode} />

        </div>

        <AppConfig inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
          rippleEffect={ripple} onRippleEffect={onRipple}
          menuMode={menuMode} onMenuModeChange={onMenuModeChange}
          inlineMenuPosition={inlineMenuPosition} onInlineMenuPositionChange={onInlineMenuPositionChange}
          colorMode={colorMode} onColorModeChange={onColorModeChange}
          menuTheme={menuTheme} onMenuThemeChange={onMenuThemeChange}
          topbarTheme={topbarTheme} onTopbarThemeChange={onTopbarThemeChange}
          theme={theme} onThemeChange={onThemeChange}
          isRTL={true} onRTLChange={onRTLChange} />

        {/* <AppRightMenu rightMenuActive={rightMenuActive} onRightMenuButtonClick={onRightMenuButtonClick} /> */}

        {mobileMenuActive && <div className="layout-mask modal-in"></div>}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default Layout;
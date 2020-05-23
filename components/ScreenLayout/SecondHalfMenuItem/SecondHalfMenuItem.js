import Router, { useRouter } from 'next/router'

/** Semantic Import */
import { Menu, Popup, Button } from 'semantic-ui-react';

/** CSS Import */
import styles from './SecondHalfMenuItem.module.scss';
import cn from 'classnames';

/** Icons Import */
import { IconContext } from "react-icons";
import { getMenuIcon } from '../utilFunctions';

const SidebarMenuItem = ({ label, href, header }) => {
    const router = useRouter();

    const active = router.pathname === href;

    return (
        <Menu.Item className={
            cn({
                [styles.menu_item_active]: active,
                [styles.menu_item]: !active
            })
        }
            onClick={() => Router.push(href)}
        >
            <IconContext.Provider
                value={{
                    className: cn({
                        [styles.menu_icon_blk_active]: active,
                        [styles.menu_icon_blk]: !active
                    })
                }}>
                {
                    getMenuIcon(href)
                }
            </IconContext.Provider>
            {label}
        </Menu.Item >
    )
}

export default SidebarMenuItem;
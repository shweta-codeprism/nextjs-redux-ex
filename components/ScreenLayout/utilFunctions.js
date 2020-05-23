import {
    BsFillGrid1X2Fill, BsFillInboxesFill, BsFillPeopleFill,
    BsFillPersonCheckFill, BsFillPersonDashFill, BsGrid3X2GapFill
} from 'react-icons/bs';
import { FaMoneyCheckAlt, FaRocketchat } from 'react-icons/fa';

export const getMenuIcon = (href) => {
    switch (href) {
        case '/dashboard':
            return <BsFillGrid1X2Fill />;
        case '/category':
            return <BsGrid3X2GapFill />;
        case '/pending_products':
            return <BsFillInboxesFill />;
        case '/pending_vendors':
            return <BsFillPersonDashFill />;
        case '/all-subscriptions':
            return <FaMoneyCheckAlt />;
        case '/vendors':
            return <BsFillPersonCheckFill />
        case '/customers':
            return <BsFillPeopleFill />
        case '/user-complaints':
            return <FaRocketchat />
        default:
            return <div></div>
    }
}
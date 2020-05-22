import * as React from 'react';
import { Menu, Popup, Button } from 'semantic-ui-react';
import '../menu.scss';
import { IconContext } from "react-icons";
import { GoDashboard } from 'react-icons/go';
import { FiBox } from 'react-icons/fi';
import { FaMoneyBillWave, FaListUl, FaHands, FaUserPlus, FaChessKing, FaTruck, FaShippingFast, FaRegNewspaper } from 'react-icons/fa';
import { MdGroupWork, MdTransferWithinAStation, MdFileDownload } from 'react-icons/md';

import { ColorList } from 'assets/constants/ColorConstants';
import { Link, withRouter } from 'react-router-dom';

type Props = {
  onClickMenu: (menuNumber) => void,
  value: number,
  to: string,
  titleName: string,
  detailsVisible: boolean
};

class AccordionMenu extends React.Component<Props, {}> {


  handleClick = (event, data) => {
    const { onClickMenu } = this.props;
    onClickMenu(data.index);
  }

  render() {
    const { active, value, to, titleName, history, detailsVisible, index } = this.props;
    // console.log("LOCATION_MINE", history.location);
    const menuActive = history.location.pathname === to;
    return (
      <Menu.Item
        active={menuActive}
        index={value}
        className={detailsVisible
          ? (
            menuActive ? 'RowAlignSpacedBw active-title-blk' : 'RowAlignSpacedBw title-blk'
          ) : menuActive ? 'active-title-blk-invisible' : 'title-blk-invisible'}
        as={Link}
        to={to}
        style={{ marginTop: index === 0 ? 30 : 0 }}
      >
        <IconContext.Provider
          value={{
            color: ColorList[11],
            className: menuActive ? 'RowAlignCenter active-icon-blk' : 'RowAlignCenter icon-blk'
          }}>
          <div>
            {
              titleName === 'DashBoard' ? <GoDashboard /> : null
            }
            {
              titleName === 'Booking' || titleName === 'Loading' || titleName === 'Orders' ? <FiBox /> : null
            }
            {
              titleName === 'Active Requests' ? <FaRegNewspaper /> : null
            }
            {
              titleName === 'Accounts' ? <FaMoneyBillWave /> : null
            }
            {
              titleName === 'Operations' ? <MdGroupWork /> : null
            }
            {
              titleName === 'Reports' ? <FaListUl /> : null
            }
            {
              titleName === 'Administration' ||  titleName === 'Masters'? <FaHands /> : null
            }
            {
              titleName === 'Super Admin' ? <FaChessKing /> : null
            }
            {
              titleName === 'Add Tenant' ? <FaUserPlus /> : null
            }
            {
              titleName === 'Delivery' ? <MdTransferWithinAStation /> : null
            }
            {
              titleName === 'Unloading' ? <MdFileDownload /> : null
            }
            {
              titleName === 'Trips' || titleName === 'Shipments'  || titleName === 'External Shipments' ?  <FaShippingFast /> : null
            }
          </div>
        </IconContext.Provider>

        <div className={detailsVisible ? menuActive ? 'RowAlignStart active-title-text-blk text font15' : 'RowAlignStart title-text-blk text font15' : 'invisible-title-text-blk'}>
          {
            titleName
          }
        </div>
        <div className="RowAlignStart drpdwn-icon-blk" />
      </Menu.Item>
    );
  }
}

export default withRouter(AccordionMenu);

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import EquipmentCard from 'components/middleParts/EquipmentCard';

import { getReqEquipmentAsync, getMyEquipmentAsync } from 'store/modules/home';
import { setEquipmentInfoAsync } from 'store/modules/equipment';
import { setCommonCdListAsync, modifyOpenAction } from 'store/modules/common';

import EquipmentModifyDialog from '../smallParts/EquipmentModifyDialog';

const styles = {
  requestEquipmentList: {
    fontSize: 24,
  },
  myEquipmentList: {
    fontSize: 24,
    paddingTop: 50,
  },
};

class HomePage extends React.Component {
  componentDidMount = () => {
    // 요청 장비 목록 액션
    this.props.getReqEquipmentAsync();
    // 나의 장비 목록 액션
    this.props.getMyEquipmentAsync();
    // 공통 코드 목록 조회 액션
    this.props.setCommonCdListAsync('200');
  };

  // 다이얼로그 오픈
  handleClickOpen = selectEquipNo => () => {
    if (selectEquipNo) {
      // 장비 상세 정보 호출
      this.props.setEquipmentInfoAsync(selectEquipNo);
    }
  };

  // 다이얼로그 클로즈
  handleClose = () => {
    this.props.modifyOpenAction(false);
  };

  render() {
    const {
      classes,
      req_equip_list,
      my_equip_list,
      equip_info,
      modifyOpen,
    } = this.props;

    return (
      <React.Fragment>
        <Typography className={classes.requestEquipmentList}>
          요청 장비 목록
        </Typography>
        {req_equip_list.length ? (
          <EquipmentCard
            history={this.props.history}
            req_grp="R"
            equip_list={req_equip_list}
            handleClickOpen={this.handleClickOpen}
          />
        ) : (
          <EquipmentCard req_grp="R" handleClickOpen={this.handleClickOpen} />
        )}

        <Typography className={classes.myEquipmentList}>
          나의 장비 목록
        </Typography>
        {my_equip_list.length ? (
          <EquipmentCard
            history={this.props.history}
            req_grp="M"
            equip_list={my_equip_list}
            handleClickOpen={this.handleClickOpen}
          />
        ) : (
          ''
        )}

        {modifyOpen && (
          <EquipmentModifyDialog
            open={modifyOpen}
            handleClose={this.handleClose}
            equip_info={equip_info}
            parentsComponent="home"
          />
        )}
      </React.Fragment>
    );
  }
}

// store에 있는 값을 props로 내려받는다.
const mapStateToProps = state => {
  return {
    req_equip_list: state.home.req_equip_list,
    my_equip_list: state.home.my_equip_list,
    equip_info: state.equipment.equip_info,
    modifyOpen: state.common.modifyOpen,
  };
};

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    setEquipmentInfoAsync: equip_no =>
      dispatch(setEquipmentInfoAsync(equip_no)),
    setCommonCdListAsync: grp_cd => dispatch(setCommonCdListAsync(grp_cd)),
    getReqEquipmentAsync: () => dispatch(getReqEquipmentAsync()),
    getMyEquipmentAsync: () => dispatch(getMyEquipmentAsync()),
    modifyOpenAction: boolean => dispatch(modifyOpenAction(boolean)),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapActionToProps,
  )(withRouter(HomePage)),
);

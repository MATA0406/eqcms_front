import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

// Dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

// SelectBox
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// Text
import MenuItem from '@material-ui/core/MenuItem';

import Grid from '@material-ui/core/Grid';
import blue from '@material-ui/core/colors/blue';

import {
  getEquipTpCdList,
  getReqTargetEquipment,
  addReqTargetEquipment,
} from 'store/modules/home';
import InfiniteComponent from './InfiniteComponent';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  searchBtn: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
    height: '55px',
    marginTop: '7px',
    color: '#ffffff',
    backgroundColor: blue.A400,
    '&:hover': {
      backgroundColor: blue[500],
    },
  },
  dialogAttr: {
    width: 700,
  },
});

class ReqEquipDialog extends React.Component {
  state = {
    selectValue: 'all',
    search_info: {},
  };

  componentDidMount() {
    this.getEquipTpCdList();
  }

  // 장비 구분 코드 목록 조회
  getEquipTpCdList = async () => {
    const params = {
      access_token: localStorage.getItem('access_token'),
    };

    // 장비 구분 코드 목록 조회API
    await axios
      .get(
        'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/common/code/api-101-0002',
        {
          params: {
            params: JSON.stringify(params),
          },
          headers: {
            'contents-type': 'application/json',
          },
        },
      )
      .then(json => {
        localStorage.setItem('access_token', json.data.data.access_token);
        this.props.getEquipTpCdList(json.data.data.equip_tp_cd_list);
      })
      .catch(err => {
        console.log(err.response.data);

        // Token error List
        const errCodes = ['S3100', 'S3110', 'S3120', 'S3121', 'S3122'];

        if (errCodes.indexOf(err.response.data.code) !== -1) {
          alert(err.response.data.message);
          // this.props.history.push('/login');
          window.location.href = '/login';
        } else {
          alert(err.response.data.message);
        }
      });
  };

  // 요청 대상 장비 목록 조회(검색)
  reqEquipSearch = async e => {
    e.preventDefault();

    if (e.target.equipTpCd.value === 'all') {
      e.target.equipTpCd.value = '';
    }

    // 검색 정보
    const search_info = {
      equip_tp_cd: e.target.equipTpCd.value,
      keyword: e.target.keyword.value,
    };

    const params = {
      access_token: localStorage.getItem('access_token'),
      page: 1,
      rows: this.props.rows,
      _search: this.props._search,
      search_info,
    };

    // 요청 대상 장비 목록 조회(검색)API
    await axios
      .get(
        'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/dashboard/api-200-0002',
        {
          params: {
            params: JSON.stringify(params),
          },
          headers: {
            'contents-type': 'application/json',
          },
        },
      )
      .then(json => {
        localStorage.setItem('access_token', json.data.data.access_token);
        this.props.getReqTargetEquipment(json.data.data);

        // state에 search_info 저장
        this.setState(() => ({
          search_info,
        }));
      })
      .catch(err => {
        console.log(err.response.data);

        // Token error List
        const errCodes = ['S3100', 'S3110', 'S3120', 'S3121', 'S3122'];

        if (errCodes.indexOf(err.response.data.code) !== -1) {
          alert(err.response.data.message);
          window.location.href = '/login';
        } else {
          alert(err.response.data.message);
        }
      });
  };

  // 스크롤 List API 추가 호출
  fetchMoreData = async () => {
    if (this.props.rest_records < 1) {
      return false;
    }

    const params = {
      access_token: localStorage.getItem('access_token'),
      page: this.props.page + 1,
      rows: this.props.rows,
      _search: this.props._search,
      search_info: this.state.search_info,
    };

    // 요청 대상 장비 목록 조회(검색)API
    await axios
      .get(
        'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/dashboard/api-200-0002',
        {
          params: {
            params: JSON.stringify(params),
          },
          headers: {
            'contents-type': 'application/json',
          },
        },
      )
      .then(json => {
        localStorage.setItem('access_token', json.data.data.access_token);
        this.props.addReqTargetEquipment(json.data.data);
      })
      .catch(err => {
        console.log(err.response.data);

        // Token error List
        const errCodes = ['S3100', 'S3110', 'S3120', 'S3121', 'S3122'];

        if (errCodes.indexOf(err.response.data.code) !== -1) {
          alert(err.response.data.message);
          window.location.href = '/login';
        } else {
          alert(err.response.data.message);
        }
      });
  };

  // 장비 Select box 컨트롤
  selectHandle = item => {
    this.setState(() => ({ selectValue: item.target.value }));
  };

  render() {
    const {
      open,
      handleClose,
      classes,
      equip_tp_cd_list,
      equip_list,
      page_info,
      list_load_status,
    } = this.props;

    return (
      <div>
        <Dialog
          maxWidth="sm"
          fullWidth
          open={open}
          onClose={handleClose}
          scroll="paper"
          disableBackdropClick
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">요청 장비 검색</DialogTitle>
          <Divider />
          <DialogContent id="scrollDiv">
            <form className={classes.root} onSubmit={this.reqEquipSearch}>
              <Grid
                container
                item
                xs={12}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
              >
                <Grid
                  container
                  item
                  xs={12}
                  sm={3}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  zeroMinWidth
                >
                  <TextField
                    select
                    label="장비"
                    id="equipTpCd"
                    name="equipTpCd"
                    className={classes.textField}
                    value={this.state.selectValue}
                    onChange={this.selectHandle}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                  >
                    <MenuItem value="all">전체</MenuItem>
                    {equip_tp_cd_list.map(item => (
                      <MenuItem value={item.equip_tp_cd} key={item.equip_tp_cd}>
                        {item.equip_tp_nm}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={6}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  zeroMinWidth
                >
                  <TextField
                    id="keyword"
                    name="keyword"
                    label="Search"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={3}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  zeroMinWidth
                >
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.searchBtn}
                    size="large"
                    color="primary"
                  >
                    검색
                  </Button>
                </Grid>
              </Grid>
            </form>
            {open && (
              <InfiniteComponent
                equip_list={equip_list}
                page_info={page_info}
                list_load_status={list_load_status}
                fetchMoreData={this.fetchMoreData}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// store에 있는 값을 props로 내려받는다.
const mapStateToProps = state => {
  return {
    equip_tp_cd_list: state.home.equip_tp_cd_list,
    equip_list: state.home.equip_list,
    page_info: state.home.page_info,
    page: state.home.page,
    rows: state.home.rows,
    rest_records: state.home.rest_records,
    list_load_status: state.home.list_load_status,
    _search: state.home._search,
  };
};

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    getEquipTpCdList: equip_tp_cd_list =>
      dispatch(getEquipTpCdList(equip_tp_cd_list)),
    getReqTargetEquipment: response =>
      dispatch(getReqTargetEquipment(response)),
    addReqTargetEquipment: response =>
      dispatch(addReqTargetEquipment(response)),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapActionToProps,
  )(withRouter(ReqEquipDialog)),
);

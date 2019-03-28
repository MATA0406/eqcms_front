import React from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import blue from '@material-ui/core/colors/blue';

const styles = () => ({
  textField: {
    width: '100%',
  },
  reqBtn: {
    color: '#ffffff',
    backgroundColor: blue.A400,
    '&:hover': {
      backgroundColor: blue[500],
    },
  },
});

class ReasonsRequestDialog extends React.Component {
  state = {
    req_rsn: '',
  };

  // 장비 요청
  reqRegister = async e => {
    e.preventDefault();

    const data = {
      req_rsn: this.state.req_rsn,
      equip_no: this.props.selectEquipNo,
    };
    if (window.confirm('요청 하시겠습니까?')) {
      // 장비 요청 API
      await axios
        .post(
          'http://d3rg13r6ps3p6u.cloudfront.net/apis/bo/common/equip/api-102-0002',
          data,
          {
            headers: {
              access_token: localStorage.getItem('access_token'),
            },
          },
        )
        .then(() => {
          alert('요청이 완료되었습니다.');
          this.props.handleReasonClose();
          window.location.href = '/equipment';
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    }
  };

  // 요청사유
  handleReqChange = e => {
    e.preventDefault();

    this.setState({
      req_rsn: e.target.value,
    });
  };

  render() {
    const { classes, open, handleReasonClose } = this.props;

    return (
      <div>
        <Dialog
          maxWidth="sm"
          fullWidth
          open={open}
          onClose={handleReasonClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick
        >
          <DialogTitle id="alert-dialog-title">
            {'요청사유를 입력해주세요.'}
          </DialogTitle>
          <form className={classes.root} onSubmit={this.reqRegister}>
            <DialogContent>
              <Grid
                container
                item
                xs={12}
                md={12}
                direction="row"
                justify="flex-start"
                alignItems="center"
                zeroMinWidth
              >
                <TextField
                  label="요청 사유"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={this.state.req_rsn}
                  onChange={this.handleReqChange}
                  required
                  autoFocus
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={handleReasonClose}
                color="default"
                size="large"
              >
                취소
              </Button>
              <Button
                type="submit"
                variant="contained"
                className={classes.reqBtn}
                color="primary"
                size="large"
                autoFocus
              >
                요청
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ReasonsRequestDialog);

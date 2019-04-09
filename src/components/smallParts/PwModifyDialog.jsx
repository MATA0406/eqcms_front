import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { pwUpdate } from 'store/modules/login';

const styles = () => ({
  text: {
    fontSize: 19,
  },
  inputText: {
    width: '100%',
  },
});

class PwModifyDialog extends React.Component {
  // 비밀번호 수정
  pwModify = async e => {
    e.preventDefault();

    if (e.target.new_pw.value !== e.target.confirmPassword.value) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    const data = {
      new_pw: e.target.new_pw.value,
    };
    if (window.confirm('수정 하시겠습니까?')) {
      // 비밀번호 수정 액션
      this.props.pwUpdate(data, this.props.handleClose);
      this.props.handleClose();
    }
  };

  render() {
    const { classes, handleClose, dialogOpen } = this.props;

    return (
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        disableBackdropClick
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={this.pwModify}>
          <DialogTitle id="alert-dialog-title">비밀번호 수정</DialogTitle>
          <DialogContent>
            <Grid
              container
              item
              xs={12}
              direction="column"
              justify="center"
              alignItems="center"
              zeroMinWidth
            >
              <Typography className={classes.text} color="default">
                이메일: {localStorage.getItem('login_id')}
              </Typography>
              <TextField
                className={classes.inputText}
                id="new_pw"
                name="new_pw"
                type="password"
                autoComplete="current-password"
                label="변경할 비밀번호"
                margin="normal"
                required
                autoFocus
              />
              <TextField
                className={classes.inputText}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                label="비밀번호 확인"
                margin="normal"
                required
                autoFocus
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              취소
            </Button>
            <Button type="submit" color="primary" autoFocus>
              수정
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

// action을 dispatch하는 펑션을 로컬에 있는 props로 매핑
const mapActionToProps = dispatch => {
  return {
    pwUpdate: data => dispatch(pwUpdate(data)),
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapActionToProps,
  )(withRouter(PwModifyDialog)),
);

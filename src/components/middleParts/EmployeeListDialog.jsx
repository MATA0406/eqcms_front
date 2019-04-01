import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import ListComponent from 'components/smallParts/ListComponent';
import Divider from '@material-ui/core/Divider';

const styles = {
  userName: {
    fontSize: '18px',
    marginTop: '20px',
    marginBottom: '20px',
  },
  userInfo: {
    fontSize: '18px',
    marginTop: '10px',
    marginBottom: '20px',
  },
  userNameArea: {
    backgroundColor: grey[200],
  },
  userInfoArea: {
    backgroundColor: grey[50],
  },
  userId: {
    marginTop: '20px',
    marginBottom: '10px',
    fontSize: '18px',
  },
};

class EmployeeListDialog extends React.Component {
  render() {
    const { classes, open, handleClose, emp_info, emp_equip_list } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          disableBackdropClick
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">직원 정보</DialogTitle>
          <DialogContent>
            <Grid container item xs={12} sm={12}>
              <Grid
                container
                item
                xs={12}
                sm={3}
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.userNameArea}
              >
                <Typography className={classes.userName}>
                  {emp_info.nm}
                </Typography>
              </Grid>

              <Grid
                container
                item
                xs={12}
                sm={9}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                className={classes.userInfoArea}
              >
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Typography className={classes.userId}>
                    {emp_info.id}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  direction="row"
                  justify="space-evenly"
                  alignItems="flex-start"
                >
                  <Typography className={classes.userInfo}>
                    {emp_info.pst_nm}
                  </Typography>
                  <Typography className={classes.userInfo}>
                    {emp_info.tel}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            장비 목록({emp_equip_list.length})
            <Divider />
            {emp_equip_list.map(emp_equip_info => (
              <ListComponent
                equip_info={emp_equip_info}
                emp_info={emp_info}
                key={emp_equip_info.equip_no}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeListDialog);

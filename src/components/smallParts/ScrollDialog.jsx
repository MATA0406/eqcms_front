import React from 'react';

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
  },
  dialogAttr: {
    width: 700,
  },
});

class ScrollDialog extends React.Component {
  render() {
    const { open, scroll, handleClose, classes } = this.props;

    return (
      <div>
        <Dialog
          maxWidth="sm"
          fullWidth
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">요청 장비 검색</DialogTitle>
          <Divider />
          <DialogContent id="scrollDiv">
            <form className={classes.root}>
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
                    id="outlined-select-currency"
                    select
                    label="장비"
                    className={classes.textField}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    value=""
                    margin="normal"
                    variant="outlined"
                  >
                    <MenuItem value="select">아이템</MenuItem>
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
                    id="search"
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
            <InfiniteComponent />
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

export default withStyles(styles)(ScrollDialog);

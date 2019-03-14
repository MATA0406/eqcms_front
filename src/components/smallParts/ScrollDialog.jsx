import React from 'react';

// Dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// SelectBox
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
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
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class ScrollDialog extends React.Component {
  render() {
    const { open, scroll, handleClose, classes } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">요청 장비 검색</DialogTitle>
          <DialogContent id="scrollDiv">
            <form className={classes.root}>
              <Grid
                container
                item
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
                <TextField
                  id="outlined-name"
                  label="Name"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  className={classes.textField}
                  size="large"
                  color="primary"
                >
                  검색
                </Button>
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

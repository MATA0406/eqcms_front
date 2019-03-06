import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import EquipmentCard from '../middleParts/EquipmentCard';
import SelectController from '../middleParts/SelectController';

const styles = {
  title: {
    fontSize: 24,
  },
};

class EmployeeListPage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography className={classes.title}>장비 관리</Typography>
        <SelectController />
        <EquipmentCard />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(EmployeeListPage);

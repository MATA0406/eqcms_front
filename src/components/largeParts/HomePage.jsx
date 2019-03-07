import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import EquipmentCard from 'components/middleParts/EquipmentCard';

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
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography className={classes.requestEquipmentList}>
          요청 장비 목록
        </Typography>
        <EquipmentCard requestCard />
        <Typography className={classes.myEquipmentList}>
          나의 장비 목록
        </Typography>
        <EquipmentCard />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HomePage);

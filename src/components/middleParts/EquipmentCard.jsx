/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import LinearProgress from '@material-ui/core/LinearProgress';

import RequestCard from './RequestCard';
import CardComponent from 'components/smallParts/CardComponent';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class EquipmentCard extends React.Component {
  render() {
    const { classes, req_grp, equip_list, handleClickOpen } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {equip_list
            ? equip_list.map((equip_info, index) => (
                <CardComponent
                  req_grp={req_grp}
                  equip_info={equip_info}
                  key={index}
                  handleClickOpen={handleClickOpen}
                />
              ))
            : ''}

          {req_grp === 'R' ? <RequestCard /> : ''}
        </Grid>
      </div>
    );
  }
}

EquipmentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EquipmentCard);

/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import RequestCard from './RequestCard';
import CardComponent from 'components/smallParts/CardComponent';

const styles = {
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 16,
  },
  iconSize: {
    fontSize: 100,
  },
};

function EquipmentCard(props) {
  const { classes, req_grp, equip_list, history, cardType } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        {equip_list && cardType !== 'equip'
          ? equip_list.map((equip_info, index) => (
              <CardComponent
                history={history}
                req_grp={req_grp}
                equip_info={equip_info}
                key={index}
              />
            ))
          : ''}

        {equip_list && cardType === 'equip'
          ? equip_list.map((equip_info, index) => (
              <CardComponent
                history={history}
                req_grp={equip_info.req_grp}
                equip_info={equip_info}
                key={index}
              />
            ))
          : ''}

        {req_grp === 'R' ? <RequestCard /> : ''}
      </Grid>
    </div>
  );
}

EquipmentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EquipmentCard);

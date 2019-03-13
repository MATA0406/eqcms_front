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
  const { classes, cardType, equip_list, history } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        {equip_list
          ? equip_list.map((item, index) => (
              <CardComponent
                history={history}
                cardType={cardType}
                equip_info={item}
                key={index}
              />
            ))
          : ''}

        {cardType === 'req_card' ? <RequestCard /> : ''}
      </Grid>
    </div>
  );
}

EquipmentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EquipmentCard);

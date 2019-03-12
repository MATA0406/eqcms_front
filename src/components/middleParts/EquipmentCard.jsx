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
  const { classes, requestCard, cardType, req_equip_list } = props;
  const _status = 'ok';

  console.log('1111111 :: ', req_equip_list);

  return (
    <div className={classes.root}>
      <Grid container _status={_status} spacing={24}>
        {req_equip_list.map((item, index) => (
          <CardComponent
            _status={_status}
            cardType={cardType}
            req_equip_list={item}
            key={index}
          />
        ))}

        {cardType === 'req_card' ? <RequestCard /> : ''}
      </Grid>
    </div>
  );
}

EquipmentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EquipmentCard);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import orange from '@material-ui/core/colors/orange';

const styles = {
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 250,
    minHeight: 253,
  },
  cssRoot: {
    color: '#ffffff',
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange.A200,
    },
  },
};

function RequestCard(props) {
  const { classes } = props;

  return (
    <Grid item xs={12} sm={2}>
      <Card className={classes.card}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ minHeight: 250 }}
        >
          <CardActions>
            <Button
              className={classes.cssRoot}
              variant="contained"
              color="primary"
              size="large"
            >
              요청
            </Button>
          </CardActions>
        </Grid>
      </Card>
    </Grid>
  );
}

RequestCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RequestCard);

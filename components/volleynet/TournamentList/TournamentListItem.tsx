import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { Tournament } from '../../../types';
import TournamentAttribute from './TournamentAttribute';

const styles = (theme: Theme) =>
  createStyles({
    arrow: {
      alignSelf: 'center',
      paddingRight: '5px',
    },
    attributes: {
      '&> *': {
        flex: '1',
      },
      display: 'flex',
      flexDirection: 'row',
    },
    content: {
      display: 'flex',
      flex: '1 0 auto',
      flexDirection: 'column',
      margin: '5px 5px 5px 20px',
      padding: '5px',
      width: '200px',
    },
    gender: {
      color: theme.palette.grey[400],
    },
    item: {
      alignItems: 'stretch',
      flex: '1 0 auto',
      padding: 0,
    },
    name: {
      color: theme.palette.grey[800],
      fontWeight: 400,
      fontSize: '20px',
      marginBottom: '15px',
    },
  });

interface Props extends WithStyles<typeof styles> {
  tournament: Tournament;
}

const TournamentListItem = ({ tournament, classes }: Props) => {
  return (
    <Link
      href="/tournaments/[id]"
      as={`/tournaments/${tournament.id}`}
      passHref
    >
      <ListItem className={classes.item} component="a" button divider>
        <div className={classes.content}>
          <Typography className={classes.name} noWrap>
            {tournament.name}{' '}
            <span className={classes.gender}>
              ({tournament.gender.toLowerCase()})
            </span>
          </Typography>
          <div className={classes.attributes}>
            <TournamentAttribute
              label="Teams"
              data={`${tournament.signedupTeams}/${tournament.maxTeams}`}
            />
            <TournamentAttribute label="Status" data={tournament.status} />
            <TournamentAttribute label="League" data={tournament.subLeague} />
          </div>
        </div>
        <ArrowRight
          fontSize="large"
          color="primary"
          className={classes.arrow}
        />
      </ListItem>
    </Link>
  );
};

export default withStyles(styles)(TournamentListItem);

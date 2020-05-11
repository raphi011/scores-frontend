import React from 'react';

import TimeAgo from 'react-timeago';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import External from '@material-ui/icons/OpenInNew';
import Typography from '@material-ui/core/Typography';
import SignupIcon from '@material-ui/icons/AssignmentTurnedIn';
import Fab from '@material-ui/core/Fab';
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
} from '@material-ui/core/styles';

import { formatDate } from '../../utils/date';
import { fontPalette } from '../../styles/theme';
import { link } from '../../styles/shared';
import { Tournament } from '../../types';
import { withWidth } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import Link from 'next/link';
import Organiser from './Organiser';

const styles = (theme: Theme) =>
  createStyles({
    attrContainer: {
      marginRight: '40px',
    },
    attr: {
      fontSize: fontPalette[800],
      fontWeight: 500,
      marginRight: '10px',
    },
    attrValue: {
      fontSize: fontPalette[500],
      fontWeight: 300,
      color: theme.palette.grey[500],
    },
    externalIcon: {
      fontSize: '16px',
      marginLeft: '10px',
      verticalAlign: 'middle',
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    signupButton: {
      width: '120px',
    },
    titleRow: {
      marginBottom: '20px',
      display: 'flex',
    },
    titleRowDesktop: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleRowMobile: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    stats: {
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    volleynetLink: {
      ...link,
    },
  });

interface Props extends WithStyles<typeof styles> {
  tournament: Tournament;
  width: Breakpoint;

  showSignup: boolean;
}

function TournamentHeader({ tournament, width, classes, showSignup }: Props) {
  const isMobile = ['xs', 'sm'].includes(width);

  const titleRowClassName = classNames(classes.titleRow, {
    [classes.titleRowDesktop]: !isMobile,
    [classes.titleRowMobile]: isMobile,
  });

  let signupButton = null;
  let fabButton = null;

  if (showSignup) {
    if (isMobile) {
      fabButton = (
        <Link
          href="/tournaments/[id]/signup"
          as={`/tournaments/${tournament.id}/signup`}
          passHref
        >
          <div style={{ height: '30px' }} />
          <Fab component="a" className={classes.fab} color="primary">
            <SignupIcon />
          </Fab>
        </Link>
      );
    } else {
      signupButton = (
        <Link
          href="/tournaments/[id]/signup"
          as={`/tournaments/${tournament.id}/signup`}
          passHref
        >
          <Button
            component="a"
            variant="contained"
            className={classes.signupButton}
            color="primary"
          >
            Signup
          </Button>
        </Link>
      );
    }
  }

  return (
    <>
      <Grid container>
        <Grid md={8} xs={12} item>
          <div className={titleRowClassName}>
            <div>
              <a
                href={tournament.link}
                className={classes.volleynetLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography variant="h1">
                  {tournament.name}
                  <External className={classes.externalIcon} />
                </Typography>
              </a>
              <Typography variant="subtitle1">
                {tournament.subLeague} - {formatDate(tournament.start)}
              </Typography>
            </div>
          </div>
          <div>
            <div className={classes.stats}>
              <span className={classes.attrContainer}>
                <TimeAgo
                  date={tournament.start}
                  formatter={(value, unit, suffix) => (
                    <>
                      <Typography className={classes.attr}>{value}</Typography>
                      <Typography className={classes.attrValue}>
                        {unit}
                        {value > 1 ? 's' : ''} {suffix}
                      </Typography>
                    </>
                  )}
                />
              </span>
              <span className={classes.attrContainer}>
                <Typography className={classes.attr}>
                  {`${tournament.signedupTeams}/${tournament.maxTeams}`}
                </Typography>
                <Typography className={classes.attrValue}>
                  Teams signed up
                </Typography>
              </span>
              <span className={classes.attrContainer}>
                <Typography className={classes.attr}>
                  {tournament.maxPoints}
                </Typography>
                <Typography className={classes.attrValue}>
                  Max points
                </Typography>
              </span>
            </div>
          </div>
        </Grid>
        <Grid md={4} xs={12} direction="column" alignItems="flex-end" item>
          {signupButton}
          <Organiser tournament={tournament} />
        </Grid>
      </Grid>
      {fabButton}
    </>
  );
}

export default withStyles(styles)(withWidth()(TournamentHeader));

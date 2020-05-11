import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Calendar from '@material-ui/icons/CalendarTodayTwoTone';

import LoadingButton from '../../LoadingButton';
import { FilterOptions } from '../../../redux/tournaments/reducer';

const styles = (theme: Theme) =>
  createStyles({
    calendarIcon: {
      margin: '8px 8px 8px 0',
    },
    checkbox: {
      color: theme.palette.grey[200],
      padding: '4px',
    },
    checkboxes: {
      marginLeft: '9px',
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '15px',
    },
    filterHeader: {
      marginBottom: '3px',
    },
    font: {
      color: theme.palette.grey[700],
    },
    form: {
      width: '100%',
    },
    seasonFilterRow: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
    },
  });

export interface Filters {
  leagues: string[];
  genders: string[];
  seasons: string;
}

interface Props extends WithStyles<typeof styles> {
  filters: Filters;
  options: FilterOptions;

  loading: boolean;

  onFilter: (filters: Filters) => void;
}

type State = Filters;

class TournamentFilters extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const {
      filters: { leagues, genders, seasons },
    } = this.props;

    this.state = {
      genders,
      leagues,
      seasons,
    };
  }

  onSelectSeason = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const { genders, seasons, leagues } = this.state;

    const selectedSeason = event.target.value;

    if (typeof selectedSeason !== 'string' || selectedSeason === seasons) {
      return;
    }

    this.setState({
      genders,
      leagues,
      seasons: selectedSeason,
    });
  };

  onSelectLeague = (selected: string) => {
    const { genders, seasons, leagues: league } = this.state;

    if (league.length === 1 && league[0] === selected) {
      return;
    }

    let newSelected = league;

    if (league.includes(selected)) {
      newSelected = newSelected.filter(l => l !== selected);
    } else {
      newSelected.push(selected);
    }

    this.setState({
      genders,
      leagues: newSelected,
      seasons,
    });
  };

  onSelectGenders = (selected: string) => {
    const { genders, seasons, leagues } = this.state;

    if (genders.length === 1 && genders[0] === selected) {
      return;
    }

    let newSelected = genders;

    if (genders.includes(selected)) {
      newSelected = newSelected.filter(g => g !== selected);
    } else {
      newSelected.push(selected);
    }

    this.setState({
      genders: newSelected,
      leagues,
      seasons,
    });
  };

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { onFilter } = this.props;

    onFilter(this.state);
  };

  render() {
    const { classes, loading = false, options } = this.props;
    const { genders, leagues, seasons } = this.state;

    if (!options) {
      return null;
    }

    return (
      <form
        onSubmit={this.onSubmit}
        autoComplete="off"
        className={classes.form}
      >
        <div className={classes.filterGroup}>
          <Typography variant="subtitle2" className={classes.filterHeader}>
            Season
          </Typography>
          <div className={classes.seasonFilterRow}>
            <Calendar
              className={classes.calendarIcon}
              color="primary"
              fontSize="small"
            />
            <Select
              style={{ marginTop: '3px' }}
              value={seasons}
              onChange={this.onSelectSeason}
              fullWidth
            >
              {options.seasons.map(s => (
                <MenuItem classes={{ root: classes.font }} key={s} value={s}>
                  <Typography className={classes.font}>{s}</Typography>
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <div className={classes.filterGroup}>
          <Typography variant="subtitle2" className={classes.filterHeader} />
          {options.genders.map(g => (
            <FormControlLabel
              key={g}
              classes={{ label: classes.font }}
              control={
                <Checkbox
                  checked={genders.includes(g)}
                  onChange={() => this.onSelectGenders(g)}
                  className={`${classes.checkbox} ${classes.checkboxes}`}
                  value={g}
                  color="primary"
                />
              }
              label={g}
            />
          ))}
        </div>
        <div className={classes.filterGroup}>
          <Typography variant="subtitle2" className={classes.filterHeader}>
            Tour
          </Typography>
          {options.leagues.map(l => (
            <FormControlLabel
              key={l}
              classes={{ label: classes.font }}
              control={
                <Checkbox
                  checked={leagues.includes(l)}
                  onChange={() => this.onSelectLeague(l)}
                  className={`${classes.checkbox} ${classes.checkboxes}`}
                  value={l}
                  color="primary"
                />
              }
              label={l}
            />
          ))}
        </div>
        <LoadingButton loading={loading}>
          <span>Search</span>
        </LoadingButton>
      </form>
    );
  }
}

export default withStyles(styles)(TournamentFilters);

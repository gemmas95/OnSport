import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './centerDetailsComponent.scss';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        'text-align': 'justify',
        width: '100%',
        margin: 'auto',
        'margin-bottom': 5
    }
}));

export default function TabCenterDetails({
    centerDescription,
    centerOpinions,
    centerAct
}) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Descripción" {...a11yProps(0)} />
                    <Tab label="Opiniones" {...a11yProps(1)} />
                    <Tab label="Top actividades" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    {centerDescription}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    {centerOpinions &&
                        centerOpinions.map((actualOpinion) => {
                            return <li key={value}>{actualOpinion}</li>;
                        })}
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    {centerAct && (
                        <ul>
                            {centerAct &&
                                centerAct.map((activity) => {
                                    return (
                                        <li key={activity._id}>
                                            {activity.name}
                                        </li>
                                    );
                                })}
                        </ul>
                    )}
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}

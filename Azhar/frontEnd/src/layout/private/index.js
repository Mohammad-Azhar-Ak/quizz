import React from 'react'
import { CustomHeader } from '../../shared'
import {
    Route,
    Switch
} from 'react-router-dom'
import { privateRoutes } from '../../navigation/routes';
import { ThemeProvider } from '@mui/material/styles';
import myTheme from '../../utils/theme'
import { Grid } from '@mui/material';

const PrivateLayout = () => {
    return (
        <>
            <ThemeProvider theme={myTheme}>
                <Grid
                    sx={{
                        height: "8vh"
                    }}>
                    <CustomHeader />
                </Grid>
                <Grid
                    sx={{
                        height: "92vh",
                        backgroundColor:"#fce9ef"
                    }}>
                    <Switch>
                        {privateRoutes && privateRoutes.map((item, index) => <Route
                            key={index}
                            exact
                            path={item.path}
                            component={item.component}
                        />)}
                    </Switch>
                </Grid>
            </ThemeProvider>
        </>
    )
}

export default PrivateLayout
import React from 'react'
import {
    Route,
    Switch
} from 'react-router-dom'
import { publicRoutes } from '../../navigation/routes';
import { ThemeProvider } from '@mui/material/styles';
import myTheme from '../../utils/theme'
import { CustomHeader } from '../../shared'
import { Grid } from '@mui/material';

const PublicLayout = () => {
    return (
        <>
            <ThemeProvider
                theme={myTheme}
            >
                <Grid
                    sx={{
                        height: "6vh"
                    }} >
                    <CustomHeader />
                </Grid>
                <Grid
                    sx={{
                        height: "94vh"
                    }}>
                    <Switch>
                        {publicRoutes && publicRoutes.map((item, index) => <Route
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

export default PublicLayout
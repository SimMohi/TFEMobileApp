import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import NewLoginPage from "../Pages/NewLogin";
import NewRegisterPage from "../Pages/NewRegisterPage";

const Routes = () => {
    return (
        <>
        <Router>
            <Stack key="root" hideNavBar={true}>
                <Scene key="login" component={NewLoginPage} title="Login" initial={true} />
                <Scene key="register" component={NewRegisterPage} title="Register" />
            </Stack>
        </Router>
    </>
    );
}

export default Routes;
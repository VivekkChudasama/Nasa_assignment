import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Welcome from '../Component/Welcome.js';

const Routes = createStackNavigator ({
    Welcome: {
        screen: Welcome,
        navigationOptions: {
            title: 'WovvTech_assignment',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#054DA1',
            }
        }
    }
});

export default createAppContainer(Routes);
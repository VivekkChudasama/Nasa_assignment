import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Welcome from '../Component/Welcome';

const Project = createStackNavigator({
    Welcome: {
        screen: Welcome,
        navigationOptions: {
            title: 'WovvTechAssignment',
            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: '#054DA1'
            }
        }
    }
});

export default createAppContainer(Project);
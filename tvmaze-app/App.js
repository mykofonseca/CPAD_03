import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaSeriesScreen from './screens/ListaSeriesScreen';
import DetalheSerieScreen from './screens/DetalheSerieScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Series">
        <Stack.Screen
          name="Series"
          component={ListaSeriesScreen}
          options={{ title: 'Séries' }}
        />
        <Stack.Screen
          name="Detalhe"
          component={DetalheSerieScreen}
          options={({ route }) => ({ title: route.params?.nome ?? 'Detalhe' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

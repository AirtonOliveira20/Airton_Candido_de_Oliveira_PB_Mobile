import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './context/AuthContext';

import TelaLogin from './screens/TelaLogin';
import Home from './screens/Home';
import CadastrarAtivos from './screens/CadastrarAtivos';
import AtualizarAtivos from './screens/AtualizarAtivos';
import CadastrarUsuarios from './screens/CadastrarUsuarios';
import Dashboard from './screens/Dashboard';
import UsarCamera from './screens/UsarCamera';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerRoutes() {
   const { userType } = useAuth();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Cadastro de Ativos" component={CadastrarAtivos} />
      

      {userType === "admin" && (
              <Drawer.Screen name="Cadastro de Usuário" component={CadastrarUsuarios} />
            )}
       
    </Drawer.Navigator>
 
  );
}


function AppRoutes() {
  const { isAuthenticated} = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={TelaLogin} />
        ) : (
          <>
            <Stack.Screen name="Main" component={DrawerRoutes} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AtualizarAtivos" component={AtualizarAtivos} />
            <Stack.Screen name="UsarCamera" component={UsarCamera} />
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

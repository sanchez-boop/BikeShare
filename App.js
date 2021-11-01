import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, LogBox, Image, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import logo from './assets/Shop-Logo.png'
import eye from './assets/icons8-eye-30.png'

function SignIn({ navigation }) {
  const[emailInput, changeEmailInput] = React.useState(null);
  const[passwordInput, changePasswordInput] = React.useState(null);
  const[isSecureEntry, changeIsSecureEntry] = React.useState(true);

  return (
    <View style={styles.mainView}>
      <View style={styles.topRectangle}/>
      <Image source={logo} style={styles.logo}/>
      <View style={styles.content}>
        <Text style={styles.title}>BikeN'Gold</Text>

        <TextInput style={styles.emailInput}  onChangeText={changeEmailInput} value={emailInput} placeholder="Knights Email"/>

        <TextInput style={styles.passwordinput} secureTextEntry={isSecureEntry} onChangeText={changePasswordInput} value={passwordInput} placeholder="Password"/>

        <TouchableOpacity onPress={() => {changeIsSecureEntry((prev) => !prev);}} style={styles.passwordView}>
          <Image source={eye} style={{height: 22, width: 22,marginLeft: 1, marginTop: 1}}/>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => alert('Continue to password forget here!')} style={{marginLeft: 42, marginTop: -30, marginBottom: 20,height: 20, width: 160,}}>
          <Text style={styles.forgotPassword}>Forget your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert('Continue to sign in here!')} style={styles.signInButton}>
          <Text style={{fontSize: 20, color: '#fff', marginLeft: 70,}}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Sign-Up')} style={styles.signInUpRedirect}>
          <Text style={{fontSize: 12, color: '#000000', marginLeft: 16, marginTop: 4}}>Don't have an account?{" "}
            <Text style={{fontSize: 12, color: '#00A4EB', marginLeft: 12, marginTop: 4}}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

function SignUp({ navigation }) {
  const[emailInput, changeEmailInput] = React.useState(null);
  const[passwordInput, changePasswordInput] = React.useState(null);
  const[isSecureEntry, changeIsSecureEntry] = React.useState(true);
  const[firstNameInput, changeFirstNameInput] = React.useState(null);
  const[lastNameInput, changeLastNameInput] = React.useState(null);

  return (
    <View style={styles.mainView}>
      <View style={styles.topRectangle}/>
      <Image source={logo} style={styles.logoUp}/>
      <View style={styles.contentUp}>
        <Text style={styles.titleUp}>BikeN'Gold</Text>

        <View style={{flexDirection:"row"}}>
          <View style={{flex:1}}>
            <TextInput style={styles.firstNameInput}  onChangeText={changeFirstNameInput} value={firstNameInput} placeholder="First Name"/>
          </View>
          <View style={{flex:1}}>
            <TextInput style={styles.lastNameInput}  onChangeText={changeLastNameInput} value={lastNameInput} placeholder="Last Name"/>
          </View>
        </View>

        <TextInput style={styles.phoneNumber}  onChangeText={changeEmailInput} value={emailInput} placeholder="Phone Number"/>

        <TextInput style={styles.emailInputUp}  onChangeText={changeEmailInput} value={emailInput} placeholder="Knights Email"/>

        <TextInput style={styles.passwordinputUp} secureTextEntry={isSecureEntry} onChangeText={changePasswordInput} value={passwordInput} placeholder="Password"/>

        <TouchableOpacity onPress={() => {changeIsSecureEntry((prev) => !prev);}} style={styles.passwordView}>
          <Image source={eye} style={{height: 22, width: 22,marginLeft: 1, marginTop: 1}}/>
        </TouchableOpacity>

        <TextInput style={styles.passwordinputUp} secureTextEntry={isSecureEntry} onChangeText={changePasswordInput} value={passwordInput} placeholder="Re-enter Password"/>

        <TouchableOpacity onPress={() => {changeIsSecureEntry((prev) => !prev);}} style={styles.passwordView}>
          <Image source={eye} style={{height: 22, width: 22,marginLeft: 1, marginTop: 1}}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert('Continue to sign up here!')} style={styles.signUpButton}>
          <Text style={{fontSize: 20, color: '#fff', marginLeft: 70,}}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Sign-In')} style={styles.signInUpRedirect}>
          <Text style={{fontSize: 12, color: '#000000', marginLeft: 34, marginTop: 4}}>Have an account?{" "}
            <Text style={{fontSize: 12, color: '#00A4EB', marginLeft: 12, marginTop: 4}}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View> 
  );
}

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Sign-In" component={SignIn} />
        <Stack.Screen name="Sign-Up" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  signUpButton: {
    height: 45,
    width: 220,
    backgroundColor: '#000000',
    padding: 5,
    marginTop: -16,
    marginBottom: -10,
    marginLeft: 72,

    borderRadius: 5,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,  
    elevation: 3,
  }, 
  passwordinputUp: {
    height: 55,
    width: 310,
    margin: 40, 
    marginLeft: 30,
    padding: 10,
    marginTop: -16,

    borderRadius: 8.5,
    borderWidth: 0.85,
    borderColor: '#B5B5B5',
    backgroundColor: '#F4FEFF',

  },
  emailInputUp: {
    height: 55,
    width: 310,
    margin: 40, 
    marginLeft: 30,
    marginBottom: 36,
    padding: 10,

    borderRadius: 8.5,
    borderWidth: 0.85,
    borderColor: '#B5B5B5',
    backgroundColor: '#F4FEFF',

  },
  phoneNumber: {
    height: 55,
    width: 310, 
    margin: 40, 
    marginLeft: 30,
    marginBottom: -20,
    marginTop: -20,
    padding: 10,

    borderRadius: 8.5,
    borderWidth: 0.85,
    borderColor: '#B5B5B5',
    backgroundColor: '#F4FEFF',
  }, 
  firstNameInput: {
    height: 55,
    width: 150,
    margin: 40, 
    marginLeft: 30,
    padding: 10,

    borderRadius: 8.5,
    borderWidth: 0.85,
    borderColor: '#B5B5B5',
    backgroundColor: '#F4FEFF',
  },
  lastNameInput: {
    height: 55,
    width: 150,
    margin: 40, 
    marginLeft: 4,
    padding: 10,

    borderRadius: 8.5,
    borderWidth: 0.85,
    borderColor: '#B5B5B5',
    backgroundColor: '#F4FEFF',
  }, 
  titleUp: {
    fontSize: 48, 
    fontWeight: 'bold', 
    marginLeft: 53, 
    marginTop: 10, 
    marginBottom: -30
  }, 
  logoUp: {
    height: 275,
    width: 275,
    marginTop: -85,
    marginBottom: -36,
  },
  contentUp: {
    width: '90%',
    height: '68%',
    backgroundColor: '#ffeda6',

    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: '#B5B5B5',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,  
    elevation: 3,
  },
  passwordView: {
    height: 25, 
    width: 25, 
     
    marginLeft: 295,
    marginTop: -80,
    marginBottom: 50,
  },
  forgotPassword: {
    fontSize: 13.3,
    color: '#555555',
  },
  signInUpRedirect: {
    height: 30,
    width: 220,
    backgroundColor: '#F4FEFF',
    padding: 1,
    marginLeft: 72,
    marginTop: 30,

    borderRadius: 20,
  },
  title: {
    fontSize: 48, 
    fontWeight: 'bold', 
    marginLeft: 53, 
    marginTop: 35, 
    marginBottom: -12
  }, 
  signInButton: {
    height: 45,
    width: 220,
    backgroundColor: '#000000',
    padding: 5,
    marginLeft: 72,

    borderRadius: 5,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,  
    elevation: 3,
  }, 
  emailInput: {
    height: 55,
    margin: 40, 
    padding: 10,

    borderRadius: 8.5,
    borderWidth: 0.85,
    borderColor: '#B5B5B5',
    backgroundColor: '#F4FEFF',

  },
  passwordinput: {
    height: 55,
    margin: 40, 
    padding: 10,
    marginTop: -16,

    borderRadius: 8.5,
    borderWidth: 0.85,
    borderColor: '#B5B5B5',
    backgroundColor: '#F4FEFF',

  },
  content: {
    width: '90%',
    height: '53%',
    backgroundColor: '#ffeda6',

    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: '#B5B5B5',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,  
    elevation: 3,
  },
  logo: {
    height: 275,
    width: 275,
    marginTop: -85,
    marginBottom: -10,
  },
  mainView: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  topRectangle: {
    width: '100%',
    height: '10%',
    backgroundColor: '#FFCC00',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

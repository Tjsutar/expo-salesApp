import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

// Define the correct props type for navigation
type SignInScreenNavigationProp = StackNavigationProp<any, 'Home'>;

// Define the correct props type for SignInScreen
interface SignInScreenProps {
  navigation: SignInScreenNavigationProp;
  onLogin: (email: string, password: string) => Promise<void>;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [users, setUsers] = useState<any[]>([]); // State to hold the stored users
  const [emailFound, setEmailFound] = useState(false); // State to track if the email exists

  useEffect(() => {
    // Fetch users once when component mounts
    const fetchUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('users');
        const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
        setUsers(parsedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = async (values: { email: string; password: string }) => {
    const user = users.find((user: { email: string; password: string }) => user.email === values.email);

    if (user && user.password === values.password) {
      await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
      navigation.navigate('LoggedIn');
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  const handleEmailChange = (email: string) => {
    const userExists = users.some((user: { email: string }) => user.email === email);
    setEmailFound(userExists);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>

      <View style={styles.header}>
        <Image
          source={require('../assets/images/auth-icon.png')} // Ensure correct path to image
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Icon
                  name="email-outline"
                  size={20}
                  color="#6B7280"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="john.doe@example.com"
                  placeholderTextColor="#9CA3AF"
                  value={values.email}
                  onChangeText={(text) => {
                    handleChange('email')(text);
                    handleEmailChange(text); // Check email as it's typed
                  }}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {touched.email && errors.email && (
                <View style={styles.errorContainer}>
                  <Icon name="alert-circle" size={14} color="#EF4444" />
                  <Text style={styles.errorText}>{errors.email}</Text>
                </View>
              )}
              {/* Email Existence Feedback */}
              {values.email && !emailFound && (
                <Text style={styles.noUserText}>No user found with this email</Text>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Icon
                  name="lock-outline"
                  size={20}
                  color="#6B7280"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword} // Toggle visibility of password
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                <TouchableOpacity
                  style={styles.eyeIconWrapper} // Separate wrapper for the eye icon
                  onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <View style={styles.errorContainer}>
                  <Icon name="alert-circle" size={14} color="#EF4444" />
                  <Text style={styles.errorText}>{errors.password}</Text>
                </View>
              )}
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                handleSubmit();
              }}>
              <Text style={styles.buttonText}>Sign In</Text>
              <Icon name="arrow-right" size={20} color="white" />
            </TouchableOpacity>

            {/* Alternative Options */}
            <View style={styles.alternativeOptions}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>
                  Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    color: '#111827',
    fontSize: 16,
  },
  eyeIconWrapper: {
    padding: 8,
    marginLeft: 8, // Space between the input and the icon
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginLeft: 4,
  },
  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
  },
  secondaryButton: {
    marginTop: 24,
  },
  secondaryButtonText: {
    color: '#6B7280',
    textAlign: 'center',
  },
  linkText: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  alternativeOptions: {
    marginTop: 32,
    alignItems: 'center',
    gap: 16,
  },
  noUserText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
});

export default SignInScreen;

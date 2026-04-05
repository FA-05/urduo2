import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Pressable,
  Image
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getSupabase } from '../../utils/supabase';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { StatusModal } from '../../components/ui/StatusModal';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { useAuthStore } from '../../store/authStore';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  FadeInUp, 
  FadeInDown, 
  useAnimatedStyle, 
  interpolateColor, 
  useSharedValue, 
  withTiming 
} from 'react-native-reanimated';

export default function RegisterScreen() {
  const { setGuest } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const router = useRouter();

  // Animated focus values
  const usernameFocus = useSharedValue(0);
  const emailFocus = useSharedValue(0);
  const passwordFocus = useSharedValue(0);

  const usernameInputStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(usernameFocus.value, [0, 1], [Colors.border, Colors.primary]),
    transform: [{ scale: withTiming(usernameFocus.value ? 1.01 : 1, { duration: 200 }) }]
  }));

  const emailInputStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(emailFocus.value, [0, 1], [Colors.border, Colors.primary]),
    transform: [{ scale: withTiming(emailFocus.value ? 1.01 : 1, { duration: 200 }) }]
  }));

  const passwordInputStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(passwordFocus.value, [0, 1], [Colors.border, Colors.primary]),
    transform: [{ scale: withTiming(passwordFocus.value ? 1.01 : 1, { duration: 200 }) }]
  }));

  // Status Modal State
  const [statusVisible, setStatusVisible] = useState(false);
  const [statusConfig, setStatusConfig] = useState<{
    type: 'error' | 'success' | 'info';
    title: string;
    message: string;
    buttonText: string;
    onClose?: () => void;
  }>({
    type: 'error',
    title: 'Error',
    message: '',
    buttonText: 'Okay',
  });

  const showStatus = (config: typeof statusConfig) => {
    setStatusConfig(config);
    setStatusVisible(true);
  };

  const handleRegister = async () => {
    if (!email || !password || !username) {
      showStatus({
        type: 'error',
        title: 'Missing Info',
        message: 'Please fill in all fields to create your account.',
        buttonText: 'Try Again'
      });
      return;
    }

    setLoading(true);
    const { error } = await getSupabase().auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          username: username,
        }
      }
    });

    if (error) {
      showStatus({
        type: 'error',
        title: 'Registration Error',
        message: error.message,
        buttonText: 'Fix it'
      });
      setLoading(false);
    } else {
      showStatus({
        type: 'success',
        title: 'Confirm Email',
        message: 'Account created! Please check your email to confirm your account before logging in.',
        buttonText: 'Go to Login',
        onClose: () => router.replace('/auth/login')
      });
    }
  };

  const handleGuest = () => {
    setGuest(true);
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView 
        contentContainerStyle={styles.container} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        <Animated.View 
          entering={FadeInDown.delay(200).duration(800).springify()}
          style={styles.header}
        >
          <View style={styles.logoContainer}>
             <Image 
              source={require('../../assets/images/logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>URDUO</Text>
          <Text style={styles.subtitle}>Create your learner profile</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(400).duration(800).springify()}
        >
          <Card style={styles.formCard}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <Animated.View style={[styles.inputWrapper, usernameInputStyle]}>
                <Ionicons 
                  name="person-outline" 
                  size={20} 
                  color={focusedInput === 'username' ? Colors.primary : Colors.textMuted} 
                  style={styles.inputIcon} 
                />
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  onFocus={() => {
                    setFocusedInput('username');
                    usernameFocus.value = withTiming(1);
                  }}
                  onBlur={() => {
                    setFocusedInput(null);
                    usernameFocus.value = withTiming(0);
                  }}
                  placeholder="Pick a nickname"
                  placeholderTextColor={Colors.textDisabled}
                  autoCapitalize="none"
                />
              </Animated.View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <Animated.View style={[styles.inputWrapper, emailInputStyle]}>
                <Ionicons 
                  name="mail-outline" 
                  size={20} 
                  color={focusedInput === 'email' ? Colors.primary : Colors.textMuted} 
                  style={styles.inputIcon} 
                />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => {
                    setFocusedInput('email');
                    emailFocus.value = withTiming(1);
                  }}
                  onBlur={() => {
                    setFocusedInput(null);
                    emailFocus.value = withTiming(0);
                  }}
                  placeholder="example@email.com"
                  placeholderTextColor={Colors.textDisabled}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </Animated.View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <Animated.View style={[styles.inputWrapper, passwordInputStyle]}>
                <Ionicons 
                  name="lock-closed-outline" 
                  size={20} 
                  color={focusedInput === 'password' ? Colors.primary : Colors.textMuted} 
                  style={styles.inputIcon} 
                />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => {
                    setFocusedInput('password');
                    passwordFocus.value = withTiming(1);
                  }}
                  onBlur={() => {
                    setFocusedInput(null);
                    passwordFocus.value = withTiming(0);
                  }}
                  placeholder="Min. 6 characters"
                  placeholderTextColor={Colors.textDisabled}
                  secureTextEntry
                />
              </Animated.View>
            </View>

            <Button
              title="Sign Up"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
            />

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <Pressable 
              onPress={handleGuest}
              style={({ pressed }) => [
                styles.guestButtonContainer,
                pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }
              ]}
            >
              <View style={styles.guestButtonContent}>
                <Ionicons name="person-outline" size={18} color={Colors.textMid} style={{ marginRight: 8 }} />
                <Text style={styles.guestButtonText}>Continue as Guest</Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} style={{ marginLeft: 4 }} />
              </View>
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <Link href="/auth/login" style={[styles.link, { textDecorationLine: 'none' }]}>
                Log In
              </Link>
            </View>
          </Card>
        </Animated.View>
      </ScrollView>

      <StatusModal
        visible={statusVisible}
        type={statusConfig.type}
        title={statusConfig.title}
        message={statusConfig.message}
        buttonText={statusConfig.buttonText}
        onClose={() => {
          setStatusVisible(false);
          if (statusConfig.onClose) statusConfig.onClose();
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: Layout.spacing.lg,
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: Layout.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
    ...Layout.shadow.elevated,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logo: {
    width: '70%',
    height: '70%',
  },
  title: {
    fontSize: 26,
    fontFamily: Fonts.extraBold,
    color: Colors.white,
    marginBottom: 2,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 0.5,
  },
  formCard: {
    padding: Layout.spacing.lg,
    borderRadius: 24,
    ...Layout.shadow.elevated,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  inputContainer: {
    marginBottom: Layout.spacing.sm,
  },
  label: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: Colors.textDark,
    marginBottom: 4,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: Layout.spacing.md,
    backgroundColor: Colors.white,
  },
  inputIcon: {
    marginRight: Layout.spacing.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: Colors.textDark,
  },
  registerButton: {
    height: 50,
    borderRadius: 12,
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Layout.spacing.sm,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: Layout.spacing.md,
    color: Colors.textMuted,
    fontFamily: Fonts.bold,
    fontSize: 11,
  },
  guestButtonContainer: {
    marginBottom: Layout.spacing.md,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  guestButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestButtonText: {
    color: Colors.textMid,
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  footerText: {
    color: Colors.textMid,
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  link: {
    color: Colors.primary,
    fontFamily: Fonts.extraBold,
    fontSize: 14,
  },
});


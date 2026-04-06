import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { getSupabase } from '../../utils/supabase';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { FormInput } from '../../components/ui/FormInput';
import { StatusModal } from '../../components/ui/StatusModal';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Layout } from '../../constants/layout';
import { useAuthStore } from '../../store/authStore';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const { setGuest } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Status Modal State
  const [statusVisible, setStatusVisible] = useState(false);
  const [statusConfig, setStatusConfig] = useState<{
    type: 'error' | 'success' | 'info';
    title: string;
    message: string;
  }>({
    type: 'error',
    title: 'Error',
    message: '',
  });

  const router = useRouter();

  const showError = (title: string, message: string) => {
    setStatusConfig({ type: 'error', title, message });
    setStatusVisible(true);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showError('Required Fields', 'Please fill in both your email and password.');
      return;
    }

    setLoading(true);
    const { error } = await getSupabase().auth.signInWithPassword({ email, password });

    if (error) {
      showError('Login Failed', error.message);
      setLoading(false);
    } else {
      router.replace('/(tabs)');
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
        colors={[Colors.jade, Colors.jadeDim]}
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
          <Text style={styles.subtitle}>Start Your Language Journey</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(400).duration(800).springify()}
        >
          <Card style={styles.formCard}>
            <FormInput
              label="Email Address"
              icon="mail-outline"
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <FormInput
              label="Password"
              icon="lock-closed-outline"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              labelRight={
                <Pressable>
                  <Text style={styles.forgotPasswordTextSmall}>Forgot?</Text>
                </Pressable>
              }
            />

            <Button
              title="Log In"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
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
                <Ionicons name="person-outline" size={18} color={Colors.inkSoft} style={{ marginRight: 8 }} />
                <Text style={styles.guestButtonText}>Continue as Guest</Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.inkMuted} style={{ marginLeft: 4 }} />
              </View>
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <Link href="/auth/register" style={[styles.link, { textDecorationLine: 'none' }]}>
                Register
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
        buttonText="Try Again"
        onClose={() => setStatusVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: Layout.spacing.lg,
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: Layout.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
    zIndex: 1,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    fontSize: 28,
    fontFamily: Fonts.extraBold,
    color: Colors.white,
    marginBottom: 2,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 0.5,
  },
  formCard: {
    padding: Layout.spacing.lg,
    borderRadius: 24,
    ...Layout.shadow.elevated,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  forgotPasswordTextSmall: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: Colors.jade,
    marginRight: 4,
  },
  loginButton: {
    height: 54,
    borderRadius: 12,
    marginTop: 4,
    shadowColor: Colors.jade,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Layout.spacing.md,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.jadeBorder10,
  },
  dividerText: {
    marginHorizontal: Layout.spacing.md,
    color: Colors.inkMuted,
    fontFamily: Fonts.bold,
    fontSize: 12,
  },
  guestButtonContainer: {
    marginBottom: Layout.spacing.md,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.jadeBorder10,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  guestButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestButtonText: {
    color: Colors.inkSoft,
    fontFamily: Fonts.bold,
    fontSize: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Layout.spacing.sm,
    gap: 4,
  },
  footerText: {
    color: Colors.inkSoft,
    fontSize: 15,
    fontFamily: Fonts.regular,
  },
  link: {
    color: Colors.jade,
    fontFamily: Fonts.extraBold,
    fontSize: 15,
  },
});


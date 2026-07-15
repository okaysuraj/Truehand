import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('Julian Thorne');
  const [email, setEmail] = useState('julian.thorne@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [bio, setBio] = useState('Master Ceramicist and dedicated collector of brutalist tableware. Member since 2021.');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Personal Details</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* Profile Photo Area */}
          <View style={styles.photoSection}>
            <TouchableOpacity style={styles.photoContainer}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAXJ4iDjoifnQiz-2sEuvOfe3r6qy63Rnd9C4o4PToAPlJ4j6FqlbSudAbJe4MK4z37fDFYAv07BWTay43EDI5WEe49BP5Cyd5an8IQv28jrf_By_8zef_QsTmT_4WR0cqBR_IKpKUpbaoMszgxhkdHtl2tfmScpNBWvl3ZoD4aTAyyWIBkFyn_nBs8eGgcpNqh4eWmu_wf56ELcspIpCDORq78V86xWFRknYKpAKr7P9NzdGBR0pRjQ' }} 
                style={styles.profilePhoto} 
              />
              <View style={styles.photoOverlay}>
                <Ionicons name="camera" size={24} color={colors.white || '#fff'} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput 
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter full name"
                placeholderTextColor={colors['outline-variant']}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput 
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter email"
                placeholderTextColor={colors['outline-variant']}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput 
                style={styles.textInput}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="Enter phone number"
                placeholderTextColor={colors['outline-variant']}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Collector Bio</Text>
              <TextInput 
                style={[styles.textInput, styles.textArea]}
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="Tell us about yourself..."
                placeholderTextColor={colors['outline-variant']}
              />
            </View>
          </View>

          {/* Spacer to push button down slightly */}
          <View style={styles.formSpacer} />

          <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors['surface-linen'],
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.8)',
  },
  iconButton: {
    padding: spacing.stackSm,
    marginLeft: -spacing.stackSm,
  },
  headerTitle: {
    ...typography.headlineLgMobile,
    color: colors['forest-green'],
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: spacing.stackLg,
  },
  photoContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors['surface-container-lowest'],
    marginBottom: spacing.stackSm,
    position: 'relative',
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 28, 28, 0.2)', // charcoal with opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoText: {
    ...typography.labelMd,
    color: colors['forest-green'],
    textDecorationLine: 'underline',
  },
  formContainer: {
    gap: spacing.stackMd,
  },
  inputGroup: {
    flexDirection: 'col',
    gap: 4,
  },
  inputLabel: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
  },
  textInput: {
    backgroundColor: colors['surface-linen'],
    borderWidth: 1,
    borderColor: colors['clay-outline'],
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...typography.bodyMd,
    color: colors.charcoal,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12, // For iOS text alignment
  },
  formSpacer: {
    height: spacing.stackLg,
  },
  saveButton: {
    backgroundColor: colors['forest-green'],
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
});

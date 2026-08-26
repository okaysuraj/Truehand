import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

const QAS = [
  {
    id: 1,
    question: 'Is this bowl safe for the dishwasher and microwave?',
    answer: 'Yes, our stoneware is fired at high temperatures making it fully dishwasher and microwave safe. However, to preserve the life of handmade ceramics, hand washing is always gentler.',
    answeredBy: 'Answered by TrueHand Artisan'
  },
  {
    id: 2,
    question: 'What are the exact dimensions?',
    answer: 'The bowl is approximately 6.5 inches in diameter and 3 inches deep. Due to the handmade nature, slight variations of up to 0.25 inches may occur.',
    answeredBy: 'Answered by Customer Support'
  },
  {
    id: 3,
    question: 'Does the matte finish scratch easily with metal utensils?',
    answer: 'While the glaze is highly durable, repeated heavy use with metal utensils may leave slight superficial marks over time, which can usually be removed with a mild abrasive cleaner like Barkeepers Friend.',
    answeredBy: 'Answered by TrueHand Artisan'
  }
];

export default function ProductQAScreen() {
  const navigation = useNavigation();
  

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
          <Text style={styles.brandTitle}>TrueHand</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Product Context Header */}
          <View style={styles.productHeader}>
            <View style={styles.productImageContainer}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdimWWHpP1geNuwYh-_87hs9imNzsAU2-SnBezyFYy0J9xq7Zr2iWM0W1pTp46MmX32OM58JxRFXcu8Pj39aa9V2x2KYarnTPzhzP8K4znieyzt3S_ynIpEO5Ans_xrrcrwnsK9WrdwhJAzmYV6lwfrkog0wL7XXkpI0Y6Ifb0Zuedaeq0fKo8zlH8d1XFRDV_IHTuNF63LSfVvLC0KFVpTb3ThbnxmxQdsq6yVxK37XvD90wkQHzkuA' }} 
                style={styles.productImage} 
              />
            </View>
            <Text style={styles.productTitle}>Hand-thrown Stoneware Bowl</Text>
            <Text style={styles.productSubtitle}>Questions & Answers</Text>
          </View>

          {/* Q&A List */}
          <View style={styles.qaList}>
            {QAS.map((item, index) => (
              <View key={item.id} style={[styles.qaItem, index === QAS.length - 1 && styles.qaItemLast]}>
                
                <View style={styles.qaRow}>
                  <Text style={styles.qIndicator}>Q:</Text>
                  <Text style={styles.questionText}>{item.question}</Text>
                </View>

                <View style={styles.qaRow}>
                  <Text style={styles.aIndicator}>A:</Text>
                  <View style={styles.answerContent}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                    <Text style={styles.answeredByText}>{item.answeredBy}</Text>
                  </View>
                </View>

              </View>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Input Area */}
        <View style={styles.bottomInputContainer}>
          <TextInput 
            style={styles.textInput}
            placeholder="Ask a question about this item..."
            placeholderTextColor={colors['outline-variant']}
          />
          <TouchableOpacity style={styles.askButton}>
            <Text style={styles.askButtonText}>Ask</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(228, 226, 225, 0.5)',
  },
  iconButton: {
    padding: spacing.stackSm,
    marginLeft: -spacing.stackSm,
  },
  brandTitle: {
    ...typography.headlineMd,
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
  productHeader: {
    alignItems: 'center',
    marginBottom: spacing.stackLg,
  },
  productImageContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors['surface-variant'],
    marginBottom: spacing.stackMd,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productTitle: {
    ...typography.headlineMd,
    color: colors.charcoal,
    marginBottom: spacing.stackSm,
    textAlign: 'center',
  },
  productSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
  },
  qaList: {
    marginTop: spacing.stackMd,
  },
  qaItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-variant'],
    paddingBottom: spacing.stackMd,
    marginBottom: spacing.stackMd,
  },
  qaItemLast: {
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  qaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.stackSm,
  },
  qIndicator: {
    ...typography.labelMd,
    color: colors['forest-green'],
    width: 24,
    marginTop: 2,
  },
  questionText: {
    ...typography.bodyMd,
    color: colors['on-surface'],
    fontWeight: '600',
    flex: 1,
  },
  aIndicator: {
    ...typography.labelMd,
    color: colors['clay-outline'],
    width: 24,
    marginTop: 2,
  },
  answerContent: {
    flex: 1,
  },
  answerText: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginBottom: spacing.stackSm,
  },
  answeredByText: {
    ...typography.labelSm,
    color: colors['clay-outline'],
  },
  bottomInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.marginMobile,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors['surface-variant'],
    gap: spacing.stackSm,
  },
  textInput: {
    flex: 1,
    backgroundColor: colors['surface-container-low'],
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
    paddingHorizontal: spacing.stackSm,
    paddingVertical: spacing.stackSm,
    ...typography.bodyMd,
    color: colors['on-surface'],
  },
  askButton: {
    backgroundColor: colors['forest-green'],
    paddingHorizontal: spacing.stackMd,
    paddingVertical: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  askButtonText: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
});

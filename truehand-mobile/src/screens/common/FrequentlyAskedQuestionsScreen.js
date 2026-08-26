import api from '../../services/api';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme/theme';

const FAQ_DATA = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        id: 'q1',
        question: 'How long does custom crafted furniture take to ship?',
        answer: 'Because our artisans create each piece to order, standard lead times range from 4 to 8 weeks. Specialized items requiring rare materials may take longer, which will be noted on the product page.'
      },
      {
        id: 'q2',
        question: 'Do you ship internationally?',
        answer: 'Currently, we ship within North America and select European countries. Shipping costs are calculated at checkout based on the weight and dimensions of the crafted pieces.'
      }
    ]
  },
  {
    category: 'Artisans & Materials',
    questions: [
      {
        id: 'q3',
        question: 'How do you select your artisans?',
        answer: 'We personally visit studios and workshops to ensure our partners align with our values of sustainability, fair labor, and exceptional craftsmanship. Every artisan on TrueHand has a proven dedication to their medium.'
      },
      {
        id: 'q4',
        question: 'Are the materials sustainably sourced?',
        answer: 'Yes. We require all our artisan partners to provide transparency regarding their material sourcing. We prioritize reclaimed woods, natural dyes, and ethically sourced metals.'
      }
    ]
  }
];

const CATEGORIES = ['All Questions', 'Orders & Shipping', 'Artisans & Materials', 'Returns'];

const AccordionItem = ({ item, isOpen, toggleOpen }) => {
  
  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity 
        style={styles.accordionHeader} 
        onPress={toggleOpen}
        activeOpacity={0.7}
      >
        <Text style={[styles.accordionQuestion, isOpen && styles.accordionQuestionActive]}>
          {item.question}
        </Text>
        <Ionicons 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={20} 
          color={isOpen ? colors['forest-green'] : colors.outline} 
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.accordionContent}>
          <Text style={styles.accordionAnswer}>{item.answer}</Text>
        </View>
      )}
    </View>
  );
};

export default function FrequentlyAskedQuestionsScreen() {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('All Questions');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TrueHand</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="bag-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Frequently Asked Questions</Text>
          <Text style={styles.pageSubtitle}>
            Find answers to common questions about our artisans, the curation process, and order details.
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.outline} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search FAQs..."
            placeholderTextColor={colors.outline}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.categoryBtn, activeCategory === cat && styles.categoryBtnActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* FAQ List */}
        <View style={styles.faqList}>
          {FAQ_DATA.map((section, secIdx) => {
            if (activeCategory !== 'All Questions' && section.category !== activeCategory) {
              return null;
            }

            return (
              <View key={secIdx} style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{section.category}</Text>
                
                {section.questions.map(q => (
                  <AccordionItem 
                    key={q.id} 
                    item={q} 
                    isOpen={!!openItems[q.id]}
                    toggleOpen={() => toggleItem(q.id)}
                  />
                ))}
              </View>
            );
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors['surface-linen'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(22, 52, 40, 0.05)',
  },
  iconButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  content: {
    paddingBottom: spacing.sectionGap,
  },
  pageHeader: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    alignItems: 'center',
    marginBottom: spacing.stackLg,
  },
  pageTitle: {
    ...typography.displayLg,
    color: colors['forest-green'],
    textAlign: 'center',
    marginBottom: spacing.stackSm,
  },
  pageSubtitle: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    textAlign: 'center',
  },
  searchContainer: {
    marginHorizontal: spacing.marginMobile,
    marginBottom: spacing.stackLg,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 14,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.5)',
    borderRadius: 24,
    height: 48,
    paddingLeft: 44,
    paddingRight: 16,
    ...typography.bodyMd,
    color: colors['on-surface'],
  },
  categoriesScroll: {
    paddingHorizontal: spacing.marginMobile,
    gap: 8,
    marginBottom: spacing.stackLg,
  },
  categoryBtn: {
    backgroundColor: colors['surface-container-high'],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.3)',
  },
  categoryBtnActive: {
    backgroundColor: colors['forest-green'],
    borderColor: colors['forest-green'],
  },
  categoryText: {
    ...typography.labelMd,
    color: colors['on-surface-variant'],
  },
  categoryTextActive: {
    color: colors['on-primary'],
  },
  faqList: {
    paddingHorizontal: spacing.marginMobile,
  },
  sectionContainer: {
    marginBottom: spacing.stackLg,
  },
  sectionTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 200, 195, 0.5)',
    paddingBottom: 8,
    marginBottom: 8,
  },
  accordionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 200, 195, 0.3)',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  accordionQuestion: {
    ...typography.labelMd,
    color: colors['on-surface'],
    flex: 1,
    paddingRight: 16,
  },
  accordionQuestionActive: {
    color: colors['forest-green'],
  },
  accordionContent: {
    paddingBottom: 16,
    paddingRight: 32,
  },
  accordionAnswer: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
  }
});

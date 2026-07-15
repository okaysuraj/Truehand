import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';;
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme/theme';
import { reviewService } from '../services/reviewService';

const REVIEWS = [
  {
    id: 1,
    name: 'Eleanor Vance',
    date: 'Oct 12, 2023',
    rating: 5,
    product: 'Hand-Thrown Stoneware Vase',
    content: 'The texture on this vase is absolutely incredible. You can feel the maker\'s hand in every groove. It completely transforms my entryway console. The packaging was also incredibly thoughtful and secure, arriving in perfect condition. It\'s rare to find such authentic craftsmanship these days.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKtPbF4EHon2ujHez81FQ6xsS_-FdrjBBcQkAyVYj2XJU7KpDmgU3QGyHRgkfrTzrkYF77J4NV_2tN7ihIRC4xcs2I7T1wwduRiavvEyNHO9unkX7CL-_wQ3u_4ePN9uiv1J6nb7r6ok0ET9YbmZ40f1G1M_i7Q-iCoes9GhfRkkj03BqoF9bVUNZau3CEH3sNH5jL92ElcvnmfqHJMnPEyzt5KZ3ufa-S8zywrhsqZTLyl8zrS8yIWQ',
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    date: 'Sep 28, 2023',
    rating: 4.5,
    product: 'Sculptural Ash Wood Chair',
    content: 'A true work of art that happens to be functional. The joinery is flawless, and the smooth finish of the ash wood is a delight to touch. It sits perfectly in my reading nook. Slightly firmer sit than I expected, but it encourages good posture and feels incredibly sturdy. A heritage piece for sure.',
    artisanResponse: 'Thank you, Marcus. I specifically chose ash for its resilience and designed the seating angle to support active engagement while reading. I\'m thrilled it has found a perfect spot in your home.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBquTjDejwEdBqHVW7uzL1sMXipe2CdwytZ7J1woQRaddkFxtFDIljHzUCn2_U6G89UCQ-gucAouRWq1l-ebtK95K9tHSR4pUqJ2Se1jAtaO5GciYs3xa2lA5H_py0yHqlwTPluW8glEnGOF2ByB-M_1iFD16ViYE4QS6sSFYbl8RFA-nrj3w8Wf0Nx2JsVHWgEEt6Zu1ozToPZZdyovzX3Myw02A_P5BvdrUA7JwPU0jAIlwUCs73r2A',
  }
];

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Ionicons key={i} name="star" size={18} color={colors.terracotta} />);
    } else if (i - 0.5 === rating) {
      stars.push(<Ionicons key={i} name="star-half" size={18} color={colors.terracotta} />);
    } else {
      stars.push(<Ionicons key={i} name="star-outline" size={18} color={colors.terracotta} />);
    }
  }
  return <View style={{ flexDirection: 'row', gap: 2 }}>{stars}</View>;
};

export default function RatingsReviewsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params || {};

  const [reviews, setReviews] = React.useState(REVIEWS);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (productId) {
      setLoading(true);
      reviewService.getReviewsByProduct(productId)
        .then(data => {
          if (data && data.length > 0) {
            setReviews(data);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [productId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>TrueHand</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="bag-handle-outline" size={24} color={colors['forest-green']} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Collector Reviews</Text>
          <Text style={styles.pageSubtitle}>Stories and experiences from those who have brought our craft into their homes.</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.overallRating}>
            <Text style={styles.ratingNumber}>4.9</Text>
            {renderStars(4.9)}
            <Text style={styles.ratingCount}>FROM {reviews.length} COLLECTORS</Text>
          </View>
          
          <View style={styles.chartContainer}>
            {[
              { stars: 5, pct: '85%', count: 105 },
              { stars: 4, pct: '10%', count: 12 },
              { stars: 3, pct: '3%', count: 4 },
              { stars: 2, pct: '1%', count: 2 },
              { stars: 1, pct: '1%', count: 1 },
            ].map((row) => (
              <View key={row.stars} style={styles.chartRow}>
                <Text style={styles.chartLabel}>{row.stars} Stars</Text>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { width: row.pct }]} />
                </View>
                <Text style={styles.chartCount}>{row.count}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <TouchableOpacity style={[styles.filterBtn, styles.filterBtnActive]}>
            <Text style={[styles.filterBtnText, styles.filterBtnTextActive]}>All Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterBtnText}>With Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterBtnText}>Recent</Text>
          </TouchableOpacity>
        </View>

        {/* Review List */}
        <View style={styles.reviewsList}>
          {reviews.length === 0 && !loading && (
             <Text style={{ textAlign: 'center', color: colors.outline, marginTop: 20 }}>No reviews yet.</Text>
          )}
          {reviews.map((review, idx) => (
            <View key={review.id}>
              <View style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <View>
                    <Text style={styles.reviewerName}>{review.reviewerName || review.name || 'Anonymous'}</Text>
                    <Text style={styles.reviewMeta}>Verified Collector • {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : review.date}</Text>
                  </View>
                  {renderStars(review.rating)}
                </View>

                <Text style={styles.purchasedItem}>PURCHASED: {review.product || 'Artisan Goods'}</Text>
                <Text style={styles.reviewContent}>{review.comment || review.content}</Text>

                {review.artisanResponse && (
                  <View style={styles.artisanResponseContainer}>
                    <View style={styles.artisanResponseHeader}>
                      <Ionicons name="construct" size={14} color={colors.terracotta} />
                      <Text style={styles.artisanResponseTitle}>ARTISAN RESPONSE</Text>
                    </View>
                    <Text style={styles.artisanResponseText}>{review.artisanResponse}</Text>
                  </View>
                )}

                <TouchableOpacity style={styles.replyButton}>
                  <Ionicons name="return-down-forward" size={16} color={colors['forest-green']} />
                  <Text style={styles.replyButtonText}>REPLY</Text>
                </TouchableOpacity>

                {review.image && (
                  <View style={styles.reviewImageContainer}>
                    <Image source={{ uri: review.image }} style={styles.reviewImage} />
                  </View>
                )}
              </View>
              {idx < reviews.length - 1 && <View style={styles.reviewDivider} />}
            </View>
          ))}
        </View>

        {/* Pagination */}
        <View style={styles.pagination}>
          <TouchableOpacity style={[styles.pageBtn, styles.pageBtnDisabled]} disabled>
            <Ionicons name="chevron-back" size={20} color={colors.charcoal} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.pageBtn, styles.pageBtnActive]}>
            <Text style={styles.pageBtnTextActive}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pageBtn}>
            <Text style={styles.pageBtnText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pageBtn}>
            <Text style={styles.pageBtnText}>3</Text>
          </TouchableOpacity>
          <Text style={styles.pageEllipsis}>...</Text>
          <TouchableOpacity style={styles.pageBtn}>
            <Text style={styles.pageBtnText}>12</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pageBtn}>
            <Ionicons name="chevron-forward" size={20} color={colors.charcoal} />
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    height: 64,
    backgroundColor: 'rgba(252, 249, 248, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(228, 226, 225, 0.5)',
  },
  iconButton: {
    padding: spacing.stackSm,
  },
  brandTitle: {
    ...typography.headlineMd,
    color: colors['forest-green'],
  },
  content: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.stackLg,
    paddingBottom: spacing.sectionGap,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: spacing.stackLg * 1.5,
  },
  pageTitle: {
    ...typography.displayLg,
    color: colors['forest-green'],
    fontSize: 40,
    marginBottom: spacing.stackSm,
    textAlign: 'center',
  },
  pageSubtitle: {
    ...typography.bodyLg,
    color: colors['on-surface-variant'],
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginBottom: spacing.sectionGap,
  },
  overallRating: {
    alignItems: 'center',
    marginBottom: spacing.stackLg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 200, 195, 0.3)',
    paddingBottom: spacing.stackLg,
  },
  ratingNumber: {
    ...typography.displayLg,
    fontSize: 64,
    color: colors['forest-green'],
    marginBottom: spacing.stackSm,
  },
  ratingCount: {
    ...typography.labelMd,
    color: colors['on-surface-variant'],
    marginTop: spacing.stackMd,
    letterSpacing: 1,
  },
  chartContainer: {
    paddingHorizontal: spacing.stackSm,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartLabel: {
    ...typography.labelMd,
    color: colors['on-surface-variant'],
    width: 60,
  },
  barBackground: {
    flex: 1,
    height: 6,
    backgroundColor: colors['surface-container-high'],
    borderRadius: 3,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors['forest-green'],
    borderRadius: 3,
  },
  chartCount: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    width: 30,
    textAlign: 'right',
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.stackSm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(193, 200, 195, 0.3)',
    paddingBottom: spacing.stackMd,
    marginBottom: spacing.stackLg,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.5)',
    backgroundColor: colors['surface-container-low'],
  },
  filterBtnActive: {
    backgroundColor: colors['forest-green'],
    borderColor: colors['forest-green'],
  },
  filterBtnText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  filterBtnTextActive: {
    color: colors['on-primary'],
  },
  reviewsList: {
    gap: spacing.stackLg,
  },
  reviewItem: {
    marginBottom: spacing.stackMd,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.stackMd,
  },
  reviewerName: {
    ...typography.headlineMd,
    color: colors['forest-green'],
    fontSize: 20,
  },
  reviewMeta: {
    ...typography.labelSm,
    color: colors['on-surface-variant'],
    marginTop: 4,
  },
  purchasedItem: {
    ...typography.labelMd,
    color: colors.charcoal,
    letterSpacing: 1,
    marginBottom: spacing.stackSm,
  },
  reviewContent: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginBottom: spacing.stackMd,
    lineHeight: 24,
  },
  artisanResponseContainer: {
    backgroundColor: colors['surface-container-low'],
    padding: spacing.stackMd,
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(151, 71, 42, 0.3)', // terracotta with opacity
    borderRadius: 4,
    marginBottom: spacing.stackMd,
  },
  artisanResponseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  artisanResponseTitle: {
    ...typography.labelSm,
    color: colors.terracotta,
    letterSpacing: 1,
  },
  artisanResponseText: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    fontSize: 14,
    fontStyle: 'italic',
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.stackLg,
  },
  replyButtonText: {
    ...typography.labelMd,
    color: colors['forest-green'],
    letterSpacing: 1,
  },
  reviewImageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    overflow: 'hidden',
  },
  reviewImage: {
    width: '100%',
    height: '100%',
  },
  reviewDivider: {
    height: 1,
    backgroundColor: 'rgba(193, 200, 195, 0.3)',
    marginVertical: spacing.stackLg,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: spacing.sectionGap,
  },
  pageBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(193, 200, 195, 0.5)',
  },
  pageBtnActive: {
    backgroundColor: colors['forest-green'],
    borderColor: colors['forest-green'],
  },
  pageBtnDisabled: {
    opacity: 0.3,
  },
  pageBtnText: {
    ...typography.labelMd,
    color: colors.charcoal,
  },
  pageBtnTextActive: {
    ...typography.labelMd,
    color: colors['on-primary'],
  },
  pageEllipsis: {
    ...typography.bodyMd,
    color: colors['on-surface-variant'],
    marginHorizontal: 8,
  }
});

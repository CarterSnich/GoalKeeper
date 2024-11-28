import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import Book from "@/models/book";
import { Image } from "expo-image";
import * as IntentLauncher from "expo-intent-launcher";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";

import Text from "@/components/text";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

function BookPage() {
  const theme = useThemeColor();
  const { url } = useLocalSearchParams();

  const [book, setBook] = useState<Book>();
  const [isChaptersCollapsed, setIsChaptersCollapsed] = useState(true);
  const [loadingOverlayShown, setLoadingOverlayShown] = useState(true);

  // for the animating the loading overlay
  const opacity = useSharedValue(1.0);
  const opacityTimingConfig = {
    duration: 150,
    easing: Easing.linear,
  };

  // for the animating the book title
  const fontSize = useSharedValue(24);
  const fontSizetimingConfig = {
    duration: 300,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  };

  useEffect(() => {
    if (!book) {
      async function prep() {
        try {
          const res = await fetch(
            `https://unofficial-goalkicker-api.vercel.app/book-page?url=${url}`
          );
          const data = await res.json();
          setBook(data);
        } catch (error) {
          router.back();
          ToastAndroid.show(
            `Failed to fetch book from ${url}.`,
            ToastAndroid.LONG
          );
        }
      }
      prep();
    }

    if (book) {
      opacity.value = withTiming(0.0, opacityTimingConfig, () => {
        runOnJS(setLoadingOverlayShown)(false);
      });
    }
  }, [book]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY >= 400) {
      fontSize.value = withTiming(16, fontSizetimingConfig);
      opacity.value = withTiming(0.2, fontSizetimingConfig);
    } else {
      fontSize.value = withTiming(24, fontSizetimingConfig);
      opacity.value = withTiming(1, fontSizetimingConfig);
    }
  };

  const readPdf = async () => {
    try {
      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: book?.download_url,
        type: "application/pdf",
      });
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Could not open the book.", ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.screen}>
      {/* ScrollView */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
        stickyHeaderIndices={[1]}
        onScroll={handleScroll}
      >
        {/* Book cover */}
        <View style={styles.bookCover}>
          <Image
            style={styles.bookCoverImage}
            source={book?.cover_url}
            contentFit="fill"
          />
          <LinearGradient
            colors={["transparent", theme.background]}
            style={styles.bookCoverGradient}
          />
        </View>

        {/* Book title */}
        <View style={styles.bookTitle}>
          <Animated.Text
            style={[
              styles.bookTitleText,
              {
                fontSize,
                color: theme.text,
                backgroundColor: theme.background,
              },
            ]}
          >
            {book?.title}
          </Animated.Text>
          <LinearGradient
            start={{ x: 0.5, y: 0 }}
            colors={[theme.background, "transparent"]}
            style={styles.bookTitleGradient}
          />
        </View>

        {/* Book summary */}
        <View style={styles.bookSummary}>
          {/* Chapters */}
          <View
            style={[
              styles.chapters,
              !isChaptersCollapsed && { maxHeight: "auto" },
            ]}
          >
            {/* Chapter text */}
            <Text style={styles.chapterText}>Chapters</Text>
            {/* Chapters */}

            <View>
              {book?.contents.chapters.map((text, index) => (
                <ChapterItem key={index} i={index} t={text} />
              ))}
              {/* Appendices */}
              {book?.contents.appendices.map((text, index) => (
                <ChapterItem key={index} i={index} t={text} />
              ))}
            </View>

            {/* View More/Less button */}
            <View
              style={[
                styles.moreLess,
                { position: isChaptersCollapsed ? "absolute" : "relative" },
              ]}
            >
              {/* Gradient */}
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.4 }}
                colors={["transparent", theme.background]}
                style={styles.moreLessGradient}
              />
              {/* More/Less button  */}
              <TouchableOpacity
                onPress={() => setIsChaptersCollapsed(!isChaptersCollapsed)}
                style={styles.moreLessButton}
              >
                <Text style={styles.moreLessText}>
                  {isChaptersCollapsed ? "More" : "Less"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Example pages */}
          <View style={styles.examplePages}>
            {/* Example pages text */}
            <Text style={styles.examplePagesText}>Example pages</Text>

            {/* Page preview images */}
            {book?.page_previews.map((url, i) => (
              <Image key={i} source={url} style={styles.examplePagesImage} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Read button */}
      <TouchableOpacity
        style={[
          styles.readButton,
          { backgroundColor: theme.text, borderColor: theme.border },
        ]}
        onPress={readPdf}
      >
        <Text style={[styles.readButtonText, { color: theme.background }]}>
          Read
        </Text>
      </TouchableOpacity>

      {/* Loading screen overlay */}
      {loadingOverlayShown && (
        <Animated.View
          style={[
            styles.loadingOverlay,
            {
              opacity,
              backgroundColor: theme.background,
            },
          ]}
        >
          <ActivityIndicator
            size={64}
            color={Colors[300]}
            style={styles.loadingOverlayIndicator}
          />
        </Animated.View>
      )}
    </View>
  );
}

const ChapterItem: React.FC<{ i: number; t: string }> = ({ i, t }) => {
  const theme = useThemeColor();

  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ color: theme.text }}>{`Chapter ${i + 1}: `}</Text>
      <Text style={{ color: theme.text, flex: 1 }}>{t}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },

  scrollView: { flexGrow: 1 },
  scrollViewContainer: { gap: 16 },

  bookCover: {
    maxHeight: 400,
    overflow: "hidden",
  },
  bookCoverImage: {
    aspectRatio: 5 / 7,
    flexGrow: 1,
  },
  bookCoverGradient: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },

  bookTitle: { flexDirection: "column" },
  bookTitleText: {
    flex: 1,
    fontWeight: "600",
    textAlignVertical: "center",
    padding: 16,
  },
  bookTitleGradient: {
    height: 8,
    width: "100%",
  },

  bookSummary: {
    paddingHorizontal: 16,
    gap: 16,
  },
  chapters: {
    maxHeight: 300,
    overflow: "hidden",
    gap: 8,
    paddingBottom: 4,
  },
  chapterText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  moreLess: {
    bottom: -2,
    height: 64,
    width: "100%",
  },
  moreLessGradient: {
    position: "absolute",
    bottom: 0,
    height: "100%",
    width: "100%",
  },
  moreLessButton: {
    position: "absolute",
    bottom: 16,
    width: "100%",
  },
  moreLessText: {
    textAlign: "center",
    padding: 8,
  },

  examplePages: {
    gap: 8,
  },
  examplePagesText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  examplePagesImage: { aspectRatio: 5 / 7 },

  readButton: {
    margin: 16,
    borderRadius: 8,
    padding: 8,
  },
  readButtonText: {
    textAlign: "center",
    fontSize: 20,
  },

  loadingOverlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  loadingOverlayIndicator: {
    margin: 16,
  },
});
export default BookPage;

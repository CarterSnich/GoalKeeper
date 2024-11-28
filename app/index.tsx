import BookEntry from "@/models/book-entries";

import Text from "@/components/text";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function Index() {
  const theme = useThemeColor();
  const [bookEntries, setBookEntries] = useState<BookEntry[]>([]);
  const [searchKey, setSearchKey] = useState("");
  const [isRefreshing, _setIsRefreshing] = useState(false);

  async function getBookEntries() {
    const res = await fetch(
      "https://unofficial-goalkicker-api.vercel.app/book-entries"
    );
    const data = await res.json();
    setBookEntries(data);
  }

  useEffect(() => {
    (async () => {
      await getBookEntries();
    })();
  }, []);

  const onRefresh = async () => getBookEntries();

  return (
    <View style={styles.screen}>
      {/* header */}
      <View style={styles.header}>
        {/* search bar */}
        <View style={styles.searchBar}>
          <TextInput
            style={[styles.searchBarInput, { color: theme.text }]}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="Search..."
            selectionColor={Colors[100]}
            placeholderTextColor={Colors[500]}
          />
          <TouchableOpacity
            style={[
              styles.searchBarClear,
              !searchKey.length && { display: "none" },
            ]}
            onPress={() => setSearchKey("")}
          >
            <FontAwesome5 name="times" size={24} color={Colors[500]} />
          </TouchableOpacity>
        </View>

        {/* about button */}
        <TouchableOpacity
          style={styles.aboutButton}
          onPress={() => router.push("/about")}
        >
          <FontAwesome5 name="info-circle" size={24} color={Colors[500]} />
        </TouchableOpacity>
      </View>

      {/* Flatlist */}
      <FlatList
        style={styles.flatList}
        data={bookEntries.filter((b) =>
          b.title.toLowerCase().includes(searchKey.toLowerCase())
        )}
        numColumns={2}
        fadingEdgeLength={32}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={styles.flatListColumnWrapper}
        renderItem={Item}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <ActivityIndicator
            size={36}
            color={Colors[300]}
            style={{ margin: 16 }}
          />
        }
      />
    </View>
  );
}

const Item: ListRenderItem<BookEntry> = ({ item }) => {
  return (
    <Link
      href={{ pathname: "/book-page", params: { url: item.page_url } }}
      push
      asChild
    >
      <TouchableOpacity style={itemStyle.card}>
        <Image
          style={itemStyle.coverImage}
          source={item.cover_url}
          contentFit="cover"
        />
        <View style={itemStyle.textWrapper}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.4 }}
            colors={[
              "transparent",
              `${Colors[950]}66`,
              `${Colors[950]}99`,
              `${Colors[950]}CC`,
            ]}
            style={itemStyle.gradient}
          />
          <Text
            style={[itemStyle.text, { color: Colors[50] }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  header: {
    marginHorizontal: 16,
    marginVertical: 8,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors[500],
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "stretch",
    alignContent: "stretch",
  },
  searchBarInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  searchBarClear: {
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  aboutButton: {
    aspectRatio: 1,
    padding: 8,
  },

  flatList: { flexGrow: 1 },
  flatListContainer: {
    gap: 16,
    padding: 16,
  },
  flatListColumnWrapper: {
    justifyContent: "space-between",
  },
});

const itemStyle = StyleSheet.create({
  card: {
    width: "48%",
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors[200],
    overflow: "hidden",
  },
  coverImage: {
    aspectRatio: 5 / 7,
  },
  textWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  gradient: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
  },
  text: {
    textAlign: "center",
    padding: 8,
    paddingVertical: 12,
    fontSize: 16,
  },
});

export default Index;

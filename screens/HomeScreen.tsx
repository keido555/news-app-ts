import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";

import { ListItem } from "../components/ListItem";
import { Loading } from "../components/Loading";
import { RootStackParamList } from "../types/navigation";
import manifest from "../app.json";

import { StackNavigationProp } from "@react-navigation/stack";

const URL = `https://newsapi.org/v2/top-headlines?country=js&category=business&apiKey=${Constants.manifest?.extra.newsApiKey}`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
  // route: RouteProp<RootStackParamList, "Home">;
};

export const HomeScreen = ({ navigation }: Props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const pageRef = useRef(1);
  const fetchedAllRef = useRef(false);

  useEffect(() => {
    setLoading(false);
    fetchArticles(1);
    setLoading(false);
  }, []);

  const fetchArticles = async (page: any) => {
    try {
      const response = await axios.get(`${URL}&page=${page}`);
      if (response.data.articles.length > 0) {
        setArticles((prevArticles): any => [
          ...prevArticles,
          ...response.data.articles,
        ]);
      } else {
        fetchedAllRef.current = true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onEndReached = () => {
    if (!fetchedAllRef.current) {
      pageRef.current = pageRef.current + 1;
      fetchArticles(pageRef.current);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setArticles([]);
    pageRef.current = 1;
    fetchedAllRef.current = false;
    await fetchArticles(1);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }: any) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() => navigation.navigate("Article", { article: item })}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onEndReached}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {loading && <Loading />}
    </SafeAreaView>
  );
};

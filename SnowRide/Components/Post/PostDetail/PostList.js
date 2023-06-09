import { View, Text, FlatList } from "react-native";
import React from "react";
import PostItem from "./PostItem";

// post form
export default function PostList({ posts, showCategory }) {
  // console.log(posts);
  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem post={item} showCategory={showCategory} />
        )}
      />
    </View>
  );
}

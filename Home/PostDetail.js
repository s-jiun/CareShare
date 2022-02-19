import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    DeviceEventEmitter,
    Alert,
    Platform,
} from "react-native";
import { theme } from "../colors";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
export default function PostDetail({ route, navigation }) {
    const date = new Date().getTime();
    const user = auth.currentUser;
    console.log(user);
    const firestore = getFirestore();
    const [content, setContent] = useState({});
    const id = route.params.key;

    useEffect(() => {
        loadPost();
        DeviceEventEmitter.addListener("toDetail", () => {
            loadPost();
        });
        return () => {
            console.log("unmount detail");
            DeviceEventEmitter.emit("toHome");
        };
    }, []);

    const loadPost = async () => {
        try {
            console.log(user.uid);
            const docRef = doc(firestore, "posts", id);
            const postRef = await getDoc(docRef);
            const post = postRef.data();
            setContent(post);
            console.log(post);
        } catch (error) {
            console.log(error.message);
        }
    };

    const updatePost = () => {
        navigation.navigate("PostForm", { key: id });
    };

    const deletePost = async () => {
        if (Platform.OS === "web") {
            const ok = confirm("Are you sure you want to delete this post?");
            if (ok) {
                await deleteDoc(doc(firestore, "posts", id)).then(() => {
                    navigation.navigate("Home");
                });
            }
        } else {
            Alert.alert("Deleting the Post", "Are you sure?", [
                { text: "Cancel" },
                {
                    text: "I'm sure",
                    style: "destructive",
                    onPress: async () => {
                        await deleteDoc(doc(firestore, "posts", id)).then(
                            () => {
                                navigation.navigate("Home");
                            }
                        );
                    },
                },
            ]);
        }
    };
    return (
        <View style={styles.post}>
            <Image source={{ uri: content.image }} style={styles.postImg} />
            <View style={styles.postContent}>
                <Text style={styles.postTitle}>{content.title}</Text>
                <View style={styles.postInfo}>
                    <Text style={styles.postInfoText}>{content.address}</Text>
                    <Text style={styles.postInfoText}>
                        {" "}
                        ·{" "}
                        {Math.floor(
                            (date - content.createdAt) / (1000 * 60 * 60 * 24)
                        )}
                        일 전
                    </Text>
                </View>
                <Text style={styles.postType}>{content.type}</Text>
                <Text style={styles.postType}>{content.content}</Text>
                <View style={styles.postLastInfo}>
                    <Text style={styles.postPrice}>{content.price} 원</Text>
                    <Image
                        source={require("../assets/ios-heart-empty.svg")}
                        style={styles.postHeart}
                    />
                </View>
                {user.uid == content.writerID ? (
                    <>
                        <TouchableOpacity onPress={() => updatePost(id)}>
                            <Text>수정</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deletePost(id)}>
                            <Text>삭제</Text>
                        </TouchableOpacity>
                    </>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        flexDirection: "row",
        paddingHorizontal: 25,
        paddingTop: 25,
        marginTop: 30,
    },
    postContent: {
        paddingLeft: 20,
    },
    postImg: {
        width: 120,
        height: 120,
    },
    postTitle: {
        fontSize: 20,
        color: theme.textDark,
    },
    postInfo: {
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 17,
    },
    postInfoText: {
        fontSize: 15,
        color: theme.textLight,
    },
    postType: {
        fontSize: 15,
        color: theme.textDark,
        borderRadius: 15,
        backgroundColor: "#EEEEEE",
        paddingVertical: 3,
        paddingHorizontal: 11,
        alignSelf: "flex-start",
    },
    postLastInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    postPrice: {
        fontSize: 18,
        color: theme.textDark,
        fontWeight: "700",
        paddingTop: 6,
    },
    postHeart: {
        width: 20,
        height: 18,
    },
});

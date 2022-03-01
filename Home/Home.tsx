import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    DeviceEventEmitter,
} from "react-native";
import { Button } from "react-native-elements";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { theme } from "../colors";
import React, { useEffect, useState } from "react";
import HomeIcon from "../assets/ios-home.svg";
import Info from "../assets/ios-information-circle-outline.svg";
import Cart from "../assets/ios-cart.svg";
import Chat from "../assets/ios-chatbubbles.svg";
import Profile from "../assets/md-person.svg";
import { Ionicons } from "@expo/vector-icons";
import Post from "./components/Post";
import Arrow from "../assets/ios-arrow-down.svg";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const NewPost = ({ text, navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("PostForm", { text })}
        >
            <Text style={styles.newPostText}>{text}</Text>
        </TouchableOpacity>
    );
};

const Home = ({ navigation }) => {
    const firestore = getFirestore();
    const [posts, setPosts] = useState([]);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        loadPosts();
        DeviceEventEmitter.addListener("toHome", () => {
            loadPosts();
        });
        return () => {
            DeviceEventEmitter.emit("toDetail");
        };
    }, []);

    const buttonPressed = () => {
        setClicked((current) => !current);
    };

    const loadPosts = async () => {
        try {
            const postDoc = await getDocs(collection(firestore, "posts"));
            const postsFetched = [];
            postDoc.forEach((doc) => {
                const data = doc.data();
                postsFetched.push({ ...data, key: doc.id });
            });
            setPosts(postsFetched);
            console.log(postsFetched);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerFilter}>
                    <Arrow style={styles.headerFilterIcon} />
                    <Text style={styles.headerFilterText}>전체</Text>
                </TouchableOpacity>
                <Button title="Sign Out" onPress={() => auth.signOut()} />
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <Ionicons
                            name="ios-menu"
                            size={24}
                            color={theme.iconGray}
                            style={{ paddingRight: 10 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons
                            name="ios-search"
                            size={24}
                            color={theme.iconGray}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {posts
                    ? posts.map((post) => (
                          <Post
                              key={post.key}
                              id={post.key}
                              title={post.title}
                              address={post.address}
                              type={post.type}
                              price={post.price}
                              image={post.image}
                              navigation={navigation}
                              date={post.createdAt}
                          />
                      ))
                    : null}
            </ScrollView>

            <View style={styles.newPostContainer}>
                {clicked ? (
                    <View style={styles.newPostTexts}>
                        <NewPost text="빌려드려요" navigation={navigation} />
                        <NewPost text="빌려요" navigation={navigation} />
                        <NewPost text="나눔해요" navigation={navigation} />
                        <NewPost text="판매해요" navigation={navigation} />
                    </View>
                ) : null}
                <TouchableOpacity
                    style={styles.newPostButton}
                    onPress={() => {
                        buttonPressed();
                    }}
                >
                    <Ionicons
                        name="ios-add-circle"
                        size={50}
                        color={theme.yellow}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    borderTopColor: "#F5F5F5",
                    borderTopWidth: 1,
                }}
            >
                <TouchableOpacity style={styles.navigationItem}>
                    <HomeIcon
                        style={{
                            ...styles.navigationIcon,
                            marginTop: 12,
                            marginBottom: 12,
                            width: 13,
                            height: 8,
                        }}
                    />
                    <Text style={{ color: theme.iconGray }}>홈</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navigationItem}>
                    <Info style={styles.navigationIcon} />
                    <Text style={{ color: theme.iconGray }}>정보</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navigationItem}>
                    <Cart style={styles.navigationIcon} />
                    <Text style={{ color: theme.iconGray }}>쇼핑</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navigationItem}>
                    <Chat style={styles.navigationIcon} />
                    <Text style={{ color: theme.iconGray }}>채팅</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navigationItem}>
                    <Profile
                        style={{
                            ...styles.navigationIcon,
                            marginTop: 15,
                            marginBottom: 8,
                        }}
                    />
                    <Text style={{ color: theme.iconGray }}>마이페이지</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 23,
        paddingVertical: 20,
        borderBottomColor: "#F5F5F5",
        borderBottomWidth: 1,
        marginTop: 30,
        // zIndex: 10,
        // position: "absolute",
    },
    headerFilter: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerFilterText: {
        fontWeight: "700",
        fontSize: 18,
        paddingLeft: 10,
        color: theme.textDark,
    },
    headerIcons: {
        flexDirection: "row",
    },
    headerFilterIcon: {
        width: 13,
        height: 8,
        marginBottom: 3,
    },
    newPostContainer: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    newPostTexts: {
        position: "absolute",
        zIndex: 1,
        backgroundColor: "gray",
        paddingHorizontal: 17,
        paddingTop: 8,
        paddingBottom: 13,
        borderRadius: 10,
        // marginBottom: 600,
        marginRight: 15,
    },
    newPostText: {
        fontWeight: "600",
        paddingTop: 6,
        fontSize: 18,
        color: theme.textDark,
    },
    newPostButton: {
        position: "absolute",
        zIndex: 1,
        marginRight: 12,
        // paddingBottom: 200,
    },

    navigationItem: {
        alignItems: "center",
        width: 57,
    },
    navigationIcon: {
        marginTop: 10,
        marginBottom: 7,
    },
});

export default Home;

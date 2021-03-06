import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { theme } from "../../colors";
import { elapsedTime } from "../functions";
import React from "react";
import Heart from "../../assets/ios-heart-empty.svg";
export default function Post({
    id,
    title,
    address,
    type,
    price,
    pref_loan,
    image,
    navigation,
    date
}) {
    return (
        <View style={styles.post} key={id}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("PostDetail", { key: id, navigation })
                }
            >
                <Image source={{ uri: image }} style={styles.postImg} />
            </TouchableOpacity>
            <View style={styles.postContent}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("PostDetail", { key: id })
                    }
                >
                    <Text style={styles.postTitle}>{title}</Text>
                </TouchableOpacity>
                <View style={styles.postInfo}>
                    <Text style={styles.postInfoText}>{address}</Text>
                    <Text style={styles.postInfoText}>
                        {" "}
                        · {elapsedTime(date)}일 전
                    </Text>
                </View>
                <Text style={styles.postType}>{type}</Text>
                <View style={styles.postLastInfo}>
                    {type == "판매해요" ? (
                        <Text style={styles.postPrice}>{price}원</Text>
                    ) : null}
                    {type == "나눔해요" ? (
                        <Text style={styles.postPrice}>0 원</Text>
                    ) : null}
                    {type == "빌려요" || type == "빌려드려요" ? (
                        <Text style={styles.postPrice}>{pref_loan}원</Text>
                    ) : null}
                    <TouchableOpacity>
                        <Heart style={styles.postHeart} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        flexDirection: "row",
        paddingHorizontal: 25,
        paddingTop: 25
    },
    postContent: {
        flex: 1,
        paddingLeft: 20
    },
    postImg: {
        width: 120,
        height: 120
    },
    postTitle: {
        fontSize: 20,
        color: theme.textDark
    },
    postInfo: {
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 17
    },
    postInfoText: {
        fontSize: 15,
        color: theme.textLight
    },
    postType: {
        fontSize: 15,
        color: theme.textDark,
        borderRadius: 10,
        backgroundColor: "#EEEEEE",
        paddingVertical: 3,
        paddingHorizontal: 11,
        alignSelf: "flex-start",
        overflow: "hidden"
    },
    postLastInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    postPrice: {
        fontSize: 18,
        color: theme.textDark,
        fontWeight: "700",
        paddingTop: 6
    },
    postHeart: {
        width: 20,
        height: 18
    }
});

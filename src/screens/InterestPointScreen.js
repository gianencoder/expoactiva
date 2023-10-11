import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Map from "../components/Map.js";
import { useNavigation } from "@react-navigation/native";
import { HeaderComponent } from "../components/HeaderComponent";

export const InterestPointScreen = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const showModal = () => {
    navigation.goBack();
    // setVisible((prevState) => !prevState);
  };

  //   const handleBackButton = () => {
  //     if (visible) {
  //       showModal();
  //       return true;
  //     }
  //     return false;
  //   };

  useEffect(() => {
    setVisible(true);

    // BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    // return () => {
    //   BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    // };
  }, []);

  return (
    showModal,
    (
      <Modal
        visible={visible}
        transparent={true}
        animationType="none"
        onRequestClose={showModal}
      >
        <View style={{ justifyContent: "flex-end" }}>
          <HeaderComponent />
          <TouchableOpacity
            onPress={showModal}
            style={{
              position: "absolute",
              zIndex: 1,
              height: height / 15,
              justifyContent: "center",
              width: "10%",
              marginLeft: 5,
            }}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 50 }}
          >
            <Image
              style={{
                width: width / 16,
                height: height / 30,
                tintColor: "white",
              }}
              source={require("../assets/icons/leftarrow.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.page}>
          <Map />
        </View>
      </Modal>
    )
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});

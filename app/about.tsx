import Text from "@/components/text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { nativeBuildVersion } from "expo-application";
import { router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

function About() {
  const theme = useThemeColor();

  return (
    <View style={[styles.screen, { backgroundColor: `${theme.background}cc` }]}>
      {/* Modal */}
      <View style={[styles.modal, { backgroundColor: theme.background }]}>
        {/* Content */}
        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconWrapper}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          {/* App name */}
          <Text style={styles.appName}>GoalKeeper {nativeBuildVersion}</Text>
          {/* Developer */}
          <Text>by CarterSnich</Text>
          {/* Disclaimer */}
          <Text style={styles.disclaimer}>
            This app is not affiliated with or owned by GoalKicker. All credit
            and recognition for the content belong to their respective creators
            and contributors. Please ensure proper acknowledgment is given where
            due, in accordance with their terms and attributions.
          </Text>
        </View>

        {/* Close button */}
        <TouchableOpacity style={styles.closeButton} onPress={router.back}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: 300,
    borderRadius: 16,
    padding: 16,
    elevation: 16,
    gap: 16,
  },

  content: {
    alignItems: "center",
    justifyContent: "center",
  },

  iconWrapper: { marginBottom: 16 },
  icon: { height: 64, width: 64 },

  appName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  disclaimer: { fontSize: 12, textAlign: "center", marginTop: 16 },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    textAlign: "center",
  },
});

export default About;

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Import the image
const homeImage = require('C:\Users\jayas\OneDrive\Desktop\y1s2\sc2006_project\react\my-app\assets\images\home.jpg'); // Adjust path if needed

const HomePage2 = () => {
  return (
    <View style={styles.container}>
      {/* Top Section: Site Name  with Background*/}
      <View style={styles.siteNameContainer}>
        <Text style={styles.siteName}>KickStart</Text>
      </View>

      {/* Image Section */}
      <Image source={homeImage} style={styles.homeImage} />

      {/* Left Section: Paragraph and Start Button */}
      <View style={styles.textSection}>
        <Text style={styles.findText}>Find the perfect</Text>
        <Text style={styles.homeText}>HOME 🏠</Text>
        <Text style={styles.descriptionText}>
          Let us guide you to the ideal school for your children, ensuring they receive a strong educational foundation 🎓.
          We also source homes that prioritize convenience, comfort, and affordability 🏡, helping your family thrive in a nurturing environment 🌟.
        </Text>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Now 🚀</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
    height: '100%',
  },
  siteNameContainer: {
    width: '100%',
    backgroundColor: '#457b9d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  siteName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1d3557',
    marginBottom: 20,
    textAlign: 'left',
  },
  homeImage: {
    width: '80%', // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: 'cover', // Cover the available space proportionally
    marginVertical: 20, // Space around the image
  },
  textSection: {
    width: '80%',
    alignItems: 'center',
  },
  findText: {
    fontSize: 28,
    color: '#333',
  },
  homeText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#1d3557',
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  startButton: {
    marginTop: 20,
    backgroundColor: '#457b9d',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage2;

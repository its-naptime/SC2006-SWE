import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const HomePage = () => {
  return (
    <View style={styles.container}>
      {/* Top Section: Site Name  with Background*/}
      <View style={styles.siteNameContainer}>
        <Text style={styles.siteName}>KickStart</Text>
      </View>
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
    flexDirection: 'column',  // Change to column for proper stacking
    justifyContent: 'center',
    alignItems: 'center',  // Center the text and button horizontally
    padding: 20,
    backgroundColor: '#f8f8f8',
    height: '100%',
  },
  siteNameContainer: {
    width: '100%', // Full width for the background
    backgroundColor: '#457b9d', // Rectangle background color
    paddingVertical: 10, // Vertical padding for the text
    paddingHorizontal: 20, // Horizontal padding for some spacing
    position: 'absolute', // Position at the top of the screen
    top: 0, // Stick to the top
    left: 0, // Stick to the left
    zIndex: 1, // Ensure it's above other content
  },
  siteName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1d3557',
    marginBottom: 20,
    textAlign: 'left',
  },
  textSection: {
    width: '80%',  // Adjust width to control the layout
    alignItems: 'center',  // Center-align text in the section
  },
  findText: {
    fontSize: 28,
    color: '#333',
    // Removed the rotation and adjusted the position
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
    textAlign: 'center',  // Center the description text
  },
  startButton: {
    marginTop: 20,
    backgroundColor: '#457b9d',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: 'center',  // Center the button within its parent
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage; 

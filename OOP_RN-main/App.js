import React, { useState , useEffect} from 'react';
import {
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableHighlight,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { recipes } from './recipe.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight= Dimensions.get('window').height;

const Tab = createBottomTabNavigator();

const imageSources = recipes;

const timesNewRomanFont = 'Times New Roman';


function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const filteredRecipes = imageSources.filter(food => {
    if (selectedFilter === 'All' || food.tag === selectedFilter) {
      return true;
    } else {
      return false;
    }
  });

  const searchedRecipes = filteredRecipes.filter(food => {
    return (
      food.name.toLowerCase().includes(searchText.toLowerCase()) ||
      food.tag.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const handleFilterClick = (filterName) => {
    setSelectedFilter(filterName);
  };

  const addToFavorites = (recipe) => {
    recipe.favorite=true;
    setModalVisible(false);
  };

  const ref = () => {
    setRefresh(true)

    setTimeout(()=>{
      setRefresh(false)
    }, 2000)
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} 
      refreshControl={
      <RefreshControl
      refreshing={refresh}
      onRefresh={()=>ref()}
    /> 
    }
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>Only Foods</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food..."
          placeholderTextColor={'#6D9773'}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        
        <View style={styles.FilterButton}>
          <View style={styles.FilterButton}>
            <Button title={"All"} onPress={() => handleFilterClick('All')} color="#DDA15E" />
          
          </View>
          <View style={styles.FilterButton}>
            <Button title="Beef" onPress={() => handleFilterClick('beef')} color="#DDA15E" />
          </View>
          <View style={styles.FilterButton}>
            <Button title="Chicken" onPress={() => handleFilterClick('chicken') }color="#DDA15E" />
          </View>
          <View style={styles.FilterButton}>
            <Button title="Pork" onPress={() => handleFilterClick('pork')}color="#DDA15E" />
          </View>
          <View style={styles.FilterButton}>
            <Button title="Veggies" onPress={() => handleFilterClick('veggies')} color="#DDA15E"/>
          </View>
          <View style={styles.FilterButton}>
            <Button title="Fish" onPress={() => handleFilterClick('fish')}color="#DDA15E" />
          </View>
        </View>
        
        <Text style={styles.LabelDesign}>Recipe</Text>
        <View style={styles.buttonContainer}>
          {searchedRecipes.map((food, index) => (
            <TouchableHighlight
              key={index}
              style={styles.imageContainer}
              underlayColor="#fff"
              onPress={() => {
                setSelectedFood(food);
                setModalVisible(true);
              }}
            >
              <>
                <Image source={food.source} style={styles.image} />
                <Text style={styles.foodName}>{food.name}</Text>
              </>
            </TouchableHighlight>
          ))}
        </View>
      </View>

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalBackButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBackButtonText}>Back</Text>
              </TouchableOpacity>
              <FlatList
                data={selectedFood ? [selectedFood] : []}
                keyExtractor={(item, index) => `${item.tag}-${index}`}
                renderItem={({ item }) => (
                  <View style={styles.modalImageContainer}>
                    <Image source={item.source} style={styles.modalImage} />
                    
                    <Text style={styles.modalFoodName}>{item.name}</Text>
                    <Text style={styles.modalRecipeText}>{selectedFood.recipe}</Text>
                   
                  </View>
                )}
              />
              
              <TouchableOpacity
                style={styles.modalFavoritesButton}
                onPress={() => addToFavorites(selectedFood)}
              >
                <Text style={styles.modalFavoritesButtonText}>Favorite</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </ScrollView>
  );
}

function AboutUs(){
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.containerMisc}>
        <Text style={styles.titleText}>About Us</Text>
        <Text style={styles.contentText}>
        For students and some working people, buying food outside can somehow cost a lot. Cooking food at home may consume time for busy individuals but homemade food is healthier.  

        </Text>
        <Text style={styles.contentText}>
        There are tons of recipes out there when we search the Internet. These deserve a platform that every user of different ages can access. 
        This mobile application is developed for recipe navigation, maybe the recipe that you’ll get from here is your next favorite food to prepare for someone you love. 
        </Text>
        <Text style={styles.contentText}>
        The system wants to achieve informative and accessible cooking recipes, and external cognition as beloved users also list their ingredients and notes.
        </Text>
      </View>
    </ScrollView>
  );
};

function FavoritesScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const filteredRecipes = imageSources.filter(food => {
    if (food.favorite===true) {
      return true;
    } else {
      return false;
    }
  });

  const RemoveFromFavorites = (recipe) => {
    recipe.favorite=false;
    setModalVisible(false);
  };

  const ref = () => {
    setRefresh(true)

    setTimeout(()=>{
      setRefresh(false)
    }, 2000)
  }

  return(
  <ScrollView contentContainerStyle={styles.scrollContainer}
  refreshControl={
    <RefreshControl
    refreshing={refresh}
    onRefresh={()=>ref()}
  /> 
  }>
    <View style={styles.container}>
      <Text style={styles.titleText}>Favorites</Text>
      <View style={styles.buttonContainer}>
          {filteredRecipes.map((food, index) => (
            <TouchableHighlight
              key={index}
              style={styles.imageContainer}
              underlayColor="#ddd"
              onPress={() => {
                setSelectedFood(food);
                setModalVisible(true);
              }}
            >
              <>
                <Image source={food.source} style={styles.image} />
                <Text style={styles.foodName}>{food.name}</Text>
              </>
            </TouchableHighlight>
          ))}
        </View>
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalBackButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBackButtonText}>Back</Text>
              </TouchableOpacity>
              <FlatList
                data={selectedFood ? [selectedFood] : []}
                keyExtractor={(item, index) => `${item.tag}-${index}`}
                renderItem={({ item }) => (
                  <View style={styles.modalImageContainer}>
                    <Image source={item.source} style={styles.modalImage} />
                    
                    <Text style={styles.modalFoodName}>{item.name}</Text>
                    <Text style={styles.modalRecipeText}>{selectedFood.recipe}</Text>
                   
                  </View>
                )}
              />
              
              <TouchableOpacity
                style={styles.modalFavoritesButton}
                onPress={() => RemoveFromFavorites(selectedFood)}
              >
                <Text style={styles.modalFavoritesButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  </ScrollView>
  );
}

function NoteScreen() {
  const [newRecipe, setNewRecipe] = useState('');
  const [notes, setNotes] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const addToFavorites = () => {
    if (newRecipe.trim() !== '') {
      setFavoriteRecipes((prevFavorites) => [
        ...prevFavorites,
        { name: newRecipe, notes },
      ]);
      setNewRecipe('');
      setNotes('');
    }
  };

  const removeFromFavorites = (index) => {
    setFavoriteRecipes((prevFavorites) =>
      prevFavorites.filter((_, i) => i !== index)
    );
  };

  const ref = () => {
    setRefresh(true)

    setTimeout(()=>{
      setRefresh(false)
    }, 2000)
  }

  return (
    <View style={styles.containerMisc}
    refreshControl={
      <RefreshControl
      refreshing={refresh}
      onRefresh={()=>ref()}
    /> 
    }>
      <Text style={styles.titleText}>Only Notes</Text>
      <Text style={styles.contentText}>This is where you can create your own recipe and lists.</Text>
      <View paddingVertical={20} >
        <TextInput
          style={styles.contentText}
          placeholder="Title:"
          placeholderTextColor={'white'}
          borderWidth={1}
          borderColor={'white'}
          padding={2}
          value={newRecipe}
          onChangeText={(text) => setNewRecipe(text)}
        />
        <TextInput
          style={styles.contentText}
          placeholder="Add your notes here..."
          placeholderTextColor={'white'}
          borderWidth={1}
          borderColor={'white'}
          padding={2}
          multiline={true}
          value={notes}
          onChangeText={(text) => setNotes(text)}
        />
      </View>
      <Button title="Add Recipe" onPress={addToFavorites} color="#DDA15E" />

      <FlatList
        data={favoriteRecipes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.imageContainer}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.contentText}>Notes: {item.notes}</Text>
            <Button
              title="Remove"
              onPress={() => removeFromFavorites(index)}
            />
          </View>
        )}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={{
        tabBarStyle: { 
          backgroundColor: '#FEFAE0',
          borderColor: '#FEFAE0',
          borderWidth: 0,
          borderRadius: 0,
          padding: 10, 
        }, // Background color for all tabs
      }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: '', 
          showLabel: false,
          tabBarIcon:({focused}) => (
            <View style = {{
              backgroundColor: '',
              alignItems: "center", 
              justifyContent:'center',
              top:3,
             
             }}>
              <Image 
                source={require("./assets/home_.png")}
                resizeMode='contain'
                style={{

                  width: focused ? 50 : 35, 
                  height: 35,
                  tintColor: focused ? '#22543d' : 'grey',
                  
              }} 
                />
              <Text></Text>
            </View>
          ),
        }} 
        />
        <Tab.Screen name="Favorites" component={FavoritesScreen}options={{
          tabBarLabel: '', showLabel: false, 
          tabBarIcon:({focused}) => (
            <View style = {{
            alignItems: "center", 
            justifyContent:'center',
            top:3,
             
             }}>
              <Image 
                source={require("./assets/fave.png")}
                resizeMode='contain'
                style={{
              
                  width: focused ? 50 : 35, 
                  height: 35,
                  tintColor: focused ? '#22543d' : 'grey',
              }} 
                />
              <Text></Text>
            </View>
          ),
        }} 
      />
        <Tab.Screen name="About us" component={AboutUs}options={{
          tabBarLabel: '', showLabel: false, 
          tabBarIcon:({focused}) => (
            <View style = {{
            alignItems: "center", 
            justifyContent:'center',
            top:3,
             
             }}>
              <Image 
                source={require("./assets/about.png")}
                resizeMode='contain'
                style={{
          
                  width: focused ? 50 : 35, 
                  height: 35,
                  tintColor: focused ? '#22543d' : 'grey',
              }}
                />
              <Text></Text>
            </View>
          ),
        }} 
      />
      <Tab.Screen name="Notes" component={NoteScreen}options={{
          tabBarLabel: '', showLabel: false, 
          tabBarIcon:({focused}) => (
            <View style = {{
            alignItems: "center", 
            justifyContent:'center',
            top:3,
             
             }}>
              <Image 
                source={require("./assets/notes.png")}
                resizeMode='contain'
                style={{
         
                  width: focused ? 50 : 35, 
                  height: 35,
                  tintColor: focused ? '#22543d' : 'grey',
              }}
                />
              <Text></Text>
            </View>
          ),
        }} 
      />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0C3B2E',
    alignItems: 'center',
    padding: 20,
  },
  containerMisc: {
    flexGrow: 1,
    backgroundColor: '#0C3B2E',
    alignItems: 'flex-start',
    padding: 20,
  },
  titleText: {
    color: '#F7F7F7',
    fontSize: 46,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: timesNewRomanFont,

  },
  buttonContainer: {
    maxHeight: windowHeight*1.2,
    maxWidth: windowWidth/1.3,
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    aspectRatio: 1,
    width: '100%',
    maxWidth: windowWidth / 3 - 20,
    marginBottom: 75,
  },
  image: {
    width: '100%',
    borderRadius: 55,
    height: undefined, // Allows the height to adjust based on the image aspect ratio
    aspectRatio: 1, // Keeps the aspect ratio (1:1 for square images)
    maxWidth: windowWidth / 3 - 20,
  },
  foodName: {
    color: '#F7F7F7',
    textAlign: 'center',
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  searchInput: {
    color: '#0C3B2E',
    width: '70%',
    height: 40,
    borderColor: '#61677A',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    marginVertical: 10,
    backgroundColor: '#FEFAE0',
  },
  FilterButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#0C3B2E',
    borderColor: '#0C3B2E',
    paddingHorizontal: 5,
    paddingVertical: 1,
    height: 55,
    color: "#0C3B2E"
    

  },
  LabelDesign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  // Styles for Modal, BackButton, and FavoritesButton here
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: 320,
    paddingTop: 60,
    padding: 20,
    borderRadius: 10,
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  modalFoodName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalRecipeText: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'left',
  },
  modalBackButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    padding: 10,
  },
  modalBackButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalFavoritesButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    padding: 10,
  },
  modalFavoritesButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  contentText: {
    color: 'white',
    paddingHorizontal: 5,
    paddingVertical: 10,
  }
});
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from 'react-native';

import Forecast from './Forecast';

class firstReactiveNative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: null,
      forecast: null
    };
  }

  _handleTextChange = (event) => {
    console.log(event.nativeEvent.text);
    let zip = event.nativeEvent.text;
    this.setState({zip: zip});
    fetch('http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&APPID=de4f2b286e75561bf3f40b9f01ff29f2')
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON)
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp
          }
        })
      })
      .catch((error) => {
        console.warn(error);
      })
  }

  render() {

    let content = null;
    if(this.state.forecast !== null) {
      content = <Forecast main={this.state.forecast.main}
                          description={this.state.forecast.description}
                          temp={this.state.forecast.temp} />
    }
    return (
      <View style={styles.container}>
        <Image source={require('./img/FatNayNay.png')}
               resizeMode='cover'
               style={styles.backdrop}>
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Current weather For
              </Text>
              <View style={styles.zipContainer}>
                <TextInput style={[styles.zipCode, styles.mainText]}
                           returnKeyType='go'
                           onSubmitEditing={this._handleTextChange} />
               </View>
             </View>
            {content}

          </View>
        </Image>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: {
    width: 50,
    height: 16
  },
  mainText: {
    flex: 1,
    fontSize: 17,
    color: '#fff'
  },
  input: {
    fontSize: 20,
    borderWidth: 2,
    height: 40
  }
});

AppRegistry.registerComponent('firstReactiveNative', () => firstReactiveNative);

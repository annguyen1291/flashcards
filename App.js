import React from 'react'
import { View, Platform } from 'react-native'
import AddDesk from './components/AddDesk'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Desks from './components/Desks'
import { createBottomTabNavigator , createStackNavigator, createAppContainer } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import DeskDetail from './components/DeskDetail'
import AddCard from './components/AddCard'
import StartQuiz from './components/StartQuiz'
import Result from './components/Result'
import { setLocalNotification } from './utils/helpers'

const Tabs = createBottomTabNavigator({
  Desks: {
    screen: Desks,
    navigationOptions: {
      tabBarLabel: 'Desks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddDesk: {
    screen: AddDesk,
    navigationOptions: {
      tabBarLabel: 'Add Desk',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: createAppContainer(Tabs),
  },
  DeskDetail: {
    screen: DeskDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  StartQuiz: {
    screen: StartQuiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
  ,
  Result: {
    screen: Result,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

const Container = createAppContainer(MainNavigator)

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <Container />
        </View>
      </Provider>
    )
  }
}
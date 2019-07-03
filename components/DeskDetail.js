import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/helpers'


class DeskDetail extends React.Component {  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deskID
    }
  }

  render() {
    const { deskID, desk } = this.props
    const count = Object.keys(desk).length

    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 40}}>{deskID}</Text>
          <Text style={{fontSize: 20}}>{`${count} cards`}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.addCard} onPress={() => this.props.navigation.navigate('AddCard', { deskID: deskID })}>
            <Text style={{fontSize: 20}}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startQuiz} disabled={count === 0 ? true: false} onPress={() => this.props.navigation.navigate('StartQuiz', { deskID: deskID })}>
            <Text style={{fontSize: 20, color: 'white'}}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) 
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addCard: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: 200
  },
  startQuiz: {
    backgroundColor: 'black',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    width: 200
  },
})

function mapStateToProps (state, { navigation }) {
  const { deskID } = navigation.state.params

  return {
    deskID,
    desk: state[deskID]
  }
}

export default connect(mapStateToProps)(DeskDetail)
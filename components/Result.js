import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

class Result extends React.Component {
  render() {
    const { deskID, card, correct } = this.props

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>{`Percentage correct: ${(correct/card*100).toFixed(2)}%`}</Text>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.addCard} onPress={() => this.props.navigation.navigate('DeskDetail', { deskID: deskID })}>
            <Text style={{fontSize: 20}}>Back to Desk</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startQuiz} onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
            <Text style={{fontSize: 20, color: 'white'}}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addCard: {
    backgroundColor: 'white',
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
  const { deskID, card, correct } = navigation.state.params

  return {
    deskID, 
    card, 
    correct
  }
}

export default connect(mapStateToProps)(Result)
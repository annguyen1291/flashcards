import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class StartQuiz extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }

  state = {
    side: true,
    card: 0,
    correct: 0
  }

  flip = () => {
    this.setState((state) => ({ ...state, side: !state.side}))
  }

  submit = (correct) => {
    const { deskID, desk } = this.props

    this.setState((state) => ({ side: true, card: state.card + 1, correct: state.correct + correct }))

    if (desk.length === this.state.card + 1) {
      this.props.navigation.navigate('Result', { deskID: deskID, card: this.state.card + 1, correct: this.state.correct + correct })
      
      this.setState(() => ({
        side: true,
        card: 0,
        correct: 0
      }))

      clearLocalNotification()
        .then(setLocalNotification)
    }
  }

  render() {
    const { desk } = this.props
    const card = this.state.card

    return (
      <View style={{flex: 1}}>
        <Text style={{fontSize: 20}}>{`${card + 1}/${desk.length}`}</Text>
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 40}}>{this.state.side ? desk[card].question : desk[card].answer}</Text>
            <TouchableOpacity onPress={this.flip} >
              <Text style={{fontSize: 20, color: 'red'}}>{this.state.side ? 'Answer' : 'Question'}</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={[styles.answer, {backgroundColor: 'green'}]} onPress={() => this.submit(1)} >
              <Text style={{fontSize: 20, color: 'white'}}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.answer, {backgroundColor: 'red'}]} onPress={() => this.submit(0)} >
              <Text style={{fontSize: 20, color: 'white'}}>Incorrect</Text>
            </TouchableOpacity>
          </View>
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
  answer: {
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
  }
})


function mapStateToProps (state, { navigation }) {
  const { deskID } = navigation.state.params

  return {
    deskID,
    desk: state[deskID]
  }
}

export default connect(mapStateToProps)(StartQuiz)
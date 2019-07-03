import React from 'react'
import { View, Text,StyleSheet, TextInput } from 'react-native'
import { white } from '../utils/colors'
import { addDesk } from '../actions'
import { submitDesk } from '../utils/api'
import { connect } from 'react-redux'
import SubmitBtn from './SubmitBtn'
import { NavigationActions } from 'react-navigation'

class AddCard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }
  }

  state = {
    question: '',
    answer: ''
  }

  submit = () => {
    const { deskID, desk } = this.props
    const card = this.state

    this.props.dispatch(addDesk({
      [deskID]: [ ...desk, card ]
    }))

    submitDesk(deskID, card)

    this.setState(() => ({ question: '', answer: '' }))

    this.toDeskDetail()
  }

  toDeskDetail = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.textInput} 
          value={this.state.question} 
          placeholder='Card Question' 
          onChangeText={(question) => this.setState((state) => ({ ...state,  question: question }))}
        />
        <TextInput 
          style={styles.textInput} 
          value={this.state.answer} 
          placeholder='Card Answer' 
          onChangeText={(answer) => this.setState((state) => ({ ...state,  answer: answer }))}
        />
        <SubmitBtn disabled={this.state.question === '' || this.state.answer === ''} onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 40,
    width: 400,
    borderRadius: 2,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    fontSize: 15,
    borderColor: 'black',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
  },
  center: {
    fontSize: 40,
    textAlign: 'center',
  },
})

function mapStateToProps (state, { navigation }) {
  const { deskID } = navigation.state.params

  return {
    deskID,
    desk: state[deskID]
  }
}

export default connect(mapStateToProps)(AddCard)
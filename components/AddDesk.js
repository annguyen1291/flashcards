import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { white } from '../utils/colors'
import { submitDesk } from '../utils/api'
import { connect } from 'react-redux'
import { addDesk } from '../actions'
import SubmitBtn from './SubmitBtn'

class AddDesk extends Component {
  state = {
    deskTitle: ''
  }

  submit = () => {
    const deskID = this.state.deskTitle
    const { desks } = this.props
    
    if (!Object.keys(desks).includes(deskID)) {
      this.props.dispatch(addDesk({
        [deskID]: []
      }))

      submitDesk(deskID, [])
    }

    this.setState(() => ({ deskTitle: '' }))

    this.props.navigation.navigate('DeskDetail', { deskID: deskID })
  }

  render() {
    return (
      <View style={styles.container}> 
        <Text style={styles.center}>What is the title of your new desk?</Text>
        <TextInput 
          style={styles.textInput} 
          value={this.state.deskTitle} 
          placeholder='Desk Title' 
          onChangeText={(deskTitle) => this.setState({deskTitle})}
        />
        <SubmitBtn disabled={this.state.deskTitle === ''} onPress={this.submit} />
      </View>
    )    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    justifyContent: 'space-around',
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
  },
  center: {
    fontSize: 40,
    textAlign: 'center',
  },
})

function mapStateToProps (desks) {
  return {
    desks
  }
}

export default connect(mapStateToProps)(AddDesk)
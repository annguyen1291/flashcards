import React from 'react'
import { ScrollView, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveDesks, addDesk } from '../actions'
import { fetchDeskResults } from '../utils/api'
import { white } from '../utils/colors'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { AppLoading} from 'expo'

class Desks extends React.Component {
  state = {
    ready: false,
  }

  componentDidMount () {
    const { dispatch } = this.props

    fetchDeskResults()
      .then((desks) => dispatch(receiveDesks(desks)))
      // .then(({ desks }) => {
      //   if (!desks[timeToString()]) {
      //     dispatch(addDesk({
      //       [timeToString()]: getDailyReminderValue()
      //     }))
      //   }
      // })
      .then(() => this.setState(() => ({ready: true})))
  }

  render() {
    const { desks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <ScrollView>
        {Object.keys(desks).length === 0
          ? <Text style={styles.noDataText}>Please add a Desk</Text>
          : Object.keys(desks).map((deskID) => (
            <TouchableOpacity style={styles.item} key={deskID} onPress={() => this.props.navigation.navigate('DeskDetail', { deskID: deskID })}>
              <Text style={{fontSize: 40}}>{deskID}</Text>
              <Text style={{fontSize: 20}}>{`${Object.keys(desks[deskID]).length} cards`}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    ) 
  } 
}

const styles = StyleSheet.create({
  item: {
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
    borderBottomWidth: 4
  },
  noDataText: {
    fontSize: 40,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
  }
})

function mapStateToProps (desks) {
  return {
    desks
  }
}

export default connect(mapStateToProps)(Desks)
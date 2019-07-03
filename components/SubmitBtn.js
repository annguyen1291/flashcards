import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'

export default function SubmitBtn ({ onPress, disabled }) {  
  return (    
    <TouchableOpacity
      disabled={disabled}
      style={styles.submitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 40,
    borderRadius: 2,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
  },
  submitBtnText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  }
})
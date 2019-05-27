<View>
        <HeaderHospeasy />
<View style={styles.container}>
  <TextInput
    value={this.state.username}
    onChangeText={(username) => this.setState({ username })}
    placeholder={'Username'}
    selectionColor={BLUE}
    style={styles.input}
  />
  <TextInput
    value={this.state.password}
    onChangeText={(password) => this.setState({ password })}
    placeholder={'Password'}
    secureTextEntry={true}
    selectionColor={BLUE}
    style={styles.input}
  />
<TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
  <View style={[styles.countContainer]}>
    <Text style={[styles.loginText]}>
      Register
     </Text>
   </View>
  </TouchableOpacity>
</View>
</View>

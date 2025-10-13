import { Text, View, ScrollView, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView>
        <Text style = {styles.texto}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Suspendisse sed porta nunc, eget varius dolor. Quisque sit 
        amet libero ligula. Integer et mi luctus, mollis metus sit 
        amet, consectetur tortor. Vestibulum euismod pulvinar metus, 
        nec posuere tortor. Cras interdum id est et vehicula. Nam in dui 
        sem. Suspendisse quis dui vitae sem aliquet maximus sed nec libero. 
        Vivamus felis dui, finibus sit amet lectus a, dapibus scelerisque lacus.

        Aliquam vitae viverra nibh, ac suscipit orci. In sit amet mauris 
        velit. Praesent in lorem et sapien facilisis vehicula. Proin a 
        urna ante. Quisque egestas, purus in tempor tempor, orci velit 
        convallis quam, vitae malesuada mi leo in velit. Suspendisse at 
        lacinia est. Phasellus ut aliquam tortor, a ultricies erat. Nam 
        condimentum ligula vitae mi finibus accumsan quis eget enim. Ut 
        vitae lectus vehicula, tempor est id, fermentum ipsum. Curabitur a 
        justo eleifend, tempor mi et, volutpat turpis. Maecenas dignissim 
        dolor dui, a lacinia nisl lacinia sed. Suspendisse tincidunt ex eget
        augue malesuada placerat. Fusce accumsan dignissim nisl ac imperdiet. 
        Curabitur auctor mi ut accumsan aliquet. Integer vitae lacus vestibulum, 
        dictum lectus at, commodo quam.

        Suspendisse tincidunt, nisi vel viverra dignissim, nisi massa 
        porttitor libero, ut fermentum tellus mauris in dui. Aliquam ultrices 
        venenatis malesuada. Fusce sagittis vitae purus sit amet mattis. 
        Nulla vestibulum egestas dignissim. Aliquam euismod, eros ut semper 
        pharetra, felis augue commodo neque, fringilla faucibus lorem lorem 
        eget elit. Class aptent taciti sociosqu ad litora torquent per conubia 
        nostra, per inceptos himenaeos. In ut egestas massa. Nullam eget velit 
        aliquet, semper mi a, consectetur nibh. Ut non efficitur sapien. Suspendisse 
        volutpat sapien vel lacus aliquet, ac accumsan felis malesuada. Lorem 
        ipsum dolor sit amet, consectetur adipiscing elit. Duis ipsum leo, 
        eleifend id orci id, interdum convallis nisl.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  texto: {
    fontSize: 34
  }

})

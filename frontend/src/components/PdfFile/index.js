import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import iitrLogo from "../../assets/iitrLogo.png";
import dummyImage from "../../assets/profileDummy.png";
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: "#90E0EF",
  },
  iitrLogoStyle: {
    color: "#FFFFFF",
    padding: 2,
  },
  headingText: {
    textAlign: "center",
    color: "#03045E",
    fontSize: 25,
    fontWeight: "bolder",
  },

  profilePhoto: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  ctainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: '100%',
    margin: 0,
  },
  infoText:{
    color: "#03045E",
    fontSize: 25,
    margin: 5,
    fontWeight: "bold",
  },
  sign:{
    fontSize:15,
    fontWeight: 'bolder',
    marginTop:50
  }
});

const PdfFile = ({name, email, enrollment, branch, slot, image, slotName}) => (
  <Document>
    return(
    <Page style={styles.body}>
      <Image style={styles.iitrLogoStyle} src={iitrLogo} />
      <View style={styles.ctainer}>
        <Text style={styles.headingText}>CENTRAL GYM ACCESS CERTIFICATE</Text>
        <Image style={styles.profilePhoto} src={image?image:dummyImage} />
        <Text style={styles.infoText}>{name}</Text>
        <Text style={styles.infoText}>{email}</Text>
        <Text style={styles.infoText}>{enrollment}</Text>
        <Text style={styles.infoText}>BRANCH- {branch.toUpperCase()}</Text>
        <Text style={styles.infoText}>SLOT - {slotName!=null?slotName:"Nil"}</Text>
     {slot&&<>
      <Text style={styles.infoText}>Start-time - {slot.start_time}</Text>
      
        <Text style={styles.infoText}>End-time - {slot.end_time}</Text></>}
      </View>
      <Text style={styles.sign}>SPORTS AUTHORITY SIGNATURE</Text>
    </Page>
    )
  </Document>
);

export default PdfFile;

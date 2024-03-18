import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
// default #90E0EF
// pink #cd8cc5
// light blue #a1ddc8
// green #a4e58d
import iitrLogo from "../../assets/iitrLogo.png";
import dummyImage from "../../assets/profileDummy.png";
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: "#a1ddc8",
  },
  iitrLogoStyle: {
    color: "#FFFFFF",
    padding: 2,
  },
  headingText: {
    textAlign: "center",
    color: "#03045E",
    fontSize: 15,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // height: '100%',
    margin: 0,
  },
  infoText: {
    color: "#03045E",
    fontSize: 20,
    marginVertical: 5,
    fontWeight: "bold",
  },
  sign: {
    fontSize: 15,
    fontWeight: "bolder",
    marginTop: 50,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "col",
    justifyContent: "flex-start",
    // alignItems: "center",
    padding: 20,
    // height: '100%',
    margin: 6,
  },
  signText:{
    fontSize:15,
    fontWeight: 'bolder',
  
  },
  facInfo: {
    display : "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: "5"
  },
  personInfo : {
    display: "flex",
    flexDirection: "col",
    justifyContent: "flex-start",
    padding: '25'
  }
});

const pinkBody = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: "#cd8cc5",
  },
});

const lightBlueBody = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: "#a1ddc8",
  },
});

const greenBody = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: "#a4e58d",
  },
});

const PdfFile3 = ({
  name,
  email,
  enrollment,
  branch,
  slot,
  image,
  slotName,
}) => (
  <Document>
    return(
    <Page style={styles.body}>
      <Image style={styles.iitrLogoStyle} src={iitrLogo} />
      <Text style={styles.headingText}>INSTITUTE SPORTS COUNCIL</Text>
      <Text style={styles.headingText}>CENTRAL GYM PASS</Text>
      <View style={styles.ctainer}>
        <Image style={styles.profilePhoto} src={image ? image : dummyImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{name}</Text>
          <Text style={styles.infoText}>{enrollment}</Text>
          <Text style={styles.infoText}>BRANCH - {branch.toUpperCase()}</Text>
          <Text style={styles.infoText}>
            SLOT - {slotName != null ? slotName : "Nil"}
          </Text>
          {slot && (
            <>
              <Text style={styles.infoText}>
                {" "}
                {slot.start_time} - {slot.end_time}
              </Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.facInfo}>
        <View style={styles.personInfo}>
          <Text style={styles.signText}>PRAMOD KUMAR</Text>
          <Text style={styles.signText}>GYM INCHARGE</Text>
        </View>
        <View style={styles.personInfo}>
          <Text style={styles.signText}>Dr. ALOK KUMAR PANDEY</Text>
          <Text style={styles.signText}>SPORTS OFFICER</Text>
        </View>
      </View>
    </Page>
    )
  </Document>
);

export default PdfFile3;

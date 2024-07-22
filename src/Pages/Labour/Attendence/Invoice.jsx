import React, { Fragment } from "react";
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import logo from "../../../util/Assets/Icon/room.png";
import moment from "moment";

const Invoice = ({ data }) => {
  const reciept_data = {
    id: data._id,
    invoice_no: data._id,
    empName: data.labourName,
    address: "739 Porter Avenue, Cade, Missouri, 1134",
    date: moment(new Date()).format("DD MMM, YYYY"),
    items: [
      {
        id: 1,
        desc: "do ex anim quis velit excepteur non",
        qty: data.earningPerDay,
        noOfDays: data.noOfDays,
      },
    ],
  };

  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: "column",
    },

    spaceBetween: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#3E3E3E",
    },

    titleContainer: { flexDirection: "row", marginTop: 24 },

    logo: { width: 90 },

    reportTitle: { fontSize: 16, textAlign: "center" },

    addressTitle: { fontSize: 11, fontStyle: "bold" },

    invoice: { fontWeight: "bold", fontSize: 20 },

    invoiceNumber: { fontSize: 11, fontWeight: "bold" },

    address: { fontWeight: 400, fontSize: 10 },

    theader: {
      marginTop: 20,
      fontSize: 14,
      fontStyle: "bold",
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      height: 30,
      backgroundColor: "#DEDEDE",
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

    tbody: {
      fontSize: 16,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    total: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1.5,
      borderColor: "whitesmoke",
      borderBottomWidth: 1,
    },

    signatureDash: {
      marginTop: 14,
    },

    tbody2: { flex: 2, borderRightWidth: 1 },
  });

  const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.reportTitle}>Room Booking</Text>
      </View>
    </View>
  );

  const Address = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text style={styles.invoice}>Invoice </Text>
          <Text style={styles.invoiceNumber}>
            Employee Name: {reciept_data.empName}{" "}
          </Text>
          <Text style={styles.invoiceNumber}>
            Invoice number: {reciept_data.invoice_no}{" "}
          </Text>
        </View>
        <View>
          <Text style={styles.addressTitle}>7, Ademola Odede, </Text>
          <Text style={styles.addressTitle}>Ghandhi Nagar,</Text>
          <Text style={styles.addressTitle}>Ahemdabad, Gujrat.</Text>
        </View>
      </View>
    </View>
  );

  const UserAddress = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View style={{ maxWidth: 200 }}>
          {/* <Text style={styles.addressTitle}>Bill to </Text>
          <Text style={styles.address}>{reciept_data.address}</Text> */}
        </View>
        <Text style={styles.addressTitle}>{reciept_data.date}</Text>
      </View>
    </View>
  );

  const TableHead = () => (
    <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Job Title</Text>
      </View>
      <View style={styles.theader}>
        <Text>No.Of Days</Text>
      </View>
      <View style={styles.theader}>
        <Text>Pay Per Day</Text>
      </View>
      <View style={styles.theader}>
        <Text>Payable Salary</Text>
      </View>
    </View>
  );

  const TableBody = () =>
    reciept_data.items.map((receipt) => (
      <Fragment key={receipt.id}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>{data.labourPost}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{receipt.noOfDays} </Text>
          </View>
          <View style={styles.tbody}>
            <Text>{data.earningPerDay}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{data.salary} Rs</Text>
          </View>
        </View>
      </Fragment>
    ));

  const TableTotal = () => (
    <View style={{ width: "100%", flexDirection: "row" }}>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.total}>
        <Text> </Text>
      </View>
      {/* <View style={styles.tbody}>
        <Text>Total</Text>
      </View>
      <View style={styles.tbody}>
        <Text>
          {reciept_data.items.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
          )}
        </Text>
      </View> */}
    </View>
  );

  const Signature = () => {
    return (
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          marginTop: "40px",
        }}
      >
        <View style={styles.total}>
          <Text>___________________</Text>
        </View>
        <View style={[styles.total, styles.signatureDash]}>
          <Text>Staff Signature</Text>
        </View>
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <Address />
        <UserAddress />
        <TableHead />
        <TableBody />
        <TableTotal />
        <Signature />
      </Page>
    </Document>
  );
};

export default Invoice;

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface CertificateProps {
  nombre: string;
  articulo: string;
  year: number;
}

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 40,
  },
  text: {
    fontSize: 14,
    textAlign: "justify",
    lineHeight: 1.5,
  },
});

const CertificatePDF: React.FC<CertificateProps> = ({
  nombre,
  articulo,
  year,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.title}>Certificado de Aceptación</Text>
        <Text style={styles.text}>
          El artículo {articulo} del autor {nombre} ha sido aceptado en el año{" "}
          {year} para su publicación en Anales del Seminario de Historia de la
          Filosofía.
        </Text>
      </View>
    </Page>
  </Document>
);

export default CertificatePDF;

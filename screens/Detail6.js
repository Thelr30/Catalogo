import React, { useState } from "react";
import { Text, StyleSheet, View, StatusBar, SafeAreaView, ImageBackground, ScrollView, TouchableOpacity, Modal, TextInput, Linking } from 'react-native';

export default function Detail() {
    const [selectedCaliber, setSelectedCaliber] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [ticket, setTicket] = useState(null);
    const [unitType, setUnitType] = useState("Metro"); // Nuevo estado
    const unitPrice = 150;
    const lengthPerRoll = 100; // Longitud por rollo en metros
    const totalMeters = unitType === "Rollo" ? parseInt(quantity || 0) * lengthPerRoll : parseInt(quantity || 0);
    const totalPrice = totalMeters * unitPrice;

    const generateTicket = () => {
        const ticketId = Math.floor(Math.random() * 1000000);
        setTicket({
            id: ticketId,
            caliber: selectedCaliber || 'No seleccionado',
            color: selectedColor || 'No seleccionado',
            quantity: quantity || 0,
            unit: unitType,
            totalMeters,
            total: totalPrice
        });
        setModalVisible(false);
    };

    const sendEmail = () => {
        const subject = encodeURIComponent("Solicitud de Cotización");
        const body = encodeURIComponent(`Cotización:
        - Calibre: ${selectedCaliber || 'No seleccionado'}
        - Color: ${selectedColor || 'No seleccionado'}
        - Unidad: ${unitType}
        - Cantidad: ${quantity || 0}
        - Metros totales: ${totalMeters}
        - Precio unitario por metro: $${unitPrice}
        - Total: $${totalPrice}`);
        Linking.openURL(`mailto:cotizacionviakon@gmail.com?subject=${subject}&body=${body}`);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ height: 400 }}>
                    <ImageBackground source={require('../assets/Cable 4.jpg')} resizeMode="cover" style={{ height: 400 }} />
                </View>

                <View style={styles.containerTitle}>
                    <Text style={styles.textTitle}>Cable de uso rudo tipo SJT, 300V 60°C</Text>
                </View>

                <View style={{ marginTop: 40, marginBottom: 40, paddingHorizontal: 20 }}>
                    <Text style={styles.description}>Descripción Del Producto</Text>
                    <Text style={styles.textDescription}>
                    Cable de uso rudo de dos, tres o cuatro conductores de cobre suave en construcción flexible, con aislamiento individual termoplástico de policloruro de vinilo (PVC) identificados por color y cubierta exterior termoplástica de policloruro de vinilo (PVC).
                    </Text>
                </View>

                <View style={styles.selectionContainer}>
                    <Text style={styles.selectionTitle}>Selecciona el calibre:</Text>
                    <View style={styles.optionsContainer}>
                        {['12','14','16','18','20'].map(caliber => (
                            <TouchableOpacity key={caliber} style={[styles.optionButton, selectedCaliber === caliber && styles.selectedOption]} onPress={() => setSelectedCaliber(caliber)}>
                                <Text style={styles.optionText}>{caliber}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.selectionContainer}>
                    <Text style={styles.selectionTitle}>Selecciona el color:</Text>
                    <View style={styles.optionsContainer}>
                        {['Blanco'].map(color => (
                            <TouchableOpacity key={color} style={[styles.optionButton, selectedColor === color && styles.selectedOption]} onPress={() => setSelectedColor(color)}>
                                <Text style={styles.optionText}>{color}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.selectionContainer}>
                    <Text style={styles.selectionTitle}>Selecciona unidad de venta:</Text>
                    <View style={styles.optionsContainer}>
                        {['Metro','Rollo'].map(unit => (
                            <TouchableOpacity key={unit} style={[styles.optionButton, unitType === unit && styles.selectedOption]} onPress={() => setUnitType(unit)}>
                                <Text style={styles.optionText}>{unit}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {unitType === 'Rollo' && (
                        <Text style={{ marginTop: 5, color: 'gray' }}>Cada rollo contiene {lengthPerRoll} metros.</Text>
                    )}
                </View>

                <View style={styles.selectionContainer}>
                    <Text style={styles.selectionTitle}>Cantidad:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        value={quantity}
                        onChangeText={text => setQuantity(text.replace(/[^0-9]/g, ""))}
                        placeholder={`Ingrese cantidad (${unitType})`}
                    />
                </View>

                <View style={styles.quoteContainer}>
                    <TouchableOpacity style={styles.quoteButton} onPress={() => setModalVisible(true)}>
                        <Text style={styles.quoteButtonText}>Cotizar</Text>
                    </TouchableOpacity>
                </View>

                <Modal visible={modalVisible} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Cotización</Text>
                            <Text style={styles.modalText}>Calibre: {selectedCaliber || 'No seleccionado'}</Text>
                            <Text style={styles.modalText}>Color: {selectedColor || 'No seleccionado'}</Text>
                            <Text style={styles.modalText}>Unidad: {unitType}</Text>
                            <Text style={styles.modalText}>Cantidad: {quantity || 0}</Text>
                            {unitType === 'Rollo' && (
                                <Text style={styles.modalText}>Total en metros: {totalMeters} m</Text>
                            )}
                            <Text style={styles.modalText}>Precio por metro: ${unitPrice}</Text>
                            <Text style={styles.modalText}>Total: ${totalPrice}</Text>
                            <TouchableOpacity style={styles.emailButton} onPress={sendEmail}>
                                <Text style={styles.emailButtonText}>Enviar por correo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={generateTicket}>
                                <Text style={styles.closeButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {ticket && (
                    <View style={styles.ticketContainer}>
                        <Text style={styles.ticketTitle}>Ticket de Cotización</Text>
                        <Text>ID: {ticket.id}</Text>
                        <Text>Calibre: {ticket.caliber}</Text>
                        <Text>Color: {ticket.color}</Text>
                        <Text>Unidad: {ticket.unit}</Text>
                        <Text>Cantidad: {ticket.quantity}</Text>
                        <Text>Metros totales: {ticket.totalMeters}</Text>
                        <Text>Total: ${ticket.total}</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerTitle: {
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    textDescription: {
        fontSize: 15,
        color: 'slategray',
        marginTop: 5,
    },
    selectionContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    selectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionsContainer: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
    },
    optionButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    selectedOption: {
        backgroundColor: 'lightblue',
    },
    optionText: {
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        textAlign: 'center',
        width: 100,
    },
    quoteContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    quoteButton: {
        backgroundColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    quoteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    ticketContainer: {
        padding: 20,
        margin: 20,
        backgroundColor: 'lightgray',
        borderRadius: 10,
    },
    ticketTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emailButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    emailButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

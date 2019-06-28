import {Button, View} from "native-base";
import {StyleSheet, Text} from "react-native";
import React, {useState} from "react";
// @ts-ignore
import Voice from "react-native-voice"

export const VoiceCog = () => {
    const [started, setStarted] = useState("");
    const [recognised, setRecognised] = useState("");
    const [pitch, setPitch] = useState("");
    const [error, setError] = useState("");
    const [end, setEnd] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [partialResults, setPartialResults] = useState<string[]>([]);

    Voice.onSpeechStart = (e: any) => {
        setStarted("√");
    };

    Voice.onSpeechStart = (e: any) => {
        setStarted("√");
    };

    Voice.onSpeechEnd = (e: any) => {
        setEnd("√");
    };

    Voice.onSpeechError = (e: { error: any; }) => {
        setError(JSON.stringify(e.error));
    };

    Voice.onSpeechResults = (e: { value: React.SetStateAction<string[]>; }) => {
        setResults(e.value);
    };

    Voice.onSpeechPartialResults = (e: { value: React.SetStateAction<string[]>; }) => {
        setPartialResults(e.value);
    };

    const startRecognizing = async () => {
        setRecognised("");
        setPitch("");
        setError("");
        setStarted("");
        setResults([]);
        setPartialResults([]);
        setEnd("");

        try {
            await Voice.start('en-US');
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };


    const stopRecognizing = async () => {
        try {
            await Voice.stop();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    const cancelRecognizing = async () => {
        try {
            await Voice.cancel();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    const destroyRecognizer = async () => {
        try {
            await Voice.destroy();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
        setRecognised("");
        setPitch("");
        setError("");
        setStarted("");
        setResults([]);
        setPartialResults([]);
        setEnd("");
    };

    const styles = StyleSheet.create({
        button: {
            width: 50,
            height: 50,
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        },
        action: {
            textAlign: 'center',
            color: '#0000FF',
            marginVertical: 5,
            fontWeight: 'bold',
        },
        instructions: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: 5,
        },
        stat: {
            textAlign: 'center',
            color: '#B0171F',
            marginBottom: 1,
        },
    });

    return (
        <View>
            <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
            <Text style={styles.instructions}>Press the button and start speaking.</Text>
            <Text style={styles.stat}>{`Started: ${started}`}</Text>
            <Text style={styles.stat}>{`Recognized: ${recognised}`}</Text>
            <Text style={styles.stat}>{`Pitch: ${pitch}`}</Text>
            <Text style={styles.stat}>{`Error: ${error}`}</Text>
            <Text style={styles.stat}>Results</Text>
            {results.map((result, index) => {
                return (
                    <Text key={`result-${index}`} style={styles.stat}>
                        {result}
                    </Text>
                );
            })}
            <Text style={styles.stat}>Partial Results</Text>
            {partialResults.map((result, index) => {
                return (
                    <Text key={`partial-result-${index}`} style={styles.stat}>
                        {result}
                    </Text>
                );
            })}
            <Text style={styles.stat}>{`End: ${end}`}</Text>
            <Button onPress={startRecognizing}><Text>Start</Text></Button>
            <Button onPress={stopRecognizing}><Text>Stop Recognizing</Text></Button>
            <Button onPress={cancelRecognizing}><Text>Cancel</Text></Button>
            <Button onPress={destroyRecognizer}><Text style={styles.action}>Destroy</Text></Button>

        </View>
    )
};

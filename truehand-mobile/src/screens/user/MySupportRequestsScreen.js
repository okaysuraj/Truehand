import React from 'react';
import { ScrollView, Text, TouchableOpacity, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAccountRecords from '../../hooks/useAccountRecords';
import { useAuthStore } from '../../store/useAuthStore';
import api from '../../services/api';
import { colors } from '../../theme/theme';
function Frame({ navigation, title, children }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors['surface-linen'],
      }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: 24,
          gap: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 32,
            color: colors['forest-green'],
          }}
        >
          {title}
        </Text>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
function Failure({ error, reload }) {
  return error ? (
    <View>
      <Text accessibilityRole="alert">{error}</Text>
      <TouchableOpacity onPress={reload}>
        <Text>Retry</Text>
      </TouchableOpacity>
    </View>
  ) : null;
}
export default function MySupportRequestsScreen({ navigation }) {
  const { user, data, error, reload } = useAccountRecords(['/support']);
  const [subject, setSubject] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [writeError, setWriteError] = React.useState('');
  const submit = async () => {
    setBusy(true);
    setWriteError('');
    try {
      await api.post('/support', {
        subject,
        description,
        type: 'GENERAL',
      });
      setSubject('');
      setDescription('');
      reload();
    } catch (failure) {
      setWriteError(
        failure.response?.data?.error ||
          failure.response?.data?.message ||
          'Unable to create request.',
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <Frame navigation={navigation} title="Support requests">
      <Failure error={error || writeError} reload={reload} />
      {!user ? (
        <Text>Sign in to contact support.</Text>
      ) : (
        <>
          <Text>Subject</Text>
          <TextInput
            style={{
              borderWidth: 1,
              padding: 12,
            }}
            maxLength={255}
            value={subject}
            onChangeText={setSubject}
          />
          <Text>Description</Text>
          <TextInput
            multiline
            style={{
              borderWidth: 1,
              padding: 12,
              minHeight: 100,
            }}
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity
            disabled={busy || !subject.trim() || !description.trim()}
            onPress={submit}
          >
            <Text>{busy ? 'Submitting...' : 'Create request'}</Text>
          </TouchableOpacity>
          {!data && !error && <Text>Loading requests...</Text>}
          {data && !data[0].length && <Text>No support requests yet.</Text>}
          {data?.[0].map((ticket) => (
            <TouchableOpacity
              key={ticket.id}
              style={{
                borderBottomWidth: 1,
                paddingVertical: 16,
                gap: 8,
              }}
              onPress={() =>
                navigation.navigate('SupportRequestDetailScreen', {
                  ticketId: ticket.id,
                })
              }
            >
              <Text>{ticket.subject}</Text>
              <Text>{ticket.requestId}</Text>
              <Text>
                {ticket.status} | Updated {ticket.lastUpdate}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </Frame>
  );
}

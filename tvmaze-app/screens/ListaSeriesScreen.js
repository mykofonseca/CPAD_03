import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ListaSeriesScreen({ navigation }) {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarSeries() {
      try {
        const response = await fetch('https://api.tvmaze.com/shows');
        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status}`);
        }
        const data = await response.json();
        setSeries(data);
      } catch (e) {
        setError('Não foi possível carregar as séries. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }

    carregarSeries();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={series}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={styles.item}
          onPress={() =>
            navigation.navigate('Detalhe', { id: item.id, nome: item.name })
          }
        >
          {item.image?.medium ? (
            <Image source={{ uri: item.image.medium }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.noImage]}>
              <Text style={styles.noImageText}>Sem imagem</Text>
            </View>
          )}
          <Text style={styles.name}>{item.name}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  error: { color: '#b00020', fontSize: 16, textAlign: 'center' },
  list: { padding: 12 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  image: { width: 70, height: 100, borderRadius: 4, backgroundColor: '#ddd' },
  noImage: { justifyContent: 'center', alignItems: 'center' },
  noImageText: { fontSize: 11, color: '#666', textAlign: 'center' },
  name: { flex: 1, marginLeft: 12, fontSize: 16, fontWeight: '600' },
});

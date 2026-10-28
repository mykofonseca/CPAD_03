import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default function DetalheSerieScreen({ route }) {
  const { id, nome } = route.params;

  const [episodios, setEpisodios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarEpisodios() {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status}`);
        }
        const data = await response.json();
        setEpisodios(data);
      } catch (e) {
        setError('Não foi possível carregar os episódios. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }

    carregarEpisodios();
  }, [id]);

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
      data={episodios}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<Text style={styles.title}>{nome}</Text>}
      ListEmptyComponent={<Text style={styles.empty}>Nenhum episódio encontrado.</Text>}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.meta}>
            Temporada {item.season} - Episódio {item.number ?? 'especial'}
          </Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  error: { color: '#b00020', fontSize: 16, textAlign: 'center' },
  list: { padding: 12 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  empty: { textAlign: 'center', color: '#666', marginTop: 24 },
  item: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  meta: { fontSize: 13, color: '#666', marginBottom: 2 },
  name: { fontSize: 16, fontWeight: '600' },
});

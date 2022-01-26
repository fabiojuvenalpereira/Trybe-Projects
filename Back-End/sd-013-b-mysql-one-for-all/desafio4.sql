CREATE VIEW top_3_artistas AS
SELECT
  A.nome AS `artista`,
  COUNT(ARS.usuario_id) AS `seguidores`
FROM
  SpotifyClone.artistas AS A
  JOIN SpotifyClone.artistas_seguidos AS ARS ON A.artista_id = ARS.artista_id
GROUP BY
  ARS.artista_id
ORDER BY
  `seguidores` DESC, `artista`
LIMIT 3;

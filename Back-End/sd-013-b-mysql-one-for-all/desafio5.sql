CREATE VIEW top_2_hits_do_momento AS
SELECT
  M.nome AS `cancao`,
  COUNT(H.musica_id) AS `reproducoes`
FROM
  SpotifyClone.historico_de_reproducoes AS H
  JOIN SpotifyClone.musicas AS M
  ON M.musica_id = H.musica_id
GROUP BY
  `cancao`
ORDER BY
  `reproducoes` DESC,
  `cancao`
LIMIT 2;

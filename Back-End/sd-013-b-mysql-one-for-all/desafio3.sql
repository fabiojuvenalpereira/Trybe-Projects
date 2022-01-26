CREATE VIEW historico_reproducao_usuarios AS
SELECT
  U.nome AS `usuario`,
  M.nome AS `nome`
FROM
  historico_de_reproducoes AS H
  JOIN usuarios AS U ON H.usuario_id = U.usuario_id
  JOIN SpotifyClone.musicas AS M ON H.musica_id = M.musica_id
ORDER BY
  `usuario`,
  `nome`;

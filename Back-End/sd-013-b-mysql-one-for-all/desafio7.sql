CREATE VIEW perfil_artistas AS
SELECT
  A.nome AS `artista`,
  AL.nome AS `album`,
  ( SELECT
      count(usuario_id)
    FROM
      artistas_seguidos
    WHERE
      AL.artista_id = artista_id
  ) AS `seguidores`
FROM
  SpotifyClone.artistas AS A
  JOIN SpotifyClone.albuns AS AL ON A.artista_id = AL.artista_id
ORDER BY
  `seguidores` DESC,
  `artista` ASC,
  `album` ASC;

DELIMITER $ $ CREATE PROCEDURE albuns_do_artista (IN nome_do_artista VARCHAR(50)) BEGIN
SELECT
  A.nome AS `artista`,
  AL.nome AS `album`
FROM
  SpotifyClone.artistas AS A
  JOIN SpotifyClone.albuns AS AL
  ON AL.artista_id = A.artista_id
WHERE
  A.nome = nome_do_artista;
END $ $ DELIMITER;

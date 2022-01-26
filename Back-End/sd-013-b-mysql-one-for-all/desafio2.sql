CREATE VIEW estatisticas_musicais AS
SELECT
  COUNT(nome) AS `cancoes`,
  ( SELECT
      COUNT(nome)
    FROM SpotifyClone.artistas
  ) AS `artistas`,
  ( SELECT
      COUNT(nome)
    FROM SpotifyClone.albuns
  ) AS `albuns`
FROM SpotifyClone.musicas;

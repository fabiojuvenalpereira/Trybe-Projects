CREATE VIEW faturamento_atual AS
SELECT
  MIN(valor) AS `faturamento_minimo`,
  MAX(valor) AS `faturamento_maximo`,
  ROUND(AVG(P.valor), 2) AS `faturamento_medio`,
  ROUND(SUM(valor), 2) AS `faturamento_total`
FROM
  SpotifyClone.planos AS P
  JOIN SpotifyClone.usuarios AS U ON U.plano_id = P.plano_id;

DELIMITER $$

CREATE FUNCTION quantidade_musicas_no_historico(id_inserido INT)
RETURNS INT READS SQL DATA
BEGIN
  DECLARE num_musicas INT;
  SELECT
    COUNT(musica_id)
  FROM SpotifyClone.historico_de_reproducoes
  WHERE usuario_id = id_inserido
    INTO num_musicas;
    RETURN num_musicas;
END $$
DELIMITER ;
